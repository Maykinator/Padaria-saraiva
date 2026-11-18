import { el } from '../utils/dom.js';
import { brl } from '../config.js';
export function renderCart(cart, root, totalEl, countEls) {
  root.replaceChildren(...cart.lines.map(({ product: p, qty }) => el('li', {},
    el('img', { src: p.img, alt: '' }),
    el('div', {}, el('b', {}, p.name), el('small', {}, brl(p.price * qty)),
      el('div', { class: 'qty' },
        el('button', { 'aria-label': 'Diminuir', onclick: () => cart.setQty(p.id, qty - 1) }, '−'), el('span', {}, String(qty)),
        el('button', { 'aria-label': 'Aumentar', onclick: () => cart.setQty(p.id, qty + 1) }, '+'),
        el('button', { class: 'rm', 'aria-label': `Remover ${p.name}`, onclick: () => cart.setQty(p.id, 0) }, '🗑'))))));
  totalEl.textContent = brl(cart.total);
  countEls.forEach((c) => (c.textContent = cart.count));
  document.querySelector('.drawer').classList.toggle('is-empty', !cart.count);
}
