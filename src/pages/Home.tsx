import { Link } from "react-router-dom"
import wordmark from "../assets/wordmark.png"
import DressCarousel from "../components/DressCarousel"
import HeroVideo from "../components/HeroVideo"

const highlights = [
  {
    title: "Une sélection pointue",
    text: "Chaque robe est choisie pour sa coupe, sa matière et sa capacité à sublimer chaque silhouette.",
  },
  {
    title: "Conseil personnalisé",
    text: "Un rendez-vous dédié pour trouver la robe qui correspond à votre événement et à votre style.",
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
          </div>

          <div className="grid gap-10 md:grid-cols-3">
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
