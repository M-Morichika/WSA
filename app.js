const auditData = {
  warCase: {
    name: "フォークランド紛争",
    auditedActor: "アルゼンチン軍事政権",
    opponentActor: "英国サッチャー政権",
    scope: "開戦・転換点・終戦判断",
    primaryResponsibility: "継戦能力見積もり責任",
    uncertainty: "中",
    rating: "C-/D+",
  },
  overviewOpinion:
    "現時点の証拠に基づく限り、アルゼンチン軍事政権の開戦判断は、英国の軍事的反応、米国・国際社会の反応、限定戦争としての制御可能性について、楽観的な前提に依存していた可能性が高い。ただし、開戦前時点で英国の全面的軍事奪還がどこまで予見可能だったかについては、追加検証を要する。",
  issues: [
    { name: "英国反応の見積もり", status: "重大懸念", evidence: 4, open: 2 },
    { name: "国際環境の誤認", status: "要注意", evidence: 3, open: 3 },
    { name: "継戦能力の過大評価", status: "重大懸念", evidence: 5, open: 1 },
    { name: "国内政治動機の影響", status: "要検証", evidence: 2, open: 4 },
  ],
  counterHypotheses: [
    "英国の軍事反応は、距離・財政・国内政治を踏まえると、限定的にとどまると予測する余地があった。",
    "米国が明確に英国側へ寄ることは、開戦前には完全には確定していなかった可能性がある。",
    "短期占領によって外交交渉を有利にする構想には、限定的な合理性があった可能性がある。",
  ],
  phases: [
    {
      id: "opening",
      name: "開戦判断",
      status: "重大懸念",
      revisionRoom: "中",
      mainIssue: "英国反応",
      decision: "フォークランド諸島への軍事占領を実行し、主権回復を既成事実化する。",
      assumptions: [
        { id: "asm_opening_sovereignty", type: "明示された前提", content: "主権回復、短期決着", basis: "中" },
        { id: "asm_opening_uk_no_recapture", type: "暗黙の前提", content: "英国は全面奪還しない", basis: "低〜中" },
        { id: "asm_opening_us_neutral", type: "暗黙の前提", content: "米国は中立仲介する", basis: "低〜中" },
        { id: "asm_opening_domestic_support", type: "暗黙の前提", content: "国内支持を回復できる", basis: "中" },
      ],
      availableInfo: "英国の遠隔地防衛能力、国連での反応、米国の仲介可能性、国内政治不安",
      alternatives: "交渉継続、限定的圧力、国際機関経由",
      revisionNote:
        "開戦前であり、外交・限定的圧力へ戻る余地はあったが、国内政治上の制約が強かった可能性がある。",
      auditQuestion: "英国の政治的意思と軍事展開能力を十分に評価したか。",
    },
    {
      id: "turning",
      name: "転換点",
      status: "重大懸念",
      revisionRoom: "高",
      mainIssue: "撤退条件",
      decision: "英国の機動部隊派遣後も、占領継続と交渉上の優位確保を試みる。",
      assumptions: [
        { id: "asm_turning_limited_war", type: "暗黙の前提", content: "限定戦争として制御できる", basis: "低〜中" },
        { id: "asm_turning_diplomatic_face", type: "暗黙の前提", content: "外交的妥協で面子を保てる", basis: "中" },
      ],
      availableInfo: "英国の派遣意思、国際圧力、作戦海域の遠隔性、アルゼンチン軍の持続力",
      alternatives: "段階的撤退、国連仲介の受入、条件付き交渉",
      revisionNote:
        "英国の反応が明確化した段階で、撤退・交渉・限定的妥協への修正余地は相対的に高かった。",
      auditQuestion: "既成事実化戦略が崩れた時点で、方針転換を検討したか。",
    },
    {
      id: "ending",
      name: "終戦判断",
      status: "要検証",
      revisionRoom: "中",
      mainIssue: "損耗許容",
      decision: "軍事的敗北が明確化するなかで、継戦不能または降伏受容へ進む。",
      assumptions: [
        { id: "asm_ending_sovereignty_claim", type: "明示された前提", content: "主権主張の維持", basis: "中" },
        { id: "asm_ending_avoid_collapse", type: "暗黙の前提", content: "国内政治上の崩壊を避ける", basis: "中" },
      ],
      availableInfo: "戦力損耗、補給困難、英国側の作戦進展、国内政治不安",
      alternatives: "早期停戦、限定的降伏、仲介受入",
      revisionNote:
        "終戦局面では選択肢が狭まるが、損耗抑制の観点から終結判断の妥当性を検証する余地がある。",
      auditQuestion: "人的損耗と政治的面子をどう比較したか。",
    },
  ],
  // 開戦前に評価可能だった項目のチェックリスト。
  // status は保存しない（resolveStatus で exAnteEvaluability × actuallyEvaluated から算出）。
  // override 発火時のみ statusOverride.value が優先される。
  // 設計判断(2026-06-24): 重大懸念は「高×形跡なし」の1セルのみに限定（辛口側に振らない）。
  //   後知恵での断罪を避けるため、最重大カテゴリの到達条件をあえて厳しく保つ。
  // 設計判断(2026-06-24): 「評価したが妥当でなかった」を表す軸（評価の妥当性）は追加しない。
  //   現モデルは「評価形跡の有無」のみを測る1軸に意図的にとどめる。
  preWarChecklist: [
    {
      id: "pw_uk_force_projection",
      name: "英国の機動部隊投射能力",
      category: "軍事能力",
      exAnteEvaluability: "中",
      evaluationDifficulty: "高",
      actuallyEvaluated: "限定的",
      noEvidenceReason: null,
      statusOverride: null,
      evidenceStrength: "中",
      auditQuestion: "英国の海軍投射能力と政治的反撃意思を、当時の公開情報・外交シグナルから評価したか。",
      counterPoint:
        "投射能力は評価可能でも、サッチャー政権の反撃意思の強度は事前には不確実性が高く、過小評価が不合理だったとは断定できない。",
      asymmetry: null,
      linkedAssumptions: ["asm_opening_uk_no_recapture"],
      linkedCells: ["cell_war_capacity_opening"],
    },
    {
      id: "pw_island_hold",
      name: "島嶼保持能力",
      category: "継戦能力",
      exAnteEvaluability: "中",
      evaluationDifficulty: "中",
      actuallyEvaluated: "限定的",
      noEvidenceReason: null,
      statusOverride: null,
      evidenceStrength: "中",
      auditQuestion: "占領後の島嶼を、英国の奪還作戦に対して保持し続ける戦力を保有していたか。",
      counterPoint:
        "短期占領→交渉という構想では長期保持を前提にしておらず、保持能力の低さが即座に判断の誤りを意味しない。",
      asymmetry: null,
      linkedAssumptions: ["asm_opening_uk_no_recapture"],
      linkedCells: ["cell_war_capacity_opening"],
    },
    {
      id: "pw_air_sea_control",
      name: "制空・制海権の確保",
      category: "継戦能力",
      exAnteEvaluability: "中",
      evaluationDifficulty: "高",
      actuallyEvaluated: "限定的",
      noEvidenceReason: null,
      statusOverride: null,
      evidenceStrength: "中",
      auditQuestion: "島嶼周辺空海域で、英国艦隊に対し制空・制海権を確保・維持できると評価したか。",
      counterPoint:
        "本土からの航空作戦半径の限界は既知だが、英艦隊の脆弱性（対艦ミサイル等）への期待には一定の根拠もあった。",
      asymmetry: null,
      linkedAssumptions: [],
      linkedCells: ["cell_war_capacity_opening"],
    },
    {
      id: "pw_supply_line",
      name: "補給線の維持",
      category: "継戦能力",
      exAnteEvaluability: "高",
      evaluationDifficulty: "中",
      actuallyEvaluated: "限定的",
      noEvidenceReason: null,
      statusOverride: null,
      evidenceStrength: "中",
      auditQuestion: "占領部隊への継続的補給を、英国の海上封鎖下で維持できると評価したか。",
      counterPoint:
        "自国補給能力は評価可能性が高い一方、封鎖の実効性は英国の展開規模に依存し、事前確定は難しかった。",
      asymmetry: null,
      linkedAssumptions: [],
      linkedCells: ["cell_war_capacity_opening", "cell_war_capacity_turning"],
    },
    {
      id: "pw_political_endurance",
      name: "損害許容と両政権の政治的耐久性",
      category: "政治耐久性",
      exAnteEvaluability: "中",
      evaluationDifficulty: "高",
      actuallyEvaluated: "不明",
      noEvidenceReason: "証拠未収集",
      statusOverride: null,
      evidenceStrength: "弱",
      auditQuestion: "人的・物的損害が出た場合の政治的許容度を、両政権について比較評価したか。",
      counterPoint:
        "他国政権の損害許容度の事前評価は本質的に困難で、未評価が直ちに過失とは言えない。",
      asymmetry:
        "英国は限定的損害に政治的に耐える余地があるが、軍事政権は損害の政治的許容度が構造的に低い（戦争中の損害許容の非対称性）。",
      linkedAssumptions: [],
      linkedCells: ["cell_decision_process_opening"],
    },
    {
      id: "pw_diplomatic_alignment",
      name: "米国・NATO・南米諸国の外交姿勢",
      category: "外交環境",
      exAnteEvaluability: "中",
      evaluationDifficulty: "中",
      actuallyEvaluated: "限定的",
      noEvidenceReason: null,
      statusOverride: null,
      evidenceStrength: "中",
      auditQuestion: "米国・NATO・南米諸国が最終的にどちらへ傾くかを、開戦前に評価したか。",
      counterPoint:
        "開戦前の米国姿勢には曖昧さがあり、中立期待が全く不合理だったとは言えない。",
      asymmetry: null,
      linkedAssumptions: ["asm_opening_us_neutral"],
      linkedCells: ["cell_decision_process_opening"],
    },
    {
      id: "pw_regime_survival",
      name: "敗北時の軍事政権の存続可能性",
      category: "体制存続",
      exAnteEvaluability: "低",
      evaluationDifficulty: "高",
      actuallyEvaluated: "不明",
      noEvidenceReason: "証拠未収集",
      statusOverride: {
        value: "重大懸念",
        // 証拠が actuallyEvaluated:"形跡なし" を裏づけたら resolveStatus が自動発火させる。
        provisional: true,
        rationale:
          "敗北＝体制消滅という破滅的非対称性により、低評価可能性下でも評価努力義務が高い。記録不在が証拠で裏づけられ次第、要検証→重大懸念へ昇格する。本判断は開戦後の結果ではなく、事前のリスク構造に基づく。",
      },
      evidenceStrength: "弱",
      auditQuestion: "敗北が体制崩壊に直結する非対称リスクを、開戦前に評価したか。",
      counterPoint:
        "敗北時の崩壊確率を事前に定量化する手段は乏しく、評価可能性は本質的に低い。",
      asymmetry:
        "英国は敗北しても国家・体制は存続するが、軍事政権にとって敗北は体制消滅に直結する。下振れの破滅性が極端に非対称（敗北時の体制崩壊リスク）。",
      linkedAssumptions: ["asm_opening_domestic_support"],
      linkedCells: ["cell_decision_process_opening"],
    },
  ],
  hypothesisTracking: [
    { phase: "開戦判断時点", status: "検証中" },
    { phase: "英国機動部隊派遣後", status: "弱体化" },
    { phase: "実戦開始後", status: "ほぼ棄却" },
  ],
  assessmentCells: [
    {
      id: "cell_war_capacity_opening",
      axis: "継戦能力見積もり",
      phase: "開戦判断",
      status: "重大懸念",
      impact: "高",
      evidenceStrength: "中",
      opinion:
        "英国の軍事的反応、長距離展開能力、米国・国際社会の反応について、アルゼンチン軍事政権の見積もりは楽観的前提に依存していた可能性が高い。ただし、政権中枢がどの程度の英国反応を実際に想定していたかは、追加資料が必要である。他方、1981年国防白書（HMS Endurance 撤収）など英国関与の縮小を示す同時代シグナルも存在し、楽観的見積もりには一定の酌量余地がある（E-005／反証を隠さない）。",
      criteria: [
        "判断前提が戦争進行により大きく崩れた",
        "当時利用可能な反対情報が存在した可能性がある",
        "継戦能力の見積もり根拠が十分に確認できていない",
      ],
      changeConditions: [
        "政権中枢が英国の軍事奪還を高確率で想定していた資料が出る",
        "米国の中立仲介を合理的に期待できる強い根拠が確認される",
        "短期占領後の撤退・交渉計画が具体的に存在していたと判明する",
      ],
    },
    {
      id: "cell_war_capacity_turning",
      axis: "継戦能力見積もり",
      phase: "転換点",
      status: "重大懸念",
      impact: "高",
      evidenceStrength: "中",
      opinion: "英国の軍事行動が明確化した後も、継戦可能性の再見積もりが十分だったか疑問が残る。",
      criteria: ["初期前提が弱体化した後の再評価記録が不足", "撤退条件の明確性が低い"],
      changeConditions: ["転換点時点の再評価文書や撤退条件が確認される"],
    },
    {
      id: "cell_war_capacity_ending",
      axis: "継戦能力見積もり",
      phase: "終戦判断",
      status: "要検証",
      impact: "中",
      evidenceStrength: "弱",
      noEvidenceReason: "証拠未収集",
      nextEvidenceActionType: "collect_primary_source",
      opinion: "終戦局面での継戦不能判断について、利用可能だった戦力・補給資料が不足している。",
      criteria: ["終戦判断時点の内部評価資料が不足", "損耗許容の判断基準が未確認"],
      changeConditions: ["終戦直前の作戦会議録や損耗評価が確認される"],
    },
    {
      id: "cell_decision_process_opening",
      axis: "意思決定プロセス",
      phase: "開戦判断",
      status: "重大懸念",
      impact: "高",
      evidenceStrength: "弱〜中",
      noEvidenceReason: "未接続",
      nextEvidenceActionType: "connect_existing_evidence",
      opinion: "反対情報と代替案がどの程度検討されたかについて、記録上の不足が残る。",
      criteria: ["反対情報の検討記録が限定的", "代替案の比較資料が不足"],
      changeConditions: ["開戦前の会議録や反対意見の記録が確認される"],
    },
    {
      id: "cell_decision_process_turning",
      axis: "意思決定プロセス",
      phase: "転換点",
      status: "重大懸念",
      impact: "高",
      evidenceStrength: "中",
      noEvidenceReason: "未接続",
      nextEvidenceActionType: "connect_existing_evidence",
      opinion: "英国の反応が明確化した後、撤退・交渉への判断修正が十分だったか疑問が残る。",
      criteria: ["方針転換条件が不明確", "撤退案の検討記録が限定的"],
      changeConditions: ["転換点での代替案比較や撤退条件が確認される"],
    },
    {
      id: "cell_decision_process_ending",
      axis: "意思決定プロセス",
      phase: "終戦判断",
      status: "要検証",
      impact: "中",
      evidenceStrength: "弱",
      noEvidenceReason: "証拠未収集",
      nextEvidenceActionType: "collect_primary_source",
      opinion: "終戦判断で政治的面子と損耗抑制がどう比較されたか、資料不足で強い判断は出せない。",
      criteria: ["終戦判断過程の記録が不足", "降伏受容条件の比較が未確認"],
      changeConditions: ["終戦交渉や降伏判断の内部記録が確認される"],
    },
    {
      id: "cell_record_opening",
      axis: "記録・説明責任",
      phase: "開戦判断",
      status: "要検証",
      impact: "中",
      evidenceStrength: "弱",
      noEvidenceReason: "証拠未収集",
      nextEvidenceActionType: "collect_primary_source",
      opinion: "開戦理由とリスク見積もりが後から検証可能な形で記録されていたかは未確認である。",
      criteria: ["開戦前提の記録が不足", "反対意見の保存状況が不明"],
      changeConditions: ["開戦決定文書や会議録が確認される"],
    },
    {
      id: "cell_record_turning",
      axis: "記録・説明責任",
      phase: "転換点",
      status: "要検証",
      impact: "中",
      evidenceStrength: "弱",
      noEvidenceReason: "証拠未収集",
      nextEvidenceActionType: "collect_primary_source",
      opinion: "転換点での再評価や撤退条件が記録として残されたかは追加検証を要する。",
      criteria: ["再評価記録が不足", "外交・軍事判断の接続が不明"],
      changeConditions: ["転換点の再評価文書が確認される"],
    },
    {
      id: "cell_record_ending",
      axis: "記録・説明責任",
      phase: "終戦判断",
      status: "要検証",
      impact: "中",
      evidenceStrength: "弱",
      noEvidenceReason: "証拠未収集",
      nextEvidenceActionType: "collect_primary_source",
      opinion: "終戦判断の根拠と責任分担がどの程度記録されたかは未確認である。",
      criteria: ["降伏判断の記録が不足", "責任所在の説明資料が未確認"],
      changeConditions: ["終戦判断の内部記録や公的説明資料が確認される"],
    },
    {
      id: "cell_outcome_opening",
      axis: "結果との乖離",
      phase: "開戦判断",
      status: "重大懸念",
      impact: "中",
      evidenceStrength: "強",
      noEvidenceReason: "該当証拠なし",
      nextEvidenceActionType: "maintain_not_applicable",
      opinion: "短期占領による既成事実化という想定と、実際の英国軍事反応との乖離は大きい。",
      criteria: ["主要前提が戦争進行で大きく崩れた", "結果との差が大きい"],
      changeConditions: ["開戦前に同程度の英国反応を想定していた資料が確認される"],
    },
    {
      id: "cell_outcome_turning",
      axis: "結果との乖離",
      phase: "転換点",
      status: "重大懸念",
      impact: "中",
      evidenceStrength: "強",
      noEvidenceReason: "該当証拠なし",
      nextEvidenceActionType: "maintain_not_applicable",
      opinion: "転換点以降も戦況悪化と初期想定の乖離が拡大した可能性が高い。",
      criteria: ["英国作戦の進展で前提が弱体化", "撤退条件の見直しが不十分な可能性"],
      changeConditions: ["転換点での現実的な再評価資料が確認される"],
    },
    {
      id: "cell_outcome_ending",
      axis: "結果との乖離",
      phase: "終戦判断",
      status: "軽度",
      impact: "低",
      evidenceStrength: "中",
      noEvidenceReason: "該当証拠なし",
      nextEvidenceActionType: "maintain_not_applicable",
      opinion: "終戦判断では結果との乖離よりも、損耗抑制と終結条件の妥当性が主な検証対象となる。",
      criteria: ["結果乖離の責任評価への寄与は限定的", "終戦時点では選択肢が狭い"],
      changeConditions: ["終戦直前に現実的な代替案が存在した資料が確認される"],
    },
  ],
  evidence: [
    {
      id: "E-001",
      title: "英国機動部隊の派遣・奪還作戦（公式戦史）",
      type: "政府・軍事行動資料",
      // #2: 日付は publishedDate（刊行/生成年）と coveragePeriod（記述対象期間）に分離。
      publishedDate: "2005年（戦後刊行）",
      coveragePeriod: "1982年（フォークランド紛争・奪還作戦）",
      // 戦後の事実記録。開戦前認識の直接証拠にはしない（EL-001 の knownByDecisionMakers 参照）。
      source: "Lawrence Freedman, The Official History of the Falklands Campaign, Vol.2 (Routledge, 2005)",
      collectionState: "二次研究で確認可",
      // #4: 信頼度を2軸に分離。
      //   authenticity         = 文書の真正性（出典が本物・改竄されていないか）
      //   interpretiveReliability = 解釈の信頼性（その文書から主張を導く解釈の確実性）
      authenticity: "高",
      interpretiveReliability: "中", // 事後著述ゆえ開戦前認識の解釈には限界
    },
    {
      id: "E-002",
      title: "アルゼンチン軍の作戦持続・意思決定分析（ラッテンバッハ報告書）",
      type: "軍事能力資料",
      publishedDate: "1983年（2012年機密解除・全文公開）",
      coveragePeriod: "開戦前〜戦中（ア軍の意思決定・作戦持続）",
      // 戦後文書だが開戦前の軍司令部記録を再録。報告書の結論は post-hoc 解釈として扱い、
      // 再録された同時代記録を pre-war 証拠への橋渡しとする。
      source:
        "Informe Rattenbach（南大西洋紛争 責任分析・評価委員会報告, 1983）。アルゼンチン政府が2012年に機密解除・オンライン全文公開（西語）",
      collectionState: "一次資料入手可（西語）",
      authenticity: "高", // 政府公式・全文公開
      interpretiveReliability: "中", // 報告書結論は post-hoc 解釈。再録記録を橋渡しとして扱う
    },
    {
      id: "E-003",
      title: "英国の開戦前評価・対ア姿勢に関する政府調査（フランクス報告書）",
      type: "政府・軍事行動資料",
      publishedDate: "1983年",
      coveragePeriod: "開戦前（英国の事前評価・対ア姿勢）",
      // 英政府の枢密院委員会による開戦前評価の検証。HMS Endurance 撤収等、
      // アルゼンチンが入手可能だった「英国の関与限定シグナル」を逆算できる。
      source: "Falkland Islands Review (Franks Report), Cmnd 8787, HMSO, 1983",
      collectionState: "一次資料入手可",
      authenticity: "高", // 政府公式刊行
      interpretiveReliability: "低〜中", // #5: 結論が英政府を免責する方向のバイアスを含む
    },
    {
      id: "E-004",
      title: "米国の開戦前外交姿勢（機密解除文書）",
      type: "外交資料",
      publishedDate: "1982年（同時代生成・後年機密解除公開）",
      coveragePeriod: "1982年3月〜4月（米国の開戦前後の外交姿勢）",
      // ヘイグのシャトル外交を含む。米国中立仲介仮説（claim_us_mediation）の事前曖昧性を検証する。
      source:
        "National Security Archive (George Washington University) フォークランド/マルビナス機密解除文書コレクション（主出典）。該当する FRUS（米国対外関係文書）巻が刊行されていれば併用。",
      collectionState: "一次資料入手可",
      authenticity: "中", // コレクションの網羅性に依存・FRUS併用前提
      interpretiveReliability: "中", // 同時代一次文書だが意思決定者の依拠は未確定
    },
    {
      id: "E-005",
      title: "英国の対南大西洋関与縮小シグナル（1981年国防白書／HMS Endurance 撤収方針）",
      type: "政府・軍事行動資料",
      publishedDate: "1981年6月（同時代公開）",
      coveragePeriod: "開戦前（英国の南大西洋関与縮小方針）",
      // #2(A): ex-ante 主張を直接支える唯一の同時代一次史料。判断時点で公開・入手可能だった
      // 政府文書で、英国の南大西洋関与後退シグナル（claim_uk_limited の同時代的根拠）を構成する。
      source:
        "The United Kingdom Defence Programme: The Way Forward, Cmnd 8288, HMSO, June 1981（HMS Endurance 撤収方針を含む）。当時公開の政府文書。",
      collectionState: "一次資料入手可",
      authenticity: "高", // 同時代の公式政府文書
      interpretiveReliability: "中", // シグナルの存在は確実だが、依拠・受領は別問題
    },
  ],
  // claim は id/text/type のみ保持し、状態（支持/反証の集計）は持たない。
  // 設計判断B（status はデータ非保存・リンク層から実行時に読む）と一貫させるため、
  // 旧 claims[].status は削除（未使用かつリンク実体と矛盾し得たため）。
  claims: [
    {
      id: "claim_uk_response",
      text: "アルゼンチン軍事政権は英国の全面的軍事奪還を過小評価した",
      type: "audit_issue",
    },
    {
      id: "claim_uk_limited",
      text: "英国の軍事反応は限定的にとどまる",
      type: "counter_claim",
    },
    {
      id: "claim_us_mediation",
      text: "米国は中立仲介する",
      type: "counter_claim",
    },
  ],
  // 時点フィールドの定義（#1で明確化）:
  //   timeFit: 出典の判断時点への近さ。直接=同時代に生成された記録 / 間接=戦後に著された出典。
  //   availableAtDecisionTime / availableToAnalysts: 「出典文書」が判断時点で入手可能だったか。
  //   ※ 戦後文書が開戦前の出来事を記述する場合（ラッテンバッハ/フランクス）は、
  //     文書としては 間接・入手不可。その「同時代記録への橋渡し」性は canSay/basis で表す。
  evidenceLinks: [
    {
      id: "EL-001",
      evidenceId: "E-001",
      claimId: "claim_uk_response",
      assessmentCellId: "cell_war_capacity_opening",
      claimLabel: "英国反応の見積もり",
      target: "継戦能力 / 開戦判断",
      relationship: "支持",
      reviewState: "確認済",
      relevance: "中",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: false,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "開戦後の事実であり、開戦前認識を直接示さない。",
      canSay:
        "英国は実際に軍事的奪還へ動いたため、「英国は反応しない」という前提は、戦争進行後には大きく崩れた。",
      cannotSay:
        "アルゼンチン軍事政権が、開戦前に英国の反応をどの程度予見していたかは直接示さない。",
    },
    {
      id: "EL-002",
      evidenceId: "E-001",
      claimId: "claim_uk_limited",
      assessmentCellId: null,
      claimLabel: "英国反応の見積もり",
      target: "反対仮説: 英国は全面奪還しない",
      relationship: "反証",
      reviewState: "確認済",
      relevance: "高",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: false,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "内部資料未確認。反対仮説への影響は事後的な検証にとどまる。",
      canSay: "英国の実際の軍事行動は、限定反応仮説を弱める。",
      cannotSay: "開戦時点の予測が不合理だったことまでは単独で示さない。",
    },
    {
      id: "EL-003",
      evidenceId: "E-003",
      claimId: "claim_uk_limited",
      assessmentCellId: "cell_war_capacity_opening",
      claimLabel: "英国即応能力",
      target: "継戦能力 / 開戦判断",
      // #1-(a): canSay「英国の即応が困難」は反対仮説（英国限定反応）を強める方向のため 支持。
      // EL-002（実際の軍事行動＝仮説を弱める）の 反証 と方向が対になる。
      relationship: "支持",
      reviewState: "要検証",
      relevance: "中",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: false,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis:
        "出典は戦後の英政府調査（1983）。開戦前に存在した英国の関与限定シグナル（HMS Endurance 撤収等）を事後に記録するもので、文書自体は判断時点で入手不可。",
      canSay: "英国の即応が困難と考える余地を示す。",
      // #5: 出典（フランクス報告書）の結論は英政府を免責する方向のバイアスを含むため、解釈に留保。
      cannotSay:
        "英国が奪還を断念するとまでは言えない。なお出典のフランクス報告書は結論が英政府を免責する方向のバイアスを含むため、この出典に依拠した解釈は割り引いて評価する必要がある。",
    },
    {
      id: "EL-004",
      evidenceId: "E-004",
      claimId: "claim_us_mediation",
      assessmentCellId: "cell_war_capacity_opening",
      claimLabel: "米国外交姿勢",
      target: "国際環境の誤認",
      relationship: "保留",
      reviewState: "要検証",
      relevance: "中",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "外交資料の確認待ち。意思決定者が見た資料かは未確定。",
      canSay: "米国の姿勢には開戦前の曖昧さがあった可能性を示す。",
      cannotSay: "米国が中立仲介を確約していたとは言えない。",
    },
    {
      id: "EL-005",
      evidenceId: "E-002",
      claimId: "claim_uk_response",
      assessmentCellId: "cell_war_capacity_opening",
      claimLabel: "継戦能力の過大評価",
      target: "継戦能力 / 開戦判断",
      relationship: "支持",
      reviewState: "確認中",
      relevance: "中",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: false,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis:
        "出典は戦後の公的調査報告（1983）で、開戦前の軍司令部記録を事後に再構成・再録するもの。文書自体は判断時点で入手不可。",
      canSay: "作戦持続力の制約が、開戦判断時点の継戦能力評価に関係する可能性を示す。",
      cannotSay: "政権中枢が実際にどの数値や見積もりを採用したかは直接示さない。",
    },
    {
      id: "EL-006",
      evidenceId: "E-005",
      claimId: "claim_uk_limited",
      assessmentCellId: "cell_war_capacity_opening",
      claimLabel: "英国関与縮小シグナル",
      target: "反対仮説: 英国の反応は限定的（同時代の根拠）",
      // #2(A): ex-ante を直接支える同時代史料。EL-002（事後・反証）と claim_uk_limited 上で対になる。
      relationship: "支持",
      reviewState: "確認済",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis:
        "1981年の公開政府文書であり、英国の南大西洋関与後退シグナルとして同時代に受領可能。中枢が実際に判断材料としたかは未確定。",
      canSay:
        "1981年時点で英国の南大西洋関与縮小を示す公開シグナルが存在し、「英国反応は限定的」仮説に同時代的根拠があったことを示す。",
      cannotSay:
        "この公開シグナルから、アルゼンチンが英国の全面奪還を排除したとは結論できない（実際の全面奪還＝EL-002 がこの仮説を弱める）。",
    },
  ],
  ratingBasis: [
    { cell: "継戦能力見積もり / 開戦判断", weight: 3 },
    { cell: "意思決定プロセス / 開戦判断", weight: 3 },
    { cell: "継戦能力見積もり / 転換点", weight: 3 },
    { cell: "意思決定プロセス / 転換点", weight: 2 },
    { cell: "結果との乖離", weight: 0.5 },
  ],
};

