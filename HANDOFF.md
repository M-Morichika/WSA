# 引き継ぎ文（セッション状態サマリ）

最終更新: 2026-06-25（湾岸ケースのサブエージェントレビュー適用セッション：M-1 同時代反証追加・M-2/M-3 注記・S-2 整形）

## 0. このファイルの目的
セッションが長くなったため状態を要約。次セッションは**まずこれを読んでから**再開すること。

---

## 1. プロジェクト概要
- **「継戦能力版ソブリン格付け」** = 「戦争責任監査（War Accountability Audit）」のWebアプリ。vanilla JS（ES Modules）。趣味プロジェクト。
- **監査原則（最重要・全設計の前提）**:
  1. 反証証拠を隠さない
  2. 言えること(canSay)/言えないこと(cannotSay)を分ける
  3. **開戦後の証拠を直接証拠にしない**（＝時点性 ex-ante / ex-post）
- 方法論的には ACH（競合仮説分析）/ 構造化分析技法に相当。価値は「題材」より**転用可能な監査の作法**にある。
- **方向性**: 単一ケース（フォークランド）から**複数ケース・フレームワーク**へ移行中。3例目として湾岸戦争1990–91（イラク側監査）の初期ケースを追加済み。現在は、フォークランド2ケース＋湾岸戦争1ケースで、枠の汎用性を検証中。

### 構成ファイル（今セッションでモジュール分割）
- `index.html` — サイドバー（**ケースセレクタ**＋ビュー切替タブ: Overview / Timeline / Pre-War / Assessment / Evidence / Audit Opinion）
- `app.js` — **モジュールエントリ**（146行）。ケース読込・state 管理・イベント・ケース切替（`setActiveCase`）。
- `data/auditSchema.js` — 共通ロジック。status 導出（`resolveStatus`/`deriveStatus`/`STATUS_MATRIX`）、フィルタ（`getEvidenceFilterOptions` で証拠フィルタ選択肢を**データから動的生成**）、参照整合性（`validateCaseReferences`）。
- `data/cases/index.js` — ケースレジストリ（`cases` 配列）。
- `data/cases/falklands-1982.js` — **アルゼンチン側監査**（id: `falklands-1982-argentina`, 格付 C-/D+, phase3/cell12/evidence6/link7/prewar7）。旧モノリスの `auditData` の移設先。
- `data/cases/falklands-1982-uk.js` — **英国側監査**（id: `falklands-1982-uk`, 格付 B-/C+, phase4/cell5/evidence6/link11/prewar3）。
- `data/cases/gulf-war-1990-iraq.js` — **湾岸戦争1990-91 イラク側監査**（id: `gulf-war-1990-iraq`, 格付 D+/D, phase3/cell5/evidence7/link13/prewar5）。現行既定 activeCase。
- `ui/renderers.js` — 全ビューのレンダラ（ケース非依存。`createRenderers(caseData, state)`）。
- `styles.css` — `.case-picker` 等を追加。
- `.claude/launch.json` — プレビュー静的サーバー（`python -m http.server 8123`）。

> ⚠️ ファイル位置の注意: 旧 HANDOFF が「[app.js] EL-002」等と書いていた監査データは、**現在は `data/cases/*.js` 内**にある。

---

## 2. 直近セッションで完了したこと

### 2-0. A-1＋S-1＋S-2 の適用（※今セッションの主成果。コミット予定）
- **A-1（原則回復）**: UK ケースに反証を追加。第一原則「反証を隠さない」が UK データで破れていた状態を是正。
  - `UK-E-006`（ARA ヘネラル・ベルグラノ撃沈＋交戦規則変更、1982/5/2）を新規追加。
  - `UK-EL-008` = `uk_claim_limited_war` / `uk_cell_escalation_ops` への**反証**。フレーミングは「単一反証・針路含む（保守的）」を選択（canSay＝排他水域外・ROE変更・約323名死亡・攻撃時の離脱針路の事実／cannotSay＝「一事で作戦全体の逸脱とは結論できない」）。撃沈は英戦時内閣が ROE 変更で承認した自国行動のため ex-post の結果ではなく当該フェーズの監査対象として `timeFit:直接`／`knownByDecisionMakers:明白` で扱った。
