export const VIRAL_MODES = {
  xhs: { label: "小红书图文", open: "先给结果，再讲过程" },
  video: { label: "短视频口播", open: "先打断，再给反差" },
  knowledge: { label: "知识分享", open: "先讲误区，再给方法" },
};

const CATEGORY_RULES = [
  {
    name: "ai",
    keywords: ["ai", "gpt", "claude", "codex", "agent", "提示词", "模型", "自动化"],
    angle: "别再讲空概念，直接把“能省什么时间、能替代哪一步”讲透。",
    titles: [
      "我把{{topic}}拆成了一个能直接照搬的流程",
      "{{topic}}别再从0开始，先抄这套可执行骨架",
      "用{{topic}}做内容，最省时间的不是写，是先这样拆",
    ],
    hook: "大多数人做{{topic}}没起色，不是不会，而是第一步就太散了。我把最容易出效果的顺序先给你。",
    steps: [
      "先把场景说死：这一条到底解决谁的什么问题。",
      "再把产出拆小：标题、开头、主体、结尾一段一段写。",
      "最后只保留能直接复制的句子，不留空泛形容词。",
    ],
    close: "如果你也在做{{topic}}，先照这套发一版，再回来看哪一步最容易出反馈。",
  },
  {
    name: "career",
    keywords: ["简历", "面试", "离职", "打工", "上班", "求职", "副业", "涨薪"],
    angle: "把情绪和真实利益同时讲出来，内容更容易被同类人转发。",
    titles: [
      "{{topic}}这件事，别再只会硬扛了",
      "原来{{topic}}最容易爆，不是因为惨，是因为太像我了",
      "关于{{topic}}，这套说法最容易让人停下来",
    ],
    hook: "很多人卡在{{topic}}，不是因为不努力，是没人先把那句最扎心的话说出来。",
    steps: [
      "先点痛感：把用户心里那句没说出口的话先讲出来。",
      "再给动作：别讲大道理，只给一步能马上照做的处理方式。",
      "最后补体面：让用户觉得这套表达既真实又不掉价。",
    ],
    close: "你不需要一次讲完整个世界，只要先把{{topic}}里最像你的那一段讲对。",
  },
  {
    name: "money",
    keywords: ["赚钱", "搞钱", "变现", "流量", "涨粉", "私域", "成交"],
    angle: "用户不是想听机会多大，而是想知道这事到底怎么起步、多久见反馈。",
    titles: [
      "想靠{{topic}}搞结果，先别忙着冲量",
      "{{topic}}最容易被忽略的一步，我替你拆好了",
      "做{{topic}}的人很多，但能跑起来的都先做对这3步",
    ],
    hook: "关于{{topic}}，多数内容都只会让人更焦虑。我给你一版能立刻开干的骨架。",
    steps: [
      "先交代门槛：这件事适合谁，不适合谁。",
      "再讲动作：今天能做什么，本周能验证什么。",
      "最后讲回报：先拿小结果，不要一上来就画大饼。",
    ],
    close: "把{{topic}}讲清楚，比把它讲得热血更重要，用户更信这一种。",
  },
];

const DEFAULT_CATEGORY = {
  name: "general",
  angle: "先把问题讲具体，再把方法拆具体，内容自然更容易被看完。",
  titles: [
    "{{topic}}，先别急着发，先这样拆",
    "我把{{topic}}整理成了一套可直接开写的骨架",
    "想讲清{{topic}}，这一版结构最好用",
  ],
  hook: "如果你也想做{{topic}}，别先追求高级感，先把最容易让人听懂的顺序搭出来。",
  steps: [
    "先给结果，让人知道这一条看完能拿走什么。",
    "再讲过程，把中间三步拆成容易照做的动作。",
    "最后给提醒，让用户知道哪里最容易踩坑。",
  ],
  close: "先发出第一版，再根据反馈微调，内容就是这样越跑越准的。",
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

function modeClose(mode, topic) {
  if (mode === "video") {
    return `如果你正准备讲${topic}，结尾别收太满，留一句“要不要我把完整模板也给你”，更容易接互动。`;
  }

  if (mode === "knowledge") {
    return `讲${topic}时，记得把“为什么”和“怎么做”连起来，用户才会觉得这一条真有用。`;
  }

  return `做${topic}图文时，最后留一句能让人顺手收藏的话，转化会更自然。`;
}

export function createViralSkillKit(options = {}) {
  const topic = cleanTopic(options.topic);
  const mode = normalizeMode(options.mode);
  const category = selectCategory(topic);
  const titles = category.titles.map((item) => fill(item, topic));
  const steps = category.steps.map((item, index) => `${index + 1}. ${fill(item, topic)}`);

  return {
    topic,
    mode,
    modeLabel: VIRAL_MODES[mode].label,
    angle: category.angle,
    title: titles[0],
    altTitles: titles.slice(1),
    hook: `${VIRAL_MODES[mode].open}。${fill(category.hook, topic)}`,
    steps,
    close: `${fill(category.close, topic)} ${modeClose(mode, topic)}`,
    shareText: `我刚用爆款Skill拆了一套“${topic}”的内容骨架，标题、开头、结构和收尾都出来了。`,
  };
}
