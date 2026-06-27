# HANDOFF.md — 現在状態と次手順

最終再編成: 2026-06-27  
最終更新: 2026-06-27（Phase B 実施・push 済み: rating 透明化ノックアウト基準を湾岸2ケースに試験導入。CANON/HISTORY を追跡化。worktree 片付け）  
由来: `HANDOFF(3).md` から、次セッションで必要な現在状態と次手順だけを抽出・整理。

> ⚠️ ブランチ topology（最重要・嵌まりやすい）
> - プロジェクト本体は **`master` / `origin/master`**（このメインチェックアウト `C:\Users\Masayuki\Documents\war_sustainability_audit`）。現在の tip は **`6b7115e`（origin/master と同期済み）**。
> - `main`（`023e43c Initial commit`）は **LICENSE だけの空コミット**。`claude/*` worktree は main 起点で作られ初期状態は空 → 新 worktree では最初に `git reset --hard master` で揃える。
> - `CANON.md` / `HISTORY.md` は **`6b7115e` で git 追跡対象に変更済み**（以前の untracked 運用は終了）。新 worktree では `git reset --hard master` すれば揃う（手動コピー不要）。
> - **作業場所の罠**: worktree がセットアップ済みでも、Read/Edit でメインチェックアウトの絶対パスを使うと編集がメイン側に入り、worktree の検証に出ない。作業中の Read/Edit は常に worktree パス（`...\.claude\worktrees\<name>\...`）を使うこと。食い違ったらメイン側を `git checkout -- <files>` で巻き戻し、worktree へ再適用。
> - 旧 worktree `claude/festive-poitras-5f9ac3`（Phase A/B セッション）は **片付け済み**。Phase B は master に cherry-pick（`fac05c7`）、France 精緻化は master 作業ツリー版を `6b7115e` で確定済み。

## 0. このファイルの目的

このファイルは、次の作業者が「今この瞬間に何を確認し、次に何をすればよいか」を把握するための引き継ぎである。

恒久原則は `CANON.md`、詳細履歴は `HISTORY.md` を参照する。

---

## 1. 最初にやること

1. `CANON.md` を読む。
2. `HISTORY.md` は必要な範囲だけ参照する。
3. リポジトリで `git status` を確認する。
4. cache-busting の実値を確認する。
5. `node --check` と既存検証を実行する。

原文には「push 済み」と「本セッション・未コミット」の記述が混在している。したがって、次回は記憶で判断せず、必ず `git status` と検証結果を正とする。

---

## 2. 現在の実装状態

実装済みケースは 8 ケース。

```text
フォークランド紛争
  - falklands-1982-argentina
  - falklands-1982-uk

湾岸戦争 1990-91
  - gulf-war-1990-iraq
  - gulf-war-1990-coalition

普仏戦争 1870-71
  - franco-prussian-war-1870-france
  - franco-prussian-war-1870-prussia

ウクライナ戦争 2022-
  - russo-ukrainian-war-2022-russia
  - russo-ukrainian-war-2022-ukraine
```

現在の基本構成:

```text
index.html
app.js
data/
  auditSchema.js
  cases/
    index.js
    falklands-1982.js
    falklands-1982-uk.js
    gulf-war-1990-iraq.js
    gulf-war-1990-coalition.js
    franco-prussian-war-1870-france.js
    franco-prussian-war-1870-prussia.js
    russo-ukrainian-war-2022-russia.js
    russo-ukrainian-war-2022-ukraine.js
ui/
  renderers.js
styles.css
```

旧 HANDOFF が「`app.js` の EL-002」などと書いていても、現在の監査データ本体は `data/cases/*.js` にある。

---

## 3. 直近で完了した内容（要約）

### 本セッション（2026-06-27 後半）: Phase B — rating 透明化 試験導入 ＋ master 確定

- **Phase B（rating 透明化）を湾岸2ケースに試験導入**。CANON 6B-1 に基づき `ratingRules.knockoutCriteria` を追加（rating は編集判断のまま、自動算出には使わない上限制約の説明）。
  - イラク側（D+/D）: 外部介入見積もりの重大懸念で上限 D+、期限後の継戦・再評価不全で上限 D。`applies:true` で**発火**し実 cap。
  - 連合側（B+/B）: 長期封じ込めコスト確定で上限 C+、政権存続＋人道危機 複合確定で上限 B-。`applies:false` で**未発火**＝条件付き上限のみ提示。
  - `applies` フィールドで発火/未発火を明示し、**低評価=発火 / 高評価=未発火**の対照を可視化。renderers が「該当（発火）/非該当（未発火）」を Audit Opinion に表示。
  - `auditSchema.js`: `knockoutCriteria[].cellIds` の参照整合検査を追加（`missing_knockout_cell`）。
  - CANON 6B-1 に `cellIds`/`applies` を正典化。
