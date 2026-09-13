import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [{ title: "Manual order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "One-line description",
      type: "string",
      description: "Shown in lists. Keep it to a sentence.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "detail",
      title: "Detail paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      description: "Shown on the project page, one paragraph each.",
    }),
    defineField({ name: "client", title: "Client / employer", type: "string" }),
    defineField({ name: "stack", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "link", title: "Public link (optional)", type: "url" }),
    defineField({
      name: "image",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      description: "Used for the tiles in Deep Field mode and at the top of the project page.",
    }),
    defineField({ name: "order", type: "number", description: "Lower numbers come first." }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "image" },
  },
});
