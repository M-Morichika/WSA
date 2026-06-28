# CANON.md — War Accountability Audit 正典（圧縮版）

最終再編成: 2026-06-28（運用文書と詳細仕様を分離。内容は削除せず `docs/METHOD_APPENDIX.md` と `docs/archive/` に退避）
前身: 2026-06-27 版 CANON（全文は `docs/archive/CANON.pre-reorg.md`）

## 0. このファイルの役割

ここには **必ず守る短い正典だけ** を置く。

- 詳細仕様・導入候補・プロトタイプ・確定設計判断ログ → `docs/METHOD_APPENDIX.md`
- 現在状態・検証状態・次作業 → `HANDOFF.md`
- いつ何を決めたか → `HISTORY.md`

**昇格規律（今回追加）**: CANON に新規仕様候補を直接書かない。新規候補はまず METHOD_APPENDIX に置き、**複数ケースで必要性が確認されたものだけ** CANON へ昇格する。

---

## 1. 中核思想と監査3原則

- 「継戦能力版ソブリン格付け」=「戦争責任監査」の Web アプリ。実装は vanilla JS / ES Modules。
- 価値は題材ではなく **転用可能な監査の作法** にある。方法論的には ACH（競合仮説分析）/ 構造化分析技法に相当。
- 設計思想: 開戦前に、その時点で利用可能な情報だけを使って継戦能力・勝算・社会耐久力・政権リスクを記録し、戦後に説明責任と歴史判断を検証できるようにする。

**監査3原則（最重要・不可侵）**

1. 反証証拠を隠さない。
2. 言えること `canSay` と言えないこと `cannotSay` を分ける。
3. 開戦後の証拠を、開戦前判断の直接証拠にしない。

（背景思想 Theory of Change の全文は METHOD_APPENDIX §A。）

---

## 2. アーキテクチャ正典

### ファイル責務

```text
index.html        サイドバー、ケースセレクタ、ビュー切替タブ
app.js            エントリ、ケース読込、state 管理、イベント、ケース切替、対照ケース導線
data/auditSchema.js  共通ロジック（status 導出、証拠フィルタ、参照整合性、方法論 lint）
data/cases/index.js  ケースレジストリ
data/cases/*.js   各ケースデータ本体（app.js に巨大データを戻さない）
ui/renderers.js   ケース非依存レンダラ createRenderers(caseData, state)
styles.css        UI スタイル
```

### UI 6ビュー（基本単位）

```text
Overview / Timeline / Pre-War / Assessment / Evidence / Audit Opinion
```

ケース追加時は **原則 UI を変更せず**、既存レンダラに載るデータ構造で実装する。

---

## 3. ケースデータ構造正典

```js
export const someCase = {
  warCase: { id, conflict, name, auditedActor, opponentActor, scope,
             primaryResponsibility, uncertainty, rating,
             counterpartCaseId /* 実装済み相手ケースがある場合のみ */ },
  overviewOpinion, issues, counterHypotheses, phases, preWarChecklist,
  hypothesisTracking, assessmentCells, evidence, claims, evidenceLinks, ratingBasis,
};
```

### evidenceLink で必ず分離する概念

```text
id / evidenceId / claimId / assessmentCellId
relationship: 支持 / 反証 / 保留
timeFit / availableAtDecisionTime / availableToAnalysts
knownByDecisionMakers / knownByDecisionMakersBasis
canSay / cannotSay
```

### 時点性の三層（混同しない）

- `availableAtDecisionTime`: 意思決定者に入手可能だったか。
- `availableToAnalysts`: 外部分析者が当時入手可能だったか。
- `knownByDecisionMakers`: 中枢が認識していたか。

機密解除文書は `availableAtDecisionTime: true` かつ `availableToAnalysts: false` がありうる。

---

## 4. 命名規則

- ケース ID: `<conflict-slug>-<year-or-period>-<actor>`（例 `falklands-1982-argentina`）。
- ID 名前空間: ケースごとに接頭辞を分け横断衝突を避ける（例 `gw_`/`GW-`、`gwc_`/`GWC-`、`ruu_`/`RUU-`）。全対応表は METHOD_APPENDIX §B。
- claim 極性: 能力肯定・免責側 = `counter_claim`、懸念・失敗・訴追側 = `audit_issue`。**勝者側ケースでも両方を持つ**。

---

## 5. Pre-War / status 規律

