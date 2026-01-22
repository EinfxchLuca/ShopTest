// ============================================
// TORNADO INTERCEPTORS - SHOP APP
// ============================================

let products = [];
let cart = [];

// ============ INITIALISIERUNG ============

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  loadCart();
  updateShopInfo();
  renderProducts();
  updateCartUI();
});

// ============ PRODUKTE LADEN ============

function loadProducts() {
  fetch('./data/products.json')
    .then(response => response.json())
    .then(data => {
      products = data.products;
    })
    .catch(error => {
      console.error('Fehler beim Laden der Produkte:', error);
      // Fallback für Entwicklung
      products = [];
    });
}

// ============ SHOP-INFORMATIONEN ============

function updateShopInfo() {
  const shopNameElement = document.getElementById('shop-name');
  const shopClaimElement = document.getElementById('shop-claim');
  
  if (shopNameElement) {
    shopNameElement.textContent = CONFIG.SHOP_NAME;
  }
  if (shopClaimElement) {
    shopClaimElement.textContent = CONFIG.SHOP_CLAIM;
  }
}

// ============ PRODUKTE RENDERN ============

function renderProducts() {
  const container = document.getElementById('products-grid');
  
  if (!container) return;
  
  if (products.length === 0) {
    container.innerHTML = '<p class="loading">Produkte werden geladen...</p>';
    return;
  }
  
  container.innerHTML = products.map(product => `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-badge">${product.category}</div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${CONFIG.CURRENCY_SYMBOL}${product.price.toFixed(2)}</span>
          <button class="btn-add-to-cart" onclick="addToCart(${product.id})">
            <span>In den Warenkorb</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ============ WARENKORB - FUNKTIONEN ============

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }
  
  saveCart();
  updateCartUI();
  
  // Visuelle Rückmeldung
  const btn = event.target.closest('.btn-add-to-cart');
  if (btn) {
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>✓ Hinzugefügt</span>';
    btn.classList.add('added');
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('added');
    }, 1500);
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function updateQuantity(productId, newQuantity) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = parseInt(newQuantity);
      saveCart();
      updateCartUI();
    }
  }
}

function clearCart() {
  if (confirm('Warenkorb wirklich leeren?')) {
    cart = [];
    saveCart();
    updateCartUI();
  }
}

// ============ WARENKORB - SPEICHERN & LADEN ============

function saveCart() {
  localStorage.setItem('tornado_cart', JSON.stringify(cart));
}

function loadCart() {
  const saved = localStorage.getItem('tornado_cart');
  if (saved) {
    try {
      cart = JSON.parse(saved);
    } catch (e) {
      cart = [];
    }
  }
}

// ============ WARENKORB UI ============

function updateCartUI() {
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const emptyMessage = document.getElementById('empty-cart-message');
  const cartSummary = document.getElementById('cart-summary');
  
  // Cart-Count Badge
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';
  }
  
  // Warenkorb-Items
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = '';
      if (emptyMessage) emptyMessage.style.display = 'block';
      if (cartSummary) cartSummary.style.display = 'none';
    } else {
      if (emptyMessage) emptyMessage.style.display = 'none';
      if (cartSummary) cartSummary.style.display = 'block';
      
      cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${CONFIG.CURRENCY_SYMBOL}${item.price.toFixed(2)}</div>
          </div>
          <div class="cart-item-controls">
            <button class="btn-qty-minus" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
            <input type="number" class="qty-input" value="${item.quantity}" min="1" max="99" onchange="updateQuantity(${item.id}, this.value)">
            <button class="btn-qty-plus" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
          <div class="cart-item-total">${CONFIG.CURRENCY_SYMBOL}${(item.price * item.quantity).toFixed(2)}</div>
          <button class="btn-remove" onclick="removeFromCart(${item.id})" title="Entfernen">✕</button>
        </div>
      `).join('');
    }
  }
  
  // Zusammenfassung
  updateCartSummary();
}

function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * CONFIG.TAX_RATE;
  const total = subtotal + tax;
  
  const subtotalEl = document.getElementById('subtotal');
  const taxEl = document.getElementById('tax');
  const totalEl = document.getElementById('total');
  
  if (subtotalEl) subtotalEl.textContent = `${CONFIG.CURRENCY_SYMBOL}${subtotal.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `${CONFIG.CURRENCY_SYMBOL}${tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `${CONFIG.CURRENCY_SYMBOL}${total.toFixed(2)}`;
}

// ============ CHECKOUT (Platzhalter) ============

function checkout() {
  if (cart.length === 0) {
    alert('Warenkorb ist leer!');
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * (1 + CONFIG.TAX_RATE);
  alert(`Checkout-Funktion würde aktiviert werden.\n\nGesamtbetrag: ${CONFIG.CURRENCY_SYMBOL}${total.toFixed(2)}\n\nDies ist ein Platzhalter für Zahlungsintegration (z.B. Stripe, PayPal).`);
}

// ============ CART TOGGLE (Mobile) ============

function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

// Schließe Warenkorb wenn Overlay geklickt wird
document.addEventListener('click', (e) => {
  const sidebar = document.getElementById('cart-sidebar');
  const toggleBtn = document.getElementById('cart-toggle');
  
  if (sidebar && toggleBtn && 
      !sidebar.contains(e.target) && 
      !toggleBtn.contains(e.target) &&
      sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }
});
