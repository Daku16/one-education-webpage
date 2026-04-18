import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[24px] bg-[#f4fbfb] sm:rounded-[28px] md:grid-cols-2 md:items-center lg:rounded-[32px]">
        <div className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-[#bfeeee] sm:-left-10 sm:-top-10 sm:h-32 sm:w-32 md:h-40 md:w-40" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 rounded-tl-[70px] bg-[#f6c65b] sm:h-24 sm:w-24 sm:rounded-tl-[80px] md:h-32 md:w-32 md:rounded-tl-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-8 h-12 w-12 rounded-tl-[40px] bg-[#15c8d0] sm:right-10 sm:h-16 sm:w-16 sm:rounded-tl-[48px] md:right-12 md:h-20 md:w-20 md:rounded-tl-[60px]" />

        <div className="order-2 relative z-10 px-5 pb-8 pt-2 sm:px-8 sm:pb-10 sm:pt-4 md:order-1 md:px-8 md:py-10 lg:px-12 lg:py-12">
          <h1 className="max-w-[18ch] text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-[#111827] sm:text-4xl lg:text-5xl">
            <span className="text-[#1baed1]">ONE Education</span>{" "}
            <span className="text-[#111827]">
              Creciendo con tecnología, explorando con curiosidad
            </span>
          </h1>

          <p className="mt-4 max-w-[34ch] text-sm leading-6 text-[#374151] sm:max-w-[48ch] sm:text-base sm:leading-7">
            Recursos, investigación y proyectos para la primera infancia,
            integrando ciencia, tecnología y experiencias de aprendizaje
            significativas.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/rea"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#17c9d3] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(23,201,211,0.28)] transition hover:-translate-y-0.5 hover:bg-[#10b8c1] sm:w-auto"
            >
              Explorar recursos
            </Link>

            <Link
              href="/sobre"
              className="mb-2 lg:mb-0 inline-flex w-full items-center justify-center rounded-full bg-[#ff866f] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(255,134,111,0.28)] transition hover:-translate-y-0.5 hover:bg-[#f9735b] sm:w-auto"
            >
              Conoce la metodología
            </Link>
          </div>
        </div>

        <div className="order-1 relative flex items-end justify-center px-4 pt-6 sm:px-6 sm:pt-8 md:order-2 md:px-8 md:pt-10 lg:px-10">
          <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[560px]">
            <Image
              src="/hero-lab.webp"
              alt="Ilustración educativa de ciencia y tecnología"
              width={900}
              height={520}
              priority
              sizes="(max-width: 640px) 340px, (max-width: 768px) 420px, (max-width: 1024px) 520px, 560px"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}