const ZODIAC_BOUNDARIES = [
  { sign: '摩羯座', start: '12-22', end: '01-19' },
  { sign: '水瓶座', start: '01-20', end: '02-18' },
  { sign: '双鱼座', start: '02-19', end: '03-20' },
  { sign: '白羊座', start: '03-21', end: '04-19' },
  { sign: '金牛座', start: '04-20', end: '05-20' },
  { sign: '双子座', start: '05-21', end: '06-21' },
  { sign: '巨蟹座', start: '06-22', end: '07-22' },
  { sign: '狮子座', start: '07-23', end: '08-22' },
  { sign: '处女座', start: '08-23', end: '09-22' },
  { sign: '天秤座', start: '09-23', end: '10-23' },
  { sign: '天蝎座', start: '10-24', end: '11-22' },
  { sign: '射手座', start: '11-23', end: '12-21' }
]

const LUNAR_INFO = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
]

const GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const LUNAR_MONTHS = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']
const LUNAR_DAYS = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十']

const ELEMENT_MAP = {
  甲: '木', 乙: '木',
  丙: '火', 丁: '火',
  戊: '土', 己: '土',
  庚: '金', 辛: '金',
  壬: '水', 癸: '水'
}

const ELEMENT_DATA = {
  木: {
    label: '元素偏好木',
    tasks: [
      '先把待办结构理顺，再推进最重要的一件。',
      '适合学习输入，给自己留一段安静时间。',
      '今天把最想推进的方向写下来，不超过两件。',
      '适合整理资料、笔记和半成品，把信息收拢一遍。',
      '扎扎实实做一件事，不贪多，今天适合深耕。',
      '先把结构梳理清楚再动手，节奏比速度更重要。',
      '设定一个小目标并完成它，推进感会更强。'
    ],
    month: '这个月更适合把事情梳理清楚，先搭好结构再扩张。',
    year: '这一年更适合围绕成长和学习做长期积累。',
    color: '青竹绿'
  },
  火: {
    label: '元素偏好火',
    tasks: [
      '先把真正重要的话讲清楚。',
      '适合把想法、项目或提案往前推。',
      '今天适合把卡着的沟通或决定往前推一步。',
      '先把最重要的一件事做出来，再处理其他信息。',
      '适合主动表达，别让重要的话一直藏着没说。',
      '先把已经想清楚的事情执行出来，别再想了。',
      '今天适合做决定，想清楚就先行动。'
    ],
    month: '这个月更适合表达、出面和推进重要沟通。',
    year: '这一年更适合围绕曝光、表达和主动争取来走。',
    color: '曙光橙'
  },
  土: {
    label: '元素偏好土',
    tasks: [
      '先整理环境和日程，让状态稳下来。',
      '适合把基础盘、资料和流程收一遍。',
      '今天适合把手头未完的事情稳步推进一步。',
      '先把需要确认的事项整理好，再逐一处理。',
      '做一件能让基础更扎实的事，比开新坑更值。',
      '今天不适合开新坑，先把已有的事情收一收。',
      '先稳住当前状态，再考虑下一步怎么扩张。'
    ],
    month: '这个月更适合把基础盘守稳，不用着急铺太大。',
    year: '这一年更适合围绕稳定、沉淀和长期积累来安排。',
    color: '暖米色'
  },
  金: {
    label: '元素偏好金',
    tasks: [
      '适合做减法，删掉不必要的任务。',
      '先判断优先级，再决定今天投入到哪里。',
      '今天适合审视清单，删掉不必要的承诺。',
      '把最核心的一件事单独列出来，专注完成。',
      '适合做评估和判断，不必急着开新项目扩张。',
      '先整理思路，把真正值得做的事挑出来。',
      '今天适合把该拒绝的事情清楚地说不。'
    ],
    month: '这个月更适合做取舍，把资源集中给真正重要的方向。',
    year: '这一年更适合围绕判断、清理和收口来建立秩序。',
    color: '晨雾银'
  },
  水: {
    label: '元素偏好水',
    tasks: [
      '先记下灵感，不用急着一步到位。',
      '适合安排一点放松时间，让思路重新流动起来。',
      '今天跟着感觉走，把碎片想法先存起来再说。',
      '给自己留一点无计划的时间，灵感更容易来。',
      '适合做一些新的尝试，不必追求完整结果。',
      '今天适合观察和感受，不必急着下结论。',
      '先让思维放松一下，再重新看最重要的那件事。'
    ],
    month: '这个月更适合观察、灵活调整和保留流动空间。',
    year: '这一年更适合围绕灵感、内容和人与人的连接来展开。',
    color: '深海蓝'
  }
}

