export function Stats() {
  const stats = [
    { value: "+4000", label: "Niños capacitados" },
    { value: "+500", label: "Docentes formados" },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
          Impacto
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Resultados que reflejan transformación educativa
        </h2>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white/80 shadow-sm">
        <div className="grid divide-y divide-neutral-200 md:grid-cols-2 md:divide-x md:divide-y-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col justify-center px-6 py-10 text-center md:px-8 md:text-left"
            >
              <span className="text-[clamp(2.25rem,5vw,4rem)] font-bold tracking-tight text-indigo-600">
                {stat.value}
              </span>
              <p className="mt-2 text-sm font-medium text-neutral-700 sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}