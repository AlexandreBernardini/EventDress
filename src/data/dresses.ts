export type Dress = {
  id: string
  name: string
  category: "Soirée" | "Cocktail" | "Gala" | "Mariage invitée"
  size: string[]
  color: string
  pricePerDay: number
  available: boolean
  // Ton de fond du placeholder tant que la cliente n'a pas fourni ses photos.
  swatch: string
  description: string
}

// Données de démonstration — à remplacer par les vraies robes et photos de la cliente.
export const dresses: Dress[] = [
  {
    id: "1",
    name: "Robe Aurore",
    category: "Soirée",
    size: ["XS", "S", "M"],
    color: "Noir",
    pricePerDay: 65,
    available: true,
    swatch: "#232019",
    description: "Fourreau satin dos nu, coupe sirène, longueur au sol.",
  },
  {
    id: "2",
    name: "Robe Céleste",
    category: "Gala",
    size: ["S", "M", "L"],
    color: "Bordeaux",
    pricePerDay: 85,
    available: true,
    swatch: "#5c1f28",
    description: "Bustier structuré, jupe fluide à volants, effet drapé.",
  },
  {
    id: "3",
    name: "Robe Ivoire",
    category: "Mariage invitée",
    size: ["XS", "S"],
    color: "Ivoire",
    pricePerDay: 70,
    available: false,
    swatch: "#e8ddc8",
    description: "Robe longue plissée, encolure bardot, tissu chiffon.",
  },
  {
    id: "4",
    name: "Robe Émeraude",
    category: "Cocktail",
    size: ["M", "L"],
    color: "Vert émeraude",
    pricePerDay: 55,
    available: true,
    swatch: "#1f3d33",
    description: "Robe mi-longue, taille cintrée, manches longues transparentes.",
  },
  {
    id: "5",
    name: "Robe Ondine",
    category: "Soirée",
    size: ["S", "M"],
    color: "Bleu nuit",
    pricePerDay: 75,
    available: true,
    swatch: "#1b2436",
    description: "Robe fluide en mousseline, fente latérale, bretelles fines.",
  },
  {
    id: "6",
    name: "Robe Prestige",
    category: "Gala",
    size: ["M", "L", "XL"],
    color: "Champagne",
    pricePerDay: 90,
    available: true,
    swatch: "#c9ac7a",
    description: "Robe brodée de perles, coupe sirène, traîne courte.",
  },
]

export const categories = [
  "Toutes",
  "Soirée",
  "Cocktail",
  "Gala",
  "Mariage invitée",
] as const
