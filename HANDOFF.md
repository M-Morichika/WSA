# 引き継ぎ文（セッション状態サマリ）

最終更新: 2026-06-24

## 0. このファイルの目的
セッションが長くなったため、状態を要約。次セッションは**まずこれを読んでから**再開すること。

---

## 1. プロジェクト概要
- **「継戦能力版ソブリン格付け」** = フォークランド紛争（アルゼンチン軍事政権）を題材にした「戦争責任監査（War Accountability Audit）」のWebアプリ。vanilla JS 単一ファイル構成。
- 監査原則（最重要・全設計の前提）:
  1. 反証証拠を隠さない
  2. 言えること/言えないことを分ける
  3. **開戦後の証拠を直接証拠にしない**
- 構成ファイル:
  - `index.html` — サイドバー＋ビュー切替タブ（Overview / Timeline / **Pre-War** / Assessment / Evidence / Audit Opinion）
  - `app.js`（中心）— `auditData` オブジェクト＋レンダラ群
  - `styles.css`
  - `.claude/launch.json` — プレビュー用静的サーバー定義（後述）

---

## 2. このセッションで実装したこと（完了・検証済み）

### 2-1. Pre-War Checklist 機能（新規）
「開戦前に評価可能だった項目」を独立ビューとして追加。
- **データ**: `auditData.preWarChecklist`（7項目）。`app.js` 内、`phases` 配列の直後。
- **7項目**: pw_uk_force_projection / pw_island_hold / pw_air_sea_control / pw_supply_line / pw_political_endurance / pw_diplomatic_alignment / **pw_regime_survival**（目玉）
- **status は保存しない**（単一情報源）。`resolveStatus()` が `exAnteEvaluability`（高/中/低）× `actuallyEvaluated`（形跡あり/限定的/形跡なし/不明）から `STATUS_MATRIX` で導出。
- **STATUS_MATRIX**（重大懸念は「高×形跡なし」の1セルのみ）:
  ```
  評価可能性\評価形跡  形跡あり 限定的  形跡なし 不明
        高           要検証  要注意  重大懸念 要検証
        中           要検証  要注意  要注意   要検証
        低           要検証  要検証  要注意   要検証
  ```
- **override（regime_survival のみ）**: `statusOverride.provisional: true`。`actuallyEvaluated` が `"形跡なし"` になると `resolveStatus` が**自動発火**して重大懸念へ昇格（証拠到達まで保留）。検証済み。
- **現在の分布**: 重大懸念 0 / 要注意 5 / 要検証 2（＝後知恵で断罪していない誠実な状態。regime_survival は「⏳昇格候補」として保留表示）。
- **表示**（`renderPreWar()`）: ①status分布 ②保留中の昇格候補コールアウト ③評価ギャップ・マトリクス（derivedで配置・着色、overrideは注釈バッジ） ④項目詳細カード（`<details>` で展開、反証・非対称性を常時併置）。
- **assumptions に id 付与**: `phases[].assumptions[]` に `asm_opening_*` / `asm_turning_*` / `asm_ending_*` を追加（`linkedAssumptions` の id 参照のため）。

### 2-2. 出典レジストリ（evidence）の実史料化
`auditData.evidence` の E-001〜E-004 を実在史料に差し替え（`source: "未入力"` を解消）。既存 `evidenceLinks` 参照は維持。
- **E-001** = Lawrence Freedman, *The Official History of the Falklands Campaign*, Vol.2 (Routledge, 2005)
- **E-002** = Informe Rattenbach（ラッテンバッハ報告書, 1983 / 2012機密解除・公開, 西語）
- **E-003** = Falkland Islands Review (Franks Report), Cmnd 8787, HMSO, 1983
- **E-004** = National Security Archive (GWU) マルビナス機密解除コレクション（主）+ FRUS（該当巻あれば併用）
- 表示: Evidence ビューの詳細パネルが `出典`/`資料状態`/`日付` を描画（確認済）。

### 2-3. 時点フラグ整合修正（#1・#3）
- `evidenceLinks` 冒頭に**時点フィールドの定義コメント**を追加:
  - `timeFit`: 出典の判断時点への近さ（直接=同時代記録 / 間接=戦後著述）
  - `availableAtDecisionTime` / `availableToAnalysts`: 「文書」が判断時点で入手可能だったか
- **EL-003（→Franks 1983）, EL-005（→Rattenbach 1983）** を `timeFit: 間接` / `availableAtDecisionTime: false` / `availableToAnalysts: false` に修正（戦後文書なので）。`knownByDecisionMakersBasis` も「戦後文書が開戦前を記述」と書き換え。
- **EL-004（→NSArchive＝同時代の機密電報）** は据え置き（1982年生成の同時代記録なので 直接/true が正しい）。
- **EL-001/EL-002（→Freedman）** は元から 間接/false で回帰なし。