const viewMeta = {
  overview: ["Overview", "この戦争監査の暫定結論は何か？"],
  timeline: ["Decision Timeline", "各判断時点で、当時の情報から見て判断修正は可能だったか？"],
  prewar: ["Pre-War Checklist", "開戦前に評価可能だった項目のうち、評価形跡が欠けているのはどこか？"],
  assessment: ["Assessment", "どの評価軸・どの判断時点に、重大な懸念が集中しているか？"],
  evidence: ["Evidence Graph", "どの証拠が、どの claim を支持・反証・保留しているか？"],
  opinion: ["Audit Opinion", "証拠と限定事項を踏まえると、最終的な監査意見は何か？"],
};

const evidenceActionLabels = {
  collect_primary_source: "一次資料を探す",
  connect_existing_evidence: "既存証拠リンクを接続する",
  maintain_not_applicable: "該当なしとして維持する",
};

const noEvidenceReasonOrder = ["証拠未収集", "未接続", "該当証拠なし"];

const statusClass = {
  重大懸念: "critical",
  要注意: "watch",
  要検証: "review",
  軽度: "light",
  支持: "support",
  反証: "counter",
  保留: "hold",
};

// 開戦前評価項目の status 導出（B: 単一情報源。データに status を持たせない）
const STATUS_SEVERITY = { 要検証: 1, 要注意: 2, 重大懸念: 3 };

