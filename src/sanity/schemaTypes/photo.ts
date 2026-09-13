import { defineField, defineType } from "sanity";

export default defineType({
  name: "photo",
  title: "Photograph",
  type: "document",
  orderings: [
    { title: "Manual order", name: "order", by: [{ field: "order", direction: "asc" }] },
    { title: "Newest first", name: "newest", by: [{ field: "_createdAt", direction: "desc" }] },
  ],
  fields: [
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: "caption", type: "string" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "order", type: "number", description: "Lower numbers come first. Leave blank to sort by upload date." }),
  ],
  preview: {
    select: { title: "caption", media: "image" },
    prepare: ({ title, media }) => ({ title: title || "Untitled photograph", media }),
  },
});
