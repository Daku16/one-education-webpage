"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
    X,
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    ZoomOut,
    RotateCcw,
    Maximize,
    PlayCircle,
} from "lucide-react";
import type { ResourceMediaItem } from "@/src/types/resource";

interface MediaLightboxProps {
    items: ResourceMediaItem[];
    activeIndex: number;
    title?: string | null;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    onGoTo: (index: number) => void;
}

type Point = { x: number; y: number };
type TouchPoint = { clientX: number; clientY: number };

function isVideoFile(item: ResourceMediaItem) {
    if (item.mime?.startsWith("video/")) return true;

    if (
        item.ext &&
        [".mp4", ".webm", ".ogg", ".mov", ".m4v"].includes(item.ext.toLowerCase())
    ) {
        return true;
    }

    return /\.(mp4|webm|ogg|mov|m4v)$/i.test(item.url);
}

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

function preloadImage(url?: string) {
    if (!url || typeof window === "undefined") return;
    const img = new window.Image();
    img.src = url;
}

function getDistance(a: TouchPoint, b: TouchPoint) {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.hypot(dx, dy);
}

export function MediaLightbox({
    items,
    activeIndex,
    title,
    onClose,
    onPrev,
    onNext,
    onGoTo,
}: MediaLightboxProps) {
    const [mounted, setMounted] = useState(false);

    const current = items[activeIndex];
    const isVideo = current ? isVideoFile(current) : false;
    const isPortrait =
        !!current &&
        !isVideo &&
        !!current.height &&
        !!current.width &&
        current.height > current.width;

    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState<Point>({ x: 0, y: 0 });
    const [isAnimatingSlide, setIsAnimatingSlide] = useState(false);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const imageViewportRef = useRef<HTMLDivElement | null>(null);

    const lastTapRef = useRef<number>(0);
    const swipeStartRef = useRef<Point | null>(null);
    const panStartRef = useRef<Point | null>(null);
    const offsetStartRef = useRef<Point>({ x: 0, y: 0 });
    const pinchStartDistanceRef = useRef<number | null>(null);
    const pinchStartZoomRef = useRef<number>(1);
    const gestureModeRef = useRef<"idle" | "swipe" | "pan" | "pinch">("idle");

    const maxZoom = 4;
    const minZoom = 1;
    const canSwipeSlides = zoom <= 1.02 && !isVideo;

    const visualOffset =
        gestureModeRef.current === "swipe" && canSwipeSlides ? dragOffset : offset;

    const transformStyle = useMemo(
        () => ({
            transform: `translate3d(${visualOffset.x}px, ${visualOffset.y}px, 0) scale(${zoom})`,
            transformOrigin: "center center",
            transition:
                gestureModeRef.current === "idle"
                    ? "transform 220ms cubic-bezier(0.16, 1, 0.3, 1), opacity 220ms ease"
                    : "none",
        }),
        [visualOffset.x, visualOffset.y, zoom]
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setZoom(1);
        setOffset({ x: 0, y: 0 });
        setDragOffset({ x: 0, y: 0 });
        gestureModeRef.current = "idle";
        setIsAnimatingSlide(true);

        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }

        const timer = window.setTimeout(() => setIsAnimatingSlide(false), 220);
        return () => window.clearTimeout(timer);
    }, [activeIndex]);

    useEffect(() => {
        const prevItem = items[activeIndex - 1];
        const nextItem = items[activeIndex + 1];

        if (prevItem && !isVideoFile(prevItem)) preloadImage(prevItem.url);
        if (nextItem && !isVideoFile(nextItem)) preloadImage(nextItem.url);
    }, [activeIndex, items]);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") handleClose();
            if (event.key === "ArrowLeft") {
                if (zoom > 1 && !isVideo) {
                    setOffset((prev) => constrainOffset({ ...prev, x: prev.x + 40 }, zoom));
                } else {
                    handlePrev();
                }
            }
            if (event.key === "ArrowRight") {
                if (zoom > 1 && !isVideo) {
                    setOffset((prev) => constrainOffset({ ...prev, x: prev.x - 40 }, zoom));
                } else {
                    handleNext();
                }
            }
            if (!isVideo) {
                if (event.key === "+" || event.key === "=") zoomIn();
                if (event.key === "-") zoomOut();
                if (event.key === "0") resetZoom();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [zoom, isVideo]);

    function constrainOffset(nextOffset: Point, nextZoom: number): Point {
        if (!imageViewportRef.current) return nextOffset;

        const rect = imageViewportRef.current.getBoundingClientRect();
        const maxX = ((rect.width * nextZoom) - rect.width) / 2;
        const maxY = ((rect.height * nextZoom) - rect.height) / 2;

        return {
            x: clamp(nextOffset.x, -Math.max(maxX, 0), Math.max(maxX, 0)),
            y: clamp(nextOffset.y, -Math.max(maxY, 0), Math.max(maxY, 0)),
        };
    }

    function pauseVideo() {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }

    function handleClose() {
        pauseVideo();
        onClose();
    }

    function handlePrev() {
        pauseVideo();
        onPrev();
    }

    function handleNext() {
        pauseVideo();
        onNext();
    }

    function resetZoom() {
        gestureModeRef.current = "idle";
        setZoom(1);
        setOffset({ x: 0, y: 0 });
        setDragOffset({ x: 0, y: 0 });
    }

    function zoomIn() {
        setZoom((prev) => clamp(Number((prev + 0.35).toFixed(2)), minZoom, maxZoom));
    }

    function zoomOut() {
        setZoom((prev) => {
            const next = clamp(Number((prev - 0.35).toFixed(2)), minZoom, maxZoom);
            if (next <= 1) {
                setOffset({ x: 0, y: 0 });
                setDragOffset({ x: 0, y: 0 });
                return 1;
            }
            return next;
        });
    }

    function toggleDoubleTapZoom() {
        if (zoom > 1.2) {
            resetZoom();
            return;
        }

        const nextZoom = 2.2;
        setZoom(nextZoom);
        setOffset(constrainOffset({ x: 0, y: 0 }, nextZoom));
    }

    function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
        if (isVideo) return;

        if (e.touches.length === 2) {
            gestureModeRef.current = "pinch";
            pinchStartDistanceRef.current = getDistance(e.touches[0], e.touches[1]);
            pinchStartZoomRef.current = zoom;
            return;
        }

        if (e.touches.length === 1) {
            const touch = e.touches[0];
            const now = Date.now();
            const delta = now - lastTapRef.current;

            if (delta < 280) {
                toggleDoubleTapZoom();
                lastTapRef.current = 0;
                return;
            }

            lastTapRef.current = now;

            const point = { x: touch.clientX, y: touch.clientY };

            if (zoom > 1.02) {
                gestureModeRef.current = "pan";
                panStartRef.current = point;
                offsetStartRef.current = offset;
            } else {
                gestureModeRef.current = "swipe";
                swipeStartRef.current = point;
                setDragOffset({ x: 0, y: 0 });
            }
        }
    }

    function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
        if (isVideo) return;

        if (e.touches.length === 2 && pinchStartDistanceRef.current) {
            e.preventDefault();
            gestureModeRef.current = "pinch";

            const distance = getDistance(e.touches[0], e.touches[1]);
            const factor = distance / pinchStartDistanceRef.current;
            const nextZoom = clamp(
                Number((pinchStartZoomRef.current * factor).toFixed(2)),
                minZoom,
                maxZoom
            );

            setZoom(nextZoom);

            if (nextZoom <= 1.02) {
                setOffset({ x: 0, y: 0 });
            } else {
                setOffset((prev) => constrainOffset(prev, nextZoom));
            }

            return;
        }

        if (e.touches.length !== 1) return;

        const touch = e.touches[0];
        const point = { x: touch.clientX, y: touch.clientY };

        if (gestureModeRef.current === "pan" && panStartRef.current) {
            e.preventDefault();

            const deltaX = point.x - panStartRef.current.x;
            const deltaY = point.y - panStartRef.current.y;

            const nextOffset = constrainOffset(
                {
                    x: offsetStartRef.current.x + deltaX,
                    y: offsetStartRef.current.y + deltaY,
                },
                zoom
            );

            setOffset(nextOffset);
            return;
        }

        if (gestureModeRef.current === "swipe" && swipeStartRef.current && canSwipeSlides) {
            const deltaX = point.x - swipeStartRef.current.x;
            const deltaY = point.y - swipeStartRef.current.y;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                setDragOffset({ x: deltaX * 0.22, y: 0 });
            }
        }
    }

    function handleTouchEnd() {
        if (isVideo) return;

        if (gestureModeRef.current === "swipe" && swipeStartRef.current && canSwipeSlides) {
            if (dragOffset.x > 55) {
                setDragOffset({ x: 0, y: 0 });
                handlePrev();
            } else if (dragOffset.x < -55) {
                setDragOffset({ x: 0, y: 0 });
                handleNext();
            } else {
                setDragOffset({ x: 0, y: 0 });
            }
        }

        if (gestureModeRef.current === "pan") {
            const inertialX = offset.x * 1.03;
            const inertialY = offset.y * 1.03;
            setOffset(constrainOffset({ x: inertialX, y: inertialY }, zoom));
        }

        if (zoom <= 1.02) {
            setZoom(1);
            setOffset({ x: 0, y: 0 });
            setDragOffset({ x: 0, y: 0 });
        }

        gestureModeRef.current = "idle";
        swipeStartRef.current = null;
        panStartRef.current = null;
        pinchStartDistanceRef.current = null;
    }

    if (!mounted || !current) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[99999] bg-slate-950/96"
            role="dialog"
            aria-modal="true"
            aria-label="Vista ampliada del recurso"
            onClick={handleClose}
        >
            <div className="absolute left-4 top-4 z-[100000] rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/10 sm:text-sm">
                {activeIndex + 1} / {items.length}
            </div>

            <div className="absolute right-4 top-4 z-[100000] flex flex-wrap gap-2">
                {!isVideo && (
                    <>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                zoomOut();
                            }}
                            aria-label="Alejar imagen"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20"
                        >
                            <ZoomOut className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                zoomIn();
                            }}
                            aria-label="Acercar imagen"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20"
                        >
                            <ZoomIn className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                resetZoom();
                            }}
                            aria-label="Restablecer zoom"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20"
                        >
                            <RotateCcw className="h-5 w-5" />
                        </button>
                    </>
                )}

                {isVideo && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (videoRef.current?.requestFullscreen) {
                                videoRef.current.requestFullscreen();
                            }
                        }}
                        aria-label="Pantalla completa"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20"
                    >
                        <Maximize className="h-5 w-5" />
                    </button>
                )}

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                    }}
                    aria-label="Cerrar vista ampliada"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {items.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                        }}
                        aria-label="Ver elemento anterior"
                        className="absolute left-4 top-1/2 z-[100000] inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                        }}
                        aria-label="Ver elemento siguiente"
                        className="absolute right-4 top-1/2 z-[100000] inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </>
            )}

            <div
                className="flex h-screen w-screen flex-col items-center justify-center px-4 pb-24 pt-20 sm:px-6 lg:px-10"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    ref={imageViewportRef}
                    className={`relative flex items-center justify-center overflow-hidden rounded-[24px] bg-transparent ${isPortrait ? "w-auto max-w-[92vw]" : "w-full max-w-[92vw]"
                        }`}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ touchAction: isVideo ? "auto" : "none", height: "64vh" }}
                >
                    {isVideo ? (
                        <video
                            ref={videoRef}
                            controls
                            preload="metadata"
                            className={`max-h-[64vh] max-w-[92vw] rounded-[24px] bg-black object-contain transition-all duration-300 ease-out ${isAnimatingSlide ? "scale-[0.985] opacity-0" : "scale-100 opacity-100"
                                }`}
                        >
                            <source src={current.url} type={current.mime || "video/mp4"} />
                            Tu navegador no soporta la reproducción de video.
                        </video>
                    ) : (
                        <Image
                            src={current.url}
                            alt={current.alternativeText || title || `Imagen ${activeIndex + 1}`}
                            width={current.width || 1600}
                            height={current.height || 1200}
                            sizes="92vw"
                            priority
                            className={`w-auto rounded-[20px] object-contain ${isPortrait ? "max-h-[64vh]" : "max-h-[64vh] max-w-[92vw]"
                                } ${isAnimatingSlide ? "opacity-0 scale-[0.985]" : "opacity-100 scale-100"}`}
                            style={transformStyle}
                        />
                    )}
                </div>

                <div className="mt-5 text-center text-white">
                    <p className="text-sm font-semibold sm:text-base">
                        {current.alternativeText || current.name || `Elemento ${activeIndex + 1}`}
                    </p>
                    <p className="mt-1 text-xs text-white/70 sm:text-sm">
                        {isVideo ? "Video" : `Imagen • Zoom ${Math.round(zoom * 100)}%`}
                    </p>
                </div>

                {items.length > 1 && (
                    <div className="mt-5 max-w-[92vw] overflow-x-auto pb-2">
                        <div className="flex min-w-max gap-3">
                            {items.map((item, index) => {
                                const thumbIsVideo = isVideoFile(item);
                                const isActive = index === activeIndex;

                                return (
                                    <button
                                        key={item.id ?? index}
                                        type="button"
                                        onClick={() => {
                                            pauseVideo();
                                            onGoTo(index);
                                        }}
                                        aria-label={`Abrir elemento ${index + 1}`}
                                        className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-2 transition sm:h-24 sm:w-24 ${isActive
                                                ? "ring-white scale-[1.04]"
                                                : "ring-white/10 opacity-80 hover:opacity-100 hover:ring-white/40"
                                            }`}
                                    >
                                        {thumbIsVideo ? (
                                            <div className="relative h-full w-full bg-slate-900">
                                                <video muted preload="metadata" className="h-full w-full object-cover">
                                                    <source src={item.url} type={item.mime || "video/mp4"} />
                                                </video>
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                                                    <PlayCircle className="h-6 w-6 text-white" />
                                                </div>
                                            </div>
                                        ) : (
                                            <Image
                                                src={item.url}
                                                alt={item.alternativeText || `Miniatura ${index + 1}`}
                                                fill
                                                sizes="96px"
                                                className="object-cover"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}