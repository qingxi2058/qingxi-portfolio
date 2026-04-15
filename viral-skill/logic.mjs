export const VIRAL_MODES = {
  xhs: {
    label: "小红书图文",
    description: "适合收藏型图文，重点是结果前置、结构干净、最后一句顺手把收藏动作带出来。",
    promise: "先把结果亮出来，再把用户会照抄的句子放进去。",
    snapshot: "更适合讲“这件事具体帮谁解决什么问题”，而不是先铺故事。",
    freshFindings: [
      "封面先写结果，再补原因，收藏感比先讲经历更稳。",
      "一条图文最好只保留 3 个动作，太满反而像说教。",
      "最后一句提醒用户“下次做到这里回来翻”，更容易顺手收藏。",
    ],
    titleTemplates: [
      "{{topic}}，先别急着发，收藏率更高的一版这样写",
      "想把{{topic}}做成一条会被收藏的内容，先用这套骨架",
      "{{topic}}真正适合发成图文的，不是观点多，而是这版结构更顺",
    ],
    stepTemplates: [
      "封面先写结果：一句话说清 {{topic}} 这条能帮谁省下哪一步。",
      "正文只保留 3 段：误区 / 做法 / 可直接照抄的一句示例。",
      "最后补一句收藏理由，让用户知道下次做到 {{topic}} 时为什么还会回来翻。",
    ],
    deliveryTips: [
      "建议做成 6 到 8 屏图文：封面讲结果，中间拆步骤，最后一屏放收藏提醒。",
      "适合做高收藏图文：第一屏抓结果，第二屏给误区，后面才给动作。",
      "别把每一屏都写满。封面抓结果，中间给步骤，最后一屏只做收口。",
    ],
    bestMoments: [
      "适合在你刚拆完一个可复制方法、想发收藏型内容的时候用。",
      "适合已经有明确方法，但还没把它翻成图文结构的时候用。",
      "适合你想让人先收藏，再慢慢回看执行的时候用。",
    ],
  },
  video: {
    label: "短视频口播",
    description: "适合口播和短视频，重点是前 3 秒先打断，再给反差和连续动作，不要一上来就平铺直叙。",
    promise: "先把第一句和停留点掐准，再决定后面讲多少。",
    snapshot: "更适合“先戳错，再给改法”的口播结构，别先自我介绍。",
    freshFindings: [
      "前 3 秒先打断观众惯性，比一上来抛结论更容易留下人。",
      "口播里最忌讳一次说完，反差句和动作句要分开丢出来。",
      "结尾别总结太满，留一句追问，评论区会更自然开起来。",
    ],
    titleTemplates: [
      "如果你想讲{{topic}}，前 3 秒别直接上方法",
      "{{topic}}想拍得有人停下来看，先换这个开头",
      "做{{topic}}短视频，真正重要的是第一句怎么说",
    ],
    stepTemplates: [
      "开头先打断：先说大家做 {{topic}} 时最容易犯的错，不要直接讲步骤。",
      "中段给反差：把方法拆成 2 到 3 个连续动作，不要一口气全说完。",
      "结尾留互动：别总结太满，用一句追问把评论区带起来。",
    ],
    deliveryTips: [
      "建议拍成 30 到 45 秒口播：前 3 秒打断，中段给动作，最后一句拉互动。",
      "更适合快节奏口播：第一句先戳痛点，第二句再丢反差。",
      "拍视频时别追求信息太全，先保证前三句让人愿意继续听。",
    ],
    bestMoments: [
      "适合你有观点但开头总是太慢的时候用。",
      "适合一上来就想讲干货，结果总被滑走的时候用。",
      "适合你准备拍口播，但还没想好前三句怎么站住的时候用。",
    ],
  },
  knowledge: {
    label: "知识分享",
    description: "适合知识类表达，重点是先讲误区，再讲原因，最后给真正能执行的方法。",
    promise: "先让人听懂为什么，再决定要给几步做法。",
    snapshot: "更适合“先拆误区，再落做法”的表达，不要把工具名本身当内容。",
    freshFindings: [
      "知识内容先拆误区，用户才会觉得后面的做法真的有含金量。",
      "别一股脑丢术语，先把“为什么会错”讲明白，留存会更稳。",
      "一条知识内容只保留 2 到 3 步动作，反而更像真会做的人。",
    ],
    titleTemplates: [
      "讲{{topic}}，先别堆方法，先把这 3 个误区讲清楚",
      "{{topic}}想讲得像真懂，先别急着罗列工具",
      "如果你要认真讲{{topic}}，这套知识型结构更稳",
    ],
    stepTemplates: [
      "先点误区：直接说大家围绕 {{topic}} 最常见的一个理解偏差。",
      "再补原因：解释为什么会错，用户才会觉得这条不是空口输出。",
      "最后给方法：只给 2 到 3 步能执行的动作，不再继续发散。",
    ],
    deliveryTips: [
      "建议做成长图文或知识口播：先讲误区，再讲原因，最后落到 2 到 3 步方法。",
      "适合做“听完就知道怎么改”的知识表达，不适合堆很多工具名。",
      "先讲理解，再讲动作，整条内容会更像真懂这件事的人在讲。",
    ],
    bestMoments: [
      "适合你想把一件事讲得更像真懂，而不是只会堆概念的时候用。",
      "适合你已经有结论，但还没讲清背后逻辑的时候用。",
      "适合你准备做知识型内容，却担心太像流水账的时候用。",
    ],
  },
};