- cache-busting を **`20260627-phaseb-coalition`** に同期（5箇所＋CANON §K）。
- **master 確定とpush**: Phase B を master に cherry-pick（`fac05c7`）。CANON.md/HISTORY.md を追跡化し France/Ukraine 精緻化を確定（`6b7115e`）。`origin/master` に push 済み（同期）。
- 検証: `node --check` 全OK / `verify.js` 全8ケース 0件 ALL CHECKS PASSED。
- **未着手（次の候補）**: Phase B のウクライナ等への横展開 / P3（Ukraine 10件の標準形統一）/ 「未収集なのに形跡なし」検出 lint / Phase C（依存関係）。

### 前半セッション（2026-06-27）: Phase A P1 — 仏France Pre-War 是正

- Pre-War 全43項目を棚卸しスクリプトで集計し、`不明` と `形跡なし` の使い分けに3流儀の混在を確認。
  - 流儀A（Ukraine 両側）: `不明` + `nextEvidenceActionType:"collect_primary_source"`（正）
  - 流儀B（Gulf イラク2件）: `形跡なし` + `noEvidenceReason:"該当証拠なし"` + 調査範囲明記（正）
  - 流儀C（**France 2件**）: `形跡なし` だが evidenceBasis に「未収集ゆえ断定できない」と自己矛盾（**違反**）
- 修正: `fpw_pw_french_mobilization` / `fpw_pw_system_gap` を `形跡なし`→`不明`、`noEvidenceReason:null`→`"証拠未収集"` に是正。
  - 前者の **偽の `重大懸念`（高×形跡なし）を解消** → 両者とも `要検証(derived)`。
- 結果: `形跡なし` 全体が 4件→2件（残2は流儀Bの適正）。
- 検証: `node --check` OK / `verify.js` 全0件 ALL CHECKS PASSED。
- この是正は当初 worktree の `61d0d13`（狭い6行版）だったが、master 作業ツリーにより広い版（動員セル格下げ・evidence type 精緻化を含む）があり、**後者を `6b7115e` で master に確定**。`61d0d13` は master には乗せていない。

### 仏 France ケース

- `FPW-E-006` / `FPW-E-007` / `FPW-E-008` の source を公刊一次資料へ精密化。
- `FPW-E-003` / `004a` / `004b` / `005` の type を細分化。
- `fpw_cell_diplomacy_crisis` / `fpw_cell_regime_crisis` / `fpw_cell_sedan_decision` の evidenceStrength を `中〜強` へ格上げ。
- rating を `D+/D` から `未確定` へ復旧。
- 検証: `node verify.js` 全8ケース 0 エラー確認済み、との記録あり。

### ウクライナ Ukraine 側

- M-1〜M-5/M-7 を反映。
- ex-post リンクを Pre-War 評価形跡の直接根拠から外した。
- `ratingBasisExclusions` を追加。
- relationship badge と time badge を分離。
- 西側支援セルで直接根拠と後知恵対照を分けた。
- ロシア側 Pre-War にも `nextEvidenceActionType: "collect_primary_source"` を付与。
- 検証: `node --check`、`node verify.js`、render smoke 全8ケース全ビュー OK、との記録あり。

### lintCaseMethodology 強化

- 全 relationship の claim/cell 紐付け漏れを検査。
- `unlinked_claim` / `one_sided_claim` / `unsupported_claim` を分離。
- `knownByDecisionMakers` / `knownByDecisionMakersBasis` を必須化。

### ウクライナ Russia 側

- Pre-War 5項目を `不明` に戻し、内部資料未公開との整合性を回復。
- evidence type を細分化。
- 長期戦化入口セルを初期判断 ratingBasis から除外。
- 公開放送に対する外部解釈依存リンクは `knownByDecisionMakers: 不明` へ弱めた。

### 普 Prussia ケース

- 過剰確定ラベルを弱め、rating を B/B- に抑制。
- collectionState / reviewState を `要検証` へ戻した。
- evidence type を細分化。
- 秘密条約・参謀本部展開計画依存リンクは `availableToAnalysts:false` に修正。

---

## 4. 現在の注意点

