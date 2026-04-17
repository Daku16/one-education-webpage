import type { Project } from "../../types/project";
import { ProjectCard } from "./ProjectCard";

type ProjectGalleryProps = {
  projects: Project[];
};

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  if (!projects.length) {
    return (
      <section className="rounded-[2rem] border border-orange-100 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-6 py-14 text-center shadow-sm md:px-10 md:py-16">
        <div className="mx-auto max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-orange-700 shadow-sm ring-1 ring-orange-100">
            Muy pronto
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Estamos preparando nuevas aventuras
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Aquí compartiremos proyectos llenos de juego, creatividad, exploración
            e ideas que nacen junto a niñas, niños, docentes y comunidades.
          </p>

          <div className="mt-8 flex justify-center">
            <span className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-500 shadow-sm ring-1 ring-slate-200">
              ✨ Pronto habrá mucho por descubrir
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="max-w-2xl">
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
          Proyectos para inspirarse
        </span>

        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Exploremos juntos
        </h2>

        <p className="mt-3 text-base leading-7 text-slate-600 md:text-lg">
          Conoce experiencias que unen curiosidad, juego, investigación y creación
          para transformar el aprendizaje desde la primera infancia.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.documentId ?? project.id} project={project} />
        ))}
      </div>
    </section>
  );
}