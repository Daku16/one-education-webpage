import { apiGet } from "@/src/lib/api";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import type {
  Resource,
  ResourceRelation,
  StrapiImage,
  ResourceSection,
  ResourceRichTextSection,
  ResourceCalloutSection,
  ResourceKeyPointsSection,
  ResourceActivitySection,
  ResourcePhaseListSection,
  ResourceLinksSection,
  ResourceMediaBlockSection,
  ResourceDocumentBlockSection,
  ResourceMediaItem,
  ResourceFile,
} from "@/src/types/resource";

interface StrapiKeyPointItem {
  id?: number;
  title?: string | null;
  description?: string | null;
}

interface StrapiPhaseItem {
  id?: number;
  phase_number?: number | null;
  title?: string | null;
  main_resource?: string | null;
  objective?: BlocksContent | null;
  development?: BlocksContent | null;
  expected_results?: BlocksContent | null;
}

interface StrapiLinkItem {
  id?: number;
  label?: string | null;
  url?: string | null;
  type?: string | null;
}

interface StrapiSectionBase {
  id?: number;
  __component: string;
}

interface StrapiRichTextSection extends StrapiSectionBase {
  __component: "shared.rich-text";
  title?: string | null;
  content?: BlocksContent | null;
}

interface StrapiCalloutSection extends StrapiSectionBase {
  __component: "resource.callout";
  title?: string | null;
  text?: BlocksContent | null;
  variant?: string | null;
}

interface StrapiKeyPointsSection extends StrapiSectionBase {
  __component: "resource.key-points";
  title?: string | null;
  intro?: string | null;
  items?: StrapiKeyPointItem[] | null;
}

interface StrapiActivitySection extends StrapiSectionBase {
  __component: "resource.activity";
  title?: string | null;
  activity_type?: string | null;
  objective?: BlocksContent | null;
  instructions?: BlocksContent | null;
  expected_outcome?: BlocksContent | null;
}

interface StrapiPhaseListSection extends StrapiSectionBase {
  __component: "resource.phase-list";
  title?: string | null;
  intro?: string | null;
  phases?: StrapiPhaseItem[] | null;
}

interface StrapiLinksSection extends StrapiSectionBase {
  __component: "resource.links";
  title?: string | null;
  description?: string | null;
  items?: StrapiLinkItem[] | null;
}

interface StrapiMediaItem {
  id?: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  mime?: string | null;
  ext?: string | null;
  name?: string | null;
}

interface StrapiMediaBlockSection extends StrapiSectionBase {
  __component: "resource.media-block";
  title?: string | null;
  description?: BlocksContent | null;
  media?: StrapiMediaItem[] | null;
  caption?: string | null;
}

interface StrapiFile {
  id?: number;
  url: string;
  alternativeText?: string | null;
  mime?: string | null;
  ext?: string | null;
  name?: string | null;
  size?: number | null;
}

interface StrapiDocumentBlockSection extends StrapiSectionBase {
  __component: "resource.document-block";
  title?: string | null;
  description?: BlocksContent | null;
  file?: StrapiFile | null;
  caption?: string | null;
}

type StrapiSection =
  | StrapiRichTextSection
  | StrapiCalloutSection
  | StrapiKeyPointsSection
  | StrapiActivitySection
  | StrapiPhaseListSection
  | StrapiLinksSection
  | StrapiMediaBlockSection
  | StrapiDocumentBlockSection
  | StrapiSectionBase;

