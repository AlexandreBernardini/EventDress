import { defineField, defineType } from "sanity"

export const dress = defineType({
  name: "dress",
  title: "Robe",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: { list: ["Soirée", "Cocktail", "Gala", "Mariage invitée"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "color", title: "Couleur", type: "string" }),
    defineField({ name: "sizes", title: "Tailles disponibles", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "pricePerDay", title: "Prix par jour (€)", type: "number", validation: (r) => r.required().min(0) }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "images",
      title: "Photos (la 1ʳᵉ est la photo principale)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: "published", title: "Visible sur le site", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "images.0" },
  },
})
