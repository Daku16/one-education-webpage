// apps/frontend/src/types/project.ts

export type MediaFormat = {
  url: string;
  width?: number;
  height?: number;
};

export type MediaItem = {
  id?: number;
  documentId?: string;
  name?: string;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
  };
};

export type Project = {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  description: string;
  content: unknown;
  country: string;
  year: number;
  cover: MediaItem[];
  media: MediaItem[];
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};