// =========================================================
// CONFIGURAÇÃO: link do WhatsApp usado em todos os botões (data-wa)
// =========================================================
const WHATSAPP_LINK = 'https://wa.me/5549984340145?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20fisioterap%C3%AAutica%20domiciliar%20para%20mim%20ou%20para%20um%20familiar%20idoso.%20Poderia%20me%20passar%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20atendimentos%20e%20hor%C3%A1rios%20dispon%C3%ADveis%3F';

document.querySelectorAll('[data-wa]').forEach((el) => {
  el.href = WHATSAPP_LINK;
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
