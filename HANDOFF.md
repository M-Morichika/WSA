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
- **残課題**: UK の `one_sided_counter_claim` が `uk_claim_taskforce_reasonable`／`uk_claim_termination_limited` の2件残存（＝U-2「擁護一色」の正体）。消さず方法論TODOとして可視化継続する方針。

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

---

## 4. 未適用のレビュー指摘（今セッションの複数ケース・レビュー）※記号は本レビュー内のもの
> ⚠️ 旧モノリス時代のレビュー記号（A-1/U-1 等）とは**別物**。下記は複数ケース化後のレビュー結果。

**✅ 完了（今セッション・§2-0 参照）: A-1 / S-1 / S-2**
- A-1: UK に反証 `UK-EL-008`（ベルグラノ）追加で原則回復。
- S-1: `validateCaseReferences` 拡張＋`lintCaseMethodology` 新設でコード化。
- S-2: ア軍 `ratingBasis` を `cellId` 正規化＋レンダラ死にコード撤去。

**残りの未適用（優先度順）:**
4. その他（軽〜中）:
   - **A-2**: UK は校正α上 **重大懸念に到達不能な構造**（prewar 全項目が評価可能性「中」）。格付け B-/C+ の寛容さが判断でなく入力構造由来の疑い。設定の妥当性を sanity-check。
   - **A-3**: `UK-EL-005` の `timeFit:直接` × `availableAtDecisionTime:false` の語彙ズレ。
   - **S-3**: `issues[].evidence/open` の件数が各ケース手書き固定（実 link/evidence 数と無連動）。ケース増で増殖する飾り数字。
   - **S-4**: UK `preWarChecklist` 末尾の空行（整形）。
   - **U-1**: ケース切替で必ず Overview に戻る（`stateForCase` が activeView リセット）。
   - **U-2（一部進展）**: A-1 で反証1件追加したが、UK は依然 `one_sided_counter_claim` 2件（`taskforce_reasonable`/`termination_limited`）＝Evidence 上やや擁護寄り。リント可視化済み。残2件に実反証を足す（A-1 の横展開）か、現状維持かは要判断。

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
1. まず本ファイルを読む。A-1＋S-1＋S-2 はコミット済み（§2-0）。
2. 残りの着手候補（§4）:
   - **掃除系（軽）**: S-4（空行）、S-3（issues 飾り数字を実 link/evidence 数と連動 or 撤去）、U-1（ケース切替で view 維持）、A-3（UK-EL-005 の語彙ズレ）。
   - **判断系（中）**: A-2（UK が校正α上 重大懸念に到達不能な構造の sanity-check）、U-2 残り（`one_sided_counter_claim` 2件に実反証を足すか現状維持か）。
3. または**湾岸戦争1990–91（イラク侵攻判断）を3例目として着手**。設計メモ: 監査対象=イラク（サダム政権）、3フェーズ（侵攻8/2→撤退拒否〜期限1/15→停戦2月末）、ex-ante の核＝グラスピー会談（1990/7/25）＝イラク版 E-005、ex-post（連合軍展開・Desert Storm 戦果）を直接証拠にしない。新ケースは起動時に `lintCaseMethodology` の `no_counter_evidence` が出ないよう反証を最初から入れる。
4. いずれも §3 の蒸し返し禁止に抵触しないか確認してから進める。
