export type MediaType = 'video' | 'audio' | 'pdf' | 'image';

export interface MediaItem {
  id: string;
  name: string;
  title: string;
  description?: string;
  type: MediaType;
  path: string;
  thumbnail?: string;
  category: string;
  duration?: string;
  size?: number;
  addedAt: string;
}

export interface Category {
  id: string;
  name: string;
  path: string;
  items: MediaItem[];
}

export interface Manifest {
  title?: string;
  description?: string;
  categories?: {
    [key: string]: {
      title?: string;
      description?: string;
    };
  };
  items?: {
    [path: string]: {
      title?: string;
      description?: string;
      thumbnail?: string;
    };
  };
}
