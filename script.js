const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.site-nav');
const form = document.querySelector('#consultation-form');
const status = document.querySelector('.form-status');

menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  const contact = form.elements.contact.value.trim();
  status.classList.remove('error');
  if (!name || !contact) {
    status.textContent = '請填寫姓名與聯絡方式後再送出。';
    status.classList.add('error');
    return;
  }
  status.textContent = '這是展示用流程：資料尚未傳送。LINE 連結與正式收件機制啟用後，才能開始線上諮詢。';
  form.reset();
});
