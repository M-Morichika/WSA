# HISTORY.md — 決定・実装・凍結の履歴

最終再編成: 2026-06-27  
最終更新: 2026-06-27（ブラッシュアップ方針: 形跡定義 / rating 透明化 / 依存関係表現を反映）  
由来: `HANDOFF(3).md` から、いつ何を決めたか、何を実装したか、何を凍結したかを保存。

## 0. このファイルの目的

このファイルは、現在の形になった理由を追跡するための履歴である。

恒久原則は `CANON.md`、次作業は `HANDOFF.md` を参照する。

---


## 0A. 2026-06-27: ブラッシュアップ方針の正典化

ユーザー提案に基づき、今後の監査フレームワーク強化として以下3点を段階導入する方針を採用した。

### 決定内容

1. **「形跡」の段階的定義**
   - `actuallyEvaluated` の「形跡あり / 限定的 / 不明 / 形跡なし」を、客観的な条件分岐に近づける。
   - `不明` と `形跡なし` を厳密に分ける。
   - `形跡なし` は、証拠未収集ではなく、調査した範囲で検討形跡が見つからない場合に限る。
   - 導入候補として `evidenceSearchState` を定義する。

2. **rating 算出の透明化**
   - 総合 rating は当面自動算出しない。
   - 加重平均より先に、致命的欠落を rating 上限として扱う `knockoutCriteria` を導入候補とする。
   - `ratingBasis`、`ratingBasisExclusions`、`ratingNote` に加えて、将来的に `ratingRules` を使う。

3. **依存関係の表現**
   - 独立項目の羅列ではなく、複合リスクの連動性を `dependencyRules` として表現する。
   - 初期導入では UI を変更せず、データと Audit Opinion の文章表示から始める。
   - 2軸マトリクスやフローチャートは、データ構造が安定してから検討する。

### 採用した導入順

```text
Phase A: 「形跡」の段階的定義
Phase B: ノックアウト基準・重み付けの明示
Phase C: 依存関係マトリクス / フローチャート
```

### 理由

評価語彙が安定しないまま重み付けや依存関係を導入すると、透明性ではなく擬似精密化になるため。まず `actuallyEvaluated` と証拠探索状態の規律を固め、次に rating 説明、最後に複合リスク表現へ進む。

### 反映先

- `CANON.md`: `6A. 監査ラベル判定基準 正典`、`6B. rating 透明化 正典`、`6C. 複合リスク・依存関係 正典` を追加。
- `HANDOFF.md`: `5A. 次のブラッシュアップ導入計画` を追加。
- `HISTORY.md`: 本項目として決定履歴を追加。

---


## 1. 直近セッションで完了したこと

### 2-NEW-P. 仏 france ケース 証拠出所の ex-ante 一次資料接地と格付け是正（本セッション・未コミット）
> 次セッション計画で提起されていた優先順位1位「仏ケースの訴追側一次接地」を完了。また不適切にD+/Dとされていた格付けラベルを本来の「未確定」に復旧した。
- `FPW-E-006`（同盟外交失敗）、`FPW-E-007`（バゼーヌ救援強行電報）、`FPW-E-008`（グラモン escalation）の `source` を、それぞれ『Les origines diplomatiques de la guerre de 1870-1871』『Enquête parlementaire sur les actes du gouvernement de la Défense nationale』『Ma mission en Prusse』などの具体的な公刊一次資料へと精密化し、`type` を `公刊一次資料` に更新した。
- その他 `FPW-E-003`, `004a`, `004b`, `005` についても `type` を `同時代公開資料`、`議会記録`、`回顧録`、`公刊一次資料` に細分化した。
- 一次資料接地による証拠強度強化を受け、`fpw_cell_diplomacy_crisis`、`fpw_cell_regime_crisis`、`fpw_cell_sedan_decision` の `evidenceStrength` を `中` から `中〜強` に格上げした（Prussia ケースと同型）。
- 不適切に `D+/D` に変更されていた `rating` と `ratingNote` を、普ケースと同様の `未確定` 状態（skeleton段階・編集判断による保留）に復旧させた。
- cache-bust 全箇所を `20260627-fpw-france-grounding` に更新。検証：`node verify.js` 全8ケース0エラーを確認済み。


### 2-NEW-Q. ウクライナ戦争 Ukraine 側 skeleton 追加レビュー M-1〜M-5/M-7 反映（本セッション・未コミット）
> 統合優先度表（M-1〜M-7）を検討し、時点性・UI上の誠実な但し書き・関係バッジの色衝突を修正。M-6（Assessment軸の集約）はデータ構造設計に踏み込むため凍結し、別作業候補として残した。
- **M-1**: `ruu_pw_negotiation_and_escalation_risk` は ex-post リンク `RUU-EL-016/017/018/019` を評価形跡の根拠として表示しないよう、`linkedEvidenceLinks: []` に変更。`linkedCells` は別ケース境界 `ruu_cell_long_war_boundary` から `ruu_cell_negotiation_space` へ移し、evidenceBasis で「後知恵対照・一次資料収集待ち」と明記。
- **M-2**: `ratingNote` と Opinion の ratingBasis 表示に、4セルが証拠未収集/弱〜中であることを出すよう調整。`ratingBasisExclusions` を追加し、`ruu_cell_mobilization_cost` / `ruu_cell_negotiation_space` / `ruu_cell_long_war_boundary` の算入外理由を Opinion に表示。
- **M-3/M-5**: Evidence/Assessment の証拠関係バッジを status バッジから分離し、`relationshipBadge` と `timeBadge` を追加。反証を赤い重大懸念色で表示しないようにし、`availableAtDecisionTime:false` や「事後対照」リンクは専用の時点バッジで可視化。
- **M-4**: `ruu_cell_western_support` に、`RUU-EL-009/010` は初期支援環境の直接根拠、`RUU-EL-011/012` は後知恵対照で直接算入外と明記。`RUU-EL-009` は target/canSay を「依存確定」ではなく「初期支援環境」へ寄せた。
- **M-7**: ロシア側 Pre-War 5項目にも `nextEvidenceActionType: "collect_primary_source"` を付与し、Ukraine 側だけ証拠待ちアクションが見える非対称を解消。
- cache-bust は `20260627-ruu-time-caveats` に同期。検証: `node --check`（Ukraine/Russia/renderers/app）OK、`node verify.js` 全8ケース0、render smoke 全8ケース全ビュー OK。

