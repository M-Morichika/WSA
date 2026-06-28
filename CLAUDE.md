# CLAUDE.md — War Accountability Audit (WSA)

## スクリプト優先（繰り返し作業の自動化）

繰り返す機械的処理は、**毎回コマンド文を生成せず `tools/` のスクリプトを使う／無ければ作る**。
一度作れば以後はトークン消費ゼロで再利用できる。

- **検証ゲート**: コミット前に必ず `node tools/check.mjs` を通す。
  （全 JS の `node --check` → `verify.js`（registry/references/methodology）→ `check-cache-busting.mjs` を統合し、いずれか失敗で非0終了。）
- **worktree 一括整列**: `bash tools/sync-to-main.sh`。
  （全 worktree を `origin/main` に揃える。main は `merge --ff-only`、`claude/*` は `reset --hard`、未コミット変更のある worktree は SKIP。）
- **cache-bust 照合**: `node tools/check-cache-busting.mjs`（`check.mjs` に内包）。

### 運用規律

- 新しい繰り返し（結合・整形・変換・同期など機械的処理）が出たら、その場の bash を再生成せず **`tools/` にスクリプト化**する。
- ただし **`data/cases/*` の監査内容そのものの改変は機械任せにしない**。codemod を使う場合も必ず `node tools/check.mjs` を通し、結果を多人格レビュー（→ グローバル CLAUDE.md）で確認する。
- 自動化の対象は「結合・整形・検証・同期」の機械的な周辺に限定し、監査判断（rating / canSay・cannotSay / 形跡 vs 不明 / 一次資料の所蔵特定）はスクリプト化しない。CANON の正直性規律と整合させる。
