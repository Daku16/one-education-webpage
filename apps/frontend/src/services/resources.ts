import { apiGet } from "@/src/lib/api";
import type {
  Resource,
  ResourceRelation,
  StrapiImage,
  ResourceContentBlock,
} from "@/src/types/resource";

interface StrapiResourceItem {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  description: string;
  content?: ResourceContentBlock[] | null;
  audience?: string | null;
  resource_type?: string | null;
  difficulty?: string | null;
  cover?: {
    id?: number;
    url: string;
    alternativeText?: string | null;
  } | null;
  categories?: ResourceRelation[];
  tags?: ResourceRelation[];
  age_groups?: ResourceRelation[];
}

interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

function getMediaUrl(url?: string | null) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

function normalizeRelationArray(items: ResourceRelation[] = []): ResourceRelation[] {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
  }));
}

function normalizeCover(cover?: StrapiImage | null): StrapiImage | null {
  if (!cover?.url) return null;

  return {
    id: cover.id,
    url: getMediaUrl(cover.url),
    alternativeText: cover.alternativeText ?? null,
  };
}

function normalizeResource(item: StrapiResourceItem): Resource {
  return {
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    slug: item.slug,
    description: item.description,
    content: item.content ?? null,
    audience: item.audience ?? null,
    resource_type: item.resource_type ?? null,
    difficulty: item.difficulty ?? null,
    cover: normalizeCover(item.cover),
    categories: normalizeRelationArray(item.categories || []),
    tags: normalizeRelationArray(item.tags || []),
    age_groups: normalizeRelationArray(item.age_groups || []),
  };
}

export async function getResources(): Promise<Resource[]> {
  const response = await apiGet<StrapiCollectionResponse<StrapiResourceItem>>(
    "/resources",
    {
      "fields[0]": "documentId",
      "fields[1]": "title",
      "fields[2]": "slug",
      "fields[3]": "description",
      "fields[4]": "content",
      "fields[5]": "audience",
      "fields[6]": "resource_type",
      "fields[7]": "difficulty",
      "populate[0]": "cover",
      "populate[1]": "categories",
      "populate[2]": "tags",
      "populate[3]": "age_groups",
      sort: "createdAt:desc",
    }
  );

  return (response.data || []).map(normalizeResource);
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const response = await apiGet<StrapiCollectionResponse<StrapiResourceItem>>(
    "/resources",
    {
      "filters[slug][$eq]": slug,
      "fields[0]": "documentId",
      "fields[1]": "title",
      "fields[2]": "slug",
      "fields[3]": "description",
      "fields[4]": "content",
      "fields[5]": "audience",
      "fields[6]": "resource_type",
      "fields[7]": "difficulty",
      "populate[0]": "cover",
      "populate[1]": "categories",
      "populate[2]": "tags",
      "populate[3]": "age_groups",
      "pagination[page]": "1",
      "pagination[pageSize]": "1",
    }
  );

  const item = response.data?.[0];
  return item ? normalizeResource(item) : null;
}