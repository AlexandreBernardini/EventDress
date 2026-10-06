import { collaborations, collaborationsIntro } from "../data/collaborations"

export default function Collaborations() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="font-display text-sm uppercase tracking-widest-plus text-taupe">
          Ils nous ont fait confiance
        </span>
        <h1 className="font-display text-4xl text-ink md:text-5xl">Nos collaborations</h1>
        <p className="text-sm leading-relaxed text-ink-soft/80">{collaborationsIntro}</p>
      </div>

      {collaborations.length === 0 ? (
        <p className="py-16 text-center text-sm leading-relaxed text-ink-soft/80">
          Nos collaborations seront bientôt présentées ici.
        </p>
      ) : (
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {collaborations.map((item) => (
            <figure key={item.id}>
              <div className="mb-4 flex aspect-[3/4] items-center justify-center overflow-hidden bg-cream-dark">
                {item.image ? (
                  <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <span className="font-display text-5xl text-ink/15">
                    {item.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                )}
              </div>
              <figcaption>
                <p className="font-display text-lg text-ink">{item.name}</p>
                <p className="text-xs uppercase tracking-widest-plus text-ink/50">{item.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft/80">{item.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}
