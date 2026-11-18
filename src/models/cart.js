// Model: carrinho. Só aceita ids do catálogo e quantidades 1–99; persiste em localStorage.
import { byId } from './products.js';
const KEY = 'saraiva.cart.v1', clamp = (n) => Math.max(0, Math.min(99, Number.isInteger(n) ? n : 0));
export class Cart {
  constructor() { this.q = {}; this.listeners = []; try { const d = JSON.parse(localStorage.getItem(KEY) || '{}'); for (const [id, n] of Object.entries(d)) if (byId(id) && clamp(n)) this.q[id] = clamp(n); } catch { this.q = {}; } }
  onChange(fn) { this.listeners.push(fn); }
  #commit() { try { localStorage.setItem(KEY, JSON.stringify(this.q)); } catch {} this.listeners.forEach((f) => f()); }
  add(id) { if (byId(id)) { this.q[id] = clamp((this.q[id] || 0) + 1); this.#commit(); } }
  setQty(id, n) { if (!byId(id)) return; n = clamp(n); n ? (this.q[id] = n) : delete this.q[id]; this.#commit(); }
  clear() { this.q = {}; this.#commit(); }
  get lines() { return Object.entries(this.q).map(([id, qty]) => ({ product: byId(id), qty })); }
  get count() { return this.lines.reduce((s, l) => s + l.qty, 0); }
  get total() { return this.lines.reduce((s, l) => s + l.qty * l.product.price, 0); }
}