- **S-1（検査のコード化）**: `data/auditSchema.js`。
  - `validateCaseReferences` 拡張：`evidenceLinks[].claimId`→claims、`ratingBasis[].cellId`→cells を追加検査（`missing_claim`/`missing_rating_cell`）。
  - **`lintCaseMethodology(caseData)` 新設**＝「反証を隠さない」をコード化。`no_counter_evidence`（ケース反証ゼロ＝重大）／`one_sided_counter_claim`（支持ありで反証ゼロの counter_claim）。`app.js` 起動時に `console.warn`。
  - **`hypothesisTracking` は検査対象外と判断**：`checkpoints[].phase` は phase.name への参照ではなく自由記述のチェックポイント名で ID 参照を持たないため（誤検知回避。コメントで明記済み）。
- **S-2（スキーマ統一）**: ア軍 `ratingBasis` を `cell`（表示文字列）→`cellId`（参照）へ正規化。UK と一致。旧「結果との乖離」（軸集約・weight 0.5）は代表セル `cell_outcome_opening` に寄せた（weight は表示専用＝格付けは `warCase.rating` ハードコードで不変）。レンダラ `ui/renderers.js` の死にコード化した `item.cell` フォールバックを撤去。
- 検証: `node --check` 全6 OK／両ケース `validateCaseReferences` 参照整合0件／UK 反証リンク1（UK-EL-008）で `no_counter_evidence` 解消／実UI で Evidence・Assessment・Audit Opinion 描画・コンソールエラー0。
- **更新**: U-2 適用により、現時点の `lintCaseMethodology` は両ケースとも 0 件。

### 2-A. モジュール化＋複数ケース化＋英国側ケース追加（`3ece311`）※前セッションの主成果
- `app.js`（1479行モノリス）→ スキーマ / ケースデータ / レンダラの3層に分離。
- **複数ケース・エンジン＋ケースセレクタ**（サイドバー）。`setActiveCase` で切替、`stateForCase` で state 初期化。
- **2例目「フォークランド英国側」追加**（監査対象＝英国サッチャー政権・戦時内閣）。抑止失敗・危機対応・奪還・停戦の4フェーズ。勝者/抑止失敗側の監査でも枠が成立することを実証。
- **フィルタ語彙の動的生成**（`getEvidenceFilterOptions`）＝旧レビューで指摘したフィルタのハードコード結合を**データ駆動で解消**。
- **参照整合性チェッカ**（`validateCaseReferences`）＝起動時に dangling 参照を `console.warn`。両ケースとも **0件**。
- 検証: `node --check` 全6モジュール OK／2ケース描画・参照整合性0件／ケース切替で見出し・格付け更新／コンソールエラーなし。

### 2-B. 直前の小成果（push 済み）
- `cfb464f` 旧レビューの A-1（反証 EL-002 を中心セルに可視化）＋ U-1（Timeline フェーズ選択）。
- `7303266` codex/OpenAI ドキュメントキャッシュを `.gitignore` 追加＋追跡解除。
- `4b6888e` Invincible 証拠（E-006）の framing 微修正。

> 過去の経緯（旧モノリス時代: E-4 dt/dd 是正、U-4/E-3、出典レジストリ整合 #1〜#5、claims.status 削除 等）はコミット履歴 `6a5bc5b`〜`ffc4e0b` 参照。要点は §3 に確定判断として残してある。

---

