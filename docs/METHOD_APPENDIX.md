# METHOD_APPENDIX.md — War Accountability Audit 詳細仕様・候補・プロトタイプ

最終再編成: 2026-06-28
役割: CANON から退避した詳細定義・導入候補・プロトタイプ・確定設計判断ログを保存する。**CANON が短い正典、本ファイルが参照層**。

**昇格規律**: ここにある「導入候補 / プロトタイプ」は、複数ケースで必要性が確認されたものだけ CANON へ昇格する。未採用のまま CANON 本文を膨らませない。

---

## A. Theory of Change（背景思想・全文）

- 兵器の無人化と AI の進化により、勝敗を分ける要因は「前線の士気」から「銃後の産業力・経済力・社会の耐久力」へ移行している。
- OSINT とデータ分析の向上により、軍事的勝率や継戦能力を事前シミュレーションで可視化しやすくなっている。
- 事前の勝算やコストが明確になるほど、希望的観測で始める無謀な戦争は論理的に成立しにくくなる。
- 本アプリは、過去の戦争データを用いて、将来の実用的な評価フレームワークの雛形を作る取り組みである。

---

## B. ID 名前空間 全対応表

```text
falklands Argentina: 既存接頭辞
falklands UK:        uk_  / UK-
gulf Iraq:           gw_  / GW-
gulf Coalition:      gwc_ / GWC-
franco France:       fpw_ / FPW-
franco Prussia:      fpwp_/ FPWP-
ukraine Russia:      ruw_ / RUW-
ukraine Ukraine:     ruu_ / RUU-
```

---

## C. 監査ラベル判定基準（詳細・一部は導入候補）

### C-1. 「形跡」の段階的定義（5段階）

```text
強い形跡あり:
  - 一次資料（公的文書・議会記録・軍公式文書・外交文書）がある。
  - または独立した複数の同時代資料が同じ判断形跡を示す。
  - 中枢または実務機関が当該リスクを明示的に検討したと確認できる。

形跡あり:
  - 一次／準一次資料で判断・検討の存在が確認できる。
  - ただし検討の十分性・妥当性までは未確定。

限定的:
  - 間接証拠、限定的報道、回顧録、戦後研究による再構成に依存。
  - 判断形跡は示唆されるが、意思決定者の認識までは確定できない。

不明:
  - 証拠未収集、内部資料未公開、確認不能。
  - skeleton では原則この値。未収集を「形跡なし」に変換しない。

形跡なし:
  - 調査対象資料の範囲で検討形跡が見つからない。
  - 「存在しなかった」と断定するには調査範囲・資料群・探索方法を明示。
```

重要な区別: `不明`=まだ分からない／未収集／未公開、`形跡なし`=調査した範囲で見つからない。

### C-2. evidenceSearchState（導入候補）

```js
// 既存ケースへ一括導入するまでは任意フィールド。
evidenceSearchState: "未収集" | "探索中" | "主要資料確認済み" | "網羅調査済み"
```

```text
未収集:        着手前。評価語彙は原則「不明」。
探索中:        代表資料を読み始めた段階。断定評価を避ける。
主要資料確認済み: 主要な一次・準一次・代表研究を確認。限定的な「形跡なし」を置ける。
網羅調査済み:  主要アーカイブ・議会記録・外交文書・軍文書を相当程度確認。強い「形跡なし」にはこの段階に近い根拠が必要。
```

### C-3. 評価可能性と形跡の関係

`exAnteEvaluability`（高/中/低）= 当時評価し得たか。`actuallyEvaluated`（強い形跡あり/形跡あり/限定的/不明/形跡なし）= 実際の評価形跡。混同しない。現行 `STATUS_MATRIX` は `高/中/低 × 形跡あり/限定的/不明/形跡なし` が基本。`強い形跡あり` を導入する場合、互換性維持のため **当面は `形跡あり` の上位注釈** として扱い、色・重大度を新設しない（導入候補）。

---

## D. rating 透明化（詳細スキーマ・導入候補）

### D-1. ratingRules / knockoutCriteria（導入候補）

