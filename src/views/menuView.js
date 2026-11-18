import { el } from '../utils/dom.js';
import { brl } from '../config.js';
import { CATEGORIES } from '../models/products.js';
export const productCard = (p, onAdd) => el('article', { class: 'card reveal' },
  el('img', { src: p.img, alt: p.name, loading: 'lazy' }),
  el('div', { class: 'card-body' }, el('h3', {}, p.name), el('p', {}, p.desc),
    el('div', { class: 'card-foot' }, el('strong', {}, brl(p.price)), el('button', { class: 'btn btn-small', 'aria-label': `Adicionar ${p.name}`, onclick: () => onAdd(p.id) }, '+ Adicionar'))));
export const renderGrid = (root, list, onAdd) => root.replaceChildren(...list.map((p) => productCard(p, onAdd)));
export const renderTabs = (root, active, onPick) => root.replaceChildren(...CATEGORIES.map(([id, label]) =>
  el('button', { class: 'tab' + (id === active ? ' on' : ''), role: 'tab', 'aria-selected': String(id === active), onclick: () => onPick(id) }, label)));
