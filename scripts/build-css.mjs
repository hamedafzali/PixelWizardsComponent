// Bundles the stylesheets into dist/:
//   index.css       reset + theme variables + component styles (standalone apps)
//   components.css  component styles only, for apps that bring their own
//                   reset and define the --color-* / --radius-* variables
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const styles = resolve(root, "src/styles");
const dist = resolve(root, "dist");

// Inline local @import url("./x.css") statements.
const inline = (file) =>
  readFileSync(file, "utf8").replace(
    /@import\s+url\(["']?(\.\/[^"')]+)["']?\);?/g,
    (_, rel) => inline(resolve(dirname(file), rel)),
  );

mkdirSync(dist, { recursive: true });
const components = inline(resolve(styles, "components.css"));
writeFileSync(resolve(dist, "components.css"), components);
writeFileSync(
  resolve(dist, "index.css"),
  `${inline(resolve(styles, "global.css"))}\n${components}`,
);
console.log("css: dist/index.css, dist/components.css");
