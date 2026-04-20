import { ResourceCard } from "@/src/components/resources/ResourceCard";
import type { Resource } from "@/src/types/resource";

interface ResourceGridProps {
  resources: Resource[];
}

export function ResourceGrid({ resources }: ResourceGridProps) {
  if (!resources.length) {
    return (
      <section className="rounded-[28px] border border-dashed border-[#d7d0c1] bg-[#f7f3ea] p-8 text-center shadow-sm sm:p-10">
        <h3 className="text-lg font-semibold text-[#1f1d18]">
          No encontramos recursos
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#686252] sm:text-base">
          Prueba ajustando la búsqueda o cambiando los filtros.
        </p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-7">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </section>
  );
}