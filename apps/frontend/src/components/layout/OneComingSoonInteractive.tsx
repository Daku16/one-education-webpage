"use client";

import Image from "next/image";
import { useState } from "react";
import { Sparkles, Stars } from "lucide-react";
import clsx from "clsx";

const sounds = ["¡clic!", "¡wow!", "¡construyendo!", "¡tic-tic!", "¡vamos!"] as const;

const hints = [
  "Estoy preparando esta página para ti.",
  "Todavía faltan unas piezas mágicas.",
  "Cada toque me ayuda a construir algo nuevo.",
  "Muy pronto podrás explorar esta sección.",
];

export function OneComingSoonInteractive() {
  const [soundIndex, setSoundIndex] = useState(0);
  const [hintIndex, setHintIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [pieces, setPieces] = useState([false, false, false, false]);

  const sound = sounds[soundIndex];
  const foundCount = pieces.filter(Boolean).length;
  const completed = foundCount === pieces.length;

  const triggerReaction = (forcedIndex?: number) => {
    setSoundIndex((prev) =>
      typeof forcedIndex === "number" ? forcedIndex : (prev + 1) % sounds.length
    );

    setActive(true);

    window.setTimeout(() => {
      setActive(false);
    }, 850);
  };

  const handlePiece = (index: number) => {
    if (pieces[index]) return;

    const next = [...pieces];
    next[index] = true;
    setPieces(next);
    setHintIndex((prev) => (prev + 1) % hints.length);
    triggerReaction(index % sounds.length);
  };

  const reset = () => {
    setPieces([false, false, false, false]);
    setHintIndex(0);
    triggerReaction(4);
  };

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-br from-amber-50 via-emerald-50 to-sky-100 px-6 py-8 shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-yellow-200/40 blur-3xl" />
        <div className="absolute right-0 top-10 h-52 w-52 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-emerald-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Página en desarrollo
          </div>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
            ONE está construyendo una nueva aventura
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Esta parte del sitio aún se está creando. Mientras tanto, puedes ayudar a
            ONE tocando las piezas mágicas del laboratorio.
          </p>

          <div className="mt-6 rounded-[24px] border border-white/70 bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-full bg-emerald-100 p-2 text-emerald-700">
                <Stars className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Mensaje de ONE
                </p>
                <p className="mt-2 text-base font-medium leading-7 text-slate-800">
                  {completed
                    ? "¡Lo logramos! Esta página ya casi está lista para explorar."
                    : hints[hintIndex]}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => triggerReaction(1)}
                className="inline-flex min-h-11 items-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.98]"
              >
                Animar a ONE
              </button>

              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-11 items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-[30px] border border-white/70 bg-white/60 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_18px_50px_rgba(15,23,42,0.10)] backdrop-blur">
          <div className="relative mx-auto flex min-h-[430px] max-w-md flex-col items-center justify-center">
            <div
              className={clsx(
                "absolute right-2 top-3 z-20 rounded-2xl border border-white/80 bg-white px-4 py-2 text-sm font-black text-emerald-700 shadow-lg transition-all duration-300",
                active ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-80"
              )}
            >
              {sound}
            </div>

            <span
              className={clsx(
                "pointer-events-none absolute left-0 top-20 z-20 rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-white shadow-md transition-all duration-300",
                active ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-75 opacity-0"
              )}
            >
              ¡clic!
            </span>

            <span
              className={clsx(
                "pointer-events-none absolute right-0 top-44 z-20 rounded-full bg-sky-500 px-3 py-1 text-xs font-black text-white shadow-md transition-all duration-300 delay-75",
                active ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-75 opacity-0"
              )}
            >
              ¡wow!
            </span>

            <span
              className={clsx(
                "pointer-events-none absolute left-8 bottom-20 z-20 rounded-full bg-emerald-500 px-3 py-1 text-xs font-black text-white shadow-md transition-all duration-300 delay-100",
                active ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-75 opacity-0"
              )}
            >
              ¡construyendo!
            </span>

            <div className="relative flex items-center justify-center">
              <div
                className={clsx(
                  "absolute inset-0 rounded-full bg-emerald-300/30 blur-3xl transition-all duration-300",
                  active ? "scale-110 opacity-100" : "scale-95 opacity-70"
                )}
              />

              <Image
                src="/One.png"
                alt="Personaje ONE construyendo una nueva sección"
                width={320}
                height={320}
                priority
                className={clsx(
                  "relative z-10 mx-auto w-[220px] drop-shadow-[0_18px_30px_rgba(15,23,42,0.22)] transition-all duration-300 sm:w-[280px]",
                  active ? "scale-105 -translate-y-1" : "scale-100 translate-y-0",
                  !active && "animate-[float_3.6s_ease-in-out_infinite]"
                )}
              />
            </div>

            <p className="mt-10 text-center text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
              Ayuda a ONE a terminar esta página
            </p>

            <div className="mt-8 grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
              {["⚙️", "💡", "🧩", "🚀"].map((item, index) => {
                const done = pieces[index];

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handlePiece(index)}
                    disabled={done}
                    className={clsx(
                      "flex min-h-24 flex-col items-center justify-center rounded-[22px] border text-center shadow-sm transition duration-300",
                      done
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-white/80 bg-white/85 text-slate-700 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]"
                    )}
                  >
                    <span className="text-3xl">{done ? "⭐" : item}</span>
                    <span className="mt-2 text-xs font-bold uppercase tracking-[0.16em]">
                      {done ? "lista" : "pieza"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-[20px] border border-dashed border-slate-300 bg-slate-50/80 px-4 py-3 text-center text-sm font-medium text-slate-600">
              {completed
                ? "ONE reunió todas las piezas. Muy pronto estará disponible esta sección."
                : `Piezas encontradas: ${foundCount}/4`}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </section>
  );
}