export const russoUkrainianWarRussiaCase = {
  warCase: {
    id: "russo-ukrainian-war-2022-russia",
    conflict: "ウクライナ戦争 2022–",
    name: "ウクライナ戦争 2022–：ロシア連邦側",
    auditedActor: "ロシア連邦・プーチン政権",
    opponentActor: "ウクライナ政府・ウクライナ軍・西側支援国",
    scope: "2022年全面侵攻判断・短期決着仮説・初期作戦失敗・長期戦化の入口",
    primaryResponsibility: "敵抵抗意思、西側反応、自軍能力、兵站・指揮統制、政治目的の見積もり責任",
    uncertainty: "中〜高",
    rating: "未確定",
    ratingNote: "初期ケースであり、公開一次資料と代表的戦中・戦後分析に基づく暫定評価。ロシア側内部意思決定資料、軍内部評価、作戦計画文書の精査後に rating を見直す。"
  },

  overviewOpinion: "ロシア側の侵攻判断には、ウクライナ抵抗意思、西側反応、自軍統合作戦能力、兵站・指揮統制、短期決着可能性について重大な過小・過大評価が含まれていた疑いが強い。\n\nただし、開戦前の公開軍事バランス上はロシア優位に見える要素も存在し、外部分析者にも同様の過大評価があったため、戦後結果だけを根拠に単純な後知恵評価へ落としてはならない。本ケースでは、ロシアの侵攻を正当化するか否かではなく、ロシア指導部が侵攻前に敵抵抗意思・西側反応・自軍能力・兵站・政治目的をどのように見積もったかを監査対象とする。国際法上の侵略評価は重要な背景資料だが、開戦前判断の能力監査とは層を分けて扱う。",

  issues: [
    { name: "敵抵抗意思・国家耐久力の過小評価", status: "要検証" },
    { name: "西側諸国の制裁・軍事支援の規模の過小評価", status: "要検証" },
    { name: "自軍能力・兵站・指揮統制の過大評価", status: "要検証" },
    { name: "意思決定プロセスの閉鎖性と反証情報の軽視", status: "要検証" }
  ],

  counterHypotheses: [
    "ロシア側がNATO拡大やウクライナの安全保障上の位置づけを脅威として表明していたことは確認でき、ロシアなりの安全保障上の動機は存在した。",
    "開戦前の公開軍事バランス上、ロシア軍がウクライナ軍より大きな物量優位を持つように見えたことは否定できず、外部の専門家もロシアの早期勝利を予測していた。",
    "西側支援と制裁の規模・持続性は、開戦前には完全には確定していなかった。",
    "ロシア側の最高意思決定過程を直接示す内部資料は限定的であり、情報が意図的に遮断されていたのか、単なる誤算だったのかを断定するには制約がある。"
  ],

  phases: [
    {
      id: "pre_invasion_crisis_decision",
      name: "開戦危機・侵攻判断",
      mainIssue: "政治目的と短期決着仮説",
      decision: "「特別軍事作戦」の開始判断",
      availableInfo: "開戦前の情報機関からの報告、公開軍事バランス、欧米の外交的反応、2014年以降のウクライナの動向",
      alternatives: ["軍事演習による威嚇の継続", "ドンバス限定の軍事介入", "外交的妥協（ミンスク合意の再交渉）"],
      revisionRoom: "高",
      revisionNote: "侵攻開始までは政治的決定による撤回や限定介入への切り替えが可能であった。",
      auditQuestion: "ロシア指導部は、ウクライナ国家の抵抗意思をどう見積もり、キーウ政権の早期崩壊をどれほど現実的に想定していたか？",
      status: "要検証",
      assumptions: []
    },
    {
      id: "multi_axis_invasion_kyiv_operation",
      name: "多軸侵攻・キーウ攻略作戦",
      mainIssue: "短期作戦計画と兵站・指揮統制",
      decision: "多軸での同時進攻とキーウの早期制圧の試み",
      availableInfo: "初期侵攻部隊の進撃速度、ウクライナ軍の抵抗状況、自軍の補給状況",
      alternatives: ["ドンバス・南部への兵力集中", "十分な兵站・予備兵力を用意した上での漸進的侵攻"],
      revisionRoom: "低",
      revisionNote: "多軸侵攻の開始後は、兵站の混乱と部隊の分散により、作戦の即時修正が困難となった。",
      auditQuestion: "作戦保全を優先した結果、兵站・燃料・整備・通信能力の評価や現場への情報共有が犠牲になっていなかったか？",
      status: "要検証",
      assumptions: []
    },
    {
      id: "kyiv_failure_donbas_shift",
      name: "キーウ方面失敗・ドンバス重点化",
      mainIssue: "前提崩壊後の方針修正",
      decision: "キーウ方面からの撤退と東部・南部への作戦重点化",
      availableInfo: "キーウ周辺での戦線膠着と甚大な損害、補給路の切断、西側による大規模な武器供与の開始",
      alternatives: ["損失を度外視したキーウ攻略の継続", "停戦交渉への本格移行と軍事行動の縮小"],
      revisionRoom: "中",
      revisionNote: "事実上の初期作戦失敗を認識し、軍事目標の縮小と部隊の再編成を行ったが、戦争終結には至らなかった。",
      auditQuestion: "キーウ方面作戦の失敗後、ロシア指導部は当初仮説を再評価し、限定目標化や停戦の選択肢を適切に検討したか？",
      status: "要検証",
      assumptions: []
    },
    {
      id: "entry_into_attrition_boundary",
      name: "長期戦化の入口・別ケース境界",
      mainIssue: "初期判断の帰結と継戦責任の切り分け",
      decision: "長期消耗戦への移行（部分動員前の体制維持）",
      availableInfo: "西側支援の恒久化、ウクライナ軍の反攻の兆し、自軍の深刻な人的・物的損耗",
      alternatives: ["全面的な動員によるエスカレーション（後に実施）", "現状維持ラインでの講和・停戦の模索"],
      revisionRoom: "低",
      revisionNote: "初期の短期決着仮説は完全に破綻しており、ここから先の継戦判断（2022年秋以降の動員等）は別の監査対象（新たな意思決定）となる。",
      auditQuestion: "短期決着失敗後の長期戦化は、2022年2月の判断責任としてどこまで評価できるか？",
      status: "要検証",
      assumptions: []
    }
  ],

  preWarChecklist: [
    {
      id: "ruw_pw_ukrainian_resistance",
      name: "ウクライナ抵抗意思の見積もり",
      category: "政治・社会",
      exAnteEvaluability: "高",
      actuallyEvaluated: "限定的",
      evaluationDifficulty: "高",
      auditQuestion: "ウクライナ国家、軍、社会、ゼレンスキー政権の抵抗意思と動員能力をどう見積もったか？",
      counterPoint: "外部専門家もウクライナの早期崩壊を予測していた",
      evidenceBasis: "公開演説等から、歴史的・イデオロギー的な「一体性」の主張により抵抗意思が過小評価されていた形跡が強いが、内部文書の確認には至っていない。",
      linkedCells: ["ruw_cell_resistance_estimation"],
      linkedAssumptions: [],
      linkedEvidenceLinks: ["RUW-EL-001", "RUW-EL-002", "RUW-EL-003"],
      statusOverride: { provisional: true, value: "要検証", rationale: "ロシア側の内部意思決定資料が未公開であり、公開演説・戦中研究・外部分析に依存するため。" }
    },
    {
      id: "ruw_pw_western_response",
      name: "西側の反応と支援の見積もり",
      category: "外交・国際",
      exAnteEvaluability: "中",
      actuallyEvaluated: "限定的",
      evaluationDifficulty: "高",
      auditQuestion: "米欧・NATO・EU・日本などによる制裁、軍事支援、情報支援、外交的結束の規模をどう見積もったか？",
      counterPoint: "西側支援の規模と結束は開戦前には不確実性が高かった",
      evidenceBasis: "2014年のクリミア併合時の経験等から西側の反応を限定的と見積もった可能性が指摘されているが、直接的な内部評価文書は未収集。",
      linkedCells: ["ruw_cell_western_response"],
      linkedAssumptions: [],
      linkedEvidenceLinks: ["RUW-EL-004", "RUW-EL-005"],
      statusOverride: { provisional: true, value: "要検証", rationale: "ロシア側の内部意思決定資料が未公開であり、公開演説・戦中研究・外部分析に依存するため。" }
    },
    {
      id: "ruw_pw_russian_force_readiness",
      name: "自軍の即応性と統合作戦能力の見積もり",
      category: "軍事・作戦",
      exAnteEvaluability: "高",
      actuallyEvaluated: "不明",
      evaluationDifficulty: "中",
      auditQuestion: "ロシア軍の即応性、統合作戦能力、兵士練度、部隊充足、航空・地上連携を過大評価していなかったか？",
      counterPoint: "開戦前の公開軍事バランス上はロシアが圧倒的優位に見えた",
      evidenceBasis: "開戦後の損耗と作戦の混乱から過大評価が強く疑われるが、事前の内部軍事見積もり文書は未公開。",
      linkedCells: ["ruw_cell_force_estimation"],
      linkedAssumptions: [],
      linkedEvidenceLinks: ["RUW-EL-006", "RUW-EL-007"],
      statusOverride: { provisional: true, value: "要検証", rationale: "ロシア側の内部意思決定資料が未公開であり、公開演説・戦中研究・外部分析に依存するため。" }
    },
    {
      id: "ruw_pw_logistics_command",
      name: "兵站と指揮統制の評価",
      category: "軍事・作戦",
      exAnteEvaluability: "高",
      actuallyEvaluated: "不明",
      evaluationDifficulty: "中",
      auditQuestion: "多軸侵攻を支える兵站、燃料、整備、通信、指揮統制、作戦保全とのトレードオフを適切に評価していたか？",
      counterPoint: "初期作戦の失敗は事後結果であり、事前計画段階での致命的欠陥の有無は直接確認されていない",
      evidenceBasis: "キーウ方面の撤退等から兵站と指揮の破綻は明らかであるが、開戦前にこれを軍部がどう評価していたか（あるいは軽視されたか）は内部文書未公開。",
      linkedCells: ["ruw_cell_logistics_command"],
      linkedAssumptions: [],
      linkedEvidenceLinks: ["RUW-EL-008", "RUW-EL-009"],
      statusOverride: { provisional: true, value: "要検証", rationale: "ロシア側の内部意思決定資料が未公開であり、公開演説・戦中研究・外部分析に依存するため。" }
    },
    {
      id: "ruw_pw_regime_ideology_bias",
      name: "イデオロギー的バイアスと情報閉鎖性",
      category: "政治・社会",
      exAnteEvaluability: "中",
      actuallyEvaluated: "不明",
      evaluationDifficulty: "高",
      auditQuestion: "NATO脅威認識、ウクライナ国家否認的歴史観、体制安全保障論理によって客観的情報が遮断されていなかったか？",
      counterPoint: "ロシア指導部の内部意思決定プロセスはブラックボックスである",
      evidenceBasis: "開戦前の公開演説から強いイデオロギー的動機は読み取れるが、それが実際の意思決定においてどこまで情報を歪めたかは断定に制約がある。",
      linkedCells: ["ruw_cell_decision_process"],
      linkedAssumptions: [],
      linkedEvidenceLinks: ["RUW-EL-010", "RUW-EL-011", "RUW-EL-012"],
      statusOverride: { provisional: true, value: "要検証", rationale: "ロシア側の内部意思決定資料が未公開であり、公開演説・戦中研究・外部分析に依存するため。" }
    }
  ],

  hypothesisTracking: [],

  assessmentCells: [
    {
      id: "ruw_cell_political_objective",
      axis: "政治目的・戦争目的の明確性",
      phase: "開戦危機・侵攻判断",
      status: "要検証",
      impact: "高",
      evidenceStrength: "弱〜中",
      opinion: "公開演説等でNATO脅威や歴史的「一体性」が表明された一方、軍事行動の目標（政権転覆か、ドンバス限定か等）の初期見積もりの妥当性は内部資料待ち。",
      criteria: ["公式説明と実際の軍事的目標に乖離がないか", "政治目的と手段のバランスが開戦前に評価されていたか"],
      changeConditions: ["詳細な侵攻計画書や最高意思決定の議事録が公開された場合"],
      noEvidenceReason: "証拠未収集",
      nextEvidenceActionType: "collect_primary_source"
    },
    {
      id: "ruw_cell_resistance_estimation",
      axis: "敵抵抗意思・国家耐久力の見積もり",
      phase: "開戦危機・侵攻判断",
      status: "要検証",
      impact: "高",
      evidenceStrength: "弱〜中",
      opinion: "ウクライナの国家・社会の抵抗意思を大幅に過小評価し、早期崩壊を想定していた疑いが強いが、外部専門家も類似の過大・過小評価を行っていた。",
      criteria: ["ウクライナ軍・社会の動員能力と抗戦意思を事前にどう評価していたか"],
      changeConditions: ["FSB等の事前の世論調査・情報分析報告書の全容が判明した場合"],
      noEvidenceReason: "証拠未収集",
      nextEvidenceActionType: "collect_primary_source"
    },
    {
      id: "ruw_cell_force_estimation",
      axis: "自軍能力・兵站・指揮統制の見積もり",
      phase: "開戦危機・侵攻判断",
      status: "要検証",
      impact: "高",
      evidenceStrength: "弱〜中",
      opinion: "開戦前の公開軍事バランスではロシア優位と見られていたが、統合作戦能力や多軸侵攻能力への過信があった可能性が高い。",
      criteria: ["自軍の即応性や統合作戦能力を客観的に評価した形跡があるか"],
      changeConditions: ["軍内部の事前準備状況や戦備評価の真の報告が確認された場合"],
      noEvidenceReason: "証拠未収集",
      nextEvidenceActionType: "collect_primary_source"
    },
    {
      id: "ruw_cell_logistics_command",
      axis: "自軍能力・兵站・指揮統制の見積もり",
      phase: "多軸侵攻・キーウ攻略作戦",
      status: "要検証",
      impact: "高",
      evidenceStrength: "弱",
      opinion: "作戦保全を優先した結果、現場への情報共有や兵站準備が不足したとされるが、決定の背景は不明。",
      criteria: ["多軸侵攻を支えるだけの兵站・通信能力が事前計画に存在したか"],
      changeConditions: ["多軸侵攻計画の策定過程が判明した場合"],
      noEvidenceReason: "証拠未収集",
      nextEvidenceActionType: "collect_primary_source"
    },
    {
      id: "ruw_cell_donbas_shift_objective",
      axis: "政治目的・戦争目的の明確性",
      phase: "キーウ方面失敗・ドンバス重点化",
      status: "要検証",
      impact: "高",
      evidenceStrength: "弱",
      opinion: "軍事目標を縮小した際、最終的な政治目的（勝利条件）をどう再定義したか不明。",
      criteria: ["戦力再編時の目標設定の妥当性"],
      changeConditions: ["2022年4月の作戦変更命令書が公開された場合"],
      noEvidenceReason: "証拠未収集",
      nextEvidenceActionType: "collect_primary_source"
    },
    {
      id: "ruw_cell_western_response",
      axis: "外部環境・制裁・軍事支援の見積もり",
      phase: "開戦危機・侵攻判断",
      status: "要検証",
      impact: "高",
      evidenceStrength: "弱〜中",
      opinion: "西側の制裁と軍事支援の規模・持続性を過小評価した疑いがあるが、開戦前は西側対応にも不確実性があった。",
      criteria: ["西側からの大規模な武器供与や経済制裁のリスクをどう算定していたか"],
      changeConditions: ["経済関係機関や情報機関からの制裁・支援リスク見積もりが公開された場合"],
      noEvidenceReason: "証拠未収集",
      nextEvidenceActionType: "collect_primary_source"
    },
    {
      id: "ruw_cell_decision_process",
      axis: "意思決定プロセス・情報閉鎖性",
      phase: "開戦危機・侵攻判断",
      status: "要検証",
      impact: "高",
      evidenceStrength: "弱",
      opinion: "最高意思決定が少人数に閉ざされ、反証や否定的な情報が指導部に届かなかった可能性が指摘されている。",
      criteria: ["軍・情報機関からのネガティブな見積もりが意思決定層に適切に共有・検討されたか"],
      changeConditions: ["開戦前の安全保障会議等の非公開議事録が公開された場合"],
      noEvidenceReason: "証拠未収集",
      nextEvidenceActionType: "collect_primary_source"
    },
    {
      id: "ruw_cell_attrition_shift",
      axis: "政治目的・戦争目的の明確性",
      phase: "長期戦化の入口・別ケース境界",
      status: "要検証",
      impact: "高",
      evidenceStrength: "弱",
      opinion: "短期決着仮説の破綻後、長期戦化への移行をどのように判断し、当初の戦争目的をどう再定義したか（本ケースの監査境界）。",
      criteria: ["初期目標の未達を認識した上で、戦争継続の正当性と持続可能性をどう再評価したか"],
      changeConditions: ["2022年春〜夏の戦略再評価に関する内部資料が判明した場合"],
      noEvidenceReason: "証拠未収集",
      nextEvidenceActionType: "collect_primary_source"
    }
  ],

  evidence: [
    {
      id: "RUW-E-001",
      title: "Vladimir Putin, \"On the Historical Unity of Russians and Ukrainians\"",
      source: "2021年7月 ロシア大統領府公開論文",
      type: "公開資料",
      publishedDate: "2021-07",
      coveragePeriod: "2021",
      authenticity: "高",
      interpretiveReliability: "中",
      collectionState: "収集済み"
    },
    {
      id: "RUW-E-002",
      title: "ドネツク・ルガンスク承認に関する大統領演説",
      source: "2022年2月21日 大統領演説",
      type: "公開資料",
      publishedDate: "2022-02-21",
      coveragePeriod: "2022",
      authenticity: "高",
      interpretiveReliability: "中",
      collectionState: "収集済み"
    },
    {
      id: "RUW-E-003",
      title: "「特別軍事作戦」開始に関する大統領演説",
      source: "2022年2月24日 大統領演説",
      type: "公開資料",
      publishedDate: "2022-02-24",
      coveragePeriod: "2022",
      authenticity: "高",
      interpretiveReliability: "中",
      collectionState: "収集済み"
    },
    {
      id: "RUW-E-004",
      title: "ロシア連邦安全保障会議の公開放送",
      source: "2022年2月21日前後 公開放送映像",
      type: "公開資料",
      publishedDate: "2022-02",
      coveragePeriod: "2022",
      authenticity: "高",
      interpretiveReliability: "低",
      collectionState: "収集済み"
    },
    {
      id: "RUW-E-005",
      title: "UN General Assembly Resolution ES-11/1, Aggression against Ukraine",
      source: "2022年3月2日 国連総会決議",
      type: "公開資料",
      publishedDate: "2022-03",
      coveragePeriod: "2022",
      authenticity: "高",
      interpretiveReliability: "高",
      collectionState: "収集済み"
    },
    {
      id: "RUW-E-006",
      title: "Preliminary Lessons in Conventional Warfighting from Russia's Invasion of Ukraine: February–July 2022",
      source: "RUSI (Royal United Services Institute), 2022年",
      type: "外部研究",
      publishedDate: "2022",
      coveragePeriod: "2022",
      authenticity: "高",
      interpretiveReliability: "中",
      collectionState: "収集済み"
    },
    {
      id: "RUW-E-007",
      title: "The Russia-Ukraine War: A Study in Analytic Failure",
      source: "CSIS (Center for Strategic and International Studies), 2023年",
      type: "外部研究",
      publishedDate: "2023",
      coveragePeriod: "2022",
      authenticity: "高",
      interpretiveReliability: "中",
      collectionState: "収集済み"
    },
    {
      id: "RUW-E-008",
      title: "Russia's Grinding War in Ukraine",
      source: "CSIS, 2023年",
      type: "外部研究",
      publishedDate: "2023",
      coveragePeriod: "2022-2023",
      authenticity: "高",
      interpretiveReliability: "中",
      collectionState: "収集済み"
    },
    {
      id: "RUW-E-009",
      title: "IISS The Military Balance 2022",
      source: "IISS (International Institute for Strategic Studies), 2022年2月",
      type: "公開資料",
      publishedDate: "2022-02",
      coveragePeriod: "2021-2022",
      authenticity: "高",
      interpretiveReliability: "高",
      collectionState: "収集済み"
    }
  ],

  claims: [
    {
      id: "ruw_claim_ukrainian_resistance_underestimated",
      text: "ロシア指導部はウクライナ国家・軍・社会の抵抗意思を過小評価した",
      type: "audit_issue"
    },
    {
      id: "ruw_claim_western_response_underestimated",
      text: "ロシア指導部は西側諸国の制裁・軍事支援・情報支援の規模を過小評価した",
      type: "audit_issue"
    },
    {
      id: "ruw_claim_russian_force_readiness_overestimated",
      text: "ロシア指導部は自軍の統合作戦能力・兵站・指揮統制を過大評価した",
      type: "audit_issue"
    },
    {
      id: "ruw_claim_short_war_assumption",
      text: "ロシアの侵攻判断は短期決着・キーウ早期制圧・政権転覆仮説に過度に依存していた可能性がある",
      type: "audit_issue"
    },
    {
      id: "ruw_claim_decision_process_narrowed",
      text: "ロシア側の意思決定は少数指導部に集中し、反証情報が十分に扱われなかった可能性がある",
      type: "audit_issue"
    },
    {
      id: "ruw_claim_security_concerns_stated",
      text: "ロシア側がNATO拡大やウクライナの安全保障上の位置づけを脅威として表明していたことは確認できる",
      type: "counter_claim"
    },
    {
      id: "ruw_claim_russian_material_advantage_ex_ante",
      text: "開戦前の公開軍事バランス上、ロシア軍がウクライナ軍より大きな物量優位を持つように見えたことは否定できない",
      type: "counter_claim"
    },
    {
      id: "ruw_claim_external_analysts_also_overestimated_russia",
      text: "外部専門家の多くもロシア軍能力を過大評価し、ウクライナ抵抗力を過小評価していた可能性がある",
      type: "counter_claim"
    },
    {
      id: "ruw_claim_western_response_scale_uncertain",
      text: "西側支援と制裁の規模・持続性は、開戦前には完全には確定していなかった",
      type: "counter_claim"
    },
    {
      id: "ruw_claim_internal_documents_unavailable",
      text: "ロシア側の最高意思決定過程を直接示す内部資料は限定的であり、動機・認識の断定には制約がある",
      type: "counter_claim"
    }
  ],

  evidenceLinks: [
    {
      id: "RUW-EL-001",
      evidenceId: "RUW-E-006",
      claimId: "ruw_claim_ukrainian_resistance_underestimated",
      assessmentCellId: "ruw_cell_resistance_estimation",
      claimLabel: "ウクライナ抵抗意思",
      target: "過小評価",
      relationship: "保留",
      relevance: "高",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: false,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "戦中・戦後の分析結果による推論",
      canSay: "初期の作戦計画がウクライナの組織的抵抗の早期崩壊を前提としていた可能性が高いこと",
      cannotSay: "ロシア指導部内での具体的な事前見積もりの数値や議論の詳細",
      reviewState: "要検証"
    },
    {
      id: "RUW-EL-002",
      evidenceId: "RUW-E-007",
      claimId: "ruw_claim_external_analysts_also_overestimated_russia",
      assessmentCellId: "ruw_cell_resistance_estimation",
      claimLabel: "外部専門家の過大評価",
      target: "事実",
      relationship: "支持",
      relevance: "高",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: false,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "欧米シンクタンクの事後反省",
      canSay: "西側の分析者の間でもロシア軍の能力過大評価とウクライナ軍の過小評価が広く存在したこと",
      cannotSay: "他者も間違えていたからといってロシア指導部の誤判断が正当化されること",
      reviewState: "完了"
    },
    {
      id: "RUW-EL-003",
      evidenceId: "RUW-E-007",
      claimId: "ruw_claim_ukrainian_resistance_underestimated",
      assessmentCellId: "ruw_cell_resistance_estimation",
      claimLabel: "ウクライナ抵抗意思",
      target: "過小評価",
      relationship: "保留",
      relevance: "高",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: false,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "外部研究",
      canSay: "西側分析者と同様の分析バイアスがロシア側にも存在した「可能性」",
      cannotSay: "ロシアの過小評価のみが極端に特異であったと断定すること",
      reviewState: "要検証"
    },
    {
      id: "RUW-EL-004",
      evidenceId: "RUW-E-006",
      claimId: "ruw_claim_western_response_underestimated",
      assessmentCellId: "ruw_cell_western_response",
      claimLabel: "西側支援",
      target: "過小評価",
      relationship: "保留",
      relevance: "高",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: false,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "事後分析",
      canSay: "結果としてロシアの想定を超える規模の西側支援が行われたこと",
      cannotSay: "開戦前に西側支援がこれほど大規模になると確実に見通せたはずであること",
      reviewState: "要検証"
    },
    {
      id: "RUW-EL-005",
      evidenceId: "RUW-E-006",
      claimId: "ruw_claim_western_response_scale_uncertain",
      assessmentCellId: "ruw_cell_western_response",
      claimLabel: "西側支援",
      target: "不確実性",
      relationship: "支持",
      relevance: "中",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: false,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "当時の情勢からの推測",
      canSay: "西側の政治的結束や軍事支援のスピードは事前の確定事項ではなく、開戦後のウクライナの抵抗によって引き出された側面があること",
      cannotSay: "制裁や支援の可能性を事前に検討しなくてよかったこと",
      reviewState: "完了"
    },
    {
      id: "RUW-EL-006",
      evidenceId: "RUW-E-006",
      claimId: "ruw_claim_russian_force_readiness_overestimated",
      assessmentCellId: "ruw_cell_force_estimation",
      claimLabel: "自軍能力",
      target: "過大評価",
      relationship: "保留",
      relevance: "高",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: false,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "作戦失敗からの逆算",
      canSay: "実際の戦場でロシア軍の統合運用能力や即応性が当初の想定（期待）を下回っていたこと",
      cannotSay: "開戦前に軍部がプーチン大統領に対して「能力不足」を正確に報告していた（あるいは隠蔽していた）こと",
      reviewState: "要検証"
    },
    {
      id: "RUW-EL-007",
      evidenceId: "RUW-E-009",
      claimId: "ruw_claim_russian_material_advantage_ex_ante",
      assessmentCellId: "ruw_cell_force_estimation",
      claimLabel: "公開軍事バランス",
      target: "物量優位",
      relationship: "支持",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "公然の軍事力データ",
      canSay: "兵力、戦車、航空機などの帳簿上の数量において、ロシア軍がウクライナ軍に対して圧倒的な物量優位にあると開戦前は（外部からも）評価されていたこと",
      cannotSay: "その物量優位が、実際の統合作戦能力や兵站維持能力を担保するものであったこと",
      reviewState: "完了"
    },
    {
      id: "RUW-EL-008",
      evidenceId: "RUW-E-006",
      claimId: "ruw_claim_short_war_assumption",
      assessmentCellId: "ruw_cell_logistics_command",
      claimLabel: "短期決着仮説",
      target: "依存",
      relationship: "保留",
      relevance: "高",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: false,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "戦中研究",
      canSay: "初期の進軍速度や部隊の携行物資量から、数日〜数週間での決着を想定していた可能性が高いこと",
      cannotSay: "長期戦になった場合の代替計画（プランB）が全く存在しなかったこと",
      reviewState: "要検証"
    },
    {
      id: "RUW-EL-009",
      evidenceId: "RUW-E-008",
      claimId: "ruw_claim_short_war_assumption",
      assessmentCellId: "ruw_cell_attrition_shift",
      claimLabel: "短期決着仮説",
      target: "依存",
      relationship: "反証",
      relevance: "中",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: false,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "事後分析",
      canSay: "初期仮説が崩れた後、結果的にはロシアは長期の消耗戦（Grinding War）を戦う能力と意思を持っていたこと",
      cannotSay: "その長期消耗戦への移行が、2022年2月の開戦前から計画・予期されていたこと",
      reviewState: "要検証"
    },
    {
      id: "RUW-EL-010",
      evidenceId: "RUW-E-001",
      claimId: "ruw_claim_security_concerns_stated",
      assessmentCellId: "ruw_cell_decision_process",
      claimLabel: "安全保障懸念",
      target: "表明",
      relationship: "支持",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "大統領自身の執筆・公開",
      canSay: "プーチン大統領自身が、ウクライナとロシアの歴史的一体性や、西側による「反ロシア」化への強い警戒感を公式に表明していたこと",
      cannotSay: "その歴史認識が客観的真実であるか、あるいは侵攻の国際法上の正当化事由となること",
      reviewState: "完了"
    },
    {
      id: "RUW-EL-011",
      evidenceId: "RUW-E-004",
      claimId: "ruw_claim_decision_process_narrowed",
      assessmentCellId: "ruw_cell_decision_process",
      claimLabel: "意思決定プロセス",
      target: "閉鎖性",
      relationship: "保留",
      relevance: "中",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "公開放送における指導部内の力学の露見",
      canSay: "公開された安全保障会議の映像において、プーチン大統領への異論が許容されにくい雰囲気が演出（または露見）されていたこと",
      cannotSay: "カメラのない密室での実際の討議内容や、軍部からの正確な報告の有無",
      reviewState: "要検証"
    },
    {
      id: "RUW-EL-012",
      evidenceId: "RUW-E-004",
      claimId: "ruw_claim_internal_documents_unavailable",
      assessmentCellId: "ruw_cell_decision_process",
      claimLabel: "内部資料",
      target: "不足",
      relationship: "支持",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "会議の意図的な公開・演出",
      canSay: "我々がアクセスできる「開戦前判断」の直接資料の多くは、ロシア指導部が意図的に公開・演出したものであり、真の内部資料ではないこと",
      cannotSay: "内部資料がないからといって、作戦結果と公開発言から初期判断の破綻を推測してはならないこと",
      reviewState: "完了"
    },
    {
      id: "RUW-EL-013",
      evidenceId: "RUW-E-005",
      claimId: "ruw_claim_security_concerns_stated",
      assessmentCellId: "ruw_cell_decision_process",
      claimLabel: "安全保障懸念",
      target: "正当性",
      relationship: "反証",
      relevance: "中",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: false,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "事後の国際社会の評価",
      canSay: "安全保障懸念の表明にもかかわらず、国際社会からは不法な侵略と認定されたこと",
      cannotSay: "ロシア指導部が内心でも自らの安全保障上の動機を不当だと認識していたこと",
      reviewState: "要検証"
    },
    {
      id: "RUW-EL-014",
      evidenceId: "RUW-E-006",
      claimId: "ruw_claim_russian_material_advantage_ex_ante",
      assessmentCellId: "ruw_cell_force_estimation",
      claimLabel: "公開軍事バランス",
      target: "実戦能力への直結",
      relationship: "反証",
      relevance: "高",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: false,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "戦中分析",
      canSay: "帳簿上の物量優位が、実際の戦場での統合作戦能力や兵站維持能力に直結しなかったこと",
      cannotSay: "開戦前の時点で物量優位という評価が完全に誤りだと見通せたこと",
      reviewState: "完了"
    },
    {
      id: "RUW-EL-015",
      evidenceId: "RUW-E-007",
      claimId: "ruw_claim_external_analysts_also_overestimated_russia",
      assessmentCellId: "ruw_cell_resistance_estimation",
      claimLabel: "外部専門家の過大評価",
      target: "免責事由",
      relationship: "反証",
      relevance: "中",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: false,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "事後反省",
      canSay: "外部専門家の過大評価も独自の情報ギャップや偏見によるものであり、それがロシアの指導部の見積もり責任を免除するわけではないこと",
      cannotSay: "外部専門家とロシア情報機関が全く同じ情報源に依存していたこと",
      reviewState: "完了"
    },
    {
      id: "RUW-EL-016",
      evidenceId: "RUW-E-006",
      claimId: "ruw_claim_western_response_scale_uncertain",
      assessmentCellId: "ruw_cell_western_response",
      claimLabel: "西側支援",
      target: "事前警告の不在",
      relationship: "反証",
      relevance: "中",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: false,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "事後分析",
      canSay: "西側諸国が開戦前から前例のない制裁の準備を進め、明確な警告を発していた形跡もあること",
      cannotSay: "開戦前に支援・制裁の全容が完全に確定していたこと",
      reviewState: "要検証"
    },
    {
      id: "RUW-EL-017",
      evidenceId: "RUW-E-004",
      claimId: "ruw_claim_internal_documents_unavailable",
      assessmentCellId: "ruw_cell_decision_process",
      claimLabel: "内部資料",
      target: "検証可能性の完全な欠如",
      relationship: "反証",
      relevance: "中",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "公開放送の内容",
      canSay: "公開放送の演出や作戦の実際の展開から、内部の意思決定の偏りや誤算の構造をある程度推測できること",
      cannotSay: "完全な議事録の代わりになること",
      reviewState: "完了"
    }
  ],

  ratingBasis: [
    {
      cellId: "ruw_cell_political_objective",
      weight: 1
    },
    {
      cellId: "ruw_cell_resistance_estimation",
      weight: 1
    },
    {
      cellId: "ruw_cell_force_estimation",
      weight: 1
    },
    {
      cellId: "ruw_cell_logistics_command",
      weight: 1
    },
    {
      cellId: "ruw_cell_western_response",
      weight: 1
    },
    {
      cellId: "ruw_cell_decision_process",
      weight: 1
    },
    {
      cellId: "ruw_cell_attrition_shift",
      weight: 1
    },
    {
      cellId: "ruw_cell_donbas_shift_objective",
      weight: 1
    }
  ]
};
