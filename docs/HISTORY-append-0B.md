## 0B. 2026-06-28: CANON / HANDOFF 肥大化の整理（運用文書と詳細仕様の分離）

ASAA（企業版スピンアウト）で採用した整理方針を WSA にも適用した。**内容は削除せず**、運用文書と詳細仕様を分離した。

### 決定内容

```text
docs/CANON.md          必ず守る短い正典だけに圧縮
HANDOFF.md             再開に必要な現在状態・検証状態・次作業だけに圧縮
docs/METHOD_APPENDIX.md 詳細仕様・導入候補・プロトタイプ・確定設計判断ログを退避
docs/HISTORY.md         本項目として整理を履歴化
docs/archive/          肥大化整理前の CANON / HISTORY 全文を保存
```

### 昇格規律（新設）

```text
CANON に新規仕様候補を直接追加しない。
新規仕様候補はまず METHOD_APPENDIX に置く。
複数ケースで必要性が確認されたものだけ CANON へ昇格する。
```

### CANON から METHOD_APPENDIX へ退避した主な項目

```text
- Theory of Change 全文（→ §A）
- ID 名前空間 全対応表（→ §B）
- 形跡の5段階詳細定義 / evidenceSearchState（導入候補）/ 強い形跡あり の扱い（→ §C）
- ratingRules / knockoutCriteria / weightedScore スキーマ（導入候補）（→ §D）
- dependencyRules スキーマ・典型例（プロトタイプ）（→ §E）
- 確定設計判断 A〜N ログ（→ §F）
- 凍結中項目一覧（→ §G）
```

CANON 本文には、各項目の **要点と参照ポインタ** のみを残した。

### 再構成に伴う注記

- 今回アップロードされた `HANDOFF.md` は別プロジェクト（ASAA）の旧版だったため、WSA の `HANDOFF.md` は CANON / HISTORY の現在状態記述から **再構成** した。実リポジトリの `git status` / `rg --files` と突き合わせて確定すること。
- 整理過程で **cache-bust 文字列のドリフト** を検出した（`20260627-phaseb-coalition` / `20260627-fpw-france-grounding` / `20260627-ruu-time-caveats` が併存）。HANDOFF §4 の最優先課題として記録した。

### 理由

CANON が形跡定義・rating 透明化・依存関係の導入候補を抱えて肥大化し、「必ず守るもの」と「検討中の候補」が混在していた。再開時に最初に読むべきものを `HANDOFF.md` と `docs/CANON.md` の2つに限定し、詳細が必要なときだけ `docs/METHOD_APPENDIX.md` を参照する構成にした。

---
