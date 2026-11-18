# Padaria Saraiva – Site oficial
Site estático em arquitetura **MVC** (JavaScript ES Modules, sem build, sem dependências).

- `index.html` → estrutura, SEO e CSP
- `src/config.js` → dados da padaria (WhatsApp, endereço, horários, redes)
- `src/models/` → `products.js` (catálogo) e `cart.js` (regras do carrinho)
- `src/views/` → `menuView.js` e `cartView.js` (renderização segura, sem innerHTML)
- `src/controllers/` → `appController.js` (eventos, menu, carrinho, carrossel, animações)
- `assets/` → CSS e imagens

## Antes de publicar
1. Edite `src/config.js` (WhatsApp com DDI+DDD, endereço, horários, Instagram/Facebook).
2. Ajuste nomes e preços em `src/models/products.js` (preços em centavos; os atuais são exemplos).

## Publicar no GitHub Pages
Suba a pasta num repositório → Settings → Pages → Deploy from branch → `main` / root.
ES Modules exigem http(s): localmente use `python3 -m http.server` (não abra o arquivo direto).

## Segurança
CSP restritiva, `createElement`/`textContent` (sem XSS), carrinho validado contra o catálogo, links externos com `noopener noreferrer`.
