// apps/frontend/src/components/home/Hero.tsx
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-4 py-6 md:px-6 lg:px-8">
      <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[32px] bg-[#f4fbfb] md:grid-cols-2 md:items-center">
        {/* Formas decorativas */}
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#bfeeee] blur-0" />
        <div className="absolute bottom-0 right-0 h-32 w-32 rounded-tl-[100px] bg-[#f6c65b]" />
        <div className="absolute bottom-0 right-12 h-20 w-20 rounded-tl-[60px] bg-[#15c8d0]" />

        {/* Ilustración */}
        <div className="relative flex items-end justify-center px-6 pt-8 md:px-10 md:pt-10">
          <div className="relative w-full max-w-[560px]">
            <Image
              src="/hero-lab.webp"
              alt="Ilustración educativa de ciencia y tecnología"
              width={900}
              height={520}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Contenido */}
        <div className="relative z-10 px-6 pb-10 pt-6 md:px-8 md:py-10 lg:px-12">
          <h1 className="max-w-[20ch] text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-[#111827] md:text-4xl lg:text-5xl">
            <span className="text-[#1baed1]">ONE Education</span>{" "}
            <span className="text-[#111827]">
              Creciendo con tecnología, explorando con curiosidad
            </span>
          </h1>

          <p className="mt-4 max-w-[52ch] text-sm text-[#374151] md:text-base">
            Recursos, investigación y proyectos para la primera infancia,
            integrando ciencia, tecnología y experiencias de aprendizaje
            significativas.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/rea"
              className="rounded-full bg-[#17c9d3] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(23,201,211,0.28)] transition hover:-translate-y-0.5 hover:bg-[#10b8c1]"
            >
              Explorar recursos
            </Link>

            <Link
              href="/sobre"
              className="rounded-full bg-[#ff866f] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(255,134,111,0.28)] transition hover:-translate-y-0.5 hover:bg-[#f9735b]"
            >
              Conoce la metodología
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}