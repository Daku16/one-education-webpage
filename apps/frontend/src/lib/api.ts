// apps/frontend/src/lib/api.ts
import axios from "axios";

const rawBaseURL = process.env.NEXT_PUBLIC_STRAPI_URL;

if (!rawBaseURL) {
  throw new Error(
    "NEXT_PUBLIC_STRAPI_URL no está definida. Configúrala en tu .env.local"
  );
}

const baseURL = rawBaseURL.endsWith("/api")
  ? rawBaseURL
  : `${rawBaseURL}/api`;

export const api = axios.create({
  baseURL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en petición API", {
      message: error?.message,
      status: error?.response?.status,
      url: error?.config?.url,
      baseURL: error?.config?.baseURL,
      data: error?.response?.data,
    });
    throw error;
  }
);

export async function apiGet<T>(
  url: string,
  params?: Record<string, unknown>
): Promise<T> {
  const res = await api.get<T>(url, { params });
  return res.data;
}

export async function apiPost<T, B = unknown>(
  url: string,
  body: B,
  params?: Record<string, unknown>
): Promise<T> {
  const res = await api.post<T>(url, body, { params });
  return res.data;
}