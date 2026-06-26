export const francoPrussianWarPrussiaCase = {
  warCase: {
    id: "franco-prussian-war-1870-prussia",
    counterpartCaseId: "franco-prussian-war-1870-france",
    conflict: "普仏戦争 1870–71",
    name: "普仏戦争 1870–71：プロイセン・北ドイツ連邦側",
    auditedActor: "プロイセン王国（ビスマルク、モルトケ）",
    opponentActor: "フランス第二帝政",
    scope: "対仏戦争の誘導・動員と包囲戦・帝国樹立判断",
    primaryResponsibility: "開戦の外交的誘導・動員優位性の確保・他大国不介入の担保・戦後処理",
    uncertainty: "中",
    rating: "未確定",
    ratingNote: "格付けは未確定（編集判断として意図的に保留）。能力肯定面（外交誘導・動員優位）に加え、訴追面（戦争長期化リスク・アルザス＝ロレーヌ併合コスト）も同時代一次で ex-ante に接地し、双方の ratingBasis セルは証拠強度『中〜強』に到達した（＝『証拠量』の条件は概ね充足）。残る rating-readiness 条件は証拠量ではなく**争点の決着**＝訴追セルが支持/反証の両建て（ACH 上 未決着）であり、能力肯定が訴追を上回ると編集判断できる段階に未達であること。決着には作戦計画・講和審議の内部記録（長期化・併合是非の事前衡量度合い）の確認を要する。"
  },

  overviewOpinion: "プロイセン側の開戦判断と遂行は、結果論としてはドイツ統一という最大の戦略目標を達成し「完全な成功」と見なされがちである。しかし、本監査では結果の成功バイアス（勝者の後知恵）を排し、開戦前（エムス電報の時点）でフランスの軍事力や他大国（オーストリア・ロシア）の介入リスク、そして南ドイツ諸邦の離反リスクをどのように客観的に見積もっていたかを検証する。モルトケの緻密な動員計画やビスマルクの周到な外交的孤立化工作は高く評価できる一方、パリ包囲の長期化や対仏報復感情の固定化（アルザス・ロレーヌ併合）などの長期的リスクがどこまで算定されていたかも重要な監査対象となる。",

  issues: [
    { name: "開戦の外交的誘導と他大国不介入の担保", status: "軽度" },
    { name: "動員速度と初期作戦における圧倒的優位の事前見積もり", status: "要検証" },
    { name: "南ドイツ諸邦の確実な参戦と統合の担保", status: "軽度" },
    { name: "戦争長期化（パリ包囲等）のリスク見積もり", status: "要検証" }
  ],

  counterHypotheses: [
    "プロイセンは事前の周到な計画に基づいてすべてをコントロールしていたわけではなく、フランス側の失策（動員混乱や不用意な宣戦布告）に助けられた偶発的要素も大きかった。",
    "オーストリアの介入リスクや南ドイツの世論動向には開戦前時点では不確実性が残されており、完全な「安全パイ」での開戦ではなかった。",
    "事後の回顧録（ビスマルク等）における「全ては計画通りであった」という主張には、強い事後的正当化バイアスが含まれている。"
  ],

  phases: [
    {
      id: "crisis_and_provocation",
      name: "開戦危機と外交的挑発",
      mainIssue: "フランスの宣戦布告誘導と他大国の分断",
      decision: "エムス電報の編集と公表",
      availableInfo: "フランス側の国内世論の熱狂、ロシアの中立保障の感触",
      alternatives: ["外交的妥協（ホーエンツォレルン家候補の完全辞退受諾）"],
      revisionRoom: "高",
      revisionNote: "ビスマルクの裁量で危機のエスカレートを回避することは可能だった",
      auditQuestion: "フランスに宣戦布告させるリスクを正確に計算していたか？",
      status: "軽度",
      assumptions: []
    },
    {
      id: "mobilization_and_invasion",
      name: "動員と初期侵攻",
      mainIssue: "動員速度の優位性とフランス軍の無力化",
      decision: "全軍動員と国境突破",
      availableInfo: "自国の鉄道動員計画、南ドイツ諸邦の条約発動",
      alternatives: ["防衛戦への移行"],
      revisionRoom: "低",
      revisionNote: "動員開始後は軍事システム上、侵攻の停止は困難",
      auditQuestion: "動員における優位は事前計画の通りに機能したか？",
      status: "軽度",
      assumptions: []
    },
    {
      id: "sedan_and_paris_siege",
      name: "セダンとパリ包囲",
      mainIssue: "戦争の長期化リスクと講和のタイミング",
      decision: "パリ包囲の継続と砲撃",
      availableInfo: "ナポレオン3世の降伏、フランス新政府の徹底抗戦",
      alternatives: ["早期の緩やかな講和"],
      revisionRoom: "中",
      revisionNote: "軍部（モルトケ）と政治（ビスマルク）の間で方針対立があった",
      auditQuestion: "戦争長期化による他大国介入リスクをどう管理したか？",
      status: "要検証",
      assumptions: []
    },
    {
      id: "empire_proclamation_and_peace",
      name: "ドイツ帝国樹立と講和",
      mainIssue: "戦後体制の設計と長期的安全保障リスク",
      decision: "アルザス・ロレーヌ併合と賠償金要求",
      availableInfo: "フランスの完全敗北とドイツ・ナショナリズムの高揚",
      alternatives: ["領土割譲を伴わない講和"],
      revisionRoom: "高",
      revisionNote: "ビスマルク自身は併合の長期的リスク（仏の永続的復讐心）を認識していたとされる",
      auditQuestion: "アルザス・ロレーヌ併合の長期的コストをどう評価したか？",
      status: "要検証",
      assumptions: []
    }
  ],

  preWarChecklist: [
    {
      id: "fpwp_pw_diplomatic_provocation",
      name: "開戦の外交的誘導リスク",
      category: "外交",
      exAnteEvaluability: "高",
      actuallyEvaluated: "形跡あり",
      evaluationDifficulty: "低",
      auditQuestion: "外交的挑発（エムス電報）による開戦誘導は計算されたリスクテイクであったか？",
      counterPoint: "当時の国内にも戦争回避の努力や懸念が存在した",
      evidenceBasis: "エムス電報の意図的編集は確認できるが、国王などによる戦争回避努力の同時代資料も存在する。",
      linkedCells: ["fpwp_cell_provocation_diplomacy"],
      linkedAssumptions: [],
      linkedEvidenceLinks: ["FPWP-EL-001", "FPWP-EL-002"],
      statusOverride: { provisional: true, value: "軽度", rationale: "高い確度で評価・管理されていたため暫定" }
    },
    {
      id: "fpwp_pw_diplomatic_isolation",
      name: "フランスの外交的孤立化の確度",
      category: "外交",
      exAnteEvaluability: "高",
      actuallyEvaluated: "形跡あり",
      evaluationDifficulty: "低",
      auditQuestion: "ロシアとオーストリアの不介入を事前に担保していたか？",
      counterPoint: "オーストリア介入の残存リスクがあった",
      evidenceBasis: "ビスマルクによる周到な外交工作が同時代資料で確認可能だが、オーストリアの動向には不確定要素もあった。",
      linkedCells: ["fpwp_cell_provocation_diplomacy"],
      linkedAssumptions: [],
      linkedEvidenceLinks: ["FPWP-EL-003", "FPWP-EL-004"],
      statusOverride: { provisional: true, value: "軽度", rationale: "高い確度で評価・管理されていたため暫定" }
    },
    {
      id: "fpwp_pw_military_superiority",
      name: "自国の動員能力とフランス軍の実力評価",
      category: "戦略・動員",
      exAnteEvaluability: "高",
      actuallyEvaluated: "形跡あり",
      evaluationDifficulty: "低",
      auditQuestion: "鉄道動員の優位性とシャスポー銃の脅威を正しく見積もっていたか？",
      counterPoint: "フランス軍の戦術的脅威を完全に無効化できたわけではない",
      evidenceBasis: "参謀本部（モルトケ）による緻密な動員計画が存在する一方、戦闘現場ではフランス軍の新兵器による予想以上の損害も発生した。",
      linkedCells: ["fpwp_cell_mobilization_advantage"],
      linkedAssumptions: [],
      linkedEvidenceLinks: ["FPWP-EL-005", "FPWP-EL-006"],
      statusOverride: { provisional: true, value: "軽度", rationale: "計画段階での評価形跡が明白なため暫定" }
    },
    {
      id: "fpwp_pw_south_german_integration",
      name: "南ドイツ諸邦の参戦と指揮権統合",
      category: "国内政治・同盟",
      exAnteEvaluability: "高",
      actuallyEvaluated: "形跡あり",
      evaluationDifficulty: "低",
      auditQuestion: "南ドイツの参戦と軍事統合は確実なものとして見積もられていたか？",
      counterPoint: "世論の動向次第で離反リスクがあった",
      evidenceBasis: "1866年の秘密攻守同盟条約により法的・軍事的な担保は存在したが、エムス電報によるナショナリズム喚起がなければ政治的な不確実性は残っていた。",
      linkedCells: ["fpwp_cell_south_german_alliance"],
      linkedAssumptions: [],
      linkedEvidenceLinks: ["FPWP-EL-007", "FPWP-EL-008"],
      statusOverride: { provisional: true, value: "要検証", rationale: "世論依存の側面を精査する必要があるため暫定" }
    }
  ],

  hypothesisTracking: [],

  assessmentCells: [
    {
      id: "fpwp_cell_provocation_diplomacy",
      axis: "外交リスク管理",
      phase: "開戦危機と外交的挑発",
      status: "軽度",
      impact: "高",
      evidenceStrength: "高",
      opinion: "ビスマルクはエムス電報等を通じて意図的に危機をエスカレートさせたが、同時に他大国の不介入を担保しており、ギャンブルではなく計算されたリスクテイクであったと評価できる。",
      criteria: ["フランスの過剰反応を正確に予測し、かつ第三国の介入を阻止する外交的裏付けがあったか"],
      changeConditions: ["当時の外交書簡で、介入リスクへの過小評価や盲信が見つかった場合"]
    },
    {
      id: "fpwp_cell_mobilization_advantage",
      axis: "軍事的勝算の担保",
      phase: "動員と初期侵攻",
      status: "軽度",
      impact: "高",
      evidenceStrength: "高",
      opinion: "モルトケの動員計画により、開戦時点で戦力集中における不可逆な優位性を確保していた。",
      criteria: ["鉄道網を活用した動員速度の差が、事前の計画段階で正確に算定されていたか"],
      changeConditions: ["戦闘初期の混乱が想定外のものであり、計画の欠陥を示す資料が見つかった場合"]
    },
    {
      id: "fpwp_cell_south_german_alliance",
      axis: "国内統合・同盟結束",
      phase: "開戦危機と外交的挑発",
      status: "要検証",
      impact: "中",
      evidenceStrength: "中",
      opinion: "南ドイツの参戦は条約により担保されていたが、実際の世論の熱狂は事後的に確認された要素であり、開戦判断時点での「政治的な確実性」には検証の余地がある。",
      criteria: ["秘密条約だけでなく、南ドイツ世論の親プロイセン化を開戦前に確信できる材料があったか"],
      changeConditions: ["開戦直前まで南ドイツの離反を強く懸念していた内部資料が確認された場合"]
    },
    {
      id: "fpwp_cell_siege_escalation",
      axis: "戦争長期化リスク",
      phase: "セダンとパリ包囲",
      status: "要検証",
      impact: "高",
      evidenceStrength: "中〜強",
      opinion: "モルトケの作戦設計は会戦による主力撃滅（Vernichtungsschlacht）を志向しており、セダン後の共和政樹立・国民戦争・約4か月のパリ包囲という長期化局面を主眼に置いていなかった疑いがある。この会戦中心の射程は、長期化という結果（ex-post）ではなく1868-69展開計画そのもの（FPWP-E-002）から ex-ante に読め、支持側の接地が結果依存を脱した。一方で、プロイセンは砲撃の是非をめぐる首脳対立を経つつも包囲を遂行・講和を強制しており、長期化は制御不能な破綻には至らなかった。支持・反証は両建てのままで、事前計画が長期化を織り込んでいたか（規範的に織り込むべきだったか）は引き続き要検証。",
      criteria: ["会戦的勝利の後に生じうる長期国民戦争・包囲戦を開戦前に想定し、兵站と外交的カバーを準備していたか"],
      changeConditions: ["開戦前の作戦計画に長期化・占領統治の想定が含まれていたことを示す一次資料が確認された場合"]
    },
    {
      id: "fpwp_cell_annexation_cost",
      axis: "戦後体制の設計と長期的安全保障リスク",
      phase: "ドイツ帝国樹立と講和",
      status: "要検証",
      impact: "高",
      evidenceStrength: "中〜強",
      opinion: "アルザス・ロレーヌ併合は軍部（モルトケ）の戦略的要塞確保要求に強く主導され、フランス国民議会のボルドー抗議（1871/3/1）に加えドイツ国内の同時代反対論（社会民主主義者の帝国議会反対など）と、対仏敵対固定化の警告が講和時点で既に複数方面に存在した（＝コストは当時から可視）。ビスマルクは併合の長期的危険を認識し限定的要求や戦後の対仏孤立外交でコストを管理しようとした形跡もあるが、回顧録依拠で事後正当化を含みうる。第一次大戦等の後年の帰結（ex-post）は本監査の射程外とし、ここでは『講和時点で可視だったコストをどこまで衡量したか』に限定して要検証とする。",
      criteria: ["領土併合がもたらす対仏敵対の長期コストを、講和時点で利用可能だった同時代の警告・反対に照らして比較検討した形跡があるか"],
      changeConditions: ["併合の範囲・是非をめぐる開戦前〜講和時点の内部審議記録が確認された場合"]
    }
  ],

  evidence: [
    {
      id: "FPWP-E-001",
      title: "エムス電報（1870年7月）",
      source: "ビスマルクによる原電報の意図的編集と公表（1870/7/13-14）",
      type: "公開資料",
      publishedDate: "1870",
      coveragePeriod: "1870",
      authenticity: "高",
      interpretiveReliability: "中",
      collectionState: "収集済み"
    },
    {
      id: "FPWP-E-002",
      title: "モルトケの対仏展開計画（Aufmarsch directives 1868-69年）",
      source: "プロイセン参謀本部の鉄道動員計画および部隊集中に関する事前策定文書",
      type: "公開資料",
      publishedDate: "1868",
      coveragePeriod: "1868-1870",
      authenticity: "高",
      interpretiveReliability: "高",
      collectionState: "収集済み"
    },
    {
      id: "FPWP-E-003",
      title: "南ドイツ諸邦との秘密攻守同盟条約（1866年締結）",
      source: "普墺戦争後にバイエルン等と結ばれた、有事の軍事指揮権統合を定めた秘密条約",
      type: "公開資料",
      publishedDate: "1866",
      coveragePeriod: "1866-1870",
      authenticity: "高",
      interpretiveReliability: "高",
      collectionState: "収集済み"
    },
    {
      id: "FPWP-E-004",
      title: "ロシア不介入に関する開戦前外交書簡（1870年）",
      source: "ロシア中立確保への感触を分析したビスマルクの内部通信",
      type: "公開資料",
      publishedDate: "1870",
      coveragePeriod: "1870",
      authenticity: "高",
      interpretiveReliability: "中",
      collectionState: "要検証"
    },
    {
      id: "FPWP-E-005",
      title: "ビスマルク回顧録『思考と思い出』",
      source: "Otto von Bismarck, Gedanken und Erinnerungen (1898)",
      type: "公開資料",
      publishedDate: "1898",
      coveragePeriod: "1870",
      authenticity: "高",
      interpretiveReliability: "低",
      collectionState: "要検証"
    },
    {
      id: "FPWP-E-006",
      title: "フランス新兵器（シャスポー銃）の脅威に関する事前報告",
      source: "プロイセン軍内部の観戦武官や情報網からのフランス軍歩兵火器の優位性に関する報告",
      type: "公開資料",
      publishedDate: "1869",
      coveragePeriod: "1869-1870",
      authenticity: "中",
      interpretiveReliability: "中",
      collectionState: "要検証"
    },
    {
      id: "FPWP-E-007",
      title: "南ドイツにおける親仏・反プロイセン世論に関する同時代報告",
      source: "開戦前のバイエルン等における親仏的世論や同盟離反の懸念を伝える外交官の通信記録",
      type: "公開資料",
      publishedDate: "1870",
      coveragePeriod: "1870",
      authenticity: "高",
      interpretiveReliability: "高",
      collectionState: "要検証"
    },
    {
      id: "FPWP-E-008",
      title: "ヴィルヘルム1世の開戦回避努力を示す同時代書簡",
      source: "エムスにおけるフランス大使との交渉時における、プロイセン国王の妥協・戦争回避の意思を示す手紙",
      type: "公開資料",
      publishedDate: "1870",
      coveragePeriod: "1870",
      authenticity: "高",
      interpretiveReliability: "高",
      collectionState: "収集済み"
    },
    {
      id: "FPWP-E-009",
      title: "オーストリア介入を危惧する開戦前外交通信",
      source: "フランスとオーストリアの提携可能性や、戦争長期化時の介入リスクを懸念する当時の外交文書",
      type: "公開資料",
      publishedDate: "1870",
      coveragePeriod: "1870",
      authenticity: "高",
      interpretiveReliability: "高",
      collectionState: "収集済み"
    },
    {
      id: "FPWP-E-010",
      title: "国民防衛政府の樹立と抗戦継続・パリ包囲",
      source: "1870年9月4日のフランス国民防衛政府（第三共和政）成立と抗戦継続、パリ包囲（1870/9/19–1871/1/28）に関する同時代の軍・外交記録",
      type: "公開資料",
      publishedDate: "1870",
      coveragePeriod: "1870-1871",
      authenticity: "高",
      interpretiveReliability: "高",
      collectionState: "収集済み"
    },
    {
      id: "FPWP-E-011",
      title: "モルトケ＝ビスマルクのパリ砲撃をめぐる対立",
      source: "1870年末、パリ早期砲撃の是非をめぐる首相ビスマルクと参謀総長モルトケの方針対立（砲撃開始 1871/1/5）に関する同時代の大本営記録・往復書簡",
      type: "公開資料",
      publishedDate: "1870",
      coveragePeriod: "1870-1871",
      authenticity: "高",
      interpretiveReliability: "中",
      collectionState: "要検証"
    },
    {
      id: "FPWP-E-012",
      title: "アルザス・ロレーヌ併合をめぐる軍部要求と同時代の反対・警告",
      source: "メス・ストラスブール要塞の戦略的確保を求めた軍部（モルトケ）の併合要求、フランス国民議会のボルドー抗議（1871/3/1）、フランクフルト講和条約（1871/5/10）に関する同時代記録",
      type: "公開資料",
      publishedDate: "1871",
      coveragePeriod: "1871",
      authenticity: "高",
      interpretiveReliability: "中",
      collectionState: "要検証"
    },
    {
      id: "FPWP-E-013",
      title: "アルザス・ロレーヌ併合に対するドイツ国内の同時代の反対・警告",
      source: "1870–71年、併合が恒久的な対仏敵対を招くとするドイツ国内の反対論（社会民主労働党ベーベル／リープクネヒトの帝国議会での反対表明など）および同時代の論評",
      type: "公開資料",
      publishedDate: "1871",
      coveragePeriod: "1870-1871",
      authenticity: "高",
      interpretiveReliability: "中",
      collectionState: "要検証"
    }
  ],

  claims: [
    {
      id: "fpwp_claim_diplomatic_provocation_calculated",
      text: "開戦の外交的危機（エムス電報）はビスマルクによって計算された誘導であった",
      type: "counter_claim"
    },
    {
      id: "fpwp_claim_isolation_secured",
      text: "プロイセンは開戦前にフランスの外交的孤立（露墺の不介入）を担保していた",
      type: "counter_claim"
    },
    {
      id: "fpwp_claim_military_superiority_planned",
      text: "プロイセンの動員優位性は事前の参謀本部計画で確実に見積もられていた",
      type: "counter_claim"
    },
    {
      id: "fpwp_claim_south_german_integration_secured",
      text: "南ドイツ諸邦の軍事統合は事前の条約で確実なものとなっていた",
      type: "counter_claim"
    },
    {
      id: "fpwp_claim_protracted_war_underestimated",
      text: "プロイセンはセダンでの会戦的勝利後に戦争が長期化（共和政の抗戦・国民戦争・パリ包囲）するリスクを事前に十分見積もっていなかった",
      type: "audit_issue"
    },
    {
      id: "fpwp_claim_annexation_cost_underweighed",
      text: "ドイツ側はアルザス・ロレーヌ併合がもたらす長期的な対仏敵対（復讐主義）のコストを講和判断時点で十分に比較衡量しなかった",
      type: "audit_issue"
    }
  ],

  evidenceLinks: [
    {
      id: "FPWP-EL-001",
      evidenceId: "FPWP-E-001",
      claimId: "fpwp_claim_diplomatic_provocation_calculated",
      assessmentCellId: "fpwp_cell_provocation_diplomacy",
      claimLabel: "外交的誘導",
      target: "計算されていた",
      relationship: "支持",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "ビスマルク自身の編集行為",
      canSay: "ビスマルクが意図的に電報を編集・公表し、フランス側の宣戦を誘発するようなナショナリズムの爆発を狙ったこと",
      cannotSay: "フランス側が必ず宣戦布告するという絶対的な保証があったこと",
      reviewState: "要検証"
    },
    {
      id: "FPWP-EL-002",
      evidenceId: "FPWP-E-008",
      claimId: "fpwp_claim_diplomatic_provocation_calculated",
      assessmentCellId: "fpwp_cell_provocation_diplomacy",
      claimLabel: "外交的誘導",
      target: "計算されていた",
      relationship: "反証",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "国王自身の同時代の書簡",
      canSay: "最高権力者であるヴィルヘルム1世自身が戦争を望んでおらず、妥協による危機回避を模索していたこと",
      cannotSay: "ビスマルクの独断専行のみで全てが決定されたこと",
      reviewState: "要検証"
    },
    {
      id: "FPWP-EL-003",
      evidenceId: "FPWP-E-004",
      claimId: "fpwp_claim_isolation_secured",
      assessmentCellId: "fpwp_cell_provocation_diplomacy",
      claimLabel: "他大国不介入",
      target: "担保されていた",
      relationship: "支持",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: false,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "ビスマルクの内部外交通信",
      canSay: "ロシアの中立約束などを開戦前に分析し、不介入の勝算を立てていたこと",
      cannotSay: "他大国が絶対に介入しないという100%の確約があったこと",
      reviewState: "要検証"
    },
    {
      id: "FPWP-EL-004",
      evidenceId: "FPWP-E-009",
      claimId: "fpwp_claim_isolation_secured",
      assessmentCellId: "fpwp_cell_provocation_diplomacy",
      claimLabel: "他大国不介入",
      target: "担保されていた",
      relationship: "反証",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: false,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "同時代の外交文書および内部通信",
      canSay: "オーストリアの参戦リスクや戦争長期化に伴う外交環境の悪化リスクが、当時の政策決定者によって懸念事項として共有されていたこと",
      cannotSay: "プロイセン中枢が介入リスクを完全に無視していたこと",
      reviewState: "要検証"
    },
    {
      id: "FPWP-EL-005",
      evidenceId: "FPWP-E-002",
      claimId: "fpwp_claim_military_superiority_planned",
      assessmentCellId: "fpwp_cell_mobilization_advantage",
      claimLabel: "動員優位性",
      target: "事前の計画",
      relationship: "支持",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: false,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "参謀本部の公式計画文書",
      canSay: "モルトケが1868-69年の段階で鉄道網を駆使した迅速な部隊集中計画を完成させており、優位性を確信していたこと",
      cannotSay: "現場レベルでの作戦指揮や摩擦までもがすべて計画通りに進んだこと",
      reviewState: "要検証"
    },
    {
      id: "FPWP-EL-006",
      evidenceId: "FPWP-E-006",
      claimId: "fpwp_claim_military_superiority_planned",
      assessmentCellId: "fpwp_cell_mobilization_advantage",
      claimLabel: "動員優位性",
      target: "事前の計画",
      relationship: "反証",
      relevance: "中",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: false,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "軍内部の情報収集報告",
      canSay: "フランス軍のシャスポー銃の性能など、戦術レベルでの脅威も事前に認識されており、被害増大の懸念が存在したこと",
      cannotSay: "その戦術的脅威が、戦略的・動員的優位を完全に覆す規模であると評価されていたこと",
      reviewState: "要検証"
    },
    {
      id: "FPWP-EL-007",
      evidenceId: "FPWP-E-003",
      claimId: "fpwp_claim_south_german_integration_secured",
      assessmentCellId: "fpwp_cell_south_german_alliance",
      claimLabel: "南ドイツ統合",
      target: "事前の担保",
      relationship: "支持",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "1866年締結の秘密攻守同盟条約の存在",
      canSay: "法的および軍事的指揮権の面では、南ドイツ諸邦がプロイセン側につく担保が開戦前から存在したこと",
      cannotSay: "政治的・世論的な離反リスクが完全に消滅していたこと",
      reviewState: "要検証"
    },
    {
      id: "FPWP-EL-008",
      evidenceId: "FPWP-E-007",
      claimId: "fpwp_claim_south_german_integration_secured",
      assessmentCellId: "fpwp_cell_south_german_alliance",
      claimLabel: "南ドイツ統合",
      target: "事前の担保",
      relationship: "反証",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: false,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "開戦前の外交報告や現地の情勢記録",
      canSay: "南ドイツ国内の親仏的・反プロイセン的な世論により、条約不履行や離反のリスクが当時の懸念として存在したこと",
      cannotSay: "南ドイツの参戦がプロイセンの強制のみによるものであったこと",
      reviewState: "要検証"
    },
    {
      id: "FPWP-EL-009",
      evidenceId: "FPWP-E-010",
      claimId: "fpwp_claim_protracted_war_underestimated",
      assessmentCellId: "fpwp_cell_siege_escalation",
      claimLabel: "戦争長期化リスク",
      target: "事前過小評価",
      relationship: "支持",
      relevance: "高",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: true,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "セダン後の長期化という結果からの逆算",
      canSay: "セダンでの主力撃滅後も戦争は終わらず、共和政の抗戦継続と約4か月のパリ包囲・国民戦争へ長期化したことが、会戦中心の作戦設計が長期化局面を主眼にしていなかったことを間接的に示すこと",
      cannotSay: "敵の政体転換と国民総動員による長期化が、開戦前に確実に予見・計画可能であったこと",
      reviewState: "要検証"
    },
    {
      id: "FPWP-EL-010",
      evidenceId: "FPWP-E-011",
      claimId: "fpwp_claim_protracted_war_underestimated",
      assessmentCellId: "fpwp_cell_siege_escalation",
      claimLabel: "戦争長期化リスク",
      target: "事前過小評価",
      relationship: "反証",
      relevance: "中",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "長期化局面における首脳間の方針対立の同時代記録",
      canSay: "長期化局面でも、ビスマルク＝モルトケは砲撃の是非をめぐる対立を経て包囲を遂行・講和を強制しており、長期化が制御不能な破綻には至らなかったこと",
      cannotSay: "その制御が、長期化を事前に織り込んだ計画に基づく結果であったこと",
      reviewState: "要検証"
    },
    {
      id: "FPWP-EL-011",
      evidenceId: "FPWP-E-012",
      claimId: "fpwp_claim_annexation_cost_underweighed",
      assessmentCellId: "fpwp_cell_annexation_cost",
      claimLabel: "併合の長期コスト",
      target: "過小衡量",
      relationship: "支持",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "1871年の軍部要求とフランス側の同時代抗議記録",
      canSay: "併合が軍部の戦略的要塞確保要求に強く主導され、フランス国民議会のボルドー抗議（1871/3/1）など対仏敵対固定化の警告が講和時点で既に同時代に存在したこと",
      cannotSay: "併合が第一次大戦など後年の帰結の直接原因であること（ex-post＝本監査の射程外）",
      reviewState: "要検証"
    },
    {
      id: "FPWP-EL-012",
      evidenceId: "FPWP-E-005",
      claimId: "fpwp_claim_annexation_cost_underweighed",
      assessmentCellId: "fpwp_cell_annexation_cost",
      claimLabel: "併合の長期コスト",
      target: "過小衡量",
      relationship: "反証",
      relevance: "中",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "ビスマルク回顧録（事後）",
      canSay: "ビスマルクは併合の長期的危険を認識し、より限定的な要求や戦後の対仏孤立外交でコストを管理しようとしたと主張しており、『全く衡量しなかった』わけではないこと",
      cannotSay: "回顧録は事後の自己正当化を含みうるため、講和時点での実際の衡量度合いをそのまま立証するものではないこと",
      reviewState: "要検証"
    },
    {
      id: "FPWP-EL-013",
      evidenceId: "FPWP-E-002",
      claimId: "fpwp_claim_protracted_war_underestimated",
      assessmentCellId: "fpwp_cell_siege_escalation",
      claimLabel: "戦争長期化リスク",
      target: "事前過小評価",
      relationship: "支持",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "参謀本部自身の事前展開計画（FPWP-E-002 を動員優位とは別側面＝戦争計画の時間的射程として参照）",
      canSay: "モルトケの1868-69年展開計画が会戦による主力撃滅を前提とし、政体崩壊後の長期占領・国民戦争への備えを欠いていたことが、結果（ex-post）ではなく事前計画そのものから ex-ante に読めること",
      cannotSay: "長期化を完全に予見し計画へ織り込むべきだったと規範的に断定できること",
      reviewState: "要検証"
    },
    {
      id: "FPWP-EL-014",
      evidenceId: "FPWP-E-013",
      claimId: "fpwp_claim_annexation_cost_underweighed",
      assessmentCellId: "fpwp_cell_annexation_cost",
      claimLabel: "併合の長期コスト",
      target: "過小衡量",
      relationship: "支持",
      relevance: "中",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "帝国議会など公開の場での同時代の反対表明",
      canSay: "併合が恒久的な対仏敵対を招くとの警告が、ドイツ国内（社会民主主義者の帝国議会反対論など）にも併合決定の同時代に存在し、コストが当時から指摘可能だったこと",
      cannotSay: "それらの警告が第一次大戦等の後年の具体的帰結を正確に予見したこと（ex-post＝本監査の射程外）",
      reviewState: "要検証"
    }
  ],

  ratingBasis: [
    {
      cellId: "fpwp_cell_provocation_diplomacy",
      weight: 1
    },
    {
      cellId: "fpwp_cell_mobilization_advantage",
      weight: 1
    },
    {
      cellId: "fpwp_cell_south_german_alliance",
      weight: 1
    },
    {
      cellId: "fpwp_cell_siege_escalation",
      weight: 1
    },
    {
      cellId: "fpwp_cell_annexation_cost",
      weight: 1
    }
  ]
};
