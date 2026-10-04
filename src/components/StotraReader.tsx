'use client';

import React, { useState, useEffect } from 'react';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';
import StanzaViewer from '@/components/StanzaViewer';
import { Stotra } from '@/types/stotra';
import AudioDock from '@/components/AudioDock';

interface StotraReaderProps {
  stotra: Stotra;
}

export default function StotraReader({ stotra }: StotraReaderProps) {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeStanza, setActiveStanza] = useState<number | null>(null);

  const hasAudio = stotra.audio?.provider === 'youtube' && !!stotra.audio?.youtube_id;

  // Polling for current time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (player && isPlaying) {
      interval = setInterval(async () => {
        const time = await player.getCurrentTime();
        setCurrentTime(time);
        
        // Find active stanza
        if (stotra.stanzas) {
          const current = stotra.stanzas.find(
            (s) => s.audio_timestamp && time >= s.audio_timestamp.start && time < s.audio_timestamp.end
          );
          if (current) {
            setActiveStanza(current.stanza_number);
          } else {
            setActiveStanza(null);
          }
        }
      }, 250);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [player, isPlaying, stotra.stanzas]);

  const onReady = (event: YouTubeEvent) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
  };

  const onStateChange = (event: YouTubeEvent) => {
    // 1 = playing, 2 = paused
    if (event.data === 1) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (player) {
      if (isPlaying) player.pauseVideo();
      else player.playVideo();
    }
  };

  const seekTo = (seconds: number) => {
    if (player) {
      player.seekTo(seconds, true);
      player.playVideo();
    }
  };

  return (
    <>
      {hasAudio && (
        <div className="hidden">
          <YouTube
            videoId={stotra.audio!.youtube_id}
            opts={{ playerVars: { autoplay: 0, controls: 0 } }}
            onReady={onReady}
            onStateChange={onStateChange}
          />
        </div>
      )}

      <div className="space-y-8 pb-36 sm:pb-32">
        {stotra.stanzas.map((stanza) => (
          <StanzaViewer
            key={stanza.stanza_number}
            stanza={stanza}
            isActive={activeStanza === stanza.stanza_number}
            hasAudio={hasAudio && !!stanza.audio_timestamp}
            onPlay={
              stanza.audio_timestamp
                ? () => seekTo(stanza.audio_timestamp!.start)
                : undefined
            }
          />
        ))}
      </div>

      {hasAudio && player && (
        <AudioDock
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          activeStanza={activeStanza}
          onTogglePlay={togglePlay}
          stanzas={stotra.stanzas}
          onSeekToStanza={(stanzaNum) => {
            const s = stotra.stanzas.find(s => s.stanza_number === stanzaNum);
            if (s?.audio_timestamp) seekTo(s.audio_timestamp.start);
          }}
        />
      )}
    </>
  );
}
