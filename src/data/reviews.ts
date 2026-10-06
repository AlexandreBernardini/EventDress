export type Review = {
  id: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  date: string
}

// Ajouter ici les vrais avis clientes (avec leur accord). Ne pas mettre d'avis fictifs en prod.
export const reviews: Review[] = []

// Lien vers la fiche Google Business de la cliente (à renseigner).
export const googleReviewsUrl = ""

// Note affichée en badge, à mettre à jour à la main.
export const googleRating = { score: "5,0", count: 7 }
