import type { ComponentType, SVGProps } from "react"
import { Link } from "react-router-dom"
import heroPhoto from "../assets/photos/photo-11.jpg"
import heroPhotoMobile from "../assets/photos/photo-07.jpg"
import ctaPhoto from "../assets/photos/photo-12.jpg"
import DressCarousel from "../components/DressCarousel"
import Reveal from "../components/Reveal"
import {
  ArrowRightIcon,
  BagIcon,
  CalendarIcon,
  GoogleIcon,
  HangerIcon,
  SparkleIcon,
  StarIcon,
} from "../components/icons"
import { dresses } from "../data/dresses"
import { googleRating, googleReviewsUrl, reviews } from "../data/reviews"

type Highlight = {
  title: string
  text: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

const highlights: Highlight[] = [
  {
    title: "Des robes à laçage",
    text: "Des modèles ajustables grâce à leurs laçages, pour s'adapter à chaque corps.",
    Icon: HangerIcon,
  },
  {
    title: "Essayage sur rendez-vous",
    text: "Un essayage uniquement sur rendez-vous, pour un accompagnement personnalisé.",
    Icon: CalendarIcon,
  },
  {
    title: "Conseil personnalisé",
    text: "Un temps dédié pour trouver la robe qui correspond à votre événement et à votre style.",
    Icon: SparkleIcon,
  },
  {
    title: "Location simple",
    text: "Essayage, réservation et retour pensés pour être aussi élégants que les robes elles-mêmes.",
    Icon: BagIcon,
  },
]

const ratingStars = Math.round(Number(googleRating.score.replace(",", "."))) || 5

function Stars({ value, className = "h-4 w-4" }: { value: number; className?: string }) {
  return (
    <span className="flex gap-1" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className={`${className} ${i < value ? "text-taupe" : "text-ink/15"}`} />
      ))}
    </span>
  )
}

