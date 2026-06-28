# docs/HISTORY.md

# Automotive Strategy Accountability Audit — History

最終更新: 2026-06-27

---

## 0. このファイルの目的

このファイルは、**Automotive Strategy Accountability Audit** の履歴を記録する。

正典資料は以下。

```text
docs/CANON.md
```

現在状態と次作業は以下。

```text
HANDOFF.md
```

この `HISTORY.md` には、作業の由来、設計判断、旧 War Accountability Audit から継承した要素、企業ケースとしての分岐経緯を書く。

---

## 1. H-001: 旧 War Accountability Audit からの分岐

旧プロジェクトは、戦争責任監査を目的とする Web アプリだった。

中核思想は以下だった。

```text
開戦前に、その時点で利用可能だった情報だけを使って、
継戦能力・勝算・社会耐久力・政権リスクを記録し、
戦後に為政者の説明責任と歴史判断を検証できるようにする。
```

この思想を企業戦略監査へ転用することを決定した。

読み替え。

```text
戦争責任監査
→ 企業巨大戦略監査

開戦判断
→ 戦略転換・巨額投資・事業ポートフォリオ転換の判断

継戦能力
→ 投資継続能力・収益耐久力・供給網・開発組織

勝算
→ 市場競争力・技術実行力・規制適応力

政権リスク
→ 経営陣・取締役会・株主・資本市場・組織内部のガバナンスリスク
```

---

## 2. H-002: 企業戦略監査版の初期対象をEVシフトに決定

企業戦略監査の初期対象として、自動車産業のEVシフトを選んだ。

理由。

```text
- 巨額投資を伴う
- 市場需要の不確実性が高い
- 規制・政策依存が大きい
- 電池・ソフトウェア・供給網の制約がある
- 企業ごとの戦略差が明確
- 公開資料が比較的豊富
- ただし内部意思決定資料は入手困難
```

初期 conflict。

```js
"自動車産業EVシフト（2020年代）"
```

---

## 3. H-003: Toyota / Honda 対照ケース構造を採用

初期ケースとして以下2件を採用した。

```text
主ケース:
Toyota Multi-Pathway Strategy 2021–

対照ケース:
Honda EV Concentration Strategy 2021–
```

対比の中心。

```text
Toyota:
HEV / PHEV / BEV / FCEV / 水素 / 内燃機関改良を併存させる multi-pathway 戦略。

Honda:
EV / FCEV への明確な移行目標を掲げる集中度の高い電動化戦略。
```

この対比は、勝者・敗者の対比ではない。

正しい位置づけ。

```text
同一産業ショックに対する異なる資本配分仮説の対照。
```

---

## 4. H-004: Honda単独ケースではなくToyota主ケースを優先

当初、HondaのEV戦略失敗評価が候補になった。

ただし、Honda単独では後知恵評価に寄りやすい。

問題。

```text
- GM提携中止
- EV戦略再評価
- 損失認識
- 2030年目標の下方修正
```

これらは事後対照として重要だが、2021年判断の直接証拠にはならない。

そのため、Toyotaを主ケース、Hondaを対照ケースとした。

理由。

```text
- Toyotaは現在進行形の戦略監査に向く
- Hondaは事後的な戦略再評価ケースとして対照性が高い
- 「Toyota正解 / Honda失敗」ではなく、両者の仮説を比較できる
- ビジネス読者に、監査フレームの価値を示しやすい
```

---

## 5. H-005: I-9 軽量ボタン導線を企業ケースに転用

旧 War Accountability Audit では、`counterpartCaseId` による対照ケース導線が実装済みだった。

企業版でもこれを利用する。

方針。

```text
- 新規 Compare ビューは初期実装では作らない
- 既存の counterpart ボタンで相互に切り替える
- Toyota の Assessment を見ながら Honda 側へ反転できる
- Honda の Assessment を見ながら Toyota 側へ反転できる
```

企業ケースでは、将来的にUI文言を以下へ寄せる余地がある。

```text
⇄ 対照戦略を見る
⇄ Honda EV集中戦略を見る
⇄ Toyota multi-pathway戦略を見る
```

ただし初期実装では既存UIを優先する。

---

## 6. H-006: 3ファイル構成を採用