### 2-NEW-K. エビデンスのラベル付けルール（lintCaseMethodology）強化（本セッション）
> 監査品質を担保するリントルール `lintCaseMethodology` の抜け漏れを解消し、より堅牢な構造へと強化。
- **全リンクの紐付け漏れチェック**: 従来は「反証」リンクに対してのみ行われていた `claimId` / `assessmentCellId` の紐付けチェックを、「支持」「保留」を含むすべてのリンクに拡大（浮きリンクの防止）。
- **クレームの対称性・生存性の検証（3パターンの分離）**: 片側のみのクレームや実体のないクレームをより詳細に検知するため、以下の3パターンに分類して警告を出力。
  - `unlinked_claim`（重大）: 支持0・反証0・保留0。完全に死蔵されているクレーム。
  - `one_sided_claim`（注意）: 支持1件以上・反証0。反証を隠さない原則の観点で対立検証が欠けている状態。
  - `unsupported_claim`（注意）: 支持0・反証1件以上。藁人形論法（誰も支持していない主張を叩く）や支持リンクの付け忘れの可能性。
- **サブエージェントレビューの反映**: 「保留」リンクのみを持つクレームが誤って `unlinked_claim` と判定される論理的な穴を、総リンク数（`totalLinks`）による判定へ是正。
- **意思決定者の認識ラベルの検証**: `knownByDecisionMakers` および `knownByDecisionMakersBasis` を必須テキストフィールドとしてバリデーションに追加。
- **検証結果**: `node verify.js` の実行により、Skeleton段階のケースにおいて `unsupported_claim` が正しく検知されること等を確認（データの意図的な未完成状態としてそのまま残置）。
> ✅ 2-NEW-A／2-NEW-B はコミット+push 済み（`19c28b1`, origin/master）。2-NEW-C（連合側ケース証拠増補＋再レビュー反映）も `610088a` でコミット+push 済み。正式作業リストの HANDOFF 更新は `ab3f6cd` でコミット+push 済み。
> ✅ **本セッション（前半）**: E-1/E-2/E-3 増補を `5ce393f`、証拠出典の一次資料精密化を `25c4b23`、サブエージェントレビュー後のラベリング/表示是正を `10851e9` で反映。
> ✅ **本セッション（後半・連合側深掘り精査）**: ①サウジ駐留正統性・②決議678広範性・③サフワン原記録化を `7e5d8d6`、HANDOFF反映を `ad6597b` で反映し **push 済み（origin/master と同期）**。
> ✅ **本セッション（④）**: CIA/DIA/CENTCOM の開戦前内部原見積もり本体を探索したが公開一次資料として特定できず。`GWC-E-013` / `GWC-EL-017` を「公刊再構成」であり「原見積もり本体ではない」と明確化＝`b680f2e` でコミット+push 済み。
> ✅ **本セッション（R-2）**: サフワン機密解除トランスクリプトの出所を特定（一次的開示 = Laurie Mylroie, WaPo 1992/6/28／再録 = Gordon & Trainor『The Generals' War』1995）。`GWC-E-012` の source/collectionState・`GWC-EL-016` 認識根拠に反映。残る隙間（DoD/NARA 文書管理番号）は狭い `要精査` として明記＝`a26926d` でコミット+push 済み。
> ✅ **本セッション（I-9/UI-8）**: I-9 対照ケース軽量ボタン導線＋ UI-8 一部（疎マトリクス未定義表示是正・aria-live 冗長解消）を `a4eaf06` でコミット+push 済み。
> ✅ **レビュー後ブラッシュアップ（push済み: `3e1f04b`）**: サブエージェントレビューを受け、HANDOFFの古い未同期記述を現状同期済みに修正。`GWC-E-012` は「原本確認」ではなく「公刊引用・再録で確認」に弱め、Pre-War の `gwc_pw_iraqi_capability` / `gwc_pw_ground_cost` から開戦後説明 `GWC-EL-010` を直接根拠として外した。`app.js` はケースセレクタ/対照導線を DOM API 化し、対照ケース切替後のフォーカス、`announce()` の再通知、Timeline/Evidence/Opinion/Assessment 移動の通知を補強。疎マトリクスの未評価セルは個別長文 aria-label をやめた。cache-bust は `20260626-review-brushup`。


### 2-NEW-L. ウクライナ戦争 ウクライナ／西側支援側 skeleton ケース追加（本セッション・未コミット）
> ロシア側の対照ケースとして `russo-ukrainian-war-2022-ukraine` を追加。既存 UI は変更せず、ケースレジストリと相互 `counterpartCaseId`、cache-busting を `20260627-ruu-ukraine` に同期。
- **新ケース方針**: ウクライナ政府・ゼレンスキー政権・ウクライナ軍を主対象とし、西側支援国は支援環境として扱う。侵略開始責任ではなく、防衛継続・首都防衛・国家動員・西側支援依存・長期抗戦化入口の判断を監査する。
- **構成**: phase4 / preWar5 / assessment cell7 / evidence10 / claim10 / evidenceLink22 / ratingBasis4。各 claim は支持・反証を最低1本ずつ持ち、`lintCaseMethodology` 0。
- **相互リンク**: ロシア側 `warCase.counterpartCaseId = "russo-ukrainian-war-2022-ukraine"`、ウクライナ側 `counterpartCaseId = "russo-ukrainian-war-2022-russia"`。
- **検証**: `node --check` 対象主要ファイル OK、`node verify.js` で全8ケース `validateCaseRegistry` 0 / `validateCaseReferences` 0 / `lintCaseMethodology` 0。renderer HTML 生成も Overview/Timeline/Pre-War/Assessment/Evidence/Opinion 全ビューで成功。ブラウザ実機確認は環境ポリシーで `127.0.0.1:8123` アクセスがブロックされたため未実施。

