import { createViralSkillKit } from "./logic.mjs";

const examples = [
  "AI简历优化",
  "打工人副业起步",
  "普通人如何学 Claude Code",
  "怎么把选题写得更像真人",
  "AI内容怎么做成高收藏图文",
];

const state = {
  mode: "xhs",
  variant: 0,
  lastTopic: "",
  lastKit: null,
};

const modeButtons = [...document.querySelectorAll("[data-mode]")];
const exampleList = document.querySelector("#example-list");
const topicInput = document.querySelector("#topic-input");
const copiedHint = document.querySelector("#copied-hint");
const resultPanel = document.querySelector("#result-panel");
const weeklyNote = document.querySelector("#weekly-note");
const generateButton = document.querySelector("#generate-button");
const remixButton = document.querySelector("#remix-button");
const copyAllButton = document.querySelector("#copy-all");
const shareButton = document.querySelector("#share-result");
const recentList = document.querySelector("#recent-list");

const resultFields = {
  angle: document.querySelector("#result-angle"),
  title: document.querySelector("#result-title"),
  altTitles: document.querySelector("#result-alt-titles"),
  hook: document.querySelector("#result-hook"),
  steps: document.querySelector("#result-steps"),
  delivery: document.querySelector("#result-delivery"),
  close: document.querySelector("#result-close"),
  summary: document.querySelector("#result-summary"),
  bestMoment: document.querySelector("#result-best-moment"),
  emotion: document.querySelector("#result-emotion"),
  caution: document.querySelector("#result-caution"),
  checklist: document.querySelector("#result-checklist"),
};

function renderExamples() {
  exampleList.innerHTML = examples
    .map(
      (item) =>
        `<button class="chip example-chip" type="button" data-example="${item}">${item}</button>`,
    )
    .join("");
}

function updateModePreview() {
  const previewKit = createViralSkillKit({
    topic: topicInput.value.trim() || "这个主题",
    mode: state.mode,
    variant: state.variant,
  });

  recentList.innerHTML = previewKit.freshFindings.map((item) => `<li>${item}</li>`).join("");
}

function updateActiveButtons() {
  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === state.mode);
  });
}

function setResultActionsEnabled(enabled) {
  remixButton.disabled = !enabled;
  copyAllButton.disabled = !enabled;
  shareButton.disabled = !enabled;
}

function syncUrl(topic = topicInput.value.trim()) {
  const url = new URL(window.location.href);

  if (topic) {
    url.searchParams.set("topic", topic);
    url.searchParams.set("mode", state.mode);
    url.searchParams.set("variant", String(state.variant));
  } else {
    url.searchParams.delete("topic");
    url.searchParams.delete("mode");
    url.searchParams.delete("variant");
  }

  window.history.replaceState({}, "", url);
}

function showCopied(message) {
  copiedHint.textContent = message;
  copiedHint.hidden = false;
  clearTimeout(showCopied.timer);
  showCopied.timer = window.setTimeout(() => {
    copiedHint.hidden = true;
  }, 1800);
}

async function copyText(text, message = "已复制") {
  await navigator.clipboard.writeText(text);
  showCopied(message);
}

function renderKit(kit) {
  state.lastKit = kit;
  state.lastTopic = kit.topic;
  resultFields.angle.textContent = kit.angle;
  resultFields.title.textContent = kit.title;
  resultFields.altTitles.innerHTML = kit.altTitles.map((item) => `<li>${item}</li>`).join("");
  resultFields.hook.textContent = kit.hook;
  resultFields.steps.innerHTML = kit.steps.map((item) => `<li>${item}</li>`).join("");
  resultFields.delivery.textContent = kit.deliveryTip;
  resultFields.close.textContent = kit.close;
  resultFields.summary.textContent = kit.summary;
  resultFields.bestMoment.textContent = kit.bestMoment;
  resultFields.emotion.textContent = kit.emotion;
  resultFields.caution.textContent = kit.caution;
  resultFields.checklist.innerHTML = kit.checklist.map((item) => `<li>${item}</li>`).join("");

  resultPanel.hidden = false;
  resultPanel.classList.remove("flash");
  void resultPanel.offsetWidth;
  resultPanel.classList.add("flash");

  setResultActionsEnabled(true);
  weeklyNote.hidden = false;
  syncUrl(kit.topic);

  copyAllButton.onclick = () =>
    copyText(
      [
        `主题：${kit.topic}`,
        `发布渠道：${kit.modeLabel}`,
        `建议角度：${kit.angle}`,
        `主标题：${kit.title}`,
        ...kit.altTitles.map((item, index) => `备用标题${index + 1}：${item}`),
        `开头钩子：${kit.hook}`,
        ...kit.steps.map((item) => `内容结构：${item}`),
        `发法提醒：${kit.deliveryTip}`,
        `结尾收口：${kit.close}`,
        ...kit.checklist.map((item) => `发布前检查：${item}`),
      ].join("\n"),
      "整套已复制",
    );

  shareButton.onclick = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `热点操盘手 · ${kit.modeLabel}`,
        text: kit.shareText,
        url: window.location.href,
      });
      return;
    }

    await copyText(`${kit.shareText} ${window.location.href}`, "分享文案已复制");
  };
}

function buildKit() {
  const topic = topicInput.value.trim();
  if (!topic) {
    topicInput.focus();
    showCopied("先写一个真的准备发的主题");
    return;
  }

  const kit = createViralSkillKit({
    topic,
    mode: state.mode,
    variant: state.variant,
  });

  renderKit(kit);
}

generateButton.addEventListener("click", () => {
  state.variant = 0;
  buildKit();
});

remixButton.addEventListener("click", () => {
  if (!state.lastTopic) {
    return;
  }

  state.variant += 1;
  buildKit();
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    updateActiveButtons();
    topicInput.placeholder = button.dataset.placeholder;
    updateModePreview();

    if (state.lastTopic) {
      state.variant = 0;
      buildKit();
    } else {
      syncUrl("");
    }
  });
});

exampleList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-example]");
  if (!button) {
    return;
  }

  topicInput.value = button.dataset.example;
  state.variant = 0;
  buildKit();
});

topicInput.addEventListener("input", () => {
  updateModePreview();
});

topicInput.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    state.variant = 0;
    buildKit();
  }
});

function applyUrlState() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const topic = params.get("topic");
  const variant = Number.parseInt(params.get("variant") || "0", 10);

  if (mode && modeButtons.some((button) => button.dataset.mode === mode)) {
    state.mode = mode;
  }

  if (Number.isInteger(variant) && variant >= 0) {
    state.variant = variant;
  }

  if (topic) {
    topicInput.value = topic;
    state.lastTopic = topic;
  }
}

renderExamples();
applyUrlState();
updateActiveButtons();
setResultActionsEnabled(false);
topicInput.placeholder = modeButtons.find((button) => button.dataset.mode === state.mode)?.dataset.placeholder ?? topicInput.placeholder;
updateModePreview();

if (topicInput.value.trim()) {
  buildKit();
}
