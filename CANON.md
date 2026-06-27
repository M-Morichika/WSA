# CANON.md — War Accountability Audit 正典

最終再編成: 2026-06-27  
最終更新: 2026-06-27（ブラッシュアップ方針: 形跡定義 / rating 透明化 / 依存関係表現を反映）  
由来: `HANDOFF(3).md` から、変えにくい設計思想・監査原則・データ構造・命名規則だけを抽出・整理。

## 0. このファイルの目的

このファイルは、War Accountability Audit Web アプリの「守るべきもの」を定義する正典である。

ここには、日々の作業状態や一時的な TODO は置かない。次に何をするかは `HANDOFF.md`、どうして現在の形になったかは `HISTORY.md` に分離する。

---

## 1. プロジェクトの中核思想

- **「継戦能力版ソブリン格付け」** = 「戦争責任監査（War Accountability Audit）」の Web アプリ。
- 実装は vanilla JS / ES Modules。
- 価値は題材そのものではなく、**転用可能な監査の作法**にある。
- 方法論的には ACH（競合仮説分析）/ 構造化分析技法に相当する。

### 監査原則

1. **反証証拠を隠さない。**
2. **言えること `canSay` と言えないこと `cannotSay` を分ける。**
3. **開戦後の証拠を、開戦前判断の直接証拠にしない。**

### 具体的な設計思想

> 開戦前に、その時点で利用可能な情報だけを使って、継戦能力・勝算・社会耐久力・政権リスクを記録し、戦後に為政者の説明責任と歴史判断を検証できるようにする。

---

## 2. Theory of Change

- 兵器の無人化と AI の進化により、戦争の勝敗を分ける要因は「前線の士気」から「銃後の産業力・経済力・社会の耐久力」へ移行している。
- OSINT とデータ分析技術の向上により、国家の軍事的な勝率や継戦能力を事前シミュレーションで可視化しやすくなっている。
- 事前の勝算やコストが明確になるほど、指導者が希望的観測で始める無謀な戦争は論理的に成立しにくくなる。
- 本アプリは、過去の戦争データを用いて、将来の実用的な評価フレームワークの雛形を作るための取り組みである。

---

## 3. アーキテクチャ正典

### 基本構成

```text
index.html
app.js
data/
  auditSchema.js
  cases/
    index.js
    <case-id>.js
ui/
  renderers.js
styles.css
CANON.md
HANDOFF.md
HISTORY.md
```

### ファイル責務

- `index.html`: サイドバー、ケースセレクタ、ビュー切替タブ。
- `app.js`: モジュールエントリ、ケース読込、state 管理、イベント、ケース切替、対照ケース導線。
- `data/auditSchema.js`: 共通ロジック。status 導出、証拠フィルタ、参照整合性、方法論 lint。
- `data/cases/index.js`: ケースレジストリ。
- `data/cases/*.js`: 各ケースデータ本体。`app.js` に巨大データを戻さない。
- `ui/renderers.js`: ケース非依存レンダラ。`createRenderers(caseData, state)`。
- `styles.css`: UI スタイル。

### UI 正典

既存 UI は以下のビューを基本単位とする。

```text
Overview
Timeline
Pre-War
Assessment
Evidence
Audit Opinion
```

ケース追加時は原則として UI を変更せず、既存レンダラに載るデータ構造で実装する。

---

## 4. ケースデータ構造正典

各ケースは以下の構造を基本形とする。

```js
export const someCase = {
  warCase: {
    id: "...",
    conflict: "...",
    name: "...",
    auditedActor: "...",
    opponentActor: "...",
    scope: "...",
    primaryResponsibility: "...",
    uncertainty: "...",
    rating: "...",
    counterpartCaseId: "..." // 実装済み相手ケースがある場合のみ
  },

  overviewOpinion: "...",
  issues: [],
  counterHypotheses: [],
  phases: [],
  preWarChecklist: [],
  hypothesisTracking: [],
  assessmentCells: [],
  evidence: [],
  claims: [],
  evidenceLinks: [],
  ratingBasis: [],
};
```

