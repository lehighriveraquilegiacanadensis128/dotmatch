import { readFileSync } from "node:fs";

const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");

const requiredSnippets = [
  ["GitHub source link", "https://github.com/Dnncha/dotmatch"],
  ["install section anchor", "id=\"install\""],
  ["citation section anchor", "id=\"cite\""],
  ["methods docs link", "docs/methods-and-citation.md"],
  ["benchmark evidence link", "docs/benchmarks/public_crispr/README.md"],
  ["citation file link", "CITATION.cff"]
];

const missing = requiredSnippets.filter(([, snippet]) => !page.includes(snippet));

if (missing.length > 0) {
  console.error("Missing launch-surface affordances:");
  for (const [label, snippet] of missing) {
    console.error(`- ${label}: ${snippet}`);
  }
  process.exit(1);
}
