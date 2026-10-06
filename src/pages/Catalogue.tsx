import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import AddToCart from "../components/AddToCart"
import { isDressAvailableOn } from "../data/availability"
import { categories, dresses } from "../data/dresses"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
})

export default function Catalogue() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Toutes")
  const [dateInput, setDateInput] = useState("")

  const selectedDate = useMemo(() => {
    if (!dateInput) return null
    const [y, m, d] = dateInput.split("-").map(Number)
    return new Date(y, m - 1, d)
  }, [dateInput])

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
          Choisissez une date pour voir quelles robes sont disponibles à la location.
        </p>
      </div>

      <div className="mb-10 flex flex-col items-center gap-6">
        <label className="flex items-center gap-4 font-display text-xs uppercase tracking-widest-plus text-ink/60">
          Date de l'événement
          <input
            type="date"
            value={dateInput}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setDateInput(e.target.value)}
            className="border-0 border-b border-ink/25 bg-transparent py-1 text-sm normal-case tracking-normal text-ink focus:border-ink focus:outline-none"
          />
        </label>

        <div className="flex flex-wrap items-center justify-center gap-3">
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
      </div>

      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((dress) => {
          const available = selectedDate ? isDressAvailableOn(dress.id, selectedDate) : null

          return (
            <article key={dress.id} className="group">
              <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-cream-dark">
                <img
                  src={dress.images[0]}
                  alt={dress.name}
                  loading="lazy"
                  className={`h-full w-full object-cover transition-all duration-700 ${
                    dress.images[1] ? "group-hover:opacity-0" : "group-hover:scale-105"
                  }`}
                />
                {dress.images[1] && (
                  <img
                    src={dress.images[1]}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                )}
                {available === false && (
                  <span className="absolute right-3 top-3 bg-ink px-3 py-1 font-display text-[11px] uppercase tracking-widest-plus text-cream">
                    Réservée
                  </span>
                )}
                {available === true && (
                  <span className="absolute right-3 top-3 bg-cream px-3 py-1 font-display text-[11px] uppercase tracking-widest-plus text-ink">
                    Disponible
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

              <div className="mt-4">
                <AddToCart dress={dress} defaultStart={dateInput} />
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs text-ink/50">
                  {selectedDate && available !== null
                    ? available
                      ? `Libre le ${dateFormatter.format(selectedDate)}`
                      : `Indisponible le ${dateFormatter.format(selectedDate)}`
                    : `Tailles : ${dress.size.join(", ")}`}
                </p>
                <Link
                  to="/rendez-vous"
                  className="font-display text-xs uppercase tracking-widest-plus text-ink underline underline-offset-4 hover:text-taupe"
                >
                  Réserver un essayage
                </Link>
              </div>
            </article>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-sm text-ink-soft/70">
          Aucune robe dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  )
}