### 2-NEW-M. 普 prussia ケース監査ラベル弱め修正（本セッション・未コミット）
> プロイセン側ケースの過剰確定ラベルを修正。格付けを B+/B ではなく B/B- に抑え、全 evidence の collectionState と evidenceLinks の reviewState を要検証へ戻した。Evidence type も公開資料一色から、同時代公開資料/軍事計画資料/条約/外交文書/回顧録/戦後公刊軍事資料/書簡/同時代記録/公刊一次資料/議会記録へ細分化。
- `FPWP-E-013` は source の 1870年11月26日に合わせ publishedDate を 1870 に修正。
- 秘密条約と参謀本部展開計画に依存する `FPWP-EL-007` / `FPWP-EL-013` は `availableToAnalysts:false` に修正。
- 検証: `node --check data/cases/franco-prussian-war-1870-prussia.js` OK / `node verify.js` 全8ケース 0。

### 2-NEW-N. ウクライナ戦争 Russia ケース監査ラベル弱め修正（本セッション・未コミット）
> ロシア側ケースのエビデンス分類・評価・コメントを監査し、機械チェックでは拾えない過確定を弱めた。格付け未確定の理由である「内部意思決定資料・軍内部評価・作戦計画文書の未公開」と整合するよう、Pre-War 5項目から provisional statusOverride を撤去し、実際の評価形跡を全て `不明` に戻した。
- 全 evidence の `collectionState` と全 evidenceLinks の `reviewState` を `要検証` に統一。
- Evidence type を `公開論文` / `公式演説` / `公開会議映像` / `国際機関決議` / `戦中外部研究` / `事後分析` / `軍事年鑑` に細分化。
- `ruw_cell_attrition_shift` / `ruw_cell_donbas_shift_objective` は長期戦化入口・初期判断後の方針修正セルとして、初期判断の `ratingBasis` から除外。本文にも「初期判断の ratingBasis には直接算入しない」と明記。
- `RUW-EL-011` / `RUW-EL-012` は公開放送そのものではなく外部解釈に依存するため、`knownByDecisionMakers` を `不明` に弱めた。
- Overview と抵抗意思セルの断定寄り表現を弱め、内部見積もりの直接証拠が未収集であることを明示。
- 検証: `node --check data/cases/russo-ukrainian-war-2022-russia.js` OK / `node verify.js` 全8ケース 0。

### 2-NEW-O. ウクライナ戦争 Ukraine ケース サブエージェントレビュー反映（本セッション・未コミット）
> 監査方法論 / シニアエンジニア / UIデザイナーのレビュー統合を受け、Ukraine 側 skeleton の過確定・意味参照ズレ・共有 UI 小バグを修正。
- Pre-War の provisional statusOverride を撤去し、内部資料未収集の項目は `不明` に戻した。西側支援依存の linkedEvidenceLinks は軍事バランス系 `RUU-EL-007/008` から専用 `RUU-EL-009/010` へ修正。
- `RUU-EL-022` は「警告がなかった」風の見せかけ反証から、警告の実用的確度への反証に修正。
- キーウ防衛セルと `RUU-EL-005/006` は ex-post 成功を直接免責に見せないよう、「事後的再構成」と明記。
- `ruu_cell_long_war_boundary` / `ruu_cell_mobilization_cost` / `ruu_cell_negotiation_space` は境界管理・開戦後資料依存・ex-post 交渉資料依存セルとして `ratingBasis` から除外し、Ukraine 側 ratingBasis は7→4。
- 共有 UI: Timeline の alternatives 配列表示を ` / ` 区切りへ修正し、Overview/Opinion の `overviewOpinion` 改段落を段落表示する `renderParagraphs()` を追加。
- Q1〜Q8と追加 AUD/ENG 検討を反映: `RUU-EL-014` を `要検証` へ戻し、キーウ防衛セルに ex-ante 直接根拠は `RUU-EL-004` で後知恵対照は直接算入外と明記。`RUU-EL-008` の canSay は物量劣位の事前認識可能性へ寄せ、規範留保は cannotSay 側へ移した。`ruu_pw_military_readiness` のリンクは軍事準備系 `RUU-EL-007/008` に絞り、全 Pre-War と assessment cell に次の一次資料収集アクションを付与。Evidence Graph は `noEvidenceReason` 付きセルを証拠待ち一覧に表示するよう調整。Timeline の修正余地表示をバッジ化し、空 assumptions に「なし」表示を追加。pending 表示は「未評価ギャップ」へ中立化。`primaryResponsibility` 表示ラベルと西側支援語彙も調整。`legacyHypothesisTracking` フォールバックは撤去。
- 検証: `node --check data/cases/russo-ukrainian-war-2022-ukraine.js` OK / `node --check ui/renderers.js` OK / `node verify.js` 全8ケース 0 / render smoke 全8ケース全ビュー OK。

