import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Shapes, Users } from "lucide-react";
import clsx from "clsx";
import type { Resource } from "@/src/types/resource";

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

function getMediaUrl(url?: string | null) {
  if (!url) return null;
  if (url.startsWith("http")) return url;

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  return baseUrl ? `${baseUrl}${url}` : url;
}

export function ResourceCard({ resource, className }: ResourceCardProps) {
  const coverUrl = getMediaUrl(resource.cover?.url);
  const category = resource.categories?.[0]?.name || "REA";
  const ageGroup = resource.age_groups?.[0]?.name || "Primera infancia";
  const resourceType = resource.resource_type || "Material abierto";

  return (
    <Link
      href={`/rea/${resource.slug}`}
      className={clsx(
        "group relative flex h-full flex-col overflow-hidden rounded-[30px]",
        "border border-[#d9d4c7] bg-[#f7f3ea]",
        "shadow-[0_10px_30px_rgba(74,58,38,0.08)]",
        "transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(74,58,38,0.14)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6f8a6a] focus-visible:ring-offset-2",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {coverUrl ? (
          <>
            <Image
              src={coverUrl}
              alt={resource.cover?.alternativeText || `Portada de ${resource.title}`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2f2a22]/45 via-[#2f2a22]/10 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#dfe8d7] via-[#eef2e6] to-[#f6f0e5]" />
        )}

        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center rounded-full border border-white/50 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5f5a4f] backdrop-blur-md">
            {category}
          </span>
        </div>

        <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-white/75 text-[#2f2a22] backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-white">
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col bg-[#f7f3ea] p-5 sm:p-6">
        <h3 className="text-pretty text-lg font-semibold leading-[1.15] tracking-[-0.025em] text-[#1f1d18] sm:text-[1.35rem]">
          {resource.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#686252]">
          {resource.description ||
            "Explora este recurso educativo abierto y profundiza en experiencias de juego, exploración y construcción."}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#ebe5d8] px-3 py-1.5 text-xs font-medium text-[#5a5447]">
            <Shapes className="h-3.5 w-3.5" />
            {resourceType}
          </span>

          <span className="inline-flex items-center gap-2 rounded-full bg-[#e1ead8] px-3 py-1.5 text-xs font-medium text-[#52604d]">
            <Users className="h-3.5 w-3.5" />
            {ageGroup}
          </span>
        </div>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between border-t border-[#ddd6c8] pt-4">
            <div className="flex items-center gap-2 text-sm text-[#6c6657]">
              <BookOpen className="h-4 w-4" />
              <span>{category}</span>
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#32473a]">
              Explorar
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}