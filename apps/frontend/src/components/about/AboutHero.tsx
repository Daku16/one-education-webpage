import Image from "next/image";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(13,148,136,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.14),transparent_28%)]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-12 lg:items-center lg:px-8 lg:py-24">
        <div className="relative z-10 lg:col-span-7">
          <span className="mb-4 inline-flex rounded-full border border-teal-200 bg-teal-50 px-4 py-1 text-sm font-medium text-teal-800">
            Sobre ONE
          </span>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Ingeniería, ciencia y tecnología para la primera infancia desde el juego y la exploración
          </h1>

          <div className="mt-6 max-w-3xl space-y-5 text-base leading-8 text-stone-600 sm:text-lg">
            <p>
              ONE Education es un enfoque pedagógico que introduce a los niños en los principios de la ingeniería,
              la ciencia y la tecnología a través de la exploración, el juego y la construcción.
            </p>

            <p>
              Inspirado en el movimiento internacional STEAM education, ONE Education propone una adaptación profunda
              de estos principios para niños desde los primeros años de vida.
            </p>

            <p>
              A través de historias, retos de construcción y experiencias de cacharreo, los niños desarrollan once
              formas de pensamiento que fortalecen su curiosidad, creatividad y capacidad para resolver problemas.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/rea"
              className="inline-flex items-center rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              Explorar REA
            </Link>

            <a
              href="#vision"
              className="inline-flex items-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-100"
            >
              Conocer la visión
            </a>
          </div>
        </div>

        <div className="relative z-10 lg:col-span-5">
          <div className="about-scene relative min-h-[300px] overflow-hidden rounded-[2rem] border border-white/50 bg-gradient-to-br from-amber-100 via-orange-50 to-teal-100 shadow-sm">
            <div className="absolute inset-0 opacity-90">
              <div className="about-glow absolute left-6 top-8 h-16 w-16 rounded-full bg-white/80 blur-md" />
              <div className="about-glow-delay absolute right-12 top-10 h-24 w-24 rounded-full bg-teal-200/70 blur-md" />
              <div className="about-glow-slow absolute left-16 bottom-16 h-20 w-20 rounded-full bg-amber-200/70 blur-md" />
              <div className="about-glow-delay absolute right-10 bottom-14 h-14 w-14 rounded-full bg-white/70 blur-md" />
            </div>

            <div className="absolute left-5 top-5 z-20 max-w-[220px] rounded-2xl bg-white/65 px-4 py-3 backdrop-blur-[3px] shadow-sm">
              <p className="text-sm font-medium leading-6 text-stone-700">
                Explorar, construir, imaginar y resolver.
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/30 to-transparent" />

            <div className="absolute bottom-[76px] left-0 right-0 flex justify-center">
              <div className="flex gap-3 opacity-35">
                <span className="h-2 w-2 rounded-full bg-teal-400" />
                <span className="h-2 w-2 rounded-full bg-amber-300" />
                <span className="h-2 w-2 rounded-full bg-white" />
              </div>
            </div>

            <div className="absolute bottom-12 -left-4 -right-4 h-1.5 rounded-full bg-stone-300/80" />

            <div className="absolute bottom-[41px] left-6 right-6 flex justify-between opacity-35">
              <span className="h-4 w-1 rounded-full bg-stone-400/70" />
              <span className="h-4 w-1 rounded-full bg-stone-400/70" />
              <span className="h-4 w-1 rounded-full bg-stone-400/70" />
              <span className="h-4 w-1 rounded-full bg-stone-400/70" />
              <span className="h-4 w-1 rounded-full bg-stone-400/70" />
              <span className="h-4 w-1 rounded-full bg-stone-400/70" />
            </div>

            <div className="about-walker absolute bottom-[48px] left-4 z-20">
              <div className="about-character relative">
                <div className="about-wave-arm" aria-hidden="true" />

                <Image
                  src="/One.png"
                  alt="Personaje ONE saludando mientras avanza"
                  width={160}
                  height={120}
                  priority
                  className="relative z-10 h-auto w-[124px] select-none object-contain sm:w-[144px]"
                />

                <div className="about-breath-ring" aria-hidden="true" />

                <div className="about-bubble" aria-hidden="true">
                  ¡Hola!
                </div>

                <span className="about-spark about-spark-1" />
                <span className="about-spark about-spark-2" />
                <span className="about-spark about-spark-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}