### 2-NEW-J. 普 prussia 訴追セルの ex-ante 接地強化＋格付け「未確定」の明文化＋Opinion モードトグル撤去（`1f571bc`＋ratingNote是正 `9ad43d1`・push済み）
> 直前コミット `287bb21`（§2-NEW-I）の上に積む差分。証拠を新規大量追加するのではなく、**既存の訴追セルの支持側が結果（ex-post）依存だった弱点を事前資料へ接地し直す**監査品質の補強と、**「未確定」格付けの根拠を明文化**する誠実性整理、および**死蔵 UI の撤去**が主眼。検証は `node --check` 全OK／`verify.js` で `validateCaseRegistry` 0・全7ケース `validateCaseReferences`/`lintCaseMethodology` 0（全 claim 支持≥1・反証≥1 を維持）。cache-bust 全コードファイル＋`verify.js` を `20260626-fpw-france`→`20260626-prussia-exante` に更新。
- **普 prussia の訴追2セルを ex-ante 接地強化**:
  - `fpwp_cell_siege_escalation`（戦争長期化）・`fpwp_cell_annexation_cost`（ア・ロ併合コスト）の `evidenceStrength` を `中`→`中〜強` に昇格。支持側の根拠を「長期化という**結果**」から、**事前計画そのもの**（モルトケ1868-69展開計画＝`FPWP-E-002` を会戦中心の時間的射程として参照）へ移し、結果依存を脱した。opinion 文に「ex-post ではなく ex-ante に読める／支持・反証は両建てのまま」を明記。
  - 新証拠 `FPWP-E-013`（アルザス＝ロレーヌ併合への**ドイツ国内の同時代反対**＝社会民主労働党ベーベル/リープクネヒトの帝国議会反対表明など）。併合コストが「講和時点で当時から可視」だったことを国内側からも接地。
  - 新リンク2件: `FPWP-EL-013`（`FPWP-E-002`→`fpwp_claim_protracted_war_underestimated`/`fpwp_cell_siege_escalation`・支持・timeFit 直接・ex-ante）／`FPWP-EL-014`（`FPWP-E-013`→`fpwp_claim_annexation_cost_underweighed`/`fpwp_cell_annexation_cost`・支持）。両 `cannotSay` で「長期化を完全予見し計画へ織り込むべきだったと規範断定はできない」「WWI 等の後年帰結は ex-post＝射程外」を明示。
- **格付け「未確定」の明文化（仏/普/露の `ratingNote` を拡張）**:
  - **仏 france**: 「skeleton 段階・編集判断として意図的に保留」＋ rating-readiness 条件（ratingBasis 各セルが証拠強度『中』以上・Pre-War が『不明』→『形跡あり/なし』へ解決）を明記。訴追側が事後二次研究（Howard/Wawro）依存である点が暫定格付け保留の理由＝**未確定は一時的・証拠駆動**。
  - **普 prussia**: 証拠量条件は概ね充足（双方セルが中〜強に到達）。残る条件は**争点の決着**（訴追セルが ACH 上 両建て未決着＝能力肯定が訴追を上回ると編集判断できる段階に未達）。決着には作戦計画・講和審議の内部記録を要する旨。
  - **露 russia**: 仏/普とは**性質が異なる構造的未確定**と明記。開戦判断の核心の ex-ante 直接証拠（露内部意思決定資料・軍内部評価・作戦計画文書）が封鎖されている間に事後資料から逆算すると**第3原則（開戦後の証拠を直接根拠にしない）に抵触**するため、構造的に未確定を維持。
- **Opinion ビューの要約/全文モードトグル撤去（UI 整理）**: 中身が薄いプレースホルダ（「全文モード」の mini-card 4枚＝Timeline/Evidence/changeConditions/監査方法への参照案内）だった `opinionMode` 機構を撤去。`app.js`（`state.opinionMode`・`[data-mode]` クリックハンドラ）／`ui/renderers.js`（`renderOpinion` の mode-toggle・full 分岐）／`styles.css`（`.mode-toggle` 一式）を削除。Opinion ビューは常に総合監査意見＋各セクションを表示。
- **ratingNote 是正（`9ad43d1`）**: 普 prussia の `ratingNote` 冒頭「skeleton 段階」が同 note 後段「証拠量条件は概ね充足（双方セル中〜強）」と自己矛盾していたため、`skeleton 段階` 表記を撤去し「編集判断として意図的に保留」に一本化。仏 france は Pre-War が『不明』で実際に skeleton 段階のため表記維持。
- **未了（次セッション候補）**: §2-NEW-I の未了は継続（露の ex-ante 直接証拠は構造的に未収集／仏 phase2・4 未セル化／**ウクライナ西側支援側ケース未実装**）。`287bb21`〜`9ad43d1` は **push 済み**（master = origin/master 同期）。

### 次セッション計画: 仏 france ケースエビデンス埋めの残り
> 「仏ケースのエビデンス埋め」の優先順位1位は完了。残る「優先順位2位（collectionState精密化）」と「優先順位3位（未セル化局面のカバレッジ拡張）」を次セッションへ申し送る。
- **優先順位2（高→低）**:
  1. **`collectionState` 精密化**: 一次7件の所蔵・文書ID・正確な日付/頁を Web 調査で特定し `要検証`→`収集済み` へ。湾岸 R-2（Safwan provenance, §2-NEW-G）と同種の作業＝1件あたり重い。高価値2〜3件から。
  2. **phase2/4 のセル化**: 未セル化局面に新セル＋証拠＋リンクを追加しカバレッジ拡張（横展開）。
- **注意**: いずれも Web 調査（WebSearch/WebFetch）が前提。手元知識のみの出典文字列いじりは品質基準（§2-NEW-D）を満たさず `要検証` のまま残るため不可。rating-readiness（仏 `ratingNote`）の解錠には ratingBasis 各セルが証拠強度『中』以上＋Pre-War が『不明』→解決、が必要。

