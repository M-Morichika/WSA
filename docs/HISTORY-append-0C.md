## 0C. 2026-06-28: ASAA 由来の認識論メタフィールドを昇格前候補として退避

ASAA（企業版）が先行採用したメタフィールドを WSA へ逆輸入する検討を行い、**昇格規律に従って `docs/METHOD_APPENDIX.md` §H に候補として退避**した。CANON 本文には追加していない。

### 退避した候補（戦争向けに語彙読み替え済み）

```text
H-1 evidenceAccessScope   historical_archive / declassified_available / public_osint（ケース単位）
H-2 intendedUse / notFor  war_crime_adjudication 等を notFor に明示
H-3 uncertaintyReason     outcome_not_mature / evidence_conflicting / decision_records_lost / archives_unavailable / scope_boundary_unresolved
H-4 assessmentCoverage    coverageState を WSA の 不明/形跡なし 区別へ写像（traced_no_evidence / unassessed_unknown）
H-5 gapEscalationProtocol G0–G3 の段階昇格のみ（knockoutCriteria・nextEvidenceActionType は WSA 既存）
H-6 adversarialReview     asymmetryRisk 開示とスティールマン・ナラティブ層のみ（両建ては lint で既に強制）
H-7 勝者アーカイブ・バイアス 対照ペアの access 非対称時、形跡の有無を対称に裁かない（新規方法論注記）
```

### 輸入しなかったもの（記録）

```text
evidenceHierarchy        WSA の evidence.type が既に詳細
evidenceWeight.temporalFit WSA の時点性三層が上位（逆に ASAA が輸入すべき）
normalizationFactors / crossCompanyTemplate  企業規模補正は題材固有
comparisonEntryMode      加害/連合フレーミングは Overview 1行注記で足りる
```

### 昇格優先度

```text
最優先: H-1 / H-2（全8ケース一括導入後に CANON 昇格を検討）
次点:   H-4 / H-3
条件付き: H-5（G0–G3のみ）/ H-6（asymmetryRisk のみ）
```

### 理由

WSA はケース数（8件）では成熟しているが認識論メタ層が薄く、特に access モード宣言（H-1）と利用境界宣言（H-2）はロシア・イラクを扱う戦争版でこそ必須だった。一方で ASAA の肥大（n=2 で 44章）の再演を避けるため、これらは CANON へ直接足さず候補層に留め、複数ケースでの必要性実証を昇格条件とした。H-7 は両プロジェクト共通の未解決論点（勝者・公開側アーカイブの自己正当化バイアス）への対称性ガードで、フィールド化は任意。

---
