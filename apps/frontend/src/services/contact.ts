// apps/frontend/src/services/contact.ts
import { ContactFormValues } from "../types/contact";

type StrapiErrorResponse = {
  error?: {
    status?: number;
    name?: string;
    message?: string;
    details?: unknown;
  };
};

type ContactApiResponse = {
  data?: unknown;
  meta?: unknown;
};

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || process.env.NEXT_PUBLIC_API_URL || "";

export async function sendContactMessage(payload: ContactFormValues) {
  if (!API_URL) {
    throw new Error(
      "No se ha configurado NEXT_PUBLIC_STRAPI_URL en las variables de entorno."
    );
  }

  const response = await fetch(`${API_URL}/api/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        name: payload.name,
        email: payload.email,
        institution: payload.institution || null,
        message: payload.message,
        phone: payload.phone,
        country: payload.country,
        subject: payload.subject,
      },
    }),
  });

  const result = (await response.json()) as ContactApiResponse & StrapiErrorResponse;

  if (!response.ok) {
    throw new Error(
      result?.error?.message || "No fue posible enviar tu mensaje."
    );
  }

  return result;
}