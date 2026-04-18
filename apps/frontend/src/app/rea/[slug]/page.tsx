import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  BookOpen,
  Users,
  Shapes,
  Tag,
  Sparkles,
  Star,
} from "lucide-react";

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

function BubbleBadge({
  children,
  tone = "teal",
}: {
  children: React.ReactNode;
  tone?: "teal" | "sky" | "amber" | "pink";
}) {
  const styles = {
    teal: "bg-teal-100 text-teal-800",
    sky: "bg-sky-100 text-sky-800",
    amber: "bg-amber-100 text-amber-800",
    pink: "bg-rose-100 text-rose-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold shadow-sm sm:px-4 sm:py-2 sm:text-sm ${styles[tone]}`}
    >
      {children}
    </span>
  );
}

function MiniCard({
  icon,
  title,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[20px] p-4 shadow-sm ring-1 ring-slate-200/70 sm:rounded-[24px] sm:p-5 ${className}`}
    >
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-teal-700 shadow-sm sm:h-11 sm:w-11">
          {icon}
        </div>
        <h2 className="text-sm font-extrabold leading-snug text-slate-800 sm:text-base">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function hasBlocks(value: unknown) {
  return Array.isArray(value) && value.length > 0;
}

function renderRichTextOrParagraph(value: any, className = "") {
  if (!value) return null;

  if (Array.isArray(value)) {
    return <BlocksContentRenderer content={value} />;
  }

  if (typeof value === "string") {
    return <p className={className}>{value}</p>;
  }

  return null;
}

function renderSection(section: any, index: number) {
  const type = section?.__component ?? section?.type ?? section?.component;

  if (type === "shared.rich-text") {
    return (
      <section
        key={index}
        className="mt-6 rounded-[22px] bg-[#fffefb] p-4 shadow-sm ring-1 ring-slate-200/70 sm:mt-8 sm:rounded-[26px] sm:p-6 lg:rounded-[30px] lg:p-8"
      >
        <div className="mb-5 flex items-start gap-3 sm:mb-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 sm:h-12 sm:w-12">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <h2 className="text-xl font-black leading-tight text-slate-900 sm:text-2xl">
              Zona de exploración
            </h2>
            <p className="text-xs text-slate-500 sm:text-sm">
              Lee, descubre y encuentra ideas importantes
            </p>
          </div>
        </div>

        <div className="child-content">
          <BlocksContentRenderer content={section.content} />
        </div>
      </section>
    );
  }

  if (type === "resource.callout") {
    return (
      <section
        key={index}
        className="mt-6 rounded-[22px] bg-teal-50 p-4 ring-1 ring-teal-100 sm:mt-8 sm:rounded-[26px] sm:p-6 lg:rounded-[30px]"
      >
        {section.title && (
          <h2 className="mb-3 text-lg font-black text-slate-900 sm:text-xl">
            {section.title}
          </h2>
        )}
        <div className="max-w-none">
          {renderRichTextOrParagraph(
            section.text,
            "text-sm leading-7 text-slate-700 sm:text-base"
          )}
        </div>
      </section>
    );
  }

  if (type === "resource.key-points") {
    return (
      <section
        key={index}
        className="mt-6 rounded-[22px] bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:mt-8 sm:rounded-[26px] sm:p-6 lg:rounded-[30px]"
      >
        {section.title && (
          <h2 className="mb-4 text-lg font-black text-slate-900 sm:text-xl">
            {section.title}
          </h2>
        )}

        {section.intro && (
          <div className="mb-4">
            {renderRichTextOrParagraph(
              section.intro,
              "text-sm leading-7 text-slate-600 sm:text-base"
            )}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {(section.items ?? []).map((item: any, itemIndex: number) => (
            <div
              key={itemIndex}
              className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/60"
            >
              <p className="font-bold text-slate-900">{item.title}</p>
              {item.description && (
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (type === "resource.activity") {
    return (
      <section
        key={index}
        className="mt-6 rounded-[22px] bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:mt-8 sm:rounded-[26px] sm:p-6 lg:rounded-[30px]"
      >
        {section.title && (
          <h2 className="mb-3 text-lg font-black text-slate-900 sm:text-xl">
            {section.title}
          </h2>
        )}

        {section.objective && (
          <div className="mb-4">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
              Objetivo
            </p>
            {renderRichTextOrParagraph(
              section.objective,
              "text-sm leading-7 text-slate-700 sm:text-base"
            )}
          </div>
        )}

        {section.instructions && (
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
              Indicaciones
            </p>
            {renderRichTextOrParagraph(
              section.instructions,
              "text-sm leading-7 text-slate-700 sm:text-base whitespace-pre-line"
            )}
          </div>
        )}
      </section>
    );
  }

  if (type === "resource.phase-list") {
    return (
      <section
        key={index}
        className="mt-6 rounded-[22px] bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:mt-8 sm:rounded-[26px] sm:p-6 lg:rounded-[30px]"
      >
        {section.title && (
          <h2 className="mb-2 text-lg font-black text-slate-900 sm:text-xl">
            {section.title}
          </h2>
        )}

        {section.intro && (
          <div className="mb-5">
            {renderRichTextOrParagraph(
              section.intro,
              "text-sm leading-7 text-slate-600 sm:text-base"
            )}
          </div>
        )}

        <div className="space-y-4">
          {(section.phases ?? []).map((phase: any, phaseIndex: number) => (
            <article
              key={phaseIndex}
              className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/60"
            >
              <p className="text-sm font-bold text-teal-700">
                Fase {phase.phase_number ?? phaseIndex + 1}
              </p>

              <h3 className="mt-1 text-base font-black text-slate-900 sm:text-lg">
                {phase.title}
              </h3>

              {phase.main_resource && (
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  Recurso principal: {phase.main_resource}
                </p>
              )}

              {phase.objective && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    Objetivo
                  </p>
                  {renderRichTextOrParagraph(
                    phase.objective,
                    "text-sm leading-7 text-slate-700 sm:text-base whitespace-pre-line"
                  )}
                </div>
              )}

              {phase.development && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    Desarrollo
                  </p>
                  {renderRichTextOrParagraph(
                    phase.development,
                    "text-sm leading-7 text-slate-700 sm:text-base whitespace-pre-line"
                  )}
                </div>
              )}

              {phase.expected_results && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    Resultados esperados
                  </p>
                  {renderRichTextOrParagraph(
                    phase.expected_results,
                    "text-sm leading-7 text-slate-700 sm:text-base whitespace-pre-line"
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (type === "resource.links") {
    return (
      <section
        key={index}
        className="mt-6 rounded-[22px] bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:mt-8 sm:rounded-[26px] sm:p-6 lg:rounded-[30px]"
      >
        {section.title && (
          <h2 className="mb-4 text-lg font-black text-slate-900 sm:text-xl">
            {section.title}
          </h2>
        )}

        <div className="space-y-3">
          {(section.items ?? []).map((item: any, linkIndex: number) => (
            <a
              key={linkIndex}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 transition hover:bg-slate-100"
            >
              <div className="font-bold">{item.label}</div>
              {item.type && (
                <div className="text-sm text-slate-500">{item.type}</div>
              )}
            </a>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      key={index}
      className="mt-6 rounded-[22px] bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:mt-8 sm:rounded-[26px] sm:p-6 lg:rounded-[30px]"
    >
      <p className="text-sm font-semibold text-slate-500">Bloque no reconocido</p>
      <pre className="mt-3 overflow-auto rounded-2xl bg-slate-950 p-4 text-xs text-white">
        {JSON.stringify(section, null, 2)}
      </pre>
    </section>
  );
}

export default async function ReaSlugPage({ params }: ReaSlugPageProps) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) notFound();

  const sections = Array.isArray((resource as any).sections)
    ? (resource as any).sections
    : [];
  const hasContent = hasBlocks(resource.content);
  const hasSections = sections.length > 0;

  return (
    <main className="mt-20 min-h-screen bg-[#f8fbff] sm:mt-20">
      <section className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        <Link
          href="/rea"
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-teal-700 shadow-sm ring-1 ring-slate-200 sm:mb-6 sm:px-4 sm:text-sm"
        >
          <ChevronLeft className="h-4 w-4" />
          Volver a la biblioteca
        </Link>

        <article className="relative overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 sm:rounded-[30px] lg:rounded-[36px]">
          <div className="absolute -left-10 top-10 h-24 w-24 rounded-full bg-sky-100 blur-3xl sm:h-32 sm:w-32" />
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-amber-100 blur-3xl sm:h-40 sm:w-40" />
          <div className="absolute bottom-10 left-1/3 h-24 w-24 rounded-full bg-rose-100 blur-3xl sm:h-32 sm:w-32" />

          <div className="grid gap-6 p-4 sm:gap-8 sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
            <div className="relative z-10 order-2 lg:order-1">
              <div className="mb-4 flex flex-wrap gap-2 sm:gap-3">
                {resource.resource_type && (
                  <BubbleBadge tone="teal">{resource.resource_type}</BubbleBadge>
                )}
                {resource.difficulty && (
                  <BubbleBadge tone="amber">{resource.difficulty}</BubbleBadge>
                )}
                {resource.audience && (
                  <BubbleBadge tone="sky">{resource.audience}</BubbleBadge>
                )}
              </div>

              <h1 className="max-w-3xl text-2xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {resource.title}
              </h1>

              {resource.description && (
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8 lg:text-lg">
                  {resource.description}
                </p>
              )}

              <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white sm:mt-6 sm:px-4 sm:text-sm">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span className="truncate sm:whitespace-normal">
                  Un recurso para explorar y aprender paso a paso
                </span>
              </div>
            </div>

            <div className="relative z-10 order-1 lg:order-2">
              <div className="rounded-[22px] bg-gradient-to-br from-[#dff7ff] via-[#fff7d6] to-[#ffe5ef] p-3 shadow-inner sm:rounded-[26px] sm:p-4 lg:rounded-[30px]">
                {resource.cover?.url ? (
                  <div className="relative h-[220px] overflow-hidden rounded-[18px] bg-white sm:h-[280px] sm:rounded-[22px] md:h-[320px] lg:h-[360px] lg:rounded-[26px]">
                    <Image
                      src={resource.cover.url}
                      alt={
                        resource.cover.alternativeText ||
                        `Portada de ${resource.title}`
                      }
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 45vw"
                    />
                  </div>
                ) : (
                  <div className="flex h-[220px] items-center justify-center rounded-[18px] bg-white sm:h-[280px] sm:rounded-[22px] md:h-[320px] lg:h-[360px] lg:rounded-[26px]">
                    <BookOpen className="h-10 w-10 text-teal-700 sm:h-12 sm:w-12" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative z-10 px-4 pb-4 sm:px-6 sm:pb-6 lg:px-10 lg:pb-10">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {!!resource.age_groups?.length && (
                <MiniCard
                  icon={<Users className="h-5 w-5" />}
                  title="Grupo de edad"
                  className="bg-[#ecfdf5]"
                >
                  <div className="flex flex-wrap gap-2">
                    {resource.age_groups.map((group) => (
                      <span
                        key={group.id ?? group.name}
                        className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 sm:text-sm"
                      >
                        {group.name}
                      </span>
                    ))}
                  </div>
                </MiniCard>
              )}

              {!!resource.categories?.length && (
                <MiniCard
                  icon={<Shapes className="h-5 w-5" />}
                  title="Categorías"
                  className="bg-[#eff6ff]"
                >
                  <div className="flex flex-wrap gap-2">
                    {resource.categories.map((category) => (
                      <span
                        key={category.id ?? category.name}
                        className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 sm:text-sm"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </MiniCard>
              )}

              {!!resource.tags?.length && (
                <MiniCard
                  icon={<Tag className="h-5 w-5" />}
                  title="Etiquetas"
                  className="bg-[#fff7ed]"
                >
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag.id ?? tag.name}
                        className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 sm:text-sm"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </MiniCard>
              )}

              <MiniCard
                icon={<Star className="h-5 w-5" />}
                title="Explora este recurso"
                className="bg-[#fdf2f8]"
              >
                <p className="text-sm leading-6 text-slate-600">
                  Descubre ideas, materiales y propuestas para aprender jugando.
                </p>
              </MiniCard>
            </div>

            {hasSections ? (
              <div className="mt-6 space-y-6 sm:mt-8 sm:space-y-8">
                {sections.map(renderSection)}
              </div>
            ) : hasContent ? (
              <section className="mt-6 rounded-[22px] bg-[#fffefb] p-4 shadow-sm ring-1 ring-slate-200/70 sm:mt-8 sm:rounded-[26px] sm:p-6 lg:rounded-[30px] lg:p-8">
                <div className="mb-5 flex items-start gap-3 sm:mb-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 sm:h-12 sm:w-12">
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black leading-tight text-slate-900 sm:text-2xl">
                      Zona de exploración
                    </h2>
                    <p className="text-xs text-slate-500 sm:text-sm">
                      Lee, descubre y encuentra ideas importantes
                    </p>
                  </div>
                </div>

                <div className="child-content">
                  <BlocksContentRenderer content={resource.content as any} />
                </div>
              </section>
            ) : (
              <section className="mt-6 rounded-[22px] bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:mt-8 sm:rounded-[26px] sm:p-8">
                <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                  Contenido en preparación
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  Este recurso todavía no tiene secciones publicadas.
                </p>
              </section>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}