const endTimeInput = document.querySelector("#endTime");
const monthlySalaryInput = document.querySelector("#monthlySalary");
const countdownEl = document.querySelector("#countdown");
const statusEl = document.querySelector("#status");
const todayEarnedEl = document.querySelector("#todayEarned");
const salaryToggleBtn = document.querySelector("#salaryToggle");
const remindThirtyInput = document.querySelector("#remindThirty");
const beijingTimeEl = document.querySelector("#beijingTime");
const penaltyEl = document.querySelector("#penalty");
const toastEl = document.querySelector("#toast");
const barrageEl = document.querySelector("#barrage");
const bodyEl = document.body;
const installAppBtn = document.querySelector("#installAppBtn");

const SETTINGS_KEY = "offwork-clock-settings";
const MONEY_MASK = "****";
const THIRTY_MINUTES_MS = 30 * 60 * 1000;
const WORK_DAYS_PER_MONTH = 22;
const HOURS_PER_DAY = 8;
const WORK_MINUTES_PER_MONTH = WORK_DAYS_PER_MONTH * HOURS_PER_DAY * 60;
const barrageLines = [
  "快滚回家搞副业！",
  "还不走？老板给你加钱了吗？快滚去搞副业！",
  "下班铃都响了，你还在演感动中国？",
  "该走了！公司不会记你加班的。",
  "别卷了，天都黑了。",
  "摸鱼也要有下班线，给自己放过。",
  "你在坚持什么？KPI不会感动你的。"
];

let lastMinuteMark = null;
let toastTimer = null;
let barrageTimer = null;
let salaryVisible = false;
let storedSalaryValue = "";
let lastThirtyReminderKey = null;
let deferredInstallPrompt = null;

function parseTime(value) {
  if (!value || !value.includes(":")) {
    return { hours: 18, minutes: 0 };
  }
  const [hours, minutes] = value.split(":");
  return {
    hours: Number.parseInt(hours, 10) || 0,
    minutes: Number.parseInt(minutes, 10) || 0
  };
}

function getBeijingNowParts() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const parts = formatter.formatToParts(new Date());
  const map = {};
  for (const part of parts) {
    if (part.type !== "literal") {
      map[part.type] = part.value;
    }
  }
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second)
  };
}

function getBeijingTimes() {
  const parts = getBeijingNowParts();
  const nowEpoch = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );
  const { hours, minutes } = parseTime(endTimeInput.value);
  const targetEpoch = Date.UTC(parts.year, parts.month - 1, parts.day, hours, minutes, 0);
  return { nowEpoch, targetEpoch };
}

function formatDuration(ms) {
  const totalSeconds = Math.floor(Math.abs(ms) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getSalaryValue() {
  const raw = salaryVisible ? monthlySalaryInput.value : storedSalaryValue;
  const salary = Number.parseFloat(raw);
  return Number.isFinite(salary) ? salary : 0;
}

function updatePerMinute() {
  const salary = getSalaryValue();
  const perMinute = salary ? salary / WORK_MINUTES_PER_MONTH : 0;
  return perMinute;
}

function updateTodayEarned(perMinute, nowEpoch, targetEpoch) {
  if (!salaryVisible) {
    todayEarnedEl.textContent = MONEY_MASK;
    return 0;
  }
  const workdayStart = targetEpoch - HOURS_PER_DAY * 3600 * 1000;
  const secondsWorked = Math.min(
    Math.max((nowEpoch - workdayStart) / 1000, 0),
    HOURS_PER_DAY * 3600
  );
  const earned = (perMinute / 60) * secondsWorked;
  todayEarnedEl.textContent = earned.toFixed(4);
  return earned;
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  if (toastTimer) {
    window.clearTimeout(toastTimer);
  }
  toastTimer = window.setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2400);
}

function updateInstallButtonVisibility(visible) {
  if (!installAppBtn) {
    return;
  }
  installAppBtn.classList.toggle("is-ready", visible);
}

function isStandaloneMode() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((error) => {
      console.warn("Service worker registration failed", error);
    });
  });
}

function createBarrageItem() {
  const item = document.createElement("div");
  item.className = "barrage-item";
  item.textContent = barrageLines[Math.floor(Math.random() * barrageLines.length)];
  item.style.top = `${Math.random() * 70 + 5}%`;
  item.style.animationDuration = `${6 + Math.random() * 6}s`;
  item.style.fontSize = `${14 + Math.random() * 12}px`;
  item.style.opacity = (0.75 + Math.random() * 0.25).toFixed(2);
  barrageEl.appendChild(item);
  item.addEventListener("animationend", () => item.remove());
}

function startBarrage() {
  if (barrageTimer) {
    return;
  }
  createBarrageItem();
  barrageTimer = window.setInterval(createBarrageItem, 1100);
}

function stopBarrage() {
  if (!barrageTimer) {
    return;
  }
  window.clearInterval(barrageTimer);
  barrageTimer = null;
  barrageEl.innerHTML = "";
}

