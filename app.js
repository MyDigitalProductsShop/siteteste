// LUCI4 WRATH — catálogo, navegação, busca e carrinho.
// Edite os produtos no array abaixo.

const products = [

  ['goregeous', 'Camiseta [GOREgeous.]', 210, 'camisetas', 'GOREgeous.'],
  ['goregeous-2', 'Camiseta [GOREgeous.]', 210, 'camisetas', 'GORE / 4LIFE'],
  ['moletom-desajustados', 'Moletom Zíper [DESAJUSTADOS]', 420, 'moletons', 'DESAJUSTADOS'],
  ['camiseta-desajustados', 'Camiseta [DESAJUSTADOS]', 160, 'camisetas', 'DESAJUSTADOS'],
  ['deangore', 'Camiseta [DEANgore]', 160, 'camisetas', 'DEANgore'],
  ['mygore', 'Camiseta [MYGORE]', 160, 'camisetas', 'MYGORE'],
  ['dead', 'Camiseta [DEAD]', 160, 'camisetas', 'DEAD'],
  ['n33dlove', 'Camiseta [N33Dlove]', 160, 'camisetas', 'N33Dlove'],
  ['tracking', 'Camiseta [TRACKING]', 160, 'camisetas', 'TRACKING'],
  ['c4nn1b4l', 'Camiseta [C4NN1B4L]', 160, 'camisetas', 'C4NN1B4L'],
  ['pulseiras', 'Pulseiras [死を想え] — 2 cores sortidas', 80, 'acessorios', '死を想え'],
  ['calca-stayparanoid', 'Calça [StayParanoid]', 360, 'calcas', 'PARANOID']
].map(([id, name, price, category, print], i) => ({ id, name, price, category, print, i }));

const BRL = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

let cart = JSON.parse(localStorage.getItem('luci4-cart') || '[]');
let selectedSize = 'M', selectedFit = 'Oversized', qty = 1, searchTerm = '';
const $ = s => document.querySelector(s);

function art(p, alternate = false) {
  let dark = ['#111', '#171717', '#202020', '#151515'][p.i % 4], ink = p.i % 5 === 0 ? '#d33a40' : '#d5d0c8';
  let isP = p.category === 'acessorios', isC = p.category === 'calcas', hood = p.category === 'moletons';
  const safe = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  let label = safe(p.print);
  return `<svg viewBox="0 0 420 540" xmlns="http://www.w3.org/2000/svg" aria-label="Ilustração provisória de ${safe(p.name)}" role="img"><defs><linearGradient id="bg${p.i}${alternate ? 'x' : ''}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${alternate ? '#323232' : '#2a2a2a'}"/><stop offset="1" stop-color="#101010"/></linearGradient><filter id="shadow${p.i}"><feDropShadow dx="4" dy="12" stdDeviation="10" flood-opacity=".6"/></filter></defs><rect width="420" height="540" fill="url(#bg${p.i}${alternate ? 'x' : ''})"/><path d="M0 0H420M0 540H420" stroke="#414141" stroke-width="1" opacity=".15"/>${isP ? `<g fill="none" stroke="#bcbcbc" stroke-width="21"><ellipse cx="155" cy="270" rx="53" ry="75" transform="rotate(-20 155 270)"/><ellipse cx="265" cy="270" rx="53" ry="75" transform="rotate(20 265 270)"/></g><g font-family="serif" font-size="40" fill="white" text-anchor="middle"><text x="210" y="420">死を想え</text></g>` : isC ? `<path d="M145 93L274 93 307 474 228 474 209 274 192 474 113 474Z" fill="${dark}" stroke="#444" stroke-width="3" filter="url(#shadow${p.i})"/><path d="M146 125H271M208 130V270" fill="none" stroke="#777" stroke-width="3"/><text x="209" y="214" font-size="18" font-family="monospace" text-anchor="middle" fill="${ink}">STAY</text><text x="209" y="235" font-size="18" font-family="monospace" text-anchor="middle" fill="${ink}">PARANOID</text>` : `<path d="M142 95L169 82Q209 112 251 82L278 95 357 147 320 242 285 222 287 474 130 474 135 222 100 242 62 147Z" fill="${dark}" stroke="#3f3f3f" stroke-width="3" filter="url(#shadow${p.i})"/><path d="M171 86Q210 143 249 86" fill="none" stroke="#464646" stroke-width="11"/><path d="M136 221L130 470M284 220L287 471" stroke="#363636" stroke-width="2"/>${hood ? `<path d="M171 84Q115 10 210 24Q303 10 249 84" fill="#161616" stroke="#444" stroke-width="4"/><path d="M209 140V474" stroke="#777" stroke-width="3"/>` : ''}<g transform="rotate(${alternate ? -5 : 0} 210 270)"><rect x="150" y="207" width="119" height="139" fill="#080808" stroke="${ink}" stroke-width="1"/><path d="M160 231L259 320M257 226L160 324" stroke="${ink}" opacity=".42" stroke-width="2"/><text x="209" y="265" fill="${ink}" font-family="Impact,Arial Black,sans-serif" font-weight="900" font-size="${label.length > 12 ? 11 : label.length > 9 ? 14 : 18}" text-anchor="middle">${label}</text><text x="209" y="285" fill="#aaa" font-family="monospace" font-size="9" text-anchor="middle">LUCI4 · WRATH</text><text x="209" y="307" fill="${ink}" font-family="Impact,sans-serif" font-size="25" text-anchor="middle">✦ WRATH ✦</text></g>`}<text x="210" y="512" fill="#888" font-size="10" text-anchor="middle" letter-spacing="3" font-family="monospace">LUCI4 WRATH / CONCEPT IMAGE</text></svg>`
}

