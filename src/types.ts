export type ResourceType = 'video' | 'pdf' | 'audio' | 'infographic';

export interface VideoTranscriptItem {
  id: string;
  time: string;
  seconds: number;
  speaker: string;
  text: string;
}

export interface SlideItem {
  page: number;
  title: string;
  summary: string;
  image: string;
  notes?: string;
  keyPoints: string[];
}

export interface AudioChapter {
  time: string;
  seconds: number;
  title: string;
  description: string;
}

export interface InfographicHotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  description: string;
  badge?: string;
}

export interface DriveResource {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: ResourceType;
  fileFormat: string;
  fileSize: string;
  durationOrPages: string;
  driveLink: string;
  downloadUrl?: string;
  thumbnailUrl: string;
  previewImage?: string;
  mediaUrl?: string;
  tags: string[];
  updatedAt: string;
  keyTakeaways: string[];
  rating: number;
  downloads: number;
  views: number;

  // Specific media details
  transcript?: VideoTranscriptItem[];
  slides?: SlideItem[];
  chapters?: AudioChapter[];
  hotspots?: InfographicHotspot[];
}

export interface DriveFolderInfo {
  id: string;
  url: string;
  name: string;
  owner: string;
  lastSync: string;
  isPublic: boolean;
  totalItems: number;
}
