import { NavLink } from "react-router-dom"
import { socials } from "../data/social"
import { ArrowRightIcon, ChevronRightIcon } from "./icons"

const navigation = [
  { to: "/", label: "Présentation" },
  { to: "/catalogue", label: "Catalogue" },
  { to: "/vente", label: "Vente de robes" },
  { to: "/collaborations", label: "Collaborations" },
  { to: "/rendez-vous", label: "Prendre rendez-vous" },
]

const account = [
  { to: "/panier", label: "Panier" },
  { to: "/compte", label: "Mon compte" },
]

const EMAIL = "contact@event-dress.fr"

/* Lien de liste : zone cliquable confortable (40px), soulignement sur le texte seul */
const itemLink =
  "group inline-flex min-h-10 items-center text-cream/75 transition-colors duration-300 hover:text-cream aria-[current=page]:text-cream"
const itemText =
  "link-reveal group-hover:[background-size:100%_1px] group-focus-visible:[background-size:100%_1px] group-aria-[current=page]:[background-size:100%_1px]"

function ColumnTitle({ id, children }: { id?: string; children: string }) {
  return (
    <h2 id={id} className="eyebrow text-xs text-taupe-light">
      {children}
    </h2>
  )
}

export default function Footer() {
  const activeSocials = socials.filter((s) => s.url)

  return (
    <footer className="bg-ink text-cream selection:bg-cream selection:text-ink [&_:focus-visible]:outline-cream">
      <div className="container-page">
        {/* Signature de marque */}
        <div className="flex flex-col gap-10 py-16 md:flex-row md:items-end md:justify-between md:py-24">
          <div className="max-w-xl">
            <p className="font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.95] font-light tracking-[-0.01em]">
              Event Dress
            </p>
            <span aria-hidden className="mt-7 block h-px w-12 bg-taupe" />
            <p className="mt-7 max-w-sm text-[0.95rem] leading-relaxed text-cream/75">
              Location de robes de soirée d'exception pour sublimer vos événements les plus
              marquants.
            </p>
          </div>

          <div className="shrink-0">
            <NavLink to="/rendez-vous" className="btn btn-outline-light group/cta">
              Prendre rendez-vous
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover/cta:translate-x-1" />
            </NavLink>
          </div>
        </div>

        <div aria-hidden className="h-px bg-cream/15" />

        {/* Colonnes */}
        <div
          className={`grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 md:py-16 lg:gap-8 ${
            activeSocials.length > 0 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          <nav aria-labelledby="footer-nav">
            <ColumnTitle id="footer-nav">Navigation</ColumnTitle>
            <ul className="mt-5 text-sm">
              {navigation.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end className={itemLink}>
                    <span className={itemText}>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-account">
            <ColumnTitle id="footer-account">Votre espace</ColumnTitle>
            <ul className="mt-5 text-sm">
              {account.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end className={itemLink}>
                    <span className={itemText}>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnTitle>Contact</ColumnTitle>
            <ul className="mt-5 text-sm">
              <li>
                <a href={`mailto:${EMAIL}`} className={itemLink}>
                  <span className={itemText}>{EMAIL}</span>
                </a>
              </li>
              <li className="flex min-h-10 items-center text-cream/75">Sur rendez-vous uniquement</li>
            </ul>
          </div>

          {activeSocials.length > 0 && (
            <div>
              <ColumnTitle>Réseaux</ColumnTitle>
              <ul className="mt-5 text-sm">
                {activeSocials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} (nouvel onglet)`}
                      className={`${itemLink} gap-2`}
                    >
                      <span className={itemText}>{s.label}</span>
                      <ChevronRightIcon className="h-3 w-3 opacity-60 transition-transform duration-500 ease-luxe group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Mentions */}
        <div className="flex flex-col gap-2 border-t border-cream/15 py-7 text-xs tracking-wide text-cream/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Event Dress. Tous droits réservés.</p>
          <p className="font-display text-[0.7rem] tracking-widest-plus uppercase">
            Location de robes de soirée
          </p>
        </div>
      </div>
    </footer>
  )
}