const STATUS_MATRIX = {
  高: { 形跡あり: "要検証", 限定的: "要注意", 形跡なし: "重大懸念", 不明: "要検証" },
  中: { 形跡あり: "要検証", 限定的: "要注意", 形跡なし: "要注意", 不明: "要検証" },
  低: { 形跡あり: "要検証", 限定的: "要検証", 形跡なし: "要注意", 不明: "要検証" },
};

const evaluabilityOrder = ["高", "中", "低"];
const actuallyEvaluatedOrder = ["形跡あり", "限定的", "形跡なし", "不明"];

function deriveStatus(evaluability, actuallyEvaluated) {
  const row = STATUS_MATRIX[evaluability];
  return (row && row[actuallyEvaluated]) || "要検証"; // γ: enum ガード
}

function resolveStatus(item) {
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

function getAssumption(id) {
  for (const phase of auditData.phases) {
    const found = phase.assumptions.find((item) => item.id === id);
    if (found) return found;
  }
  return null;
}

let activeView = "overview";
let activeEvidenceLinkId = "EL-001";
let activeAssessmentCellId = "cell_war_capacity_opening";
let opinionMode = "summary";
let evidenceFilters = getDefaultEvidenceFilters();

function getDefaultEvidenceFilters() {
  return { type: "all", authenticity: "all", relevance: "all", relationship: "all" };
}

function hasActiveEvidenceFilters() {
  return Object.values(evidenceFilters).some((value) => value !== "all");
}

function badge(label) {
  return `<span class="badge ${statusClass[label] || "review"}">${label}</span>`;
}

function getEvidence(id) {
  return auditData.evidence.find((item) => item.id === id);
}

function getAssessmentCell(id) {
  return auditData.assessmentCells.find((item) => item.id === id);
}

function getEvidenceActionLabel(type) {
  return evidenceActionLabels[type] || "未設定";
}

function getCellsWithoutEvidenceLinks() {
  return auditData.assessmentCells.filter(
    (cell) => !auditData.evidenceLinks.some((link) => link.assessmentCellId === cell.id),
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
  const evidence = getEvidence(link.evidenceId);
  return (
    (evidenceFilters.type === "all" || evidence.type === evidenceFilters.type) &&
    (evidenceFilters.authenticity === "all" || evidence.authenticity === evidenceFilters.authenticity) &&
    (evidenceFilters.relevance === "all" || link.relevance === evidenceFilters.relevance) &&
    (evidenceFilters.relationship === "all" || link.relationship === evidenceFilters.relationship)
  );
}

function renderOverview() {
  const snapshot = auditData.warCase;
  return `
    <section class="section">
      <h3>総合監査意見</h3>
      <p>${auditData.overviewOpinion}</p>
    </section>

    <section class="section">
      <h3>主要な監査上の論点</h3>
      ${auditData.issues
        .map(
          (issue) => `
            <div class="issue-row">
              <strong>${issue.name}</strong>
              ${badge(issue.status)}
              <span>根拠 ${issue.evidence}件</span>
              <span>未確認 ${issue.open}件</span>
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
          <div class="metric-row"><dt>主評価</dt><dd>${snapshot.primaryResponsibility}</dd></div>
          <div class="metric-row"><dt>不確実性</dt><dd>${snapshot.uncertainty}</dd></div>
          <div class="metric-row"><dt>補助格付け</dt><dd>${snapshot.rating}</dd></div>
        </dl>
      </section>
    </div>
  `;
}

function renderTimeline() {
  const selected = auditData.phases[0];
  return `
    <section class="section">
      <h3>意思決定タイムライン</h3>
      <div class="timeline-nodes">
        ${auditData.phases
          .map(
            (phase, index) => `
              <article class="timeline-node">
                <h3>${index + 1}. ${phase.name}</h3>
                <dl>
                  <dt>状態</dt><dd>${badge(phase.status)}</dd>
                  <dt>修正余地</dt><dd>${phase.revisionRoom}</dd>
                  <dt>論点</dt><dd>${phase.mainIssue}</dd>
                </dl>
              </article>
            `,
          )
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
          ${selected.assumptions
            .map(
              (item) => `
                <div class="metric-row">
                  <dt>${item.type}</dt>
                  <dd>${item.content}<br><span class="muted">根拠レベル: ${item.basis}</span></dd>
                </div>
              `,
            )
            .join("")}
        </dl>
      </section>
      <section class="section">
        <h3>監査シート</h3>
        <dl class="metric-list">
          <div class="metric-row"><dt>当時利用可能だった情報</dt><dd>${selected.availableInfo}</dd></div>
          <div class="metric-row"><dt>代替案</dt><dd>${selected.alternatives}</dd></div>
          <div class="metric-row"><dt>判断修正余地</dt><dd>${selected.revisionRoom}。${selected.revisionNote}</dd></div>
          <div class="metric-row"><dt>監査上の疑問</dt><dd>${selected.auditQuestion}</dd></div>
        </dl>
      </section>
    </div>

    <section class="section">
      <h3>反対仮説の状態変化</h3>
      <p><strong>仮説:</strong> 英国は全面的な軍事奪還に踏み切らない</p>
      <div class="grid three">
        ${auditData.hypothesisTracking
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
  `;
}

function renderAssessment() {
  const phases = [...new Set(auditData.assessmentCells.map((cell) => cell.phase))];
  const axes = [...new Set(auditData.assessmentCells.map((cell) => cell.axis))];
  const selectedCell = getAssessmentCell(activeAssessmentCellId) || auditData.assessmentCells[0];
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
                            : `<span class="muted">未定義</span>`}
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
              ${badge(link.relationship)}
              <strong>${evidence.title}</strong>
              <span>真正性 ${evidence.authenticity}</span>
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

    <section class="section">
      <h3>証拠リンクなし理由の凡例</h3>
      <div class="grid three">
        <div class="mini-card"><h3>証拠未収集</h3><p>必要な資料がまだ集まっていない状態。</p></div>
        <div class="mini-card"><h3>未接続</h3><p>関連しそうな資料はあるが、この評価セルには未接続の状態。</p></div>
        <div class="mini-card"><h3>該当証拠なし</h3><p>現時点では、このセルに直接結びつく証拠を置かない状態。</p></div>
      </div>
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
  const filteredLinks = auditData.evidenceLinks.filter(evidenceLinkMatchesFilters);
  const filtersActive = hasActiveEvidenceFilters();
  const cellsWithoutEvidenceLinks = getCellsWithoutEvidenceLinks();
  const selectedLink = filteredLinks.find((item) => item.id === activeEvidenceLinkId) || filteredLinks[0] || null;
  if (selectedLink) activeEvidenceLinkId = selectedLink.id;
  const selectedEvidence = selectedLink ? getEvidence(selectedLink.evidenceId) : null;

  return `
    <div class="evidence-layout">
      <section class="section">
        <h3>証拠グラフ</h3>
        <div class="filter-bar">
          <select aria-label="証拠種類" data-filter="type">
            <option value="all">証拠種類</option>
            <option value="外交資料" ${evidenceFilters.type === "外交資料" ? "selected" : ""}>外交資料</option>
            <option value="軍事能力資料" ${evidenceFilters.type === "軍事能力資料" ? "selected" : ""}>軍事能力資料</option>
            <option value="政府・軍事行動資料" ${evidenceFilters.type === "政府・軍事行動資料" ? "selected" : ""}>政府・軍事行動資料</option>
          </select>
          <select aria-label="真正性" data-filter="authenticity">
            <option value="all">真正性</option>
            <option value="高" ${evidenceFilters.authenticity === "高" ? "selected" : ""}>高</option>
            <option value="中" ${evidenceFilters.authenticity === "中" ? "selected" : ""}>中</option>
          </select>
          <select aria-label="関連度" data-filter="relevance">
            <option value="all">関連度</option>
            <option value="高" ${evidenceFilters.relevance === "高" ? "selected" : ""}>高</option>
            <option value="中" ${evidenceFilters.relevance === "中" ? "selected" : ""}>中</option>
          </select>
          <select aria-label="関係" data-filter="relationship">
            <option value="all">支持 / 反証 / 保留</option>
            <option value="支持" ${evidenceFilters.relationship === "支持" ? "selected" : ""}>支持</option>
            <option value="反証" ${evidenceFilters.relationship === "反証" ? "selected" : ""}>反証</option>
            <option value="保留" ${evidenceFilters.relationship === "保留" ? "selected" : ""}>保留</option>
          </select>
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
                        ${badge(link.relationship)}
                        <span class="cell-meta">真正性: ${evidence.authenticity}</span>
                        <span class="cell-meta">解釈信頼性: ${evidence.interpretiveReliability}</span>
                        <span class="cell-meta">関連度: ${link.relevance}</span>
                        <span class="cell-meta">時点適合度: ${link.timeFit}</span>
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
        ${getCellsWithoutEvidenceLinksByReason(cellsWithoutEvidenceLinks)
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
          .join("")}
      </section>

      <section class="section detail-panel">
        ${selectedLink
          ? `
            <h3>選択中リンク: ${selectedLink.id}</h3>
            <p class="metric-group-label">資料</p>
            <dl class="metric-list">
              <div class="metric-row"><dt>ID</dt><dd>${selectedEvidence.id}</dd></div>
              <div class="metric-row"><dt>タイトル</dt><dd>${selectedEvidence.title}</dd></div>
              <div class="metric-row"><dt>種類</dt><dd>${selectedEvidence.type}</dd></div>
              <div class="metric-row"><dt>出典</dt><dd>${selectedEvidence.source}</dd></div>
              <div class="metric-row"><dt>資料状態</dt><dd>${selectedEvidence.collectionState}</dd></div>
            </dl>
            <p class="metric-group-label">時点</p>
            <dl class="metric-list">
              <div class="metric-row"><dt>刊行/生成</dt><dd>${selectedEvidence.publishedDate}</dd></div>
              <div class="metric-row"><dt>対象期間</dt><dd>${selectedEvidence.coveragePeriod}</dd></div>
              <div class="metric-row"><dt>時点適合度</dt><dd>${selectedLink.timeFit}</dd></div>
              <div class="metric-row"><dt>判断時点で利用可能</dt><dd>${selectedLink.availableAtDecisionTime ? "はい" : "いいえ"}</dd></div>
              <div class="metric-row"><dt>分析者が知り得た</dt><dd>${selectedLink.availableToAnalysts ? "はい" : "いいえ"}</dd></div>
            </dl>
            <p class="metric-group-label">信頼性</p>
            <dl class="metric-list">
              <div class="metric-row"><dt>真正性</dt><dd>${selectedEvidence.authenticity}</dd></div>
              <div class="metric-row"><dt>解釈信頼性</dt><dd>${selectedEvidence.interpretiveReliability}</dd></div>
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
  const full = opinionMode === "full";
  return `
    <section class="section">
      <div class="mode-toggle" aria-label="表示モード">
        <button class="${!full ? "is-active" : ""}" type="button" data-mode="summary">要約</button>
        <button class="${full ? "is-active" : ""}" type="button" data-mode="full">全文</button>
      </div>
    </section>

    <section class="section">
      <h3>総合監査意見</h3>
      <p>現時点で確認された証拠に基づく限り、アルゼンチン軍事政権のフォークランド諸島占領判断は、英国の軍事的反応、米国・国際社会の姿勢、限定戦争としての制御可能性について、楽観的な前提に依存していた可能性が高い。</p>
      <p><strong>限定事項:</strong> 開戦前に政権中枢が英国の全面的軍事奪還をどの程度予見していたかは、追加資料による検証を要する。</p>
    </section>

    <section class="section">
      <h3>主要な監査上の発見</h3>
      ${[
        ["英国反応の過小評価", "重大懸念", "高", "中"],
        ["継戦能力の過大評価", "重大懸念", "高", "中"],
        ["米国・国際環境の誤認", "要注意", "中", "中"],
        ["国内政治動機の影響", "要検証", "中", "弱"],
      ]
        .map(
          ([name, status, impact, evidence]) => `
            <div class="finding-row">
              <strong>${name}</strong>
              ${badge(status)}
              <span>影響 ${impact}</span>
              <span>証拠 ${evidence}</span>
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
        <dl class="metric-list">
          ${auditData.ratingBasis
            .map((item) => `<div class="metric-row"><dt>${item.cell}</dt><dd>重み ${item.weight}</dd></div>`)
            .join("")}
        </dl>
      </section>
      <section class="section">
        <h3>反対仮説</h3>
        <dl class="metric-list">
          <div class="metric-row"><dt>英国反応は限定的</dt><dd>弱体化。実際に機動部隊派遣と奪還作戦が行われたため。ただし、開戦前の予見可能性はなお要検証。</dd></div>
          <div class="metric-row"><dt>米国は中立仲介</dt><dd>要検証。開戦前の米国姿勢には曖昧さがあり、資料確認が必要。</dd></div>
          <div class="metric-row"><dt>短期占領で外交優位</dt><dd>弱体化。英国の軍事奪還意思が明確化した後、既成事実化戦略は成立しにくくなった。</dd></div>
        </dl>
      </section>
    </div>

    ${
      full
        ? `
          <section class="section">
            <h3>全文モード</h3>
            <div class="grid two">
              <div class="mini-card"><h3>判断時点別の意見</h3><p>開戦判断と転換点に重大懸念が集中する。終戦判断は資料不足のため要検証。</p></div>
              <div class="mini-card"><h3>証拠一覧</h3><p>Evidence Graph の証拠リンクを根拠元として参照する。</p></div>
              <div class="mini-card"><h3>評価が変わりうる条件</h3><p>英国反応の高確率想定、米国仲介期待の強い根拠、撤退・交渉計画の存在が確認された場合。</p></div>
              <div class="mini-card"><h3>監査方法</h3><p>当時利用可能だった情報と、実際に意思決定者が知っていた情報を分けて評価する。</p></div>
            </div>
          </section>
        `
        : ""
    }
  `;
}

function renderPreWar() {
  const items = auditData.preWarChecklist;
  const resolved = items.map((item) => ({ item, res: resolveStatus(item) }));

  // status 分布（算出値ベース）
  const dist = ["重大懸念", "要注意", "要検証"].map((status) => ({
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
          <th>評価形跡 \\ 評価可能性</th>
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
                                ${r.res.basis === "override" && !r.res.pending ? '<span class="prewar-flag">▸判断</span>' : ""}
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
            ${res.pending ? '<span class="prewar-flag">⏳重大懸念へ昇格候補</span>' : ""}
            ${res.basis === "override" && !res.pending ? '<span class="prewar-flag">▸判断(override)</span>' : ""}
          </summary>
          <div class="prewar-card-body">
            <div class="grid three">
              <div class="mini-card"><h3>評価可能性</h3><p>${item.exAnteEvaluability}</p></div>
              <div class="mini-card"><h3>評価の難度</h3><p>${item.evaluationDifficulty}</p></div>
              <div class="mini-card"><h3>評価形跡</h3><p>${item.actuallyEvaluated}${item.noEvidenceReason ? `（${item.noEvidenceReason}）` : ""}</p></div>
            </div>
            <p><strong>監査の問い:</strong> ${item.auditQuestion}</p>
            <p class="prewar-counter"><strong>反証・留保:</strong> ${item.counterPoint}</p>
            ${item.asymmetry ? `<p class="prewar-asymmetry"><strong>非対称性:</strong> ${item.asymmetry}</p>` : ""}
            ${
              res.basis === "override" || res.pending
                ? `<p class="prewar-rationale"><strong>${res.pending ? "昇格保留中の根拠" : "override 根拠"}:</strong> ${item.statusOverride.rationale}</p>`
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
        <h3>⏳ 保留中の昇格候補</h3>
        <p class="muted">事前のリスク構造から重大懸念に相当しうるが、現在の証拠状態では断定できないため保留。証拠が「形跡なし」を裏づけ次第、自動的に重大懸念へ昇格する。</p>
        ${pending
          .map(
            ({ item }) => `
              <div class="issue-row">
                <strong>${item.name}</strong>
                ${badge("要検証")}
                <span class="cell-meta">→ 重大懸念候補</span>
                <span class="cell-meta">収集最優先</span>
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
      <p class="muted">横軸=開戦前の評価可能性、縦軸=実際の評価形跡。右上（高 × 形跡なし）が重大懸念ゾーン。override は軸位置で配置せず、注釈バッジで重ねる。</p>
      ${matrix}
    </section>

    <section class="section">
      <h3>項目詳細</h3>
      <p class="muted">見出しをクリックで展開。反証・留保と非対称性を常時併置（反証を隠さない原則）。</p>
      ${cards}
    </section>
  `;
}

function render() {
  const [kicker, title] = viewMeta[activeView];
  document.querySelector("#view-kicker").textContent = kicker;
  document.querySelector("#view-title").textContent = title;

  const root = document.querySelector("#view-root");
  const renderers = {
    overview: renderOverview,
    timeline: renderTimeline,
    prewar: renderPreWar,
    assessment: renderAssessment,
    evidence: renderEvidence,
    opinion: renderOpinion,
  };
  root.innerHTML = renderers[activeView]();
}

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    activeView = button.dataset.view;
    document.querySelectorAll("[data-view]").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    render();
  });
});

document.addEventListener("click", (event) => {
  const evidenceButton = event.target.closest("[data-evidence-link]");
  if (evidenceButton) {
    activeEvidenceLinkId = evidenceButton.dataset.evidenceLink;
    render();
  }

  const modeButton = event.target.closest("[data-mode]");
  if (modeButton) {
    opinionMode = modeButton.dataset.mode;
    render();
  }

  const assessmentButton = event.target.closest("[data-assessment-cell]");
  if (assessmentButton) {
    activeAssessmentCellId = assessmentButton.dataset.assessmentCell;
    render();
  }

  const queueAssessmentButton = event.target.closest("[data-queue-assessment-cell]");
  if (queueAssessmentButton) {
    activeAssessmentCellId = queueAssessmentButton.dataset.queueAssessmentCell;
    activeView = "assessment";
    document.querySelectorAll("[data-view]").forEach((item) => {
      item.classList.toggle("is-active", item.dataset.view === "assessment");
    });
    render();
  }

  const resetFiltersButton = event.target.closest("[data-reset-filters]");
  if (resetFiltersButton) {
    evidenceFilters = getDefaultEvidenceFilters();
    activeEvidenceLinkId = auditData.evidenceLinks[0].id;
    render();
  }
});

document.addEventListener("change", (event) => {
  const filter = event.target.closest("[data-filter]");
  if (!filter) return;
  evidenceFilters[filter.dataset.filter] = filter.value;
  const firstMatch = auditData.evidenceLinks.find(evidenceLinkMatchesFilters);
  if (firstMatch) activeEvidenceLinkId = firstMatch.id;
  render();
});

render();






















