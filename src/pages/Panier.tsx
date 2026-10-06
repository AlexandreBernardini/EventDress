import { Link } from "react-router-dom"
import { itemTotal, removeFromCart, rentalDays, useCart } from "../lib/cart"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long" })
const fmt = (iso: string) => dateFormatter.format(new Date(iso))

export default function Panier() {
  const items = useCart()
  const total = items.reduce((sum, item) => sum + itemTotal(item), 0)

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-20">
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <span className="font-display text-sm uppercase tracking-widest-plus text-taupe">Panier</span>
        <h1 className="font-display text-4xl text-ink md:text-5xl">Ta sélection</h1>
      </div>

      {items.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-ink-soft/80">Ton panier est vide pour le moment.</p>
          <Link
            to="/catalogue"
            className="mt-8 inline-block border border-ink px-8 py-3 font-display text-sm uppercase tracking-widest-plus text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Voir le catalogue
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {items.map((item, index) => (
              <li key={`${item.dressId}-${index}`} className="flex gap-6 py-6">
                <img src={item.image} alt={item.name} className="h-32 w-24 shrink-0 object-cover" />
                <div className="flex flex-1 flex-col justify-between gap-3">
                  <div>
                    <p className="font-display text-lg text-ink">{item.name}</p>
                    <p className="text-xs uppercase tracking-widest-plus text-ink/50">Taille {item.size}</p>
                    <p className="mt-2 text-sm text-ink-soft/80">
                      Du {fmt(item.start)} au {fmt(item.end)} · {rentalDays(item.start, item.end)} jour(s)
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => removeFromCart(index)}
                      className="text-xs uppercase tracking-widest-plus text-ink/50 underline underline-offset-4 hover:text-ink"
                    >
                      Retirer
                    </button>
                    <p className="font-display text-lg text-ink">{itemTotal(item)}€</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-between">
            <p className="font-display text-lg text-ink">Total</p>
            <p className="font-display text-2xl text-ink">{total}€</p>
          </div>

          <Link
            to="/compte?suite=panier"
            className="mt-10 block bg-ink py-4 text-center font-display text-sm uppercase tracking-widest-plus text-cream transition-colors hover:bg-ink-soft"
          >
            Continuer vers la réservation
          </Link>
          <p className="mt-4 text-center text-xs text-ink/50">
            Il te faudra un compte pour finaliser ta réservation. Le paiement sera proposé à l'étape suivante.
          </p>
        </>
      )}
    </div>
  )
}
