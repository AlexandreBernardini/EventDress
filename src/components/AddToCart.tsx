import { useState } from "react"
import { addToCart, rentalDays } from "../lib/cart"
import type { Dress } from "../data/dresses"

type Props = { dress: Dress; defaultStart: string }

const today = () => new Date().toISOString().slice(0, 10)

export default function AddToCart({ dress, defaultStart }: Props) {
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState(dress.size[0])
  const [start, setStart] = useState(defaultStart)
  const [end, setEnd] = useState(defaultStart)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = () => {
    if (!start || !end) return setError("Choisis les dates de location")
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
    setOpen(false)
    setTimeout(() => setAdded(false), 2500)
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full border border-ink py-2 font-display text-xs uppercase tracking-widest-plus text-ink transition-colors hover:bg-ink hover:text-cream"
      >
        {added ? "Ajoutée au panier" : "Ajouter au panier"}
      </button>
    )
  }

  return (
    <div className="space-y-4 border-t border-ink/10 pt-4">
      <div className="grid grid-cols-2 gap-4">
        <label className="text-xs uppercase tracking-widest-plus text-ink/60">
          Taille
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="mt-1 w-full border-0 border-b border-ink/25 bg-transparent py-1 text-sm normal-case tracking-normal text-ink focus:outline-none"
          >
            {dress.size.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <div />
        <label className="text-xs uppercase tracking-widest-plus text-ink/60">
          Du
          <input
            type="date"
            min={today()}
            value={start}
            onChange={(e) => {
              setStart(e.target.value)
              if (end < e.target.value) setEnd(e.target.value)
            }}
            className="mt-1 w-full border-0 border-b border-ink/25 bg-transparent py-1 text-sm normal-case tracking-normal text-ink focus:outline-none"
          />
        </label>
        <label className="text-xs uppercase tracking-widest-plus text-ink/60">
          Au
          <input
            type="date"
            min={start || today()}
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="mt-1 w-full border-0 border-b border-ink/25 bg-transparent py-1 text-sm normal-case tracking-normal text-ink focus:outline-none"
          />
        </label>
      </div>

      {start && end && end >= start && (
        <p className="text-xs text-ink/60">
          {rentalDays(start, end)} jour(s) · {dress.pricePerDay * rentalDays(start, end)}€
        </p>
      )}
      {error && <p className="text-xs text-[#8a2e2e]">{error}</p>}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={submit}
          className="flex-1 bg-ink py-2 font-display text-xs uppercase tracking-widest-plus text-cream transition-colors hover:bg-ink-soft"
        >
          Confirmer
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 font-display text-xs uppercase tracking-widest-plus text-ink/60 hover:text-ink"
        >
          Annuler
        </button>
      </div>
    </div>
  )
}
