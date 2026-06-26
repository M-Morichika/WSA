# 引き継ぎ文（セッション状態サマリ）

最終更新: 2026-06-26（連合側ケース証拠増補＋サブエージェント再レビュー反映。未コミット）

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
- **方向性**: 単一ケース（フォークランド）から**複数ケース・フレームワーク**へ移行中。現在は**4ケース**＝フォークランド2（ア軍/英国）＋湾岸戦争2（イラク側/多国籍軍側）。同一戦争を加害側と連合側の両面から監査する「対照ケース」設計（`warCase.counterpartCaseId` で相互リンク）まで到達。枠の汎用性を検証中。

### 構成ファイル（今セッションでモジュール分割）
- `index.html` — サイドバー（**ケースセレクタ**＋ビュー切替タブ: Overview / Timeline / Pre-War / Assessment / Evidence / Audit Opinion）
- `app.js` — **モジュールエントリ**（146行）。ケース読込・state 管理・イベント・ケース切替（`setActiveCase`）。
- `data/auditSchema.js` — 共通ロジック。status 導出（`resolveStatus`/`deriveStatus`/`STATUS_MATRIX`）、フィルタ（`getEvidenceFilterOptions` で証拠フィルタ選択肢を**データから動的生成**）、参照整合性（`validateCaseReferences`）。
- `data/cases/index.js` — ケースレジストリ（`cases` 配列）。
- `data/cases/falklands-1982.js` — **アルゼンチン側監査**（id: `falklands-1982-argentina`, 格付 C-/D+, phase3/cell12/evidence6/link7/prewar7）。旧モノリスの `auditData` の移設先。
- `data/cases/falklands-1982-uk.js` — **英国側監査**（id: `falklands-1982-uk`, 格付 B-/C+, phase4/cell5/evidence6/link11/prewar3）。
- `data/cases/gulf-war-1990-iraq.js` — **湾岸戦争1990-91 イラク側監査**（id: `gulf-war-1990-iraq`, 格付 D+/D, phase3/cell5/evidence12/link17/claim6/prewar5）。現行既定 activeCase。`counterpartCaseId: gulf-war-1990-coalition`。
- `data/cases/gulf-war-1990-coalition.js` — **湾岸戦争1990-91 多国籍軍側（米国主導）監査**（id: `gulf-war-1990-coalition`, 格付 B+/B, phase3/cell6/evidence10/link14/claim3/prewar8）。iraq の対照ケース（`counterpartCaseId: gulf-war-1990-iraq`）。skeleton から一部補強済みだが、長期封じ込めコストはなお暫定重大懸念。
- 全 warCase に `conflict`（戦争グループ名）フィールドあり＝セレクタの `<optgroup>` グルーピングに使用（命名文字列分割でなくデータ駆動）。
- `ui/renderers.js` — 全ビューのレンダラ（ケース非依存。`createRenderers(caseData, state)`）。
- `styles.css` — `.case-picker` 等を追加。
- `.claude/launch.json` — プレビュー静的サーバー（`python -m http.server 8123`）。

> ⚠️ ファイル位置の注意: 旧 HANDOFF が「[app.js] EL-002」等と書いていた監査データは、**現在は `data/cases/*.js` 内**にある。

---

## 2. 直近セッションで完了したこと

> ✅ 2-NEW-A／2-NEW-B はコミット+push 済み（`19c28b1`, origin/master）。現在は **2-NEW-C（連合側ケース証拠増補＋再レビュー反映）と HANDOFF 更新が未コミット**。

### 2-NEW-A. 4ケース目「湾岸戦争 多国籍軍側（連合側）」追加（`19c28b1`）
- `data/cases/gulf-war-1990-coalition.js` を新規追加し `data/cases/index.js` に登録（4ケース構成）。既定 activeCase は `gulf-war-1990-iraq` のまま。
- 監査対象: 米ブッシュ政権・NSC・国防総省・米中央軍。範囲: 目的設定・作戦停止・戦後封じ込め設計。暫定格付け **B+/B**、3フェーズ（目的設定/作戦停止/戦後設計）。**skeleton 段階**。
- iraq との**対照ケース**（`counterpartCaseId` で相互リンク）。同一戦争を加害側/連合側の両面から監査する設計の初実装。
- ID は `gwc_`/`GWC-` 接頭辞で名前空間分離（横断衝突なし）。cache-busting は当初 `20260625-coalition`。