interface StrapiResourceItem {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  description: string;
  content?: BlocksContent | null;
  sections?: StrapiSection[] | null;
  audience?: string | null;
  resource_type?: string | null;
  difficulty?: string | null;
  cover?: StrapiImage | null;
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

function normalizeMediaItem(media?: StrapiImage | StrapiMediaItem | null): ResourceMediaItem | null {
  if (!media?.url) return null;

  return {
    id: media.id,
    url: getMediaUrl(media.url),
    alternativeText: media.alternativeText ?? null,
    width: media.width,
    height: media.height,
    mime: media.mime ?? null,
    ext: media.ext ?? null,
    name: media.name ?? null,
  };
}

function normalizeFile(file?: StrapiFile | null): ResourceFile | null {
  if (!file?.url) return null;

  return {
    id: file.id,
    url: getMediaUrl(file.url),
    alternativeText: file.alternativeText ?? null,
    mime: file.mime ?? null,
    ext: file.ext ?? null,
    name: file.name ?? null,
    size: file.size ?? null,
  };
}

function normalizeCover(cover?: StrapiImage | null): StrapiImage | null {
  if (!cover?.url) return null;

  return {
    id: cover.id,
    url: getMediaUrl(cover.url),
    alternativeText: cover.alternativeText ?? null,
    width: cover.width,
    height: cover.height,
    mime: cover.mime ?? null,
    ext: cover.ext ?? null,
    name: cover.name ?? null,
  };
}

function isRichTextSection(section: StrapiSection): section is StrapiRichTextSection {
  return section.__component === "shared.rich-text";
}

function isCalloutSection(section: StrapiSection): section is StrapiCalloutSection {
  return section.__component === "resource.callout";
}

function isKeyPointsSection(section: StrapiSection): section is StrapiKeyPointsSection {
  return section.__component === "resource.key-points";
}

function isActivitySection(section: StrapiSection): section is StrapiActivitySection {
  return section.__component === "resource.activity";
}

function isPhaseListSection(section: StrapiSection): section is StrapiPhaseListSection {
  return section.__component === "resource.phase-list";
}

function isLinksSection(section: StrapiSection): section is StrapiLinksSection {
  return section.__component === "resource.links";
}

function isMediaBlockSection(section: StrapiSection): section is StrapiMediaBlockSection {
  return section.__component === "resource.media-block";
}

function isDocumentBlockSection(section: StrapiSection): section is StrapiDocumentBlockSection {
  return section.__component === "resource.document-block";
}

function normalizeSections(sections?: StrapiSection[] | null): ResourceSection[] {
  if (!Array.isArray(sections)) return [];

  return sections.map((section) => {
    if (isRichTextSection(section)) {
      const normalized: ResourceRichTextSection = {
        __component: section.__component,
        id: section.id,
        title: section.title ?? null,
        content: section.content ?? [],
      };
      return normalized;
    }

    if (isCalloutSection(section)) {
      const normalized: ResourceCalloutSection = {
        __component: section.__component,
        id: section.id,
        title: section.title ?? null,
        text: section.text ?? [],
        variant: section.variant ?? "neutral",
      };
      return normalized;
    }

    if (isKeyPointsSection(section)) {
      const normalized: ResourceKeyPointsSection = {
        __component: section.__component,
        id: section.id,
        title: section.title ?? null,
        intro: section.intro ?? null,
        items: (section.items ?? []).map((item) => ({
          id: item.id,
          title: item.title ?? null,
          description: item.description ?? null,
        })),
      };
      return normalized;
    }

    if (isActivitySection(section)) {
      const normalized: ResourceActivitySection = {
        __component: section.__component,
        id: section.id,
        title: section.title ?? null,
        activity_type: section.activity_type ?? null,
        objective: section.objective ?? [],
        instructions: section.instructions ?? [],
        expected_outcome: section.expected_outcome ?? [],
      };
      return normalized;
    }

    if (isPhaseListSection(section)) {
      const normalized: ResourcePhaseListSection = {
        __component: section.__component,
        id: section.id,
        title: section.title ?? null,
        intro: section.intro ?? null,
        phases: (section.phases ?? []).map((phase) => ({
          id: phase.id,
          phase_number: phase.phase_number ?? null,
          title: phase.title ?? null,
          main_resource: phase.main_resource ?? null,
          objective: phase.objective ?? [],
          development: phase.development ?? [],
          expected_results: phase.expected_results ?? [],
        })),
      };
      return normalized;
    }

    if (isLinksSection(section)) {
      const normalized: ResourceLinksSection = {
        __component: section.__component,
        id: section.id,
        title: section.title ?? null,
        description: section.description ?? null,
        items: (section.items ?? []).map((item) => ({
          id: item.id,
          label: item.label ?? null,
          url: item.url ?? null,
          type: item.type ?? null,
        })),
      };
      return normalized;
    }

    if (isMediaBlockSection(section)) {
      const normalized: ResourceMediaBlockSection = {
        __component: section.__component,
        id: section.id,
        title: section.title ?? null,
        description: section.description ?? [],
        media: Array.isArray(section.media)
          ? (section.media
              .map((item) => normalizeMediaItem(item))
              .filter(Boolean) as ResourceMediaItem[])
          : [],
        caption: section.caption ?? null,
      };
      return normalized;
    }

    if (isDocumentBlockSection(section)) {
      const normalized: ResourceDocumentBlockSection = {
        __component: section.__component,
        id: section.id,
        title: section.title ?? null,
        description: section.description ?? [],
        file: normalizeFile(section.file),
        caption: section.caption ?? null,
      };
      return normalized;
    }

    return {
      __component: section.__component,
      id: section.id,
    };
  });
}

function normalizeResource(item: StrapiResourceItem): Resource {
  return {
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    slug: item.slug,
    description: item.description,
    content: item.content ?? null,
    sections: normalizeSections(item.sections),
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
      filters: {
        slug: {
          $eq: slug,
        },
      },
      fields: [
        "documentId",
        "title",
        "slug",
        "description",
        "content",
        "audience",
        "resource_type",
        "difficulty",
      ],
      populate: {
        cover: true,
        categories: true,
        tags: true,
        age_groups: true,
        sections: {
          on: {
            "shared.rich-text": {
              populate: "*",
            },
            "resource.callout": {
              populate: "*",
            },
            "resource.key-points": {
              populate: "*",
            },
            "resource.activity": {
              populate: "*",
            },
            "resource.phase-list": {
              populate: "*",
            },
            "resource.links": {
              populate: "*",
            },
            "resource.media-block": {
              populate: {
                media: true,
              },
            },
            "resource.document-block": {
              populate: {
                file: true,
              },
            },
          },
        },
      },
      pagination: {
        page: 1,
        pageSize: 1,
      },
    }
  );

  const item = response.data?.[0];
  return item ? normalizeResource(item) : null;
}