import {
  getDefaultEvidenceFilters,
  getFirstMatchingEvidenceLink,
  lintCaseMethodology,
  validateCaseReferences,
  validateCaseRegistry,
  viewMeta,
} from "./data/auditSchema.js?v=20260626-counterpart-a11y";
import { cases } from "./data/cases/index.js?v=20260626-counterpart-a11y";
import { createRenderers } from "./ui/renderers.js?v=20260626-counterpart-a11y";

let activeCase = cases.find((item) => item.warCase.id === "gulf-war-1990-iraq") || cases[0];
let state = stateForCase(activeCase);
let renderers = createRenderers(activeCase, state);

function stateForCase(caseData, activeView = "overview") {
  return {
    activeView,
    activeTimelinePhaseId: caseData.phases[0]?.id || null,
    activeEvidenceLinkId: caseData.evidenceLinks[0]?.id || null,
    activeAssessmentCellId: caseData.assessmentCells[0]?.id || null,
    opinionMode: "summary",
    evidenceFilters: getDefaultEvidenceFilters(),
  };
}

function validateCaseRegistryOnce() {
  const registryIssues = validateCaseRegistry(cases);
  if (registryIssues.length > 0) {
    console.warn("Case registry issues", registryIssues);
  }
}

function validateActiveCase() {
  const referenceIssues = validateCaseReferences(activeCase);
  if (referenceIssues.length > 0) {
    console.warn("Case data reference issues", referenceIssues);
  }
  // S-1: 方法論リント（「反証を隠さない」のコード化）。参照整合とは別レイヤーで監査健全性を警告。
  const methodologyFindings = lintCaseMethodology(activeCase);
  if (methodologyFindings.length > 0) {
    // R-2: 要約文字列を併記して [object Object] 表示を避ける（生配列は devtools 用に第2引数で残す）。
    // R-4: claimType を併記し、whitewash(counter_claim)/witch-hunt(audit_issue) を区別可能にする。
    const summary = methodologyFindings
      .map((f) => (f.id ? `${f.type}(${f.id}${f.claimType ? ":" + f.claimType : ""})` : f.type))
      .join(", ");
    console.warn(`Case methodology findings [${activeCase.warCase.id}]: ${summary}`, methodologyFindings);
  }
}

function updateShellCaseMetadata() {
  document.querySelector(".brand-block h1").textContent = activeCase.warCase.name;
  document.querySelector(".brand-block p:last-child").textContent = activeCase.warCase.auditedActor;
  document.querySelector(".rating-pill strong").textContent = activeCase.warCase.rating;
  const selector = document.querySelector("#case-selector");
  if (selector) selector.value = activeCase.warCase.id;
}

function renderCaseSelector() {
  const selector = document.querySelector("#case-selector");
  if (!selector) return;
  // 戦争（conflict）単位で optgroup にまとめ、同一戦争の加害側/連合側など対の関係を可視化する。
  // 出現順を保持しつつグループ化（conflict 未設定のケースは name を単独グループ扱い）。
  const groups = [];
  const byLabel = new Map();
  cases.forEach((caseData) => {
    const label = caseData.warCase.conflict || caseData.warCase.name;
    if (!byLabel.has(label)) {
      const group = { label, items: [] };
      byLabel.set(label, group);
      groups.push(group);
    }
    byLabel.get(label).items.push(caseData);
  });
  selector.innerHTML = groups
    .map(
      (group) => `
        <optgroup label="${group.label}">
          ${group.items
            .map(
              (caseData) =>
                `<option value="${caseData.warCase.id}">${caseData.warCase.auditedActor}</option>`,
            )
            .join("")}
        </optgroup>
      `,
    )
    .join("");
}

// I-9: 対照ケース（counterpartCaseId）への軽量導線。renderers はケース局所のため、
// 横断ナビゲーション（cases を参照）は app.js 側で描画する。
function renderCounterpartNav() {
  const container = document.querySelector("#counterpart-nav");
  if (!container) return;
  const counterpartId = activeCase.warCase.counterpartCaseId;
  const counterpart = counterpartId
    ? cases.find((item) => item.warCase.id === counterpartId)
    : null;
  if (!counterpart) {
    container.hidden = true;
    container.innerHTML = "";
    return;
  }
  container.hidden = false;
  container.innerHTML = `
    <span class="counterpart-label">対照ケース</span>
    <button type="button" class="counterpart-button" data-goto-case="${counterpart.warCase.id}">
      ${counterpart.warCase.auditedActor} を見る
    </button>
  `;
}