```js
ratingRules: {
  knockoutCriteria: [
    { id: "ko_enemy_resistance_ignored", cellIds: ["..."], applies: true,
      condition: "敵抵抗意思が高重要度かつ形跡なし", capRatingAt: "C",
      rationale: "敵の抵抗意思を評価していない場合、短期決着仮説の信頼性が崩れる" },
    { id: "ko_logistics_unassessed", cellIds: ["..."], applies: false,
      condition: "長期作戦に必要な兵站評価が不明または形跡なし", capRatingAt: "C+",
      rationale: "作戦継続能力の未評価は勝算評価の根幹を損なう" }
  ],
  weightedScore: { enabled: false, note: "初期段階では参考値に留め、rating の自動決定には使わない" }
}
```

`cellIds` は assessmentCell 参照で、`validateCaseReferences` が dangling を検査（type: `missing_knockout_cell`）。`applies` は当該ケースが現状その条件を満たすか（発火/未発火）。Audit Opinion に「該当（発火）／非該当（未発火）」として表示。高評価ケースは未発火のまま条件付き上限として、低評価ケースは発火して上限を実制限。

### D-2. 加重平均の許容／禁止

```text
許容: ratingBasis の透明化 / セル間の重要度表示 / 参考スコア表示
禁止: ノックアウト欠陥を平均点で相殺 / 証拠未収集セルを 0点・中間点で機械処理 / 編集判断を自動算出に見せる
```

---

## E. 複合リスク・依存関係（プロトタイプ）

### E-1. dependencyRules（初期導入はデータのみ。UI 変更しない）

```js
dependencyRules: [
  { id: "deterrence_adjusted_invasion_risk",
    label: "抑止シグナル補正後の侵攻リスク",
    inputs: ["deterrence_signal_strength","opponent_intent_assessment","alliance_commitment_credibility"],
    logic: "抑止シグナルが弱く、相手意図を低く見積もり、同盟関与を疑った場合、侵攻リスク評価は過小化される",
    output: "adjusted_invasion_risk" }
]
```

### E-2. 典型例

```text
湾岸 イラク側:    米国抑止シグナル × グラスピー会談解釈 × アラブ諸国反応
ウクライナ ロシア側: ウクライナ抵抗意思 × 西側支援見積もり × 自軍短期決着能力
普仏 フランス側:   プロイセン動員能力 × 南ドイツ諸邦参戦 × フランス国内政治危機
```

---

## F. 確定設計判断ログ（蒸し返さない・全文保存）

> CANON §10 から退避。これらは settled で再議論しない。詳細根拠を保存するために本ファイルに置く。