- status は **データ保存せず `resolveStatus` が実行時導出**。Pre-War マトリクスは derived のみで配置・着色、override は注釈バッジの別レイヤー。
- 重大懸念は **評価可能性 高 × 評価形跡なし** のみに限定。「評価したが妥当でなかった」軸は追加しない（1軸に意図的に留める）。
- `exAnteEvaluability` は **高 / 中 / 低** のみ（`低〜中` 等は不可。enum ガードで黙って降格する）。
- **`不明` と `形跡なし` を厳密に区別する**。`不明` = 証拠未収集／内部資料未公開／確認不能。`形跡なし` = 調査した範囲で検討形跡が見つからない。
- `actuallyEvaluated: "形跡なし"` は、証拠探索が **主要資料確認済み以上** の場合に限る。証拠未収集なら `"不明"` + `noEvidenceReason: "証拠未収集"`。
- skeleton ケースは原則 `不明` を使い、未収集を `形跡なし` に変換しない（黙って重大懸念を降格させない）。

（形跡の5段階詳細定義・`evidenceSearchState`・`強い形跡あり` の扱いは導入候補。METHOD_APPENDIX §C。）

---

## 6. rating 規律

- 総合 rating は **当面は自動算出しない**。`warCase.rating` を編集判断として保持する。
- 精密な加重平均より先に、致命的欠落を rating 上限とする **ノックアウト基準を優先** する。
- rating を置く場合、最低限：算入セル／除外セル／除外理由（ex-post・証拠未収集・別ケース境界・scope 外）／ノックアウト該当の有無／自動算出か編集判断か、を説明する。`ratingBasisExclusions` がある場合は Audit Opinion に表示。
- 加重平均は将来導入しても **補助指標** に留め、ノックアウト欠陥を平均点で相殺しない／証拠未収集セルを 0 点や中間点で機械処理しない／編集判断を自動算出に見せない。

（`ratingRules` / `knockoutCriteria` / `weightedScore` のスキーマは導入候補。METHOD_APPENDIX §D。）

---

## 7. 対照ケース正典

- 同一戦争を両側から監査する場合、`warCase.counterpartCaseId` の **相互（双方向）参照** で表現。
- `validateCaseRegistry` が「相手ケース実在・双方向・自己参照禁止」を検査。
- 相手ケースが未実装の場合は `counterpartCaseId` を先に入れない。
- UI は軽量ボタン導線を基本とする。**対比ビュー新設は凍結中**。

---

## 8. cache-busting 正典

ES Modules の `?v=` クエリは、以下を **同一文字列** に揃える。

```text
index.html / app.js / data/cases/index.js / ui/renderers.js / verify.js（import 文字列を持つ場合）
```

ズレると同一モジュールが別 URL で二重ロードされ状態分裂する。静的 import はテンプレートリテラル不可ゆえ手動同期が前提。

---

## 9. 方法論 lint 正典

`lintCaseMethodology` は監査品質を守る常設検査。検査対象：

- 全 evidenceLink の `claimId` / `assessmentCellId` 紐付け。
- `unlinked_claim`（支持0・反証0・保留0）／`one_sided_claim`（支持あり・反証なし）／`unsupported_claim`（支持なし・反証あり）。
- `knownByDecisionMakers` と `knownByDecisionMakersBasis` の存在。

`one_sided_claim` はノイズではなく **方法論 TODO** として扱う。

---

## 10. 確定設計判断（蒸し返さない）

確定済みで再議論しない設計判断 A〜N（regime_survival override / status 単一情報源 / 校正α・β / 連合側正統性二層化 / claim 極性 ほか）は **METHOD_APPENDIX §F に全文保存**。要点のみ：

- 重大懸念は「高 × 形跡なし」限定（校正α）、「評価したが妥当でなかった」軸は足さない（校正β）。これらは不変。
- status はデータ非保存・`resolveStatus` 単一情報源。
- 対照ケースは双方向参照、対比ビュー新設のみ凍結。
- 上記 A〜N に抵触する変更は行わない。

---

## 11. 導入順の正典

評価語彙が安定しないまま重み付け・依存関係を導入すると擬似精密化になる。導入順は固定：

```text
Phase A: 「形跡」の段階的定義
Phase B: ノックアウト基準・重み付けの明示
Phase C: 依存関係マトリクス / フローチャート
```

各 Phase の詳細スキーマ・候補は METHOD_APPENDIX。
