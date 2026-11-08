// =========================================================
// CONFIGURAÇÃO: número do WhatsApp da Isadora
// Formato: 55 + DDD + número, só dígitos. Ex.: 5549999998888
// =========================================================
const WHATSAPP_NUMBER = '5549000000000';

// Todo elemento com data-wa vira link do WhatsApp, com a sua mensagem pronta.
document.querySelectorAll('[data-wa]').forEach((el) => {
  const msg = el.getAttribute('data-wa') || '';
  el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  el.target = '_blank';
  el.rel = 'noopener';
});

// Cabeçalho: transparente sobre a foto, fixo e claro ao rolar.
const header = document.querySelector('.header');
const onScroll = () => header.classList.toggle('is-pinned', window.scrollY > 120);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Abas da seção "Por que em casa".
const tabs = [...document.querySelectorAll('[role="tab"]')];
const select = (tab) => {
  tabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
};
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => select(tab));
  tab.addEventListener('keydown', (e) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    const next = tabs[(i + dir + tabs.length) % tabs.length];
    select(next); next.focus();
  });
});
