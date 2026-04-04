"use client";

import { useMemo, useState } from "react";
import { ResourceFilters } from "@/src/components/resources/ResourceFilters";
import { ResourceGrid } from "@/src/components/resources/ResourceGrid";
import type { Resource } from "../../types/resource";
import Image from "next/image";

interface ResourcesSectionProps {
  resources: Resource[];
}

function uniqueOptions(values: string[]): { label: string; value: string }[] {
  return Array.from(new Set(values.filter(Boolean))).map((value) => ({
    label: value,
    value,
  }));
}

export function ResourcesSection({ resources }: ResourcesSectionProps) {
  const [search, setSearch] = useState("");
  const [audience, setAudience] = useState("all");
  const [resourceType, setResourceType] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [ageGroup, setAgeGroup] = useState("all");

  const resourceTypes = useMemo(
    () =>
      uniqueOptions(
        resources.map((r) => (r.resource_type || "").trim()).filter(Boolean)
      ),
    [resources]
  );

  const difficulties = useMemo(
    () =>
      uniqueOptions(
        resources.map((r) => (r.difficulty || "").trim()).filter(Boolean)
      ),
    [resources]
  );

  const ageGroups = useMemo(
    () =>
      uniqueOptions(
        resources.flatMap((r) =>
          (r.age_groups || []).map((g) => (g.name || "").trim())
        )
      ),
    [resources]
  );

  const filteredResources = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();
    const normalizedAudience = audience.toLowerCase().trim();
    const normalizedResourceType = resourceType.toLowerCase().trim();
    const normalizedDifficulty = difficulty.toLowerCase().trim();
    const normalizedAgeGroup = ageGroup.toLowerCase().trim();

    return resources.filter((resource) => {
      const categories = resource.categories || [];
      const tags = resource.tags || [];
      const ageGroups = resource.age_groups || [];

      const resourceAudience = (resource.audience || "").toLowerCase().trim();
      const resourceTypeValue = (resource.resource_type || "")
        .toLowerCase()
        .trim();
      const difficultyValue = (resource.difficulty || "")
        .toLowerCase()
        .trim();

      const searchableText = [
        resource.title,
        resource.description,
        resource.resource_type,
        resource.difficulty,
        ...categories.map((c) => c.name),
        ...tags.map((t) => t.name),
        ...ageGroups.map((g) => g.name),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(normalizedSearch);

      const matchesAudience =
        normalizedAudience === "all" || resourceAudience === normalizedAudience;

      const matchesType =
        normalizedResourceType === "all" ||
        resourceTypeValue === normalizedResourceType;

      const matchesDifficulty =
        normalizedDifficulty === "all" ||
        difficultyValue === normalizedDifficulty;

      const matchesAgeGroup =
        normalizedAgeGroup === "all" ||
        ageGroups.some(
          (group) => group.name.toLowerCase().trim() === normalizedAgeGroup
        );

      return (
        matchesSearch &&
        matchesAudience &&
        matchesType &&
        matchesDifficulty &&
        matchesAgeGroup
      );
    });
  }, [resources, search, audience, resourceType, difficulty, ageGroup]);

  return (
    <section className="w-full space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:rounded-3xl sm:p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 sm:mb-5">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-100 via-cyan-50 to-amber-100 blur-2xl" />

              <Image
                src="/One.png"
                alt="Ilustración para identificar recursos educativos"
                width={240}
                height={240}
                priority
                className="relative mx-auto h-auto w-36 object-contain drop-shadow-[0_12px_24px_rgba(15,23,42,0.12)] animate-[float-soft_3.5s_ease-in-out_infinite] sm:w-44 md:w-52"
              />
            </div>

            <div className="mb-4 rounded-full bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white shadow-md sm:px-4 sm:py-2 sm:text-sm">
              ¡Identifícate!
            </div>

            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              ONE te ayuda a elegir
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
              Explora recursos abiertos por perfil, dificultad, tipo y grupo de edad.
            </p>
          </div>
        </aside>

        <div className="min-w-0 space-y-6">
          <ResourceFilters
            search={search}
            onSearchChange={setSearch}
            audience={audience}
            onAudienceChange={setAudience}
            resourceType={resourceType}
            onResourceTypeChange={setResourceType}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            ageGroup={ageGroup}
            onAgeGroupChange={setAgeGroup}
            resourceTypes={resourceTypes}
            difficulties={difficulties}
            ageGroups={ageGroups}
            total={filteredResources.length}
          />

          <ResourceGrid resources={filteredResources} />
        </div>
      </div>
    </section>
  );
}