import { defineField, defineType } from "sanity"

export const collaboration = defineType({
  name: "collaboration",
  title: "Collaboration",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Personnalité", type: "string", validation: (r) => r.required() }),
    defineField({ name: "event", title: "Événement", type: "string" }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({
      name: "consent",
      title: "Accord écrit confirmé",
      type: "boolean",
      validation: (r) => r.required().custom((v) => v === true || "L'accord doit être confirmé"),
    }),
    defineField({ name: "published", title: "Visible sur le site", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "name", subtitle: "event", media: "image" } },
})
