// Disponibilités de démonstration — à remplacer par les vrais créneaux de la cliente
// (ou une connexion à son agenda) une fois le backend en place.

export type DayStatus = "available" | "busy" | "past"

function toKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

// Génère quelques jours "pris" de façon stable (pas aléatoire à chaque rendu)
// pour les ~60 prochains jours, dimanche exclu (fermé).
function buildFakeBusyDays(): Set<string> {
  const busy = new Set<string>()
  const start = new Date()
  start.setHours(0, 0, 0, 0)

  for (let i = 0; i < 60; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    if (d.getDay() === 0) continue // fermé le dimanche

    // motif fixe : pris tous les 3-4 jours, plus chargé les week-ends
    const isWeekend = d.getDay() === 6 || d.getDay() === 5
    if ((i % 4 === 0) || (isWeekend && i % 2 === 0)) {
      busy.add(toKey(d))
    }
  }
  return busy
}

const busyDays = buildFakeBusyDays()

export function getDayStatus(date: Date): DayStatus {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)

  if (d < today) return "past"
  if (d.getDay() === 0) return "busy" // fermé le dimanche
  return busyDays.has(toKey(d)) ? "busy" : "available"
}

export type TimeSlot = {
  time: string
  available: boolean
}

const TIME_SLOTS = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

// Créneaux de démonstration, générés de façon stable par date (pas aléatoire
// à chaque rendu) — à remplacer par le vrai planning d'essayage de la cliente.
export function getTimeSlots(date: Date): TimeSlot[] {
  const seed = Array.from(toKey(date)).reduce((sum, char) => sum + char.charCodeAt(0), 0)

  return TIME_SLOTS.map((time, i) => ({
    time,
    available: (seed + i * 7) % 5 !== 0,
  }))
}