- **A**: regime_survival（ア軍ケース）の override は provisional。現状の重大懸念ゼロは正しい。
- **B**: status はデータ非保存・実行時導出（`resolveStatus` が単一情報源）。claims.status は削除済み。
- **C**: Pre-War マトリクスは derived のみで配置・着色、override は注釈バッジで別レイヤー。
- **校正α**: 重大懸念は「評価可能性 高 × 形跡なし」のみに限定。現状維持。
- **校正β**: 「評価したが妥当でなかった」軸は追加しない。1軸（評価形跡の有無）に意図的に留める。
- **ア軍 EL-003 = (a)**: `claim_uk_limited` への `支持`（claim 付け替えはしない）。
- **#2 = A＋B**: 同時代史料追加＋opinion 酌量併記。criteria への E-005 投入は方向逆のため不採用。
- **D（S-1）**: 「反証を隠さない」はコード化検査（`lintCaseMethodology`）として常設。`one_sided_counter_claim` は noise でなく方法論 TODO として残す。`hypothesisTracking` は ID 参照を持たないため参照整合の対象外。
- **E（S-2）**: `ratingBasis` は全ケース `cellId` 参照に統一。weight は表示専用（格付けは `warCase.rating` ハードコード）。「結果との乖離」軸集約は代表セル `cell_outcome_opening` で表現。
- **A-1 フレーミング**: ベルグラノ反証は「単一反証・針路含む（保守的）」を採用。針路の事実は canSay、戦術的含意の留保は cannotSay。
- **F（A-2）**: UK が重大懸念に達しないのは入力構造でなく「評価され覆された」(校正β対象外)ゆえの判断。評価可能性を honest な値（deterrence_signal=高）に補正して確認。B-/C+ 据え置き。
- **G（A-3）**: `availableAtDecisionTime`（意思決定者の入手可能性）と `availableToAnalysts`（外部分析者の入手可能性）は別概念として維持。機密解除文書は前者 true／後者 false がありうる。`knownByDecisionMakers` は中枢の認識を表す第3の軸。
- **H（対照ケース設計）**: 同一戦争を両面から監査する対照ケースは `counterpartCaseId` の双方向参照。`validateCaseRegistry` が実在・双方向・自己参照禁止を検査。軽量ボタン導線は 2-NEW-H で実装。対比ビュー新設のみ凍結維持。
- **I（skeleton ケースの扱い）**: skeleton には「証拠数を増やす系の指摘」をオミット。証拠未収集セルは `provisional:true`＋`noEvidenceReason` で誠実に暫定と明示（確定評価に変換しない）。証拠量に依存しない構造・コード・ラベリングの是正のみ先行。
- **J（conflict グルーピング）**: ケースセレクタの戦争単位グルーピングは `warCase.conflict`（データ駆動）。ケース名の文字列分割は脆弱なため不採用。
- **K（cache-busting）**: ESM の `?v=` は app.js / index.html / data/cases/index.js / ui/renderers.js の4箇所＋`verify.js` で同一文字列（実質5箇所）。手動同期が前提。
- **L（連合側 正統性の二層化）**: 連合側正統性は国際的正統性（国連決議・連合形成＝強い）とホスト国正統性（サウジ駐留の宗教政治＝同時代に係争的）を別軸として扱う。サウジ駐留正統性は `gwc_pw_basing_legitimacy`＝高×形跡あり で `要検証`。長期ブローバック（1996/2001）は ex-post ＝射程外（第3原則）。決議678授権の限定は法的天井でなく政治的選択（`GWC-EL-020`）。サフワンのヘリ容認は機密解除トランスクリプト主導（所蔵アーカイブID未特定＝R-2 残課題）。**R-2 調査メモ（2026-06-28）**: 出所連鎖は固定済み＝原典は「ペンタゴンが機密解除した1991年3月3日サフワン会談トランスクリプト」、最初の公開引用は Laurie Mylroie, "Iraq's Real Coup"（Washington Post, 1992年6月28日 Outlook）で出所表記は「recently declassified by the Pentagon」のみ（FOIA番号・所蔵機関・文書番号の明示なし）。Wikipedia/CFR/Kurdistan24/Time も「declassified transcript」と述べるのみで所蔵IDを脚注化せず＝開放系の二次資料では DoD/NARA 文書管理番号は依然未特定。**次の特定先（優先順）**: ①Bourque『Jayhawk!』(U.S. Army CMH, 2002) と Bourque & Burdan『The Road to Safwan』(UNT Press) の脚注（学術的に最有力・原典所蔵を脚注化している公算大、ただし academia.edu 403 / CMH ページ取得失敗で本文未確認）、②Khaled bin Sultan『Desert Warrior』(1995) 付録（会談共同議長による文書再録の可能性）、③Gordon & Trainor『The Generals' War』(1995) の注。捏造禁止のため番号は確認できるまで記載しない。 **R-3 調査メモ（2026-06-28・CIA/DIA/CENTCOM 開戦前原見積もり）**: GWC-E-013 が戦後公刊（DoD Final Report 1992 / GWAPS 1993）依拠で、開戦前内部見積もり本体が未特定の件。**所蔵先を絞り込み済み**: ①National Security Archive **EBB 39「Operation Desert Storm: Ten Years Later」**（文書ID付き。Doc 5＝G-2 第3軍「The Military Intelligence Story」1991/4、Doc 6＝CENTCOM Executive Summary 1991/7/11、Doc 16＝DIA「A Chronology of Defense Intelligence in the Gulf War」1997/7）、②CIA CREST/FOIA Reading Room の**未確認候補**＝「Iraq's Military Capabilities」(CIA-RDP08R00805R000100420003-5) と SNIE 37-89 (CIA-RDP94T00885R000100230024-8)（**主題・日付は未確認**＝CIA Reading Room が自動取得を403拒否。SNIE 番号の対象国も要確認のため断定不可）、③レビュー研究＝DTIC ADA338886「Intelligence Successes and Failures in Desert Shield/Storm」、GAO/NSIAD-97-134、CSIS Cordesman 湾岸戦争レッスン第5章（Intelligence and Net Assessment）。**確認注意**: 俗に言う「54万」は連合軍兵力であってイラク軍見積もりではない（混同しない）。次手＝CIA Reading Room を手動/別経路で開き候補2件の主題・日付を確定、EBB39 Doc5/6/16 で CENTCOM/DIA 側の見積もり narrative を一次確認。確定するまで GWC-E-013 は「未特定＝要精査」を維持し、番号は本体確認まで evidenceLinks に記載しない。
- **M（skeleton Pre-War の `形跡なし` 規律）**: `形跡なし` は証拠で「評価痕跡なし」を裏づけた場合のみ。未収集なら `"不明"`＋`noEvidenceReason:"証拠未収集"`。`resolveStatus` は `形跡なし` で provisional override を自動発火させるため、未精査のまま置くと校正α（高×形跡なし→重大懸念）を黙って降格させる＝non-honesty 違反。`exAnteEvaluability` は `高/中/低` のみ。
- **N（claim type の極性）**: 能力肯定＝`counter_claim`、懸念・失敗＝`audit_issue`。勝者側でも両方持つのが健全（prussia は AUD-2 で長期化・併合コストの訴追 claim を新設し両建て化）。
- **O（timeFit と時間性の軸分離）**: `timeFit` は関係性軸のまま `{直接, 間接}` の2値に留め、**「事後」を追加しない**。後年資料（回顧録・戦後研究による再構成）は `間接 ＋ availableAtDecisionTime:false` で表す（§C で戦後研究は既に間接証拠に分類済み）。理由: 「事後」を timeFit に足すと時間性を関係性軸へ混入させ、独立軸として維持する G(A-3) の `availableAtDecisionTime` と二重化する。第3原則（開戦後証拠を直接証拠にしない）は lint の `direct_evidence_not_available_at_decision_time`＝重大 で既に強制済み。2026-06-28 確認時、間接＋false は58リンク・全8ケースに分布し、現行2軸で破綻なし（lintCaseMethodology 全ケース0）。
- **P（M-1 不採用 / 2026-06-28）**: claim 単位の支持/反証**集計ビューは新設しない**（去就＝削除）。ただし `claims[]` 自体は保持必須。`claims[]` は集計ビュー用ではなく、`validateCaseReferences` の claimId 参照整合・重複検査（missing_claim 等）と `lintCaseMethodology` の支持/反証**対称性**検査の土台＝load-bearing。renderer 非参照を「死蔵」と見なして削除しない。§G から M-1 を除去。
- **Q（I-6 撤去 / 2026-06-28）**: `nextEvidenceActionType` を**撤去**（去就＝削除）。除去対象＝`ui/renderers.js` の表示3箇所＋`getEvidenceActionLabel` ヘルパー、`data/auditSchema.js` の `evidenceActionLabels` 定義/export、全データの当該 field（5ファイル計39件）。`verify.js`/`validateCaseReferences`/`lintCaseMethodology` は当該 field 非依存のため監査影響なし。欠落時に renderer が「未設定」を出す退行の温床を恒久解消。§G から I-6 を除去。

