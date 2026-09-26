import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { categories, dresses } from "../data/dresses"
import { isLight } from "../lib/color"

export default function Catalogue() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Toutes")

  const filtered = useMemo(
    () =>
      category === "Toutes"
        ? dresses
        : dresses.filter((d) => d.category === category),
    [category],
  )

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <span className="font-display text-sm uppercase tracking-widest-plus text-taupe">
          Collection
        </span>
        <h1 className="font-display text-4xl text-ink md:text-5xl">Catalogue</h1>
        <p className="max-w-lg text-sm leading-relaxed text-ink-soft/80">
          Robes disponibles à la location. Contactez-nous pour vérifier la
          disponibilité à votre date ou prenez rendez-vous pour un essayage.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`border px-5 py-2 font-display text-xs uppercase tracking-widest-plus transition-colors ${
              category === cat
                ? "border-ink bg-ink text-cream"
                : "border-ink/25 text-ink-soft hover:border-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((dress) => (
          <article key={dress.id} className="group">
            <div
              className="relative mb-4 flex aspect-[3/4] items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ backgroundColor: dress.swatch }}
            >
              <span
                className="font-display text-6xl"
                style={{ color: isLight(dress.swatch) ? "#1c1a17" : "#f6f1e9", opacity: 0.35 }}
              >
                {dress.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              {!dress.available && (
                <span className="absolute right-3 top-3 bg-ink px-3 py-1 font-display text-[11px] uppercase tracking-widest-plus text-cream">
                  Réservée
                </span>
              )}
            </div>

            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg text-ink">{dress.name}</h3>
                <p className="text-xs uppercase tracking-widest-plus text-ink/50">
                  {dress.category} · {dress.color}
                </p>
              </div>
              <p className="whitespace-nowrap font-display text-lg text-ink">
                {dress.pricePerDay}€<span className="text-xs text-ink/50"> /jour</span>
              </p>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-ink-soft/80">
              {dress.description}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-ink/50">Tailles : {dress.size.join(", ")}</p>
              <Link
                to="/rendez-vous"
                className="font-display text-xs uppercase tracking-widest-plus text-ink underline underline-offset-4 hover:text-taupe"
              >
                Réserver un essayage
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-sm text-ink-soft/70">
          Aucune robe dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  )
}
