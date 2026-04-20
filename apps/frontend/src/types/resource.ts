import type { BlocksContent } from "@strapi/blocks-react-renderer";

export interface ResourceRelation {
  id?: number;
  name: string;
  slug?: string;
}

export interface StrapiImage {
  id?: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  mime?: string | null;
  ext?: string | null;
  name?: string | null;
}

export interface ResourceFile {
  id?: number;
  url: string;
  alternativeText?: string | null;
  mime?: string | null;
  ext?: string | null;
  name?: string | null;
  size?: number | null;
}

export interface ResourceSectionBase {
  id?: number;
  __component: string;
}

export interface ResourceRichTextSection extends ResourceSectionBase {
  __component: "shared.rich-text";
  title?: string | null;
  content?: BlocksContent | null;
}

export interface ResourceCalloutSection extends ResourceSectionBase {
  __component: "resource.callout";
  title?: string | null;
  text?: BlocksContent | null;
  variant?: "info" | "neutral" | "success" | "warning" | string | null;
}

export interface ResourceKeyPointItem {
  id?: number;
  title?: string | null;
  description?: string | null;
}

export interface ResourceKeyPointsSection extends ResourceSectionBase {
  __component: "resource.key-points";
  title?: string | null;
  intro?: string | null;
  items?: ResourceKeyPointItem[] | null;
}

export interface ResourceActivitySection extends ResourceSectionBase {
  __component: "resource.activity";
  title?: string | null;
  activity_type?: "historia" | "juego" | "actividad_docente" | string | null;
  objective?: BlocksContent | null;
  instructions?: BlocksContent | null;
  expected_outcome?: BlocksContent | null;
}

export interface ResourcePhaseItem {
  id?: number;
  phase_number?: number | null;
  title?: string | null;
  main_resource?: string | null;
  objective?: BlocksContent | null;
  development?: BlocksContent | null;
  expected_results?: BlocksContent | null;
}

export interface ResourcePhaseListSection extends ResourceSectionBase {
  __component: "resource.phase-list";
  title?: string | null;
  intro?: string | null;
  phases?: ResourcePhaseItem[] | null;
}

export interface ResourceLinkItem {
  id?: number;
  label?: string | null;
  url?: string | null;
  type?: string | null;
}

export interface ResourceLinksSection extends ResourceSectionBase {
  __component: "resource.links";
  title?: string | null;
  description?: string | null;
  items?: ResourceLinkItem[] | null;
}

export interface ResourceMediaItem {
  id?: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  mime?: string | null;
  ext?: string | null;
  name?: string | null;
}

export interface ResourceMediaBlockSection extends ResourceSectionBase {
  __component: "resource.media-block";
  title?: string | null;
  description?: BlocksContent | null;
  media?: ResourceMediaItem[] | null;
  caption?: string | null;
}

export interface ResourceDocumentBlockSection extends ResourceSectionBase {
  __component: "resource.document-block";
  title?: string | null;
  description?: BlocksContent | null;
  file?: ResourceFile | null;
  caption?: string | null;
}

export type ResourceSection =
  | ResourceRichTextSection
  | ResourceCalloutSection
  | ResourceKeyPointsSection
  | ResourceActivitySection
  | ResourcePhaseListSection
  | ResourceLinksSection
  | ResourceMediaBlockSection
  | ResourceDocumentBlockSection
  | ResourceSectionBase;

export interface Resource {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  description: string;
  content?: BlocksContent | null;
  sections?: ResourceSection[] | null;
  audience?: string | null;
  resource_type?: string | null;
  difficulty?: string | null;
  cover?: StrapiImage | null;
  categories?: ResourceRelation[];
  tags?: ResourceRelation[];
  age_groups?: ResourceRelation[];
}