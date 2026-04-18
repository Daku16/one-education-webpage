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
}

export interface ResourceContentText {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  children?: ResourceContentText[];
}

export interface ResourceContentBlock {
  type: string;
  children?: ResourceContentText[];
  level?: number;
  format?: "ordered" | "unordered";
  url?: string;
  image?: {
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  };
}

export interface ResourceSectionBase {
  id?: number;
  __component: string;
}

export interface ResourceRichTextSection extends ResourceSectionBase {
  __component: "shared.rich-text";
  title?: string | null;
  content?: ResourceContentBlock[] | null;
}

export interface ResourceCalloutSection extends ResourceSectionBase {
  __component: "resource.callout";
  title?: string | null;
  text?: ResourceContentBlock[] | null;
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
  objective?: ResourceContentBlock[] | null;
  instructions?: ResourceContentBlock[] | null;
  expected_outcome?: ResourceContentBlock[] | null;
}

export interface ResourcePhaseItem {
  id?: number;
  phase_number?: number | null;
  title?: string | null;
  main_resource?: string | null;
  objective?: ResourceContentBlock[] | null;
  development?: ResourceContentBlock[] | null;
  expected_results?: ResourceContentBlock[] | null;
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

export type ResourceSection =
  | ResourceRichTextSection
  | ResourceCalloutSection
  | ResourceKeyPointsSection
  | ResourceActivitySection
  | ResourcePhaseListSection
  | ResourceLinksSection
  | ResourceSectionBase;

export interface Resource {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  description: string;
  content?: ResourceContentBlock[] | null;
  sections?: ResourceSection[] | null;
  audience?: string | null;
  resource_type?: string | null;
  difficulty?: string | null;
  cover?: StrapiImage | null;
  categories?: ResourceRelation[];
  tags?: ResourceRelation[];
  age_groups?: ResourceRelation[];
}