旧 `HANDOFF.md` は以下が混在していた。

```text
- 正典思想
- 現在構成
- 実装履歴
- 未了タスク
- 次セッション手順
```

これにより、再開時に「今やること」が埋もれる問題があった。

企業版では以下の3ファイル構成に分けることを決定した。

```text
HANDOFF.md
  現在状態と次の具体的手順のみ。

docs/CANON.md
  正典資料。設計思想、監査原則、データ構造、命名規則。

docs/HISTORY.md
  履歴。決定経緯、旧スキームからの継承、作業記録。
```

---

## 7. H-007: クリーンフォルダ方針を採用

企業版は、旧戦争ケースを含む既存リポジトリへ直接追加するのではなく、クリーンフォルダで開始する方針とした。

コピーするもの。

```text
index.html
app.js
styles.css
verify.js
data/auditSchema.js
data/cases/index.js
ui/renderers.js
```

コピーしないもの。

```text
既存の戦争ケースファイル
旧 HANDOFF.md
```

理由。

```text
- 戦争ケースと企業ケースを混在させない
- 初期ケースを Toyota / Honda の2本に限定する
- 既存スキームだけを利用する
- データと履歴のノイズを減らす
```

必要なら旧 `HANDOFF.md` は以下に退避する。

```text
docs/REFERENCE_WAR_HANDOFF.md
```

---

## 8. H-008: UI名称は初期実装では変更しない

旧UIには以下の6タブがある。

```text
Overview
Timeline
Pre-War
Assessment
Evidence
Audit Opinion
```

企業版でも初期実装では変更しない。

理由。

```text
- 既存レンダラをそのまま使える
- UI変更による副作用を避ける
- まずケースデータの成立性を確認する
```

読み替えは `docs/CANON.md` に記録する。

```text
Pre-War = 戦略表明前・大規模投資前チェック
warCase = strategyCase
opponentActor = counterpart strategy actor
```

---

## 9. H-009: 初期 rating は未確定とする

Toyota / Honda とも、初期 rating は未確定とする。

理由。

```text
- 2030年前後の成否が未確定
- EVシフトは現在進行中
- 後年結果を2021年判断の直接証拠にできない
- 企業内部資料が公開されていない
- 両ケースとも合理的仮説と監査上の懸念が併存する
```

初期結論。

```text
Toyota:
合理的なリアルオプション戦略仮説と、
BEV・SDV転換遅れ仮説の双方が成立する。

Honda:
合理的な先行コミットメント仮説と、
EV需要・提携依存・実行能力の過大評価仮説の双方が成立する。
```

---

## 10. H-010: 後知恵禁止ルールを企業ケース用に明文化

企業ケースでは、後年資料が豊富であるため、後知恵評価に流れやすい。

以下を直接根拠にしない。

```text
2025年以降のHonda戦略再評価
2026年以降の損失認識
GM共同開発中止
Toyotaの後年販売実績
HEV好調
BEV比率の低さ
将来の2030年目標達成/未達
```

これらは以下として扱う。

```text
事後対照
検証資料
当初仮説の帰結を考える材料
```

2021年判断の直接証拠にはしない。

---

## 11. H-011: 企業内部資料不足の表現を決定

企業ケースでは、内部資料が通常公開されない。

そのため、以下の表現を採用する。

```text
公開資料上、評価形跡を確認できない。
内部で検討されていなかったとは断定できない。
```

禁止表現。

```text
内部評価なし
取締役会が検討していなかった
経営陣は何も考えていなかった
どんぶり勘定だった
```

これらは内部資料がない限り断定しない。

---

## 12. H-012: 初期 phases を決定

両ケース同型で以下4フェーズに決定した。

```text
Phase 1:
EVシフト認識・戦略表明

Phase 2:
電池・SDV・提携・供給網設計

Phase 3:
需要変化・競争激化・戦略修正

Phase 4:
長期競争力・別ケース境界
```

目的。

```text
Toyota / Honda のAssessment Matrixを同じ局面で比較できるようにする。
```

---

## 13. H-013: 初期 Pre-War Checklist を決定

企業ケースでは6項目に圧縮した。

