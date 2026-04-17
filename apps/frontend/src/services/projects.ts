// apps/frontend/src/services/projects.ts
import qs from "qs";
import { apiGet } from "../lib/api";
import type { Project } from "../types/project";

type StrapiMediaFormat = {
  url: string;
  width?: number;
  height?: number;
};

type StrapiMedia = {
  id?: number;
  documentId?: string;
  name?: string;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
};

type StrapiResponse<T> = {
  data: T;
  meta: Record<string, unknown>;
};

type StrapiProjectItem = {
  id?: number;
  documentId?: string;
  title: string;
  slug: string;
  description: string;
  content: unknown;
  country: string;
  year: number;
  cover?: StrapiMedia[] | null;
  media?: StrapiMedia[] | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

const ENDPOINT = "/projects";

function mapMedia(items?: StrapiMedia[] | null): StrapiMedia[] {
  if (!items) return [];
  return items.map((item) => ({
    ...item,
    id: item.id,
  }));
}

function mapProject(item: StrapiProjectItem): Project {
  return {
    id: item.id ?? 0,
    documentId: item.documentId,
    title: item.title,
    slug: item.slug,
    description: item.description,
    content: item.content,
    country: item.country,
    year: item.year,
    cover: mapMedia(item.cover),
    media: mapMedia(item.media),
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    publishedAt: item.publishedAt,
  };
}

const baseQuery = qs.stringify(
  {
    populate: {
      cover: {
        fields: ["url", "alternativeText", "caption", "width", "height", "formats"],
      },
      media: {
        fields: ["url", "alternativeText", "caption", "width", "height", "formats"],
      },
    },
    sort: ["year:desc", "title:asc"],
  },
  {
    encodeValuesOnly: true,
  }
);

export async function getProjects(): Promise<Project[]> {
  const res = await apiGet<StrapiResponse<StrapiProjectItem[]>>(
    `${ENDPOINT}?${baseQuery}`
  );

  return res.data.map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        cover: {
          fields: ["url", "alternativeText", "caption", "width", "height", "formats"],
        },
        media: {
          fields: ["url", "alternativeText", "caption", "width", "height", "formats"],
        },
      },
      pagination: {
        page: 1,
        pageSize: 1,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await apiGet<StrapiResponse<StrapiProjectItem[]>>(
    `${ENDPOINT}?${query}`
  );

  if (!res.data.length) return null;

  return mapProject(res.data[0]);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const query = qs.stringify(
    {
      populate: {
        cover: {
          fields: ["url", "alternativeText", "caption", "width", "height", "formats"],
        },
      },
      sort: ["year:desc", "title:asc"],
      pagination: {
        page: 1,
        pageSize: limit,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await apiGet<StrapiResponse<StrapiProjectItem[]>>(
    `${ENDPOINT}?${query}`
  );

  return res.data.map(mapProject);
}