import { defineField, defineType } from "sanity"

export const review = defineType({
  name: "review",
  title: "Avis",
  type: "document",
  fields: [
    defineField({ name: "author", title: "Prénom / pseudo", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "rating",
      title: "Note",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "text", title: "Témoignage", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date", type: "string", description: "Ex : septembre 2026" }),
    defineField({
      name: "consent",
      title: "Accord de la cliente confirmé",
      type: "boolean",
      description: "À cocher uniquement si la cliente a donné son accord pour publier cet avis.",
      validation: (r) => r.required().custom((v) => v === true || "L'accord doit être confirmé"),
    }),
    defineField({ name: "published", title: "Visible sur le site", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "author", subtitle: "text" } },
})