const CATEGORY_RULES = [
  {
    name: "ai",
    keywords: ["ai", "gpt", "claude", "codex", "agent", "提示词", "模型", "自动化"],
    angle: "别再讲空概念，直接把“替代了哪一步、帮人省了多少脑力”讲透。",
    emotions: [
      "用户最容易留下来的是“原来这一步能被替掉”的轻松感。",
      "这类主题最该抓住的是“终于有人把复杂东西讲清楚”的松一口气。",
      "别做成技术展示，做成“我马上能拿去用”的确定感会更强。",
    ],
    cautions: [
      "别一上来堆模型名和术语，用户会先退出，不会先佩服。",
      "别把工具名当卖点，真正能留下人的还是“它替你省了哪一步”。",
      "别把整条内容写成教程说明书，先抓住场景，再给动作。",
    ],
    hooks: [
      "大多数人讲{{topic}}没起色，不是不会，而是第一步就太散了。我把最容易出效果的顺序先给你。",
      "如果你准备讲{{topic}}，别先堆工具和概念，先把最能省脑力的那一下亮出来。",
      "很多人做{{topic}}讲了半天，观众还是不知道自己该怎么用。我先给你一版更顺的起稿法。",
    ],
    closes: [
      "如果你最近也在折腾{{topic}}，先照这套发一版，再回来看哪一句最容易出反馈。",
      "先把{{topic}}讲成一条能被复用的内容，再去慢慢加你的案例和风格。",
      "围绕{{topic}}先发第一版，不要继续等更完整的版本，反馈会替你修正后面那版。",
    ],
    extraTitles: [
      "我把{{topic}}拆成了一个能直接照搬的流程",
      "{{topic}}别再从 0 开始，先抄这套更容易发出去的骨架",
      "用{{topic}}做内容，最省时间的不是写，而是先这样拆",
    ],
    checklist: [
      "第一句别讲工具名，先讲它替人解决了什么具体问题。",
      "至少留一句能直接照抄的话，不要只有抽象判断。",
      "删掉一切和结果没关系的炫技描述。",
    ],
  },
  {
    name: "career",
    keywords: ["简历", "面试", "离职", "打工", "上班", "求职", "副业", "涨薪"],
    angle: "把情绪和真实利益一起讲出来，内容会更像“终于有人把我心里那句说出来了”。",
    emotions: [
      "最容易留下人的是“这也太像我了”的代入感，不是大道理。",
      "这类内容真正有传播力的点，是用户觉得“终于有人替我说出来了”。",
      "抓住那句扎心但体面的表达，比讲一堆原则更能让人停下来。",
    ],
    cautions: [
      "别把这类主题讲成空鸡汤，用户更想要一句真能拿去用的话。",
      "别只讲惨和焦虑，用户更愿意转发“又真实又体面”的版本。",
      "别一上来就讲结论太满，先让人觉得你懂他的处境。",
    ],
    hooks: [
      "很多人卡在{{topic}}，不是因为不努力，是没人先把那句最扎心的话说出来。",
      "关于{{topic}}，大家总爱讲道理，但真正让人停下来的是那句“原来我不是一个人”。",
      "如果你要做{{topic}}，别先说方法，先把用户心里那句没说出口的话讲出来。",
    ],
    closes: [
      "你不需要一次讲完整个世界，只要先把{{topic}}里最像你的那一段讲对。",
      "围绕{{topic}}先讲一段真实处境，再给一步动作，内容就会更像活人。",
      "先把{{topic}}里最让人共鸣的那句话说出来，后面的做法才有人继续看。",
    ],
    extraTitles: [
      "{{topic}}这件事，别再只会硬扛了",
      "原来{{topic}}最容易爆，不是因为惨，是因为太像我了",
      "关于{{topic}}，这套说法最容易让人停下来",
    ],
    checklist: [
      "先写一句用户会想截图的真实感受，再补方法。",
      "动作只给一步就够，别把建议写成一堆任务。",
      "结尾要保留体面感，不要只剩抱怨。",
    ],
  },
  {
    name: "money",
    keywords: ["赚钱", "搞钱", "变现", "流量", "涨粉", "私域", "成交"],
    angle: "别画大饼，先把门槛、第一步和最早能见到的小反馈讲清楚。",
    emotions: [
      "用户不是想听机会多大，而是想确认“我今天到底能从哪一步开始”。",
      "真正能留下人的不是热血，而是“这事我也许真能试一下”的可行感。",
      "先给起步确定感，再讲回报，信任感会更稳。",
    ],
    cautions: [
      "别一上来就讲赚多少，这种话术已经太像模板了。",
      "别只讲机会，起步门槛和第一步动作不清楚，用户只会更焦虑。",
      "别把节奏写得太大，先把最近一周能验证的动作说清楚。",
    ],
    hooks: [
      "关于{{topic}}，多数内容都只会让人更焦虑。我给你一版今天就能开干的骨架。",
      "很多人讲{{topic}}只会画饼，但真正让人留下来的是“今天先做什么”。",
      "如果你想做{{topic}}，先别讲远处的结果，先把最小起步动作说清楚。",
    ],
    closes: [
      "把{{topic}}讲清楚，比把它讲得热血更重要，用户更信这一种。",
      "围绕{{topic}}先拿到第一步反馈，再考虑怎么把故事讲得更大。",
      "关于{{topic}}，别急着证明自己很懂，先让人觉得这事真能起步。",
    ],
    extraTitles: [
      "想靠{{topic}}搞结果，先别忙着冲量",
      "{{topic}}最容易被忽略的一步，我替你拆好了",
      "做{{topic}}的人很多，但能跑起来的都先做对这 3 步",
    ],
    checklist: [
      "先讲适合谁，不适合谁，别让人误以为人人都能照抄。",
      "至少给出今天就能验证的一步动作。",
      "回报只点到第一层，不要直接上大结果。",
    ],
  },
];