const FOCUS_PRESETS = {
  work: {
    title: '先把最重要的一件事做出来',
    summary: '今天更适合收口和推进，不适合被消息流带着跑。',
    chips: ['先聚焦', '少切换', '先推进'],
    plan: ['推进日', '收口日', '沟通日'],
    pitfall: '别同时开太多窗口，也别因为消息提醒把注意力切碎。'
  },
  relationship: {
    title: '今天适合把话说轻一点',
    summary: '先确认对方真正关心什么，再表达自己的期待，沟通会顺很多。',
    chips: ['先倾听', '再表达', '少误会'],
    plan: ['沟通日', '修复日', '缓冲日'],
    pitfall: '别抢着给答案，也别在情绪刚上来的时候急着下结论。'
  },
  rest: {
    title: '先把身体状态放回前面',
    summary: '今天更适合做减法，给自己留一点恢复和整理的空间。',
    chips: ['先恢复', '做减法', '补状态'],
    plan: ['休整日', '轻推进', '缓一缓'],
    pitfall: '不要把恢复时间也排满，真正的休整不是换个任务继续忙。'
  },
  creative: {
    title: '灵感更适合先记下来，再慢慢展开',
    summary: '今天适合记录碎片想法，不必一步到位做成完整成品。',
    chips: ['先记录', '再展开', '少自我否定'],
    plan: ['采集日', '整理日', '发散日'],
    pitfall: '先别急着删想法，灵感阶段最怕边想边否定自己。'
  }
}

const DREAM_LIBRARY = {
  考试: { content: '通常对应近期对结果、评价或时间节点的担心。先把压在心里的事拆成一小步，会更有掌控感。', related: ['压力', '准备', '掌控感'] },
  下雨: { content: '更像情绪在找出口，也提醒你补一补能量。给自己留一点慢下来的时间，会舒服很多。', related: ['情绪', '放松', '恢复'] },
  迟到: { content: '常常对应时间焦虑或安排过满，提醒你重新评估节奏，不要一次塞太多事情。', related: ['时间', '节奏', '焦虑'] },
  搬家: { content: '往往意味着阶段变化、边界调整或对新生活的期待，适合重新收拾优先级。', related: ['变化', '边界', '阶段'] },
  面试: { content: '说明你对表现、比较或结果还在用力，先把自己真正拿得出手的亮点列出来会更稳。', related: ['表现', '准备', '信心'] },
  堵车: { content: '多半是被琐事卡住的感觉，提醒你做一次减法，把不必要的任务先挪开。', related: ['卡住', '减法', '优先级'] },
  迷路: { content: '常常对应目标感不清，适合先写下此刻最想推进的三件事，把方向重新抓回来。', related: ['方向', '目标', '收心'] },
  飞行: { content: '更像在提醒你想突破现实限制，也提醒你把大胆想法和可落地安排放在一起看。', related: ['自由', '突破', '落地'] }
}

