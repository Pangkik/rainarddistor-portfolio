import { build } from "vite";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

async function buildSSG() {
  // Step 1: Client build
  console.log("Building client...");
  await build({ root, build: { outDir: "dist", emptyOutDir: true } });

  // Step 2: Server (SSR) build
  console.log("Building server entry...");
  await build({
    root,
    build: {
      ssr: "src/entry-server.tsx",
      outDir: "dist/server",
      emptyOutDir: true,
    },
  });

  // Step 3: Load server bundle
  const serverEntry = path.resolve(root, "dist/server/entry-server.js");
  const { render } = await import(serverEntry);

  // Step 4: Read HTML template
  const template = await fs.readFile(path.resolve(root, "dist/index.html"), "utf-8");

  // Step 5: Collect routes
  const routes = ["/", "/blog"];
  const postsDir = path.resolve(root, "src/content/blog");
  if (existsSync(postsDir)) {
    const files = await fs.readdir(postsDir);
    for (const file of files) {
      if (file.endsWith(".md")) {
        routes.push(`/blog/${file.replace(".md", "")}`);
      }
    }
  }

  // Step 6: Render and write each route
  for (const url of routes) {
    console.log(`Rendering ${url}...`);
    const { html: appHtml, helmet } = render(url);

    let html = template.replace("<!--app-html-->", appHtml);

    if (helmet) {
      const headTags = [
        helmet.title?.toString() ?? "",
        helmet.meta?.toString() ?? "",
        helmet.link?.toString() ?? "",
        helmet.script?.toString() ?? "",
      ].join("\n");
      html = html.replace("<!--app-head-->", headTags);
    } else {
      html = html.replace("<!--app-head-->", "");
    }

    const outPath =
      url === "/"
        ? path.resolve(root, "dist/index.html")
        : path.resolve(root, `dist${url}/index.html`);

    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, html);
    console.log(`  Wrote ${outPath}`);
  }

  // Step 7: Generate sitemap.xml
  const base = "https://raingoesaway.com";
  const urlEntries = routes
    .map(
      (r) => `  <url>\n    <loc>${base}${r}</loc>\n    <changefreq>${r === "/" ? "weekly" : "monthly"}</changefreq>\n  </url>`
    )
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;
  await fs.writeFile(path.resolve(root, "dist/sitemap.xml"), sitemap);
  console.log("Generated dist/sitemap.xml");

  // Step 8: Remove temp server bundle
  await fs.rm(path.resolve(root, "dist/server"), { recursive: true, force: true });

  console.log("SSG build complete.");
}

buildSSG().catch((err) => {
  console.error(err);
  process.exit(1);
});
