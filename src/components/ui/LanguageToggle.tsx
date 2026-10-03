'use client';

import React from 'react';

interface LanguageToggleProps {
  activeLang: 'english' | 'hindi';
  onChange: (lang: 'english' | 'hindi') => void;
}

export function LanguageToggle({ activeLang, onChange }: LanguageToggleProps) {
  return (
    <div className="inline-flex rounded-xl bg-neutral-950/80 border border-neutral-800/80 p-1 text-xs backdrop-blur-sm">
      <button
        onClick={() => onChange('english')}
        className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 ${
          activeLang === 'english'
            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
            : 'text-neutral-400 hover:text-neutral-200 border border-transparent'
        }`}
      >
        English
      </button>
      <button
        onClick={() => onChange('hindi')}
        className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 ${
          activeLang === 'hindi'
            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
            : 'text-neutral-400 hover:text-neutral-200 border border-transparent'
        }`}
      >
        हिंदी
      </button>
    </div>
  );
}
