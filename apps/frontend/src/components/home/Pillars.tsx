"use client";

import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { topics } from "./StemCards";

const PILLARS = [
  {
    id: "mecanica",
    title: "Mecánica",
    subtitle: "Poleas, palancas, piñones, resortes",
    side: "right" as const,
    top: "20%",
    mobileTop: "20%",
    progress: 0.18,
    color: "from-orange-300 via-amber-200 to-yellow-100",
    tint: "rgba(251, 146, 60, 0.16)",
    strongTint: "rgba(251, 146, 60, 0.22)",
    glow: "shadow-[0_0_40px_rgba(251,146,60,0.20)]",
  },
  {
    id: "electronica",
    title: "Electrónica",
    subtitle: "Voltaje, corriente, sensores, motores",
    side: "left" as const,
    top: "36%",
    mobileTop: "34%",
    progress: 0.4,
    color: "from-sky-300 via-cyan-200 to-blue-100",
    tint: "rgba(56, 189, 248, 0.16)",
    strongTint: "rgba(56, 189, 248, 0.22)",
    glow: "shadow-[0_0_40px_rgba(56,189,248,0.20)]",
  },
  {
    id: "programacion",
    title: "Programación",
    subtitle: "Algoritmos, variables, bucles, condicionales",
    side: "right" as const,
    top: "58%",
    mobileTop: "43%",
    progress: 0.64,
    color: "from-violet-300 via-fuchsia-200 to-pink-100",
    tint: "rgba(168, 85, 247, 0.16)",
    strongTint: "rgba(168, 85, 247, 0.22)",
    glow: "shadow-[0_0_40px_rgba(168,85,247,0.18)]",
  },
  {
    id: "robotica",
    title: "Robótica",
    subtitle: "Construcción, movimiento, resolución de problemas",
    side: "left" as const,
    top: "64%",
    mobileTop: "50%",
    progress: 0.88,
    color: "from-emerald-300 via-lime-200 to-green-100",
    tint: "rgba(34, 197, 94, 0.16)",
    strongTint: "rgba(34, 197, 94, 0.22)",
    glow: "shadow-[0_0_40px_rgba(34,197,94,0.18)]",
  },
] as const;

