'use client';

import React, { useState } from 'react';
import { Stanza } from '@/types/stotra';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LanguageToggle } from '@/components/ui/LanguageToggle';

interface StanzaViewerProps {
  stanza: Stanza;
}

export default function StanzaViewer({ stanza }: StanzaViewerProps) {
  const [activeLang, setActiveLang] = useState<'english' | 'hindi'>('english');
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <Card className="relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800/80">
        <Badge variant="gold">
          Stanza {stanza.stanza_number}
        </Badge>
        <LanguageToggle activeLang={activeLang} onChange={setActiveLang} />
      </div>

      {/* Sanskrit Section */}
      <div className="bg-neutral-950/60 border border-neutral-800/50 rounded-xl p-8 mb-6 text-center backdrop-blur-sm relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <div 
          className="text-2xl md:text-3xl font-[family-name:var(--font-devanagari)] text-neutral-100 leading-[2.2] whitespace-pre-line mb-4 font-semibold tracking-wide"
        >
          {stanza.sanskrit_text}
        </div>
        <div className="text-base sm:text-lg font-[family-name:var(--font-serif)] text-amber-200/80 italic whitespace-pre-line leading-relaxed tracking-wide mt-4 max-w-3xl mx-auto">
          {stanza.transliteration}
        </div>
      </div>

      {/* Translation Section */}
      <div className="mb-6 bg-neutral-950/30 border border-neutral-800/40 rounded-xl p-6 relative">
        <span className="absolute -top-3 left-6 px-3 bg-neutral-900 text-xs font-semibold tracking-wider uppercase text-amber-400/80 border border-neutral-800 rounded-full">
          Meaning ({activeLang === 'english' ? 'English' : 'हिंदी'})
        </span>
        <p className="text-base sm:text-lg text-zinc-100 font-[family-name:var(--font-serif)] leading-relaxed italic pt-1">
          &ldquo;{stanza.translations[activeLang]}&rdquo;
        </p>
      </div>

      {/* Line-by-Line Breakdown Accordion */}
      {stanza.line_breakdown && stanza.line_breakdown.length > 0 && (
        <div className="border-t border-neutral-800/80 pt-4">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="flex items-center justify-between w-full text-left font-medium text-sm text-neutral-300 hover:text-amber-300 transition-colors py-2 px-3 rounded-lg hover:bg-neutral-900/60"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
              Line-by-line Breakdown
            </span>
            <span className="text-xs text-neutral-500 bg-neutral-950 px-2.5 py-1 rounded-md border border-neutral-800">
              {showBreakdown ? 'Hide ▲' : 'Show ▼'}
            </span>
          </button>

          {showBreakdown && (
            <div className="mt-4 space-y-4">
              {stanza.line_breakdown.map((line) => (
                <div
                  key={line.line_number}
                  className="p-5 sm:p-6 bg-zinc-950/60 rounded-xl border border-white/10 text-sm backdrop-blur-sm"
                >
                  <div className="text-xl sm:text-2xl font-[family-name:var(--font-serif)] font-[family-name:var(--font-devanagari)] text-amber-100 leading-relaxed">
                    {line.sanskrit_line}
                  </div>
                  <div className="text-sm sm:text-base font-[family-name:var(--font-serif)] italic text-amber-300/80 tracking-wide mt-1">
                    {line.transliteration_line}
                  </div>
                  <div className="text-sm sm:text-base text-zinc-200 leading-relaxed mt-2 pl-3 border-l-2 border-amber-500/50 bg-white/[0.02] p-2.5 rounded-r-lg">
                    {activeLang === 'english' ? line.meaning_english : line.meaning_hindi}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