### 2-NEW-B. 連合側ケースのサブエージェントレビュー → I-3/I-5/I-8/I-10 適用（`19c28b1`・本セッション主成果）
> UIデザイナー/シニアエンジニア/監査方法論レビュアーの3人格でレビュー。**skeleton 段階ゆえ「証拠数に帰着する指摘（I-1/I-4/I-7）はオミット」とユーザー判断**。証拠量に依存しない構造・コード・ラベリングの4件のみ適用。
- **I-3（誠実性ラベリング）**: `gwc_pw_containment_cost.statusOverride.provisional` を `false`→**`true`**（証拠未収集を確定評価に変換していた non-honesty を是正）。`gwc_cell_containment_cost` の criteria「2003年以前の長期化リスク」→「1991年時点で予見可能だった封じ込め持続性の論点」（後知恵=ex-post 参照枠の除去＝第3原則の規律）。
- **I-5（対照参照の整合）**: iraq 側 warCase に `counterpartCaseId: gulf-war-1990-coalition` を追加し**双方向化**。`validateCaseRegistry` に対照参照検査を新設＝`missing_counterpart_case`（実在）/`counterpart_not_mutual`（双方向）/`counterpart_self_reference`（自己参照禁止）。ネガティブテストで3失敗モード検出・相互OK0件を確認。
- **I-8（cache-bust 二重ロード地雷の解消）**: `ui/renderers.js` の `auditSchema.js` import が `?v=` 無しで、app.js 側の `?v=...` 付き import と別URL二重ロードになる地雷を是正（同一クエリ付与）。4箇所同時更新の注意コメントを renderers.js 冒頭に追記。cache-busting を全4箇所 `20260625-coalition`→`20260625-review` に統一。
- **I-10（セレクタのグルーピング）**: 4件フラットだったケースセレクタを `warCase.conflict`（戦争グループ名）単位の `<optgroup>` に。option ラベルは `auditedActor` に短縮。全4ケースに `conflict` フィールド追加（名前文字列分割でなくデータ駆動。ア軍ケース名が陣営サフィックス無しで脆弱だったため）。
- **検証**: `node --check` 全8 OK／`validateCaseRegistry` 0（新検査有効下）／全4ケース `validateCaseReferences`・`lintCaseMethodology` 0／ブラウザ実機（:8124）で optgroup 2群描画・ケース切替で B+/B 更新・「2003年以前」消滅・**コンソールエラー/警告0**。
- **オミット（skeleton ゆえ時期尚早＝証拠数依存）**: I-1（claim反証を批判方向に追加）/I-4（蜂起 claim・decision_process セル新設）/I-7（形跡なしセルへ evidenceBasis 補充）。
- **凍結**: I-9（`counterpartCaseId` の UI 導線＝対照ケースへのボタン/対比ビュー。新機能ゆえ独立セッション）。UI-8 系（疎マトリクス・aria-live冗長・色覚対応）は全ケース共通の既存問題で範囲外。

### 2-NEW-C. 連合側ケースの証拠増補＋サブエージェント再レビュー反映（未コミット）
- ユーザー判断「スキーム自体に大きな問題が無ければ、エビデンス数を増やせば P1/P2 は解決するのでは？」を受け、連合側ケースに同時代公開資料を追加。追加証拠: `GWC-E-007`（ブッシュ開戦演説 1991/1/16）、`GWC-E-008`（攻勢戦闘停止演説 1991/2/27）、`GWC-E-009`（湾岸戦争終結後の議会演説 1991/3/6）、`GWC-E-010`（Public Law 102-1）。追加リンク: `GWC-EL-009`〜`GWC-EL-014`。連合側は evidence10/link14/claim3。
- 初回実装では `gwc_pw_containment_cost` を `限定的`/`要注意` に下げたが、サブエージェント再レビュー（UIデザイナー/シニアエンジニア/監査方法論）で「Pre-War に戦闘停止後・戦後資料を根拠リンクしている」「公開演説だけで重大懸念を要注意へ下げるのは早い」「反証ラベルが強すぎる」と指摘。
- レビュー反映後の確定状態: `gwc_pw_containment_cost` は `actuallyEvaluated: "不明"`、`noEvidenceReason: "証拠未収集"`、`statusOverride.provisional: true`。`resolveStatus` は `pending:true` となり、C-1（provisional が `形跡なし` で確定扱いになる問題）を回避。`gwc_cell_containment_cost` は **重大懸念** 維持、`evidenceStrength: "弱〜中"`。
- 戦闘停止後・戦後構想資料（`GWC-EL-011`/`012`/`013`）は Pre-War の直接根拠には使わず、`timeFit: "間接"` / `availableAtDecisionTime:false` とし、「全く評価していなかった」という強い仮説への**限定的反証**として整理。
- `gwc_pw_uprisings_humanitarian` は `不明`＋`証拠未収集` に戻し、矛盾していた `evidenceBasis` / `linkedEvidenceLinks` を撤去。
- cache-busting は全4箇所（`index.html` / `app.js` / `data/cases/index.js` / `ui/renderers.js`）で `20260625-coalition-evidence` に統一。
- 検証: `node --check` 全JS OK／`validateCaseRegistry(cases)` 0／全4ケース `validateCaseReferences` 0／全4ケース `lintCaseMethodology` 0。`gwc_pw_containment_cost` は `resolveStatus` で `{ value: "要検証", basis: "derived", derived: "要検証", pending: true }` を確認。


