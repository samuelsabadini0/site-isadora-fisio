// =========================================================
// CONFIGURAÇÃO: link do WhatsApp usado em todos os botões (data-wa)
// =========================================================
const WHATSAPP_LINK = 'https://wa.me/5549984340145?text=Ol%C3%A1%2C%20Isadora!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20fisioterap%C3%AAutica%20domiciliar%20para%20o%20meu%20familiar%20idoso.%20Poderia%20me%20passar%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20atendimento%20e%20os%20hor%C3%A1rios%20dispon%C3%ADveis%3F';

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
