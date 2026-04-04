const visionItems = [
  "La ingeniería está en su entorno",
  "La ciencia se puede explorar jugando",
  "La tecnología puede construirse con las manos",
];

export default function VisionSection() {
  return (
    <section id="vision" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-stone-200/70 lg:grid-cols-12 lg:p-10">
          <div className="lg:col-span-5">
            <span className="mb-3 inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">
              La visión de ONE
            </span>

            <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Formar ciudadanos que comprendan, creen y colaboren
            </h2>
          </div>

          <div className="lg:col-span-7">
            <p className="mb-6 max-w-3xl text-base leading-8 text-stone-600 sm:text-lg">
              El mundo actual necesita ciudadanos capaces de comprender cómo funcionan las cosas, crear soluciones y
              trabajar colaborativamente.
            </p>

            <ul className="grid gap-4">
              {visionItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4"
                >
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-teal-600" />
                  <span className="text-stone-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}