### 2-NEW-I. 新規3ケース（普仏 仏/普・ウクライナ 露）の追加・レビュー反映・普仏エビデンス補強（`287bb21`・push済み）
> 正式作業リストの普仏戦争（仏/普）・ウクライナ戦争（ロシア側）を skeleton で追加（前セッション着手・未コミット・HANDOFF未記載だった）。本セッションで**サブエージェントレビュー → ★★以上適用 → 普仏エビデンス補強**まで実施し、本コミットでまとめて反映。ID 名前空間は `fpw_`/`FPW-`（仏）・`fpwp_`/`FPWP-`（普）・`ruw_`/`RUW-`（露）で横断衝突なし。
- **サブエージェントレビュー → ★★以上を適用（AUD-1/ENG-1/ENG-2/UI-1/AUD-2）**:
  - **AUD-1（honesty・最重要）**: france の 2 Pre-War 項目（`fpw_pw_french_mobilization` 高×形跡なし／`fpw_pw_system_gap` 低〜中×形跡なし）が、`resolveStatus` の「`形跡なし` で provisional override 自動発火」（`auditSchema.js:51`）により派生 重大懸念（校正α）を**確定 要検証へ降格**させ、かつ `rationale`/`noEvidenceReason:"未接続"` が「未精査」と自己矛盾＝I-3 の non-honesty 再発。→ `actuallyEvaluated:"不明"`＋`noEvidenceReason:"証拠未収集"`（russia流）へ。override 不発火・pending 化し「収集後に 形跡なし→重大懸念 へ昇格」の経路を rationale に明記。
  - **ENG-1**: `fpw_pw_system_gap.exAnteEvaluability:"低〜中"`（STATUS_MATRIX 非対応キー＝enum ガードγで黙って要検証に落ちる）→ `"低"`。
  - **ENG-2**: `noEvidenceReason:"未接続"` の誤付与（接続済み項目に付与）を是正（限定的は除去、不明は `証拠未収集`）。
  - **UI-1**: france のダミーセル3件（`fpw_cell_dummy_*`）を削除。UI-8 の疎マトリクス `—` 設計に統一（普/露と同型）。マトリクスは `assessmentCells` のユニーク phase から列生成のため、ダミー水増しは不要。
  - **AUD-2**: prussia の能力肯定 claim 4件を `audit_issue`→`counter_claim`（連合側 `gwc_claim_legitimacy`＝能力肯定は免責側 counter_claim の先行例に統一）。
  - **凍結（未適用）**: AUD-3（二次研究 type 語彙の横断統一）／UI-2（"未定義" 無色バッジ）／UI-3（証拠IDサフィックス）。
- **普仏エビデンス補強**:
  - **普・空2セルの一次接地＋AUD-2残置解消**: `fpwp_cell_siege_escalation`（戦争長期化）・`fpwp_cell_annexation_cost`（ア・ロ併合コスト）が証拠0だったのを解消。新証拠 `FPWP-E-010/011/012`、新 audit_issue claim 2件（`fpwp_claim_protracted_war_underestimated`／`fpwp_claim_annexation_cost_underweighed`）を支持/反証 両建てで接続。これで prussia は免責一色でなくなる（audit_issue2・counter_claim4）。**併合の long-term 帰結（WWI 等）は `cannotSay` で ex-post＝射程外**（§3-L 同型）。死蔵だった回顧録 `FPWP-E-005` も併合反証に活用。
  - **仏の補強**: 訴追側の事後二次（Howard/Wawro）依存を是正する同時代一次を投入＋phase3 へ監査拡張。新証拠 `FPW-E-006`（同盟外交失敗）/`FPW-E-007`（バゼーヌ救援強行電報）/`FPW-E-008`（グラモン7月escalation）。新セル `fpw_cell_sedan_decision`（政権存続リスク×セダン前判断）＋新 claim `fpw_claim_sedan_march_political`（面子の政治が軍事的合理を覆した＝核心テーゼ）。Assessment は 3軸×2局面（定義4・疎2＝`—`）に拡張。新セルは**支持＝同時代/ex-ante・反証＝事後**＝従来の時点性逆転（訴追が事後）が正しい向きに。
- **検証**: `node --check` 全OK／`validateCaseRegistry` 0／全7ケース `validateCaseReferences`・`lintCaseMethodology` 0（全 claim 支持≥1・反証≥1）／cache-bust 全箇所＋`verify.js` 単一 `20260626-fpw-france`。
- **未了（次セッション候補）**: 追加証拠の `collectionState` 多くが `要検証`（文書ID/所蔵レベルの精密化＝§2-NEW-D 基準は未達）／露側は内部資料封鎖で ex-ante 直接証拠が構造的に未収集（④と同種の `要精査` 据え置きが誠実）／仏 phase2・4 未セル化／**ウクライナ西側支援側ケース未実装**（露の counterpart 不在）。

