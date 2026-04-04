import {
  Atom,
  Blocks,
  Brain,
  Cpu,
  Gamepad2,
  Lightbulb,
  Puzzle,
  ScrollText,
} from "lucide-react";

const items = [
  {
    title: "STEAM",
    icon: Atom,
    color: "bg-sky-100 text-sky-700",
    description:
      "Aprendemos conectando ciencia, tecnología, ingeniería, arte y matemáticas.",
  },
  {
    title: "Construcción de artefactos",
    icon: Blocks,
    color: "bg-amber-100 text-amber-700",
    description:
      "Creamos objetos, exploramos materiales y damos forma a nuevas ideas.",
  },
  {
    title: "Pensamiento ingenieril",
    icon: Lightbulb,
    color: "bg-yellow-100 text-yellow-700",
    description:
      "Imaginamos soluciones, probamos ideas y mejoramos lo que construimos.",
  },
  {
    title: "Pensamiento computacional",
    icon: Cpu,
    color: "bg-violet-100 text-violet-700",
    description:
      "Descubrimos patrones, secuencias y formas de resolver retos paso a paso.",
  },
  {
    title: "Juego",
    icon: Gamepad2,
    color: "bg-pink-100 text-pink-700",
    description:
      "Jugamos para descubrir, aprender y entender el mundo con alegría.",
  },
  {
    title: "Narrativas",
    icon: ScrollText,
    color: "bg-rose-100 text-rose-700",
    description:
      "Las historias despiertan la imaginación y acompañan cada experiencia.",
  },
  {
    title: "Construccionismo",
    icon: Puzzle,
    color: "bg-emerald-100 text-emerald-700",
    description:
      "Aprendemos haciendo con las manos, creando y reflexionando sobre lo vivido.",
  },
  {
    title: "Neuroeducación",
    icon: Brain,
    color: "bg-cyan-100 text-cyan-700",
    description:
      "Diseñamos experiencias que respetan cómo aprenden y crecen los niños.",
  },
];

export default function Methodology() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-gradient-to-r from-cyan-100 to-sky-100 px-4 py-1.5 text-sm font-semibold text-cyan-800 ring-1 ring-cyan-200/70">
            Aprender jugando
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Nuestro modelo integra
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            En ONE Education unimos juego, creatividad, exploración y tecnología
            para que los niños descubran cómo funciona el mundo mientras crean,
            imaginan y resuelven problemas.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className={`group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)] ${
                  index % 2 === 0 ? "xl:-mt-2" : "xl:mt-2"
                }`}
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-2xl" />

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-xl font-bold leading-snug text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}