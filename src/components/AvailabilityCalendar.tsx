import { useMemo, useState } from "react"
import { getDayStatus } from "../data/availability"

const weekDays = ["L", "M", "M", "J", "V", "S", "D"]
const monthFormatter = new Intl.DateTimeFormat("fr-FR", {
  month: "long",
  year: "numeric",
})

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

type Props = {
  selected: Date | null
  onSelect: (date: Date) => void
}

export default function AvailabilityCalendar({ selected, onSelect }: Props) {
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(new Date()))

  const weeks = useMemo(() => {
    const first = startOfMonth(visibleMonth)
    // lundi = 0 ... dimanche = 6
    const leadingBlanks = (first.getDay() + 6) % 7
    const daysInMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() + 1,
      0,
    ).getDate()

    const cells: (Date | null)[] = [
      ...Array(leadingBlanks).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => new Date(
        visibleMonth.getFullYear(),
        visibleMonth.getMonth(),
        i + 1,
      )),
    ]
    while (cells.length % 7 !== 0) cells.push(null)

    const rows: (Date | null)[][] = []
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7))
    return rows
  }, [visibleMonth])

  const today = new Date()

  return (
    <div className="border border-ink/15 p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          aria-label="Mois précédent"
          onClick={() =>
            setVisibleMonth(
              (m) => new Date(m.getFullYear(), m.getMonth() - 1, 1),
            )
          }
          className="font-display text-lg text-ink/60 transition-colors hover:text-ink"
        >
          ‹
        </button>
        <p className="font-display text-lg capitalize text-ink">
          {monthFormatter.format(visibleMonth)}
        </p>
        <button
          type="button"
          aria-label="Mois suivant"
          onClick={() =>
            setVisibleMonth(
              (m) => new Date(m.getFullYear(), m.getMonth() + 1, 1),
            )
          }
          className="font-display text-lg text-ink/60 transition-colors hover:text-ink"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {weekDays.map((d, i) => (
          <div
            key={`${d}-${i}`}
            className="pb-2 text-center font-display text-[11px] uppercase tracking-widest-plus text-ink/40"
          >
            {d}
          </div>
        ))}

        {weeks.flat().map((date, i) => {
          if (!date) return <div key={`blank-${i}`} />

          const status = getDayStatus(date)
          const isSelected = selected ? isSameDay(date, selected) : false
          const isToday = isSameDay(date, today)
          const disabled = status !== "available"

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(date)}
              title={
                status === "busy"
                  ? "Complet"
                  : status === "past"
                    ? "Date passée"
                    : "Disponible"
              }
              className={[
                "aspect-square rounded-full font-sans text-sm transition-colors",
                isSelected
                  ? "bg-ink text-cream"
                  : status === "available"
                    ? "text-ink hover:bg-ink/10"
                    : status === "busy"
                      ? "text-ink/25 line-through decoration-ink/25"
                      : "text-ink/15",
                isToday && !isSelected ? "ring-1 ring-taupe" : "",
              ].join(" ")}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-ink/10 pt-5 text-xs text-ink-soft/70">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-ink" /> Sélectionné
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border border-ink/40" /> Disponible
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" /> Complet
        </span>
      </div>
    </div>
  )
}
