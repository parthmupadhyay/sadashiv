'use client';

import React, { useState } from 'react';
import { Stanza } from '@/types/stotra';

interface StanzaViewerProps {
  stanza: Stanza;
}

export default function StanzaViewer({ stanza }: StanzaViewerProps) {
  const [activeLang, setActiveLang] = useState<'english' | 'hindi'>('english');
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          Stanza {stanza.stanza_number}
        </span>
        {/* Translation Language Toggle */}
        <div className="inline-flex rounded-lg bg-neutral-100 dark:bg-neutral-800 p-1 text-xs">
          <button
            onClick={() => setActiveLang('english')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeLang === 'english'
                ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setActiveLang('hindi')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeLang === 'hindi'
                ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Sanskrit Section */}
      <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800/60 rounded-xl p-6 mb-6 text-center">
        <div className="text-2xl md:text-3xl font-serif text-neutral-900 dark:text-neutral-100 leading-loose whitespace-pre-line mb-3">
          {stanza.sanskrit_text}
        </div>
        <div className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 italic whitespace-pre-line">
          {stanza.transliteration}
        </div>
      </div>

      {/* Translation Section */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
          Meaning ({activeLang === 'english' ? 'English' : 'Hindi'})
        </h4>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {stanza.translations[activeLang]}
        </p>
      </div>

      {/* Line-by-Line Breakdown Accordion */}
      {stanza.line_breakdown && stanza.line_breakdown.length > 0 && (
        <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="flex items-center justify-between w-full text-left font-medium text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <span>Line-by-line Breakdown</span>
            <span className="text-xs text-neutral-400">
              {showBreakdown ? 'Hide ▲' : 'Show ▼'}
            </span>
          </button>

          {showBreakdown && (
            <div className="mt-4 space-y-3">
              {stanza.line_breakdown.map((line) => (
                <div
                  key={line.line_number}
                  className="p-3 bg-neutral-50 dark:bg-neutral-950/50 rounded-lg border border-neutral-100 dark:border-neutral-800/50 text-sm"
                >
                  <div className="font-serif text-neutral-900 dark:text-neutral-100 mb-1">
                    {line.sanskrit_line}
                  </div>
                  <div className="text-xs italic text-neutral-500 dark:text-neutral-400 mb-2">
                    {line.transliteration_line}
                  </div>
                  <div className="text-neutral-700 dark:text-neutral-300 text-xs">
                    {activeLang === 'english' ? line.meaning_english : line.meaning_hindi}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