### `evidenceLinks` の必須思想

各 evidenceLink では、最低限以下の概念を分離する。

```text
id
evidenceId
claimId
assessmentCellId
relationship: 支持 / 反証 / 保留
timeFit
availableAtDecisionTime
availableToAnalysts
knownByDecisionMakers
knownByDecisionMakersBasis
canSay
cannotSay
```

### 時点性の三層

- `availableAtDecisionTime`: 意思決定者に入手可能だったか。
- `availableToAnalysts`: 外部分析者が当時入手可能だったか。
- `knownByDecisionMakers`: 中枢が認識していたか。

機密解除文書は、`availableAtDecisionTime: true` かつ `availableToAnalysts: false` がありうる。

---

## 5. 命名規則

### ケース ID

```text
<conflict-slug>-<year-or-period>-<actor>
```

例:

```text
falklands-1982-argentina
gulf-war-1990-coalition
franco-prussian-war-1870-prussia
russo-ukrainian-war-2022-russia
```

### ID 名前空間

ケースごとに接頭辞を分け、横断衝突を避ける。

```text
falklands Argentina: 既存接頭辞
falklands UK:        uk_ / UK-
gulf Iraq:           gw_ / GW-
gulf Coalition:      gwc_ / GWC-
franco France:       fpw_ / FPW-
franco Prussia:      fpwp_ / FPWP-
ukraine Russia:      ruw_ / RUW-
ukraine Ukraine:     ruu_ / RUU-
```

### claim type の極性

- 能力肯定・免責側命題: `counter_claim`
- 懸念・失敗・訴追側命題: `audit_issue`

勝者側ケースでも `audit_issue` と `counter_claim` を両方持つ。

---

## 6. Pre-War / status 正典

- status は原則としてデータ保存せず、`resolveStatus` が実行時導出する。
- Pre-War マトリクスは derived のみで配置・着色する。
- override は注釈バッジで別レイヤーとして扱う。
- 重大懸念は **評価可能性 高 × 評価形跡なし** のみに限定する。
- 「評価したが妥当でなかった」軸は追加しない。
- `actuallyEvaluated: "形跡なし"` は、証拠で「評価痕跡なし」を裏づけた場合のみ使う。
- 証拠未収集なら `actuallyEvaluated: "不明"` と `noEvidenceReason: "証拠未収集"` を使う。
- `exAnteEvaluability` は `高` / `中` / `低` のみ。`低〜中` などは使わない。

---


## 6A. 監査ラベル判定基準 正典

今後のブラッシュアップでは、Pre-War Checklist や Assessment Cell の評価語彙を、編集者の印象ではなく、できる限り条件分岐で再現できるようにする。

### 6A-1. 「形跡」の段階的定義

`actuallyEvaluated` は、評価対象が当時どの程度検討されていたかを表す。以下の段階定義を正典とする。

```text
強い形跡あり:
  - 公的文書、議会記録、軍公式文書、外交文書などの一次資料がある。
  - または、独立した複数の同時代資料が同じ判断形跡を示す。
  - 中枢または実務機関が当該リスクを明示的に検討したことを確認できる。

形跡あり:
  - 一次資料または準一次資料で、判断・検討の存在が確認できる。
  - ただし、検討の十分性や判断の妥当性までは未確定。

限定的:
  - 間接証拠、限定的報道、回顧録、戦後研究による再構成に依存する。
  - 判断形跡は示唆されるが、意思決定者の認識までは確定できない。

不明:
  - 証拠未収集、内部資料未公開、または確認不能。
  - skeleton ケースでは原則としてこの値を使い、未収集を「形跡なし」に変換しない。

形跡なし:
  - 調査対象資料の範囲で検討形跡が見つからない。
  - ただし「存在しなかった」と断定するには、調査範囲・資料群・探索方法を明示する。
```

重要な区別:

