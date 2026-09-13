import Image from "next/image";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import type { PostImageAsset } from "../../sanity/lib/queries";
import { urlForImage } from "../../sanity/lib/image";

interface PostImageValue {
  asset?: PostImageAsset & { _id?: string };
  alt?: string;
  caption?: string;
}

// SVG and GIF are served as the original file: the image pipeline would
// rasterise the SVG and drop the GIF's animation.
const UNTOUCHED = new Set(["svg", "gif"]);

export function PostFigure({ value, priority = false }: { value: PostImageValue; priority?: boolean }) {
  const asset = value.asset;
  if (!asset?.url) return null;
  const ratio = asset.width && asset.height ? `${asset.width} / ${asset.height}` : "16 / 9";
  const raw = UNTOUCHED.has(asset.extension);

  return (
    <figure className="my-10 mx-0 flex flex-col gap-3">
      <div className="relative w-full" style={{ aspectRatio: ratio, background: "var(--surface)" }}>
        {raw ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset.url} alt={value.alt ?? ""} className="absolute inset-0 w-full h-full object-contain" loading={priority ? "eager" : "lazy"} />
        ) : (
          <Image
            src={urlForImage(value as never).width(1600).fit("max").auto("format").url()}
            alt={value.alt ?? ""}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority={priority}
          />
        )}
      </div>
      {value.caption && <figcaption className="label">{value.caption}</figcaption>}
    </figure>
  );
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => <PostFigure value={value} />,
    code: ({ value }) => (
      <figure className="my-8 mx-0">
        {(value.filename || value.language) && (
          <figcaption className="label mb-2">{value.filename || value.language}</figcaption>
        )}
        <pre>
          <code>{value.code}</code>
        </pre>
      </figure>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
          {children}
        </a>
      );
    },
    code: ({ children }) => <code>{children}</code>,
  },
};

export default function PostBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="post-body">
      <PortableText value={value} components={components} />
    </div>
  );
}
