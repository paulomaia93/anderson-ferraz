const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navegacao');
const topbar = document.querySelector('.topbar');
const mobile = window.matchMedia('(max-width: 760px)');

function setMenu(expanded) {
  menu.setAttribute('aria-expanded', String(expanded));
  nav.hidden = !expanded;
}

function syncMenu() {
  menu.hidden = !mobile.matches;
  setMenu(!mobile.matches);
}

syncMenu();
mobile.addEventListener('change', syncMenu);
menu.addEventListener('click', () => setMenu(nav.hidden));
nav.addEventListener('click', event => {
  if (mobile.matches && event.target.closest('a')) {
    setMenu(false);
    const destination = document.getElementById(event.target.closest('a').hash.slice(1));
    if (destination) {
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }
  }
});
topbar.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches && !nav.hidden) {
    setMenu(false);
    menu.focus();
  }
});

const caseDialog = document.querySelector('#case-dialog');

if (typeof caseDialog?.showModal === 'function') {
  const caseCompany = document.querySelector('#case-dialog-company');
  const caseTitle = document.querySelector('#case-dialog-title');
  const caseContent = document.querySelector('#case-dialog-content');

  document.querySelectorAll('#cases details').forEach(details => {
    const card = details.closest('article');
    const summary = details.querySelector('summary');
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'button case-trigger';
    trigger.textContent = summary.textContent;
    trigger.setAttribute('aria-label', summary.getAttribute('aria-label'));
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', caseDialog.id);
    trigger.addEventListener('click', () => {
      caseCompany.textContent = card.querySelector('.eyebrow').textContent;
      caseTitle.textContent = card.querySelector('h3').textContent;
      caseContent.replaceChildren(...Array.from(details.querySelectorAll('p'), paragraph => paragraph.cloneNode(true)));
      caseDialog.showModal();
    });
    details.before(trigger);
    details.hidden = true;
  });
}

const viewer = document.querySelector('#visualizador');
const largeImage = document.querySelector('#imagem-ampliada');

if (typeof viewer.showModal === 'function') {
  document.querySelectorAll('[data-image]').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      largeImage.alt = link.dataset.alt || link.querySelector('img').alt;
      largeImage.src = link.href;
      viewer.showModal();
    });
  });
}

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
});