```text
market_demand_forecast
regulatory_infrastructure_risk
battery_supply_cost
sdv_software_capability
capital_allocation_resilience
governance_disclosure_process
```

狙い。

```text
- 市場
- 規制
- 電池
- ソフトウェア
- 資本配分
- ガバナンス
```

を最小限で押さえる。

---

## 14. H-014: 初期 Assessment 軸を決定

初期Assessment軸は7つ。

```text
1. 市場需要・地域差の見積もり
2. 規制・インフラ・政策依存の見積もり
3. 電池・供給網・コストの見積もり
4. SDV・ソフトウェア競争の認識
5. 資本配分・収益耐久力
6. 提携・外部依存・実行能力
7. ガバナンス・説明責任・修正基準
```

疎マトリクスを前提にする。

全セルを埋める必要はない。

---

## 15. H-015: Toyota claims を決定

Toyota側の初期 claims は以下7件。

```text
toy_claim_multi_pathway_as_real_option
toy_claim_hybrid_profit_funded_transition
toy_claim_regional_demand_correctly_segmented
toy_claim_bev_sdv_delay_risk
toy_claim_china_competition_underestimated
toy_claim_solid_state_expectation_risk
toy_claim_strategy_outcome_unresolved
```

分類。

```text
counter_claim: 4
audit_issue: 3
```

狙い。

```text
Toyota擁護:
multi-pathwayはリアルオプション戦略。

Toyota批判:
multi-pathwayはBEV/SDV遅れのレトリックだった可能性。
```

---

## 16. H-016: Honda claims を決定

Honda側の初期 claims は以下7件。

```text
hon_claim_ev_concentration_as_forward_commitment
hon_claim_external_alliance_as_capability_bridge
hon_claim_ev_demand_profitability_overestimated
hon_claim_alliance_dependency_underestimated
hon_claim_sdv_battery_execution_gap
hon_claim_reassessment_not_simple_failure
hon_claim_internal_documents_unavailable
```

分類。

```text
counter_claim: 4
audit_issue: 3
```

狙い。

```text
Honda擁護:
EV/FCEV集中は合理的な先行コミットメント。

Honda批判:
需要・提携依存・実行能力の過大評価があった可能性。
```

---

## 17. H-017: 初期 evidence 方針を決定

Toyota / Honda とも、初期 evidence は8件前後に抑える。

分類。

```text
直接資料:
企業公式発表、事業説明、統合報告書、決算説明。

同時代外部資料:
IEA、BloombergNEF、ACEA、業界報道など。

事後資料:
販売実績、戦略再評価、提携中止、損失認識。
```

ただし、事後資料は2021年判断の直接根拠にしない。

---

## 18. H-018: cache-busting 方針を決定

初期 cache-busting 文字列は以下。

```text
20260627-auto-ev-shift
```

対象。

```text
index.html
app.js
data/cases/index.js
ui/renderers.js
```

旧プロジェクトで問題になった二重ロードを避けるため、必ず同期する。

---

## 19. H-019: 検証手順を継承

旧プロジェクトの検証手順を企業版にも継承する。

必須。

```bash
node --check app.js
node --check data/auditSchema.js
node --check data/cases/index.js
node --check data/cases/toyota-multi-pathway-2021.js
node --check data/cases/honda-ev-concentration-2021.js
node --check ui/renderers.js
node verify.js
```

確認対象。

```text
validateCaseRegistry(cases) === []
validateCaseReferences(caseData) === []
lintCaseMethodology(caseData) === []
```

---

## 20. H-020: 今後の候補

初期実装後の候補。

```text
1. Compare ビュー新設
2. UI文言を企業ケース向けに変更
3. Pre-War タブ名を Strategy Readiness 等に変更
4. Toyota / Honda の evidence 出典精密化
5. 2021年時点の市場予測・電池価格予測のWeb調査
6. 公式資料に基づく evidenceLinks 強化
7. 企業ケース用 rating taxonomy の検討
8. 自動車以外の企業戦略ケース追加
```

ただし、初期実装では手を広げない。

---

## 21. H-021: 凍結事項

初期実装では以下を凍結する。

```text
- Compare ビュー
- UIタブ名変更
- データ構造名 warCase の改名
- 既存レンダラの大幅改修
- rating 確定
- 2030年以降の勝敗予測
- 各車種単位の詳細評価
- 個別サプライヤー契約の採算監査
```

