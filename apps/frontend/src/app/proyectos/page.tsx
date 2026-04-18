import type { Metadata } from "next";
import { getProjects } from "../../services/projects";
import Container from "../../components/layout/Container";
import { ProjectGallery } from "../../components/projects/ProjectGallery";

export const metadata: Metadata = {
  title: "Proyectos | ONE Education",
  description:
    "Conoce los proyectos educativos de ONE Education en distintos territorios y contextos de aprendizaje.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50">
        <Container className="py-24 lg:py-24 md:py-12">
          <div className="max-w-3xl">

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Proyectos educativos que conectan infancia, territorio y exploración
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              En ONE Education desarrollamos experiencias que acercan la ingeniería,
              la ciencia y la tecnología a la primera infancia a través del juego,
              la creatividad y el pensamiento STEAM.
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-12 md:py-16">
          <ProjectGallery projects={projects} />
        </Container>
      </section>
    </main>
  );
}