## 3. 確定した設計判断（蒸し返さない）
- **A**: regime_survival（ア軍ケース）の override は provisional。現状の重大懸念ゼロは正しい。
- **B**: status はデータ非保存・実行時導出（`resolveStatus` が単一情報源）。claims.status は削除済み。
- **C**: Pre-War マトリクスは derived のみで配置・着色、override は注釈バッジで別レイヤー。
- **校正α**: 重大懸念は「評価可能性 高 × 形跡なし」のみに限定。現状維持。
- **校正β**: 「評価したが妥当でなかった」軸は追加しない。1軸（評価形跡の有無）に意図的に留める。
- **ア軍 EL-003 = (a)**: `claim_uk_limited` への `支持`（claim 付け替えはしない）。
- **#2 = A＋B**: 同時代史料追加＋opinion 酌量併記。criteria への E-005 投入は方向逆のため不採用。
- **D（S-1）**: 「反証を隠さない」はコード化された検査（`lintCaseMethodology`）として常設。`one_sided_counter_claim` は noise でなく方法論TODOとして残す（消さない）。`hypothesisTracking` は ID 参照を持たないため参照整合の対象外。
- **E（S-2）**: `ratingBasis` は全ケース `cellId` 参照に統一。weight は表示専用（格付けは `warCase.rating` ハードコード）。「結果との乖離」軸集約は代表セル `cell_outcome_opening` で表現。
- **A-1 フレーミング**: ベルグラノ反証は「単一反証・針路含む（保守的）」を採用。針路の事実は canSay、戦術的含意の留保は cannotSay。
- **F（A-2）**: UK が重大懸念に達しないのは入力構造でなく「評価され覆された」(校正β対象外)ゆえの判断。校正α/β は不変のまま、評価可能性を honest な値（deterrence_signal=高）に補正して確認した。B-/C+ 据え置き。
- **G（A-3）**: `availableAtDecisionTime`（意思決定者の入手可能性）と `availableToAnalysts`（外部分析者の入手可能性）は別概念として維持する。機密解除文書は前者 true／後者 false がありうる。`knownByDecisionMakers` は中枢の認識を表す第3の軸。

---

## 4. 未適用のレビュー指摘（今セッションの複数ケース・レビュー）※記号は本レビュー内のもの
> ⚠️ 旧モノリス時代のレビュー記号（A-1/U-1 等）とは**別物**。下記は複数ケース化後のレビュー結果。

**✅ 完了（今セッション・§2-0 参照）: A-1 / S-1 / S-2**
- A-1: UK に反証 `UK-EL-008`（ベルグラノ）追加で原則回復。
- S-1: `validateCaseReferences` 拡張＋`lintCaseMethodology` 新設でコード化。
- S-2: ア軍 `ratingBasis` を `cellId` 正規化＋レンダラ死にコード撤去。

**✅ 完了（今セッション後半）: A-2 / A-3**
- A-2: UK prewar を再検証。`uk_pw_deterrence_signal` を `中`→`高`（英国自身が統制するシグナルゆえ ex-ante 高評価可能、Endurance 撤収には FCO 等が事前懸念）。結果 高×限定的＝要注意で重大懸念には達しないが、これは「評価され覆された」(校正β対象外)ゆえの判断＝all-中 の artifact ではないと確認。マトリクス上は 高×形跡なし→重大懸念 が到達可能に。B-/C+ 据え置き。
- A-3: `UK-EL-005` を `availableAtDecisionTime:true`／`knownByDecisionMakers:明白` に修正（米国仲介は英戦時内閣が交渉当事者として既知）。`availableToAnalysts:false` は維持（機密解除文書は後年公開＝外部分析者には事後的。意思決定者の認識と分析者の入手可能性を分離）。

### 2-1. サブエージェントレビュー（A-1〜A-3 後）＋ R-1/R-2/R-3 適用
- **R-1（時点性の自己整合）**: A-1 で入れた `UK-E-006` の `source` が Freedman 2005 主導なのに UK-EL-008 が `直接/true` で、A-3 で正した「文書入手可能性≠中枢認識」原則に自己違反していた。→ source を**同時代記録（5/2 国防省発表・ROE変更）主導**に再フレーム（Freedman は二次併用）。第3原則=時点性の規律を回復。
- **R-2（lint 可読化）**: 起動時 warn の `[object Object]` を `type(id)` の要約文字列＋生配列（devtools 用）に。
- **R-3（=S-3 解決）**: `issues[].evidence/open`（実 link 数と無連動の飾り数字。A-1 でズレ拡大）を**撤去**。issues→links の ID 連結が無く正確な実数連動は不能なため、名称＋status のみに。両レンダラ（Overview/Opinion）と両ケース data を修正。
- 検証: `node --check` OK／UK-EL-008 出典が同時代主導＝判断時点利用可能と自己整合／Overview から飾り数字消滅／warn 可読化／エラー0。