---

## 22. H-022: 初期実装の完了条件

初期実装完了条件。

```text
- Toyota case file が存在する
- Honda case file が存在する
- data/cases/index.js が2ケースのみ登録
- DEFAULT_CASE_ID が toyota-multi-pathway-2021
- counterpartCaseId が双方向
- node --check が通る
- node verify.js が通る
- ブラウザで6タブ表示が崩れない
- counterpart button が双方向に動く
- console error / warning が 0
```

---

## 23. H-023: 旧戦争監査との関係

企業版は、旧 War Accountability Audit を否定するものではない。

関係。

```text
War Accountability Audit:
極限状態の国家意思決定監査。

Automotive Strategy Accountability Audit:
企業の巨大戦略判断監査。
```

共通するもの。

```text
- 反証を隠さない
- canSay / cannotSay
- ex-ante / ex-post
- evidenceLinks
- claims
- assessmentCells
- ratingBasis
- counterpartCaseId
- lintCaseMethodology
```

異なるもの。

```text
- 対象が国家ではなく企業
- 相手は敵ではなく対照戦略
- Pre-War は戦略表明前チェック
- 政権リスクはガバナンスリスク
- 戦争責任ではなく経営判断責任
```

---

## 24. H-024: 現時点の最終判断

現時点の設計判断。

```text
3ファイル構成を採用する。

HANDOFF.md:
現在状態と次作業。

docs/CANON.md:
正典資料。

docs/HISTORY.md:
履歴。
```

この構成により、次セッションやCodexが旧 `HANDOFF.md` の長大な履歴に引きずられず、企業戦略監査のクリーン実装を開始できる。

---

## 25. H-025: 評価ルーブリック導入方針を追加

今後のブラッシュアップに向けて、以下3つの考え方を導入する方針とした。

```text
1. 「形跡」の段階的定義
2. 依存関係の表現
3. 総合ランク算出の透明化
```

ただし、導入順は調整した。

当初案。

```text
- 形跡の段階的定義
- 依存関係のマトリクス化
- 加重平均・プライオリティ制
```

採用した導入順。

```text
Phase A:
形跡レベル E0〜E4

Phase B:
ratingReadiness と KO基準

Phase C:
dependencyRules

Phase D:
scorePrototype
```

理由。

```text
加重平均を先に導入すると、証拠が薄い段階でも数値だけが一人歩きする。
そのため、まず「格付け可能な証拠状態か」を ratingReadiness で判定し、KO基準で後知恵依存や反証欠落を排除する。
```

---

## 26. H-026: 形跡レベル E0〜E4 を定義

公開資料上の評価形跡を E0〜E4 で表す方針とした。

```text
E0:
公開資料上、評価形跡を確認できない。

E1:
関連語彙はあるが、具体的な下方シナリオや撤退基準がない。

E2:
リスク認識や対応方針はあるが、数値・時期・責任主体・代替案が限定的。

E3:
リスク、対応策、資本配分、代替シナリオの一部が確認できる。

E4:
複数資料により、リスク認識・代替案・実行計画・修正基準が確認できる。
```

重要な留保。

```text
Eレベルは「内部で本当に検討したか」の断定ではない。
企業ケースでは、公開監査上の確認可能性を表す。
```

---

## 27. H-027: ratingReadiness と KO基準を採用

rating をすぐ確定せず、まず ratingReadiness を判定する方針とした。

```text
未到達:
rating 確定不可。

限定的:
暫定 rating は可能だが、留保条件を明記。

到達:
ratingBasis の主要セルが接地し、反証リンクもある。
```

ノックアウト基準。

```text
KO-1: 後知恵依存
KO-2: 反証欠落
KO-3: 内部資料不足の断定
KO-4: 主要リスク未評価
KO-5: canSay / cannotSay 欠落
KO-6: counterpart 非対称
KO-7: 時点性混同
```

---

## 28. H-028: dependencyRules を仕様候補に追加

項目間の依存関係を表すため、`dependencyRules` を仕様候補として追加した。

目的。

