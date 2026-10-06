import { Link } from "react-router-dom"
import bandeau from "../assets/photos/photo-11.jpg"
import wordmark from "../assets/wordmark.png"
import DressCarousel from "../components/DressCarousel"
import HeroVideo from "../components/HeroVideo"
import { dresses } from "../data/dresses"
import { googleRating, googleReviewsUrl, reviews } from "../data/reviews"

const highlights = [
  {
    title: "Des robes à laçage",
    text: "Des modèles ajustables grâce à leurs laçages, pour s'adapter à chaque corps.",
  },
  {
    title: "Essayage sur rendez-vous",
    text: "Un essayage uniquement sur rendez-vous, pour un accompagnement personnalisé.",
  },
  {
    title: "Conseil personnalisé",
    text: "Un temps dédié pour trouver la robe qui correspond à votre événement et à votre style.",
  },
  {
    title: "Location simple",
    text: "Essayage, réservation et retour pensés pour être aussi élégants que les robes elles-mêmes.",
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-14 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:px-10 md:pt-20">
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
          <img src={wordmark} alt="Event Dress" className="h-28 w-auto md:h-36" />
          <h1 className="font-display text-4xl leading-tight text-ink md:text-6xl">
            La robe parfaite,
            <br />
            le temps d'un événement
          </h1>

          <p className="max-w-xl text-balance text-base leading-relaxed text-ink-soft/80 md:text-lg">
            Event Dress vous accompagne dans la location de robes de soirée
            haut de gamme : galas, mariages, cocktails. Découvrez la
            collection et réservez votre essayage.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/catalogue"
              className="border border-ink px-8 py-3 text-center font-display text-sm uppercase tracking-widest-plus text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              Découvrir le catalogue
            </Link>
            <Link
              to="/rendez-vous"
              className="bg-ink px-8 py-3 text-center font-display text-sm uppercase tracking-widest-plus text-cream transition-colors hover:bg-ink-soft"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>

        <div>
          <HeroVideo />
        </div>
      </section>

      {/* Bandeau photo */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={bandeau} alt="" className="h-full w-full object-cover object-[center_12%]" />
        <div className="absolute inset-0 flex items-center justify-center bg-ink/45 px-6 text-center">
          <div className="flex max-w-2xl flex-col items-center gap-5">
            <span className="font-display text-sm uppercase tracking-widest-plus text-cream/80">
              Event Dress
            </span>
            <h2 className="font-display text-3xl leading-snug text-cream md:text-5xl">
              Des robes pensées pour s'adapter à chaque silhouette
            </h2>
          </div>
        </div>
      </section>

      {/* Presentation / highlights */}
      <section>
        <div className="mx-auto max-w-6xl border-t border-ink/10 px-6 py-20 md:px-10">
          <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center">
            <span className="font-display text-sm uppercase tracking-widest-plus text-taupe">
              L'expérience Event Dress
            </span>
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Une garde-robe de soirée, sans les contraintes
            </h2>
            <p className="mt-2 font-display text-5xl text-ink">{dresses.length}</p>
            <p className="text-xs uppercase tracking-widest-plus text-ink/60">
              modèles disponibles à la location
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div key={item.title} className="text-center">
                <span className="mx-auto mb-5 block h-px w-10 bg-taupe" />
                <h3 className="font-display text-xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft/80">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models carousel */}
      <section>
        <div className="mx-auto max-w-7xl border-t border-ink/10 px-6 py-20 md:px-10">
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center">
            <span className="font-display text-sm uppercase tracking-widest-plus text-taupe">
              La collection
            </span>
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Quelques-uns de nos modèles
            </h2>
          </div>

          <DressCarousel />
        </div>
      </section>

      {/* Avis */}
      <section>
        <div className="mx-auto max-w-6xl border-t border-ink/10 px-6 py-20 md:px-10">
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center">
            <span className="font-display text-sm uppercase tracking-widest-plus text-taupe">
              Témoignages
            </span>
            <h2 className="font-display text-3xl text-ink md:text-4xl">Avis de nos clientes</h2>
            <p className="font-display text-lg text-ink">
              <span className="text-taupe">★</span> {googleRating.score} sur 5 · {googleRating.count} avis Google
            </p>
          </div>

          {reviews.length === 0 ? (
            <p className="text-center text-sm leading-relaxed text-ink-soft/80">
              Les avis de nos clientes arrivent très bientôt.
            </p>
          ) : (
            <div className="grid gap-10 md:grid-cols-3">
              {reviews.map((review) => (
                <figure key={review.id} className="border border-ink/15 p-8">
                  <p className="font-display text-lg text-taupe" aria-label={`${review.rating} sur 5`}>
                    {"★".repeat(review.rating)}
                    <span className="text-ink/20">{"★".repeat(5 - review.rating)}</span>
                  </p>
                  <blockquote className="mt-4 text-sm leading-relaxed text-ink-soft/90">
                    « {review.text} »
                  </blockquote>
                  <figcaption className="mt-6 font-display text-xs uppercase tracking-widest-plus text-ink/60">
                    {review.author} · {review.date}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          {googleReviewsUrl && (
            <div className="mt-12 flex justify-center">
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink px-8 py-3 font-display text-sm uppercase tracking-widest-plus text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                Voir nos avis Google
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA band */}
      <section>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 border-t border-ink/10 px-6 py-20 text-center md:px-10">
          <h2 className="font-display text-3xl text-ink md:text-4xl">
            Prête à trouver votre robe ?
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-ink-soft/80">
            Parcourez la collection disponible à la location ou prenez
            directement rendez-vous pour un essayage.
          </p>
          <Link
            to="/catalogue"
            className="border border-ink px-8 py-3 font-display text-sm uppercase tracking-widest-plus text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Voir la collection
          </Link>
        </div>
      </section>
    </div>
  )
}
