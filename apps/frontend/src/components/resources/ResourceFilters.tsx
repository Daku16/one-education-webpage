import type { ChangeEvent } from "react";

interface Option {
  label: string;
  value: string;
}

interface ResourceFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  audience: string;
  onAudienceChange: (value: string) => void;
  resourceType: string;
  onResourceTypeChange: (value: string) => void;
  difficulty: string;
  onDifficultyChange: (value: string) => void;
  ageGroup: string;
  onAgeGroupChange: (value: string) => void;
  resourceTypes: Option[];
  difficulties: Option[];
  ageGroups: Option[];
  total: number;
}

const audienceOptions: Option[] = [
  { label: "Todos", value: "all" },
  { label: "Docentes", value: "docente" },
  { label: "Niños", value: "nino" },
  { label: "Familias", value: "familias" },
];

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}) {
  return (
    <label className="flex min-w-0 flex-col gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ResourceFilters({
  search,
  onSearchChange,
  audience,
  onAudienceChange,
  resourceType,
  onResourceTypeChange,
  difficulty,
  onDifficultyChange,
  ageGroup,
  onAgeGroupChange,
  resourceTypes,
  difficulties,
  ageGroups,
  total,
}: ResourceFiltersProps) {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
              Filtrar recursos
            </h3>
            <p className="text-sm text-slate-500">
              {total} recurso{total !== 1 ? "s" : ""} encontrado
              {total !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              onSearchChange("");
              onAudienceChange("all");
              onResourceTypeChange("all");
              onDifficultyChange("all");
              onAgeGroupChange("all");
            }}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Limpiar filtros
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <label className="flex min-w-0 flex-col gap-2 md:col-span-2 xl:col-span-3">
            <span className="text-sm font-medium text-slate-700">Buscar</span>
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Título, descripción, categoría o etiqueta"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            />
          </label>

          <FilterSelect
            label="Audiencia"
            value={audience}
            onChange={onAudienceChange}
            options={audienceOptions}
          />

          <FilterSelect
            label="Tipo de recurso"
            value={resourceType}
            onChange={onResourceTypeChange}
            options={[{ label: "Todos", value: "all" }, ...resourceTypes]}
          />

          <FilterSelect
            label="Dificultad"
            value={difficulty}
            onChange={onDifficultyChange}
            options={[{ label: "Todas", value: "all" }, ...difficulties]}
          />

          <FilterSelect
            label="Grupo de edad"
            value={ageGroup}
            onChange={onAgeGroupChange}
            options={[{ label: "Todos", value: "all" }, ...ageGroups]}
          />
        </div>
      </div>
    </section>
  );
}