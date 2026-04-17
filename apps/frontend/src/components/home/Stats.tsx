'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export function Stats() {
  const stats = [
    { value: 4000, label: 'Niños capacitados' },
    { value: 500, label: 'Docentes formados' },
  ]

  const [animatedValues, setAnimatedValues] = useState<number[]>(
    stats.map(() => 0)
  )

  const observedRef = useRef<HTMLDivElement | null>(null)
  const timersRef = useRef<NodeJS.Timeout[]>([])
  const hasAnimatedRef = useRef(false)

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearInterval)
    timersRef.current = []
  }, [])

  const resetNumbers = useCallback(() => {
    clearTimers()
    setAnimatedValues(stats.map(() => 0))
    hasAnimatedRef.current = false
  }, [clearTimers])

  const animateNumbers = useCallback(() => {
    if (hasAnimatedRef.current) return

    clearTimers()
    hasAnimatedRef.current = true

    stats.forEach((stat, index) => {
      const duration = 1800
      const stepTime = 16
      const totalSteps = Math.ceil(duration / stepTime)
      let step = 0

      const timer = setInterval(() => {
        step += 1
        const progress = Math.min(step / totalSteps, 1)
        const value = Math.floor(stat.value * progress)

        setAnimatedValues((prev) => {
          const next = [...prev]
          next[index] = value
          return next
        })

        if (progress >= 1) {
          clearInterval(timer)
        }
      }, stepTime)

      timersRef.current.push(timer)
    })
  }, [clearTimers])

  useEffect(() => {
    const element = observedRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateNumbers()
        } else {
          resetNumbers()
        }
      },
      {
        threshold: 0.2,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      clearTimers()
    }
  }, [animateNumbers, resetNumbers, clearTimers])

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
          Impacto
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Resultados que reflejan transformación educativa
        </h2>
      </div>

      <div
        ref={observedRef}
        className="rounded-2xl border border-neutral-200 bg-white/80 shadow-sm"
      >
        <div className="grid divide-y divide-neutral-200 md:grid-cols-2 md:divide-x md:divide-y-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col justify-center px-6 py-10 text-center md:px-8 md:text-left"
            >
              <span className="text-[clamp(2.25rem,5vw,4rem)] font-bold tracking-tight text-indigo-600 tabular-nums">
                +{animatedValues[index].toLocaleString('es-CO')}
              </span>
              <p className="mt-2 text-sm font-medium text-neutral-700 sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}