### 2-NEW-E. 連合側ケース深掘り精査 ①②③（`7e5d8d6`・本セッション後半）
> §7 が挙げた「残る粒度向上候補」のうち①②③を適用（④＝CIA/DIA/CENTCOM 原見積もり本体は未着手）。証拠量ではなく**正統性軸の反証強化**と**出典の時点性精密化**が主眼。
- **①サウジ駐留の正統性論争**: 連合側の正統性軸が一様に強い構造的な穴（同時代反証の薄さ）を是正。`GWC-E-014`（上級ウラマー評議会ファトワ〔イブン・バーズ主導、複数研究で1990/8/13、駐留容認＋撤退条件付き〕／サフワ系ハワーリー・アウダの駐留反対カセット説教1990/9〜／ビンラディンの自前防衛申し出と拒絶）を追加。`GWC-EL-019`＝`gwc_claim_legitimacy`/`gwc_cell_legitimacy_objective` への**批判方向反証**（`timeFit:直接`・`availableAtDecisionTime:true`・`knownByDecisionMakers:明白`＝政府が意図的にファトワ取得＝係争性を中枢が認識）。新Pre-War項目 `gwc_pw_basing_legitimacy`（高×形跡あり→要検証＝最低懸念バケット＝評価・管理済み）。正統性セル opinion/criteria/changeConditions・issues・counterHypotheses・overviewOpinion に「国際的正統性≠ホスト国正統性」を反映。**ex-post ブローバック（1996コバール/9.11等）は cannotSay で射程外**と明記。
- **②決議678の広範性**: `GWC-E-001` 出典を作動条項の正文に精密化（採択1990/11/29・採決12-2-1〔反対キューバ・イエメン／棄権中国〕・"all necessary means to uphold and implement resolution 660 … and **to restore international peace and security in the area**"）。`GWC-EL-020`＝`gwc_claim_legitimacy`/`gwc_cell_limited_objective` への**反証**。canSay＝授権は「地域の平和と安全の回復」まで及ぶ広範なもので、クウェート解放への限定は**法的天井でなく政治的選択**。cannotSay でバグダッド進撃の合法性・「area」解釈の係争性を射程外に。
- **③サフワン会談原記録**: `GWC-E-012` のヘリ運用容認根拠を**回想録依拠 → 機密解除トランスクリプト主導**に格上げ（Lt. Gen. Sultan Hashim Ahmad al-Tai の要請・シュワルツコフ逐語容認 "As long as it is not over the part we are in…" ／ "we will not attack any helicopters inside Iraq"）。回想録 It Doesn't Take a Hero (1992)・同時代報道（Baltimore Sun/WaPo 1991/3/4）は corroboration に降格。`collectionState` を「回想録単独依拠を脱した」に更新。`GWC-EL-016` 認識根拠にもトランスクリプト確認を併記。
- **検証**: `node --check` 全JS OK／`validateCaseRegistry` 0／全4ケース `validateCaseReferences`・`lintCaseMethodology` 0（正統性claimは支持4/反証4で両建て維持）／実機で `GWC-EL-020` 詳細に678広範性・`GWC-EL-016` 選択で `GWC-E-012` のサフワン逐語描画・コンソール0。cache-bust 全4箇所 `20260626-res678-safwan`。
- **未適用で残ったレビュー指摘**: ①レビューの **M-1**（`gwc_pw_basing_legitimacy.actuallyEvaluated` を `形跡あり`↔`限定的`。下げると 高×限定的→要注意 に懸念上昇。現状は撤退条件付きファトワ＝評価管理形跡ありとみて `形跡あり` 維持）／**M-2**（`GWC-EL-019` を coalition_maintenance 側にも露出）／**S-1**（駐留正統性専用 assumption 新設）。②③レビューの **R-1**（`GWC-EL-020` を termination 側にも露出）／**R-2**（サフワン・トランスクリプトの所蔵アーカイブID未特定＝二次情報が「機密解除トランスクリプトによれば」と引用する段階。完全な一次記録化には文書特定が残課題＝④と同種の `要精査`）。

### 2-NEW-H. I-9（対照ケース軽量導線）＋ UI-8 一部（疎マトリクス・aria-live）適用（`a4eaf06`・コミット+push済み）
> §4 凍結中だった I-9 と UI-8 系をユーザー指示で解凍。スコープは **I-9＝軽量ボタン導線のみ（対比ビュー新設は凍結維持）／UI-8＝疎マトリクス是正＋aria-live 冗長解消の2点（色覚対応は今回除外）**。
- **I-9（対照ケース導線）**: `warCase.counterpartCaseId`（相互参照・I-5で実装済み）への UI 導線。renderers はケース局所のため、横断ナビ（`cases` 参照）は **app.js 側**で描画＝関心分離を維持。`index.html` サイドバーに `#counterpart-nav` を追加し、`renderCounterpartNav()` が counterpart 実在時のみ「⇄ ◯◯側 を見る」ボタンを描画（`data-goto-case`）。click 委譲で `setActiveCase` を呼ぶ。counterpart 無しのケース（フォークランド2件）では `hidden`。`styles.css` に `.counterpart-nav/.counterpart-button` 追加（サイドバーのダークテーマ準拠）。
- **UI-8①（疎マトリクス）**: Assessment の軸×局面 直積で未定義マスに出ていた `未定義` テキスト氾濫を、控えめな `—`（`.cell-undefined`・`opacity .45`・`aria-hidden="true"`）に置換。表下に `.matrix-note` キャプションを追加し「疎は意図的（各ケースは責任範囲を絞った監査）」と明示。
- **UI-8②（aria-live 冗長）**: `#view-root` の `aria-live="polite"`（クリック毎にビュー全文を読み上げる冗長）を撤去。代わりに視覚非表示の `#sr-status`（`role="status" aria-live="polite"`・`.sr-only`）を新設し、`announce()` で**簡潔な操作結果のみ**を流す（ビュー切替＝タイトル／ケース切替／評価セル選択＝軸/局面／証拠リンク選択＝ID）。
- **検証**: `node --check` 全JS OK／`validateCaseRegistry` 0／全4ケース `validateCaseReferences`・`lintCaseMethodology` 0／実機（:8125）で湾岸2ケースの導線双方向切替・フォークランドで導線非表示・`sr-status` が各操作で簡潔読み上げ・連合側マトリクスで `—`14マス＋キャプション・`#view-root` の aria-live 撤去・コンソール warn/error 0。cache-bust 全4箇所 `20260626-counterpart-a11y`。
- **残置（凍結維持）**: I-9 の**対比ビュー新設**（同等局面の両ケース並置）／UI-8③ **色覚対応**（バッジは既にテキスト併記ゆえ色のみ依存ではない＝上積み扱い）。

