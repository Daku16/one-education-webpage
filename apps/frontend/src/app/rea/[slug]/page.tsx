import Link from "next/link";
import { notFound } from "next/navigation";
import { getResourceBySlug, getResources } from "@/src/services/resources";
import { BlocksContentRenderer } from "@/src/components/resources/BlocksContent";

interface ReaSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const resources = await getResources();

  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}

export default async function ReaSlugPage({ params }: ReaSlugPageProps) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="mx-auto w-full max-w-5xl">
        <Link
          href="/rea"
          className="mb-6 inline-flex text-sm font-medium text-teal-700 transition hover:text-teal-800"
        >
          ← Volver a la biblioteca
        </Link>

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {resource.cover?.url && (
            <img
              src={resource.cover.url}
              alt={resource.cover.alternativeText || `Portada de ${resource.title}`}
              className="h-56 w-full object-cover sm:h-64 md:h-72 lg:h-80"
            />
          )}

          <div className="p-5 sm:p-6 md:p-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {resource.resource_type && (
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800 sm:text-sm">
                  {resource.resource_type}
                </span>
              )}

              {resource.difficulty && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 sm:text-sm">
                  {resource.difficulty}
                </span>
              )}

              {resource.audience && (
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-800 sm:text-sm">
                  {resource.audience}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              {resource.title}
            </h1>

            {resource.description && (
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                {resource.description}
              </p>
            )}

            {!!resource.age_groups?.length && (
              <div className="mt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Grupo de edad
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {resource.age_groups.map((group) => (
                    <span
                      key={group.id ?? group.name}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700"
                    >
                      {group.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!!resource.categories?.length && (
              <div className="mt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Categorías
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {resource.categories.map((category) => (
                    <span
                      key={category.id ?? category.name}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!!resource.tags?.length && (
              <div className="mt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Etiquetas
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag.id ?? tag.name}
                      className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!!resource.content?.length && (
              <div className="mt-10 border-t border-slate-200 pt-8">
                <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                  Contenido
                </h2>

                <div className="mt-6">
                  <BlocksContentRenderer content={resource.content as any} />
                </div>
              </div>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}