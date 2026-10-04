export interface LineBreakdown {
  line_number: number;
  sanskrit_line: string;
  transliteration_line: string;
  meaning_english: string;
  meaning_hindi: string;
}

export interface Translation {
  english: string;
  hindi: string;
}

export interface AudioTimestamp {
  start: number;
  end: number;
}

export interface StotraAudio {
  provider: "youtube" | "audio_file";
  youtube_id?: string;
  url?: string;
  title: string;
}

export interface Stanza {
  stanza_number: number;
  sanskrit_text: string;
  transliteration: string;
  translations: Translation;
  line_breakdown?: LineBreakdown[];
  audio_timestamp?: AudioTimestamp;
}

export interface Stotra {
  id: string;
  title_sanskrit: string;
  title_transliteration: string;
  title_english: string;
  author: string;
  description: string;
  total_stanzas: number;
  stanzas: Stanza[];
  audio?: StotraAudio;
}
