import { marked } from "marked";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image?: string;
  imageAlt?: string;
};

export type Post = PostMeta & {
  contentHtml: string;
};

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
      data[key] = val;
    }
  });
  return { data, content: match[2] };
}

const rawFiles = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export function getAllPosts(): PostMeta[] {
  return Object.entries(rawFiles)
    .map(([filePath, raw]) => {
      const slug = filePath.replace("../content/blog/", "").replace(".md", "");
      const { data } = parseFrontmatter(raw);
      return {
        slug,
        title: data.title || "",
        date: data.date || "",
        category: data.category || "",
        excerpt: data.excerpt || "",
        image: data.image || undefined,
        imageAlt: data.imageAlt || undefined,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const entry = Object.entries(rawFiles).find(
    ([filePath]) => filePath.replace("../content/blog/", "").replace(".md", "") === slug
  );
  if (!entry) return null;
  const [, raw] = entry;
  const { data, content } = parseFrontmatter(raw);
  return {
    slug,
    title: data.title || "",
    date: data.date || "",
    category: data.category || "",
    excerpt: data.excerpt || "",
    image: data.image || undefined,
    imageAlt: data.imageAlt || undefined,
    contentHtml: marked(content) as string,
  };
}
