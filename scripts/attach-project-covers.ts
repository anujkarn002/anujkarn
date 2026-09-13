// One-off, run with the CLI's own login:
//   bunx sanity exec scripts/attach-project-covers.ts --with-user-token -- <dir-of-jpgs>
// Attaches <dir>/<slug>.jpg as the cover image of the project with that slug.
// Skips projects that already have a cover, so re-running is safe.
import { readdirSync, createReadStream } from "node:fs";
import { basename, join } from "node:path";
import { getCliClient } from "sanity/cli";

const dir = process.argv[2];
if (!dir) throw new Error("usage: attach-project-covers.ts <dir>");

const client = getCliClient({ apiVersion: "2024-01-01" });

async function main() {
  const files = readdirSync(dir).filter((f) => f.endsWith(".jpg"));
  for (const file of files) {
    const slug = basename(file, ".jpg");
    const project = await client.fetch<{ _id: string; hasImage: boolean } | null>(
      `*[_type == "project" && slug.current == $slug][0]{ _id, "hasImage": defined(image.asset) }`,
      { slug }
    );
    if (!project) {
      console.log(`skip ${slug}: no project`);
      continue;
    }
    if (project.hasImage) {
      console.log(`skip ${slug}: already has a cover`);
      continue;
    }
    const asset = await client.assets.upload("image", createReadStream(join(dir, file)), { filename: file });
    await client.patch(project._id).set({ image: { _type: "image", asset: { _type: "reference", _ref: asset._id } } }).commit();
    console.log(`attached ${file} -> ${project._id}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