---

## G. 凍結中（過剰設計リスク。やるなら独立セッション）

- **M-2**: claim 間（`claim_uk_limited`⇄`claim_uk_response`）の横断リンク。
- **対比ビュー新設**: 同等局面の両ケース並置。マルチケース renderer が要る大きな新機能。
- **UI-8 色覚多様性対応**: バッジはテキスト併記済み（色のみ依存ではない）ため上積み扱いで凍結。

> 去就決定済（§F 参照・本一覧から除去）: **M-1**＝集計ビュー不採用（§F-P。claims[] は保持）、**I-6**＝`nextEvidenceActionType` 撤去（§F-Q）。

---

## H. ASAA 由来・昇格前候補（戦争向けに語彙読み替え）

2026-06-28 追加。企業版 ASAA で先行採用された認識論メタフィールドのうち、WSA に欠けていて戦争題材で実質的に効くものを **候補として** 退避する。**昇格規律に従い、まずここに置く。8ケースのうち複数で必要性が実証されたものだけ CANON へ昇格する。** CANON 本文には追加しない。

> 輸入しなかったもの（題材依存／WSA が既に先行）: `evidenceHierarchy`（WSA の `evidence.type` が既に詳細）、`evidenceWeight.temporalFit`（WSA の時点性三層が上位）、`normalizationFactors`/`crossCompanyTemplate`（企業規模補正は題材固有）、`comparisonEntryMode`（加害/連合フレーミングは Overview 1行注記で足りる）。

