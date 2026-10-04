import React from 'react';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { Stotra } from '@/types/stotra';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

async function getStotras() {
  try {
    const stotrasDirectory = path.join(process.cwd(), 'src/data/stotras');
    try {
      await fs.access(stotrasDirectory);
    } catch {
      return [];
    }

    const filenames = await fs.readdir(stotrasDirectory);
    const stotraPromises = filenames
      .filter((filename) => filename.endsWith('.json'))
      .map(async (filename) => {
        const filePath = path.join(stotrasDirectory, filename);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const stotra: Stotra = JSON.parse(fileContents);

        return {
          id: stotra.id,
          title_sanskrit: stotra.title_sanskrit,
          title_transliteration: stotra.title_transliteration,
          title_english: stotra.title_english,
          author: stotra.author,
          total_stanzas: stotra.total_stanzas,
        };
      });

    return await Promise.all(stotraPromises);
  } catch (error) {
    console.error('Error reading stotras:', error);
    return [];
  }
}

export default async function Home() {
  const stotras = await getStotras();

  return (
    <div className="min-h-screen text-neutral-100 p-4 md:p-12 relative">
      <main className="max-w-5xl mx-auto py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center max-w-2xl mx-auto relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-devanagari)] font-bold tracking-tight mb-4 text-neutral-100 drop-shadow-sm">
            सदाशिव
          </h1>
          <p className="text-sm tracking-[0.3em] uppercase text-amber-400/80 mb-4 font-semibold">
            Sadashiv Stotra Collection
          </p>
          <p className="text-neutral-400 text-base md:text-lg font-[family-name:var(--font-serif)] italic leading-relaxed">
            &ldquo;Explore sacred Sanskrit stotras with word-by-word meanings, transliterations, and translations.&rdquo;
          </p>
        </div>

        {stotras.length === 0 ? (
          <div className="text-center py-12 text-neutral-500 font-[family-name:var(--font-serif)]">No stotras found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stotras.map((stotra) => (
              <Link key={stotra.id} href={`/stotra/${stotra.id}`} className="block group">
                <Card hoverEffect className="h-full flex flex-col justify-between">
                  <div>
                    <div className="text-2xl md:text-3xl font-[family-name:var(--font-devanagari)] mb-2 text-neutral-100 group-hover:text-amber-300 transition-colors">
                      {stotra.title_sanskrit}
                    </div>
                    <div className="text-sm font-medium text-amber-200/90 mb-1 font-[family-name:var(--font-serif)] italic">
                      {stotra.title_english}
                    </div>
                    <div className="text-xs text-neutral-400 mb-6 font-mono">
                      By {stotra.author}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80">
                    <Badge variant="gold">
                      {stotra.total_stanzas} {stotra.total_stanzas === 1 ? 'Stanza' : 'Stanzas'}
                    </Badge>
                    <span className="text-xs font-medium text-amber-400/80 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read <span className="text-amber-400">→</span>
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