### 2-0. A-1＋S-1＋S-2 の適用（※前回までの成果）
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
- **H（対照ケース設計）**: 同一戦争を加害側/連合側の両面から監査する「対照ケース」は `warCase.counterpartCaseId` の**相互（双方向）参照**で表現。`validateCaseRegistry` が実在・双方向・自己参照禁止を検査。UI 導線（I-9）は新機能ゆえ凍結中＝データ整合のみ先行確保。
- **I（skeleton ケースの扱い）**: skeleton 段階のケースに対しては「証拠数を増やす系の指摘（反証リンク追加・セル新設・evidenceBasis 補充）はオミット」が方針。証拠未収集セルは `provisional:true`＋`noEvidenceReason` で**誠実に暫定**と明示する（確定評価に変換しない）。証拠量に依存しない構造・コード・ラベリングの是正のみ先行。
- **J（conflict グルーピング）**: ケースセレクタの戦争単位グルーピングは `warCase.conflict` フィールド（データ駆動）で行う。ケース名の文字列分割はア軍ケース名が陣営サフィックス無しで脆弱なため不採用。
- **K（cache-busting）**: ESM の `?v=` クエリは **app.js / index.html / data/cases/index.js / ui/renderers.js の4箇所で同一文字列**に揃える（renderers.js 冒頭にコメント常設）。ズレると同一モジュールが別URLで二重ロードされ状態分裂。静的importはテンプレートリテラル不可ゆえ定数集約はビルド無しでは不能＝手動同期が前提。現行未コミット差分では `20260625-coalition-evidence`。

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
- **検証**: `node --check` OK／`validateCaseRegistry` 0／全3ケース `validateCaseReferences` 0／全3ケース `lintCaseMethodology` 0。後続確認でブラウザ実機も OK（湾岸ケース既定表示・3ケース選択可能・全6ビュー描画・コンソールエラー0）。
- **S-3（適用済）**: 外部評価の推奨を容れ、`issues` に重大懸念セル「意思決定プロセス」を「侵攻判断プロセスの記録欠落」として1行追加（Overview の網羅性回復）。
- **U-2（凍結確定）**: `hypothesisTracking` 1件で「初期の限定反応期待が段階的に崩れほぼ棄却される過程」を十分追跡できており、3件全追跡は UI を煩雑にするため現状維持。
- **未適用で残った湾岸レビュー指摘**: なし。**U-1 は §2-7 で解消**（証拠ゼロの重大懸念セルが消滅し未接続セル0件＝表示問題自体が発生しない）。

### 2-7. 湾岸ケース 一次資料投入（A+B+C）
> 完成度向上の優先①（ケースデータの厚み）。証拠空白を一次資料で埋め、未接続セル0・証拠ゼロ理由付きセル0を達成。
- **A（意思決定プロセスの空白を埋める）**: `gw_cell_decision_process_opening`（証拠リンク0・重大懸念・weight2）が最大の穴だった。`GW-E-008`（**Iraqi Perspectives Project**／Conflict Records Research Center 所蔵の捕獲記録・サダム会議録音、Kevin M. Woods 分析）＋`GW-E-009`（**FBIサダム尋問** 2004聴取/2009機密解除）を追加。新 claim `gw_claim_decision_process`（audit_issue）に `GW-EL-014`（支持・GW-E-008）/`GW-EL-015`（反証・GW-E-009）を接続。
  - **時点性（A-3/R-1 先例準拠）**: 捕獲記録は `availableAtDecisionTime:true`／`availableToAnalysts:false`／`knownByDecisionMakers:明白`、`timeFit:間接`（監査が消費するのは戦後再構成）。FBI尋問は `availableAtDecisionTime:false` の事後回想（`interpretiveReliability:低〜中`、自己正当化バイアス明記）。
  - セルは `evidenceStrength` 弱→中、`noEvidenceReason`/`nextEvidenceActionType` を撤去、opinion を捕獲記録の知見（中枢集中・審議乏しい）＋反証（目的志向の論拠は存在）で書換え。重大懸念は「形跡なし→」から「捕獲記録照合済みで裏づけ」へ格上げ。
