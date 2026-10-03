import React from 'react';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { Stotra } from '@/types/stotra';

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
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 p-6 md:p-12">
      <main className="max-w-5xl mx-auto py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">
            सदाशिव (Sadashiv)
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed">
            Explore sacred Sanskrit stotras with word-by-word meanings, transliterations, and translations.
          </p>
        </div>

        {stotras.length === 0 ? (
          <div className="text-center py-12 text-neutral-500">No stotras found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stotras.map((stotra) => (
              <Link
                key={stotra.id}
                href={`/stotra/${stotra.id}`}
                className="group flex flex-col justify-between p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
              >
                <div>
                  <div className="text-2xl font-serif mb-2 text-neutral-900 dark:text-neutral-100 group-hover:text-primary transition-colors">
                    {stotra.title_sanskrit}
                  </div>
                  <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    {stotra.title_english}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                    By {stotra.author}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                    {stotra.total_stanzas} {stotra.total_stanzas === 1 ? 'Stanza' : 'Stanzas'}
                  </span>
                  <span className="text-xs font-medium text-neutral-500 group-hover:translate-x-1 transition-transform">
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