function media(p, alt = false) {
  return `<div class="product-media">${art(p, alt)}<span class="tag">FRETE GRÁTIS +R$500</span></div>`
}

function card(p) {
  return `<article class="product-card" data-id="${p.id}"><a href="#/produto/${p.id}" aria-label="Ver ${p.name}">${media(p)}<p class="card-name">${p.name}</p><div class="card-price">${BRL(p.price)} <span>· até 3x sem juros</span></div></a><button class="card-add" data-add="${p.id}">VER PRODUTO →</button></article>`
}

function grid(items) {
  return `<div class="products">${items.map(card).join('')}</div>`
}

function home() {
  return `<section class="hero"><div class="hero-overlay"></div><div class="hero-content"><div class="eyebrow">DARK STREETWEAR LABEL</div><img class="hero-logo" src="assets/logo-branco-capa.png" alt="Luci4 Wrath"><p class="hero-sub">RUIDO, SOMBRA E IDENTIDADE PRÓPRIA.</p><a href="#/colecao/todos" class="outline-btn">EXPLORAR COLEÇÃO ↗</a></div></section><section class="section"><div class="section-heading"><div><div class="kicker">DROP 001 / COLLECTION</div><h2>ÚLTIMOS LANÇAMENTOS</h2></div><a href="#/colecao/todos">VER TUDO ↗</a></div>${grid(products.slice(0, 8))}</section><section class="editorial"><div class="kicker">NOT JUST CLOTHES — AN IDENTITY</div><h2>BORN FROM<br>WRATH.</h2><p>Peças para quem carrega personalidade forte, estética sombria e presença marcante em cada detalhe.</p><a class="outline-btn" href="#/colecao/todos">DESCUBRA A COLEÇÃO</a></section><section class="section"><div class="section-heading"><div><div class="kicker">EXPLORE THE ARCHIVE</div><h2>MAIS PRODUTOS</h2></div><a href="#/colecao/todos">VER TUDO ↗</a></div>${grid(products.slice(8))}</section>`
}

function collection(slug) {
  const names = { todos: 'TODOS OS PRODUTOS', camisetas: 'CAMISETAS', moletons: 'MOLETONS', acessorios: 'ACESSÓRIOS', calcas: 'CALÇAS' };
  let arr = products.filter(p => slug === 'todos' || p.category === slug).filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return `<div class="collection-heading"><div class="breadcrumbs"><a href="#/">INÍCIO</a> / ${names[slug] || 'PRODUTOS'}</div><h1>${names[slug] || 'PRODUTOS'}</h1></div><div class="collection-layout"><span>${arr.length} produtos</span><label>ORDENAR POR <select id="sortSelect"><option value="featured">DESTAQUES</option><option value="low">MENOR PREÇO</option><option value="high">MAIOR PREÇO</option><option value="name">NOME A–Z</option></select></label></div><section class="section" style="padding-top:12px"><div id="collectionGrid">${grid(arr)}</div></section>`
}