export default function Home() {
  return (
    <div>
      {/* Hero — passe sous la barre de navigation transparente */}
      <section className="relative -mt-(--header-h) flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink px-6 pb-28 pt-[calc(var(--header-h)+3rem)] text-center md:px-10">
        <picture>
          <source media="(min-width: 48rem)" srcSet={heroPhoto} />
          <img
            src={heroPhotoMobile}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full animate-slow-zoom object-cover object-[center_15%] md:object-[center_20%]"
          />
        </picture>
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-ink/70 via-ink/60 to-ink/80"
        />

        <div className="relative flex max-w-3xl flex-col items-center gap-7 [text-shadow:0_1px_12px_rgb(0_0_0/0.35)]">
          <span
            className="eyebrow eyebrow-ruled animate-fade-up text-cream"
            style={{ animationDelay: "200ms" }}
          >
            Event Dress
          </span>

          <h1
            className="heading-xl animate-fade-up text-cream"
            style={{ animationDelay: "350ms" }}
          >
            La robe parfaite,
            <br />
            <em className="font-light italic">le temps d'un événement</em>
          </h1>

          <p
            className="max-w-xl animate-fade-up text-base leading-relaxed text-cream md:text-lg"
            style={{ animationDelay: "500ms" }}
          >
            Event Dress vous accompagne dans la location de robes de soirée
            haut de gamme : galas, mariages, cocktails. Découvrez la
            collection et réservez votre essayage.
          </p>

          <div
            className="mt-3 flex w-full animate-fade-up flex-col gap-4 sm:w-auto sm:flex-row"
            style={{ animationDelay: "650ms" }}
          >
            <Link to="/catalogue" className="btn btn-outline-light">
              Découvrir le catalogue
            </Link>
            <Link to="/rendez-vous" className="btn btn-light">
              Prendre rendez-vous
            </Link>
          </div>
        </div>

        {/* Indicateur de défilement */}
        <div
          aria-hidden
          className="absolute bottom-7 left-1/2 flex -translate-x-1/2 animate-fade-in flex-col items-center gap-3 text-cream/70"
          style={{ animationDelay: "1200ms" }}
        >
          <span className="font-display text-[0.6875rem] uppercase tracking-[0.32em]">Défiler</span>
          <span className="relative block h-12 w-px overflow-hidden bg-cream/25">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-pulse bg-cream" />
          </span>
        </div>
      </section>

      {/* L'expérience */}
      <section className="py-20 md:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">L'expérience Event Dress</span>
            <h2 className="heading-lg mt-6 text-ink">Une garde-robe de soirée, sans les contraintes</h2>
            <div className="mt-10 flex items-end gap-5 border-t border-ink/15 pt-8 md:mt-12">
              <span className="font-display text-7xl leading-[0.8] text-ink md:text-8xl">
                {dresses.length}
              </span>
              <span className="max-w-[11rem] font-display text-xs font-medium uppercase leading-relaxed tracking-[0.24em] text-ink-soft">
                modèles disponibles à la location
              </span>
            </div>
          </Reveal>

          <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7 lg:pt-2">
            {highlights.map(({ title, text, Icon }, i) => (
              <Reveal as="li" key={title} delay={i * 100} className="border-t border-ink/15 pt-6">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg italic text-taupe-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-6 w-6 text-taupe" />
                </div>
                <h3 className="mt-6 font-display text-2xl text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* La collection */}
      <section className="bg-cream-dark py-20 md:py-28">
        <Reveal className="container-page mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow text-ink-soft">La collection</span>
            <h2 className="heading-lg mt-5 text-ink">Quelques-uns de nos modèles</h2>
          </div>
          <Link
            to="/catalogue"
            className="group inline-flex min-h-10 items-center gap-3 self-start font-display text-sm font-medium uppercase tracking-[0.24em] text-ink md:self-auto"
          >
            <span className="link-underline">Voir tout le catalogue</span>
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <DressCarousel />
        </Reveal>
      </section>

      {/* Avis */}
      <section className="py-20 md:py-28">
        <div className="container-page">
          <Reveal as="header" className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
            <span className="eyebrow eyebrow-ruled">Témoignages</span>
            <h2 className="heading-lg text-ink">Avis de nos clientes</h2>
          </Reveal>

          <Reveal
            delay={100}
            className="mx-auto mt-12 flex max-w-xl flex-col items-center justify-center gap-5 border-y border-ink/15 py-8 text-center sm:flex-row sm:gap-10 sm:text-left"
          >
            <p className="font-display text-6xl leading-none text-ink md:text-7xl">
              {googleRating.score}
              <span className="sr-only"> sur 5</span>
            </p>
            <span aria-hidden className="hidden h-14 w-px bg-ink/15 sm:block" />
            <div className="flex flex-col items-center gap-3 sm:items-start">
              <Stars value={ratingStars} />
              <p className="flex items-center gap-2 text-sm text-ink-soft">
                <GoogleIcon className="h-4 w-4" />
                <span>
                  <span aria-hidden>sur 5 · </span>
                  {googleRating.count} avis Google
                </span>
              </p>
            </div>
          </Reveal>

          {reviews.length === 0 ? (
            <Reveal delay={200} className="mx-auto mt-14 flex max-w-md flex-col items-center gap-4 text-center">
              <SparkleIcon className="h-5 w-5 text-taupe" />
              <p className="font-display text-xl italic text-ink-soft md:text-2xl">
                Les avis de nos clientes arrivent très bientôt.
              </p>
            </Reveal>
          ) : (
            <ul className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
              {reviews.map((review, i) => (
                <Reveal as="li" key={review.id} delay={Math.min(i * 100, 400)}>
                  <figure className="panel flex h-full flex-col p-8 md:p-10">
                    <Stars value={review.rating} />
                    <span className="sr-only">{review.rating} sur 5</span>
                    <blockquote className="mt-6 flex-1 font-display text-lg leading-relaxed text-ink">
                      « {review.text} »
                    </blockquote>
                    <figcaption className="mt-8 border-t border-ink/10 pt-5 font-display text-xs font-medium uppercase tracking-[0.24em] text-ink-soft">
                      {review.author} · {review.date}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
          )}

          {googleReviewsUrl && (
            <div className="mt-12 flex justify-center">
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <GoogleIcon className="h-4 w-4" />
                Voir nos avis Google
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Appel à l'action */}
      <section className="grid bg-cream-dark text-ink lg:grid-cols-2">
        <div className="group relative min-h-[22rem] overflow-hidden sm:min-h-[30rem]">
          <img
            src={ctaPhoto}
            alt="Robe de soirée rose ornée de cristaux, portée dans un salon"
            loading="lazy"
            decoding="async"
            className="img-zoom absolute inset-0 h-full w-full object-cover object-[center_35%]"
          />
        </div>

        <Reveal className="flex flex-col items-center justify-center gap-6 px-6 py-20 text-center md:px-16 md:py-28 lg:items-start lg:text-left xl:px-24">
          <span className="eyebrow eyebrow-ruled text-ink-soft">Votre essayage</span>
          <h2 className="heading-lg max-w-md text-ink">Prête à trouver votre robe ?</h2>
          <p className="max-w-md text-base leading-relaxed text-ink-soft">
            Parcourez la collection disponible à la location ou prenez
            directement rendez-vous pour un essayage.
          </p>
          <div className="mt-4 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link to="/catalogue" className="btn btn-primary">
              Voir la collection
            </Link>
            <Link to="/rendez-vous" className="btn btn-outline">
              Prendre rendez-vous
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