- cache-busting の実値は **`20260627-phaseb-coalition`**（index.html / app.js / data/cases/index.js / ui/renderers.js / verify.js の5箇所で一致。CANON §K も同値に更新済み。2026-06-27）。
- 原文には複数時点の cache-bust 文字列が残っている。次回も実ファイルの import を直接確認すること。
- `verify.js` がある前提の記述があるが、実在を確認してから使うこと。
- `preview_screenshot` はタイムアウトしがちなので、`preview_eval` または Node import 検証を優先する。
- ブラウザ実機確認は環境制約で未実施の箇所がある。
- skeleton ケースでは、証拠未収集を確定評価に変換しない。

---

## 5. 次の推奨手順

1. `git status` で clean / 未コミット差分 / ブランチ / origin 同期状態を確認する。
2. 実ファイル上の cache-busting を確認する。
3. 構文チェックを実行する。
4. `validateCaseRegistry` / `validateCaseReferences` / `lintCaseMethodology` を全ケースで確認する。
5. 未コミット差分がある場合は、差分内容を分類する。
6. 次の作業単位をひとつ選ぶ。

候補（本セッションの続き優先）:

- **Phase B 横展開**: ウクライナ両側・普仏両側などに `ratingRules.knockoutCriteria` を展開。湾岸2ケース（イラク=発火 / 連合=未発火）が雛形。`applies` で発火/未発火を明示する流儀を踏襲。
- **P3**: Ukraine 両側10件の `不明` 項目に `noEvidenceReason:"証拠未収集"` を付与し CANON §6 標準形へ統一。
- **lint 追加**: 「`形跡なし` なのに証拠探索状態が不十分」を検出する検査を `auditSchema.js` に追加（Gulf イラク2件のような `noEvidenceReason:"該当証拠なし"`＋調査範囲明記は許容、France 旧状態のような未収集の `形跡なし` を弾く）。再発防止。
- **Phase C**: 依存関係（`dependencyRules`）のデータのみ試験導入。

その他候補:

- 仏 France ケースの `collectionState` 精密化。
- 仏 France ケース phase2 / phase4 のセル化。
- 連合側ケースの深掘り精査の残り。
- I-9 対比ビュー新設。
- UI-8 色覚多様性対応。
- `nextEvidenceActionType` の撤去 / 必須化の方針決定。

---


## 5A. 次のブラッシュアップ導入計画

以下の3段階を、今後のブラッシュアップとして導入する。詳細な正典は `CANON.md` の `6A`〜`6C` を参照する。

### Phase A: 「形跡」判定基準のプロトタイプ化

目的: `actuallyEvaluated` の運用を、ケースごとの印象評価から条件分岐へ寄せる。

作業:

1. `CANON.md` の「形跡」段階定義に沿って、既存ケースの Pre-War Checklist を棚卸しする。
2. `不明` と `形跡なし` が混在していないか確認する。
3. `actuallyEvaluated: "形跡なし"` がある項目について、証拠探索状態が十分か確認する。
4. `evidenceSearchState` を任意フィールドとして導入するか、既存 `noEvidenceReason` / `collectionState` で代替するかを判断する。
5. `auditSchema.js` に enum ガードを追加する場合は、既存ケースを壊さない互換層を先に設ける。

受入条件:

```text
- skeleton ケースの証拠未収集項目が「形跡なし」になっていない。
- 「形跡なし」とする項目には、調査範囲または主要資料確認済みの説明がある。
- `lintCaseMethodology` または別 lint で、未収集の `形跡なし` を検知できる見通しが立つ。
```

### Phase B: rating のノックアウト基準・重み付けの明示

目的: 「なぜ B- なのか」を、`ratingBasis` と除外理由だけでなく、上限制約として説明できるようにする。

作業:

1. 自動算出はまだ導入しない。
2. まず `ratingRules.knockoutCriteria` を任意フィールドとして1ケースに試験導入する。
3. `ratingBasisExclusions` と `ratingNote` の表示が十分か確認する。
4. ノックアウト基準は、平均点では相殺できない欠落だけに限定する。
5. 加重平均は参考値に留め、rating の決定主体を隠さない。

試験導入候補:

```text
- ウクライナ戦争 ロシア側:
  敵抵抗意思 / 西側支援 / 兵站・指揮統制 / 短期決着仮説

- 湾岸戦争 イラク側:
  米国介入意図 / 連合形成 / 自軍継戦能力 / 経済制裁耐性
```

受入条件:

```text
- rating は従来どおり `warCase.rating` の編集判断として残る。
- knockoutCriteria は rating cap の説明に留まり、自動評価に見せない。
- ratingBasis に算入しないセルの理由が Opinion に出る。
```