// UI-8: 大領域（#view-root）の aria-live を撤去した代わりに、簡潔な操作結果のみを
// 専用の視覚非表示ライブ領域へ流す。ビュー全文の冗長読み上げを避ける。
function announce(message) {
  const region = document.querySelector("#sr-status");
  if (region) region.textContent = message;
}

function setActiveView(view) {
  state.activeView = view;
  document.querySelectorAll("[data-view]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.view === view);
  });
}

function setActiveCase(caseId) {
  const nextCase = cases.find((item) => item.warCase.id === caseId);
  if (!nextCase || nextCase === activeCase) return;
  const currentView = state.activeView;
  activeCase = nextCase;
  state = stateForCase(activeCase, currentView);
  renderers = createRenderers(activeCase, state);
  setActiveView(state.activeView);
  validateActiveCase();
  updateShellCaseMetadata();
  renderCounterpartNav();
  render();
  announce(`ケースを切替: ${activeCase.warCase.name}`);
}

function render() {
  const [kicker, title] = viewMeta[state.activeView];
  document.querySelector("#view-kicker").textContent = kicker;
  document.querySelector("#view-title").textContent = title;

  const root = document.querySelector("#view-root");
  root.innerHTML = renderers[state.activeView]();
}

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    setActiveView(button.dataset.view);
    render();
    announce(`${viewMeta[button.dataset.view][1]} を表示`);
  });
});

document.addEventListener("click", (event) => {
  const gotoCaseButton = event.target.closest("[data-goto-case]");
  if (gotoCaseButton) {
    setActiveCase(gotoCaseButton.dataset.gotoCase);
    return;
  }

  const evidenceButton = event.target.closest("[data-evidence-link]");
  if (evidenceButton) {
    state.activeEvidenceLinkId = evidenceButton.dataset.evidenceLink;
    render();
    announce(`証拠リンクを選択: ${state.activeEvidenceLinkId}`);
  }

  const timelinePhaseButton = event.target.closest("[data-timeline-phase]");
  if (timelinePhaseButton) {
    state.activeTimelinePhaseId = timelinePhaseButton.dataset.timelinePhase;
    render();
  }

  const modeButton = event.target.closest("[data-mode]");
  if (modeButton) {
    state.opinionMode = modeButton.dataset.mode;
    render();
  }

  const assessmentButton = event.target.closest("[data-assessment-cell]");
  if (assessmentButton) {
    state.activeAssessmentCellId = assessmentButton.dataset.assessmentCell;
    render();
    const cell = activeCase.assessmentCells.find((item) => item.id === state.activeAssessmentCellId);
    if (cell) announce(`評価セルを選択: ${cell.axis} / ${cell.phase}`);
  }

  const queueAssessmentButton = event.target.closest("[data-queue-assessment-cell]");
  if (queueAssessmentButton) {
    state.activeAssessmentCellId = queueAssessmentButton.dataset.queueAssessmentCell;
    setActiveView("assessment");
    render();
  }

  const resetFiltersButton = event.target.closest("[data-reset-filters]");
  if (resetFiltersButton) {
    state.evidenceFilters = getDefaultEvidenceFilters();
    state.activeEvidenceLinkId = getFirstMatchingEvidenceLink(activeCase, state.evidenceFilters)?.id || null;
    render();
  }
});

document.addEventListener("change", (event) => {
  const caseSelector = event.target.closest("#case-selector");
  if (caseSelector) {
    setActiveCase(caseSelector.value);
    return;
  }

  const filter = event.target.closest("[data-filter]");
  if (!filter) return;
  state.evidenceFilters[filter.dataset.filter] = filter.value;
  state.activeEvidenceLinkId = getFirstMatchingEvidenceLink(activeCase, state.evidenceFilters)?.id || null;
  render();
});

renderCaseSelector();
validateCaseRegistryOnce();
validateActiveCase();
updateShellCaseMetadata();
renderCounterpartNav();
render();