- **B（停戦フェーズ補強）**: `GW-E-010`（安保理決議686/687・サフワン会談1991/3）＋`GW-EL-016`（支持・直接・`gw_claim_late_termination`）。`gw_cell_termination_ceasefire` の `evidenceStrength` 弱→中、証拠ゼロ解消。受諾条件の過酷さを cannotSay/criteria に反映。
- **C（preWarChecklist 格上げ）**: `gw_pw_us_intervention`/`gw_pw_occupation_cost` を `noEvidenceReason` 証拠未収集→**該当証拠なし**（捕獲文書照合済みの evidenced な「形跡なし」）。`gw_pw_coalition_formation` は genuine な不確実性ゆえ「不明／証拠未収集」を据え置き。
- **結果**: evidence 7→10、links 13→16、claims 5→6。**未接続セル0／証拠ゼロ理由付きセル0**。
- **検証**: `node --check` OK／`validateCaseRegistry` 0／全3ケース `validateCaseReferences`・`lintCaseMethodology` 0（新 audit claim も支持1/反証1）。後続確認でブラウザ実機も OK（湾岸ケース既定表示・3ケース選択可能・全6ビュー描画・コンソールエラー0）。

### 2-8. サブエージェントレビュー A+B 適用
- **A（preWarChecklist の証拠根拠を明示）**: `gw_pw_us_intervention` と `gw_pw_occupation_cost` に `evidenceBasis` と `linkedEvidenceLinks` を追加。`形跡なし / 該当証拠なし` が、どの資料範囲（主に `GW-EL-014` 捕獲一次資料/Iraqi Perspectives Project）に基づく暫定評価なのかを追跡可能にした。`gw_pw_occupation_cost.evidenceStrength` は `弱`→`弱〜中` に調整し、網羅性限界も明記。
- **A（可視化）**: `ui/renderers.js` の Pre-War 詳細に「評価形跡の根拠」と「根拠リンク」を表示。画面上でも「なぜ形跡なしと言えるのか」を追えるようにした。
- **B（複合証拠の分割）**: `GW-E-007` を「ソ連・仏の停戦仲介」に絞り、米上院採決・反戦世論を `GW-E-011` として分離。`GW-EL-012` は直接交渉当事者ゆえ `knownByDecisionMakers:明白` 維持、`GW-EL-013` は米国内政治の観測可能性に留め `knownByDecisionMakers:推定` に弱めた。
- **B（停戦資料の分割）**: `GW-E-010` を決議686＋サフワン会談（停戦受諾時点の直接資料）に絞り、決議687は `GW-E-012`（停戦後条件の確定）として分離。`GW-EL-016` と `gw_cell_termination_ceasefire.opinion` も決議686/サフワンと決議687の時点差が読めるよう修正。
- **補足**: `gw_cell_external_reaction_opening.opinion` に、決議660は侵攻後資料であり侵攻判断時点の直接証拠ではなく「限定反応期待の早期弱体化を示す補助証拠」と明記。
- **検証**: `node --check` 全JS OK／`validateCaseRegistry` 0／全3ケース `validateCaseReferences`・`lintCaseMethodology` 0。ブラウザ実機で湾岸ケース既定表示・Pre-War 根拠表示・Evidence の分割証拠表示・コンソールエラー0を確認。