const DEFAULT_CATEGORY = {
  angle: "先把问题讲具体，再把动作拆具体，内容自然会比空概念更容易被看完。",
  emotions: [
    "先给确定感，比先给复杂观点更容易让人留下来。",
    "用户真正想要的是“我现在就能借走一点结构”，不是被教育。",
    "别先追求高级感，先让人听懂，停留和收藏都会更稳。",
  ],
  cautions: [
    "别把一条内容塞太满，用户更容易被一个清晰骨架打动。",
    "别先铺一大段背景，结果越靠后，流失越快。",
    "别用太多抽象形容词，动作句比判断句更有说服力。",
  ],
  hooks: [
    "如果你也想做{{topic}}，别先追求高级感，先把最容易让人听懂的顺序搭出来。",
    "围绕{{topic}}先别想着一次讲完，先做一版更顺的表达骨架。",
    "很多内容不好看完，不是信息不够，而是第一句和结构没搭好。我先替你拆一版。",
  ],
  closes: [
    "先发出第一版，再根据反馈微调，内容就是这样越跑越准的。",
    "别继续等更完整的版本，围绕{{topic}}先跑出第一版，才知道下一版该怎么改。",
    "先把{{topic}}讲成一条更顺的内容，再慢慢把它磨成你的风格。",
  ],
  extraTitles: [
    "{{topic}}，先别急着发，先这样拆",
    "我把{{topic}}整理成了一套可直接开写的骨架",
    "想讲清{{topic}}，这一版结构最好用",
  ],
  checklist: [
    "第一句先给结果，不要先给一大段背景。",
    "结构只保留 3 个动作，别让内容显得太满。",
    "结尾留一句明确动作，让人知道该收藏、评论还是继续追问。",
  ],
};

function cleanTopic(topic) {
  return String(topic || "").trim() || "这个主题";
}

function normalizeMode(mode) {
  return Object.hasOwn(VIRAL_MODES, mode) ? mode : "xhs";
}

function selectCategory(topic) {
  const lower = topic.toLowerCase();

  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((keyword) => lower.includes(keyword.toLowerCase()))) {
      return rule;
    }
  }

  return DEFAULT_CATEGORY;
}

function fill(template, topic) {
  return template.replaceAll("{{topic}}", topic);
}

function rotate(items, variant = 0, offset = 0) {
  return items[(variant + offset) % items.length];
}

function unique(items) {
  return [...new Set(items)];
}

