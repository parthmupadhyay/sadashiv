'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface StotraSummary {
  id: string;
  title_sanskrit: string;
  title_transliteration: string;
  title_english: string;
  total_stanzas: number;
}

export default function Home() {
  const [stotras, setStotras] = useState<StotraSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stotras')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStotras(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch stotras', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 p-8">
      <main className="max-w-4xl mx-auto py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2 font-serif">Sadashiv</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Explore sacred stotras and hymns</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-zinc-500">Loading stotras...</div>
        ) : stotras.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">No stotras found.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {stotras.map((stotra) => (
              <Link
                key={stotra.id}
                href={`/stotra/${stotra.id}`}
                className="block p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:border-zinc-400 dark:hover:border-zinc-600 transition-all"
              >
                <div className="text-2xl font-serif mb-1 text-zinc-900 dark:text-zinc-100">
                  {stotra.title_sanskrit}
                </div>
                <div className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-1">
                  {stotra.title_transliteration}
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                  {stotra.title_english}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  {stotra.total_stanzas} {stotra.total_stanzas === 1 ? 'Stanza' : 'Stanzas'}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
