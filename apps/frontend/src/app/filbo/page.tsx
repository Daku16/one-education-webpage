"use client";

import Image from "next/image";
import { useState } from "react";
import { Sparkles, Star, ArrowRight } from "lucide-react";
import clsx from "clsx";

export default function FilboPage() {
  const [active, setActive] = useState(false);
  const [stars, setStars] = useState([false, false, false, false]);

  const foundCount = stars.filter(Boolean).length;
  const completed = foundCount === stars.length;

  const triggerReaction = () => {
    setActive(true);
    window.setTimeout(() => {
      setActive(false);
    }, 850);
  };

  const collectStar = (index: number) => {
    if (stars[index]) return;
    const next = [...stars];
    next[index] = true;
    setStars(next);
    triggerReaction();
  };

  const resetStars = () => {
    setStars([false, false, false, false]);
    triggerReaction();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-emerald-50 to-sky-100">
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-4 top-8 h-32 w-32 rounded-full bg-yellow-200/50 blur-2xl md:left-1/4 md:h-48 md:w-48 lg:h-64 lg:w-64 animation-delay-0" />
          <div className="absolute right-4 top-1/4 h-40 w-40 rounded-full bg-sky-200/50 blur-2xl md:right-1/4 md:h-52 md:w-52 lg:h-80 lg:w-80 animation-delay-2000" />
          <div className="absolute bottom-8 left-1/3 h-36 w-36 rounded-full bg-emerald-200/50 blur-2xl md:bottom-12 md:left-1/4 md:h-44 md:w-44 lg:bottom-0 lg:left-1/3 lg:h-72 lg:w-72 animation-delay-4000" />
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="order-1 lg:order-none lg:pt-8 mt-8 lg:mt-0">

              <h1 className="mt-6 bg-gradient-to-r from-slate-900 via-emerald-900 to-sky-900 bg-clip-text text-transparent drop-shadow-lg text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Gracias por tu compra
              </h1>

              <p className="mt-4 max-w-xl text-lg font-semibold text-slate-800 sm:text-xl md:text-2xl">
                Bienvenido al universo del <span className="font-black">metaverso de ONE</span>
              </p>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg md:text-xl">
                En esta interfaz encontrarás todos los recursos necesarios para aplicar de forma práctica
                los conocimientos del kit que adquiriste.
              </p>

              <div className="mt-8 rounded-[24px] border border-white/80 bg-white/90 p-6 shadow-2xl backdrop-blur-lg sm:mt-10 sm:p-8 md:p-10 lg:mt-10 lg:p-8">
                <div className="flex flex-col items-start gap-4 sm:gap-6 md:flex-row md:items-center md:gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-400 text-white shadow-lg sm:h-14 sm:w-14">
                    <Star className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 sm:text-sm">
                      ¡Listo para comenzar!
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl md:text-lg">
                      Ingresa al curso y comienza tu experiencia
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                  <a
                    href="https://tu-curso.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-sky-600 px-6 py-3.5 text-base font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:from-emerald-700 hover:to-sky-700 active:scale-[0.98]"
                  >
                    Ir al curso
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
                  </a>

                  {!completed && (
                    <button
                      type="button"
                      onClick={resetStars}
                      className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg active:scale-[0.98]"
                    >
                      Reiniciar estrellas
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="order-2 relative lg:order-none">
              <div className="absolute inset-0 rounded-[32px] border-2 border-white/70 bg-white/70 p-4 shadow-2xl backdrop-blur-xl sm:rounded-[40px] sm:p-6 md:rounded-[40px] md:p-8 lg:rounded-[48px]" />

              <div className="relative mx-auto flex min-h-[360px] max-w-[340px] flex-col items-center justify-start rounded-[32px] sm:min-h-[440px] sm:max-w-sm md:min-h-[500px] md:max-w-md lg:min-h-[560px] lg:max-w-lg">
                <div
                  className={clsx(
                    "pointer-events-none absolute right-2 top-4 z-20 rounded-xl bg-emerald-500/90 px-4 py-2.5 text-xs font-black text-white shadow-2xl backdrop-blur transition-all duration-500 sm:right-4 sm:top-6 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm",
                    active ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
                  )}
                >
                  ¡Estrellas: {foundCount}/4!
                </div>

                <div
                  className={clsx(
                    "pointer-events-none absolute left-6 top-20 z-10 rounded-full bg-yellow-400 px-3 py-1.5 text-xs font-black text-white shadow-lg transition-all duration-500 delay-150 sm:left-12 sm:top-32 sm:px-4 sm:py-2",
                    active ? "translate-x-3 scale-110 opacity-100" : "translate-x-0 scale-100 opacity-0"
                  )}
                >
                  ✨
                </div>

                <div className="relative z-10 mt-16 w-full max-w-[260px] sm:mt-20 sm:max-w-[300px] md:max-w-[340px]">
                  <div
                    className={clsx(
                      "absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-yellow-200/50 to-emerald-200/50 blur-xl transition-all duration-500 sm:rounded-3xl",
                      active ? "scale-110 opacity-100" : "scale-100 opacity-80"
                    )}
                  />

                  <div className="relative aspect-[4/5] w-full lg:max-w-[360px] lg:scale-110 lg:aspect-[1/0.5]">
                    <Image
                      src="/One.png"
                      alt="Personaje ONE del metaverso celebrando tu compra FILBO"
                      fill
                      priority
                      sizes="(max-width: 640px) 260px, (max-width: 768px) 300px, (max-width: 1024px) 340px, 400px"
                      className={clsx(
                        "object-contain drop-shadow-[0_18px_30px_rgba(15,23,42,0.22)] transition-all duration-300",
                        active ? "scale-110 -translate-y-2" : "scale-100 translate-y-0",
                        "animate-[pulse-slow_4s_ease-in-out_infinite]"
                      )}
                    />
                  </div>
                </div>

                <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-500 sm:mt-8 sm:text-sm sm:tracking-[0.3em]">
                  Explora el metaverso
                </p>

                <div className="mt-4 grid w-full grid-cols-2 gap-2.5 sm:m-6 sm:gap-3 md:gap-4 m-16">
                  {["⭐", "🌟", "✨", "⭐"].map((emoji, index) => {
                    const collected = stars[index];
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => collectStar(index)}
                        disabled={collected}
                        className={clsx(
                          "ml-4 mr-4 group flex min-h-16 flex-col items-center justify-center rounded-xl border-2 p-2.5 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 sm:min-h-20 sm:rounded-xl sm:p-3 sm:hover:-translate-y-1.5 md:min-h-20 md:hover:-translate-y-2",
                          collected
                            ? "border-emerald-300 bg-emerald-100/80 text-emerald-700 shadow-emerald-200/50 backdrop-blur"
                            : "border-white/90 bg-white/95 text-slate-700 shadow-lg hover:border-emerald-300 hover:bg-emerald-50/80 hover:shadow-emerald-200/50 hover:text-emerald-700 active:scale-[0.97]"
                        )}
                      >
                        <span className="text-xl transition-transform group-hover:scale-110 sm:text-2xl md:text-3xl">
                          {collected ? "🌟" : emoji}
                        </span>
                        <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider sm:mt-1 sm:text-[10px]">
                          {collected ? "¡Obtenida!" : "Recolecta"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 mb-4 ml-4 mr-4 rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50/80 px-3 py-2.5 text-center backdrop-blur sm:mt-6 sm:px-4 sm:py-3">
                  <p className="text-xs font-semibold text-emerald-800 sm:text-sm">
                    {completed
                      ? "¡Todas recolectadas! El universo ONE te espera ✨"
                      : `Estrellas: ${foundCount} de 4`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse-slow {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }

          .animation-delay-0 {
            animation: pulse-slow 8s ease-in-out infinite;
          }

          .animation-delay-2000 {
            animation: pulse-slow 8s ease-in-out 2s infinite;
          }

          .animation-delay-4000 {
            animation: pulse-slow 8s ease-in-out 4s infinite;
          }

          @media (max-width: 640px) {
            main {
              padding-top: env(safe-area-inset-top);
            }
          }
        `}</style>
      </section>
    </main>
  );
}