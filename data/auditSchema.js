export const viewMeta = {
  overview: ["Overview", "この戦争監査の暫定結論は何か？"],
  timeline: ["Decision Timeline", "各判断時点で、当時の情報から見て判断修正は可能だったか？"],
  prewar: ["Pre-War Checklist", "開戦前に評価可能だった項目のうち、評価形跡が欠けているのはどこか？"],
  assessment: ["Assessment", "どの評価軸・どの判断時点に、重大な懸念が集中しているか？"],
  evidence: ["Evidence Graph", "どの証拠が、どの claim を支持・反証・保留しているか？"],
  opinion: ["Audit Opinion", "証拠と限定事項を踏まえると、最終的な監査意見は何か？"],
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
  const evidence = Array.isArray(caseData.evidence) ? caseData.evidence : [];
  const phases = Array.isArray(caseData.phases) ? caseData.phases : [];
  const assessmentCells = Array.isArray(caseData.assessmentCells) ? caseData.assessmentCells : [];
  const claims = Array.isArray(caseData.claims) ? caseData.claims : [];
  const evidenceLinks = Array.isArray(caseData.evidenceLinks) ? caseData.evidenceLinks : [];
  const preWarChecklist = Array.isArray(caseData.preWarChecklist) ? caseData.preWarChecklist : [];
  const ratingBasis = Array.isArray(caseData.ratingBasis) ? caseData.ratingBasis : [];
  const issues = [];

  const addMissingArrayIssue = (fieldName, value) => {
    if (!Array.isArray(value)) issues.push({ type: "missing_array", field: fieldName });
  };
  const addDuplicateIdIssues = (type, items, getId = (item) => item.id) => {
    const seen = new Map();
    items.forEach((item, index) => {
      const id = getId(item);
      if (!id) return;
      if (seen.has(id)) issues.push({ type, id, firstIndex: seen.get(id), index });
      else seen.set(id, index);
    });
  };

  addMissingArrayIssue("evidence", caseData.evidence);
  addMissingArrayIssue("phases", caseData.phases);
  addMissingArrayIssue("assessmentCells", caseData.assessmentCells);
  addMissingArrayIssue("evidenceLinks", caseData.evidenceLinks);
  addMissingArrayIssue("preWarChecklist", caseData.preWarChecklist);

  addDuplicateIdIssues("duplicate_evidence_id", evidence);
  addDuplicateIdIssues("duplicate_phase_id", phases);
  addDuplicateIdIssues("duplicate_assessment_cell_id", assessmentCells);
  addDuplicateIdIssues("duplicate_claim_id", claims);
  addDuplicateIdIssues("duplicate_evidence_link_id", evidenceLinks);
  addDuplicateIdIssues("duplicate_prewar_item_id", preWarChecklist);
  addDuplicateIdIssues(
    "duplicate_assumption_id",
    phases.flatMap((phase) => (Array.isArray(phase.assumptions) ? phase.assumptions : [])),
  );
  addDuplicateIdIssues("duplicate_assessment_axis_phase", assessmentCells, (cell) => `${cell.axis} / ${cell.phase}`);

  const evidenceIds = new Set(evidence.map((item) => item.id));
  const assessmentCellIds = new Set(assessmentCells.map((item) => item.id));
  const assumptionIds = new Set(phases.flatMap((phase) => (Array.isArray(phase.assumptions) ? phase.assumptions : []).map((item) => item.id)));
  const claimIds = new Set(claims.map((item) => item.id));
  const evidenceLinkIds = new Set(evidenceLinks.map((item) => item.id));

  phases.forEach((phase, index) => {
    if (!Array.isArray(phase.assumptions)) issues.push({ type: "missing_phase_assumptions", id: phase.id, index });
  });

  evidenceLinks.forEach((link) => {
    if (!evidenceIds.has(link.evidenceId)) {
      issues.push({ type: "missing_evidence", id: link.evidenceId, linkId: link.id });
    }
    if (link.assessmentCellId && !assessmentCellIds.has(link.assessmentCellId)) {
      issues.push({ type: "missing_assessment_cell", id: link.assessmentCellId, linkId: link.id });
    }
    // S-1: evidenceLink → claim の参照整合（claimId は dangling になりやすい）
    if (link.claimId && !claimIds.has(link.claimId)) {
      issues.push({ type: "missing_claim", id: link.claimId, linkId: link.id });
    }
  });

  preWarChecklist.forEach((item) => {
    if (!Array.isArray(item.linkedCells)) {
      issues.push({ type: "missing_prewar_linked_cells", itemId: item.id });
    } else {
      item.linkedCells.forEach((id) => {
        if (!assessmentCellIds.has(id)) issues.push({ type: "missing_prewar_cell", id, itemId: item.id });
      });
    }
    if (!Array.isArray(item.linkedAssumptions)) {
      issues.push({ type: "missing_prewar_linked_assumptions", itemId: item.id });
    } else {
      item.linkedAssumptions.forEach((id) => {
        if (!assumptionIds.has(id)) issues.push({ type: "missing_prewar_assumption", id, itemId: item.id });
      });
    }
    if (item.linkedEvidenceLinks !== undefined) {
      if (!Array.isArray(item.linkedEvidenceLinks)) {
        issues.push({ type: "invalid_prewar_linked_evidence_links", itemId: item.id });
      } else {
        item.linkedEvidenceLinks.forEach((id) => {
          if (!evidenceLinkIds.has(id)) issues.push({ type: "missing_prewar_evidence_link", id, itemId: item.id });
        });
      }
    }
  });

  // S-1: ratingBasis → assessmentCell の参照整合。
  // S-2: 全ケース cellId 統一済み。cellId を持つ項目を参照検査する。
  ratingBasis.forEach((basis, index) => {
    if (basis.cellId && !assessmentCellIds.has(basis.cellId)) {
      issues.push({ type: "missing_rating_cell", id: basis.cellId, index });
    }
  });

  // Phase B: ratingRules.knockoutCriteria[].cellIds → assessmentCell の参照整合（任意フィールド）。
  const knockoutCriteria = Array.isArray(caseData.ratingRules?.knockoutCriteria)
    ? caseData.ratingRules.knockoutCriteria
    : [];
  knockoutCriteria.forEach((ko, index) => {
    const cellIds = Array.isArray(ko.cellIds) ? ko.cellIds : [];
    cellIds.forEach((id) => {
      if (!assessmentCellIds.has(id)) {
        issues.push({ type: "missing_knockout_cell", id, koId: ko.id, index });
      }
    });
  });

  // Phase C: dependencyRules[].linkedCellIds → assessmentCell の参照整合（任意フィールド）。
  // inputs は抽象ファクタ（自由記述）ゆえ参照検査の対象外。linkedCellIds のみ dangling を検査する。
  const dependencyRules = Array.isArray(caseData.dependencyRules) ? caseData.dependencyRules : [];
  dependencyRules.forEach((dep, index) => {
    const cellIds = Array.isArray(dep.linkedCellIds) ? dep.linkedCellIds : [];
    cellIds.forEach((id) => {
      if (!assessmentCellIds.has(id)) {
        issues.push({ type: "missing_dependency_cell", id, depId: dep.id, index });
      }
    });
  });

  // 注: hypothesisTracking[].checkpoints[].phase は phase.name への参照ではなく
  //   自由記述のチェックポイント名（例「機動部隊派遣後」）であり、ID 参照を持たない。
  //   よって参照整合の検査対象にはしない（誤検知を避ける）。

  return issues;
}


