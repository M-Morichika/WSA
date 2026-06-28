# HANDOFF.md — War Accountability Audit（圧縮版）

最終更新: 2026-06-28
役割: 再開に必要な **現在状態・検証状態・次作業だけ**。設計原則は `docs/CANON.md`、由来は `docs/HISTORY.md`、詳細仕様は `docs/METHOD_APPENDIX.md`。

> ⚠️ 再構成注記: 本 HANDOFF は、今回アップロードされた HANDOFF が別プロジェクト（ASAA）の旧版だったため、**WSA の CANON / HISTORY の現在状態記述から再構成** した。§1・§3 の「未コミット」「cache-bust」状態は、実リポジトリの `git status` と `rg --files` で必ず突き合わせること。

---

## 1. 現在の実装状態

- 8ケース登録済み（4戦争 × 両陣営）。`lintCaseMethodology` 全ケース0が基本維持線。
- 既定 activeCase は最後に着手した戦争に依存（直近 HISTORY では湾岸→ウクライナ系へ移動）。再開時 `data/cases/index.js` で確認する。
- **未コミットの可能性が高い差分**（直近 HISTORY より）:
  - `2-NEW-P` 仏 france ケース 一次資料接地＋格付け「未確定」復旧（未コミット）
  - `2-NEW-Q` ウクライナ Ukraine 側 skeleton 追加レビュー M-1〜M-5/M-7 反映（未コミット）
- **cache-bust 文字列がドリフトしている**（要統一確認）: CANON §10-K は `20260627-phaseb-coalition` を現行と記すが、直近 HISTORY は `20260627-fpw-france-grounding` と `20260627-ruu-time-caveats` を併用。**5箇所（index.html / app.js / data/cases/index.js / ui/renderers.js / verify.js）が同一文字列か** を最優先で確認する。

### 登録ケース（8）

```text
falklands-1982-argentina      ⇄ falklands-1982-uk
gulf-war-1990-iraq            ⇄ gulf-war-1990-coalition
franco-prussian-war-1870-france ⇄ franco-prussian-war-1870-prussia
russo-ukrainian-war-2022-russia ⇄ russo-ukrainian-war-2022-ukraine
```

全ペア `counterpartCaseId` 双方向。rating は skeleton 段階のケースを中心に「未確定」保持（特に仏 france は D+/D を未確定へ復旧済み）。

---

## 2. ファイル構成

```text
index.html / app.js / styles.css / verify.js
tools/check-cache-busting.mjs
data/auditSchema.js
data/cases/index.js
data/cases/<8 case files>.js
ui/renderers.js
docs/CANON.md / docs/METHOD_APPENDIX.md / docs/HISTORY.md
docs/archive/CANON.pre-reorg.md / docs/archive/HISTORY.snapshot.md
HANDOFF.md
```

---

## 3. 検証状態（直近 HISTORY 時点。再開時に再実行）

```bash
node --check app.js data/auditSchema.js data/cases/index.js ui/renderers.js
node verify.js                      # 直近: 全8ケース validateCaseReferences 0 / lintCaseMethodology 0
node tools/check-cache-busting.mjs  # ⚠️ ドリフト疑い。要確認
```

ブラウザ smoke: 8ケース選択可・全6ビュー描画・対照ボタン双方向・console エラー0 を確認線とする。

---

## 4. 次にやること（優先順）

```text
1. git status / rg --files で clean・同期状態を確認し、§1 の未コミット差分（2-NEW-P / 2-NEW-Q）の扱いを決める。
2. cache-bust 文字列を5箇所で1本化し、check-cache-busting.mjs を通す。
3. timeFit 設計の確定: 後年資料を「間接」で代用している箇所が残る場合、
   lintCaseMethodology の validTimeFits に "事後" を追加するか、現行どおり間接＋availableAtDecisionTime:false で表すかを決める（CANON 監査3原則と整合させる）。
4. 連合側深掘りの残課題: CIA/DIA/CENTCOM 開戦前原見積もり本体（未特定・要精査）、
   サフワン・トランスクリプトの所蔵アーカイブID特定（狭い要精査）。
5. 凍結中項目（対比ビュー新設 / claim集計ビュー / 色覚対応）は独立セッションでのみ着手。
```

---

## 5. 禁止事項

```text
- app.js にケースデータを直書きしない。
- 後知恵（開戦後資料）を開戦前判断の直接証拠にしない。
- 証拠未収集を「形跡なし」に変換しない（不明 と 形跡なし を混同しない）。
- 重大懸念の定義（高×形跡なし限定＝校正α）と「評価形跡の有無1軸」（校正β）を崩さない。
- counterpartCaseId を片方向にしない。
- evidenceLinks の canSay / cannotSay を空欄にしない。
- CANON に新規仕様候補を直接追記しない（まず METHOD_APPENDIX）。
- 確定設計判断 A〜N（METHOD_APPENDIX §F）を蒸し返さない。
```

---

## 6. 現時点の方針確認

このプロジェクトの目的は勝敗判定ではなく、当時の意思決定プロセスとリスク評価の監査である。skeleton ケースは誠実に暫定（provisional）と明示し、証拠量に依存しない構造・コード・ラベリングの是正を先行する。
