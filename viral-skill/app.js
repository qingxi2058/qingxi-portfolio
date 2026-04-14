import { createViralSkillKit } from "./logic.mjs";

const examples = [
  "用AI做简历优化",
  "打工人副业起步",
  "普通人如何学Claude Code",
  "怎么把选题写得更像真人",
];

const state = {
  mode: "xhs",
  lastKit: null,
};

const modeButtons = [...document.querySelectorAll("[data-mode]")];
const exampleList = document.querySelector("#example-list");
const topicInput = document.querySelector("#topic-input");
const copiedHint = document.querySelector("#copied-hint");
const resultPanel = document.querySelector("#result-panel");
const modeDescription = document.querySelector("#mode-description");
const generateButton = document.querySelector("#generate-button");
const copyAllButton = document.querySelector("#copy-all");
const shareButton = document.querySelector("#share-result");

const resultFields = {
  angle: document.querySelector("#result-angle"),
  title: document.querySelector("#result-title"),
  altTitles: document.querySelector("#result-alt-titles"),
  hook: document.querySelector("#result-hook"),
  steps: document.querySelector("#result-steps"),
  delivery: document.querySelector("#result-delivery"),
  close: document.querySelector("#result-close"),
  summary: document.querySelector("#result-summary"),
};

function renderExamples() {
  exampleList.innerHTML = examples
    .map(
      (item) =>
        `<button class="chip example-chip" type="button" data-example="${item}">${item}</button>`,
    )
    .join("");
}

function updateActiveButtons() {
  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === state.mode);
  });

  modeDescription.textContent = createViralSkillKit({
    topic: topicInput.value.trim() || "这个主题",
    mode: state.mode,
  }).modeDescription;
}

function setResultActionsEnabled(enabled) {
  copyAllButton.disabled = !enabled;
  shareButton.disabled = !enabled;
}

function syncUrl(topic = topicInput.value.trim()) {
  const url = new URL(window.location.href);
  if (topic) {
    url.searchParams.set("topic", topic);
    url.searchParams.set("mode", state.mode);
  } else {
    url.searchParams.delete("topic");
    url.searchParams.delete("mode");
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
  resultFields.angle.textContent = kit.angle;
  resultFields.title.textContent = kit.title;
  resultFields.altTitles.innerHTML = kit.altTitles
    .map((item) => `<li>${item}</li>`)
    .join("");
  resultFields.hook.textContent = kit.hook;
  resultFields.steps.innerHTML = kit.steps.map((item) => `<li>${item}</li>`).join("");
  resultFields.delivery.textContent = kit.deliveryTip;
  resultFields.close.textContent = kit.close;
  resultFields.summary.textContent = kit.summary;
  resultPanel.hidden = false;
  setResultActionsEnabled(true);
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
      ].join("\n"),
      "整套已复制",
    );

  shareButton.onclick = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `爆款热点操盘手 · ${kit.modeLabel}`,
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
    showCopied("先写一个你要做的主题");
    return;
  }

  renderKit(createViralSkillKit({ topic, mode: state.mode }));
}

generateButton.addEventListener("click", buildKit);

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    updateActiveButtons();

    if (state.lastKit) {
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
  buildKit();
});

topicInput.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    buildKit();
  }
});

function applyUrlState() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const topic = params.get("topic");

  if (mode && modeButtons.some((button) => button.dataset.mode === mode)) {
    state.mode = mode;
  }

  if (topic) {
    topicInput.value = topic;
  }
}

renderExamples();
applyUrlState();
updateActiveButtons();
setResultActionsEnabled(false);

if (topicInput.value.trim()) {
  buildKit();
}