const nicknameInput = document.getElementById('nickname')
const genderInput = document.getElementById('gender')
const birthDateInput = document.getElementById('birth-date')
const birthTimeInput = document.getElementById('birth-time')
const focusInput = document.getElementById('focus')
const generateButton = document.getElementById('generate-button')
const profileHint = document.getElementById('profile-hint')
const resultTitle = document.getElementById('result-title')
const resultMeta = document.getElementById('result-meta')
const resultSummary = document.getElementById('result-summary')
const resultChips = document.getElementById('result-chips')
const resultFooter = document.getElementById('result-footer')
const timelineList = document.getElementById('timeline-list')
const dayDetailTitle = document.getElementById('day-detail-title')
const dayDetailSummary = document.getElementById('day-detail-summary')
const dayDetailChips = document.getElementById('day-detail-chips')
const monthTitle = document.getElementById('month-title')
const monthSummary = document.getElementById('month-summary')
const monthChips = document.getElementById('month-chips')
const yearTitle = document.getElementById('year-title')
const yearSummary = document.getElementById('year-summary')
const yearChips = document.getElementById('year-chips')
const monthPoints = document.getElementById('month-points')
const yearPoints = document.getElementById('year-points')
const dreamInput = document.getElementById('dream-input')
const dreamButton = document.getElementById('dream-button')
const keywordRow = document.getElementById('keyword-row')
const dreamResult = document.getElementById('dream-result')
const posterModeLabel = document.getElementById('poster-mode-label')
const posterName = document.getElementById('poster-name')
const posterTitle = document.getElementById('poster-title')
const posterSummary = document.getElementById('poster-summary')
const posterChips = document.getElementById('poster-chips')
const posterFoot = document.getElementById('poster-foot')
const posterSwitches = document.querySelectorAll('.poster-switch')

let currentDays = []
let activeDayIndex = 0
let activePosterMode = 'today'

function makeCstDate(year, monthIndex, day) {
  return new Date(Date.UTC(year, monthIndex, day) + 8 * 3600 * 1000)
}

const lunarBaseDate = makeCstDate(1900, 0, 31)
const lunarCycBase = makeCstDate(1900, 0, 6)

function yearDays(year) {
  let sum = 348
  const info = LUNAR_INFO[year - 1900]
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    sum += info & i ? 1 : 0
  }
  return sum + leapDays(year)
}

function leapDays(year) {
  const info = LUNAR_INFO[year - 1900]
  if ((info & 0xf) === 0) return 0
  return info & 0x10000 ? 30 : 29
}

function leapMonthOf(year) {
  return LUNAR_INFO[year - 1900] & 0xf
}

function monthDays(year, month) {
  return LUNAR_INFO[year - 1900] & (0x10000 >> month) ? 30 : 29
}

function getCyclical(num) {
  return `${GAN[num % 10]}${ZHI[num % 12]}`
}

function solarToLunar(dateStr) {
  if (!dateStr) return null
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = makeCstDate(year, month - 1, day)
  if (Number.isNaN(date.getTime())) return null

  let offset = Math.floor((date - lunarBaseDate) / 86400000)
  let lunarYear = 1900
  let temp = 0

  while (lunarYear < 2101 && offset > 0) {
    temp = yearDays(lunarYear)
    offset -= temp
    lunarYear += 1
  }

  if (offset < 0) {
    offset += temp
    lunarYear -= 1
  }

  const leapMonth = leapMonthOf(lunarYear)
  let isLeap = false
  let lunarMonth = 1

  while (lunarMonth < 13 && offset > 0) {
    if (leapMonth > 0 && lunarMonth === leapMonth + 1 && !isLeap) {
      lunarMonth -= 1
      isLeap = true
      temp = leapDays(lunarYear)
    } else {
      temp = monthDays(lunarYear, lunarMonth)
    }
    offset -= temp
    if (isLeap && lunarMonth === leapMonth) isLeap = false
    lunarMonth += 1
  }

  if (offset < 0) {
    offset += temp
    lunarMonth -= 1
  }

  const lunarDay = offset + 1
  return {
    lunarMonthText: `${isLeap ? '闰' : ''}${LUNAR_MONTHS[lunarMonth - 1]}月`,
    lunarDayText: LUNAR_DAYS[lunarDay - 1] || '',
    cyclicalDay: getCyclical(Math.floor((date - lunarCycBase) / 86400000) + 15)
  }
}

