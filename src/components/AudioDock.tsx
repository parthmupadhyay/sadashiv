'use client';

import React from 'react';
import { Stanza } from '@/types/stotra';

interface AudioDockProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  activeStanza: number | null;
  onTogglePlay: () => void;
  stanzas: Stanza[];
  onSeekToStanza: (stanzaNum: number) => void;
}

export default function AudioDock({
  isPlaying,
  currentTime,
  duration,
  activeStanza,
  onTogglePlay,
  stanzas,
  onSeekToStanza,
}: AudioDockProps) {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className="fixed z-50 max-w-lg inset-x-3 mx-auto"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
    >
      <div className="w-full min-w-0 p-3 rounded-2xl bg-stone-950/90 backdrop-blur-md border border-amber-500/30 shadow-2xl box-border overflow-hidden">
        
        {/* Top Row: Info & Scrubber */}
        <div className="w-full min-w-0 mb-2">
          <div className="flex justify-between items-center text-xs text-amber-300/80 mb-1 w-full min-w-0">
            <span className="truncate pr-2 flex-1 min-w-0">{activeStanza ? `Chanting Stanza ${activeStanza}` : "Sacred Recitation"}</span>
            <span className="text-stone-400 font-mono shrink-0">{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
          <div className="w-full min-w-0 bg-stone-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-amber-400 h-full transition-all duration-150" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        {/* Bottom Row: Play Button + Internally Scrollable Pills */}
        <div className="flex items-center gap-2.5 w-full min-w-0">
          <button
            onClick={onTogglePlay}
            className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/40 hover:bg-amber-500/30"
          >
            {isPlaying ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
            ) : (
              <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>

          <div className="flex-1 min-w-0 overflow-x-auto flex items-center gap-1.5 py-1 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {stanzas.filter(s => s.audio_timestamp).map((s) => (
              <button
                key={s.stanza_number}
                onClick={() => onSeekToStanza(s.stanza_number)}
                className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                  activeStanza === s.stanza_number
                    ? "bg-amber-500 text-stone-950 font-bold"
                    : "bg-white/5 text-stone-400 hover:text-amber-200"
                }`}
              >
                {s.stanza_number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
