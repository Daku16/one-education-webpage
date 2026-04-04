const innovationItems = [
  "Ingeniería temprana",
  "Pensamiento computacional",
  "Cultura",
  "Juego",
  "Exploración tecnológica",
];

export default function InnovationSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8 lg:py-8">
        <div className="grid gap-8 overflow-hidden rounded-[2rem] bg-teal-950 p-8 text-white shadow-sm lg:grid-cols-12 lg:p-10">
          <div className="lg:col-span-5">
            <span className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-100">
              La innovación de ONE
            </span>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              STEAM desde los primeros años de vida
            </h2>
          </div>

          <div className="lg:col-span-7">
            <p className="mb-6 max-w-3xl text-base leading-8 text-teal-50/90 sm:text-lg">
              Mientras muchos programas STEAM comienzan en primaria o secundaria, ONE se enfoca en los primeros años
              de vida, cuando se forman las bases del pensamiento.
            </p>

            <div className="flex flex-wrap gap-3">
              {innovationItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}