function parseHourLabel(timeStr = '08:00') {
  const [hourString = '0'] = String(timeStr).split(':')
  const hour = Number(hourString)
  if (hour >= 23 || hour < 1) return '子时节奏'
  if (hour < 3) return '丑时节奏'
  if (hour < 5) return '寅时节奏'
  if (hour < 7) return '卯时节奏'
  if (hour < 9) return '辰时节奏'
  if (hour < 11) return '巳时节奏'
  if (hour < 13) return '午时节奏'
  if (hour < 15) return '未时节奏'
  if (hour < 17) return '申时节奏'
  if (hour < 19) return '酉时节奏'
  if (hour < 21) return '戌时节奏'
  return '亥时节奏'
}

function getZodiacByDate(dateStr) {
  if (!dateStr) return '资料待补全'
  const monthDay = dateStr.slice(5)
  for (const item of ZODIAC_BOUNDARIES) {
    if (item.start <= item.end) {
      if (monthDay >= item.start && monthDay <= item.end) return item.sign.replace('座', '风格')
    } else if (monthDay >= item.start || monthDay <= item.end) {
      return item.sign.replace('座', '风格')
    }
  }
  return '摩羯风格'
}

function getElementProfile(dateStr, timeStr) {
  const lunar = solarToLunar(dateStr)
  const cyclicalDay = lunar?.cyclicalDay || '甲子'
  const dayStem = cyclicalDay.charAt(0) || '甲'
  const element = ELEMENT_MAP[dayStem] || '木'
  return {
    element,
    hourLabel: parseHourLabel(timeStr),
    lunarText: lunar ? `${lunar.lunarMonthText}${lunar.lunarDayText}` : '',
    detail: ELEMENT_DATA[element] || ELEMENT_DATA.木
  }
}

function formatWeekday(date) {
  return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]
}

function getProfileState() {
  const name = nicknameInput.value.trim() || '大美丽'
  const birthDate = birthDateInput.value || '1996-08-18'
  const birthTime = birthTimeInput.value || '08:30'
  const focus = focusInput.value || 'work'
  return {
    name,
    gender: genderInput.value || '保密',
    birthDate,
    birthTime,
    focus,
    zodiac: getZodiacByDate(birthDate),
    elementProfile: getElementProfile(birthDate, birthTime)
  }
}

function buildDays(profile) {
  const base = new Date()
  const focus = FOCUS_PRESETS[profile.focus]
  const detail = profile.elementProfile.detail
  const states = [
    { label: '推荐', title: '适合先推进', text: '把已经启动的事情往前推一步。', score: '88 分' },
    { label: '放缓', title: '适合少排新事', text: '先做减法，减少临时任务。', score: '71 分' },
    { label: '推荐', title: '适合沟通确认', text: '把重要信息讲清楚，补确认更合适。', score: '86 分' },
    { label: '放缓', title: '适合整理缓冲', text: '更适合查漏补缺和回收状态。', score: '73 分' }
  ]

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(base)
    date.setDate(base.getDate() + index)
    const state = states[index % states.length]
    return {
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      weekday: formatWeekday(date),
      label: state.label,
      title: state.title,
      tip: `${state.text} ${detail.tasks[index % detail.tasks.length]}`,
      score: state.score,
      chips: [focus.plan[index % focus.plan.length], detail.color, state.label === '推荐' ? '安排重点事' : '留缓冲']
    }
  })
}

function renderResult(profile) {
  const focus = FOCUS_PRESETS[profile.focus]
  const element = profile.elementProfile.detail

  profileHint.textContent = `${profile.name} · ${profile.zodiac} · ${element.label} · ${profile.elementProfile.hourLabel}${profile.elementProfile.lunarText ? ` · ${profile.elementProfile.lunarText}` : ''}`
  resultTitle.textContent = `${profile.name}，${focus.title}`
  resultMeta.innerHTML = [profile.zodiac, element.label, profile.elementProfile.hourLabel]
    .map((item) => `<span>${item}</span>`).join('')
  resultSummary.textContent = `${focus.summary} ${element.tasks[0]}`
  resultChips.innerHTML = [...focus.chips, element.color].map((item) => `<span>${item}</span>`).join('')
  resultFooter.textContent = `建议：${element.tasks[1]} 避坑提醒：${focus.pitfall}`
}

