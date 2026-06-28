#!/usr/bin/env node
// 統合検証ゲート。コミット前に `node tools/check.mjs` を必ず通すこと。
// 1) 全JSの構文チェック（node --check） 2) verify.js（registry/references/methodology）
// 3) check-cache-busting.mjs を順に実行し、どれか失敗したら非0終了する。
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const run = (args, opts = {}) =>
  spawnSync("node", args, { cwd: root, encoding: "utf8", ...opts });

let failed = 0;
const fail = (label, detail) => {
  failed++;
  console.error(`✗ ${label}`);
  if (detail && detail.trim()) console.error(detail.trim());
};

// 1. 構文チェック（app/verify/schema/renderers ＋ data/cases/*.js（index.js 含む））
const caseFiles = readdirSync(join(root, "data/cases"))
  .filter((f) => f.endsWith(".js"))
  .map((f) => `data/cases/${f}`);
const syntaxTargets = [
  "app.js",
  "verify.js",
  "data/auditSchema.js",
  "ui/renderers.js",
  ...caseFiles,
];
let syntaxOk = 0;
for (const f of syntaxTargets) {
  const r = run(["--check", f]);
  if (r.status === 0) syntaxOk++;
  else fail(`node --check ${f}`, r.stderr);
}
if (syntaxOk === syntaxTargets.length) console.log(`✓ syntax: ${syntaxOk} files`);

// 2. verify.js（成功時の per-case 出力は抑制し、失敗の詳細は stderr で表示）
const v = run(["verify.js"], { stdio: ["ignore", "ignore", "inherit"] });
if (v.status === 0) console.log("✓ verify.js (registry / references / methodology)");
else fail("verify.js");

// 3. cache-busting
const c = run(["tools/check-cache-busting.mjs"], { stdio: ["ignore", "pipe", "inherit"] });
if (c.status === 0) console.log(`✓ ${(c.stdout || "").trim()}`);
else fail("check-cache-busting.mjs");

console.log("");
if (failed === 0) {
  console.log("ALL GATES PASSED");
  process.exit(0);
}
console.error(`${failed} GATE(S) FAILED`);
process.exit(1);