### H-1. evidenceAccessScope（最有力候補 / ケース単位）

WSA は監査モードを宣言していない。8ケースは150年にまたがりアーカイブ公開度が桁違いに異なるため、**ケースごとに認識論的地位を宣言**する。ASAA の `public_osint/internal_available/retrospective_reconstruction` を、戦争史のアクセス現実へ読み替える。

```js
evidenceAccessScope: {
  mode: "historical_archive" | "declassified_available" | "public_osint",
  description: "...",
  limitation: "...",
}
```

```text
historical_archive:
  公文書・議会記録・外交文書が概ね公開済み。例: 普仏1870、英側資料の多く。
declassified_available:
  機密解除が部分進行。原見積もり本体が未特定の場合がある。例: 湾岸1990。
public_osint:
  アーカイブ未開放。OSINT・同時代報道・公開データのみ。例: ウクライナ2022（両側）、イラク側内部資料。
```

効果: ウクライナ露の `未確定` と普仏仏の `未確定` が **別物** であることを初めて明示できる。時点性三層（意思決定者/分析者/中枢認識）では捕まらない、**ケース単位のアクセス地位差** を担う。

### H-2. intendedUse / notFor（倫理的に WSA が先に持つべきだった欠落）

WSA はロシア2022・イラク1990を扱うのに利用境界の宣言がない。

```js
intendedUse: {
  primary: "historical_decision_audit",
  secondary: ["methodology_template", "deterrence_analysis_training"],
  notFor: ["war_crime_adjudication", "current_political_attack", "individual_leader_condemnation"],
}
```

戦争責任監査ツールが「戦争犯罪の有罪認定ではない／現在の政治的攻撃材料ではない／個人指導者の断罪ではない」を明示しないのは企業版より危険。**昇格優先度は H-1 と並んで最上位**（全8ケースへ一括導入後、CANON 昇格を検討）。

### H-3. uncertaintyReason（型付き未確定理由）

WSA の `uncertainty: 中/中〜高` は程度であって理由ではなく、`rating: 未確定` も理由を型で持たない。ASAA の型を戦争向けに読み替える。

```js
uncertaintyReason: [
  "outcome_not_mature",          // 例: ウクライナ露（現在進行中）
  "evidence_conflicting",        // 例: 普仏仏（史料は存在するが解釈係争）
  "decision_records_lost",       // 例: イラク（内部記録の散逸）
  "archives_unavailable",        // 例: 閉鎖アーカイブ側
  "scope_boundary_unresolved",   // 例: 長期戦化入口の別ケース境界
]
```

効果: ウクライナ露（outcome_not_mature）と普仏仏（evidence_conflicting）の **未確定の質の違い** を分離。現状は一語に潰している。

### H-4. assessmentCoverage / coverageState（疎マトリクスの空白問題）

CANON §5 は疎マトリクス前提だが、「セルが無い」と「セルがあって形跡なし」を区別する仕組みがない。`resolveStatus` は存在するセルからしか導出せず欠落セルは黙って消える。**ASAA の `e0_no_public_trace` をそのまま輸入せず、WSA 既存の `不明`/`形跡なし` 区別へ写像する**（ここが単純コピーでない要点）。

```js
assessmentCoverage: [
  { axisId, phaseId,
    coverageState: "assessed" | "traced_no_evidence" | "unassessed_unknown" | "out_of_scope" | "implementation_pending",
    rationale, linkedAssessmentCellId, linkedGapId }
]
```

```text
assessed:            セルあり・評価済み。
traced_no_evidence:  = 形跡なし（証拠で裏づけた不在。主要資料確認済み以上が前提＝CANON §5・校正M と整合）。
unassessed_unknown:  = 不明（未収集・未公開・確認不能。skeleton 既定）。
out_of_scope:        当該ケースの責任範囲外。空白でも問題なし。
implementation_pending: スキーム上必要だが実装未了。HANDOFF の未了タスク。
```