function detail(p) {
  selectedSize = 'M';
  selectedFit = 'Oversized';
  qty = 1;
  return `<div class="collection-heading"><div class="breadcrumbs"><a href="#/">INÍCIO</a> / <a href="#/colecao/${p.category}">${p.category.toUpperCase()}</a> / ${p.name}</div></div><section class="product-detail"><div class="gallery">${media(p)}${media(p, true)}${media(p)}</div><div class="detail-info"><div class="kicker">LUCI4 WRATH / COLLECTION</div><h1>${p.name}</h1><div class="detail-price">${BRL(p.price)}</div><div class="installment">3 x de ${BRL(p.price / 3)} sem juros</div>${p.category === 'camisetas' ? `<div class="option-label">MODELAGEM: <span id="fitSelected">OVERSIZED</span></div><div class="choices" id="fitChoices">${['Baby tee', 'Boxy', 'Oversized', 'Regular fit'].map(v => `<button class="choice ${v === 'Oversized' ? 'active' : ''}" data-fit="${v}">${v}</button>`).join('')}</div>` : ''}<div class="option-label">TAMANHO: <span id="sizeSelected">M</span></div><div class="choices" id="sizeChoices">${(p.category === 'acessorios' ? ['ÚNICO'] : ['P', 'M', 'G', 'GG']).map(v => `<button class="choice ${v === 'M' || v === 'ÚNICO' ? 'active' : ''}" data-size="${v}">${v}</button>`).join('')}</div><div class="quantity"><button id="qtyMinus">−</button><span id="qtyValue">1</span><button id="qtyPlus">+</button></div><button class="primary-btn" id="buyBtn">ADICIONAR AO CARRINHO — ${BRL(p.price)}</button><div class="detail-small">✦ Frete grátis a partir de R$ 500,00<br>✦ Pagamento seguro: configure seu provedor para vendas reais.</div><div class="description"><strong>DESCRIÇÃO</strong><p>PRAZO DE PRODUÇÃO DA PEÇA É ENTRE 15 A 20 DIAS ÚTEIS.</p><p>${p.category === 'camisetas' ? '• Malha 100% algodão, fio 26.1 penteado<br>• Gramatura 180g<br>• Gola canelada<br>• Reforço ombro a ombro<br>• Estampa em DTG' : 'Peça da coleção NOSOUL4LIFE. Consulte disponibilidade de variações e medidas.'}</p></div></div></section>`
}

function render() {
  const r = location.hash.slice(2).split('/');
  let page = r[0] || '', param = r[1];
  if (page === 'produto') {
    let p = products.find(p => p.id === param);
    $('#app').innerHTML = p ? detail(p) : collection('todos')
  } else if (page === 'colecao') {
    $('#app').innerHTML = collection(param || 'todos')
  } else if (page === 'sobre' || page === 'ajuda') {
    $('#app').innerHTML = `<div class="simple-page"><h1>${page === 'sobre' ? 'SOBRE A LUCI4 WRATH' : 'PRECISA DE AJUDA?'}</h1><p>${page === 'sobre' ? 'LUCI4 WRATH é uma marca independente de streetwear alternativo, com estética intensa e identidade própria. Personalize esta área com a história original da sua marca.' : 'Entre em contato com sua equipe de atendimento. Configure aqui e-mail, política de trocas e informações de entrega.'}</p><a href="#/" class="outline-btn">VOLTAR PARA A LOJA</a></div>`
  } else {
    $('#app').innerHTML = home()
  }
  window.scrollTo(0, 0)
}

function persist() {
  localStorage.setItem('luci4-cart', JSON.stringify(cart));
  updateCart()
}
function add(p, quantity = 1) {
  let size = p.category === 'acessorios' ? 'ÚNICO' : selectedSize, fit = p.category === 'camisetas' ? selectedFit : '';
  let found = cart.find(x => x.id === p.id && x.size === size && x.fit === fit);
  if (found) found.quantity += quantity; else cart.push({ id: p.id, size, fit, quantity });
  persist();
  openCart();
  toast('Produto adicionado ao carrinho!')
}

