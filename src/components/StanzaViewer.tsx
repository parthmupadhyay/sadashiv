'use client';

import React, { useState } from 'react';
import { Stanza } from '@/types/stotra';

interface StanzaViewerProps {
  stanza: Stanza;
}

export default function StanzaViewer({ stanza }: StanzaViewerProps) {
  const [lang, setLang] = useState<'english' | 'hindi'>('english');
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
          Stanza {stanza.stanza_number}
        </h3>
        {/* Translation Language Toggle */}
        <div className="inline-flex rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1 text-xs">
          <button
            onClick={() => setLang('english')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              lang === 'english'
                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang('hindi')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              lang === 'hindi'
                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Main Sanskrit Box */}
      <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/60 rounded-lg p-6 mb-6 text-center">
        <div className="text-2xl md:text-3xl font-serif text-zinc-900 dark:text-zinc-100 leading-loose whitespace-pre-line mb-4">
          {stanza.sanskrit_text}
        </div>
        <div className="text-sm italic text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
          {stanza.transliteration}
        </div>
      </div>

      {/* Translation Section */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
          Meaning ({lang === 'english' ? 'English' : 'Hindi'})
        </h4>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {stanza.translations[lang]}
        </p>
      </div>

      {/* Line Breakdown Accordion */}
      {stanza.line_breakdown && stanza.line_breakdown.length > 0 && (
        <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="flex items-center justify-between w-full text-left font-medium text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <span>Line-by-Line Breakdown</span>
            <span className="text-xs text-zinc-400">
              {showBreakdown ? 'Hide' : 'Show'}
            </span>
          </button>

          {showBreakdown && (
            <div className="mt-4 space-y-3">
              {stanza.line_breakdown.map((line) => (
                <div
                  key={line.line_number}
                  className="p-3 bg-zinc-50 dark:bg-zinc-950/50 rounded-lg border border-zinc-100 dark:border-zinc-800/50 text-sm"
                >
                  <div className="font-serif text-zinc-900 dark:text-zinc-100 mb-1">
                    {line.sanskrit_line}
                  </div>
                  <div className="text-xs italic text-zinc-500 dark:text-zinc-400 mb-2">
                    {line.transliteration_line}
                  </div>
                  <div className="text-zinc-700 dark:text-zinc-300 text-xs">
                    {lang === 'english' ? line.meaning_english : line.meaning_hindi}
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
