import { Link } from "react-router-dom"
import PageHeader from "../components/PageHeader"
import Reveal from "../components/Reveal"
import { ArrowRightIcon, HangerIcon } from "../components/icons"
import { forSale } from "../data/forSale"

export default function Vente() {
  return (
    <div className="container-page py-16 md:py-24">
      <PageHeader
        eyebrow="Boutique"
        title="Vente de robes"
        intro="Certains modèles ne sont plus proposés à la location et peuvent être achetés. Expédition partout en France, ou retrait à l'atelier sur rendez-vous."
        className="mb-14 md:mb-20"
      />

      {forSale.length === 0 ? (
        <Reveal className="panel mx-auto flex max-w-xl flex-col items-center px-6 py-14 text-center sm:px-12 md:py-16">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-taupe/50 text-taupe-deep">
            <HangerIcon className="h-6 w-6" />
          </span>
          <span className="mt-8 block h-px w-12 bg-taupe/60" aria-hidden="true" />
          <p className="lead mt-8 max-w-sm">
            Aucune robe en vente pour le moment. Les prochaines pièces disponibles à l'achat
            apparaîtront ici.
          </p>
          <Link to="/rendez-vous" className="btn btn-outline mt-10 w-full sm:w-auto">
            Être prévenue par rendez-vous
          </Link>
        </Reveal>
      ) : (
        <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {forSale.map((item, i) => (
            <Reveal as="li" key={item.id} delay={Math.min((i % 3) * 100, 400)}>
              <article className="group flex h-full flex-col">
                <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-cream-dark">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="img-zoom h-full w-full object-cover"
                  />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="font-display text-2xl leading-tight text-ink">{item.name}</h2>
                    <p className="mt-2 font-display text-xs uppercase tracking-widest-plus text-taupe-deep">
                      Taille {item.size} · {item.color}
                    </p>
                  </div>
                  <p className="whitespace-nowrap font-display text-2xl leading-tight text-ink">
                    {item.price}&nbsp;€
                  </p>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink-soft/85">{item.description}</p>

                <div className="mt-auto pt-4">
                  <Link
                    to="/rendez-vous"
                    className="group/link inline-flex min-h-10 items-center gap-3 font-display text-xs uppercase tracking-widest-plus text-ink"
                  >
                    <span className="link-underline">Prendre rendez-vous</span>
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-500 ease-luxe group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  )
}
