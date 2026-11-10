import { type FormEvent, useEffect, useRef, useState } from "react"
import AvailabilityCalendar from "../components/AvailabilityCalendar"
import PageHeader from "../components/PageHeader"
import Reveal from "../components/Reveal"
import TimeSlotPicker from "../components/TimeSlotPicker"
import { ArrowRightIcon, CalendarIcon, CheckIcon } from "../components/icons"

const purposes = ["Essayage", "Location", "Conseil", "Autre"] as const

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
})

const bookingSteps = [
  {
    title: "Essayage sur rendez-vous",
    text: "Vous essayez les modèles disponibles et choisissez votre robe.",
  },
  {
    title: "Acompte de 20 %",
    text: "Du montant de la location, pour bloquer la date.",
  },
  {
    title: "Caution",
    text: "Par empreinte bancaire ou chèque de caution.",
  },
  {
    title: "Solde",
    text: "À régler en ligne ou lors du retrait de la robe.",
  },
]

const pickupNotes = [
  "Robe à récupérer 1 à 2 jours avant l'événement.",
  "Le pressing est inclus dans le tarif de location.",
  "Retour le lundi suivant l'événement.",
  "Réception uniquement sur rendez-vous, pour un accompagnement personnalisé.",
]

export default function RendezVous() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [dateError, setDateError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const confirmationRef = useRef<HTMLHeadingElement>(null)

  // Amène la confirmation à l'écran (et au lecteur d'écran) après l'envoi.
  useEffect(() => {
    if (submitted) confirmationRef.current?.focus()
  }, [submitted])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedDate || !selectedSlot) {
      setDateError(true)
      return
    }

    setLoading(true)
    // TODO: brancher sur le backend / service de réservation une fois le VPS en place.
    window.setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  const hasChoice = Boolean(selectedDate && selectedSlot)

  return (
    <>
      <div className="container-page py-16 md:py-24">
        <PageHeader
          eyebrow="Réservation"
          title="Prendre rendez-vous"
          intro={
            <p>
              Choisissez une date et un créneau disponibles, puis laissez-nous vos
              coordonnées. Calendrier à titre indicatif pour l'instant.
            </p>
          }
          className="mb-14 md:mb-20"
        />

        {submitted ? (
          <div className="panel mx-auto flex max-w-xl animate-fade-up flex-col items-center px-6 py-14 text-center sm:px-12 md:py-16">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-taupe text-ink">
              <CheckIcon className="h-7 w-7" />
            </span>
            <h2
              ref={confirmationRef}
              tabIndex={-1}
              className="heading-md mt-8 text-ink focus:outline-none"
            >
              Merci !
            </h2>
            <span className="mt-6 block h-px w-12 bg-taupe" aria-hidden="true" />
            <p className="lead mt-6 max-w-md">
              Votre demande de rendez-vous
              {selectedDate && selectedSlot && (
                <>
                  {" "}
                  pour le{" "}
                  <span className="font-normal text-ink">
                    {dateFormatter.format(selectedDate)} à {selectedSlot}
                  </span>
                </>
              )}{" "}
              a bien été envoyée. Nous vous recontacterons très prochainement
              pour confirmer.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20"
          >
            <div className="space-y-14">
              <section aria-labelledby="step-date">
                <StepHeading id="step-date" number="01" title="Date" />
                <AvailabilityCalendar
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date)
                    setSelectedSlot(null)
                    setDateError(false)
                  }}
                />
              </section>

              <section aria-labelledby="step-slot">
                <StepHeading id="step-slot" number="02" title="Créneau" />
                {selectedDate ? (
                  <TimeSlotPicker
                    key={selectedDate.toISOString()}
                    date={selectedDate}
                    selected={selectedSlot}
                    onSelect={(time) => {
                      setSelectedSlot(time)
                      setDateError(false)
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4 border border-dashed border-ink/20 px-6 py-10 text-center">
                    <CalendarIcon className="h-6 w-6 text-taupe-deep" />
                    <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
                      Sélectionnez d'abord une date dans le calendrier pour voir les
                      créneaux.
                    </p>
                  </div>
                )}
              </section>
            </div>

            <section aria-labelledby="step-details">
              <StepHeading id="step-details" number="03" title="Vos coordonnées" />

              <div className="space-y-8">
                <Field label="Nom complet" name="name" autoComplete="name" required />
                <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
                  <Field label="Téléphone" name="phone" type="tel" autoComplete="tel" required />
                  <Field label="Email" name="email" type="email" autoComplete="email" required />
                </div>

                <div>
                  <label htmlFor="purpose" className="field-label">
                    Motif
                  </label>
                  <select
                    id="purpose"
                    name="purpose"
                    required
                    defaultValue=""
                    className="field-input"
                  >
                    <option value="" disabled>
                      Sélectionner
                    </option>
                    {purposes.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="field-label">
                    Message (optionnel)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Type d'événement, robe qui vous intéresse, taille..."
                    className="field-input"
                  />
                </div>
              </div>

              <div className="mt-10 space-y-5">
                <div aria-live="polite">
                  {selectedDate && selectedSlot ? (
                    <div className="flex animate-fade-in items-center gap-4 border border-taupe/60 bg-cream-light px-5 py-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-taupe/70 text-taupe-deep">
                        <CalendarIcon />
                      </span>
                      <div className="min-w-0">
                        <p className="field-label mb-1">Rendez-vous choisi</p>
                        <p className="font-display text-lg leading-snug text-ink first-letter:uppercase sm:text-xl">
                          {dateFormatter.format(selectedDate)} à {selectedSlot}
                        </p>
                      </div>
                    </div>
                  ) : (
                    !dateError && (
                      <p className="text-sm text-ink-soft">
                        Choisissez une date puis un créneau pour compléter votre demande.
                      </p>
                    )
                  )}
                </div>

                {dateError && !hasChoice && (
                  <p role="alert" className="field-error">
                    Merci de choisir une date et un créneau disponibles
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  className="btn btn-primary group w-full"
                >
                  {loading ? "Envoi..." : "Envoyer la demande"}
                  {!loading && (
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
                  )}
                </button>
              </div>
            </section>
          </form>
        )}
      </div>

      <section className="border-t border-ink/10 bg-cream-dark">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <PageHeader as="h2" eyebrow="En atelier" title="Comment se passe la réservation" />
          </Reveal>

          <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
            {bookingSteps.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 100}
                className="border-t border-ink/15 pt-6"
              >
                <span
                  aria-hidden="true"
                  className="block font-display text-6xl leading-none font-light text-taupe-deep"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-2xl text-ink">{step.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{step.text}</p>
              </Reveal>
            ))}
          </ol>

          <div className="mt-20 grid gap-6 md:mt-24 md:grid-cols-2 md:gap-8">
            <Reveal className="panel p-8 md:p-10">
              <span className="eyebrow">À distance</span>
              <h3 className="mt-4 font-display text-3xl text-ink">Réservation en ligne</h3>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
                Pour les clientes qui ne peuvent pas se déplacer : réservez directement en ligne,
                avec paiement intégral de la location au moment de la réservation. La caution se
                fait par empreinte bancaire ou par chèque envoyé avant l'expédition de la robe.
              </p>
            </Reveal>

            <Reveal delay={100} className="panel p-8 md:p-10">
              <span className="eyebrow">En pratique</span>
              <h3 className="mt-4 font-display text-3xl text-ink">Retrait et retour</h3>
              <ul className="mt-5 space-y-3.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                {pickupNotes.map((note) => (
                  <li key={note} className="flex gap-4">
                    <span aria-hidden="true" className="mt-[0.8em] h-px w-4 shrink-0 bg-taupe" />
                    {note}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

function StepHeading({ id, number, title }: { id: string; number: string; title: string }) {
  return (
    <h2 id={id} className="mb-6 flex items-center gap-4">
      <span className="font-display text-3xl font-light leading-none text-taupe-deep">
        {number}
      </span>
      <span aria-hidden="true" className="h-px w-6 bg-taupe" />
      <span className="font-display text-sm font-medium uppercase tracking-[0.28em] text-ink">
        {title}
      </span>
    </h2>
  )
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = false,
}: {
  label: string
  name: string
  type?: string
  autoComplete?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="field-input"
      />
    </div>
  )
}