export function validateCaseRegistry(cases) {
  const issues = [];
  const seen = new Map();
  const list = Array.isArray(cases) ? cases : [];
  const counterpartById = new Map();
  list.forEach((caseData, index) => {
    const id = caseData?.warCase?.id;
    if (!id) {
      issues.push({ type: "missing_case_id", index });
      return;
    }
    if (seen.has(id)) issues.push({ type: "duplicate_case_id", id, firstIndex: seen.get(id), index });
    else seen.set(id, index);
    const counterpart = caseData?.warCase?.counterpartCaseId;
    if (counterpart !== undefined) counterpartById.set(id, counterpart);
  });
  // 対照ケース（counterpartCaseId）の相互参照整合: 実在・双方向・自己参照禁止を検査。
  counterpartById.forEach((counterpart, id) => {
    if (counterpart === id) {
      issues.push({ type: "counterpart_self_reference", id });
      return;
    }
    if (!seen.has(counterpart)) {
      issues.push({ type: "missing_counterpart_case", id, counterpartCaseId: counterpart });
      return;
    }
    if (counterpartById.get(counterpart) !== id) {
      issues.push({ type: "counterpart_not_mutual", id, counterpartCaseId: counterpart });
    }
  });
  return issues;
}
// S-1（方法論リント）: 第一原則「反証を隠さない」を口頭原則からコード化された検査へ昇格。
// validateCaseReferences が「参照の整合」を見るのに対し、こちらは「監査としての健全性」を見る。
export function lintCaseMethodology(caseData) {
  const findings = [];
  const links = Array.isArray(caseData.evidenceLinks) ? caseData.evidenceLinks : [];
  const claims = Array.isArray(caseData.claims) ? caseData.claims : [];
  const validTimeFits = new Set(["直接", "間接"]);
  const requiredTextFields = ["canSay", "cannotSay", "knownByDecisionMakers", "knownByDecisionMakersBasis"];

  links.forEach((link) => {
    requiredTextFields.forEach((field) => {
      if (typeof link[field] !== "string" || link[field].trim() === "") {
        findings.push({ type: "missing_link_limitation", id: link.id, field, severity: "注意" });
      }
    });

    if (!validTimeFits.has(link.timeFit)) {
      findings.push({ type: "invalid_time_fit", id: link.id, value: link.timeFit, severity: "注意" });
    }
    if (typeof link.availableAtDecisionTime !== "boolean") {
      findings.push({ type: "missing_decision_time_flag", id: link.id, severity: "注意" });
    }
    if (link.timeFit === "直接" && link.availableAtDecisionTime !== true) {
      findings.push({ type: "direct_evidence_not_available_at_decision_time", id: link.id, severity: "重大" });
    }
    if (!link.claimId || !link.assessmentCellId) {
      findings.push({ type: "link_without_claim_or_cell", id: link.id, relationship: link.relationship, severity: "注意" });
    }
  });

  // (1) ケース全体で反証リンクが 0 件 ＝ 支持一色。原則がデータで破れている【重大】。
  const counterCount = links.filter((link) => link.relationship === "反証").length;
  if (counterCount === 0) {
    findings.push({ type: "no_counter_evidence", severity: "重大" });
  }

  // (2) クレームの対称性・生存性の検証
  const supportByClaim = new Map();
  const counterByClaim = new Map();
  const totalLinksByClaim = new Map();
  links.forEach((link) => {
    if (!link.claimId) return;
    totalLinksByClaim.set(link.claimId, (totalLinksByClaim.get(link.claimId) || 0) + 1);
    if (link.relationship === "支持") supportByClaim.set(link.claimId, (supportByClaim.get(link.claimId) || 0) + 1);
    if (link.relationship === "反証") counterByClaim.set(link.claimId, (counterByClaim.get(link.claimId) || 0) + 1);
  });
  claims.forEach((claim) => {
    const supports = supportByClaim.get(claim.id) || 0;
    const counters = counterByClaim.get(claim.id) || 0;
    const totalLinks = totalLinksByClaim.get(claim.id) || 0;

    if (totalLinks === 0) {
      findings.push({ type: "unlinked_claim", id: claim.id, claimType: claim.type, severity: "重大" });
    } else if (supports > 0 && counters === 0) {
      findings.push({ type: "one_sided_claim", id: claim.id, claimType: claim.type, severity: "注意", supports });
    } else if (supports === 0 && counters > 0) {
      findings.push({ type: "unsupported_claim", id: claim.id, claimType: claim.type, severity: "注意", counters });
    }
  });

  // (3) 未収集の「形跡なし」検出（CANON §6）。
  //   actuallyEvaluated:"形跡なし" は証拠で評価痕跡の不在を裏づけた場合のみ許容し、
  //   その裏づけは noEvidenceReason:"該当証拠なし"（＝調査範囲を確認した上での不在）で表す。
  //   証拠未収集・未接続・未指定のまま「形跡なし」とするのは、未収集を確定評価へ変換する違反で、
  //   高重要度では偽の「重大懸念」（高×形跡なし）を生む。Gulf イラク2件（該当証拠なし＋調査範囲明記）は許容。
  const preWarChecklist = Array.isArray(caseData.preWarChecklist) ? caseData.preWarChecklist : [];
  preWarChecklist.forEach((item) => {
    if (item.actuallyEvaluated === "形跡なし" && item.noEvidenceReason !== "該当証拠なし") {
      findings.push({
        type: "uncollected_no_trace",
        id: item.id,
        noEvidenceReason: item.noEvidenceReason ?? null,
        severity: "重大",
      });
    }
  });

  return findings;
}
