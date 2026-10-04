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
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
      <div className="bg-stone-950/85 backdrop-blur-md border border-amber-500/30 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
        
        {/* Top Info row */}
        <div className="flex items-center justify-between text-sm">
          <div className="text-amber-200/90 font-medium">
            {activeStanza ? `Chanting Stanza ${activeStanza}` : 'Sacred Recitation'}
          </div>
          <div className="text-neutral-400 font-mono text-xs">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-stone-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between mt-1">
          <button 
            onClick={onTogglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-colors"
          >
            {isPlaying ? (
              // Pause Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              // Play Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
          
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pl-4 mask-fade-edges">
            {stanzas.filter(s => s.audio_timestamp).map(s => (
              <button
                key={s.stanza_number}
                onClick={() => onSeekToStanza(s.stanza_number)}
                className={`flex-shrink-0 px-3 py-1 text-xs rounded-full border transition-colors ${
                  activeStanza === s.stanza_number
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                    : 'bg-stone-900 border-stone-800 text-neutral-400 hover:border-amber-500/30 hover:text-amber-300'
                }`}
              >
                Stanza {s.stanza_number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
