"use client";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

const SINGLETONS = new Set(["settings"]);

export default defineConfig({
  basePath: "/studio",
  name: "anujkarn-dev",
  title: "anujkarn.dev",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((t) => !SINGLETONS.has(t.schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.has(schemaType) ? actions.filter((a) => !["unpublish", "delete", "duplicate"].includes(a.action ?? "")) : actions,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Site settings").id("settings").child(S.document().schemaType("settings").documentId("settings")),
            S.divider(),
            S.documentTypeListItem("post").title("Posts"),
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("experience").title("Experience"),
            S.documentTypeListItem("photo").title("Photographs"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
