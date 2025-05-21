// cart.js
let cart = JSON.parse(localStorage.getItem('gamezone_cart')) || [];

function saveCart() {
  localStorage.setItem('gamezone_cart', JSON.stringify(cart));
  updateCartCount();
  dispatchCartUpdatedEvent();
}

function dispatchCartUpdatedEvent() {
  const event = new Event('cartUpdated');
  window.dispatchEvent(event);
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
  });
}

function addToCart(productId) {
  const allProducts = [
    ...products.juegos,
    ...products.funkos,
    ...products.consolas,
    ...products.accesorios
  ];
  
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({...product, quantity: 1});
  }
  
  saveCart();
  showNotification(`${product.name} añadido al carrito`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

function updateQuantity(productId, quantity) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  if (quantity < 1) {
    removeFromCart(productId);
  } else {
    item.quantity = quantity;
    saveCart();
  }
}

function getCart() {
  return [...cart];
}

function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg animate-fade-in';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  
  // Escuchar eventos de actualización
  window.addEventListener('cartUpdated', () => {
    updateCartCount();
  });
  
  // Escuchar cambios en otras pestañas
  window.addEventListener('storage', (e) => {
    if (e.key === 'gamezone_cart') {
      cart = JSON.parse(e.newValue || '[]');
      updateCartCount();
    }
  });
});

// Exportar funciones
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.getCart = getCart;
window.getCartTotal = getCartTotal;