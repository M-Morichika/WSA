# 引き継ぎ文（セッション状態サマリ）

最終更新: 2026-06-25（A-1＋S-1＋S-2 適用セッション：反証追加・方法論リント・ratingBasis 正規化）

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
- **方向性**: 単一ケース（フォークランド）から**複数ケース・フレームワーク**へ移行中。次の題材候補は湾岸戦争1990–91（イラク侵攻判断の監査）だが**未着手**。今セッションでは先に「フォークランド英国側監査」を2例目として追加し、枠の汎用性を低コスト検証した。

### 構成ファイル（今セッションでモジュール分割）
- `index.html` — サイドバー（**ケースセレクタ**＋ビュー切替タブ: Overview / Timeline / Pre-War / Assessment / Evidence / Audit Opinion）
- `app.js` — **モジュールエントリ**（146行）。ケース読込・state 管理・イベント・ケース切替（`setActiveCase`）。
- `data/auditSchema.js` — 共通ロジック。status 導出（`resolveStatus`/`deriveStatus`/`STATUS_MATRIX`）、フィルタ（`getEvidenceFilterOptions` で証拠フィルタ選択肢を**データから動的生成**）、参照整合性（`validateCaseReferences`）。
- `data/cases/index.js` — ケースレジストリ（`cases` 配列）。
- `data/cases/falklands-1982.js` — **アルゼンチン側監査**（id: `falklands-1982-argentina`, 格付 C-/D+, phase3/cell12/evidence6/link7/prewar7）。旧モノリスの `auditData` の移設先。
- `data/cases/falklands-1982-uk.js` — **英国側監査**（id: `falklands-1982-uk`, 格付 B-/C+, phase4/cell5/evidence5/link7/prewar3）。新規。既定 activeCase。
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

---

## 6. 作業スタイル（ユーザーの好み）
- 日本語で応答。
- **「サブエージェントレビュー」** = UIデザイナー / シニアエンジニア / 監査方法論レビュアー（＋メタ視点）の人格をコンテキストなしで立て、粗探し → 優先度表で統合 → 推奨を述べる。確立済みパターン（現在はサブエージェント起動せず本体内で精読する形で運用）。
- 進め方: 設計を詰める→サブエージェントレビュー→指摘を記号で選択適用（「1+2」「A-1, S-2」のように指示）→プレビュー検証→再レビュー、のループ。
- 過剰設計には**メタ視点で逓減を指摘し凍結を提案**するのが歓迎される。
- 修正後は必ず `node --check` ＋ `preview_eval` で検証してから報告。
- コミットは**ユーザーが明示したときのみ**。`git add -A` は codex キャッシュ等の巻き込みに注意（.gitignore 済みだが対象明示が安全）。コミット末尾に Co-Authored-By。

---

## 7. 次セッションの推奨アクション
1. まず本ファイルを読む。
2. 未コミット差分を確認し、必要ならコミットする。
3. 次の大きな作業候補は**湾岸戦争1990–91（イラク侵攻判断）を3例目として着手**。設計メモ: 監査対象=イラク（サダム政権）、3フェーズ（侵攻8/2→撤退拒否〜期限1/15→停戦2月末）、ex-ante の核＝グラスピー会談（1990/7/25）＝イラク版 E-005、ex-post（連合軍展開・Desert Storm 戦果）を直接証拠にしない。新ケースは起動時に `lintCaseMethodology` の `no_counter_evidence` が出ないよう反証を最初から入れる。
4. いずれも §3 の蒸し返し禁止に抵触しないか確認してから進める。
