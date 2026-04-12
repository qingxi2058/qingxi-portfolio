import { createViralSkillKit } from "./logic.mjs";

const examples = [
  "用AI做简历优化",
  "打工人副业起步",
  "普通人如何学Claude Code",
  "怎么把选题写得更像真人",
];

const state = {
  mode: "xhs",
};

const modeButtons = [...document.querySelectorAll("[data-mode]")];
const exampleList = document.querySelector("#example-list");
const topicInput = document.querySelector("#topic-input");
const copiedHint = document.querySelector("#copied-hint");
const resultPanel = document.querySelector("#result-panel");

const resultFields = {
  angle: document.querySelector("#result-angle"),
  title: document.querySelector("#result-title"),
  altTitles: document.querySelector("#result-alt-titles"),
  hook: document.querySelector("#result-hook"),
  steps: document.querySelector("#result-steps"),
  close: document.querySelector("#result-close"),
};

function renderExamples() {
  exampleList.innerHTML = examples
    .map((item) => `<span class="chip" aria-hidden="true">${item}</span>`)
    .join("");
}

function updateActiveButtons() {
  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === state.mode);
  });
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
  resultFields.angle.textContent = kit.angle;
  resultFields.title.textContent = kit.title;
  resultFields.altTitles.innerHTML = kit.altTitles
    .map((item) => `<li>${item}</li>`)
    .join("");
  resultFields.hook.textContent = kit.hook;
  resultFields.steps.innerHTML = kit.steps.map((item) => `<li>${item}</li>`).join("");
  resultFields.close.textContent = kit.close;
  resultPanel.hidden = false;

  document.querySelector("#copy-all").onclick = () =>
    copyText(
      [
        `主题：${kit.topic}`,
        `主标题：${kit.title}`,
        ...kit.altTitles.map((item, index) => `备用标题${index + 1}：${item}`),
        `开头钩子：${kit.hook}`,
        ...kit.steps.map((item) => `内容结构：${item}`),
        `结尾收口：${kit.close}`,
      ].join("\n"),
      "整套已复制",
    );

  document.querySelector("#share-result").onclick = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "爆款Skill",
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

document.querySelector("#generate-button").addEventListener("click", buildKit);

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    updateActiveButtons();
  });
});

topicInput.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    buildKit();
  }
});

renderExamples();
updateActiveButtons();
