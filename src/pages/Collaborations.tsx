import { Link } from "react-router-dom"
import PageHeader from "../components/PageHeader"
import Reveal from "../components/Reveal"
import { SparkleIcon } from "../components/icons"
import { collaborations, collaborationsIntro } from "../data/collaborations"

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
}

export default function Collaborations() {
  return (
    <div className="container-page py-16 md:py-24">
      <PageHeader
        eyebrow="Ils nous ont fait confiance"
        title="Nos collaborations"
        intro={collaborationsIntro}
        className="mb-14 md:mb-20"
      />

      {collaborations.length === 0 ? (
        <Reveal className="panel mx-auto flex max-w-xl flex-col items-center px-6 py-14 text-center sm:px-12 md:py-16">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-taupe/50 text-taupe-deep">
            <SparkleIcon className="h-6 w-6" />
          </span>
          <span className="mt-8 block h-px w-12 bg-taupe/60" aria-hidden="true" />
          <p className="lead mt-8 max-w-sm">Nos collaborations seront bientôt présentées ici.</p>
          <Link to="/catalogue" className="btn btn-outline mt-10 w-full sm:w-auto">
            Découvrir la collection
          </Link>
        </Reveal>
      ) : (
        <>
          <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {collaborations.map((item, i) => (
              <Reveal as="li" key={item.id} delay={Math.min((i % 3) * 100, 400)}>
                <figure className="group">
                  <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-cream-dark">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="img-zoom h-full w-full object-cover"
                      />
                    ) : (
                      <div aria-hidden="true" className="h-full w-full">
                        <span className="absolute inset-4 border border-taupe/35 transition-[inset] duration-1000 ease-luxe group-hover:inset-5 sm:inset-5 sm:group-hover:inset-6" />
                        <div className="img-zoom flex h-full w-full flex-col items-center justify-center gap-6">
                          <span className="block h-px w-10 bg-taupe/70" />
                          <span className="font-display text-7xl font-light uppercase leading-none tracking-[0.12em] text-taupe md:text-8xl">
                            {initials(item.name)}
                          </span>
                          <span className="block h-px w-10 bg-taupe/70" />
                        </div>
                      </div>
                    )}
                  </div>

                  <figcaption>
                    <p className="font-display text-xs uppercase tracking-widest-plus text-taupe-deep">
                      {item.role}
                    </p>
                    <h2 className="mt-2 font-display text-2xl leading-tight text-ink">{item.name}</h2>
                    <span className="mt-4 block h-px w-8 bg-ink/20" aria-hidden="true" />
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft/85">{item.description}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-20 flex flex-col items-center gap-8 text-center md:mt-28">
            <span className="block h-px w-12 bg-taupe/60" aria-hidden="true" />
            <Link to="/catalogue" className="btn btn-outline w-full sm:w-auto">
              Découvrir la collection
            </Link>
          </Reveal>
        </>
      )}
    </div>
  )
}