```text
不明      = まだ分からない / 証拠未収集 / 内部資料未公開
形跡なし  = 調査した範囲では見つからない
```

したがって、`actuallyEvaluated: "形跡なし"` は、`evidenceSearchState` が少なくとも `主要資料確認済み` 以上の場合に限る。証拠未収集なら `actuallyEvaluated: "不明"` とする。

### 6A-2. 証拠探索状態

`actuallyEvaluated` と別に、証拠探索の進捗を表すフィールドを導入候補とする。

```js
// 導入候補。既存ケースへ一括導入するまでは任意フィールドとして扱う。
evidenceSearchState: "未収集" | "探索中" | "主要資料確認済み" | "網羅調査済み"
```

暫定運用:

```text
未収集:
  証拠収集に着手していない。評価語彙は原則「不明」。

探索中:
  代表資料を読み始めた段階。断定評価は避ける。

主要資料確認済み:
  主要な一次・準一次・代表研究を確認した。限定的な「形跡なし」を置ける。

網羅調査済み:
  主要アーカイブ、議会記録、外交文書、軍文書などを相当程度確認した。
  強い「形跡なし」を置くには、この段階に近い根拠が必要。
```

### 6A-3. 評価可能性と形跡の関係

`exAnteEvaluability` は、当時そのリスクを評価し得たかを表す。`actuallyEvaluated` は、実際に評価した形跡があるかを表す。両者を混同しない。

```text
exAnteEvaluability: 高 / 中 / 低
actuallyEvaluated: 強い形跡あり / 形跡あり / 限定的 / 不明 / 形跡なし
```

現行 `STATUS_MATRIX` は `高 / 中 / 低` × `形跡あり / 限定的 / 不明 / 形跡なし` を基本とする。`強い形跡あり` を導入する場合は、互換性維持のため当面は `形跡あり` の上位注釈として扱い、色や重大度を新設しない。

---

## 6B. rating 透明化 正典

総合 rating は、当面は自動算出しない。`warCase.rating` を編集判断として保持し、`ratingBasis`、`ratingBasisExclusions`、`ratingNote`、将来導入する `ratingRules` によって説明責任を高める。

### 6B-1. 加重平均より先にノックアウト基準を置く

戦争監査では、平均点が高くても、単一の致命的欠落で全体評価が崩れる場合がある。したがって、精密な加重平均より先に、rating 上限を制限するノックアウト基準を導入候補とする。

```js
ratingRules: {
  knockoutCriteria: [
    {
      id: "ko_enemy_resistance_ignored",
      cellIds: ["..."],           // 対象 assessmentCell（参照整合を検査）
      applies: true,              // 当該ケースで現状その条件を満たすか（発火/未発火）
      condition: "敵抵抗意思が高重要度かつ形跡なし",
      capRatingAt: "C",
      rationale: "敵の抵抗意思を評価していない場合、短期決着仮説の信頼性が崩れる"
    },
    {
      id: "ko_logistics_unassessed",
      cellIds: ["..."],
      applies: false,
      condition: "長期作戦に必要な兵站評価が不明または形跡なし",
      capRatingAt: "C+",
      rationale: "作戦継続能力の未評価は勝算評価の根幹を損なう"
    }
  ],
  weightedScore: {
    enabled: false,
    note: "初期段階では参考値に留め、rating の自動決定には使わない"
  }
}
```

`cellIds` は対象 assessmentCell への参照で、`validateCaseReferences` が dangling を検査する（type: `missing_knockout_cell`）。`applies` は当該ケースが現状その条件を満たすか（発火＝true／未発火＝false）を表し、Audit Opinion に「該当（発火）／非該当（未発火）」として表示する。高評価ケース（例: 湾岸 多国籍軍側 B+/B）では条件未充足で未発火のまま、条件付き上限としてだけ示す。低評価ケース（例: 湾岸 イラク側 D+/D）では発火して上限を実際に制限する。

### 6B-2. rating 説明の最低要件

rating を置く場合、少なくとも以下を説明する。

