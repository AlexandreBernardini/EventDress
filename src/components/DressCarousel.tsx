import { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { dresses } from "../data/dresses"
import { ChevronLeftIcon, ChevronRightIcon } from "./icons"

/** Aligne la première carte sur le bord gauche de .container-page (max 72rem). */
const edgePadding =
  "px-[max(1.5rem,calc((100%_-_72rem)/2_+_1.5rem))] scroll-px-[max(1.5rem,calc((100%_-_72rem)/2_+_1.5rem))] " +
  "md:px-[max(2.5rem,calc((100%_-_72rem)/2_+_2.5rem))] md:scroll-px-[max(2.5rem,calc((100%_-_72rem)/2_+_2.5rem))]"

const arrowClass =
  "flex h-11 w-11 items-center justify-center border border-ink/25 text-ink transition-colors duration-500 ease-luxe hover:border-ink hover:bg-ink hover:text-cream aria-disabled:pointer-events-none aria-disabled:opacity-30"

export default function DressCarousel() {
  const trackRef = useRef<HTMLUListElement>(null)
  const [thumb, setThumb] = useState({ start: 0, size: 1 })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el || !el.scrollWidth) return
    const max = el.scrollWidth - el.clientWidth
    setThumb({ start: el.scrollLeft / el.scrollWidth, size: el.clientWidth / el.scrollWidth })
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < max - 4)
  }, [])

  useEffect(() => {
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [update])

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <div>
      <ul
        ref={trackRef}
        onScroll={update}
        aria-label="Modèles de la collection"
        className={`flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] motion-reduce:scroll-auto md:gap-8 [&::-webkit-scrollbar]:hidden ${edgePadding}`}
      >
        {dresses.map((dress) => (
          <li key={dress.id} className="w-[70vw] max-w-[300px] shrink-0 snap-start sm:w-[260px] lg:w-[280px]">
            <Link to="/catalogue" className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                <img
                  src={dress.images[0]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="img-zoom h-full w-full object-cover"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 ease-luxe group-hover:bg-ink/10"
                />
              </div>
              <div className="mt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl leading-tight text-ink">{dress.name}</h3>
                  <p className="shrink-0 whitespace-nowrap font-display text-xl text-ink">
                    {dress.pricePerDay}€
                    <span className="font-sans text-xs text-ink-soft"> /jour</span>
                  </p>
                </div>
                <p className="mt-1.5 font-display text-xs uppercase tracking-[0.24em] text-ink-soft">
                  {dress.category}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="container-page mt-10 flex items-center gap-6 md:mt-12">
        <div aria-hidden className="relative h-px flex-1 overflow-hidden bg-ink/15">
          <span
            className="absolute inset-y-0 left-0 bg-ink transition-transform duration-300 ease-out"
            style={{
              width: `${thumb.size * 100}%`,
              transform: `translateX(${(thumb.start / thumb.size) * 100}%)`,
            }}
          />
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-disabled={!canPrev}
            aria-label="Modèles précédents"
            className={arrowClass}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-disabled={!canNext}
            aria-label="Modèles suivants"
            className={arrowClass}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
