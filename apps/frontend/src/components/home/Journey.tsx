"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getProjects } from "@/src/services/projects";
import type { Project } from "@/src/types/project";

const cardThemes = [
  {
    surface:
      "bg-gradient-to-b from-rose-50 via-white to-orange-50 border-rose-100",
    badge: "bg-rose-100 text-rose-700",
    blob: "bg-rose-200/60",
    accent: "from-rose-300 via-pink-200 to-orange-200",
  },
  {
    surface:
      "bg-gradient-to-b from-sky-50 via-white to-cyan-50 border-sky-100",
    badge: "bg-sky-100 text-sky-700",
    blob: "bg-cyan-200/60",
    accent: "from-sky-300 via-cyan-200 to-teal-200",
  },
  {
    surface:
      "bg-gradient-to-b from-amber-50 via-white to-yellow-50 border-amber-100",
    badge: "bg-amber-100 text-amber-700",
    blob: "bg-yellow-200/60",
    accent: "from-yellow-300 via-amber-200 to-orange-200",
  },
  {
    surface:
      "bg-gradient-to-b from-violet-50 via-white to-fuchsia-50 border-violet-100",
    badge: "bg-violet-100 text-violet-700",
    blob: "bg-fuchsia-200/60",
    accent: "from-violet-300 via-fuchsia-200 to-pink-200",
  },
];

export default function Journey() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error cargando proyectos", error);
      }
    };

    loadProjects();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "right" ? 320 : -320,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-24 rounded-3xl">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-50 via-white to-emerald-50" />
      <div className="absolute left-0 top-10 -z-10 h-40 w-40 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute right-10 top-20 -z-10 h-52 w-52 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm ring-1 ring-cyan-100">
              <Sparkles className="h-4 w-4" />
              Proyectos en marcha
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Aventuras de ONE en distintos territorios
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              Descubre proyectos llenos de aprendizaje, juego y experiencias
              que acompañan a niñas, niños y comunidades.
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-50"
              aria-label="Desplazar a la izquierda"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-50"
              aria-label="Desplazar a la derecha"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, index) => {
            const theme = cardThemes[index % cardThemes.length];
            const imageUrl =
              project.cover?.[0]?.formats?.medium?.url ||
              project.cover?.[0]?.url ||
              null;

            return (
              <article
                key={`${project.slug}-${index}`}
                className={`group relative min-w-[290px] max-w-[290px] snap-start overflow-hidden rounded-[32px] border p-4 shadow-[0_14px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)] sm:min-w-[340px] sm:max-w-[340px] ${theme.surface}`}
              >
                <div
                  className={`absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl ${theme.blob}`}
                />

                <div className="relative overflow-hidden rounded-[24px]">
                  {imageUrl ? (
                    <div className="relative h-44 w-full overflow-hidden rounded-[24px]">
                      <Image
                        src={imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div
                      className={`flex h-44 items-center justify-center rounded-[24px] bg-gradient-to-br ${theme.accent}`}
                    >
                      <span className="text-5xl">🌈</span>
                    </div>
                  )}
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${theme.badge}`}
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      {project.country || "Proyecto ONE"}
                    </span>

                    {project.year ? (
                      <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
                        {project.year}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-4 text-xl font-extrabold leading-snug text-slate-900">
                    {project.title}
                  </h3>

                  {project.description ? (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {project.description}
                    </p>
                  ) : (
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Un proyecto para aprender, explorar y crecer juntos.
                    </p>
                  )}

                  <Link
                    href={`/proyectos/${project.slug}`}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Ver proyecto
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center sm:text-left">
          <Link
            href="/proyectos"
            className="inline-flex items-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-cyan-700"
          >
            Conoce todos los proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}