import { CONFIG, brl } from '../config.js';
import { PRODUCTS, CATEGORIES } from '../models/products.js';
import { Cart } from '../models/cart.js';
import { renderGrid, renderTabs } from '../views/menuView.js';
import { renderCart } from '../views/cartView.js';
import { el } from '../utils/dom.js';
const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
const cart = new Cart(), drawer = $('.drawer'), overlay = $('.overlay');
let cat = CATEGORIES[0][0];

const drawCart = () => renderCart(cart, $('#cart-items'), $('#cart-total'), $$('.cart-count'));
cart.onChange(drawCart); drawCart();
const add = (id) => { cart.add(id); const b = $('.cart-open'); b.classList.add('bump'); setTimeout(() => b.classList.remove('bump'), 300); };
const drawMenu = () => { renderTabs($('#tabs'), cat, (id) => { cat = id; drawMenu(); }); renderGrid($('#menu-grid'), PRODUCTS.filter((p) => p.cat === cat), add); reveal(); };
renderGrid($('#popular-grid'), PRODUCTS.filter((p) => p.pop), add); drawMenu();

// Carrinho (drawer)
const toggle = (open) => { drawer.classList.toggle('open', open); drawer.setAttribute('aria-hidden', String(!open)); overlay.hidden = !open; document.body.classList.toggle('lock', open); };
$$('.cart-open').forEach((b) => b.addEventListener('click', () => toggle(true)));
$('.close').onclick = overlay.onclick = () => toggle(false);
addEventListener('keydown', (e) => e.key === 'Escape' && toggle(false));
$('#clear').onclick = () => cart.clear();
$('#checkout').onclick = () => {
  if (!cart.count) return;
  const name = $('#cust-name').value.trim().slice(0, 60), note = $('#cust-note').value.trim().slice(0, 200);
  const parts = ['Olá, Padaria Saraiva! Gostaria de fazer um pedido:', '',
    ...cart.lines.map(({ product: p, qty }) => `• ${qty}x ${p.name} – ${brl(p.price * qty)}`), '', `*Total: ${brl(cart.total)}*`];
  if (name) parts.push(`Nome: ${name}`); if (note) parts.push(`Obs.: ${note}`);
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(parts.join('\n'))}`, '_blank', 'noopener,noreferrer');
};

// Contato
const b = (k) => $(`[data-bind=${k}]`);
b('address').textContent = CONFIG.address; b('phone').textContent = CONFIG.phone; b('phone').href = `tel:+${CONFIG.whatsapp}`;
b('wa').href = `https://wa.me/${CONFIG.whatsapp}`; b('ig').href = CONFIG.instagram; b('fb').href = CONFIG.facebook;
$('#hours').replaceChildren(...CONFIG.hours.map(([d, h]) => el('li', {}, `${d}: ${h}`)));
$('#map').src = `https://www.google.com/maps?q=${encodeURIComponent(CONFIG.address)}&output=embed`;
$('#year').textContent = new Date().getFullYear();

// Menu mobile + header
const burger = $('.burger');
burger.onclick = () => { const o = $('#nav').classList.toggle('open'); burger.setAttribute('aria-expanded', String(o)); };
$$('#nav a').forEach((a) => a.addEventListener('click', () => { $('#nav').classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }));
addEventListener('scroll', () => $('.site-header').classList.toggle('scrolled', scrollY > 20), { passive: true });

// Revelar ao rolar
function reveal() { const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: .12 }); $$('.reveal:not(.in)').forEach((n) => io.observe(n)); }
reveal();

// Efeito 3D (tilt)
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) $$('.tilt').forEach((t) => {
  t.addEventListener('pointermove', (e) => { const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; t.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`; });
  t.addEventListener('pointerleave', () => (t.style.transform = ''));
});

// Carrossel
const slides = [['bread-rustic', 'Pão rústico'], ['counter', 'Balcão de pães e doces'], ['loaves', 'Pães artesanais'], ['menu-board', 'Cardápio do dia'], ['drinks', 'Bebidas frescas']];
const track = $('#carousel .slides'); let cur = 0, timer;
track.replaceChildren(...slides.map(([f, a]) => el('img', { src: `assets/img/${f}.jpg`, alt: a, loading: 'lazy' })));
const go = (i) => { cur = (i + slides.length) % slides.length; track.style.transform = `translateX(-${cur * 100}%)`; };
const auto = () => { clearInterval(timer); timer = setInterval(() => go(cur + 1), 5000); };
$('.car-btn.prev').onclick = () => { go(cur - 1); auto(); }; $('.car-btn.next').onclick = () => { go(cur + 1); auto(); }; auto();