function safeVariant(value) {
  return Number.isInteger(value) && value >= 0 ? value : 0;
}

function modeClose(mode, topic) {
  if (mode === "video") {
    return `围绕${topic}拍口播时，结尾别收太满，留一句“要不要我把完整模板也给你”，更容易把互动带出来。`;
  }

  if (mode === "knowledge") {
    return `围绕${topic}做知识分享时，记得把“为什么”和“怎么做”连起来，用户才会觉得这一条真的有用。`;
  }

  return `围绕${topic}做图文时，最后留一句能让人顺手收藏的话，转化会更自然。`;
}

function buildOpeningScript(topic, mode, variant = 0) {
  if (mode === "video") {
    return [
      [
        `第1句：如果你讲${topic}总是没人停下来，问题不在内容，在开头。`,
        `第2句：你先别铺背景，先把结果亮出来。`,
        `第3句：我直接给你一版能开拍的口播顺序。`,
      ],
      [
        `第1句：你做${topic}口播没起色，多半不是内容差，是前两句太慢。`,
        `第2句：先把结果扔出来，再说观众原来哪里容易做错。`,
        `第3句：下面这 6 段你直接按顺序讲就行。`,
      ],
      [
        `第1句：如果你一讲${topic}就被划走，先别怪账号。`,
        `第2句：真正的问题，是你把最该放前面的那句放后面了。`,
        `第3句：我现在直接给你一版更容易停留的开场脚本。`,
      ],
    ][variant % 3].join("\n");
  }

  if (mode === "knowledge") {
    return [
      [
        `第1句：很多人讲${topic}，一上来就讲方法，所以越讲越散。`,
        `第2句：正确顺序不是先堆步骤，而是先把误区讲明白。`,
        `第3句：下面这版就是可以直接照着讲的分享框架。`,
      ],
      [
        `第1句：你讲${topic}如果总像念资料，问题通常不是不懂，是顺序不对。`,
        `第2句：先讲大家最容易错在哪里，再讲为什么，最后才讲做法。`,
        `第3句：这三段你照着讲，整条内容就会稳很多。`,
      ],
      [
        `第1句：多数人分享${topic}，输就输在一开头就想把所有步骤讲完。`,
        `第2句：真正更像懂的人，是先讲判断，再讲动作。`,
        `第3句：我下面直接给你一版可复用的分享提纲。`,
      ],
    ][variant % 3].join("\n");
  }

  return [
    [
      `第1句：如果你想把${topic}做成一条会被收藏的内容，别先讲背景。`,
      `第2句：先亮结果，再给一句能直接照抄的话。`,
      `第3句：下面这 6 屏就是可以直接去写的顺序。`,
    ],
    [
      `第1句：你发${topic}总没人收藏，往往不是主题不行，是开头太虚。`,
      `第2句：封面先给结果，正文再拆步骤，用户才会愿意存下来。`,
      `第3句：我把顺序直接给你，照着写就够了。`,
    ],
    [
      `第1句：做${topic}图文，最怕一上来就解释太多。`,
      `第2句：先把结论甩出来，再补“为什么值得看”。`,
      `第3句：下面这版就是你可以直接套进去的图文骨架。`,
    ],
  ][variant % 3].join("\n");
}

function buildSummary(topic, modeLabel) {
  return `这条先按${modeLabel}来做，别试着一次讲完，先把下面这版直接发出去。`;
}

function buildPositioning(topic, category) {
  if (category.name === "ai") {
    return `别讲“${topic}有多强”，直接讲“${topic}替你省掉了哪一步”。`;
  }

  if (category.name === "career") {
    return `别先给大道理，先把${topic}里那句“这也太像我了”说出来。`;
  }

  if (category.name === "money") {
    return `别先讲赚多少，先讲“做${topic}的人第一步到底从哪开始”。`;
  }

  return `别先讲背景，先把${topic}里最具体的结果放到第一句。`;
}

function buildCatchLine(topic, category) {
  if (category.name === "ai") {
    return `先抓“${topic}不是不会做，而是第一步就做散了”。`;
  }

  if (category.name === "career") {
    return `先抓“原来卡在${topic}的人，不只是我一个”。`;
  }

  if (category.name === "money") {
    return `先抓“${topic}别想太远，先把第一步跑出来”。`;
  }

  return `先抓“${topic}别讲满，先把结果亮出来”。`;
}

