"use client";

import { MediaBlockContent } from "@/src/components/resources/MediaBlockContent";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import type { ResourceMediaItem } from "@/src/types/resource";

interface MediaBlockProps {
  title?: string | null;
  description?: BlocksContent | null;
  media?: ResourceMediaItem[] | null;
  caption?: string | null;
}

export function MediaBlock(props: MediaBlockProps) {
  return <MediaBlockContent {...props} />;
}