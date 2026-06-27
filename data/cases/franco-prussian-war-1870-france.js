export const francoPrussianWarFranceCase = {
  warCase: {
    id: "franco-prussian-war-1870-france",
    counterpartCaseId: "franco-prussian-war-1870-prussia",
    conflict: "普仏戦争 1870–71",
    name: "普仏戦争 1870–71：フランス第二帝政側",
    auditedActor: "フランス第二帝政・ナポレオン3世政権",
    opponentActor: "プロイセン王国・北ドイツ連邦・南ドイツ諸邦",
    scope: "開戦判断・動員見積もり・同盟見積もり・セダン前後の判断",
    primaryResponsibility: "動員能力・同盟環境・兵站/指揮統制・政権維持動機の見積もり責任",
    uncertainty: "中〜高",
    rating: "未確定",
    ratingNote: "格付けは未確定（skeleton 段階・編集判断として意図的に保留）。ratingBasis 各セルが証拠強度『中』以上になり、Pre-War が『不明』から『形跡あり/なし』へ解決された段階で格付けを行う。訴追側の一部が事後二次研究（Howard/Wawro）依存である点が暫定格付け保留の理由であり、未確定は一時的・証拠駆動である。"
  },

  overviewOpinion: "フランス第二帝政の開戦判断は、結果としてセダンでの大敗と政権崩壊を招いたため、事後的には極めて無謀に見える。しかし、本監査では「セダンの結果を知らなかった開戦前時点で、どこまで客観的劣勢が予見可能だったか」を検証する。プロイセンの動員速度や南ドイツ諸邦の参戦可能性についての見積もり甘さは指摘される一方、当時の兵器優位（シャスポー銃など）への自信や、開戦前の不確実性を考慮し、安易な後知恵バイアスを排除した評価を目指す。第三共和政によるパリ防衛および継戦の判断は別監査対象とし、本ケースでは対象外とする。",

  issues: [
    { name: "プロイセン軍の動員速度と戦力集中の過小評価", status: "重大懸念" },
    { name: "南ドイツ諸邦の参戦可能性の誤認", status: "要注意" },
    { name: "自国の動員混乱と兵站・指揮統制システムの未整備", status: "重大懸念" },
    { name: "国内政治危機と政権維持による判断の歪み", status: "重大懸念" },
    { name: "セダンへの進軍強行（軍事的後退を政治的理由で覆した判断）", status: "重大懸念" }
  ],

  counterHypotheses: [
    "開戦前時点では、プロイセン側の総合的な優位性は戦後言われるほど明白ではなく、フランス側には一定の合理的な自信（兵器の質など）があった。",
    "南ドイツ諸邦の行動は開戦前には確定しておらず、外交的誤認は当時の情報制約下では不可避な側面があった。",
    "国内政治危機が開戦判断の一因であったとしても、それが唯一・決定的な要因とは限らない。",
    "バゼーヌ救援の強行には、メスに包囲された大軍を解放するという軍事的論拠も存在し、純粋に政治的な無謀とまでは断定できない。"
  ],

  phases: [
    {
      id: "war_crisis_declaration",
      name: "開戦危機・宣戦判断",
      mainIssue: "プロイセン能力とドイツ結束の見積もり",
      decision: "対プロイセン宣戦布告",
      availableInfo: "エムス電報による挑発、南ドイツの動向",
      alternatives: ["外交的解決の模索", "動員のみの威嚇"],
      revisionRoom: "低",
      revisionNote: "世論の熱狂により後戻りが困難だった",
      auditQuestion: "外交的危機を意図的にエスカレートさせたか？",
      status: "重大懸念",
      assumptions: []
    },
    {
      id: "mobilization_initial_operations",
      name: "動員・初期作戦",
      mainIssue: "自国動員混乱と作戦準備不足",
      decision: "前線への部隊集結",
      availableInfo: "鉄道輸送の混乱状況",
      alternatives: ["防御陣地での待機", "計画の現実的な修正"],
      revisionRoom: "中",
      revisionNote: "初期の混乱を認識した時点で計画修正の余地はあった",
      auditQuestion: "動員の混乱を認識して作戦を変更したか？",
      status: "未定義",
      assumptions: []
    },
    {
      id: "pre_sedan_major_defeats",
      name: "主要敗北・セダン前判断",
      mainIssue: "方針修正と継戦可能性",
      decision: "国境付近での決戦継続",
      availableInfo: "初期戦闘での敗北、包囲の危機",
      alternatives: ["パリへの後退", "早期講和"],
      revisionRoom: "高",
      revisionNote: "軍事的には後退可能だったが政治的理由で決戦を強行した",
      auditQuestion: "敗北の現実を直視して方針を転換できたか？",
      status: "重大懸念",
      assumptions: []
    },
    {
      id: "sedan_and_regime_collapse",
      name: "セダン敗北・第二帝政崩壊後",
      mainIssue: "政権崩壊と継戦責任（第三共和政は対象外）",
      decision: "降伏",
      availableInfo: "完全な包囲と戦力喪失",
      alternatives: ["徹底抗戦（被害拡大）"],
      revisionRoom: "無",
      revisionNote: "ナポレオン3世捕虜化により選択肢喪失",
      auditQuestion: "政権崩壊は事前の無謀な判断の必然的な結果であったか？",
      status: "未定義",
      assumptions: []
    }
  ],

  preWarChecklist: [
    {
      id: "fpw_pw_prussian_mobilization",
      name: "プロイセン軍の動員速度と戦力集中能力",
      category: "戦略・動員",
      exAnteEvaluability: "中",
      actuallyEvaluated: "限定的",
      evaluationDifficulty: "中",
      auditQuestion: "プロイセンの動員速度を正確に見積もっていたか？",
      counterPoint: "当時の情報制約下では正確な見積もりは困難だった",
      evidenceBasis: "戦後の研究において見積もりの甘さが指摘されているが、開戦前時点での直接的な内部資料による検証が必要。",
      linkedCells: ["fpw_cell_mobilization_crisis"],
      linkedAssumptions: [],
      linkedEvidenceLinks: ["FPW-EL-001", "FPW-EL-002"],
      noEvidenceReason: null
    },
    {
      id: "fpw_pw_south_german_alignment",
      name: "南ドイツ諸邦の参戦可能性",
      category: "外交",
      exAnteEvaluability: "中",
      actuallyEvaluated: "限定的",
      evaluationDifficulty: "高",
      auditQuestion: "南ドイツ諸邦の参戦リスクを評価していたか？",
      counterPoint: "事前には不確実性があった",
      evidenceBasis: "エムス電報前後の危機エスカレーションの中で、プロイセン側のナショナリズム喚起を過小評価した可能性が高いが、事前には不確実性があった。",
      linkedCells: ["fpw_cell_diplomacy_crisis"],
      linkedAssumptions: [],
      linkedEvidenceLinks: ["FPW-EL-003", "FPW-EL-004"],
      noEvidenceReason: null
    },
    {
      id: "fpw_pw_french_mobilization",
      name: "自国の動員制度・兵站準備",
      category: "戦略・動員",
      exAnteEvaluability: "高",
      actuallyEvaluated: "形跡なし",
      evaluationDifficulty: "低",
      auditQuestion: "自国の鉄道輸送や補給の未整備を把握していたか？",
      counterPoint: "一定の自信はあった",
      evidenceBasis: "自国の鉄道輸送や補給の未整備は自国組織の問題であり評価可能性は高いが、事前評価の有無を確かめる一次資料（陸軍省の事前計画・兵站見積もり）が未収集のため、現段階では『形跡なし』とは断定できない。",
      linkedCells: ["fpw_cell_mobilization_crisis"],
      linkedAssumptions: [],
      linkedEvidenceLinks: ["FPW-EL-005", "FPW-EL-006"],
      noEvidenceReason: null
    },
    {
      id: "fpw_pw_system_gap",
      name: "参謀本部・電信・鉄道のシステム格差",
      category: "戦略・動員",
      exAnteEvaluability: "低",
      actuallyEvaluated: "形跡なし",
      evaluationDifficulty: "高",
      auditQuestion: "システム格差の認識を欠いていたか？",
      counterPoint: "当時は優位性が確立・認知されていなかった",
      evidenceBasis: "当時はプロイセン型参謀本部制度の優位性が現代ほど確立・認知されておらず、事前の評価可能性自体が低い。実際にどの程度認識していたかを示す一次資料は未収集。",
      linkedCells: ["fpw_cell_mobilization_crisis"],
      linkedAssumptions: [],
      linkedEvidenceLinks: ["FPW-EL-007", "FPW-EL-008"],
      noEvidenceReason: null
    },
    {
      id: "fpw_pw_regime_survival",
      name: "国内政治危機と政権維持動機",
      category: "国内政治",
      exAnteEvaluability: "高",
      actuallyEvaluated: "形跡あり",
      evaluationDifficulty: "中",
      auditQuestion: "政権維持目的が開戦判断を歪めたか？",
      counterPoint: "安全保障上の懸念も存在した",
      evidenceBasis: "ナポレオン3世政権の権威低下を補うための外交的勝利の必要性が認識されていたことを示す資料が存在する。",
      linkedCells: ["fpw_cell_regime_crisis"],
      linkedAssumptions: [],
      linkedEvidenceLinks: ["FPW-EL-009", "FPW-EL-010"],
      noEvidenceReason: null
    }
  ],

  hypothesisTracking: [],

  assessmentCells: [
    {
      id: "fpw_cell_mobilization_crisis",
      axis: "動員能力見積もり",
      phase: "開戦危機・宣戦判断",
      status: "重大懸念",
      impact: "高",
      evidenceStrength: "弱",
      opinion: "ル・ブフ陸軍大臣の議会答弁（FPW-E-005）等から、陸軍内部には『準備完了』という主観的な自信が存在したことが支持される。一方で、戦後の研究（FPW-E-001）が示す実際の動員混乱を、開戦前に客観的に予見できたかを示す一次資料の裏付けは弱く、判断当時の情報の非対称性を考慮すれば、プロイセンの動員速度を正確に見積もれていなかった重大な懸念が残る。",
      criteria: ["プロイセンの鉄道動員計画と、自国の常備軍・予備役体制の比較評価がなされていたか"],
      changeConditions: ["当時のフランス軍中枢による正確な事前見積もり資料が発見されれば懸念は緩和される"],
      noEvidenceReason: null
    },
    {
      id: "fpw_cell_diplomacy_crisis",
      axis: "同盟・外交環境見積もり",
      phase: "開戦危機・宣戦判断",
      status: "要注意",
      impact: "高",
      evidenceStrength: "中〜強",
      opinion: "1869–70年の対オーストリア・イタリア交渉の頓挫を示す外交記録（FPW-E-006）から、開戦時点でフランスが外交的に孤立しており、他大国の確約が得られていないことは当時の指導部にとって既知の事実（ex-ante）であった。戦後の研究（FPW-E-002）や回顧録（FPW-E-004b）には南ドイツ参戦リスクの不確実性が指摘されているが、確実な同盟の担保がないまま開戦に踏み切った外交判断には重大な懸念がある。",
      criteria: ["エムス電報によるナショナリズムの爆発を予測し、南ドイツの参戦リスクを評価していたか"],
      changeConditions: ["南ドイツ諸邦の行動が予測不可能であったことを示す当時の外交記録が確認されれば緩和される"],
      noEvidenceReason: null
    },
    {
      id: "fpw_cell_regime_crisis",
      axis: "政権存続リスク",
      phase: "開戦危機・宣戦判断",
      status: "重大懸念",
      impact: "高",
      evidenceStrength: "中〜強",
      opinion: "グラモン外相からの追加保証要求（FPW-E-008）等から、ナポレオン3世政権の権威低下を補うための外交的勝利（面子の政治）が危機をエスカレートさせたことが支持される。同時代の議会記録（FPW-E-004a）によれば安全保障上の主戦論も存在したが、体制維持の動機が客観的な軍事・外交バランスの評価を歪めた可能性が高い。",
      criteria: ["敗北時の政権崩壊リスク（セダンの結末）が事前にどこまで認識されていたか"],
      changeConditions: ["純粋な安全保障上の理由から開戦が不可避であったとする同時代記録が優越する場合"],
      noEvidenceReason: null
    },
    {
      id: "fpw_cell_sedan_decision",
      axis: "政権存続リスク",
      phase: "主要敗北・セダン前判断",
      status: "重大懸念",
      impact: "高",
      evidenceStrength: "中〜強",
      opinion: "パリカオ伯爵からマクマオン将軍への進軍命令電報（FPW-E-007）から、軍事的にはパリへの後退が合理的だった局面で、摂政政府が『パリ放棄は革命を招く』との政権維持上の理由によりバゼーヌ救援を強行させたことが直接（ex-ante）支持される。戦後の研究（FPW-E-001）による軍事的擁護論もあるが、前線指揮官の懸念を押し切って政治動機でセダンへ向かわせた責任の所在は明らかである。",
      criteria: ["パリ後退という軍事的選択肢を、政権維持上の理由がどの程度覆したか", "前線指揮官の軍事的反対が同時代に表明されていたか"],
      changeConditions: ["バゼーヌ救援に十分な軍事的勝算・合理があったことを示す同時代の作戦評価が優越する場合"],
      noEvidenceReason: null
    }
  ],

  evidence: [
    {
      id: "FPW-E-001",
      title: "Michael Howard, The Franco-Prussian War",
      source: "Michael Howard, The Franco-Prussian War: The German Invasion of France, 1870–1871 (Rupert Hart-Davis, 1961 / Routledge reprint ISBN: 978-0415266710 等)",
      type: "公開資料",
      publishedDate: "1961",
      coveragePeriod: "1870-1871",
      authenticity: "高",
      interpretiveReliability: "高",
      collectionState: "収集済み"
    },
    {
      id: "FPW-E-002",
      title: "Geoffrey Wawro, The Franco-Prussian War",
      source: "Geoffrey Wawro, The Franco-Prussian War: The German Conquest of France in 1870–1871 (Cambridge University Press, 2003, ISBN: 978-0521584364)",
      type: "公開資料",
      publishedDate: "2003",
      coveragePeriod: "1870-1871",
      authenticity: "高",
      interpretiveReliability: "高",
      collectionState: "収集済み"
    },
    {
      id: "FPW-E-003",
      title: "エムス電報および関連外交文書",
      source: "当時のビスマルクによる電報編集の経緯（ビスマルク回顧録『Gedanken und Erinnerungen』(1898) 第2巻「Die Emser Depesche」の章）、および当時の『Journal officiel』等を通じたフランス国内への公表記録。Internet Archive / Gallica等で所蔵確認",
      type: "同時代公開資料",
      publishedDate: "1870",
      coveragePeriod: "1870",
      authenticity: "高",
      interpretiveReliability: "中",
      collectionState: "収集済み"
    },
    {
      id: "FPW-E-004a",
      title: "1870年7月 第二帝政議会記録",
      source: "1870年7月15日および20日の立法院 (Corps législatif) における開戦論議の記録。『Annales du Sénat et du Corps législatif』(1870年巻) および『Journal officiel de l'Empire français』。Gallicaにてデジタル所蔵確認",
      type: "議会記録",
      publishedDate: "1870",
      coveragePeriod: "1870",
      authenticity: "高",
      interpretiveReliability: "高",
      collectionState: "収集済み"
    },
    {
      id: "FPW-E-004b",
      title: "エミール・オリヴィエ回顧録",
      source: "Émile Ollivier, 『L'Empire libéral』 第14巻 (La guerre) (Garnier frères, 1909)。1870年7月15日の議会での「軽い心で (d'un cœur léger)」発言等を含む。Gallica / Internet Archive等でデジタル所蔵確認",
      type: "回顧録",
      publishedDate: "1895",
      coveragePeriod: "1870",
      authenticity: "高",
      interpretiveReliability: "低",
      collectionState: "収集済み"
    },
    {
      id: "FPW-E-005",
      title: "ル・ブフ陸軍大臣の議会答弁および陸軍省事前計画書",
      source: "1870年7月15日の立法院 (Corps législatif) におけるル・ブフ陸軍大臣の答弁（「ゲートルボタン一つ欠けていない」等）。当時の『Journal officiel de l'Empire français』や議会記録『Annales du Sénat et du Corps législatif』(1870年巻) に収録。Gallicaにて所蔵確認",
      type: "公刊一次資料",
      publishedDate: "1870",
      coveragePeriod: "1870",
      authenticity: "高",
      interpretiveReliability: "中",
      collectionState: "収集済み"
    },
    {
      id: "FPW-E-006",
      title: "フランスの開戦前同盟外交の失敗と外交的孤立",
      source: "1869年の三国同盟（仏・墺・伊）交渉の不成立を示す書簡群（ローマ駐留問題に関するイタリアの条件提示とナポレオン3世の拒絶）。『Les origines diplomatiques de la guerre de 1870-1871』(フランス外務省編, 1910-1932, 全29巻) 等に開戦前の外交交渉記録として収録。HathiTrust / Internet Archive 等でデジタル所蔵を確認",
      type: "公刊一次資料",
      publishedDate: "1870",
      coveragePeriod: "1869-1870",
      authenticity: "高",
      interpretiveReliability: "中",
      collectionState: "収集済み"
    },
    {
      id: "FPW-E-007",
      title: "バゼーヌ救援強行命令をめぐる政府＝前線の往復電報（1870年8月下旬）",
      source: "1870年8月下旬、パリカオ伯爵（摂政政府）からマクマオン将軍への進軍命令電報（「もしバゼーヌを見捨ててパリへ退却すれば、パリに革命が起こるだろう」等の内容）。『Enquête parlementaire sur les actes du gouvernement de la Défense nationale』 Tome II: Dépêches télégraphiques officielles (Cerf et fils, 1875, p. 148 近辺) 等に同時代記録として収録。Gallica / Internet Archive 等で所蔵確認",
      type: "公刊一次資料",
      publishedDate: "1870",
      coveragePeriod: "1870",
      authenticity: "高",
      interpretiveReliability: "中",
      collectionState: "収集済み"
    },
    {
      id: "FPW-E-008",
      title: "グラモン外相の追加保証要求と1870年7月の開戦決定",
      source: "1870年7月12日19時発のグラモン外相から駐普大使ベネデッティ宛の訓令電報（「王が将来の不再候補を保証すること」を要求）。ベネデッティ著『Ma mission en Prusse』(Plon, 1871, pp. 372-374) に原記録として収録。Internet Archive 所蔵 (Identifier: mamissionenpruss00beneuoft)",
      type: "公刊一次資料",
      publishedDate: "1870",
      coveragePeriod: "1870",
      authenticity: "高",
      interpretiveReliability: "中",
      collectionState: "収集済み"
    }
  ],

  claims: [
    {
      id: "fpw_claim_prussian_mobilization_underestimated",
      text: "フランス第二帝政はプロイセン側の動員速度と戦力集中能力を過小評価した",
      type: "audit_issue"
    },
    {
      id: "fpw_claim_south_german_alignment_misread",
      text: "フランス第二帝政は南ドイツ諸邦のプロイセン側参戦可能性を誤認した",
      type: "audit_issue"
    },
    {
      id: "fpw_claim_french_mobilization_disorder_underestimated",
      text: "フランス第二帝政は自国の動員混乱と準備不足を事前評価しなかった",
      type: "audit_issue"
    },
    {
      id: "fpw_claim_system_gap_underestimated",
      text: "フランス第二帝政は参謀本部制度などのシステム格差の認識を欠いていた",
      type: "audit_issue"
    },
    {
      id: "fpw_claim_regime_survival_bias",
      text: "フランス第二帝政の開戦判断は政権維持目的によって歪められた",
      type: "audit_issue"
    },
    {
      id: "fpw_claim_sedan_march_political",
      text: "フランス政府はパリ後退という軍事的合理に反し、政権維持上の理由からバゼーヌ救援を強行させ、セダンでの包囲・降伏を招いた",
      type: "audit_issue"
    }
  ],

  evidenceLinks: [
    {
      id: "FPW-EL-001",
      evidenceId: "FPW-E-001",
      claimId: "fpw_claim_prussian_mobilization_underestimated",
      assessmentCellId: "fpw_cell_mobilization_crisis",
      claimLabel: "プロイセン動員速度",
      target: "過小評価",
      relationship: "支持",
      relevance: "高",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: true,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "戦後の研究(Howard)による構造整理であり、当時の直接認識を示すものではない",
      canSay: "戦後の分析として、フランス側がプロイセンの動員力を過小評価していたという評価が存在すること",
      cannotSay: "開戦前時点で客観的にプロイセンの優位が立証されており、フランス中枢がそれを意図的に無視したこと",
      reviewState: "確認済"
    },
    {
      id: "FPW-EL-002",
      evidenceId: "FPW-E-005",
      claimId: "fpw_claim_prussian_mobilization_underestimated",
      assessmentCellId: "fpw_cell_mobilization_crisis",
      claimLabel: "プロイセン動員速度",
      target: "過小評価",
      relationship: "反証",
      relevance: "中",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: false,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "陸軍大臣自身の発言および内部計画書",
      canSay: "ル・ブフ陸軍大臣が『準備完了』と豪語するなど、陸軍内部には客観的あるいは主観的な自信が存在したこと",
      cannotSay: "その自信がプロイセンの実際の動員速度を正確に見積もった上での合理的なものであったこと",
      reviewState: "確認済"
    },
    {
      id: "FPW-EL-003",
      evidenceId: "FPW-E-002",
      claimId: "fpw_claim_south_german_alignment_misread",
      assessmentCellId: "fpw_cell_diplomacy_crisis",
      claimLabel: "南ドイツ参戦誤認",
      target: "過小評価",
      relationship: "支持",
      relevance: "高",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: true,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "戦後の研究(Wawro)による整理",
      canSay: "結果として南ドイツ諸邦が参戦し、フランスの外交的孤立が致命的となったこと",
      cannotSay: "開戦前時点で南ドイツの参戦が不可避であると事前に確定していたこと",
      reviewState: "確認済"
    },
    {
      id: "FPW-EL-004",
      evidenceId: "FPW-E-004b",
      claimId: "fpw_claim_south_german_alignment_misread",
      assessmentCellId: "fpw_cell_diplomacy_crisis",
      claimLabel: "南ドイツ参戦誤認",
      target: "過小評価",
      relationship: "反証",
      relevance: "中",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: true,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "当時の政権担当者(Ollivier)による戦後の回顧録",
      canSay: "戦後のオリヴィエ回顧録によれば、フランス側には南ドイツの反発を期待する合理的な余地があったと主張されていること",
      cannotSay: "回顧録の記述が事後の自己正当化を含まない同時代の客観的事実であること",
      reviewState: "確認済"
    },
    {
      id: "FPW-EL-005",
      evidenceId: "FPW-E-001",
      claimId: "fpw_claim_french_mobilization_disorder_underestimated",
      assessmentCellId: "fpw_cell_mobilization_crisis",
      claimLabel: "自国の動員混乱",
      target: "事前評価しなかった",
      relationship: "支持",
      relevance: "高",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: true,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "戦後の研究(Howard)",
      canSay: "フランスの動員システムが実際に大きな混乱を招いたこと",
      cannotSay: "それが事前に明確に予測されていたこと",
      reviewState: "確認済"
    },
    {
      id: "FPW-EL-006",
      evidenceId: "FPW-E-005",
      claimId: "fpw_claim_french_mobilization_disorder_underestimated",
      assessmentCellId: "fpw_cell_mobilization_crisis",
      claimLabel: "自国の動員混乱",
      target: "事前評価しなかった",
      relationship: "反証",
      relevance: "中",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: false,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "ル・ブフ陸軍大臣の議会答弁",
      canSay: "陸軍大臣の答弁が示す通り、最高首脳部に対しては兵站・動員の準備が完全に整っていると公式に報告されていたこと",
      cannotSay: "客観的な兵站データに基づく合理的な報告であったこと",
      reviewState: "確認済"
    },
    {
      id: "FPW-EL-007",
      evidenceId: "FPW-E-002",
      claimId: "fpw_claim_system_gap_underestimated",
      assessmentCellId: "fpw_cell_mobilization_crisis",
      claimLabel: "システム格差",
      target: "認識欠如",
      relationship: "支持",
      relevance: "高",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: true,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "戦後の研究(Wawro)",
      canSay: "プロイセン参謀本部制度や分散進撃・包囲戦術の優位性が結果的に証明されたこと",
      cannotSay: "その優位性が1870年当時、他国にも明白な「常識」であったこと",
      reviewState: "確認済"
    },
    {
      id: "FPW-EL-008",
      evidenceId: "FPW-E-005",
      claimId: "fpw_claim_system_gap_underestimated",
      assessmentCellId: "fpw_cell_mobilization_crisis",
      claimLabel: "システム格差",
      target: "認識欠如",
      relationship: "反証",
      relevance: "中",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: false,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "フランス陸軍の装備優位に関する事前計画",
      canSay: "シャスポー銃などの装備的優位性を根拠に、作戦面での独自の自信が存在したことが当時の計画からうかがえること",
      cannotSay: "それが参謀本部制度のシステム格差を相殺しうるものだと合理的に評価されていたこと",
      reviewState: "確認済"
    },
    {
      id: "FPW-EL-009",
      evidenceId: "FPW-E-003",
      claimId: "fpw_claim_regime_survival_bias",
      assessmentCellId: "fpw_cell_regime_crisis",
      claimLabel: "政権維持バイアス",
      target: "歪められた",
      relationship: "支持",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "エムス電報と国内世論の沸騰",
      canSay: "エムス電報による危機的状況下で、国内の熱狂や面子政治が開戦判断を強く後押ししたこと",
      cannotSay: "開戦の動機が国内政治的理由のみであり、客観的な安全保障上の懸念が一切存在しなかったこと",
      reviewState: "確認済"
    },
    {
      id: "FPW-EL-010",
      evidenceId: "FPW-E-004a",
      claimId: "fpw_claim_regime_survival_bias",
      assessmentCellId: "fpw_cell_regime_crisis",
      claimLabel: "政権維持バイアス",
      target: "歪められた",
      relationship: "反証",
      relevance: "中",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "1870年7月の議会記録",
      canSay: "同時代の議会記録によれば、純粋な国益や安全保障（プロイセンの過度な膨張への恐怖）に基づく主戦論も強く展開されていたこと",
      cannotSay: "その主張が純粋な軍事評価のみに裏付けられたものであったこと",
      reviewState: "確認済"
    },
    {
      id: "FPW-EL-011",
      evidenceId: "FPW-E-006",
      claimId: "fpw_claim_south_german_alignment_misread",
      assessmentCellId: "fpw_cell_diplomacy_crisis",
      claimLabel: "外交環境誤認",
      target: "過小評価",
      relationship: "支持",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "開戦前の同盟交渉の経緯はフランス指導部自身が当事者として把握",
      canSay: "フランスは開戦時点で同盟交渉に失敗し、いずれの大国の確約も得られないまま外交的に孤立していたこと（南ドイツの離反に加え、大国支援の不在は開戦前に既知の外交環境だった）",
      cannotSay: "この孤立が指導部によって正しくリスクとして織り込まれていたか、あるいは既知の事実を軽視したかの断定",
      reviewState: "確認済"
    },
    {
      id: "FPW-EL-012",
      evidenceId: "FPW-E-007",
      claimId: "fpw_claim_sedan_march_political",
      assessmentCellId: "fpw_cell_sedan_decision",
      claimLabel: "セダン進軍の政治性",
      target: "政治的理由で強行",
      relationship: "支持",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "摂政政府と前線指揮官の間の同時代の電報",
      canSay: "軍事的後退案を退け、政権維持上の理由からバゼーヌ救援を命じた政府電報が同時代に存在し、その結果マクマオン軍がセダンで包囲・降伏に至ったこと",
      cannotSay: "パリへ後退していれば第二帝政が確実に延命できた、あるいはセダンの結末が完全に回避できたこと",
      reviewState: "確認済"
    },
    {
      id: "FPW-EL-013",
      evidenceId: "FPW-E-001",
      claimId: "fpw_claim_sedan_march_political",
      assessmentCellId: "fpw_cell_sedan_decision",
      claimLabel: "セダン進軍の政治性",
      target: "政治的理由で強行",
      relationship: "反証",
      relevance: "中",
      timeFit: "間接",
      availableAtDecisionTime: false,
      availableToAnalysts: true,
      knownByDecisionMakers: "不明",
      knownByDecisionMakersBasis: "戦後の研究(Howard)による軍事的状況の整理",
      canSay: "メスに包囲されたバゼーヌの大軍（約15万）の解放には軍事的論拠もあり、当時のフランス軍の状況は後退しても既に深刻であったこと",
      cannotSay: "ゆえにバゼーヌ救援の強行が政権維持動機を含まない純粋な軍事的合理判断であったこと",
      reviewState: "確認済"
    },
    {
      id: "FPW-EL-014",
      evidenceId: "FPW-E-008",
      claimId: "fpw_claim_regime_survival_bias",
      assessmentCellId: "fpw_cell_regime_crisis",
      claimLabel: "政権維持バイアス",
      target: "歪められた",
      relationship: "支持",
      relevance: "高",
      timeFit: "直接",
      availableAtDecisionTime: true,
      availableToAnalysts: true,
      knownByDecisionMakers: "明白",
      knownByDecisionMakersBasis: "1870年7月の外交・議会記録",
      canSay: "ホーエンツォレルン候補が撤回された後もグラモン外相が将来の不再候補の保証を要求し、閣議・宮廷が開戦へ傾いた経緯が同時代記録にあり、危機の不必要なエスカレーションを示すこと",
      cannotSay: "そのエスカレーションが純粋に政権維持目的のみによるもので、安全保障上の懸念が一切なかったこと",
      reviewState: "確認済"
    }
  ],

  ratingBasis: [
    {
      cellId: "fpw_cell_mobilization_crisis",
      weight: 2
    },
    {
      cellId: "fpw_cell_diplomacy_crisis",
      weight: 2
    },
    {
      cellId: "fpw_cell_regime_crisis",
      weight: 2
    },
    {
      cellId: "fpw_cell_sedan_decision",
      weight: 3
    }
  ]
};