### Phase C: 依存関係マトリクス / フローチャート

目的: 独立項目の羅列ではなく、複合リスクの連動性を表現する。

作業:

1. UI 変更は後回しにする。
2. まず `dependencyRules` を任意フィールドとしてケースデータへ追加する。
3. Audit Opinion に「この評価は以下の項目の組み合わせに依存する」と文章で出せるか確認する。
4. 2軸マトリクスやフローチャートは、データ表現が安定してから検討する。

試験導入候補:

```text
湾岸戦争 イラク側:
  米国抑止シグナル × グラスピー会談解釈 × アラブ諸国反応

ウクライナ戦争 ロシア側:
  ウクライナ抵抗意思 × 西側支援見積もり × 自軍短期決着能力

普仏戦争 フランス側:
  プロイセン動員能力 × 南ドイツ諸邦参戦 × フランス国内政治危機
```

受入条件:

```text
- 依存関係は既存 assessmentCells を壊さない補助情報として扱う。
- 未定義 UI が崩れない。
- 依存関係を理由に、証拠未収集セルを確定評価しない。
```

優先順位:

```text
1. Phase A: 形跡定義
2. Phase B: rating 透明化
3. Phase C: 依存関係
```

---

## 6. 検証手順

- **プレビュー**: `.claude/launch.json` に static サーバー定義。preview MCP の `preview_start` に `name: "static"`。serverId はセッションごとに変わる。
- **構文チェック**: `node --check <各 .js>`（app.js / data/auditSchema.js / data/cases/*.js / ui/renderers.js の6本）。
- **検証方法**: preview の `preview_eval` で動的 import（`await import('./data/cases/index.js')` など）して `validateCaseReferences` やレンダラ結果を直接確認するのが確実。
  - ケース切替テスト: `#case-selector` に value 設定→`change` イベント dispatch。
  - ⚠️ `preview_screenshot` はこの環境で**タイムアウトしがち** → `preview_eval` で構造取得が確実。
  - reload 後の "Inspected target navigated" は正常（次の eval で再取得）。
### 3例目受入チェックリスト
- `data/cases/index.js` に新ケースを import し、`cases` 配列へ追加している。
- `warCase.id` とケース内の `id` 群（phase / assumption / assessmentCell / evidence / claim / evidenceLink / preWar）は重複していない。
- `node --check` を app / schema / 全 case / renderer に対して通す。
- `validateCaseRegistry(cases)` が0件、`validateCaseReferences(caseData)` が全ケース0件。
- `lintCaseMethodology(caseData)` が全ケース0件、または残す警告の理由を `HANDOFF.md` に明記。
- ブラウザで全ビュー（Overview / Timeline / Pre-War / Assessment / Evidence / Audit Opinion）を開く。
- Evidence で各フィルタ（証拠種類 / 真正性 / 関連度 / 支持・反証・保留）を最低1回ずつ試す。
- Evidence で0件フィルタ状態とフィルター解除を確認する。
- 未接続セル一覧がある場合、Assessment への遷移が壊れていないことを確認する。
- 主要リンクの `canSay` / `cannotSay` が空でなく、判断時点より後の結果を直接証拠として扱っていないことを確認する。
- ケース切替後も現在ビューが維持され、見出し・監査対象・格付けが切り替わることを確認する。
- 必要に応じてモバイル幅でも表・長いケース名・Evidence詳細が読めることを確認する。

---

---

## 7. 作業スタイル

- 日本語で応答。
- **「サブエージェントレビュー」** = UIデザイナー / シニアエンジニア / 監査方法論レビュアー（＋メタ視点）の人格をコンテキストなしで立て、粗探し → 優先度表で統合 → 推奨を述べる。確立済みパターン。
- 進め方: 設計を詰める→サブエージェントレビュー→指摘を記号で選択適用（「1+2」「A-1, S-2」のように指示）→プレビュー検証→再レビュー、のループ。
- 過剰設計には**メタ視点で逓減を指摘し凍結を提案**するのが歓迎される。
- 修正後は必ず `node --check` ＋ `preview_eval` で検証してから報告。
- コミットは**ユーザーが明示したときのみ**。`git add -A` は codex キャッシュ等の巻き込みに注意（.gitignore 済みだが対象明示が安全）。コミット末尾に Co-Authored-By。
- **コンテキストの定期リセット**: セッションが長くなり性能が落ち始める前（目安: 進捗30〜40%程度）に、ここまでの状態を `HANDOFF.md` に要約してから、ユーザーにセッションリセット（`/clear` 等）を提案する。

---
