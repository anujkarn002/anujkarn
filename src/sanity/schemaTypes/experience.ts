import { defineField, defineType } from "sanity";

export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  orderings: [{ title: "Manual order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    defineField({ name: "role", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "company", type: "string", validation: (r) => r.required() }),
    defineField({ name: "where", title: "Location", type: "string", description: "e.g. Sydney, Australia · Remote" }),
    defineField({ name: "from", title: "Start", type: "string", description: "e.g. Apr 2025" }),
    defineField({ name: "to", title: "End", type: "string", description: "e.g. Dec 2025, or Present" }),
    defineField({ name: "current", title: "Current role", type: "boolean", initialValue: false }),
    defineField({ name: "note", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "order", type: "number", description: "Lower numbers come first — put the current role at 1." }),
  ],
  preview: {
    select: { title: "role", subtitle: "company" },
  },
});