function renderDays(profile) {
  currentDays = buildDays(profile)
  activeDayIndex = 0
  timelineList.innerHTML = currentDays.map((day, index) => `
    <article class="day-card ${index === 0 ? 'is-active' : ''}" data-index="${index}">
      <span>${day.weekday}</span>
      <strong>${day.title}</strong>
      <div class="day-score">${day.score}</div>
      <p>${day.tip}</p>
    </article>
  `).join('')
  renderDayDetail(0)
  const todayScoreEl = document.getElementById('today-score')
  if (todayScoreEl && currentDays[0]) {
    todayScoreEl.textContent = currentDays[0].score.replace(' 分', '')
  }
}

function renderDayDetail(index) {
  const day = currentDays[index]
  if (!day) return
  activeDayIndex = index
  timelineList.querySelectorAll('.day-card').forEach((card, cardIndex) => {
    card.classList.toggle('is-active', cardIndex === index)
  })
  dayDetailTitle.textContent = `${day.weekday}更适合${day.title.replace('适合', '')}`
  dayDetailSummary.textContent = day.tip
  dayDetailChips.innerHTML = day.chips.map((item) => `<span>${item}</span>`).join('')
}

function renderMonthYear(profile) {
  const element = profile.elementProfile.detail
  monthTitle.textContent = '这个月先把主线拎出来'
  monthSummary.textContent = element.month
  monthChips.innerHTML = ['本月主线', '先做重点事', element.color].map((item) => `<span>${item}</span>`).join('')
  monthPoints.innerHTML = [
    ['本月先抓', profile.focus === 'relationship' ? '先把最重要的一段关系或沟通问题理顺。' : profile.focus === 'creative' ? '先把最有感觉的一个主题持续做深。' : profile.focus === 'rest' ? '先把身体和作息稳住，再谈扩张。' : '先把最值得持续推进的一件事拎出来。'],
    ['适合动作', element.tasks[0]],
    ['避坑提醒', FOCUS_PRESETS[profile.focus].pitfall]
  ].map(([title, text]) => `
    <div class="insight-point">
      <strong>${title}</strong>
      <span>${text}</span>
    </div>
  `).join('')

  yearTitle.textContent = '全年更适合围绕一条主线去走'
  yearSummary.textContent = `${element.year} ${profile.zodiac}更适合把重要资源集中在 1 到 2 条长期方向上。`
  yearChips.innerHTML = ['年度关键词', profile.zodiac, element.label].map((item) => `<span>${item}</span>`).join('')
  yearPoints.innerHTML = [
    ['年度关键词', profile.focus === 'relationship' ? '关系与边界' : profile.focus === 'creative' ? '灵感与表达' : profile.focus === 'rest' ? '恢复与稳定' : '推进与收口'],
    ['重点月份', profile.focus === 'creative' ? '灵感更旺的月份适合集中输出，不必平均发力。' : '更适合把重要安排留给状态更稳、方向更清楚的时候。'],
    ['年度提醒', '别什么都想抓，全年更适合围绕一条主线反复做深。']
  ].map(([title, text]) => `
    <div class="insight-point">
      <strong>${title}</strong>
      <span>${text}</span>
    </div>
  `).join('')
}

