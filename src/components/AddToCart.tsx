import { type FormEvent, useEffect, useId, useRef, useState } from "react"
import { addToCart, rentalDays } from "../lib/cart"
import type { Dress } from "../data/dresses"
import { CheckIcon } from "./icons"

type Props = { dress: Dress; defaultStart: string }

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const today = () => new Date().toISOString().slice(0, 10)

export default function AddToCart({ dress, defaultStart }: Props) {
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState(dress.size[0])
  const [start, setStart] = useState(defaultStart)
  const [end, setEnd] = useState(defaultStart)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uid = useId()
  const ids = {
    size: `${uid}-size`,
    start: `${uid}-start`,
    end: `${uid}-end`,
    error: `${uid}-error`,
  }

  // Rend le focus au bouton lorsque le formulaire se referme.
  const toggleRef = useRef<HTMLButtonElement>(null)
  const restoreFocus = useRef(false)
  useEffect(() => {
    if (!open && restoreFocus.current) {
      restoreFocus.current = false
      toggleRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!added) return
    const timer = setTimeout(() => setAdded(false), 2500)
    return () => clearTimeout(timer)
  }, [added])

  const close = () => {
    restoreFocus.current = true
    setOpen(false)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!start || !end) return setError("Choisissez les dates de location")
    if (start < today()) return setError("La date de début doit être aujourd'hui ou plus tard")
    if (end < start) return setError("La date de fin doit suivre le début")
    addToCart({
      dressId: dress.id,
      name: dress.name,
      size,
      pricePerDay: dress.pricePerDay,
      image: dress.images[0],
      start,
      end,
    })
    setError(null)
    setAdded(true)
    close()
  }

  const days = start && end && end >= start ? rentalDays(start, end) : 0

  return (
    <div>
      {open ? (
        <form
          noValidate
          onSubmit={submit}
          className="animate-fade-in space-y-6 border-t border-ink/10 pt-6"
        >
          <fieldset className="grid grid-cols-2 gap-x-5 gap-y-6">
            <legend className="sr-only">Location : {dress.name}</legend>

            <div className="col-span-2">
              <label htmlFor={ids.size} className="field-label">
                Taille
              </label>
              <select
                id={ids.size}
                autoFocus
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="field-input"
              >
                {dress.size.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-0">
              <label htmlFor={ids.start} className="field-label">
                Du
              </label>
              <input
                id={ids.start}
                type="date"
                min={today()}
                value={start}
                onChange={(e) => {
                  setStart(e.target.value)
                  if (end < e.target.value) setEnd(e.target.value)
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? ids.error : undefined}
                className="field-input text-sm"
              />
            </div>
            <div className="min-w-0">
              <label htmlFor={ids.end} className="field-label">
                Au
              </label>
              <input
                id={ids.end}
                type="date"
                min={start || today()}
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? ids.error : undefined}
                className="field-input text-sm"
              />
            </div>
          </fieldset>

          {days > 0 && (
            <div
              aria-live="polite"
              className="flex items-baseline justify-between gap-4 border-y border-ink/10 py-3"
            >
              <span className="text-sm text-ink/70">
                {days} jour{days > 1 ? "s" : ""} × {priceFormatter.format(dress.pricePerDay)}
              </span>
              <span className="font-display text-xl text-ink">
                {priceFormatter.format(dress.pricePerDay * days)}
              </span>
            </div>
          )}

          {error && (
            <p id={ids.error} role="alert" className="field-error">
              {error}
            </p>
          )}

          <div className="flex items-center gap-2">
            <button type="submit" className="btn btn-primary btn-sm flex-1">
              Confirmer
            </button>
            <button type="button" onClick={close} className="btn btn-ghost btn-sm">
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(true)}
          className={`btn btn-outline btn-sm w-full ${
            added ? "border-success bg-success text-cream hover:border-success hover:bg-success" : ""
          }`}
        >
          {added ? (
            <>
              <CheckIcon className="h-4 w-4" />
              Ajoutée au panier
            </>
          ) : (
            "Ajouter au panier"
          )}
        </button>
      )}

      <p role="status" className="sr-only">
        {added ? `${dress.name} ajoutée au panier` : ""}
      </p>
    </div>
  )
}