```text
- どの assessmentCell を ratingBasis に算入したか。
- どの assessmentCell を ratingBasis から除外したか。
- 除外理由が ex-post、証拠未収集、別ケース境界、または scope 外のどれか。
- ノックアウト基準に該当する項目があるか。
- rating が自動算出か、編集判断か。
```

`ratingBasisExclusions` がある場合は Audit Opinion に表示する。後知恵対照・長期戦化入口・別ケース境界セルは、初期判断 rating に直接算入しない。

### 6B-3. 加重平均の扱い

加重平均は、将来導入しても補助指標に留める。平均値だけで rating を決定しない。

```text
許容:
  - ratingBasis の透明化
  - セル間の重要度表示
  - 参考スコア表示

禁止:
  - ノックアウト欠陥を平均点で相殺する
  - 証拠未収集セルを 0 点や中間点として機械的に処理する
  - 編集判断を隠して自動算出に見せる
```

---

## 6C. 複合リスク・依存関係 正典

リスク項目は常に独立ではない。今後は、必要に応じて項目間の依存関係を `dependencyRules` として表現する。

### 6C-1. 初期導入はデータのみ

依存関係マトリクスやフローチャートは有用だが、UI 実装は重い。初期段階では UI を変更せず、データ構造と Audit Opinion の説明から始める。

```js
dependencyRules: [
  {
    id: "deterrence_adjusted_invasion_risk",
    label: "抑止シグナル補正後の侵攻リスク",
    inputs: [
      "deterrence_signal_strength",
      "opponent_intent_assessment",
      "alliance_commitment_credibility"
    ],
    logic: "抑止シグナルが弱く、相手意図を低く見積もり、同盟関与を疑った場合、侵攻リスク評価は過小化される",
    output: "adjusted_invasion_risk"
  }
]
```

### 6C-2. 依存関係の典型例

```text
湾岸戦争 イラク側:
  米国抑止シグナル × グラスピー会談解釈 × アラブ諸国反応

ウクライナ戦争 ロシア側:
  ウクライナ抵抗意思 × 西側支援見積もり × 自軍短期決着能力

普仏戦争 フランス側:
  プロイセン動員能力 × 南ドイツ諸邦参戦 × フランス国内政治危機
```

### 6C-3. 導入順

導入順は以下を正とする。

```text
Phase A: 「形跡」の段階的定義
Phase B: ノックアウト基準・重み付けの明示
Phase C: 依存関係マトリクス / フローチャート
```

理由: 各項目の評価語彙が安定しないまま重み付けや依存関係を導入すると、透明性ではなく擬似精密化になる。

---

## 7. 対照ケース正典

- 同一戦争を両側から監査する場合、`warCase.counterpartCaseId` の相互参照で表現する。
- `validateCaseRegistry` は以下を検査する。
  - 相手ケースの実在
  - 双方向参照
  - 自己参照禁止
- 相手ケースが未実装の場合は `counterpartCaseId` を先に入れない。
- UI は軽量ボタン導線を基本とする。対比ビュー新設は大きな新機能として凍結中。

---

## 8. cache-busting 正典

ES Modules の `?v=` クエリは、以下を同一文字列に揃える。

```text
index.html
app.js
data/cases/index.js
ui/renderers.js
verify.js（検証ヘルパが import 文字列を持つ場合）
```

ズレると同一モジュールが別 URL として二重ロードされ、状態分裂を起こす。

---

## 9. 方法論 lint 正典

`lintCaseMethodology` は監査品質を守るための常設検査である。

検査すべきもの:

- 全 evidenceLink の `claimId` / `assessmentCellId` 紐付け。
- `unlinked_claim`: 支持0・反証0・保留0。
- `one_sided_claim`: 支持あり・反証なし。
- `unsupported_claim`: 支持なし・反証あり。
- `knownByDecisionMakers` と `knownByDecisionMakersBasis` の存在。

`one_sided_claim` はノイズではなく方法論 TODO として扱う。

