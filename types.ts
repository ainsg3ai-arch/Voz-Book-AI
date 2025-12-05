export enum ViewState {
  HOME = 'HOME',
  UPLOAD = 'UPLOAD',
  VOICE_SETTINGS = 'VOICE_SETTINGS',
  CONVERSION = 'CONVERSION',
  PLAYER = 'PLAYER',
  LIBRARY = 'LIBRARY',
  BIBLE_MODE = 'BIBLE_MODE',
  STUDY_MODE = 'STUDY_MODE',
  PODCAST_CREATOR = 'PODCAST_CREATOR'
}

export type BookCategory = 'audiobook' | 'bible' | 'podcast' | 'study' | 'document';

export interface Chapter {
  id: string;
  title: string;
  timestamp: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  duration: string; // e.g., "12:45"
  totalSeconds: number;
  progress: number; // 0-100
  fileType: string;
  category: BookCategory;
  dateAdded: Date;
  chapters?: Chapter[];
  isFavorite?: boolean;
  textContent?: string; // For interactive reading
}

export interface VoiceConfig {
  voiceId: string;
  speed: number;
  pitch: number;
  emphasis: number;
  backgroundMusic?: string;
  musicVolume?: number;
  translationLanguage?: string;
}

export interface FileUploadState {
  files: File[];
  isBatch: boolean;
  isOCR: boolean; // Photo to text
  previewText: string;
}
