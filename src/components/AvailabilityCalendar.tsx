import { useMemo, useState } from "react"
import { type DayStatus, getDayStatus } from "../data/availability"
import { ChevronLeftIcon, ChevronRightIcon } from "./icons"

const weekDays = [
  { short: "L", long: "lundi" },
  { short: "M", long: "mardi" },
  { short: "M", long: "mercredi" },
  { short: "J", long: "jeudi" },
  { short: "V", long: "vendredi" },
  { short: "S", long: "samedi" },
  { short: "D", long: "dimanche" },
]

const monthFormatter = new Intl.DateTimeFormat("fr-FR", { month: "long" })
const monthYearFormatter = new Intl.DateTimeFormat("fr-FR", {
  month: "long",
  year: "numeric",
})
const dayLabelFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
})

const statusLabels: Record<DayStatus, string> = {
  available: "disponible",
  busy: "complet",
  past: "date passée",
}

// Pastilles de légende : reprennent fidèlement le rendu des jours du calendrier.
const legend = [
  { label: "Sélectionné", swatchClass: "bg-ink text-cream" },
  { label: "Disponible", swatchClass: "text-ink" },
  { label: "Aujourd'hui", swatchClass: "text-ink ring-1 ring-taupe-deep ring-inset" },
  { label: "Complet", swatchClass: "text-ink/40 line-through decoration-ink/40" },
]

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
  const canGoBack = visibleMonth.getTime() > startOfMonth(today).getTime()
  const monthLabel = monthYearFormatter.format(visibleMonth)

  const navButtonClass =
    "flex size-10 shrink-0 items-center justify-center border border-ink/25 text-ink transition-colors duration-500 ease-luxe hover:border-ink hover:bg-ink hover:text-cream aria-disabled:pointer-events-none aria-disabled:opacity-30 sm:size-11"

  return (
    <div className="panel px-3 py-6 sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-4 px-1 sm:px-0">
        <button
          type="button"
          aria-label="Mois précédent"
          aria-disabled={!canGoBack}
          onClick={() => {
            // aria-disabled plutôt que disabled : le bouton garde le focus
            // clavier lorsqu'on revient au mois courant.
            if (!canGoBack) return
            setVisibleMonth(
              (m) => new Date(m.getFullYear(), m.getMonth() - 1, 1),
            )
          }}
          className={navButtonClass}
        >
          <ChevronLeftIcon />
        </button>

        <p aria-live="polite" className="flex items-baseline gap-3 text-center">
          <span className="sr-only">{monthLabel}</span>
          <span aria-hidden="true" className="font-display text-2xl capitalize text-ink">
            {monthFormatter.format(visibleMonth)}
          </span>
          <span
            aria-hidden="true"
            className="font-display text-sm tracking-[0.2em] text-taupe-deep"
          >
            {visibleMonth.getFullYear()}
          </span>
        </p>

        <button
          type="button"
          aria-label="Mois suivant"
          onClick={() =>
            setVisibleMonth(
              (m) => new Date(m.getFullYear(), m.getMonth() + 1, 1),
            )
          }
          className={navButtonClass}
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1.5 sm:gap-x-1" aria-hidden="true">
        {weekDays.map((d) => (
          <abbr
            key={d.long}
            title={d.long}
            className="pb-3 text-center font-display text-xs font-medium uppercase tracking-[0.2em] text-taupe-deep no-underline"
          >
            {d.short}
          </abbr>
        ))}
      </div>

      <div
        role="group"
        aria-label={`Jours de ${monthLabel}`}
        className="grid grid-cols-7 gap-y-1.5 sm:gap-x-1"
      >
        {weeks.flat().map((date, i) => {
          if (!date) return <div key={`blank-${i}`} aria-hidden="true" />

          const status = getDayStatus(date)
          const isSelected = selected ? isSameDay(date, selected) : false
          const isToday = isSameDay(date, today)
          const disabled = status !== "available"
          const label = [
            dayLabelFormatter.format(date),
            isToday ? "aujourd'hui" : null,
            statusLabels[status],
          ]
            .filter(Boolean)
            .join(", ")

          return (
            <div key={date.toISOString()} className="flex justify-center">
              <button
                type="button"
                disabled={disabled}
                onClick={() => onSelect(date)}
                aria-label={label}
                aria-pressed={isSelected}
                title={status === "busy" ? "Complet" : status === "past" ? "Date passée" : undefined}
                className={[
                  "flex size-10 items-center justify-center rounded-full font-sans text-sm tabular-nums transition-colors duration-300 ease-luxe sm:size-11",
                  isSelected
                    ? "bg-ink font-normal text-cream"
                    : status === "available"
                      ? "font-normal text-ink hover:bg-cream-dark"
                      : status === "busy"
                        ? "text-ink/40 line-through decoration-ink/40"
                        : "text-ink/30",
                  isToday && !isSelected ? "ring-1 ring-taupe-deep ring-inset" : "",
                ].join(" ")}
              >
                {date.getDate()}
              </button>
            </div>
          )
        })}
      </div>

      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-ink/10 px-2 pt-5 text-xs text-ink-soft">
        {legend.map(({ label, swatchClass }) => (
          <li key={label} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`flex size-6 items-center justify-center rounded-full font-sans text-[0.65rem] tabular-nums ${swatchClass}`}
            >
              8
            </span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}