### 2-NEW-G. R-2 サフワン・トランスクリプトの出所特定（③の一次記録化を前進・`a26926d`・コミット+push済み）
> §2-NEW-E の残課題 R-2＝「機密解除トランスクリプトによれば」の宙吊りを、特定の開示出典に接地。
- Web 調査で機密解除トランスクリプトの**一次的開示**を特定: **Laurie Mylroie「Iraq's Real Coup: Did Saddam Snooker Schwarzkopf?」(The Washington Post, 1992/6/28 Outlook)** が機密解除トランスクリプトを最初に公刊。**Michael R. Gordon & Bernard E. Trainor『The Generals' War』(Little, Brown, 1995)** も同種の機密解除文書群を用いて再構成。
- `GWC-E-012` の `source`・`collectionState` と `GWC-EL-016` の `knownByDecisionMakersBasis` に上記出所を併記。「二次情報が『トランスクリプトによれば』と引用する段階」→「特定の開示出典に接地」へ前進。
- ⚠️ 残: 単独の NSArchive Electronic Briefing Book / NARA・DoD の文書管理番号自体は公開検索で未特定。R-2 は**実質前進だが完全な所蔵特定（文書番号レベル）は引き続き狭い `要精査`**として残す（④と同種）。
- 検証: `node --check` 全JS OK／`validateCaseRegistry` 0／全4ケース `validateCaseReferences`・`lintCaseMethodology` 0／実機（:8125）で `GWC-E-012` 新出所が module ロード・コンソールエラー0。cache-bust 全4箇所 `20260626-safwan-provenance`。

### 2-NEW-F. ④ CIA/DIA/CENTCOM 原見積もり本体の扱い（`b680f2e`・コミット+push済み）
> §7 の④に着手。目的は `GWC-E-013` を「原見積もり本体」へ格上げできるかの確認。
- Web/公式系検索で CIA/DIA/CENTCOM の開戦前内部見積もり本体（個別メモ、J-2 estimate、DIA assessment、CENTCOM intelligence estimate 等）を探したが、現時点では公開一次資料として未特定。
- 利用可能な核は、DoD『Conduct of the Persian Gulf War: Final Report to Congress』(1992) と GWAPS（USAF, 1993、DTIC/FASで公刊確認可）であり、これは「当時見積もりの公刊再構成」としては有用だが、開戦前内部原資料そのものではない。
- そのため `gwc_pw_iraqi_capability` / `gwc_pw_ground_cost` の `actuallyEvaluated: "限定的"` と `evidenceStrength: "弱〜中"` は維持。`GWC-E-013` の title/source/collectionState と `GWC-EL-017.reviewState` を、原本未特定が読めるように是正。
- cache-busting は `20260626-estimate-provenance`（その後 R-2 で `20260626-safwan-provenance` に更新）。
- 次に必要なら、CIA CREST/Reading Room・DIA FOIA logs・DTIC・NARA/George H. W. Bush Library の文書番号レベルで追加探索。見つからない場合は `nextEvidenceActionType` 相当の未収集タスクとして残す。
### 2-NEW-D. 証拠出典の一次資料単位への精密化（`25c4b23`・本セッション）
- 概括的だった `source` を Web 裏取りの上で一次資料単位に書き換え（Evidence ビューの選択リンク詳細パネルに表示される）。
- **連合側**: `GWC-E-011`＝52-47 は **S.J.Res.2 への上院採決（Senate Roll Call Vote No. 2, 1991/1/12）**と明示（下院は H.J.Res.77 を 250-183=House Vote No.9 で可決し同文が PL 102-1）。`GWC-E-012`＝ブッシュ1991/2/15 発信（American Presidency Project）・サフワン3/3 のヘリ容認（回想録依拠＝要精査注記）・HRW『Endless Torment』(1992)。`GWC-E-013`＝Conduct of the Persian Gulf War（DoD,1992/4, PL102-25 TitleV）・GWAPS（Cohen 監修, USAF,1993,全5巻）・CENTCOM 計画整理を著者/刊行年付きで。
- **湾岸イラク側**: `GW-E-001`＝グラスピー会談をイラク公表版（NYT 1990/9 報道）/本国宛公電（1998 機密解除）/1991年4月上院外交委証言の3系統に整理し相違を明記。`GW-E-005`＝Desert Shield を 1990/8/7 開始・Army CMH・DoD報告・CENTCOM 展開記録（XVIII空挺軍団先遣〜約60万人）で明記。
- 方法論注記は維持: ヘリ容認の口頭経緯は回想録依拠で要精査、開戦前内部原見積もりそのものは未確認、グラスピー発言ニュアンスは争いあり。`authenticity`/status は不変（出典文言の精密化のみ）。
- cache-bust 全4箇所 `20260626-source-precision`。検証: `node --check` 全JS OK／`validateCaseRegistry` 0／全4ケース `validateCaseReferences`・`lintCaseMethodology` 0／ブラウザ実機で連合側 `GWC-EL-015` 詳細パネルに新出典描画・コンソール警告0。

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

