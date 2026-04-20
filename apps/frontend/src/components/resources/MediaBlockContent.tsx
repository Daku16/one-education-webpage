"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { PlayCircle, Image as ImageIcon, Expand } from "lucide-react";
import { BlocksContentRenderer } from "@/src/components/resources/BlocksContent";
import { MediaLightbox } from "@/src/components/resources/MediaLightbox";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import type { ResourceMediaItem } from "@/src/types/resource";

interface MediaBlockContentProps {
  title?: string | null;
  description?: BlocksContent | null;
  media?: ResourceMediaItem[] | null;
  caption?: string | null;
}

function isVideoFile(item: ResourceMediaItem) {
  if (item.mime?.startsWith("video/")) return true;

  if (
    item.ext &&
    [".mp4", ".webm", ".ogg", ".mov", ".m4v"].includes(item.ext.toLowerCase())
  ) {
    return true;
  }

  return /\.(mp4|webm|ogg|mov|m4v)$/i.test(item.url);
}

function MediaCard({
  item,
  index,
  title,
  onOpenMedia,
}: {
  item: ResourceMediaItem;
  index: number;
  title?: string | null;
  onOpenMedia: (index: number) => void;
}) {
  const isVideo = isVideoFile(item);

  return (
    <article className="group overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200/60">
      <button
        type="button"
        onClick={() => onOpenMedia(index)}
        className="relative flex min-h-[260px] w-full items-center justify-center bg-slate-100 p-3 sm:min-h-[320px]"
        aria-label={`Abrir ${isVideo ? "video" : "imagen"} ${index + 1} en pantalla grande`}
      >
        {isVideo ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
            <video preload="metadata" className="h-full w-full object-cover">
              <source src={item.url} type={item.mime || "video/mp4"} />
            </video>

            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-slate-900 shadow-sm">
                <PlayCircle className="h-5 w-5" />
                Ver video
              </div>
            </div>
          </div>
        ) : (
          <>
            <Image
              src={item.url}
              alt={item.alternativeText || title || `Media ${index + 1}`}
              width={item.width || 1200}
              height={item.height || 800}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto max-h-[70vh] w-auto max-w-full rounded-xl object-contain transition duration-300 group-hover:scale-[1.02]"
            />

            <div className="pointer-events-none absolute inset-0 bg-slate-950/0 transition duration-300 group-hover:bg-slate-950/10" />

            <div className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-bold text-slate-800 shadow-sm opacity-0 transition duration-300 group-hover:opacity-100">
              <Expand className="h-4 w-4" />
              Ampliar
            </div>
          </>
        )}
      </button>
    </article>
  );
}

export function MediaBlockContent({
  title,
  description,
  media,
  caption,
}: MediaBlockContentProps) {
  const items = Array.isArray(media) ? media : [];
  const safeItems = useMemo(() => items.filter(Boolean), [items]);
  const useCarousel = safeItems.length > 3;
  const isSingle = safeItems.length === 1;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  function openLightbox(index: number) {
    setActiveIndex(index);
    setLightboxOpen(true);
  }

  function handlePrev() {
    setActiveIndex((prev) =>
      prev === 0 ? safeItems.length - 1 : prev - 1
    );
  }

  function handleNext() {
    setActiveIndex((prev) =>
      prev === safeItems.length - 1 ? 0 : prev + 1
    );
  }

  function handleGoTo(index: number) {
    setActiveIndex(index);
  }

  return (
    <>
      <section className="mt-6 rounded-[22px] bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:mt-8 sm:rounded-[26px] sm:p-6 lg:rounded-[30px]">
        {title && (
          <h2 className="mb-4 text-lg font-black text-slate-900 sm:text-xl">
            {title}
          </h2>
        )}

        {description && description.length > 0 && (
          <div className="mb-5">
            <BlocksContentRenderer content={description ?? []} />
          </div>
        )}

        {safeItems.length > 0 ? (
          useCarousel ? (
            <div className="overflow-hidden">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2">
                {safeItems.map((item, index) => (
                  <div
                    key={item.id ?? index}
                    className="min-w-[85%] snap-center sm:min-w-[48%] lg:min-w-[32%]"
                  >
                    <MediaCard
                      item={item}
                      index={index}
                      title={title}
                      onOpenMedia={openLightbox}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : isSingle ? (
            <div className="flex justify-center">
              <div className="w-full max-w-3xl">
                <MediaCard
                  item={safeItems[0]}
                  index={0}
                  title={title}
                  onOpenMedia={openLightbox}
                />
              </div>
            </div>
          ) : (
            <div
              className={`grid gap-4 ${
                safeItems.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {safeItems.map((item, index) => (
                <MediaCard
                  key={item.id ?? index}
                  item={item}
                  index={index}
                  title={title}
                  onOpenMedia={openLightbox}
                />
              ))}
            </div>
          )
        ) : (
          <div className="flex min-h-[240px] items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-dashed ring-slate-200">
            <div className="text-center">
              <ImageIcon className="mx-auto mb-3 h-8 w-8 text-slate-400" />
              <p className="text-sm font-medium text-slate-500">
                No hay media para mostrar
              </p>
            </div>
          </div>
        )}

        {caption && <p className="mt-3 text-sm text-slate-500">{caption}</p>}
      </section>

      {lightboxOpen && safeItems.length > 0 && (
        <MediaLightbox
          items={safeItems}
          activeIndex={activeIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={handlePrev}
          onNext={handleNext}
          onGoTo={handleGoTo}
          title={title}
        />
      )}
    </>
  );
}