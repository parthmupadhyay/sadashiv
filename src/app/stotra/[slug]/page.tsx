import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import StanzaViewer from '@/components/StanzaViewer';
import { Stotra } from '@/types/stotra';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getStotra(slug: string): Promise<Stotra | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/stotras/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching stotra:', error);
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
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 p-6 md:p-12">
      <main className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            ← Back to Stotras
          </Link>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm mb-8 text-center">
          <div className="text-3xl md:text-4xl font-serif mb-2 text-zinc-900 dark:text-zinc-100">
            {stotra.title_sanskrit}
          </div>
          <h1 className="text-xl md:text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
            {stotra.title_transliteration}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            {stotra.title_english} • By {stotra.author}
          </p>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm max-w-xl mx-auto leading-relaxed">
            {stotra.description}
          </p>
        </div>

        <div className="space-y-6">
          {stotra.stanzas.map((stanza) => (
            <StanzaViewer key={stanza.stanza_number} stanza={stanza} />
          ))}
        </div>
      </main>
    </div>
  );
}
