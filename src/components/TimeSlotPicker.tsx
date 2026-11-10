import { getTimeSlots } from "../data/availability"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
})

type Props = {
  date: Date
  selected: string | null
  onSelect: (time: string) => void
}

export default function TimeSlotPicker({ date, selected, onSelect }: Props) {
  const slots = getTimeSlots(date)
  const hasAvailableSlot = slots.some((slot) => slot.available)
  const dateLabel = dateFormatter.format(date)

  return (
    <div className="panel animate-fade-up px-4 py-6 sm:p-7">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="field-label mb-0">Créneaux disponibles</p>
        <p className="font-display text-lg first-letter:uppercase text-ink">{dateLabel}</p>
      </div>

      <div
        role="group"
        aria-label={`Créneaux du ${dateLabel}`}
        className="grid grid-cols-3 gap-2 sm:grid-cols-4"
      >
        {slots.map(({ time, available }) => {
          const isSelected = selected === time
          return (
            <button
              key={time}
              type="button"
              disabled={!available}
              onClick={() => onSelect(time)}
              aria-pressed={isSelected}
              aria-label={`${time}, ${available ? "disponible" : "complet"}`}
              title={available ? undefined : "Complet"}
              className={[
                "min-h-11 border font-sans text-sm tabular-nums tracking-wider transition-colors duration-300 ease-luxe",
                isSelected
                  ? "border-ink bg-ink text-cream"
                  : available
                    ? "border-ink/20 text-ink hover:border-ink hover:bg-cream-dark"
                    : "cursor-not-allowed border-ink/10 text-ink/40 line-through decoration-ink/40",
              ].join(" ")}
            >
              {time}
            </button>
          )
        })}
      </div>

      {!hasAvailableSlot && (
        <p className="mt-5 text-center text-sm text-ink-soft">
          Aucun créneau disponible ce jour-là. Choisissez une autre date.
        </p>
      )}
    </div>
  )
}