---

## 3. 確定した設計判断（蒸し返さない）
- **A**: regime_survival の override は provisional（証拠が「形跡なし」を裏づけるまで保留）→ 現状の重大懸念ゼロは正しい。
- **B**: status はデータ非保存・実行時導出（`resolveStatus`）。
- **C**: マトリクスは derived のみで配置・着色、override は注釈バッジで別レイヤー。
- **校正α**: 重大懸念は「高×形跡なし」のみに限定（辛口側に振らない）。**現状維持で確定**。
- **校正β**: 「評価したが妥当でなかった」を表す軸は**追加しない**。**現状維持で確定**。
- これらは `app.js` の `preWarChecklist` 冒頭コメントにも明記済み。

---

## 4. 未適用・保留中（次セッションの候補）

### 4-1. レビュー指摘で合意済みの保留
- **#2**: `evidence.date` が「刊行年」と「対象期間」を混同 → `publishedDate` / `coveragePeriod` に分割。`renderEvidence` の日付表示行（`app.js` の詳細パネル、`<dt>日付</dt>` 付近）にも波及。**#1の根治策**。
- **#4**: `evidence.reliability` が「文書の真正性」と「解釈の信頼性」を混同 → 2軸化（当面は注記でも可）。
- **#5**: フランクス報告書は結論が英政府を免責したバイアスあり → 該当リンクの `cannotSay` に注記。

### 4-2. ★中断したサブエージェントレビューの未提示findings（重要）
直前に Pre-War/#1修正後のレビューを実施中で、以下を提示しかけて中断した:

1. **【最重要・新発見】EL-003 の関係方向が canSay と矛盾**（既存バグだが E-003=Franks化で顕在化）:
   - EL-002 と EL-003 はどちらも `claimId: "claim_uk_limited"`（＝反対仮説「英国の反応は限定的」）+ `relationship: "反証"`。
   - だが EL-002 の canSay は仮説を**弱める**（真の反証 ✓）一方、EL-003 の canSay「英国の即応が困難と考える余地を示す」は仮説を**強める**（＝本来 `支持` のはず）。方向が逆。
   - **修正案**: (a) EL-003 を `relationship: "支持"` に、または (b) `claimId` を `claim_uk_response`（過小評価）に変えて `反証`（免責証拠）として扱う。**どちらの意味が意図か要確認**。

2. **【方法論】#1の誠実な修正の結果、開戦前(ex-ante)主張を支える同時代史料がゼロになった**:
   - 現レジストリは戦後文書（間接/入手不可）のみ。ex-ante の「評価可能だった」主張を直接支える**同時代の一次史料が無い**（例: 1981年 HMS Endurance 撤収発表、当時公開の戦力データ等が必要）。
   - → 同時代史料エントリを追加する（データ収集タスク）か、該当セルの evidenceStrength で「過小証拠」を明示すべき。

3. **【軽微】** E-004 の "機密電報" → "機密文書"（NSArchive は電報以外も含むため）。

---

## 5. 動かし方 / 検証
- **プレビュー**: `.claude/launch.json` に static サーバー定義済み（`python -m http.server 8123`）。
  - 起動: preview MCP の `preview_start` に `name: "static"`。※ serverId はセッションごとに変わる。
  - Pre-War タブは `[data-view="prewar"]` をクリック。
- **構文チェック**: `node --check app.js`
- **検証方法**: preview の `preview_eval` で `auditData` / `resolveStatus()` を直接叩いてDOM/ロジックを確認（screenshotはタイムアウトしがちなのでeval併用が確実）。
- これまでの全変更でコンソールエラーなし。

---

## 6. 作業スタイル（ユーザーの好み）
- 日本語で応答。
- **「サブエージェントレビュー」**= 自分の中に UIデザイナー / シニアエンジニア / 監査方法論レビュアー（＋必要ならメタ視点）の人格を立て、コンテキストなしの客観視点で粗探しレビュー → 優先度表で統合 → 推奨を述べる、というパターンを確立済み。
- 進め方: 設計を詰める→サブエージェントレビュー→指摘を選んで適用（「ABC」「1,3適応」のように番号/記号で指示）→プレビュー検証→再レビュー、のループ。
- 過剰設計には「メタ視点」で逓減を指摘し、凍結を提案するのも歓迎される。

---

## 7. 次セッションの推奨アクション
1. まず本ファイルを読む。
2. 中断した **4-2 のレビューfindings（特に #1: EL-003 の関係方向）** をユーザーに提示し直す。
3. ユーザーの指示に従い、EL-003 の意図（支持 or claim差し替え）を確認して修正。
4. その後 #2（date分割の根治）に進むか、レジストリ拡充（同時代史料の追加）か、一区切りかを問う。