### H-5. gapEscalationProtocol（G0–G3 の段階昇格のみ）

注意: WSA は既に `knockoutCriteria`（rating 上限＝G3 相当）と `nextEvidenceActionType: collect_primary_source`（ASAA の `informationRequest` 相当）を持つ。**純粋な新規輸入は G0→G3 の段階ラダーのみ**。

```text
G0 中立的未評価:  リスク重要度が低い、または別資料で補完可能。
G1 要追加資料:    主要リスク軸の評価形跡が限定的で、判断根拠の確認が必要。
G2 監査上の懸念:  高重要度リスクで、一次・同時代資料の双方に評価形跡が乏しい。
G3 rating制約:    主要リスク軸の形跡欠落かつ戦略判断への影響大。既存 knockoutCriteria に接続し上位 rating を禁止。
```

昇格条件（複数該当で G1→G2→G3）: リスク重要度 high ／ 一次資料で形跡なし ／ `形跡なし` or `不明` の継続 ／ counterpart 側に同軸の形跡あり ／ 後年資料で当該リスクが顕在化。skeleton の多い WSA で「未収集セルを中立放置するか rating 制約まで昇格させるか」の基準を属人性から外す。

### H-6. adversarialReview の asymmetryRisk 開示（ナラティブ層のみ）

WSA は `lintCaseMethodology` の `one_sided_claim` で支持・反証両建てを **構造的に強制** しており、これは ASAA の adversarialReview より強い床。輸入対象は上に乗る **スティールマン・ナラティブ層と単一著者バイアスの開示** だけ。

```js
adversarialReview: {
  reviewerProtocol: { mode: "single_author", asymmetryRisk: "medium",
    mitigation: "各 strongestArgument に sourceEvidenceLinks と selectionRationale を付ける。" },
  prosecution: [{ claimId, strongestArgument, strongestEvidenceLinks, selectionRationale, caveat }],
  defense:     [{ claimId, strongestArgument, strongestEvidenceLinks, selectionRationale, caveat }],
  unresolvedTensions: [],
}
```

ロシア・イラクのような政治的に荷電したケースで、「批判側・擁護側の最強主張を著者が選んでいる残余バイアス」を明示する。初期は `single_author` ＋ `asymmetryRisk: medium` を既定とし、独立査読でない旨を記す。

### H-7. 勝者アーカイブ・バイアス（新規方法論論点・対照ペア単位）

両プロジェクトとも完全には防げていない系統的非対称。**勝者・公開側のアーカイブは敗者・閉鎖側より開いていて、かつ自己正当化的**。湾岸連合側は機密解除が進み「評価形跡あり」と判定されやすく、イラク側は記録が乏しく「形跡なし」になりやすい——だが後者は **検討不在ではなくアーカイブ非対称** かもしれない。

`evidenceAccessScope`（H-1）を **対照ペア単位** でも評価し、両側のモードが非対称な場合の標準注記を Audit Opinion に置く。

```text
対照ペアの evidenceAccessScope が非対称な場合（例: coalition=declassified_available ↔ iraq=public_osint）、
形跡の有無を両側で対称に裁かない。
記録が残る側が、記録が残るというだけで監査上有利に見える効果を、Opinion に明示する。
```

ASAA の `symmetricComparisonEntry`（企業規模差の緩和）の発想を、**アーカイブ開放度差** へ転用したもの。CANON §10-L（連合側正統性の二層化）と時点性三層が部分的に触れている非対称を、対照ペア全体へ一般化する。

### H-8. 昇格優先度（推奨）

```text
最優先（全8ケース一括導入後 CANON 昇格を検討）: H-1 evidenceAccessScope / H-2 intendedUse
次点（既存機構に噛み合う）:                    H-4 assessmentCoverage / H-3 uncertaintyReason
条件付き（新規部分のみ）:                       H-5 G0–G3 / H-6 asymmetryRisk 開示
方法論注記（フィールド化は任意）:                H-7 勝者アーカイブ・バイアス
```