function renderPoster(profile) {
  const posterDateEl = document.getElementById('poster-date')
  if (posterDateEl) {
    const now = new Date()
    posterDateEl.textContent = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
  }
  const focus = FOCUS_PRESETS[profile.focus]
  const element = profile.elementProfile.detail
  posterName.textContent = profile.name
  if (activePosterMode === 'month') {
    posterModeLabel.textContent = '月度结果卡片'
    posterTitle.textContent = '这个月先把主线拎出来'
    posterSummary.textContent = `${element.month} 本月更适合把资源给到真正重要的那一件事。`
    posterChips.innerHTML = ['本月主线', element.color, '先抓重点'].map((item) => `<span>${item}</span>`).join('')
    posterFoot.textContent = `${profile.zodiac} · ${element.label} · 本月重点`
  } else if (activePosterMode === 'year') {
    posterModeLabel.textContent = '年度结果卡片'
    posterTitle.textContent = '全年先围绕一条主线走'
    posterSummary.textContent = `${element.year} 年度关键词和重点月份先拎出来，才更容易做长线安排。`
    posterChips.innerHTML = ['年度关键词', profile.zodiac, '重点月份'].map((item) => `<span>${item}</span>`).join('')
    posterFoot.textContent = `${profile.zodiac} · ${element.label} · 年度关键词`
  } else {
    posterModeLabel.textContent = '今日结果卡片'
    posterTitle.textContent = focus.title
    posterSummary.textContent = `${focus.summary} ${element.tasks[0]}`
    posterChips.innerHTML = [...focus.chips, element.color].map((item) => `<span>${item}</span>`).join('')
    posterFoot.textContent = `${profile.zodiac} · ${element.label} · ${profile.elementProfile.hourLabel}`
  }
}

function renderDreamResult(keyword = dreamInput.value.trim() || '考试') {
  const entry = DREAM_LIBRARY[keyword]
  if (!entry) {
    dreamResult.innerHTML = `
      <h3>${keyword}</h3>
      <p>这个词当前没有精确匹配。先给一个通用提醒：如果最近反复出现同类主题，多半说明你对某件事还有没整理清楚的担心，先写下来会更轻松。</p>
      <div class="mini-chip-row">
        <span>先记下来</span>
        <span>找相近主题</span>
        <span>从情绪入手</span>
      </div>
    `
    return
  }

  dreamResult.innerHTML = `
    <h3>${keyword}</h3>
    <p>${entry.content}</p>
    <div class="mini-chip-row">
      ${entry.related.map((item) => `<span>${item}</span>`).join('')}
    </div>
  `
}

function renderKeywordSuggestions() {
  keywordRow.innerHTML = Object.keys(DREAM_LIBRARY)
    .map((keyword) => `<button type="button" data-keyword="${keyword}">${keyword}</button>`)
    .join('')
}

function renderAll() {
  const profile = getProfileState()
  renderResult(profile)
  renderDays(profile)
  renderMonthYear(profile)
  renderPoster(profile)
}

generateButton.addEventListener('click', renderAll)

timelineList.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof HTMLElement)) return
  const card = target.closest('.day-card')
  if (!card) return
  const index = Number(card.dataset.index)
  if (Number.isNaN(index)) return
  renderDayDetail(index)
})

dreamButton.addEventListener('click', () => renderDreamResult())

dreamInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    renderDreamResult()
  }
})

keywordRow.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof HTMLButtonElement)) return
  const keyword = target.dataset.keyword
  if (!keyword) return
  dreamInput.value = keyword
  renderDreamResult(keyword)
})

posterSwitches.forEach((button) => {
  button.addEventListener('click', () => {
    activePosterMode = button.dataset.posterMode || 'today'
    posterSwitches.forEach((item) => item.classList.toggle('is-active', item === button))
    renderPoster(getProfileState())
  })
})

renderKeywordSuggestions()
renderDreamResult()
renderAll()

const savePosterBtn = document.getElementById('save-poster')
if (savePosterBtn) {
  savePosterBtn.addEventListener('click', () => {
    const board = document.getElementById('poster-board')
    if (!board) return
    savePosterBtn.textContent = '生成中…'
    savePosterBtn.disabled = true
    html2canvas(board, { scale: 2, useCORS: true, backgroundColor: null }).then((canvas) => {
      const link = document.createElement('a')
      link.download = `问问日常_${activePosterMode === 'month' ? '月度' : activePosterMode === 'year' ? '年度' : '今日'}卡片.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      savePosterBtn.textContent = '📥 保存卡片图片'
      savePosterBtn.disabled = false
    }).catch(() => {
      savePosterBtn.textContent = '📥 保存卡片图片'
      savePosterBtn.disabled = false
    })
  })
}
