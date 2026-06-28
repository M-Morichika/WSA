# HANDOFF.md — War Accountability Audit（圧縮版）

最終更新: 2026-06-28
役割: 再開に必要な **現在状態・検証状態・次作業だけ**。設計原則は `docs/CANON.md`、由来は `docs/HISTORY.md`、詳細仕様は `docs/METHOD_APPENDIX.md`。

> ⚠️ 再構成注記: 本 HANDOFF は、今回アップロードされた HANDOFF が別プロジェクト（ASAA）の旧版だったため、**WSA の CANON / HISTORY の現在状態記述から再構成** した。§1・§3 の「未コミット」「cache-bust」状態は、実リポジトリの `git status` と `rg --files` で必ず突き合わせること。

---

## 1. 現在の実装状態

- 8ケース登録済み（4戦争 × 両陣営）。`lintCaseMethodology` 全ケース0が基本維持線。
- 既定 activeCase は最後に着手した戦争に依存（直近 HISTORY では湾岸→ウクライナ系へ移動）。再開時 `data/cases/index.js` で確認する。
- **2026-06-28: リポジトリを `main` 単一ブランチに統一（master 削除）。ドキュメントは `b864148` で正本確定**（root CANON 圧縮版＋`docs/`＋`docs/archive/CANON.pre-reorg.md`）。`2-NEW-P`/`2-NEW-Q` の差分は取込済み（未コミット差分は解消）。
- **cache-bust 一本化済み**: 全15箇所が `?v=20260628-phasec`。`node tools/check-cache-busting.mjs` exit 0（13 imports）。旧 `20260627-*` 文字列の残骸なし。
- **§4-3 timeFit 確定（判断 O / METHOD_APPENDIX §F）**: `timeFit={直接,間接}` 維持、「事後」は追加しない。後年資料は `間接＋availableAtDecisionTime:false`。

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
[済] 1. clean・同期確認。main 統一・2-NEW-P/Q 取込済み（2026-06-28）。
[済] 2. cache-bust 一本化（20260628-phasec）。check-cache-busting.mjs exit 0。
[済] 3. timeFit 確定＝現行維持（判断 O）。
4. 連合側深掘りの残課題: CIA/DIA/CENTCOM 開戦前原見積もり本体（未特定・要精査／R-3）、
   サフワン・トランスクリプトの所蔵アーカイブID特定（§F-L の R-2 残課題・要精査）。
   └ R-2 調査済(2026-06-28): 出所連鎖は固定（原典=ペンタゴン機密解除の1991/3/3会談記録、初出公開=Mylroie WaPo 1992/6/28）。
     DoD/NARA 文書番号は開放系二次資料では未特定のまま。次の特定先=①Bourque『Jayhawk!』(CMH 2002)/『The Road to Safwan』(UNT) 脚注、
     ②Khaled bin Sultan『Desert Warrior』(1995) 付録、③Gordon & Trainor 注。詳細は METHOD_APPENDIX §F-L の R-2 調査メモ。
   └ R-3 調査済(2026-06-28): 所蔵先を絞込み。①NSArchive EBB39（Doc5 G-2第3軍 1991/4、Doc6 CENTCOM Exec Summary 1991/7、Doc16 DIA Chronology 1997）、
     ②CIA CREST 未確認候補「Iraq's Military Capabilities」(RDP08R00805R000100420003-5)・SNIE 37-89(RDP94T00885R000100230024-8)＝主題日付未確認(Reading Room 403)、
     ③レビュー=DTIC ADA338886/GAO NSIAD-97-134/CSIS Cordesman 第5章。注意:「54万」は連合軍兵力でイラク軍見積もりではない。詳細は §F-L R-3 調査メモ。
5. 凍結中項目（対比ビュー新設 / claim集計ビュー M-1 / 色覚対応 / I-6 nextEvidenceActionType）は独立セッションでのみ着手。
※ §2 が参照する docs/archive/HISTORY.snapshot.md は未作成（HISTORY 退避は未了の小宿題）。
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
