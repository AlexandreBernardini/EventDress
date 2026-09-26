import { useRef } from "react"
import { Link } from "react-router-dom"
import { dresses } from "../data/dresses"
import { isLight } from "../lib/color"

export default function DressCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {dresses.map((dress) => (
          <Link
            key={dress.id}
            to="/catalogue"
            className="group w-[220px] shrink-0 snap-start"
          >
            <div
              className="relative mb-4 flex aspect-[3/4] items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ backgroundColor: dress.swatch }}
            >
              <span
                className="font-display text-5xl"
                style={{ color: isLight(dress.swatch) ? "#1c1a17" : "#f6f1e9", opacity: 0.35 }}
              >
                {dress.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
            </div>
            <h3 className="font-display text-lg text-ink">{dress.name}</h3>
            <p className="text-xs uppercase tracking-widest-plus text-ink/50">
              {dress.category} · {dress.pricePerDay}€/jour
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-2 flex justify-center gap-4">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Précédent"
          className="flex h-10 w-10 items-center justify-center border border-ink/20 font-display text-lg text-ink transition-colors hover:border-ink"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Suivant"
          className="flex h-10 w-10 items-center justify-center border border-ink/20 font-display text-lg text-ink transition-colors hover:border-ink"
        >
          ›
        </button>
      </div>
    </div>
  )
}