---

## 10. 確定した設計判断（蒸し返さない）

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
- **H（対照ケース設計）**: 同一戦争を加害側/連合側の両面から監査する「対照ケース」は `warCase.counterpartCaseId` の**相互（双方向）参照**で表現。`validateCaseRegistry` が実在・双方向・自己参照禁止を検査。UI 導線（I-9）は**軽量ボタン導線を 2-NEW-H で実装**（counterpart 実在時のみサイドバーに表示、`setActiveCase` で双方向切替）。対比ビュー新設のみ凍結維持。
- **I（skeleton ケースの扱い）**: skeleton 段階のケースに対しては「証拠数を増やす系の指摘（反証リンク追加・セル新設・evidenceBasis 補充）はオミット」が方針。証拠未収集セルは `provisional:true`＋`noEvidenceReason` で**誠実に暫定**と明示する（確定評価に変換しない）。証拠量に依存しない構造・コード・ラベリングの是正のみ先行。
- **J（conflict グルーピング）**: ケースセレクタの戦争単位グルーピングは `warCase.conflict` フィールド（データ駆動）で行う。ケース名の文字列分割はア軍ケース名が陣営サフィックス無しで脆弱なため不採用。
- **K（cache-busting）**: ESM の `?v=` クエリは **app.js / index.html / data/cases/index.js / ui/renderers.js の4箇所で同一文字列**に揃える（renderers.js 冒頭にコメント常設）。ズレると同一モジュールが別URLで二重ロードされ状態分裂。静的importはテンプレートリテラル不可ゆえ定数集約はビルド無しでは不能＝手動同期が前提。現行は `20260627-phaseb-coalition`（検証ヘルパ `verify.js` の import 文字列も同期対象に含める＝実質5箇所）。
- **L（連合側 正統性の二層化）**: 連合側の正統性は **国際的正統性（国連決議・連合形成＝強い）とホスト国正統性（サウジ駐留の宗教政治＝同時代に係争的）を別軸**として扱う。サウジ駐留正統性は `gwc_pw_basing_legitimacy`＝高×形跡あり（撤退条件付きファトワ取得＝中枢が係争性を認識し管理した形跡）で `要検証`（最低懸念）。`GWC-EL-019` は正統性claimへの批判方向反証。長期ブローバック（1996/2001）は **ex-post ＝射程外**（第3原則）。決議678の授権は「地域の平和と安全の回復」まで広範＝目的のクウェート解放への限定は**法的天井でなく政治的選択**（`GWC-EL-020`）。サフワンのヘリ容認は**機密解除トランスクリプト主導**で扱い回想録単独依拠を脱した（ただし所蔵アーカイブID未特定＝R-2 残課題）。
- **M（skeleton Pre-War の `形跡なし` 規律）**: Pre-War の `actuallyEvaluated:"形跡なし"` は**証拠で「評価痕跡なし」を裏づけた場合のみ**用いる。証拠未収集なら `"不明"`＋`noEvidenceReason:"証拠未収集"`（russia流）にする。`resolveStatus` は `形跡なし` で provisional override を自動発火させるため（`auditSchema.js:51`）、未精査のまま `形跡なし` を置くと校正αの 高×形跡なし→重大懸念 を黙って降格させる＝I-3 の non-honesty 違反。`exAnteEvaluability` は `高/中/低` のみ（`低〜中` 等は enum ガードγで黙って要検証に落ちるので不可）。
- **N（claim type の極性）**: 能力肯定（監査対象が X をうまくやった）の命題は `counter_claim`（免責側）、懸念・失敗の命題は `audit_issue`（訴追側）。連合側 `gwc_claim_legitimacy`（能力肯定＝counter_claim）が先行例。勝者側ケースでも audit_issue と counter_claim を両方持つのが健全（prussia は当初 能力肯定を全て audit_issue にしていた＝AUD-2 で是正し、長期化・併合コストの訴追 claim を新設して両建て化）。

---
