import { defineField, defineType } from "sanity";

const imageFields = [
  defineField({
    name: "alt",
    title: "Alt text",
    type: "string",
    description: "Describes the image for screen readers and when it fails to load.",
  }),
  defineField({
    name: "caption",
    title: "Caption",
    type: "string",
    description: "Shown under the image.",
  }),
];

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Shown in lists and used as the page description.",
    }),
    defineField({
      name: "mainImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: imageFields,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        },
        { type: "image", options: { hotspot: true }, fields: imageFields },
        { type: "code", options: { withFilename: true } },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "excerpt", media: "mainImage" },
  },
});
