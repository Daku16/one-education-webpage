import Image from "next/image";
import type { MediaItem, Project } from "../../types/project";
import Container from "../../components/layout/Container";

type ProjectHeroProps = {
  project: Project;
};

function getHeroImage(project: Project): MediaItem | null {
  if (project.cover?.length) return project.cover[0];
  if (project.media?.length) return project.media[0];
  return null;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const image = getHeroImage(project);

  return (
    <section className="relative overflow-hidden border-b border-teal-100 bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50">
      <div className="absolute left-[-60px] top-[40px] h-36 w-36 rounded-full bg-yellow-200/50 blur-3xl" />
      <div className="absolute right-[-40px] top-[100px] h-40 w-40 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="absolute bottom-[-40px] left-[20%] h-32 w-32 rounded-full bg-teal-200/40 blur-3xl" />

      <Container className="relative py-10 sm:py-12 md:py-16">
        <a
          href="/proyectos"
          className="inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm ring-1 ring-teal-100 backdrop-blur transition hover:bg-white"
        >
          <svg
            className="mr-2 h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M17 10a1 1 0 01-1 1H6.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L6.414 9H16a1 1 0 011 1z"
              clipRule="evenodd"
            />
          </svg>
          Volver a proyectos
        </a>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-yellow-300 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-900 shadow-sm">
                {project.country}
              </span>
            </div>

            <h1 className="mt-5 max-w-3xl text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
              {project.title}
            </h1>
          </div>

          <div className="relative">
            <div className="absolute -left-3 -top-3 h-20 w-20 rounded-full bg-yellow-300/60 blur-2xl" />
            <div className="absolute -bottom-4 -right-3 h-20 w-20 rounded-full bg-teal-300/50 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
              <div className="relative aspect-[4/3] bg-slate-100">
                {image?.url ? (
                  <Image
                    src={image.url}
                    alt={image.alternativeText || project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-400">
                    Sin imagen destacada
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}