// Model: catálogo. Preços em centavos (valores de exemplo, ajuste os reais).
export const CATEGORIES = [
  ['paes', 'Pães tradicionais'], ['artesanais', 'Pães artesanais'], ['bolos', 'Bolos e tortas'],
  ['salgados', 'Salgados'], ['doces', 'Doces e sobremesas'], ['bebidas', 'Cafés e bebidas'],
];
const p = (id, cat, name, desc, price, img, pop = false) => ({ id, cat, name, desc, price, img: `assets/img/${img}.jpg`, pop });
export const PRODUCTS = [
  p('frances', 'paes', 'Pão francês (un.)', 'Casquinha crocante e miolo macio, saindo toda hora.', 100, 'frances', true),
  p('baguete', 'paes', 'Baguete', 'Crocante por fora, leve por dentro. Perfeita com manteiga.', 750, 'baguete'),
  p('pdq-cx', 'paes', 'Pão de queijo (6 un.)', 'Mineirinho quentinho, casquinha dourada e recheio elástico.', 1200, 'pao-queijo-cesta', true),
  p('rustico', 'artesanais', 'Pão rústico de fermentação natural', 'Longa fermentação, casca firme e miolo alveolado.', 2200, 'bread-rustic', true),
  p('graos', 'artesanais', 'Pão de grãos e sementes', 'Integral, cheio de sementes e muito sabor.', 2400, 'loaves'),
  p('italiano', 'artesanais', 'Pão italiano de azeite', 'Macio, aromático, ótimo para sanduíches.', 1800, 'counter'),
  p('cenoura', 'bolos', 'Bolo de cenoura com cobertura', 'Fatia generosa com calda cremosa de chocolate.', 1400, 'counter'),
  p('torta', 'bolos', 'Tortinha de frutas vermelhas', 'Massa amanteigada, creme e frutas frescas.', 1600, 'counter'),
  p('coxinha', 'salgados', 'Coxinha de frango', 'Massa sedosa, recheio caprichado e crocância na medida.', 750, 'coxinha', true),
  p('mix', 'salgados', 'Mix de salgados fritos (10 un.)', 'Coxinha, risole e bolinhas de queijo.', 2500, 'salgados'),
  p('enrolado', 'salgados', 'Enroladinho de presunto e queijo', 'Massa macia dourada com ervas por cima.', 800, 'enroladinho'),
  p('misto', 'salgados', 'Misto quente', 'Pão na chapa, presunto e queijo derretido.', 1100, 'misto', true),
  p('sonho', 'doces', 'Sonho de creme', 'Massa fofinha, creme de baunilha e açúcar por cima.', 900, 'sonho-creme', true),
  p('sonho-ac', 'doces', 'Sonho açucarado', 'Fofinho, frito na hora e polvilhado de açúcar.', 800, 'sonho-acucar'),
  p('cafe', 'bebidas', 'Café coado / espresso', 'Café especial, forte e aromático.', 600, 'pao-queijo-cafe'),
  p('cappuccino', 'bebidas', 'Cappuccino', 'Espresso, leite vaporizado e espuma cremosa.', 1000, 'menu-board'),
  p('suco', 'bebidas', 'Suco natural (400 ml)', 'Frutas da estação, sem conservantes.', 900, 'drinks'),
  p('agua', 'bebidas', 'Água com ou sem gás', 'Gelada e na medida.', 400, 'drinks'),
];
export const byId = (id) => PRODUCTS.find((x) => x.id === id);