### 2-2. R-4 / R-6 適用
- **R-4（方法論リント対称化）**: `lintCaseMethodology` の一方的検査を全 claim へ拡張。旧 `one_sided_counter_claim`（counter_claim のみ）→ `one_sided_claim`（finding に `claimType` 付与）。原則「反証を隠さない」は claim 種別に依らず対称ゆえ、audit_issue（witch-hunt リスク）も検査。結果: ア軍 `claim_uk_response:audit_issue`／UK `uk_claim_deterrence_signal:audit_issue` が新規検出（従来の counter_claim 2件＋）。R-2 warn にも claimType 併記。
- **R-6（narrative 反映）**: `uk_cell_deterrence_prewar.opinion` に A-2 の知見（シグナルは英国統制下ゆえ評価可能性「高」だが評価形跡は限定的＝要注意止まり）を追記。
- 検証: `node --check` OK／lint が両ケースで audit_issue＋counter_claim を対称検出／warn 可読／エラー0。

### 2-3. 軽い掃除: R-5 / S-4 / U-1 適用
- **R-5（非対称の明記）**: UK `preWarChecklist` はア軍ケースより少ないが、勝者側全責任ではなく「抑止失敗・危機対応」に絞る監査として意図的に非対称と明記。項目数合わせの過剰拡張は凍結。
- **S-4（整形）**: UK `preWarChecklist` 末尾の余分な空行を削除。
- **U-1（ケース切替時の view 維持）**: `stateForCase(caseData, activeView)` に変更し、ケース切替後も現在の view を維持。

### 2-4. U-2 適用: one_sided_claim 解消
- ア軍 `claim_uk_response` に `EL-008`（E-005を反証として接続）を追加。
- UK `uk_claim_deterrence_signal` に `UK-EL-009`（UK-E-002を反証として接続）を追加。
- UK `uk_claim_taskforce_reasonable` に `UK-EL-010`（UK-E-005を反証として接続）を追加。
- UK `uk_claim_termination_limited` に `UK-EL-011`（UK-E-006を反証として接続）を追加。
- 検証: `validateCaseReferences` は両ケース0件、`lintCaseMethodology` も両ケース0件。

### 2-5. 3例目「湾岸戦争1990-91（イラク側）」着手
- `data/cases/gulf-war-1990-iraq.js` を新規追加し、`data/cases/index.js` の `cases` に登録。既定 activeCase も `gulf-war-1990-iraq` に変更。
- 監査対象: イラク・サダム政権。範囲: クウェート侵攻判断・撤退拒否・停戦受容。暫定格付け: `D+/D`。
- 3フェーズ: 侵攻判断 / 撤退拒否・期限前判断 / 戦闘・停戦受容。
- 主要な ex-ante 論点: 米国の直接軍事介入意思、国連安保理の制裁・武力行使容認、制裁下の経済・体制耐性、アラブ諸国を含む連合形成、クウェート占領維持コスト。
- 方法論メモ: グラスピー会談は米国シグナル曖昧性の同時代材料として扱うが、米国の侵攻容認とは言わない。決議660は侵攻後資料なので侵攻判断への直接証拠にせず、限定反応期待が早期に弱体化した間接材料として扱う。決議661/678と Desert Shield は撤退拒否・期限前判断では同時代直接資料として扱う。
- 反証原則対応: 全 claim に支持/反証の両方向リンクを最低1件ずつ接続し、`lintCaseMethodology` 0件にした。
- 検証: `node --check` 全7 JS OK／`validateCaseRegistry(cases)` 0件／全3ケース `validateCaseReferences` 0件／全3ケース `lintCaseMethodology` 0件／ブラウザで湾岸ケースの全6ビュー描画・コンソールエラー0。

