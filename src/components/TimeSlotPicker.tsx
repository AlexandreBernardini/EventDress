import { getTimeSlots } from "../data/availability"

type Props = {
  date: Date
  selected: string | null
  onSelect: (time: string) => void
}

export default function TimeSlotPicker({ date, selected, onSelect }: Props) {
  const slots = getTimeSlots(date)

  return (
    <div className="border border-ink/15 p-6 md:p-8">
      <p className="mb-5 font-display text-sm uppercase tracking-widest-plus text-ink/60">
        Créneaux disponibles
      </p>

      <div className="grid grid-cols-4 gap-2">
        {slots.map(({ time, available }) => {
          const isSelected = selected === time
          return (
            <button
              key={time}
              type="button"
              disabled={!available}
              onClick={() => onSelect(time)}
              title={available ? "Disponible" : "Complet"}
              className={[
                "border py-2 font-sans text-sm transition-colors",
                isSelected
                  ? "border-ink bg-ink text-cream"
                  : available
                    ? "border-ink/20 text-ink hover:border-ink"
                    : "border-ink/10 text-ink/25 line-through decoration-ink/25",
              ].join(" ")}
            >
              {time}
            </button>
          )
        })}
      </div>
    </div>
  )
}
