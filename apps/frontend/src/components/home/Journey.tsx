"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useRef } from "react";

const projects = [
  { title: "AWA", location: "Perú", color: "from-sky-200 to-cyan-100" },
  { title: "Chakronautas", location: "Perú", color: "from-violet-200 to-fuchsia-100" },
  { title: "Metaverso físico", location: "Colombia", color: "from-emerald-200 to-teal-100" },
  { title: "Ingeniería ancestral y tejido inca", location: "", color: "from-amber-200 to-yellow-100" },
  { title: "Astronomía y territorio", location: "", color: "from-indigo-200 to-blue-100" },
  { title: "Pensamiento computacional", location: "", color: "from-pink-200 to-rose-100" },
];

export default function Journey() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "right" ? 320 : -320,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-cyan-100 px-4 py-1.5 text-sm font-semibold text-cyan-800">
              Proyectos en marcha
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              El viaje de ONE en la actualidad
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              Explora algunos de los proyectos que actualmente hacen parte del
              camino de ONE en distintos territorios.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
              aria-label="Desplazar a la izquierda"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
              aria-label="Desplazar a la derecha"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project) => (
            <article
              key={`${project.title}-${project.location}`}
              className="group min-w-[280px] max-w-[280px] snap-start rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)] sm:min-w-[320px] sm:max-w-[320px]"
            >
              <div
                className={`mb-6 h-28 rounded-2xl bg-gradient-to-br ${project.color}`}
              />

              {project.location ? (
                <div className="flex items-center gap-2 text-sm font-medium text-cyan-700">
                  <MapPin className="h-4 w-4" />
                  <span>{project.location}</span>
                </div>
              ) : (
                <div className="text-sm font-medium text-slate-400">
                  Proyecto ONE
                </div>
              )}

              <h3 className="mt-3 text-xl font-bold leading-snug text-slate-900">
                {project.title}
              </h3>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center sm:text-left">
          <Link
            href="/proyectos"
            className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Conoce todos los proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}