import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "../../../services/projects";
import Container from "../../../components/layout/Container";
import { ProjectHero } from "../../../components/projects/ProjectHero";
import { ProjectRichContent } from "../../../components/projects/ProjectRichContent";
import { ProjectMediaGallery } from "../../../components/projects/ProjectMediaGallery";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado | ONE Education",
    };
  }

  return {
    title: `${project.title} | Proyectos | ONE Education`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-white text-slate-900 pt-12 md:py-16">
      <ProjectHero project={project} />

      <section>
        <Container className="py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <article className="min-w-0">
              <div className="prose prose-slate max-w-none prose-headings:tracking-tight prose-p:text-slate-700">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  {project.description}
                </h1>
              </div>

              <div className="mt-10">
                <ProjectRichContent content={project.content} />
              </div>
            </article>

            <aside className="lg:sticky lg:top-24">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                  Información del proyecto
                </h2>

                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      País
                    </dt>
                    <dd className="mt-1 text-sm text-slate-800">{project.country}</dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Año
                    </dt>
                    <dd className="mt-1 text-sm text-slate-800">{project.year}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6">
                <ProjectMediaGallery project={project} />
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}