type Pillar = (typeof PILLARS)[number];
type Topic = (typeof topics)[number];

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export function Pillars() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const isMobile = useIsMobile();

  const { scrollY, scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const p1 = 0.18;
  const p2 = 0.4;
  const p3 = 0.64;
  const p4 = 0.88;
  const PAUSE = isMobile ? 0.09 : 0.06;

  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [robotPos, setRobotPos] = useState({ x: 18, y: 10 });
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? current;
    const diff = current - previous;

    if (diff > 0) setScrollDirection("down");
    else if (diff < 0) setScrollDirection("up");
  });

  const downBias = isMobile ? 0.035 : 0.02;

  const adjustedProgress = useTransform(scrollYProgress, (value) => {
    if (scrollDirection === "down") {
      return Math.min(1, value + downBias);
    }
    return value;
  });

  const trackProgress = useTransform(
    adjustedProgress,
    [
      0,
      p1 - PAUSE,
      p1 + PAUSE,
      p2 - PAUSE,
      p2 + PAUSE,
      p3 - PAUSE,
      p3 + PAUSE,
      p4 - PAUSE,
      p4 + PAUSE,
      1,
    ],
    [
      0,
      p1 - PAUSE,
      p1,
      p2 - PAUSE,
      p2,
      p3 - PAUSE,
      p3,
      p4 - PAUSE,
      p4,
      1,
    ]
  );

  useMotionValueEvent(trackProgress, "change", (t) => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    const point = path.getPointAtLength(t * totalLength);

    setRobotPos({ x: point.x, y: point.y });

    const THRESHOLD = isMobile ? 0.05 : 0.03;
    let nextIndex = -1;

    if (Math.abs(t - p1) < THRESHOLD) nextIndex = 0;
    else if (Math.abs(t - p2) < THRESHOLD) nextIndex = 1;
    else if (Math.abs(t - p3) < THRESHOLD) nextIndex = 2;
    else if (Math.abs(t - p4) < THRESHOLD) nextIndex = 3;

    setActiveIndex(nextIndex);
  });

  const robotScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? [0.84, 0.94, 0.86] : [0.92, 1.08, 0.94]
  );

  const robotRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-4, 4, -2]);
  const activePillar = activeIndex >= 0 ? PILLARS[activeIndex] : null;

  const pathD = isMobile
    ? `
      M 18 12
      C 10 24, 13 36, 28 46
      S 78 66, 60 86
    `
    : `
      M 18 10
      C 8 22, 10 38, 30 48
      S 88 66, 64 84
    `;

  return (
    <section
      ref={sectionRef}
      className={`relative w-full ${
        isMobile ? "h-[460vh]" : "h-[800vh] lg:h-[900vh]"
      }`}
    >
      <div className="sticky top-20 flex h-dvh items-center justify-center px-3 sm:px-4 lg:px-6">
        <div className="relative h-[100dvh] w-full max-w-7xl overflow-hidden rounded-[24px] border border-white/50 bg-[linear-gradient(180deg,#f8fdff_0%,#f5fbff_20%,#fefcff_55%,#f5fff8_100%)] px-3 shadow-[0_25px_80px_rgba(15,23,42,0.16)] md:rounded-[40px] md:px-6 lg:rounded-[48px] lg:px-8">
          <PremiumBackground
            activePillar={activePillar}
            pathRef={pathRef}
            isMobile={isMobile}
          />

          <div className="absolute left-1/2 top-4 z-40 w-full max-w-3xl -translate-x-1/2 px-4 text-center">
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-[10px] font-semibold text-sky-700 shadow-[0_8px_20px_rgba(56,189,248,0.12)] backdrop-blur-md sm:text-[11px]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              ONE Education · Primera infancia
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-4 text-lg font-black tracking-tight text-slate-900 sm:text-xl md:text-3xl lg:text-4xl"
            >
              ONE acompaña a niñas y niños a explorar ciencia y tecnología
              jugando.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm md:text-sm"
            >
              Introducimos mecánica, electrónica, programación y robótica con
              una ruta STEAM pensada para la curiosidad, el juego, la
              construcción y el pensamiento ingenieril.
            </motion.p>
          </div>

          <svg
            className="pointer-events-none absolute inset-0 z-30 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="one-track-fill-premium" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="35%" stopColor="#60a5fa" />
                <stop offset="68%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>

              <filter id="softGlow">
                <feGaussianBlur stdDeviation="1.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d={pathD}
              fill="none"
              stroke="#ffffff"
              strokeWidth={isMobile ? "9" : "11"}
              strokeLinecap="round"
              opacity={0.78}
              filter="url(#softGlow)"
            />

            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="url(#one-track-fill-premium)"
              strokeWidth={isMobile ? "7" : "9"}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.98}
            />

            <path
              d={pathD}
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth={isMobile ? "1.1" : "1.4"}
              strokeDasharray="2 3"
              strokeLinecap="round"
              opacity={1}
            />
          </svg>

          <PillarMarkers isMobile={isMobile} />

          <motion.div
            className="absolute z-40 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${robotPos.x}%`,
              top: `${robotPos.y}%`,
              scale: robotScale,
              rotate: robotRotate,
            }}
          >
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 md:h-20 md:w-20 lg:h-24 lg:w-24">
              <div className="absolute inset-0 rounded-full bg-white/80 blur-md" />
              <div className="absolute inset-0 rounded-full bg-sky-300/30 blur-2xl" />
              <div className="absolute inset-[-6px] rounded-full border border-white/60" />

              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-full w-full"
              >
                <Image
                  src="/One.png"
                  alt="Robot One"
                  fill
                  sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, (max-width: 1024px) 80px, 96px"
                  className="object-contain drop-shadow-[0_10px_24px_rgba(56,189,248,0.45)]"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          {PILLARS.map((pillar, index) => (
            <PillarStop
              key={pillar.id}
              pillar={pillar}
              topic={topics[index]}
              isActive={activeIndex === index}
              scrollProgress={trackProgress}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PillarStopProps {
  pillar: Pillar;
  topic: Topic;
  isActive: boolean;
  scrollProgress: MotionValue<number>;
  isMobile: boolean;
}

function PillarStop({
  pillar,
  topic,
  isActive,
  scrollProgress,
  isMobile,
}: PillarStopProps) {
  const isLeft = pillar.side === "left";

  const center = pillar.progress;
  const start = Math.max(0, center - 0.08);
  const end = Math.min(1, center + 0.08);

  const opacity = useTransform(
    scrollProgress,
    [start, center, end],
    [0.18, 1, 0.35]
  );

  const scale = useTransform(
    scrollProgress,
    [start, center, end],
    [0.96, 1.04, 0.96]
  );

  const y = useTransform(scrollProgress, [start, center, end], [10, 0, 10]);

  return (
    <motion.div
      style={{
        top: isMobile ? pillar.mobileTop : pillar.top,
        opacity,
        scale,
        y,
      }}
      className={
        isMobile
          ? "absolute left-1/2 z-50 w-[calc(100%-2rem)] max-w-[320px] -translate-x-1/2"
          : `absolute z-50 ${
              isLeft ? "left-2 md:left-6 lg:left-10" : "right-2 md:right-6 lg:right-10"
            }`
      }
    >
      <div
        className={`relative flex flex-col gap-2 ${
          isMobile
            ? "items-center"
            : isLeft
            ? "max-w-sm items-start"
            : "max-w-sm items-end"
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[10px] font-semibold text-sky-800 shadow-[0_8px_20px_rgba(15,23,42,0.06)] backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Pilar activo</span>
        </div>

        <div
          className={`relative overflow-hidden rounded-[24px] border border-white/70 bg-white/72 px-4 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl md:px-5 md:py-5 ${pillar.glow} ${
            isMobile ? "w-full" : ""
          }`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0.12))]" />

          <div className="relative z-10">
            <div
              className={`mb-3 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r ${pillar.color} px-3 py-1.5 text-xs font-extrabold text-slate-900 shadow-sm`}
            >
              {pillar.title}
            </div>

            <p className="text-xs leading-snug text-slate-700 md:text-sm">
              {pillar.subtitle}
            </p>

            <p className="mt-2 text-[11px] leading-relaxed text-sky-700">
              {isMobile
                ? "Explora este pilar dentro de la ruta ONE."
                : "Cada parada activa una experiencia STEAM relacionada."}
            </p>
          </div>
        </div>

        <AnimatePresence>
          {isActive && (
            <div
              className={
                isMobile
                  ? "relative z-[60] mt- w-full"
                  : `absolute top-0 z-[60] ${
                      isLeft ? "left-full ml-4" : "right-full mr-4"
                    }`
              }
            >
              <SteamMiniCard
                topic={topic}
                side={isMobile ? "left" : pillar.side}
                isMobile={isMobile}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function SteamMiniCard({
  topic,
  side,
  isMobile,
}: {
  topic: Topic;
  side: "left" | "right";
  isMobile: boolean;
}) {
  const Icon = topic.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isMobile ? 0 : side === "left" ? -28 : 28,
        y: 8,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        x: isMobile ? 0 : side === "left" ? -28 : 28,
        y: 8,
        scale: 0.96,
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={isMobile ? "w-full" : "w-[280px] md:w-[320px] lg:w-[340px]"}
    >
      <div className="relative overflow-hidden rounded-[24px] border border-white/80 bg-white/86 px-4 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_24%)]" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${topic.color} text-white shadow-md md:h-11 md:w-11`}
            >
              <Icon className="h-4 w-4 md:h-5 md:w-5" />
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                {topic.title}
              </h3>
              <p className="text-[11px] text-slate-500">STEAM Card activa</p>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-slate-700">
            {topic.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {topic.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-slate-50/90 px-2.5 py-1 text-[11px] font-medium text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PillarMarkers({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <div
        className={`absolute z-[31] h-3 w-3 rounded-full border-2 border-white bg-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.45)] md:h-4 md:w-4 ${
          isMobile ? "left-[18%] top-[13%]" : "left-[18%] top-[12%]"
        }`}
      />
      <div
        className={`absolute z-[31] h-3 w-3 rounded-full border-2 border-white bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.45)] md:h-4 md:w-4 ${
          isMobile ? "left-[17%] top-[38%]" : "left-[14%] top-[39%]"
        }`}
      />
      <div
        className={`absolute z-[31] h-3 w-3 rounded-full border-2 border-white bg-violet-300 shadow-[0_0_20px_rgba(168,85,247,0.45)] md:h-4 md:w-4 ${
          isMobile ? "right-[24%] top-[58%]" : "right-[21%] top-[62%]"
        }`}
      />
      <div
        className={`absolute z-[31] h-3 w-3 rounded-full border-2 border-white bg-emerald-300 shadow-[0_0_20px_rgba(34,197,94,0.45)] md:h-4 md:w-4 ${
          isMobile ? "left-[55%] top-[79%]" : "left-[58%] top-[86%]"
        }`}
      />
    </>
  );
}

function PremiumBackground({
  activePillar,
  pathRef,
  isMobile,
}: {
  activePillar: Pillar | null;
  pathRef: React.RefObject<SVGPathElement | null>;
  isMobile: boolean;
}) {
  return (
    <>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(56,189,248,0.22),transparent_24%),radial-gradient(circle_at_85%_18%,rgba(168,85,247,0.16),transparent_22%),radial-gradient(circle_at_20%_82%,rgba(34,197,94,0.18),transparent_24%),radial-gradient(circle_at_85%_80%,rgba(251,191,36,0.18),transparent_22%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.55),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.06)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle,rgba(14,165,233,0.07)_1px,transparent_1.4px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.20),rgba(255,255,255,0.04)_38%,rgba(255,255,255,0.18)_100%)]" />
      </div>

      <AnimatePresence mode="wait">
        {activePillar && (
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background: `
                radial-gradient(circle at 22% 22%, ${activePillar.strongTint}, transparent 24%),
                radial-gradient(circle at 78% 32%, ${activePillar.tint}, transparent 28%),
                radial-gradient(circle at 50% 78%, ${activePillar.tint}, transparent 30%)
              `,
            }}
          />
        )}
      </AnimatePresence>

      {!isMobile && (
        <>
          <motion.div
            className="absolute -left-20 top-12 z-[2] h-72 w-72 rounded-full bg-sky-300/22 blur-3xl"
            animate={{ x: [0, 25, 0], y: [0, -18, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[-50px] top-[18%] z-[2] h-80 w-80 rounded-full bg-fuchsia-300/18 blur-3xl"
            animate={{ x: [0, -22, 0], y: [0, 18, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-50px] left-[28%] z-[2] h-72 w-72 rounded-full bg-emerald-300/18 blur-3xl"
            animate={{ x: [0, 20, 0], y: [0, -18, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[8%] right-[8%] z-[2] h-52 w-52 rounded-full bg-amber-300/16 blur-3xl"
            animate={{ x: [0, -14, 0], y: [0, 14, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <OrbitRing
            className="left-[8%] top-[22%]"
            size="h-28 w-28"
            border="border-sky-200/70"
            dot="bg-sky-400"
            reverse={false}
          />
          <OrbitRing
            className="right-[10%] top-[58%]"
            size="h-36 w-36"
            border="border-fuchsia-200/70"
            dot="bg-fuchsia-400"
            reverse
          />
          <OrbitRing
            className="left-[30%] bottom-[12%]"
            size="h-24 w-24"
            border="border-emerald-200/70"
            dot="bg-emerald-400"
            reverse={false}
          />

          <FloatingTechCard
            className="left-[8%] top-[67%]"
            rotate="-8deg"
            color="from-orange-200/80 to-amber-100/90"
            label="Piñones"
            barsColor="bg-orange-100/90"
          >
            <MiniGearSvg />
          </FloatingTechCard>

          <FloatingTechCard
            className="right-[9%] top-[17%]"
            rotate="9deg"
            color="from-sky-200/80 to-cyan-100/90"
            label="Circuitos"
            barsColor="bg-sky-100/90"
          >
            <MiniCircuitSvg />
          </FloatingTechCard>

          <FloatingTechCard
            className="left-[18%] top-[33%]"
            rotate="7deg"
            color="from-violet-200/80 to-fuchsia-100/90"
            label="Código"
            barsColor="bg-violet-100/90"
          >
            <MiniCodeSvg />
          </FloatingTechCard>

          <FloatingTechCard
            className="right-[18%] top-[80%]"
            rotate="-9deg"
            color="from-emerald-200/80 to-lime-100/90"
            label="Robots"
            barsColor="bg-emerald-100/90"
          >
            <MiniBotSvg />
          </FloatingTechCard>

          <PathParticles pathRef={pathRef} isMobile={isMobile} />
        </>
      )}
    </>
  );
}

function PathParticles({
  pathRef,
  isMobile,
}: {
  pathRef: React.RefObject<SVGPathElement | null>;
  isMobile: boolean;
}) {
  const particles = useMemo(
    () =>
      isMobile
        ? [
            { id: 1, delay: 0, duration: 5.5, color: "bg-sky-300", size: 8 },
            { id: 2, delay: 1.6, duration: 6, color: "bg-emerald-300", size: 7 },
          ]
        : [
            { id: 1, delay: 0, duration: 5.5, color: "bg-sky-300", size: 10 },
            { id: 2, delay: 0.8, duration: 6.5, color: "bg-violet-300", size: 8 },
            { id: 3, delay: 1.6, duration: 5.8, color: "bg-emerald-300", size: 9 },
            { id: 4, delay: 2.4, duration: 6.8, color: "bg-amber-300", size: 7 },
            { id: 5, delay: 3.2, duration: 5.2, color: "bg-sky-200", size: 6 },
          ],
    [isMobile]
  );

  return (
    <>
      {particles.map((particle) => (
        <TrackParticle
          key={particle.id}
          pathRef={pathRef}
          delay={particle.delay}
          duration={particle.duration}
          color={particle.color}
          size={particle.size}
        />
      ))}
    </>
  );
}

function TrackParticle({
  pathRef,
  delay,
  duration,
  color,
  size,
}: {
  pathRef: React.RefObject<SVGPathElement | null>;
  delay: number;
  duration: number;
  color: string;
  size: number;
}) {
  const [pos, setPos] = useState({ x: 18, y: 10 });

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    let frame = 0;
    let start: number | null = null;

    const loop = (time: number) => {
      if (start === null) start = time;
      const elapsed = (time - start) / 1000;
      const progress =
        ((((elapsed - delay) % duration) + duration) % duration) / duration;

      if (elapsed >= delay) {
        const point = path.getPointAtLength(progress * totalLength);
        setPos({ x: point.x, y: point.y });
      }

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [pathRef, delay, duration]);

  return (
    <motion.div
      className="pointer-events-none absolute z-[32] -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
      }}
      animate={{
        scale: [0.7, 1.15, 0.7],
        opacity: [0.25, 1, 0.25],
      }}
      transition={{
        duration: 1.6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className={`rounded-full ${color} shadow-[0_0_18px_rgba(255,255,255,0.9)]`}
        style={{ width: size, height: size }}
      />
    </motion.div>
  );
}

function OrbitRing({
  className,
  size,
  border,
  dot,
  reverse = false,
}: {
  className: string;
  size: string;
  border: string;
  dot: string;
  reverse?: boolean;
}) {
  return (
    <motion.div
      className={`absolute z-[3] hidden rounded-full border ${border} md:block ${className} ${size}`}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
    >
      <div
        className={`absolute left-1/2 top-[-5px] h-3 w-3 -translate-x-1/2 rounded-full ${dot} shadow-[0_0_18px_rgba(255,255,255,0.7)]`}
      />
    </motion.div>
  );
}

function FloatingTechCard({
  className,
  rotate,
  color,
  label,
  barsColor,
  children,
}: {
  className: string;
  rotate: string;
  color: string;
  label: string;
  barsColor: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`absolute z-[4] hidden md:block ${className}`}
      animate={{ y: [0, -10, 0], rotate: [rotate, rotate, rotate] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{ rotate }}
    >
      <div
        className={`w-[148px] rounded-[24px] border border-white/70 bg-gradient-to-br ${color} px-4 py-3 shadow-[0_16px_32px_rgba(15,23,42,0.08)] backdrop-blur`}
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-white/90" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/50" />
          </div>
          <div className="text-slate-700">{children}</div>
        </div>

        <p className="text-xs font-extrabold tracking-tight text-slate-700">
          {label}
        </p>

        <div className="mt-2 space-y-1.5">
          <div className={`h-2 w-16 rounded-full ${barsColor}`} />
          <div className={`h-2 w-10 rounded-full ${barsColor}`} />
          <div className={`h-2 w-20 rounded-full ${barsColor}`} />
        </div>
      </div>
    </motion.div>
  );
}

function MiniGearSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 2.8v2.1M12 19.1v2.1M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M2.8 12h2.1M19.1 12h2.1M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MiniCircuitSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="8" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="18" r="2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 6h5m2 2v6M9 16v-3m0 0h9m-9 0V8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MiniCodeSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M8.5 8 4.5 12l4 4M15.5 8l4 4-4 4M13.5 6l-3 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MiniBotSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="6"
        y="8"
        width="12"
        height="9"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 4v2M9 17v2M15 17v2M6 12H4M20 12h-2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="10" cy="12" r="1" fill="currentColor" />
      <circle cx="14" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}