export type Collaboration = {
  id: string
  name: string
  role: string
  description: string
  image?: string
}

export const collaborationsIntro =
  "Au fil des événements, Event Dress a eu l'honneur d'habiller des personnalités et créatrices de contenu pour leurs apparitions et représentations."

// Photos à ajouter dès qu'elle les envoie.
export const collaborations: Collaboration[] = [
  {
    id: "miss-rhone-alpes",
    name: "Miss Rhône-Alpes",
    role: "Titre régional",
    description: "Habillée à plusieurs reprises pour différents événements et apparitions officielles.",
  },
  {
    id: "miss-reunion",
    name: "Miss Réunion",
    role: "Candidate à Miss France",
    description: "Collaboration dans le cadre de son parcours et de ses représentations.",
  },
  {
    id: "ophenya",
    name: "Ophenya",
    role: "Influenceuse",
    description: "Habillée lors de sa participation en tant que membre du jury d'une élection de miss.",
  },
  {
    id: "hanae",
    name: "Hanae",
    role: "Influenceuse",
    description: "Habillée pour sa présence en tant que jury lors d'une élection de miss.",
  },
  {
    id: "mayane",
    name: "Mayane",
    role: "Actrice",
    description: "Habillée pour sa participation à une élection de miss.",
  },
  {
    id: "dauphines-loire",
    name: "Dauphines du Comité Miss Loire",
    role: "Comité Miss Loire",
    description: "Création et mise à disposition de tenues pour différents événements du comité.",
  },
  {
    id: "miss-loire",
    name: "Miss Loire",
    role: "Titre départemental",
    description: "Habillée pour plusieurs shootings photos et événements de représentation.",
  },
]
