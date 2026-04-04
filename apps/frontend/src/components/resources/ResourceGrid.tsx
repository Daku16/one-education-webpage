import Link from "next/link";
import { ResourceCard } from "@/src/components/resources/ResourceCard";
import type { Resource } from "@/src/types/resource";

interface ResourceGridProps {
  resources: Resource[];
}

export function ResourceGrid({ resources }: ResourceGridProps) {
  if (!resources.length) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm sm:p-10">
        <h3 className="text-lg font-semibold text-slate-900">
          No encontramos recursos
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
          Prueba ajustando la búsqueda o cambiando los filtros.
        </p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
      {resources.map((resource) => (
        <Link
          key={resource.id}
          href={`/rea/${resource.slug}`}
          className="block h-full"
        >
          <ResourceCard
            title={resource.title}
            cover={resource.cover?.url}
          />
        </Link>
      ))}
    </section>
  );
}