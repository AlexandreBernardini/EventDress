import { useRef } from "react"
import { Link } from "react-router-dom"
import PageHeader from "../components/PageHeader"
import Reveal from "../components/Reveal"
import { ArrowRightIcon, BagIcon, CalendarIcon, CloseIcon } from "../components/icons"
import { itemTotal, removeFromCart, rentalDays, useCart } from "../lib/cart"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long" })
const fmt = (iso: string) => dateFormatter.format(new Date(iso))

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})
const price = (value: number) => priceFormatter.format(value)

const plural = (count: number, word: string) => `${count} ${word}${count > 1 ? "s" : ""}`

export default function Panier() {
  const items = useCart()
  const total = items.reduce((sum, item) => sum + itemTotal(item), 0)
  const listRef = useRef<HTMLUListElement>(null)
  const emptyHeadingRef = useRef<HTMLHeadingElement>(null)

  // Après un retrait, le bouton disparaît : on replace le focus sur l'article voisin,
  // ou sur le message de panier vide s'il n'en reste plus.
  const handleRemove = (index: number) => {
    const remaining = items.length - 1
    removeFromCart(index)
    requestAnimationFrame(() => {
      const buttons = listRef.current?.querySelectorAll("button")
      const next = remaining > 0 ? buttons?.[Math.min(index, remaining - 1)] : undefined
      const target = next ?? emptyHeadingRef.current
      target?.focus()
    })
  }

  return (
    <div className="container-page py-16 md:py-24">
      <PageHeader eyebrow="Panier" title="Votre sélection" />

      {items.length === 0 ? (
        <Reveal className="mx-auto mt-14 flex max-w-md flex-col items-center text-center md:mt-20">
          <span className="flex h-20 w-20 items-center justify-center rounded-full border border-ink/15 text-taupe-deep">
            <BagIcon className="h-7 w-7" />
          </span>
          <h2
            ref={emptyHeadingRef}
            tabIndex={-1}
            className="mt-8 font-display text-2xl text-ink focus:outline-none md:text-3xl"
          >
            Votre panier est vide pour le moment.
          </h2>
          <p className="lead mt-4">Parcourez le catalogue pour composer votre sélection.</p>
          <Link to="/catalogue" className="btn btn-outline group mt-10">
            Voir le catalogue
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
          </Link>
        </Reveal>
      ) : (
        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-16 xl:grid-cols-[minmax(0,1fr)_24rem]">
          <Reveal>
            <section aria-labelledby="panier-articles">
              <div className="flex items-baseline justify-between gap-4 border-b border-ink/15 pb-4">
                <h2 id="panier-articles" className="eyebrow">
                  Vos robes
                </h2>
                <p className="text-sm text-ink-soft/80" aria-live="polite">
                  {plural(items.length, "article")}
                </p>
              </div>

              <ul ref={listRef} className="divide-y divide-ink/10 border-b border-ink/10">
                {items.map((item, index) => {
                  const days = rentalDays(item.start, item.end)
                  return (
                    <li key={`${item.dressId}-${index}`} className="flex gap-5 py-7 sm:gap-8 md:py-8">
                      <div className="aspect-3/4 w-24 shrink-0 overflow-hidden bg-cream-dark sm:w-32 md:w-36">
                        <img
                          src={item.image}
                          alt={`${item.name}, taille ${item.size}`}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-between gap-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                          <div className="min-w-0">
                            <h3 className="font-display text-xl leading-tight text-ink md:text-2xl">{item.name}</h3>
                            <p className="mt-2 font-display text-xs font-medium uppercase tracking-widest-plus text-taupe-deep">
                              Taille {item.size}
                            </p>
                          </div>
                          <p className="font-display text-xl text-ink sm:text-right md:text-2xl">
                            {price(itemTotal(item))}
                          </p>
                        </div>

                        <div className="flex flex-col gap-1 text-sm text-ink-soft/85">
                          <p className="flex items-start gap-2.5">
                            <CalendarIcon className="mt-0.5 h-4 w-4 shrink-0 text-taupe-deep" />
                            <span>
                              Du {fmt(item.start)} au {fmt(item.end)}
                            </span>
                          </p>
                          <p className="pl-6.5 text-ink-soft/80">
                            {plural(days, "jour")} · {price(item.pricePerDay)} / jour
                          </p>
                        </div>

                        <div>
                          <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            aria-label={`Retirer ${item.name} du panier`}
                            className="-ml-1 inline-flex min-h-10 items-center gap-2 px-1 font-display text-xs font-medium uppercase tracking-widest-plus text-ink/70 transition-colors duration-300 hover:text-danger"
                          >
                            <CloseIcon className="h-3.5 w-3.5" />
                            <span className="link-reveal">Retirer</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <Link
                to="/catalogue"
                className="mt-6 inline-flex min-h-10 items-center font-display text-xs font-medium uppercase tracking-widest-plus text-ink-soft"
              >
                <span className="link-underline">Continuer la découverte</span>
              </Link>
            </section>
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <aside aria-labelledby="panier-recap" className="panel p-6 sm:p-8">
              <h2 id="panier-recap" className="eyebrow">
                Récapitulatif
              </h2>

              <dl className="mt-6 space-y-3 border-b border-ink/10 pb-6 text-sm text-ink-soft">
                <div className="flex items-baseline justify-between gap-4">
                  <dt>Articles</dt>
                  <dd>{items.length}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt>Sous-total</dt>
                  <dd>{price(total)}</dd>
                </div>
              </dl>

              <div className="flex items-baseline justify-between gap-4 pt-6" aria-live="polite">
                <p className="font-display text-lg text-ink">Total</p>
                <p className="font-display text-4xl leading-none text-ink">{price(total)}</p>
              </div>

              <Link to="/compte?suite=panier" className="btn btn-primary mt-8 w-full px-6 leading-snug">
                Continuer vers la réservation
              </Link>

              <p className="mt-5 text-center text-xs leading-relaxed text-ink-soft/80">
                Il vous faudra un compte pour finaliser votre réservation. Le paiement sera proposé à l'étape
                suivante.
              </p>
            </aside>
          </Reveal>
        </div>
      )}
    </div>
  )
}
