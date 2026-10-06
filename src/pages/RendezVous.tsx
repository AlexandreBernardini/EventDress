import { type FormEvent, useState } from "react"
import AvailabilityCalendar from "../components/AvailabilityCalendar"
import TimeSlotPicker from "../components/TimeSlotPicker"

const purposes = ["Essayage", "Location", "Conseil", "Autre"] as const

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
})

export default function RendezVous() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [dateError, setDateError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

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

  return (
    <>
    <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <span className="font-display text-sm uppercase tracking-widest-plus text-taupe">
          Réservation
        </span>
        <h1 className="font-display text-4xl text-ink md:text-5xl">
          Prendre rendez-vous
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-ink-soft/80">
          Choisissez une date et un créneau disponibles, puis laissez-nous vos
          coordonnées. Calendrier à titre indicatif pour l'instant.
        </p>
      </div>

      {submitted ? (
        <div className="mx-auto max-w-lg border border-ink/15 px-8 py-14 text-center">
          <span className="rule mx-auto mb-6" />
          <h2 className="font-display text-2xl text-ink">Merci !</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft/80">
            Votre demande de rendez-vous
            {selectedDate && selectedSlot && (
              <>
                {" "}
                pour le{" "}
                <span className="text-ink">
                  {dateFormatter.format(selectedDate)} à {selectedSlot}
                </span>
              </>
            )}{" "}
            a bien été envoyée. Nous vous recontacterons très prochainement
            pour confirmer.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <AvailabilityCalendar
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date)
                setSelectedSlot(null)
                setDateError(false)
              }}
            />

            {selectedDate && (
              <TimeSlotPicker
                date={selectedDate}
                selected={selectedSlot}
                onSelect={(time) => {
                  setSelectedSlot(time)
                  setDateError(false)
                }}
              />
            )}

            <p className="min-h-5 text-center font-display text-sm text-ink">
              {selectedDate && selectedSlot
                ? `Rendez-vous choisi : ${dateFormatter.format(selectedDate)} à ${selectedSlot}`
                : dateError
                  ? (
                    <span className="text-[#8a2e2e]">
                      Merci de choisir une date et un créneau disponibles
                    </span>
                  )
                  : " "}
            </p>
          </div>

          <div className="space-y-7">
            <Field label="Nom complet" name="name" required />
            <Field label="Téléphone" name="phone" type="tel" required />
            <Field label="Email" name="email" type="email" required />

            <div>
              <label
                htmlFor="purpose"
                className="mb-2 block font-display text-xs uppercase tracking-widest-plus text-ink/60"
              >
                Motif
              </label>
              <select
                id="purpose"
                name="purpose"
                required
                defaultValue=""
                className="w-full border-0 border-b border-ink/25 bg-transparent py-2 text-sm text-ink focus:border-ink focus:outline-none"
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
              <label
                htmlFor="message"
                className="mb-2 block font-display text-xs uppercase tracking-widest-plus text-ink/60"
              >
                Message (optionnel)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Type d'événement, robe qui vous intéresse, taille..."
                className="w-full resize-none border border-ink/25 bg-transparent px-3 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-ink focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink px-8 py-3 font-display text-sm uppercase tracking-widest-plus text-cream transition-colors hover:bg-ink-soft disabled:opacity-60"
            >
              {loading ? "Envoi..." : "Envoyer la demande"}
            </button>
          </div>
        </form>
      )}
    </div>

    <section className="border-t border-ink/10">
      <div className="mx-auto grid max-w-5xl gap-14 px-6 py-20 md:grid-cols-2 md:px-10">
        <div>
          <span className="font-display text-sm uppercase tracking-widest-plus text-taupe">
            En atelier
          </span>
          <h2 className="mt-3 font-display text-2xl text-ink">Comment se passe la réservation</h2>
          <ol className="mt-6 space-y-5 text-sm leading-relaxed text-ink-soft/80">
            <li>
              <span className="font-display text-ink">1. Essayage sur rendez-vous.</span>{" "}
              Vous essayez les modèles disponibles et choisissez votre robe.
            </li>
            <li>
              <span className="font-display text-ink">2. Acompte de 20 %</span>{" "}
              du montant de la location, pour bloquer la date.
            </li>
            <li>
              <span className="font-display text-ink">3. Caution</span>{" "}
              par empreinte bancaire ou chèque de caution.
            </li>
            <li>
              <span className="font-display text-ink">4. Solde</span>{" "}
              à régler en ligne ou lors du retrait de la robe.
            </li>
          </ol>
        </div>

        <div>
          <span className="font-display text-sm uppercase tracking-widest-plus text-taupe">
            À distance
          </span>
          <h2 className="mt-3 font-display text-2xl text-ink">Réservation en ligne</h2>
          <p className="mt-6 text-sm leading-relaxed text-ink-soft/80">
            Pour les clientes qui ne peuvent pas se déplacer : réservez directement en ligne, avec
            paiement intégral de la location au moment de la réservation. La caution se fait par
            empreinte bancaire ou par chèque envoyé avant l'expédition de la robe.
          </p>

          <h2 className="mt-10 font-display text-2xl text-ink">Retrait et retour</h2>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink-soft/80">
            <li>Robe à récupérer 1 à 2 jours avant l'événement.</li>
            <li>Le pressing est inclus dans le tarif de location.</li>
            <li>Retour le lundi suivant l'événement.</li>
            <li>Réception uniquement sur rendez-vous, pour un accompagnement personnalisé.</li>
          </ul>
        </div>
      </div>
    </section>
    </>
  )
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-display text-xs uppercase tracking-widest-plus text-ink/60"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full border-0 border-b border-ink/25 bg-transparent py-2 text-sm text-ink focus:border-ink focus:outline-none"
      />
    </div>
  )
}