### 2-6. 湾岸ケースのサブエージェントレビュー適用（M-1/M-2/M-3/S-2）
> ⚠️ ここの記号 M-1/M-2/M-3 は**湾岸レビュー内のもの**で、§4 凍結中の M-1/M-2（claim集計ビュー・横断リンク）とは別物。
- **M-1（最重要・同時代反証の補強）**: audit_issue の反証が事後二次研究 `GW-E-006`（間接）に片側依存していた非対称を是正。新証拠 `GW-E-007`（ソ連プリマコフ仲介1990/10・仏停戦提案1991/1・米上院武力行使容認の僅差可決 52対47 1991/1/12・西側反戦世論）を追加し、`GW-EL-012`（→`gw_claim_deadline_reassessment`）/`GW-EL-013`（→`gw_claim_sanctions_endurance`）を **`timeFit:直接`／`availableAtDecisionTime:true`／`knownByDecisionMakers:明白`** の反証として接続。事後反証（`GW-EL-007`/`GW-EL-011`）は補助的 間接反証として残置。両セル（`reassessment_deadline`/`sustainment_deadline`）の opinion に同時代反証を追記（結論は重大懸念のまま、`cannotSay` で合理性非立証を保持）。結果、audit_issue 3 claim すべてが同時代直接反証を保有（external=EL-003／sanctions=EL-013／reassessment=EL-012）。
- **M-2（評価可能性の明示）**: `gw_cell_decision_process_opening`（証拠リンク0・重大懸念）の opinion に「重大な開戦判断なら審議記録が本来残るはず＝評価可能性が高い」根拠を加筆。校正α の足場（高×形跡なし→重大懸念）を文章化し、現状の「形跡なし」が資料未収集段階である点も明記。
- **M-3（両建ての自己注記）**: グラスピー会談 `GW-E-001` を `GW-EL-001`（支持）と `GW-EL-003`（反証）に両建てしている件を、`GW-EL-003.cannotSay` に「同一事実由来＝独立2件として数えない」と自己注記。
- **S-2（整形）**: evidenceLinks 末尾 `},  ],` を整形解消。
- **S-1 はクリア（非欠陥）と確定**: `resolveStatus`/`STATUS_MATRIX` が読むのは `preWarChecklist` の `exAnteEvaluability`/`actuallyEvaluated` のみ。`assessmentCells[].status`/`phases[].status` の直書きはキュレートデータでレンダラが直接消費＝§3-B（status 単一情報源）のスコープ外。
- **検証**: `node --check` OK／`validateCaseRegistry` 0／全3ケース `validateCaseReferences` 0／全3ケース `lintCaseMethodology` 0。⚠️ ブラウザ実機確認はこのセッションのワークツリーが湾岸ケース未含有の旧状態を配信したため未実行（主リポジトリ側で静的サーバーを立てれば確認可能）。
- **未適用で残った湾岸レビュー指摘**: **U-1**（重大懸念×証拠0セルの「未接続」表示の実機確認）、**U-2**（反対仮説3件中1件のみ追跡）、**S-3**（issues に重大懸念セル `意思決定プロセス` 未掲載）。U-2/S-3 は凍結寄り・任意。

**残りの未適用（優先度順）:**
- 現時点で軽掃除・方法論lint由来の未適用項目はなし。

**凍結中（過剰設計リスク。やるなら独立セッション）:**
- **M-1**: claim 単位の支持/反証集計ビュー。`claims[]` は現状どの renderer も非参照（死蔵）。活用 or 削除の去就決定が要る。
- **M-2**: claim 間（`claim_uk_limited`⇄`claim_uk_response`）の横断リンク。

---

## 5. 動かし方 / 検証
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

## 6. 作業スタイル（ユーザーの好み）
- 日本語で応答。
- **「サブエージェントレビュー」** = UIデザイナー / シニアエンジニア / 監査方法論レビュアー（＋メタ視点）の人格をコンテキストなしで立て、粗探し → 優先度表で統合 → 推奨を述べる。確立済みパターン。
- 進め方: 設計を詰める→サブエージェントレビュー→指摘を記号で選択適用（「1+2」「A-1, S-2」のように指示）→プレビュー検証→再レビュー、のループ。
- 過剰設計には**メタ視点で逓減を指摘し凍結を提案**するのが歓迎される。
- 修正後は必ず `node --check` ＋ `preview_eval` で検証してから報告。
- コミットは**ユーザーが明示したときのみ**。`git add -A` は codex キャッシュ等の巻き込みに注意（.gitignore 済みだが対象明示が安全）。コミット末尾に Co-Authored-By。

---

## 7. 次セッションの推奨アクション
1. まず本ファイルを読む。
2. 未コミット差分を確認し、必要ならコミットする。
3. 次の大きな作業候補は**湾岸戦争1990–91（イラク側）ケースの精査・増補**。初期ケースは追加済み。次は一次資料名の精密化（グラスピー会談、安保理決議、Desert Shield 展開資料）、preWarChecklist の妥当性レビュー、サブエージェントレビューで過剰断定や ex-post 混入を点検する。
4. いずれも §3 の蒸し返し禁止に抵触しないか確認してから進める。

