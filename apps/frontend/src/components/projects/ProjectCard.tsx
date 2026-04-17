import Image from "next/image";
import Link from "next/link";
import type { Project, MediaItem } from "../../types/project";

type ProjectCardProps = {
  project: Project;
};

function getCoverImage(project: Project): MediaItem | null {
  if (project.cover && project.cover.length > 0) return project.cover[0];
  if (project.media && project.media.length > 0) return project.media[0];
  return null;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cover = getCoverImage(project);

  return (
    <article className="group h-full overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/proyectos/${project.slug}`}
        className="flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-4"
      >
        <div className="relative aspect-[16/11] overflow-hidden bg-gradient-to-br from-amber-50 via-slate-100 to-emerald-50">
          {cover?.url ? (
            <Image
              src={cover.url}
              alt={cover.alternativeText || project.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-2xl shadow-sm ring-1 ring-slate-200">
                🌟
              </div>
              <p className="text-sm font-medium text-slate-500">
                Imagen próximamente
              </p>
            </div>
          )}

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {project.country ? (
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                {project.country}
              </span>
            ) : null}

            {project.year ? (
              <span className="rounded-full bg-teal-600/90 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                {project.year}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold leading-tight tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-teal-700">
              {project.title}
            </h3>

            {project.description ? (
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 md:text-[15px]">
                {project.description}
              </p>
            ) : (
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Un proyecto para explorar, crear y aprender en comunidad.
              </p>
            )}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700">
              Descubrir proyecto
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a1 1 0 011-1h9.586L10.293 5.707a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
              Ver más
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}