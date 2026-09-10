const state = {
  room: null,
  priorities: [],
  timeline: null,
};

const form = document.querySelector('#brief-form');
const summary = document.querySelector('#brief-summary');
const title = document.querySelector('#brief-title');
const status = document.querySelector('#brief-status');
const checklist = document.querySelector('#checklist');
const unknowns = document.querySelector('#unknowns');
const copyButton = document.querySelector('#copy-brief');

document.querySelectorAll('[data-field] button').forEach((button) => {
  button.setAttribute('aria-pressed', 'false');
  button.addEventListener('click', () => selectChoice(button));
});

function selectChoice(button) {
  const group = button.closest('[data-field]');
  const field = group.dataset.field;
  const value = button.dataset.value;
  const isSingle = group.dataset.single === 'true';
  const limit = Number(group.dataset.limit || 0);

  if (isSingle) {
    state[field] = value;
    group.querySelectorAll('button').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    return;
  }

  const selected = state[field];
  const activeIndex = selected.indexOf(value);
  if (activeIndex > -1) {
    selected.splice(activeIndex, 1);
  } else if (!limit || selected.length < limit) {
    selected.push(value);
  }

  group.querySelectorAll('button').forEach((item) => {
    item.setAttribute('aria-pressed', String(selected.includes(item.dataset.value)));
  });
}

function compactList(items) {
  if (!items.length) return '尚未選擇的重點';
  return items.join('、');
}

function buildBrief() {
  const room = state.room || '這個空間';
  const priorities = compactList(state.priorities);
  const timeline = state.timeline || '尚未確認的時間點';
  const windows = document.querySelector('#windows').value;
  const mood = document.querySelector('#mood').value;
  const notes = document.querySelector('#notes').value.trim();
  const unknownList = [];
  if (!state.room) unknownList.push('空間類型');
  if (!state.priorities.length) unknownList.push('最優先的生活需求');
  if (windows === '尚未確認') unknownList.push('窗戶數量與尺寸');
  if (mood === '尚未確認') unknownList.push('偏好的空間感受');

  const actions = [
    `確認 ${room} 的窗型、開口方向與實際尺寸`,
    state.priorities.length ? `在現場觀察「${priorities}」在早晚光線下的差異` : '在現場確認最想改善的採光、隱私或遮光問題',
    `${timeline}；討論丈量、提案與安裝可行的時間安排`,
  ];

  return {
    room,
    priorities,
    timeline,
    windows,
    mood,
    notes,
    unknownList,
    actions,
  };
}

function renderBrief(brief) {
  title.textContent = `${brief.room}的第一次諮詢，先從這些事開始。`;
  summary.textContent = `你目前最在意的是「${brief.priorities}」。${brief.windows === '尚未確認' ? '窗戶數量尚未確認，' : `目前預估 ${brief.windows}，`}可先把需求帶進現場丈量與材質討論。`;
  status.textContent = '需求摘要已整理';
  checklist.innerHTML = '';
  brief.actions.forEach((action) => {
    const item = document.createElement('li');
    item.textContent = action;
    checklist.appendChild(item);
  });
  unknowns.textContent = brief.unknownList.length
    ? `尚缺：${brief.unknownList.join('、')}。此外，現場光線、尺寸與最終材質仍需由丈量後確認。`
    : '現場光線、實際尺寸與最終材質，仍需由丈量後確認。';
  copyButton.disabled = false;
  copyButton.textContent = '複製摘要';
}

function briefText(brief) {
  return [
    'MORI 空間需求 Brief',
    `空間：${brief.room}`,
    `優先需求：${brief.priorities}`,
    `時間點：${brief.timeline}`,
    `窗戶：${brief.windows}`,
    `空間感受：${brief.mood}`,
    brief.notes ? `備註：${brief.notes}` : null,
    '',
    '現場優先確認：',
    ...brief.actions.map((action) => `- ${action}`),
    '',
    '提醒：此摘要不是報價或設計承諾；現場丈量與人工確認後再進入正式提案。',
  ].filter(Boolean).join('\n');
}

let currentBrief = null;
form.addEventListener('submit', (event) => {
  event.preventDefault();
  currentBrief = buildBrief();
  renderBrief(currentBrief);
  document.querySelector('.brief-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

copyButton.addEventListener('click', async () => {
  if (!currentBrief) return;
  try {
    await navigator.clipboard.writeText(briefText(currentBrief));
    copyButton.textContent = '已複製到剪貼簿';
  } catch {
    copyButton.textContent = '請手動複製摘要';
  }
});