```text
市場需要、電池、SDV、提携依存、資本配分などを独立評価だけでなく、複合リスクとして扱えるようにする。
```

初期実装では UI 化しない。まずケースデータ上の任意フィールドとして扱う。

---

## 29. H-029: scorePrototype は説明補助に限定

加重平均スコアは、rating の自動算出ではなく説明補助とする方針にした。

原則。

```text
ratingReadiness が未到達
→ score を表示しない、または prototype と明示。

KO基準に該当
→ score が高くても rating を上げない。

score
→ rating の理由を説明する補助であり、自動格付けではない。
```

この判断により、疑似客観性を避けつつ、将来的な説明力を確保する。

## 30. H-030: 第三者評価を受けた認識論的骨格の強化

実装後のAIによる第三者評価で、フレームワークの有用性は高いが、実装依存の課題があると評価された。

評価された強み。

```text
- ex-ante 制約の厳守
- 後知恵バイアスへの明示的対抗
- 7タブ構造による時系列・反証構造の可視化
```

指摘された主な弱点。

```text
1. 「利用可能な情報」の境界問題
2. リスク軸間の相互作用問題
3. 「未確定」の認識論的地位
4. 反証証拠を隠さないための運用担保
5. 利用文脈の不明確さ
```

この評価を受け、CANON / HANDOFF / HISTORY に認識論的骨格の強化項目を追加する方針とした。

---

## 31. H-031: evidenceAccessScope を追加

「公開情報のみを扱うのか、内部資料を含むのか」が曖昧だという批判に対応するため、`evidenceAccessScope` を追加する方針とした。

採用する監査モード。

```text
public_osint:
公開資料・同時代報道・公開市場データのみ。

internal_available:
社内資料・取締役会資料・投資審査資料を含む。

retrospective_reconstruction:
後年資料・回顧・報道を使った再構成。
```

初期 Toyota / Honda ケースは `public_osint` とする。

---

## 32. H-032: evidenceWeight と uncertaintyReason を追加

証拠の重み付けと、未確定理由の明示が必要と判断した。

`evidenceWeight` では以下を扱う。

```text
sourceProximity
temporalFit
independence
decisionMakerAccess
weight
rationale
```

`uncertaintyReason` では以下を扱う。

```text
case_not_selected
evidence_insufficient
evidence_conflicting
internal_documents_unavailable
outcome_not_mature
scope_boundary_unresolved
methodology_under_revision
```

Toyota / Honda の初期値は以下。

```js
uncertaintyReason: [
  "internal_documents_unavailable",
  "outcome_not_mature",
  "evidence_conflicting",
]
```

---

## 33. H-033: adversarialReview を追加

「反証証拠を隠さない」を運用として担保するため、`adversarialReview` を追加する方針とした。

構造。

```text
prosecution:
監査上の懸念・批判側の最強主張。

defense:
当該戦略を擁護する最強主張。

unresolvedTensions:
現時点で決着できない論点。
```

これにより、単に evidenceLinks に反証を持つだけでなく、批判側・擁護側の最強主張を監査意見に接続できるようにする。

---

## 34. H-034: intendedUse を追加

利用文脈が曖昧だという批判に対応するため、`intendedUse` を追加する方針とした。

初期 Toyota / Honda ケースの標準値。

```js
intendedUse: {
  primary: "research_case_study",
  secondary: [
    "strategy_training",
    "investor_due_diligence",
  ],
  notFor: [
    "legal_liability_determination",
    "investment_recommendation",
    "definitive_management_blame",
  ],
}
```

この指定により、本ツールは法的責任認定、投資推奨、経営者個人の断罪を目的としないことを明示する。

---

## 35. H-035: 次回実装優先順位を決定

次回のケースデータ更新では、以下の順で追加する。

```text
1. evidenceAccessScope
2. uncertaintyReason
3. intendedUse
4. evidenceWeight
5. adversarialReview
```

理由。

```text
evidenceAccessScope と uncertaintyReason は、第三者評価が指摘した認識論的曖昧さを最も直接的に解消する。
evidenceWeight と adversarialReview は重要だが、既存 evidenceLinks との接続設計が必要なため第2段階とする。
intendedUse はUIへの表示がなくても、ケースメタ情報としてすぐ追加できる。
```