### 2-NEW-C. 連合側ケースの証拠増補＋サブエージェント再レビュー反映（`610088a`）
- ユーザー判断「スキーム自体に大きな問題が無ければ、エビデンス数を増やせば P1/P2 は解決するのでは？」を受け、連合側ケースに同時代公開資料を追加。追加証拠: `GWC-E-007`（ブッシュ開戦演説 1991/1/16）、`GWC-E-008`（攻勢戦闘停止演説 1991/2/27）、`GWC-E-009`（湾岸戦争終結後の議会演説 1991/3/6）、`GWC-E-010`（Public Law 102-1）。追加リンク: `GWC-EL-009`〜`GWC-EL-014`。連合側は evidence10/link14/claim3。
- 初回実装では `gwc_pw_containment_cost` を `限定的`/`要注意` に下げたが、サブエージェント再レビュー（UIデザイナー/シニアエンジニア/監査方法論）で「Pre-War に戦闘停止後・戦後資料を根拠リンクしている」「公開演説だけで重大懸念を要注意へ下げるのは早い」「反証ラベルが強すぎる」と指摘。
- 追加レビュー C-1 反映後、`gwc_pw_containment_cost` は `actuallyEvaluated: "不明"`、`noEvidenceReason: "証拠未収集"`、`statusOverride.provisional: true` を維持しつつ、UI 側の `issues[]` と `gwc_cell_containment_cost` も確定重大懸念ではなく **要検証（暫定重大懸念相当）** に寄せた。`gwc_cell_containment_cost.evidenceStrength` は `弱` に下げ、暫定性を片側だけに出す問題を是正。
- 戦闘停止後・戦後構想資料（`GWC-EL-011`/`012`/`013`）は Pre-War の直接根拠には使わず、`timeFit: "間接"` / `availableAtDecisionTime:false` とし、「全く評価していなかった」という強い仮説への**限定的反証**として整理。
- `gwc_pw_uprisings_humanitarian` は `不明`＋`証拠未収集` に戻し、矛盾していた `evidenceBasis` / `linkedEvidenceLinks` を撤去。追加レビュー後は `nextEvidenceActionType: "collect_primary_source"` を付与し、空欄が手抜きに見える問題を軽減。
- cache-busting は全4箇所（`index.html` / `app.js` / `data/cases/index.js` / `ui/renderers.js`）で `20260626-coalition-e123` に統一。
- 検証: `node --check` 全JS OK／`validateCaseRegistry(cases)` 0／全4ケース `validateCaseReferences` 0／全4ケース `lintCaseMethodology` 0。`gwc_pw_containment_cost` は `resolveStatus` で `{ value: "要検証", basis: "derived", derived: "要検証", pending: true }` を確認。
- 追加レビュー C-2/C-3/AUD-4 反映: `gwc_pw_iraqi_capability` は `形跡あり` から `限定的` に下げ、戦後戦史・開戦後演説だけで事前評価を強く主張しない表現に修正。`GWC-EL-003` は `GWC-EL-002` と同一構造の表裏であるため独立反証として過大評価しない注記を追加。格付け `B+/B` には、長期封じ込めコストが暫定要検証である旨の `ratingNote` を追加し、Audit Opinion に表示。
- E-1/E-2/E-3 反映: `GWC-E-011`（上院52対47・国内正統性の分裂）、`GWC-E-012`（蜂起・米側発信・サフワン後ヘリ運用・不介入）、`GWC-E-013`（DoD/CENTCOM/GWAPS 系のイラク軍能力/損耗見積もり）を追加。`gwc_cell_uprisings_humanitarian` と `gwc_claim_uprisings_humanitarian` を新設し、連合側は evidence13/link18/claim4/cell7/prewar8。`gwc_pw_iraqi_capability` は、公開資料が戦後整理を含むため `限定的` に留め、原見積もり精査が必要と注記。
- E-1/E-2/E-3 後サブエージェントレビュー反映: `gwc_pw_uprisings_humanitarian` は戦後・間接資料を Pre-War 評価形跡に使いすぎないよう `不明`＋`証拠未収集` に戻し、`gwc_pw_iraqi_capability` も `限定的`＋`弱〜中` に維持。`GWC-EL-017.availableAtDecisionTime` は公開報告自体の時点性に合わせ `false` に変更。長期封じ込め claim/target の旧「重大懸念」文言を `暫定要検証` に統一し、Overview/Opinion に `ratingNote` を表示。Pre-War 根拠リンクには `timeFit`・判断時点可否・reviewState を併記。


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

---

## 2. 未適用レビュー指摘・凍結項目

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
- ~~**I-9（連合側レビュー）**: `counterpartCaseId` の UI 導線~~ ＝**軽量ボタン導線は 2-NEW-H で実装済み**。残るは**対比ビュー新設（同等局面の両ケース並置）のみ凍結維持**（マルチケース renderer が要る大きな新機能）。
- **UI-8 系（連合側レビュー）**: ~~疎マトリクス「未定義」だらけ／aria-live 冗長~~ ＝**2-NEW-H で適用済み**。残るは**色覚多様性対応のみ**（バッジはテキスト併記済み＝色のみ依存ではないため上積み扱いで凍結）。
- **I-6（連合側レビュー）**: `nextEvidenceActionType` 欠落で renderer が「未設定」退行（iraq も同様）。撤去/必須化の去就決定が未了ゆえ保留。

---

---

## 3. 旧 HANDOFF から移設した次セッション候補

1. まず本ファイルを読む。
2. `3e1f04b` までは `origin/master` と同期済み。現在の未整理差分は `tools/check-cache-busting.mjs` と HANDOFF 現状補正のみ。採用する場合は小コミット化し、必要なら push する。
3. 次にやるなら、まず `git status` で clean / 同期状態を確認してから新しい作業単位を選ぶ。
4. その後の大きな作業候補:
   - **連合側ケースの深掘り精査（続き）**。①②③は適用済み（2-NEW-E）。④＝CIA/DIA/CENTCOM 原見積もり本体は調査着手済みだが未特定（2-NEW-F）。`GWC-E-013` は「公刊再構成」として明確化し、原見積もり本体は引き続き `要精査`。
   - **未適用レビューの反映**: M-1（`gwc_pw_basing_legitimacy` 形跡あり↔限定的）／M-2（`GWC-EL-019` を coalition_maintenance 露出）／S-1（駐留正統性専用 assumption）／R-1（`GWC-EL-020` を termination 露出）／~~R-2（サフワン・トランスクリプトの所蔵アーカイブID特定）~~ ＝**本作業で出所特定まで前進（2-NEW-G）。文書管理番号レベルの所蔵特定のみ狭い `要精査` で残置**。
   - I-9 軽量ボタン導線・UI-8 疎マトリクス/aria-live は 2-NEW-H で適用済み。残る I-9 対比ビュー新設／UI-8 色覚対応を独立セッションで扱うか判断する。
   - または湾岸イラク側の一次資料名精密化（グラスピー会談、Desert Shield 展開資料）。
5. いずれも §3 の蒸し返し禁止に抵触しないか確認してから進める。

> ⚠️ プレビュー注: 本体は `master` ブランチ＋メインディレクトリ。worktree 内で作業した場合、preview MCP は worktree 基準で起動するため launch.json の python http.server を `--directory <メインパス>` 付き・別ポートで指す必要がある（ポート8123は前セッションの常駐 python が掴んでいることがある）。