function buildFormatLine(mode) {
  if (mode === "video") {
    return "拍成 30 到 45 秒口播：前 3 秒打断，中间只留 2 到 3 个动作，结尾留追问。";
  }

  if (mode === "knowledge") {
    return "按“误区 -> 原因 -> 做法”讲，步骤别超过 3 个，不要一股脑全倒出来。";
  }

  return "做成 6 屏左右图文：封面给结果，正文只留 3 个动作，最后一屏放收藏提醒。";
}

function buildDeleteLine(category) {
  if (category.name === "ai") {
    return "删掉模型名、术语和炫技描述，只留“它到底替人省了哪一步”。";
  }

  if (category.name === "career") {
    return "删掉空鸡汤和长抱怨，先留真实处境，再留一步能做的动作。";
  }

  if (category.name === "money") {
    return "删掉“轻松赚”“快速起号”这种大词，先把门槛和第一步讲明白。";
  }

  return "删掉大段背景和抽象判断，先留下结果句和动作句。";
}

function buildScriptSteps(topic, mode, title) {
  if (mode === "video") {
    return [
      `镜头1（0-3秒）：正对镜头先说“如果你讲${topic}总没人停下来，问题不在内容，在开头。”`,
      `镜头2（3-8秒）：马上补结果，“你先别讲方法，先把结果亮出来。”`,
      `镜头3（8-18秒）：点常见错误，“大多数人一上来就铺背景，所以前两句就被滑走了。”`,
      `镜头4（18-30秒）：给顺序，“第一句讲结果，第二句讲误区，第三句再讲具体做法。”`,
      `镜头5（30-40秒）：拆动作，“做法只保留 2 到 3 个动作，不要一口气讲完。”`,
      `镜头6（收尾）：追问一句“要不要我把${topic}这套完整口播模板也拆给你？”`,
    ];
  }

  if (mode === "knowledge") {
    return [
      `开场定义：先说“讲${topic}时，大家最容易错的不是不会做，而是顺序不对。”`,
      `第一段误区：只讲一个最常见的误区，不要一下子列太多。`,
      `第二段原因：解释为什么这个误区会让${topic}越讲越散。`,
      `第三段做法：先给判断，再给步骤，别直接扔一堆方法。`,
      `第四段动作：步骤只保留 2 到 3 个，而且每一步都能执行。`,
      `结尾收束：补一句“如果你正准备讲${topic}，先照这个顺序讲一版。”`,
    ];
  }

  return [
    `封面标题：${title}`,
    `第1屏：先亮结果。直接写“${topic}这条内容，先帮你省下哪一步”。`,
    `第2屏：点常见卡点。写“多数人不是不会做${topic}，而是第一步就写散了”。`,
    `第3屏：给动作1。先写结果句，再补一句为什么这个结果值得看。`,
    `第4屏：给动作2。把做法只拆成 2 到 3 步，每一步只写一个动作。`,
    `第5屏：放一句可直接照抄的话。比如“如果你现在就在做${topic}，先照这一步改。”`,
    `第6屏：结尾收口。提醒用户“下次做到这里，回来翻这一条”。`,
  ];
}

export function createViralSkillKit(options = {}) {
  const topic = cleanTopic(options.topic);
  const mode = normalizeMode(options.mode);
  const variant = safeVariant(options.variant);
  const modeConfig = VIRAL_MODES[mode];
  const category = selectCategory(topic);

  const baseTitles = modeConfig.titleTemplates.map((item) => fill(item, topic));
  const extraTitles = category.extraTitles.map((item) => fill(item, topic));
  const title = rotate(baseTitles, variant);
  const altTitles = unique([
    rotate(baseTitles, variant, 1),
    rotate(baseTitles, variant, 2),
    rotate(extraTitles, variant),
  ]).slice(0, 3);
  const steps = buildScriptSteps(topic, mode, title);

  return {
    topic,
    mode,
    variant,
    modeLabel: modeConfig.label,
    modeDescription: modeConfig.description,
    promise: modeConfig.promise,
    snapshot: modeConfig.snapshot,
    freshFindings: modeConfig.freshFindings,
    summary: buildSummary(topic, modeConfig.label),
    angle: buildPositioning(topic, category),
    title,
    altTitles,
    hook: buildOpeningScript(topic, mode, variant),
    steps,
    deliveryTip: rotate(modeConfig.deliveryTips, variant),
    close: `${fill(rotate(category.closes, variant), topic)} ${modeClose(mode, topic)}`,
    bestMoment: buildFormatLine(mode),
    emotion: buildCatchLine(topic, category),
    caution: buildDeleteLine(category),
    checklist: category.checklist,
    shareText: `我刚用热点操盘手拆了一套“${topic}”的${modeConfig.label}骨架，标题、开头、结构和结尾都出来了。`,
  };
}
