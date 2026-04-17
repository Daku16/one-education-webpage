"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { MediaItem, Project } from "../../types/project";

type ProjectMediaGalleryProps = {
  project: Project;
};

type MediaKind = "image" | "video" | "audio" | "file";

type GalleryItem = MediaItem & {
  kind: MediaKind;
};

const MAX_VISIBLE_ITEMS = 8;

function getMediaKind(url: string): MediaKind {
  const cleanUrl = url.split("?")[0].toLowerCase();

  if (/\.(mp4|webm|ogg|mov|m4v)$/i.test(cleanUrl)) return "video";
  if (/\.(mp3|wav|ogg|m4a)$/i.test(cleanUrl)) return "audio";
  if (/\.(jpg|jpeg|png|webp|gif|avif|svg)$/i.test(cleanUrl)) return "image";
  return "file";
}

function getGallery(project: Project): GalleryItem[] {
  const seen = new Set<string>();

  return [...(project.cover || []), ...(project.media || [])]
    .filter((item) => {
      if (!item?.url) return false;
      if (seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    })
    .map((item) => ({
      ...item,
      kind: getMediaKind(item.url),
    }));
}

export function ProjectMediaGallery({ project }: ProjectMediaGalleryProps) {
  const gallery = useMemo(() => getGallery(project), [project]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visibleItems = gallery.slice(0, MAX_VISIBLE_ITEMS);
  const remainingCount = gallery.length - MAX_VISIBLE_ITEMS;
  const activeItem = activeIndex !== null ? gallery[activeIndex] : null;

  function openItem(index: number) {
    setActiveIndex(index);
  }

  function closeItem() {
    setActiveIndex(null);
  }

  function showPrev() {
    if (activeIndex === null) return;
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return prev === 0 ? gallery.length - 1 : prev - 1;
    });
  }

  function showNext() {
    if (activeIndex === null) return;
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return prev === gallery.length - 1 ? 0 : prev + 1;
    });
  }

  useEffect(() => {
    if (activeIndex === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeItem();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, gallery.length]);

  if (!gallery.length) return null;

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between gap-3 px-2">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Galería
          </h2>
          <span className="text-sm text-slate-500">
            {gallery.length} elementos
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {visibleItems.map((item, index) => {
            const isLastVisible =
              index === MAX_VISIBLE_ITEMS - 1 && remainingCount > 0;

            return (
              <button
                key={`${item.url}-${index}`}
                type="button"
                onClick={() => openItem(index)}
                className="group relative overflow-hidden rounded-2xl bg-slate-100 text-left focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                aria-label={`Abrir elemento ${index + 1} de ${gallery.length}`}
              >
                <div className="relative aspect-square">
                  {item.kind === "image" ? (
                    <Image
                      src={item.url}
                      alt={item.alternativeText || `${project.title} ${index + 1}`}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 160px"
                    />
                  ) : item.kind === "video" ? (
                    <div className="relative h-full w-full">
                      <video
                        src={item.url}
                        className="h-full w-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white shadow-lg">
                          <svg viewBox="0 0 20 20" fill="currentColor" className="ml-0.5 h-6 w-6">
                            <path d="M6.3 4.84A1 1 0 005 5.74v8.52a1 1 0 001.3.95l8.52-4.26a1 1 0 000-1.9L6.3 4.84z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center bg-slate-200 text-center text-sm font-medium text-slate-600">
                      Archivo
                    </div>
                  )}

                  <div className="absolute left-2 top-2 rounded-full bg-black/65 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
                    {item.kind === "image" && "Imagen"}
                    {item.kind === "video" && "Video"}
                    {item.kind === "audio" && "Audio"}
                    {item.kind === "file" && "Archivo"}
                  </div>

                  {isLastVisible && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                      <span className="text-3xl font-bold text-white">
                        +{remainingCount}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada de galería"
          onClick={closeItem}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeItem}
              className="absolute right-0 top-[-3rem] inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Cerrar"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrev}
                  className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Anterior"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path
                      fillRule="evenodd"
                      d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Siguiente"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path
                      fillRule="evenodd"
                      d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            )}

            <div className="overflow-hidden rounded-3xl bg-slate-950 shadow-2xl">
              <div className="relative aspect-[16/10] w-full bg-black">
                {activeItem.kind === "image" ? (
                  <Image
                    src={activeItem.url}
                    alt={activeItem.alternativeText || project.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                ) : activeItem.kind === "video" ? (
                  <video
                    src={activeItem.url}
                    className="h-full w-full object-contain"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : activeItem.kind === "audio" ? (
                  <div className="flex h-full items-center justify-center p-8">
                    <audio src={activeItem.url} controls autoPlay className="w-full max-w-2xl" />
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center text-white">
                    <p className="text-lg font-medium">Este archivo no tiene vista previa.</p>
                    <a
                      href={activeItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                    >
                      Abrir archivo
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-start justify-between gap-4 text-white">
              <div>
                <p className="text-sm font-medium">
                  {activeItem.alternativeText || activeItem.name || project.title}
                </p>
                {activeItem.caption ? (
                  <p className="mt-1 text-sm text-white/75">{activeItem.caption}</p>
                ) : null}
              </div>

              <div className="shrink-0 text-sm text-white/75">
                {(activeIndex ?? 0) + 1} / {gallery.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}