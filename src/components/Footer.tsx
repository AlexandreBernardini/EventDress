import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-display text-2xl tracking-wide">Event Dress</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft/80">
            Location de robes de soirée d'exception pour sublimer vos événements
            les plus marquants.
          </p>
        </div>

        <div>
          <p className="font-display text-sm uppercase tracking-widest-plus text-ink/60">
            Navigation
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/" className="text-ink-soft/80 hover:text-ink">
                Présentation
              </Link>
            </li>
            <li>
              <Link to="/catalogue" className="text-ink-soft/80 hover:text-ink">
                Catalogue
              </Link>
            </li>
            <li>
              <Link to="/rendez-vous" className="text-ink-soft/80 hover:text-ink">
                Prendre rendez-vous
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm uppercase tracking-widest-plus text-ink/60">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft/80">
            <li>contact@event-dress.fr</li>
            <li>Sur rendez-vous uniquement</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/10 px-6 py-5 text-center text-xs text-ink/40 md:px-10">
        © {new Date().getFullYear()} Event Dress. Tous droits réservés.
      </div>
    </footer>
  )
}
