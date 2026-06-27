// cache-busting: ?v= は app.js / index.html / data/cases/index.js / 本ファイルの4箇所で同一文字列に揃えること。
// ズレると同一モジュールが別URLとして二重ロードされ、モジュール状態が分裂する。
import {
  actuallyEvaluatedOrder,
  deriveStatus,
  evaluabilityOrder,
  evidenceActionLabels,
  evidenceLinkMatchesFilters as linkMatchesFilters,
  getEvidenceFilterOptions,
  noEvidenceReasonOrder,
  resolveStatus,
  statusClass,
  statusOrder,
} from "../data/auditSchema.js?v=20260627-ruu-time-caveats";

export function createRenderers(auditData, state) {
function getAssumption(id) {
  for (const phase of auditData.phases) {
    const found = phase.assumptions.find((item) => item.id === id);
    if (found) return found;
  }
  return null;
}



function hasActiveEvidenceFilters() {
  return Object.values(state.evidenceFilters).some((value) => value !== "all");
}

function badge(label) {
  return `<span class="badge ${statusClass[label] || "review"}">${label}</span>`;
}

function relationshipBadge(label) {
  const className = { 支持: "evidence-support", 反証: "evidence-counter", 保留: "evidence-hold" }[label] || "evidence-hold";
  return `<span class="badge ${className}">${label}</span>`;
}

function timeBadge(link) {
  const isAfterDecision = link.availableAtDecisionTime === false || link.target?.includes("事後対照");
  const className = isAfterDecision ? "time-after" : "time-direct";
  const label = isAfterDecision ? "事後対照" : "判断時点可";
  return `<span class="time-badge ${className}">${label}</span>`;
}

function getEvidence(id) {
  return auditData.evidence.find((item) => item.id === id);
}

function getEvidenceLink(id) {
  return auditData.evidenceLinks.find((item) => item.id === id);
}

function getAssessmentCell(id) {
  return auditData.assessmentCells.find((item) => item.id === id);
}

function getEvidenceActionLabel(type) {
  return evidenceActionLabels[type] || "未設定";
}

function getCellsWithoutEvidenceLinks() {
  return auditData.assessmentCells.filter(
    (cell) => cell.noEvidenceReason || !auditData.evidenceLinks.some((link) => link.assessmentCellId === cell.id),
  );
}

function getNoEvidenceReasonSummary(cells) {
  return noEvidenceReasonOrder
    .map((reason) => `${reason} ${cells.filter((cell) => cell.noEvidenceReason === reason).length}件`)
    .join(" / ");
}

function getCellsWithoutEvidenceLinksByReason(cells) {
  return noEvidenceReasonOrder
    .map((reason) => ({ reason, cells: cells.filter((cell) => cell.noEvidenceReason === reason) }))
    .filter((group) => group.cells.length > 0);
}

function evidenceLinkMatchesFilters(link) {
  return linkMatchesFilters(auditData, state.evidenceFilters, link);
}

function optionList(options, selected) {
  return options
    .map((value) => `<option value="${value}" ${selected === value ? "selected" : ""}>${value}</option>`)
    .join("");
}

function renderFilterSelect(key, label, options) {
  return `
    <select aria-label="${label}" data-filter="${key}">
      <option value="all">${label}</option>
      ${optionList(options, state.evidenceFilters[key])}
    </select>
  `;
}

function missingEvidenceTitle(link) {
  return `欠損証拠: ${link.evidenceId}`;
}

function formatValue(value) {
  if (Array.isArray(value)) return value.join(" / ");
  return value ?? "";
}

function renderParagraphs(text) {
  return String(text || "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

function renderOverview() {
  const snapshot = auditData.warCase;
  return `
    <section class="section">
      <h3>総合監査意見</h3>
      ${renderParagraphs(auditData.overviewOpinion)}
    </section>

    <section class="section">
      <h3>主要な監査上の論点</h3>
      ${auditData.issues
        .map(
          (issue) => `
            <div class="issue-row">
              <strong>${issue.name}</strong>
              ${badge(issue.status)}
            </div>
          `,
        )
        .join("")}
    </section>

    <div class="grid two">
      <section class="section">
        <h3>反対仮説</h3>
        <ul class="clean">
          ${auditData.counterHypotheses.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>
      <section class="section">
        <h3>監査スナップショット</h3>
        <dl class="metric-list">
          <div class="metric-row"><dt>監査対象</dt><dd>${snapshot.auditedActor}</dd></div>
          <div class="metric-row"><dt>評価単位</dt><dd>戦争単位</dd></div>
          <div class="metric-row"><dt>監査範囲</dt><dd>${snapshot.scope}</dd></div>
          <div class="metric-row"><dt>主要な責任評価</dt><dd>${snapshot.primaryResponsibility}</dd></div>
          <div class="metric-row"><dt>不確実性</dt><dd>${snapshot.uncertainty}</dd></div>
          <div class="metric-row"><dt>補助格付け</dt><dd>${snapshot.rating}</dd></div>
        </dl>
        ${auditData.warCase.ratingNote ? `<p class="muted">${auditData.warCase.ratingNote}</p>` : ""}
      </section>
    </div>
  `;
}

function renderTimeline() {
  // U-1: フェーズは選択可能。転換点/終戦判断の前提・監査の問い等が UI から到達できるようにする。
  const selected =
    auditData.phases.find((phase) => phase.id === state.activeTimelinePhaseId) || auditData.phases[0];
  const hypothesisTrack = auditData.hypothesisTracking?.[0] || null;
  const hypothesisCheckpoints = hypothesisTrack?.checkpoints || [];
  return `
    <section class="section">
      <h3>意思決定タイムライン</h3>
      <div class="timeline-nodes">
        ${auditData.phases
          .map((phase, index) => {
            const isSelected = phase.id === selected.id;
            return `
              <article class="timeline-node ${isSelected ? "is-selected" : ""}">
                <button
                  class="timeline-node-select"
                  type="button"
                  data-timeline-phase="${phase.id}"
                  aria-pressed="${isSelected ? "true" : "false"}"
                >${index + 1}. ${phase.name}</button>
                <dl>
                  <dt>状態</dt><dd>${badge(phase.status)}</dd>
                  <dt>修正余地</dt><dd>${badge(phase.revisionRoom)}</dd>
                  <dt>論点</dt><dd>${phase.mainIssue}</dd>
                </dl>
              </article>
            `;
          })
          .join("")}
      </div>
    </section>

    <section class="section">
      <h3>選択中: ${selected.name}</h3>
      <p>${selected.decision}</p>
    </section>

    <div class="grid two">
      <section class="section">
        <h3>判断前提の監査</h3>
        <dl class="metric-list">
          ${selected.assumptions.length
            ? selected.assumptions
                .map(
                  (item) => `
                    <div class="metric-row">
                      <dt>${item.type}</dt>
                      <dd>${item.content}<br><span class="muted">根拠レベル: ${item.basis}</span></dd>
                    </div>
                  `,
                )
                .join("")
            : `<p class="muted">なし</p>`}
        </dl>
      </section>
      <section class="section">
        <h3>監査シート</h3>
        <dl class="metric-list">
          <div class="metric-row"><dt>当時利用可能だった情報</dt><dd>${selected.availableInfo}</dd></div>
          <div class="metric-row"><dt>代替案</dt><dd>${formatValue(selected.alternatives)}</dd></div>
          <div class="metric-row"><dt>判断修正余地</dt><dd>${badge(selected.revisionRoom)}<br><span class="muted">${selected.revisionNote}</span></dd></div>
          <div class="metric-row"><dt>監査上の疑問</dt><dd>${selected.auditQuestion}</dd></div>
        </dl>
      </section>
    </div>

    ${hypothesisCheckpoints.length
      ? `
        <section class="section">
          <h3>反対仮説の状態変化</h3>
          <p><strong>仮説:</strong> ${hypothesisTrack?.hypothesis || auditData.counterHypotheses[0] || "未設定"}</p>
          <div class="grid three">
            ${hypothesisCheckpoints
              .map(
                (item) => `
                  <div class="mini-card">
                    <h3>${item.phase}</h3>
                    <p>${item.status}</p>
                  </div>
                `,
              )
              .join("")}
          </div>
        </section>
      `
      : ""}
  `;
}

function renderAssessment() {
  const phases = [...new Set(auditData.assessmentCells.map((cell) => cell.phase))];
  const axes = [...new Set(auditData.assessmentCells.map((cell) => cell.axis))];
  const selectedCell = getAssessmentCell(state.activeAssessmentCellId) || auditData.assessmentCells[0];
  const evidenceRows = selectedCell
    ? auditData.evidenceLinks.filter((link) => link.assessmentCellId === selectedCell.id)
    : [];

  return `
    <section class="section">
      <h3>評価マトリクス</h3>
      <table class="assessment-table">
        <thead>
          <tr>
            <th>評価軸</th>
            ${phases.map((phase) => `<th>${phase}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${axes
            .map(
              (axis) => `
                <tr>
                  <th>${axis}</th>
                  ${phases
                    .map((phase) => {
                      const cell = auditData.assessmentCells.find(
                        (item) => item.axis === axis && item.phase === phase,
                      );
                      const isSelected = cell && cell.id === selectedCell.id;
                      return `
                        <td>
                          ${cell
                            ? `
                              <button
                                class="assessment-cell-button ${isSelected ? "is-selected" : ""}"
                                type="button"
                                data-assessment-cell="${cell.id}"
                                aria-pressed="${isSelected ? "true" : "false"}"
                              >
                                ${badge(cell.status)}
                                <span class="cell-meta">影響: ${cell.impact}</span>
                                <span class="cell-meta">証拠: ${cell.evidenceStrength}</span>
                              </button>
                            `
                            : `<span class="cell-undefined" aria-hidden="true">—</span>`}
                        </td>
                      `;
                    })
                    .join("")}
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
      <p class="matrix-note muted">評価軸×局面は直積で表示しているため、監査対象としていない組み合わせ（—）は意図的に空白です。各ケースは責任範囲を絞った監査であり、全マスを埋めることは目的ではありません。</p>
    </section>

    <section class="section">
      <h3>選択中: ${selectedCell.axis} / ${selectedCell.phase}</h3>
      <div class="grid three">
        <div class="mini-card"><h3>監査ステータス</h3>${badge(selectedCell.status)}</div>
        <div class="mini-card"><h3>影響度</h3><p>${selectedCell.impact}</p></div>
        <div class="mini-card"><h3>証拠充足度</h3><p>${selectedCell.evidenceStrength}</p></div>
      </div>
      <p>${selectedCell.opinion}</p>
    </section>

    <section class="section">
      <h3>証拠リンク</h3>
      ${evidenceRows
        .map((link) => {
          const evidence = getEvidence(link.evidenceId);
          return `
            <div class="issue-row assessment-link-row">
              ${relationshipBadge(link.relationship)}
              <strong>${evidence ? evidence.title : missingEvidenceTitle(link)}</strong>
              <span>真正性 ${evidence?.authenticity || "未確認"}</span>
              <span>${link.reviewState}</span>
              <span class="cell-meta">${link.id}</span>
            </div>
          `;
        })
        .join("")}
      ${
        evidenceRows.length === 0
          ? `<p class="muted">この評価セルに紐づく証拠リンクはまだありません。理由: ${selectedCell.noEvidenceReason || "未分類"}。次アクション: ${getEvidenceActionLabel(selectedCell.nextEvidenceActionType)}</p>`
          : ""
      }
    </section>


    <div class="grid two">
      <section class="section">
        <h3>判定条件</h3>
        <ul class="clean">${selectedCell.criteria.map((item) => `<li>${item}</li>`).join("")}</ul>
      </section>
      <section class="section">
        <h3>評価が変わりうる条件</h3>
        <ul class="clean">${selectedCell.changeConditions.map((item) => `<li>${item}</li>`).join("")}</ul>
      </section>
    </div>
  `;
}

function renderEvidence() {
  const filterOptions = getEvidenceFilterOptions(auditData);
  const filteredLinks = auditData.evidenceLinks.filter(evidenceLinkMatchesFilters);
  const filtersActive = hasActiveEvidenceFilters();
  const cellsWithoutEvidenceLinks = getCellsWithoutEvidenceLinks();
  const selectedLink = filteredLinks.find((item) => item.id === state.activeEvidenceLinkId) || filteredLinks[0] || null;
  const selectedEvidence = selectedLink ? getEvidence(selectedLink.evidenceId) : null;

  return `
    <div class="evidence-layout">
      <section class="section">
        <h3>証拠グラフ</h3>
        <div class="filter-bar">
          ${renderFilterSelect("type", "証拠種類", filterOptions.type)}
          ${renderFilterSelect("authenticity", "真正性", filterOptions.authenticity)}
          ${renderFilterSelect("relevance", "関連度", filterOptions.relevance)}
          ${renderFilterSelect("relationship", "支持 / 反証 / 保留", filterOptions.relationship)}
          <button class="filter-reset" type="button" data-reset-filters ${filtersActive ? "" : "disabled"}>フィルター解除</button>
        </div>
        <p class="muted">表示中 ${filteredLinks.length} / ${auditData.evidenceLinks.length} 件</p>
        <table class="evidence-table">
          <thead>
            <tr>
              <th>証拠</th>
              <th>論点 / claim</th>
              <th>評価セル / 反対仮説</th>
            </tr>
          </thead>
          <tbody>
            ${filteredLinks
              .map((link) => {
                const evidence = getEvidence(link.evidenceId);
                if (!evidence) return "";
                return `
                  <tr>
                    <td>
                      <button class="link-button" type="button" data-evidence-link="${link.id}">
                        <strong>${evidence.id}</strong><br>${evidence.title}
                      </button>
                    </td>
                    <td>${link.claimLabel}</td>
                    <td>
                      <div class="cell-stack">
                        <strong>${link.target}</strong>
                        ${relationshipBadge(link.relationship)}
                        <span class="cell-meta">真正性: ${evidence.authenticity}</span>
                        <span class="cell-meta">解釈信頼性: ${evidence.interpretiveReliability}</span>
                        ${timeBadge(link)}
                      </div>
                    </td>
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
        ${filteredLinks.length === 0 ? `<p class="muted">条件に一致する証拠リンクはありません。</p>` : ""}
      </section>

      <section class="section">
        <h3>証拠待ち・未接続セル一覧</h3>
        <p class="muted">${getNoEvidenceReasonSummary(cellsWithoutEvidenceLinks)}</p>
        ${cellsWithoutEvidenceLinks.length
          ? getCellsWithoutEvidenceLinksByReason(cellsWithoutEvidenceLinks)
              .map(
                (group) => `
                  <div class="queue-group">
                    <h4>${group.reason}</h4>
                    ${group.cells
                      .map(
                        (cell) => `
                          <button class="queue-row" type="button" data-queue-assessment-cell="${cell.id}">
                            <strong>${cell.axis} / ${cell.phase}</strong>
                            <span>${getEvidenceActionLabel(cell.nextEvidenceActionType)}</span>
                            <span class="queue-action">Assessmentで確認</span>
                          </button>
                        `,
                      )
                      .join("")}
                  </div>
                `,
              )
              .join("")
          : `<p class="muted">証拠待ち・未接続セルはありません。</p>`}
      </section>

      <section class="section detail-panel">
        ${selectedLink
          ? `
            <h3>選択中リンク: ${selectedLink.id}</h3>
            <p class="metric-group-label">資料</p>
            <dl class="metric-list">
              <div class="metric-row"><dt>ID</dt><dd>${selectedEvidence?.id || selectedLink.evidenceId}</dd></div>
              <div class="metric-row"><dt>タイトル</dt><dd>${selectedEvidence?.title || missingEvidenceTitle(selectedLink)}</dd></div>
              <div class="metric-row"><dt>種類</dt><dd>${selectedEvidence?.type || "未確認"}</dd></div>
              <div class="metric-row"><dt>出典</dt><dd>${selectedEvidence?.source || "証拠データ未接続"}</dd></div>
              <div class="metric-row"><dt>資料状態</dt><dd>${selectedEvidence?.collectionState || "要修正"}</dd></div>
            </dl>
            <p class="metric-group-label">時点</p>
            <dl class="metric-list">
              <div class="metric-row"><dt>刊行/生成</dt><dd>${selectedEvidence?.publishedDate || "未確認"}</dd></div>
              <div class="metric-row"><dt>対象期間</dt><dd>${selectedEvidence?.coveragePeriod || "未確認"}</dd></div>
              <div class="metric-row"><dt>時点適合度</dt><dd>${selectedLink.timeFit} ${timeBadge(selectedLink)}</dd></div>
              <div class="metric-row"><dt>判断時点で利用可能</dt><dd>${selectedLink.availableAtDecisionTime ? "はい" : "いいえ"}</dd></div>
              <div class="metric-row"><dt>分析者が知り得た</dt><dd>${selectedLink.availableToAnalysts ? "はい" : "いいえ"}</dd></div>
            </dl>
            <p class="metric-group-label">信頼性</p>
            <dl class="metric-list">
              <div class="metric-row"><dt>真正性</dt><dd>${selectedEvidence?.authenticity || "未確認"}</dd></div>
              <div class="metric-row"><dt>解釈信頼性</dt><dd>${selectedEvidence?.interpretiveReliability || "未確認"}</dd></div>
            </dl>
            <p class="metric-group-label">リンク</p>
            <dl class="metric-list">
              <div class="metric-row"><dt>関係</dt><dd>${badge(selectedLink.relationship)}</dd></div>
              <div class="metric-row"><dt>対象</dt><dd>${selectedLink.target}</dd></div>
              <div class="metric-row"><dt>関連度</dt><dd>${selectedLink.relevance}</dd></div>
              <div class="metric-row"><dt>意思決定者が知っていた</dt><dd>${selectedLink.knownByDecisionMakers}</dd></div>
              <div class="metric-row"><dt>認識根拠</dt><dd>${selectedLink.knownByDecisionMakersBasis}</dd></div>
            </dl>
            <h3>このリンクから言えること</h3>
            <p>${selectedLink.canSay}</p>
            <h3>このリンクだけでは言えないこと</h3>
            <p>${selectedLink.cannotSay}</p>
          `
          : `<h3>選択中リンク</h3><p class="muted">条件に一致する証拠リンクがないため、詳細は表示していません。</p>`}
      </section>
    </div>
  `;
}

function renderOpinion() {
  return `
    <section class="section">
      <h3>総合監査意見</h3>
      ${renderParagraphs(auditData.overviewOpinion)}
      <p><strong>限定事項:</strong> この監査意見は、Evidence Graph に接続された証拠と未確認事項の範囲に限られる。</p>
    </section>

    <section class="section">
      <h3>主要な監査上の発見</h3>
      ${auditData.issues
        .map(
          (issue) => `
            <div class="finding-row">
              <strong>${issue.name}</strong>
              ${badge(issue.status)}
            </div>
          `,
        )
        .join("")}
    </section>

    <div class="grid two">
      <section class="section">
        <h3>補助格付け</h3>
        <p><strong>${auditData.warCase.rating}</strong></p>
        <p>監査意見の要約であり、単独で責任を断定するものではない。</p>
        ${auditData.warCase.ratingNote ? `<p class="muted">${auditData.warCase.ratingNote}</p>` : ""}
        <dl class="metric-list">
          ${auditData.ratingBasis
            .map((item) => {
              // S-2: 両ケースとも cellId に統一済み。旧 item.cell（表示文字列）フォールバックは撤去。
              const cell = item.cellId ? getAssessmentCell(item.cellId) : null;
              const label = cell ? `${cell.axis} / ${cell.phase}` : item.cellId || "未設定";
              const caveats = [cell?.status ? `状態 ${cell.status}` : null, cell?.evidenceStrength ? `証拠 ${cell.evidenceStrength}` : null, cell?.noEvidenceReason ? cell.noEvidenceReason : null].filter(Boolean).join(" / ");
              return `<div class="metric-row"><dt>${label}</dt><dd>重み ${item.weight}${caveats ? `<br><span class="muted">${caveats}</span>` : ""}</dd></div>`;
            })
            .join("")}
        </dl>
        ${auditData.ratingBasisExclusions?.length ? `
          <h3>算入外セル</h3>
          <ul class="clean">
            ${auditData.ratingBasisExclusions
              .map((item) => {
                const cell = item.cellId ? getAssessmentCell(item.cellId) : null;
                const label = cell ? `${cell.axis} / ${cell.phase}` : item.cellId || "未設定";
                return `<li>${label}<br><span class="muted">${item.reason}</span></li>`;
              })
              .join("")}
          </ul>
        ` : ""}
      </section>
      <section class="section">
        <h3>反対仮説</h3>
        <ul class="clean">
          ${auditData.counterHypotheses.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>
    </div>
  `;
}
function renderPreWar() {
  const items = auditData.preWarChecklist;
  const resolved = items.map((item) => ({ item, res: resolveStatus(item) }));

  // status 分布（算出値ベース）
  const dist = statusOrder.map((status) => ({
    status,
    count: resolved.filter((r) => r.res.value === status).length,
  }));

  // 保留中の昇格候補（provisional override が未発火）
  const pending = resolved.filter((r) => r.res.pending);

  // 2次元マトリクス（横:評価可能性 / 縦:評価形跡）。derived status のみで配置・着色。
  const matrix = `
    <table class="assessment-table prewar-matrix">
      <thead>
        <tr>
          <th>評価形跡 / 評価可能性</th>
          ${evaluabilityOrder.map((e) => `<th>${e}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${actuallyEvaluatedOrder
          .map(
            (a) => `
              <tr>
                <th>${a}</th>
                ${evaluabilityOrder
                  .map((e) => {
                    const derived = deriveStatus(e, a);
                    const cellItems = resolved.filter(
                      (r) => r.item.exAnteEvaluability === e && r.item.actuallyEvaluated === a,
                    );
                    return `
                      <td class="prewar-cell ${statusClass[derived]}">
                        <span class="cell-meta">${derived}</span>
                        ${cellItems
                          .map(
                            (r) => `
                              <span class="prewar-chip">
                                ${r.item.name}
                                ${r.res.pending ? '<span class="prewar-flag">⏳昇格候補</span>' : ""}
                                ${r.res.basis === "override" && !r.res.pending ? '<span class="prewar-flag">▸個別判断</span>' : ""}
                              </span>
                            `,
                          )
                          .join("")}
                      </td>
                    `;
                  })
                  .join("")}
              </tr>
            `,
          )
          .join("")}
      </tbody>
    </table>
  `;

  const cards = resolved
    .map(({ item, res }) => {
      const assumptions = item.linkedAssumptions
        .map((id) => getAssumption(id))
        .filter(Boolean);
      const cells = item.linkedCells.map((id) => getAssessmentCell(id)).filter(Boolean);
      return `
        <details class="prewar-card">
          <summary>
            ${badge(res.value)}
            <strong>${item.name}</strong>
            <span class="cell-meta">${item.category}</span>
            ${res.pending ? '<span class="prewar-flag">暫定評価</span>' : ""}
            ${res.basis === "override" && !res.pending ? '<span class="prewar-flag">▸個別判断</span>' : ""}
          </summary>
          <div class="prewar-card-body">
            <div class="grid three">
              <div class="mini-card"><h3>評価可能性</h3><p>${item.exAnteEvaluability}</p></div>
              <div class="mini-card"><h3>評価の難度</h3><p>${item.evaluationDifficulty}</p></div>
              <div class="mini-card"><h3>評価形跡</h3><p>${item.actuallyEvaluated}${item.noEvidenceReason ? `（${item.noEvidenceReason}）` : ""}</p></div>
            </div>
            <p><strong>監査の問い:</strong> ${item.auditQuestion}</p>
            ${item.evidenceBasis ? `<p><strong>評価形跡の根拠:</strong> ${item.evidenceBasis}</p>` : ""}
            ${item.linkedEvidenceLinks?.length ? `<p class="cell-meta">根拠リンク: ${item.linkedEvidenceLinks
              .map((id) => {
                const link = getEvidenceLink(id);
                const evidence = link ? getEvidence(link.evidenceId) : null;
                return link && evidence ? `${id}（${evidence.id} / ${link.timeFit} / 判断時点${link.availableAtDecisionTime ? "可" : "不可"} / ${link.reviewState}）` : id;
              })
              .join(" / ")}</p>` : ""}
            ${item.nextEvidenceActionType ? `<p><strong>次アクション:</strong> ${getEvidenceActionLabel(item.nextEvidenceActionType)}</p>` : ""}
            <p class="prewar-counter"><strong>反証・留保:</strong> ${item.counterPoint}</p>
            ${item.asymmetry ? `<p class="prewar-asymmetry"><strong>非対称性:</strong> ${item.asymmetry}</p>` : ""}
            ${
              res.basis === "override" || res.pending
                ? `<p class="prewar-rationale"><strong>${res.pending ? "昇格保留中の根拠" : "個別判断の根拠"}:</strong> ${item.statusOverride.rationale}</p>`
                : ""
            }
            <div class="grid two">
              <div>
                <h3>関連する前提</h3>
                ${
                  assumptions.length
                    ? `<ul class="clean">${assumptions.map((a) => `<li>${a.content}（${a.type}・根拠${a.basis}）</li>`).join("")}</ul>`
                    : '<p class="muted">なし</p>'
                }
              </div>
              <div>
                <h3>関連する評価セル</h3>
                ${
                  cells.length
                    ? `<ul class="clean">${cells.map((c) => `<li>${c.axis} / ${c.phase}</li>`).join("")}</ul>`
                    : '<p class="muted">なし</p>'
                }
              </div>
            </div>
          </div>
        </details>
      `;
    })
    .join("");

  return `
    <section class="section">
      <h3>開戦前に評価可能だった項目</h3>
      <p class="muted">「評価可能だった（可能性: 高〜中）のに評価形跡がない」ほど懸念が重い、という基準で算出。status は固定値ではなく評価可能性×評価形跡から導出される。</p>
      <div class="grid three">
        ${dist
          .map(
            (d) => `<div class="mini-card"><h3>${d.status}</h3><p>${d.count}件</p></div>`,
          )
          .join("")}
      </div>
    </section>

    ${
      pending.length
        ? `
      <section class="section prewar-pending">
        <h3>未評価ギャップ</h3>
        <p class="muted">開戦前に評価可能だったが、現在の証拠状態では評価形跡を断定できない項目。追加資料で「形跡あり/なし」が確認されるまで中立的に保留する。</p>
        ${pending
          .map(
            ({ item }) => `
              <div class="issue-row">
                <strong>${item.name}</strong>
                ${badge("要検証")}
                <span class="cell-meta">未評価ギャップ（高）</span>
                <span class="cell-meta">一次資料待ち</span>
              </div>
            `,
          )
          .join("")}
      </section>
    `
        : ""
    }

    <section class="section">
      <h3>評価ギャップ・マトリクス</h3>
      <p class="muted">横軸=開戦前の評価可能性、縦軸=実際の評価形跡。右上（高 × 形跡なし）が重大懸念ゾーン。個別判断による評価は軸位置で配置せず、注釈バッジで重ねる。</p>
      ${matrix}
    </section>

    <section class="section">
      <h3>項目詳細</h3>
      <p class="muted">見出しをクリックで展開。反証・留保と非対称性を常時併置（反証を隠さない原則）。</p>
      ${cards}
    </section>
  `;
}

  return {
    overview: renderOverview,
    timeline: renderTimeline,
    prewar: renderPreWar,
    assessment: renderAssessment,
    evidence: renderEvidence,
    opinion: renderOpinion,
  };
}


