// apps/frontend/src/lib/strapi.ts
import { apiGet, apiPost } from "./api";

export interface StrapiPaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiListResponse<T> {
  data: StrapiEntity<T>[];
  meta: {
    pagination: StrapiPaginationMeta;
  };
}

export interface StrapiSingleResponse<T> {
  data: StrapiEntity<T> | null;
  meta: Record<string, unknown>;
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

type QueryParams = Record<string, unknown>;

export async function fetchFromStrapiList<T>(
  path: string,
  params: QueryParams = {},
  options?: { populateAll?: boolean }
): Promise<StrapiListResponse<T>> {
  const finalParams: QueryParams = {
    ...(options?.populateAll ? { populate: "*" } : {}),
    ...params,
  };

  return apiGet<StrapiListResponse<T>>(`/api${path}`, finalParams);
}

export async function fetchFromStrapiSingle<T>(
  path: string,
  params: QueryParams = {},
  options?: { populateAll?: boolean }
): Promise<StrapiSingleResponse<T>> {
  const finalParams: QueryParams = {
    ...(options?.populateAll ? { populate: "*" } : {}),
    ...params,
  };

  return apiGet<StrapiSingleResponse<T>>(`/api${path}`, finalParams);
}

export async function postToStrapi<T, B = unknown>(
  path: string,
  body: B,
  params: QueryParams = {}
): Promise<T> {
  return apiPost<T, B>(`/api${path}`, body, params);
}