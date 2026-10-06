import { Link } from "react-router-dom"
import { forSale } from "../data/forSale"

export default function Vente() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="font-display text-sm uppercase tracking-widest-plus text-taupe">Boutique</span>
        <h1 className="font-display text-4xl text-ink md:text-5xl">Vente de robes</h1>
        <p className="text-sm leading-relaxed text-ink-soft/80">
          Certains modèles ne sont plus proposés à la location et peuvent être achetés. Expédition
          partout en France, ou retrait à l'atelier sur rendez-vous.
        </p>
      </div>

      {forSale.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm leading-relaxed text-ink-soft/80">
            Aucune robe en vente pour le moment. Les prochaines pièces disponibles à l'achat
            apparaîtront ici.
          </p>
          <Link
            to="/rendez-vous"
            className="mt-8 inline-block border border-ink px-8 py-3 font-display text-sm uppercase tracking-widest-plus text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Être prévenue par rendez-vous
          </Link>
        </div>
      ) : (
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {forSale.map((item) => (
            <article key={item.id}>
              <div className="mb-4 aspect-[3/4] overflow-hidden bg-cream-dark">
                <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg text-ink">{item.name}</h3>
                  <p className="text-xs uppercase tracking-widest-plus text-ink/50">
                    Taille {item.size} · {item.color}
                  </p>
                </div>
                <p className="whitespace-nowrap font-display text-lg text-ink">{item.price}€</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft/80">{item.description}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