function setSalaryVisibility(visible) {
  salaryVisible = visible;
  salaryToggleBtn.classList.toggle("is-visible", visible);
  salaryToggleBtn.setAttribute("aria-pressed", String(visible));
  salaryToggleBtn.setAttribute("aria-label", visible ? "隐藏月薪" : "显示月薪");
  if (visible) {
    monthlySalaryInput.value = storedSalaryValue;
    monthlySalaryInput.readOnly = false;
  } else {
    storedSalaryValue = monthlySalaryInput.value;
    monthlySalaryInput.value = MONEY_MASK;
    monthlySalaryInput.readOnly = true;
    if (toastTimer) {
      window.clearTimeout(toastTimer);
      toastTimer = null;
    }
    toastEl.classList.remove("show");
  }

  const { nowEpoch, targetEpoch } = getBeijingTimes();
  const perMinute = updatePerMinute();
  updateTodayEarned(perMinute, nowEpoch, targetEpoch);
}

function saveSettings() {
  if (salaryVisible) {
    storedSalaryValue = monthlySalaryInput.value;
  }
  const data = {
    endTime: endTimeInput.value,
    monthlySalary: storedSalaryValue,
    remindThirty: Boolean(remindThirtyInput && remindThirtyInput.checked)
  };
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
}

function loadSettings() {
  const raw = window.localStorage.getItem(SETTINGS_KEY);
  if (!raw) {
    return;
  }
  try {
    const data = JSON.parse(raw);
    if (data.endTime !== undefined) {
      endTimeInput.value = data.endTime;
    }
    if (data.monthlySalary !== undefined) {
      monthlySalaryInput.value = data.monthlySalary;
    }
    if (remindThirtyInput && data.remindThirty !== undefined) {
      remindThirtyInput.checked = Boolean(data.remindThirty);
    }
  } catch (error) {
    console.warn("Failed to read settings", error);
  }
}

function maybeShowThirtyReminder(diff, targetEpoch) {
  if (!remindThirtyInput || !remindThirtyInput.checked) {
    return;
  }
  if (diff <= THIRTY_MINUTES_MS && diff > THIRTY_MINUTES_MS - 60000) {
    const key = targetEpoch;
    if (lastThirtyReminderKey !== key) {
      lastThirtyReminderKey = key;
      showToast("距离下班还有30分钟");
    }
  }
}

function tick() {
  const { nowEpoch, targetEpoch } = getBeijingTimes();
  const nowParts = getBeijingNowParts();
  if (beijingTimeEl) {
    beijingTimeEl.textContent = `北京时间 ${String(nowParts.hour).padStart(2, "0")}:${String(
      nowParts.minute
    ).padStart(2, "0")}`;
  }
  const diff = targetEpoch - nowEpoch;
  const perMinute = updatePerMinute();
  updateTodayEarned(perMinute, nowEpoch, targetEpoch);
  const isOffTime = diff <= 0;

  if (!isOffTime) {
    countdownEl.textContent = formatDuration(diff);
    statusEl.textContent = "距离结束节点还有";
    stopBarrage();
  } else {
    countdownEl.textContent = `超时 ${formatDuration(diff)}`;
    statusEl.textContent = "已到设定时间";
    startBarrage();
  }

  bodyEl.classList.toggle("offwork", isOffTime);
  penaltyEl.setAttribute("aria-hidden", String(!isOffTime));
  maybeShowThirtyReminder(diff, targetEpoch);

  const minuteMark = Math.floor(nowEpoch / 60000);
  if (lastMinuteMark === null) {
    lastMinuteMark = minuteMark;
  } else if (minuteMark !== lastMinuteMark) {
    lastMinuteMark = minuteMark;
    if (salaryVisible) {
      showToast(`你又赚了${perMinute.toFixed(2)}元`);
    }
  }
}

loadSettings();
storedSalaryValue = monthlySalaryInput.value;
setSalaryVisibility(false);
updatePerMinute();

endTimeInput.addEventListener("input", () => {
  saveSettings();
  tick();
});

monthlySalaryInput.addEventListener("input", () => {
  storedSalaryValue = monthlySalaryInput.value;
  saveSettings();
  updatePerMinute();
});

salaryToggleBtn.addEventListener("click", () => {
  setSalaryVisibility(!salaryVisible);
});

if (remindThirtyInput) {
  remindThirtyInput.addEventListener("change", () => {
    saveSettings();
  });
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  updateInstallButtonVisibility(true);
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  updateInstallButtonVisibility(false);
  showToast("已添加到桌面，之后可以像独立应用一样打开");
});

if (installAppBtn) {
  installAppBtn.addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice.catch(() => null);
      deferredInstallPrompt = null;
      updateInstallButtonVisibility(false);
      return;
    }

    if (isStandaloneMode()) {
      showToast("已经安装好了，桌面或应用列表里可以直接打开");
      return;
    }

    showToast("请点浏览器地址栏里的安装图标，或在菜单里选“安装应用”");
  });
}

registerServiceWorker();
updateInstallButtonVisibility(false);

window.setInterval(tick, 200);
window.setTimeout(tick, 0);
