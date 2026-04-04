import { apiPost } from "../lib/api";

type NewsletterCreateBody = {
  data: {
    email: string;
  };
};

type NewsletterCreateResponse = {
  data: {
    id: number;
    attributes: {
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export async function subscribeToNewsletter(email: string) {
  return apiPost<NewsletterCreateResponse, NewsletterCreateBody>(
    "/api/newsletters",
    {
      data: { email },
    }
  );
}