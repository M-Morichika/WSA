export const viewMeta = {
  overview: ["Overview", "この戦争監査の暫定結論は何か？"],
  timeline: ["Decision Timeline", "各判断時点で、当時の情報から見て判断修正は可能だったか？"],
  prewar: ["Pre-War Checklist", "開戦前に評価可能だった項目のうち、評価形跡が欠けているのはどこか？"],
  assessment: ["Assessment", "どの評価軸・どの判断時点に、重大な懸念が集中しているか？"],
  evidence: ["Evidence Graph", "どの証拠が、どの claim を支持・反証・保留しているか？"],
  opinion: ["Audit Opinion", "証拠と限定事項を踏まえると、最終的な監査意見は何か？"],
};

export const evidenceActionLabels = {
  collect_primary_source: "一次資料を探す",
  connect_existing_evidence: "既存証拠リンクを接続する",
  maintain_not_applicable: "該当なしとして維持する",
};

export const noEvidenceReasonOrder = ["証拠未収集", "未接続", "該当証拠なし"];

export const statusClass = {
  重大懸念: "critical",
  要注意: "watch",
  要検証: "review",
  軽度: "light",
  支持: "support",
  反証: "counter",
  保留: "hold",
};

// 開戦前評価項目の status 導出（B: 単一情報源。データに status を持たせない）
export const STATUS_SEVERITY = { 要検証: 1, 要注意: 2, 重大懸念: 3 };

export const STATUS_MATRIX = {
  高: { 形跡あり: "要検証", 限定的: "要注意", 形跡なし: "重大懸念", 不明: "要検証" },
  中: { 形跡あり: "要検証", 限定的: "要注意", 形跡なし: "要注意", 不明: "要検証" },
  低: { 形跡あり: "要検証", 限定的: "要検証", 形跡なし: "要注意", 不明: "要検証" },
};

export const statusOrder = ["重大懸念", "要注意", "要検証"];
export const evaluabilityOrder = ["高", "中", "低"];
export const actuallyEvaluatedOrder = ["形跡あり", "限定的", "形跡なし", "不明"];

export function deriveStatus(evaluability, actuallyEvaluated) {
  const row = STATUS_MATRIX[evaluability];
  return (row && row[actuallyEvaluated]) || "要検証"; // γ: enum ガード
}

export function resolveStatus(item) {
  const derived = deriveStatus(item.exAnteEvaluability, item.actuallyEvaluated);
  const ov = item.statusOverride;
  if (ov) {
    // γ: 証拠が「形跡なし」を裏づけたら provisional を自動解除して override を発火
    const fired = !ov.provisional || item.actuallyEvaluated === "形跡なし";
    if (fired) return { value: ov.value, basis: "override", derived, pending: false };
    return { value: derived, basis: "derived", derived, pending: true };
  }
  return { value: derived, basis: "derived", derived, pending: false };
}

export function getDefaultEvidenceFilters() {
  return { type: "all", authenticity: "all", relevance: "all", relationship: "all" };
}

export function getEvidenceById(caseData, id) {
  return caseData.evidence.find((item) => item.id === id) || null;
}

export function getEvidenceFilterOptions(caseData) {
  const byText = (a, b) => a.localeCompare(b, "ja");
  const uniq = (values) => [...new Set(values.filter(Boolean))].sort(byText);

  return {
    type: uniq(caseData.evidence.map((item) => item.type)),
    authenticity: uniq(caseData.evidence.map((item) => item.authenticity)),
    relevance: uniq(caseData.evidenceLinks.map((item) => item.relevance)),
    relationship: uniq(caseData.evidenceLinks.map((item) => item.relationship)),
  };
}

export function evidenceLinkMatchesFilters(caseData, filters, link) {
  const evidence = getEvidenceById(caseData, link.evidenceId);
  if (!evidence) return false;

  return (
    (filters.type === "all" || evidence.type === filters.type) &&
    (filters.authenticity === "all" || evidence.authenticity === filters.authenticity) &&
    (filters.relevance === "all" || link.relevance === filters.relevance) &&
    (filters.relationship === "all" || link.relationship === filters.relationship)
  );
}

export function getFirstMatchingEvidenceLink(caseData, filters) {
  return caseData.evidenceLinks.find((link) => evidenceLinkMatchesFilters(caseData, filters, link)) || null;
}

export function validateCaseReferences(caseData) {
  const evidenceIds = new Set(caseData.evidence.map((item) => item.id));
  const assessmentCellIds = new Set(caseData.assessmentCells.map((item) => item.id));
  const assumptionIds = new Set(caseData.phases.flatMap((phase) => phase.assumptions.map((item) => item.id)));
  const issues = [];

  caseData.evidenceLinks.forEach((link) => {
    if (!evidenceIds.has(link.evidenceId)) {
      issues.push({ type: "missing_evidence", id: link.evidenceId, linkId: link.id });
    }
    if (link.assessmentCellId && !assessmentCellIds.has(link.assessmentCellId)) {
      issues.push({ type: "missing_assessment_cell", id: link.assessmentCellId, linkId: link.id });
    }
  });

  caseData.preWarChecklist.forEach((item) => {
    item.linkedCells.forEach((id) => {
      if (!assessmentCellIds.has(id)) issues.push({ type: "missing_prewar_cell", id, itemId: item.id });
    });
    item.linkedAssumptions.forEach((id) => {
      if (!assumptionIds.has(id)) issues.push({ type: "missing_prewar_assumption", id, itemId: item.id });
    });
  });

  return issues;
}
