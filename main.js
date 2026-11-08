// =========================================================
// CONFIGURAÇÃO: número do WhatsApp da Isadora
// Formato: 55 + DDD + número, só dígitos. Ex.: 5549999998888
// =========================================================
const WHATSAPP_NUMBER = '5549000000000';

document.querySelectorAll('[data-wa]').forEach((el) => {
  const msg = el.getAttribute('data-wa') || '';
  el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  el.target = '_blank';
  el.rel = 'noopener';
});

// ---------------------------------------------------------
// Menu: transparente sobre a foto, branco ao rolar
// ---------------------------------------------------------
const header = document.querySelector('.header');
const onHeaderScroll = () => header.classList.toggle('is-solid', window.scrollY > 40);
onHeaderScroll();
window.addEventListener('scroll', onHeaderScroll, { passive: true });

// ---------------------------------------------------------
// Especialidades: abas que também mudam conforme a rolagem
// ---------------------------------------------------------
const tabsRoot = document.querySelector('[data-tabs]');
const track = document.querySelector('[data-spec]');
if (tabsRoot) {
  const tabs = [...tabsRoot.querySelectorAll('[role="tab"]')];
  let current = 0;

  const select = (index, focus = false) => {
    if (index === current && !focus) return;
    current = index;
    tabs.forEach((t, i) => {
      const on = i === index;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tabs[index].focus();
  };

  // O modo "rolagem" só vale quando o trilho está fixo (telas grandes)
  const scrollMode = () => track && getComputedStyle(track.querySelector('.spec__sticky')).position === 'sticky';

  const segment = () => {
    const rect = track.getBoundingClientRect();
    const total = track.offsetHeight - window.innerHeight;
    return { top: rect.top + window.scrollY, total };
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      if (scrollMode()) {
        const { top, total } = segment();
        window.scrollTo({ top: top + (total / tabs.length) * i + 4, behavior: 'smooth' });
      }
      select(i);
    });
    tab.addEventListener('keydown', (e) => {
      const d = ['ArrowDown', 'ArrowRight'].includes(e.key) ? 1 : ['ArrowUp', 'ArrowLeft'].includes(e.key) ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      select((i + d + tabs.length) % tabs.length, true);
    });
  });

  const onScroll = () => {
    if (!scrollMode()) return;
    const { top, total } = segment();
    const progress = Math.min(Math.max((window.scrollY - top) / total, 0), 0.9999);
    const raw = progress * tabs.length;
    const index = Math.floor(raw);
    select(index);
    tabs[index].style.setProperty('--p', `${Math.round((raw - index) * 100)}%`);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
}

// Carrossel de depoimentos
const scroller = document.querySelector('[data-scroller]');
if (scroller) {
  const step = () => (scroller.firstElementChild?.getBoundingClientRect().width || 300) + 16;
  document.querySelector('[data-prev]')?.addEventListener('click', () => scroller.scrollBy({ left: -step(), behavior: 'smooth' }));
  document.querySelector('[data-next]')?.addEventListener('click', () => scroller.scrollBy({ left: step(), behavior: 'smooth' }));
}
