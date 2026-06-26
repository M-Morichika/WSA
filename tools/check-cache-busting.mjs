import { readFileSync } from "node:fs";

const checks = [
  {
    file: "index.html",
    pattern: /app\.js\?v=([A-Za-z0-9_-]+)/g,
  },
  {
    file: "app.js",
    pattern: /(?:auditSchema|cases\/index|renderers)\.js\?v=([A-Za-z0-9_-]+)/g,
  },
  {
    file: "data/cases/index.js",
    pattern: /\.js\?v=([A-Za-z0-9_-]+)/g,
  },
  {
    file: "ui/renderers.js",
    pattern: /auditSchema\.js\?v=([A-Za-z0-9_-]+)/g,
  },
];

const found = [];
const missing = [];

for (const check of checks) {
  const source = readFileSync(check.file, "utf8");
  const matches = [...source.matchAll(check.pattern)].map((match) => match[1]);
  if (matches.length === 0) {
    missing.push(check.file);
    continue;
  }
  for (const version of matches) {
    found.push({ file: check.file, version });
  }
}

const versions = new Set(found.map((item) => item.version));

if (missing.length > 0 || versions.size !== 1) {
  console.error("cache-busting mismatch detected");
  if (missing.length > 0) {
    console.error("missing version markers:", missing.join(", "));
  }
  for (const item of found) {
    console.error(`${item.file}: ${item.version}`);
  }
  process.exit(1);
}

const [version] = versions;
console.log(`cache-busting ok: ${version} (${found.length} imports checked)`);