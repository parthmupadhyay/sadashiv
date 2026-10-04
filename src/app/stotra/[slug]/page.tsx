import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import StanzaViewer from '@/components/StanzaViewer';
import { Stotra } from '@/types/stotra';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getStotra(slug: string): Promise<Stotra | null> {
  try {
    const filePath = path.join(process.cwd(), 'src/data/stotras', `${slug}.json`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      console.error('Error reading stotra:', error);
    }
    return null;
  }
}

export default async function StotraPage({ params }: PageProps) {
  const { slug } = await params;
  const stotra = await getStotra(slug);

  if (!stotra) {
    notFound();
  }

  return (
    <div className="min-h-screen text-neutral-100 p-2 sm:p-6 md:p-12 relative">
      <main className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Breadcrumb */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-neutral-400 hover:text-amber-300 transition-colors gap-2"
          >
            <span>←</span> Back to all Stotras
          </Link>
        </div>

        {/* Stotra Header */}
        <Card className="mb-8 sm:mb-10 text-center relative overflow-hidden p-6 sm:p-8 md:p-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          <div className="text-3xl md:text-5xl font-[family-name:var(--font-devanagari)] font-bold mb-4 text-neutral-100 break-words [word-break:break-word]">
            {stotra.title_sanskrit}
          </div>
          <h1 className="text-lg md:text-xl font-[family-name:var(--font-serif)] text-amber-200/90 italic mb-4 break-words [word-break:break-word]">
            {stotra.title_transliteration}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6 text-sm text-neutral-400">
            <span className="text-neutral-200">{stotra.title_english}</span>
            <span>•</span>
            <Badge variant="gold">{stotra.author}</Badge>
          </div>
          <p className="text-neutral-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-[family-name:var(--font-serif)] italic">
            &ldquo;{stotra.description}&rdquo;
          </p>
        </Card>

        {/* Stanzas List */}
        <div className="space-y-8">
          {stotra.stanzas.map((stanza) => (
            <StanzaViewer key={stanza.stanza_number} stanza={stanza} />
          ))}
        </div>
      </main>
    </div>
  );
}
