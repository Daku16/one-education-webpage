export interface ResourceRelation {
  id?: number;
  name: string;
  slug?: string;
}

export interface StrapiImage {
  id?: number;
  url: string;
  alternativeText?: string | null;
}

export interface ResourceContentText {
  type: string;
  text?: string;
}

export interface ResourceContentBlock {
  type: string;
  children?: ResourceContentText[];
  level?: number;
  format?: "ordered" | "unordered";
  url?: string;
}

export interface Resource {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  description: string;
  content?: ResourceContentBlock[] | null;
  audience?: string | null;
  resource_type?: string | null;
  difficulty?: string | null;
  cover?: StrapiImage | null;
  categories?: ResourceRelation[];
  tags?: ResourceRelation[];
  age_groups?: ResourceRelation[];
}