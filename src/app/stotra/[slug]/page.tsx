import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import StanzaViewer from '@/components/StanzaViewer';
import { Stotra } from '@/types/stotra';

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
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 p-6 md:p-12">
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            ← Back to all Stotras
          </Link>
        </div>

        {/* Stotra Header */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm mb-10 text-center">
          <div className="text-3xl md:text-4xl font-serif font-bold mb-3 text-neutral-900 dark:text-neutral-100">
            {stotra.title_sanskrit}
          </div>
          <h1 className="text-lg md:text-xl font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {stotra.title_transliteration}
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{stotra.title_english}</span>
            <span>•</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              {stotra.author}
            </span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm max-w-2xl mx-auto leading-relaxed">
            {stotra.description}
          </p>
        </div>

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