function updateCart() {
  let count = cart.reduce((a, x) => a + x.quantity, 0), total = cart.reduce((a, x) => a + (products.find(p => p.id === x.id)?.price || 0) * x.quantity, 0);
  $('#cartCount').textContent = count;
  $('#drawerCount').textContent = `(${count})`;
  $('#cartSubtotal').textContent = BRL(total);
  $('#cartItems').innerHTML = cart.length ? cart.map((x, i) => {
    let p = products.find(p => p.id === x.id);
    return p ? `<div class="cart-row">${media(p)}<div><h3>${p.name}</h3><p>${x.size}${x.fit ? ' / ' + x.fit : ''} · Qtd: ${x.quantity}</p><strong>${BRL(p.price * x.quantity)}</strong></div><button aria-label="Remover" data-remove="${i}">✕</button></div>` : ''
  }).join('') : `<div class="empty-cart">SEU CARRINHO ESTÁ VAZIO.<p>Encontre algo que combine com você.</p></div>`;
  $('#shippingProgress').innerHTML = total >= 500 ? '✓ Você atingiu o valor para frete grátis!' : `Faltam ${BRL(500 - total)} para frete grátis<div class="progress-track"><div class="progress-fill" style="width:${total / 500 * 100}%"></div></div>`
}

function openCart() {
  $('#overlay').classList.remove('hidden');
  $('#cartDrawer').classList.add('open')
}
function closeCart() {
  $('#overlay').classList.add('hidden');
  $('#cartDrawer').classList.remove('open')
}
function toast(msg) {
  let e = $('#toast');
  e.textContent = msg;
  e.classList.remove('hidden');
  setTimeout(() => e.classList.add('hidden'), 2600)
}

window.addEventListener('hashchange', () => {
  render();
  closeCart();
  $('#mobileNav').classList.add('hidden')
});
document.addEventListener('click', e => {
  let t = e.target.closest('button');
  if (!t) return;
  if (t.dataset.add) {
    location.hash = '#/produto/' + t.dataset.add
  } else if (t.dataset.remove !== undefined) {
    cart.splice(Number(t.dataset.remove), 1);
    persist()
  } else if (t.dataset.size) {
    selectedSize = t.dataset.size;
    document.querySelectorAll('[data-size]').forEach(x => x.classList.toggle('active', x === t));
    $('#sizeSelected').textContent = selectedSize
  } else if (t.dataset.fit) {
    selectedFit = t.dataset.fit;
    document.querySelectorAll('[data-fit]').forEach(x => x.classList.toggle('active', x === t));
    $('#fitSelected').textContent = selectedFit.toUpperCase()
  } else if (t.id === 'qtyMinus' || t.id === 'qtyPlus') {
    qty = Math.max(1, qty + (t.id === 'qtyPlus' ? 1 : -1));
    $('#qtyValue').textContent = qty
  } else if (t.id === 'buyBtn') {
    let p = products.find(p => location.hash.endsWith(p.id));
    if (p) add(p, qty)
  } else if (t.id === 'cartBtn') {
    openCart()
  } else if (['cartClose', 'continueBtn'].includes(t.id)) {
    closeCart()
  } else if (t.id === 'searchBtn') {
    $('#searchPanel').classList.toggle('hidden');
    $('#searchInput').focus()
  } else if (t.id === 'searchClose') {
    $('#searchPanel').classList.add('hidden')
  } else if (t.id === 'menuBtn') {
    $('#mobileNav').classList.remove('hidden')
  } else if (t.id === 'mobileClose') {
    $('#mobileNav').classList.add('hidden')
  } else if (t.id === 'accountBtn') {
    toast('Área de clientes precisa de integração com autenticação.')
  } else if (t.id === 'checkoutBtn') {
    toast('Checkout demonstrativo: conecte um provedor de pagamentos para aceitar pedidos.')
  }
});
$('#overlay').addEventListener('click', closeCart);
$('#searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    searchTerm = e.target.value.trim();
    location.hash = '#/colecao/todos';
    render();
    $('#searchPanel').classList.add('hidden')
  }
});
document.addEventListener('change', e => {
  if (e.target.id === 'sortSelect') {
    let values = { low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, name: (a, b) => a.name.localeCompare(b.name) };
    let slug = location.hash.split('/')[2] || 'todos', list = products.filter(p => slug === 'todos' || p.category === slug).filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (values[e.target.value]) list.sort(values[e.target.value]);
    $('#collectionGrid').innerHTML = grid(list)
  }
});
updateCart();
render();