### 2-9. A+B 後レビューのブラッシュアップ適用
- **方法論の混線除去**: `GW-EL-012.cannotSay` から米上院採決の僅差論点を外し、`GW-E-007`（ソ連・仏の停戦仲介）だけに対応する記述へ修正。
- **未参照証拠の解消**: `GW-E-012`（決議687）に `GW-EL-017` を追加し、停戦後条件の過酷化を `gw_cell_termination_ceasefire` の反証・補助材料として接続。湾岸ケースは evidence12/link17/claim6。
- **時点性の整理**: `gw_pw_us_intervention.linkedEvidenceLinks` から事後聴取の `GW-EL-015` を外し、形跡なしの根拠を捕獲一次資料 `GW-EL-014` に限定。
- **検証強化**: `validateCaseReferences` に `preWarChecklist[].linkedEvidenceLinks` → `evidenceLinks[].id` の参照検査を追加。typo や未定義リンクを検出できるようにした。`index.html` / `app.js` / `data/cases/index.js` の cache-busting 文字列は `20260625-brush` に更新。
- **検証**: `node --check` 全JS OK／`validateCaseRegistry` 0／全3ケース `validateCaseReferences`・`lintCaseMethodology` 0。ブラウザ実機で湾岸ケース既定表示、Pre-War 展開時の `GW-EL-014` 単独根拠表示、Evidence 17/17 と `GW-E-012` 表示、コンソールエラー0を確認。

**残りの未適用（優先度順）:**
- 現時点で軽掃除・方法論lint由来の未適用項目はなし。

**凍結中（過剰設計リスク。やるなら独立セッション）:**
- **M-1**: claim 単位の支持/反証集計ビュー。`claims[]` は現状どの renderer も非参照（死蔵）。活用 or 削除の去就決定が要る。
- **M-2**: claim 間（`claim_uk_limited`⇄`claim_uk_response`）の横断リンク。
- **I-9（連合側レビュー）**: `counterpartCaseId` の UI 導線＝対照ケースへのボタン/同等局面の対比ビュー。データ相互参照（I-5）は実装済み、UI 表現は新機能ゆえ凍結。
- **UI-8 系（連合側レビュー）**: Assessment の軸×局面 直積マトリクスが疎で「未定義」だらけ／aria-live 冗長／色覚多様性対応。**全ケース共通の既存問題**で連合ケース固有でない＝範囲外。
- **I-6（連合側レビュー）**: `nextEvidenceActionType` 欠落で renderer が「未設定」退行（iraq も同様）。撤去/必須化の去就決定が未了ゆえ保留。

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
- **コンテキストの定期リセット**: セッションが長くなり性能が落ち始める前（目安: 進捗30〜40%程度）に、ここまでの状態を `HANDOFF.md` に要約してから、ユーザーにセッションリセット（`/clear` 等）を提案する。

---

## 7. 次セッションの推奨アクション
1. まず本ファイルを読む。
2. 連合側ケース追加＋I-3/I-5/I-8/I-10 は **`19c28b1` でコミット+push 済み**（origin/master）。現在の未コミット差分は、連合側ケース証拠増補・レビュー反映・cache-bust 更新・本 HANDOFF 更新。`git status` で確認すること。
3. 次にやるなら、まず未コミット差分をレビューして必要ならコミットする（対象候補: `data/cases/gulf-war-1990-coalition.js`, `app.js`, `data/cases/index.js`, `index.html`, `ui/renderers.js`, `HANDOFF.md`）。
4. その後の大きな作業候補:
   - **連合側ケースの本格増補**。今回の演説・法令追加は skeleton からの一部補強に留めた。次は一次資料で I-1（連合**批判方向**の反証を各 claim に）・I-4（シーア派/クルド蜂起鎮圧の責任計上・米国意思決定プロセスセル）・I-7（形跡なしセルの evidenceBasis）に対応。**AUD-4（格付け B+/B の導出根拠＝懸念セル加重82%との整合）の明文化**も未解決。
   - または I-9（対照ケースの UI 導線＝counterpart へのボタン/対比ビュー）を独立セッションで。
   - または UI-8 系（Assessment の疎マトリクス、aria-live、色覚対応）を全ケース共通 UI 改善として扱う。
   - または湾岸イラク側の一次資料名精密化（グラスピー会談、Desert Shield 展開資料）。
5. いずれも §3 の蒸し返し禁止に抵触しないか確認してから進める。

> ⚠️ プレビュー注: 本体は `master` ブランチ＋メインディレクトリ。worktree 内で作業した場合、preview MCP は worktree 基準で起動するため launch.json の python http.server を `--directory <メインパス>` 付き・別ポートで指す必要がある（ポート8123は前セッションの常駐 python が掴んでいることがある）。
