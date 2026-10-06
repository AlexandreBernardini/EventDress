import p01 from "../assets/photos/photo-01.jpg"
import p02 from "../assets/photos/photo-02.jpg"
import p03 from "../assets/photos/photo-03.jpg"
import p04 from "../assets/photos/photo-04.jpg"
import p05 from "../assets/photos/photo-05.jpg"
import p06 from "../assets/photos/photo-06.jpg"
import p07 from "../assets/photos/photo-07.jpg"
import p08 from "../assets/photos/photo-08.jpg"
import p09 from "../assets/photos/photo-09.jpg"
import p10 from "../assets/photos/photo-10.jpg"
import p12 from "../assets/photos/photo-12.jpg"

export type Dress = {
  id: string
  name: string
  category: "Soirée" | "Cocktail" | "Gala" | "Mariage invitée"
  size: string[]
  color: string
  pricePerDay: number
  images: string[]
  description: string
}

// Prix, tailles, couleurs et noms sont provisoires — à confirmer avec la cliente.
export const dresses: Dress[] = [
  {
    id: "argent",
    name: "Robe Argent",
    category: "Soirée",
    size: ["XS", "S", "M"],
    color: "Argent",
    pricePerDay: 85,
    images: [p01],
    description: "Fourreau entièrement brodé de sequins argentés, bustier sculpté.",
  },
  {
    id: "champagne",
    name: "Robe Champagne",
    category: "Gala",
    size: ["S", "M", "L"],
    color: "Champagne",
    pricePerDay: 90,
    images: [p02],
    description: "Fourreau fendu sur la jambe, bustier brodé de cristaux.",
  },
  {
    id: "corail",
    name: "Robe Corail",
    category: "Gala",
    size: ["XS", "S", "M"],
    color: "Corail",
    pricePerDay: 95,
    images: [p03, p04],
    description: "Fourreau sequiné, drapé asymétrique sur l'épaule.",
  },
  {
    id: "or",
    name: "Robe Or",
    category: "Gala",
    size: ["S", "M", "L"],
    color: "Or",
    pricePerDay: 110,
    images: [p07, p05],
    description: "Satin doré, bustier brodé et laçage au dos pour un ajustement sur mesure.",
  },
  {
    id: "saphir",
    name: "Robe Saphir",
    category: "Gala",
    size: ["S", "M", "L", "XL"],
    color: "Bleu saphir",
    pricePerDay: 120,
    images: [p06],
    description: "Longue robe en tulle superposé, coupe asymétrique.",
  },
  {
    id: "nacre",
    name: "Robe Nacre",
    category: "Soirée",
    size: ["XS", "S", "M"],
    color: "Nacre",
    pricePerDay: 80,
    images: [p08],
    description: "Fourreau brodé de sequins nacrés.",
  },
  {
    id: "plume",
    name: "Robe Plume",
    category: "Soirée",
    size: ["S", "M", "L"],
    color: "Ivoire",
    pricePerDay: 100,
    images: [p09],
    description: "Haut en plumes, jupe fourreau satinée argentée.",
  },
  {
    id: "ensemble-ivoire",
    name: "Ensemble Ivoire",
    category: "Cocktail",
    size: ["XS", "S", "M", "L"],
    color: "Ivoire",
    pricePerDay: 70,
    images: [p10],
    description: "Ensemble veste et pantalon ivoire à coupe structurée.",
  },
  {
    id: "rose",
    name: "Robe Rose",
    category: "Mariage invitée",
    size: ["XS", "S", "M"],
    color: "Rose poudré",
    pricePerDay: 75,
    images: [p12],
    description: "Robe fluide drapée, bustier brodé de perles.",
  },
]

export const categories = [
  "Toutes",
  "Soirée",
  "Cocktail",
  "Gala",
  "Mariage invitée",
] as const
