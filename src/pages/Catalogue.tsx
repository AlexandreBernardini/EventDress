import { useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import AddToCart from "../components/AddToCart"
import PageHeader from "../components/PageHeader"
import Reveal from "../components/Reveal"
import { CloseIcon, HangerIcon } from "../components/icons"
import { isDressAvailableOn } from "../data/availability"
import { categories, dresses } from "../data/dresses"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
})

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? "s" : ""}`

export default function Catalogue() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Toutes")
  const [dateInput, setDateInput] = useState("")
  const dateRef = useRef<HTMLInputElement>(null)

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

  const availableCount = useMemo(
    () =>
      selectedDate
        ? filtered.filter((d) => isDressAvailableOn(d.id, selectedDate)).length
        : null,
    [filtered, selectedDate],
  )

  return (
    <div className="container-page py-16 md:py-24">
      <PageHeader
        eyebrow="Collection"
        title="Catalogue"
        intro={<p>Choisissez une date pour voir quelles robes sont disponibles à la location.</p>}
      />

      {/* Filtres */}
      <section
        aria-label="Filtrer la collection"
        className="mt-14 border-y border-ink/10 py-8 md:mt-16"
      >
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full max-w-xs">
            <label htmlFor="catalogue-date" className="field-label">
              Date de l'événement
            </label>
            <div className="relative">
              <input
                ref={dateRef}
                id="catalogue-date"
                type="date"
                value={dateInput}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setDateInput(e.target.value)}
                className="field-input min-h-11 pr-11"
              />
              {dateInput && (
                <button
                  type="button"
                  onClick={() => {
                    setDateInput("")
                    dateRef.current?.focus()
                  }}
                  aria-label="Effacer la date"
                  className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-ink/60 transition-colors duration-300 hover:text-ink"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div
            role="group"
            aria-label="Catégories"
            className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-end"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                className="chip"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <p
        aria-live="polite"
        className="mt-6 mb-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm text-ink/70 md:mb-14 lg:justify-start lg:text-left"
      >
        <span className="font-display text-xs uppercase tracking-[0.24em] text-taupe-deep">
          {plural(filtered.length, "modèle")}
        </span>
        {selectedDate && availableCount !== null && (
          <>
            <span aria-hidden="true" className="h-px w-6 bg-taupe-light" />
            <span>
              {availableCount > 0
                ? `${plural(availableCount, "disponible")} le ${dateFormatter.format(selectedDate)}`
                : `Aucune disponible le ${dateFormatter.format(selectedDate)}`}
            </span>
          </>
        )}
      </p>

      {filtered.length > 0 ? (
        <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-20">
          {filtered.map((dress, index) => {
            const available = selectedDate ? isDressAvailableOn(dress.id, selectedDate) : null
            const hasAltImage = Boolean(dress.images[1])

            return (
              <Reveal key={dress.id} as="li" delay={(index % 3) * 100} className="flex">
                <article className="group flex w-full flex-col">
                  <div className="relative aspect-3/4 overflow-hidden bg-cream-dark">
                    <div
                      className={`img-zoom absolute inset-0 ${
                        available === false ? "opacity-80" : ""
                      }`}
                    >
                      <img
                        src={dress.images[0]}
                        alt={dress.name}
                        loading="lazy"
                        className={`h-full w-full object-cover transition-opacity duration-700 ease-luxe ${
                          hasAltImage ? "group-hover:opacity-0" : ""
                        }`}
                      />
                      {hasAltImage && (
                        <img
                          src={dress.images[1]}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-luxe group-hover:opacity-100"
                        />
                      )}
                    </div>

                    {available === false && (
                      <span className="tag absolute left-4 top-4 bg-ink/90 text-cream backdrop-blur-sm">
                        Réservée
                      </span>
                    )}
                    {available === true && (
                      <span className="tag absolute left-4 top-4 gap-2 bg-cream-light/90 text-ink backdrop-blur-sm">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />
                        Disponible
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <h2 className="font-display text-2xl leading-tight text-ink">{dress.name}</h2>
                    <p className="shrink-0 whitespace-nowrap font-display text-xl text-ink">
                      {priceFormatter.format(dress.pricePerDay)}
                      <span className="font-sans text-xs text-ink/70"> / jour</span>
                    </p>
                  </div>
                  <p className="mt-1.5 font-display text-xs uppercase tracking-[0.24em] text-taupe-deep">
                    {dress.category} · {dress.color}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-ink-soft/85">
                    {dress.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <AddToCart dress={dress} defaultStart={dateInput} />

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                      <p
                        className={`flex items-center gap-2 text-xs ${
                          available === true ? "text-success" : "text-ink/70"
                        }`}
                      >
                        {selectedDate && available !== null
                          ? available
                            ? `Libre le ${dateFormatter.format(selectedDate)}`
                            : `Indisponible le ${dateFormatter.format(selectedDate)}`
                          : `Tailles : ${dress.size.join(", ")}`}
                      </p>
                      <Link
                        to="/rendez-vous"
                        className="inline-flex min-h-10 items-center font-display text-xs uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:text-taupe-deep"
                      >
                        <span className="link-underline">Réserver un essayage</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </ul>
      ) : (
        <div className="panel mx-auto flex max-w-xl animate-fade-in flex-col items-center px-6 py-14 text-center sm:px-12 md:py-16">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-taupe/50 text-taupe-deep">
            <HangerIcon className="h-6 w-6" />
          </span>
          <span aria-hidden="true" className="mt-8 block h-px w-12 bg-taupe/60" />
          <p className="lead mt-8 max-w-sm">Aucune robe dans cette catégorie pour le moment.</p>
          <button
            type="button"
            onClick={() => setCategory("Toutes")}
            className="btn btn-outline mt-10 w-full sm:w-auto"
          >
            Voir toute la collection
          </button>
        </div>
      )}
    </div>
  )
}
