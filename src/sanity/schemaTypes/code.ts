import { defineField, defineType } from "sanity";

export default defineType({
  name: "code",
  title: "Code",
  type: "object",
  fields: [
    defineField({
      name: "language",
      type: "string",
      options: {
        list: [
          { title: "Plain text", value: "text" },
          { title: "Bash", value: "bash" },
          { title: "Python", value: "python" },
          { title: "TypeScript", value: "typescript" },
          { title: "JavaScript", value: "javascript" },
          { title: "Go", value: "go" },
          { title: "C / C++", value: "cpp" },
          { title: "YAML", value: "yaml" },
          { title: "JSON", value: "json" },
          { title: "SQL", value: "sql" },
        ],
      },
      initialValue: "text",
    }),
    defineField({ name: "filename", type: "string", description: "Optional, shown above the block." }),
    defineField({ name: "code", type: "text", rows: 12, validation: (r) => r.required() }),
  ],
  preview: {
    select: { code: "code", filename: "filename", language: "language" },
    prepare: ({ code, filename, language }) => ({
      title: filename || language || "Code",
      subtitle: (code || "").split("\n")[0],
    }),
  },
});
