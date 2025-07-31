fetch('/api/products')
  .then(res => res.json())
  .then(products => {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    const container = document.getElementById('cart-items');
    const totalDiv = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout');

    renderCart(products, cart);

    checkoutBtn.onclick = () => {
      localStorage.removeItem('cart');
      container.innerHTML = '<p>  Thank you for your order!</p>';
      totalDiv.innerHTML = '';
      checkoutBtn.style.display = 'none';
    };
  });

function renderCart(products, cart) {
  const container = document.getElementById('cart-items');
  const totalDiv = document.getElementById('total');
  const checkoutBtn = document.getElementById('checkout');
  container.innerHTML = '';
  let total = 0;
  let totalItems = 0;

  products.forEach(p => {
    if (cart[p.id]) {
      const qty = cart[p.id];
      total += p.price * qty;
      totalItems += qty;

      const item = document.createElement('div');
      item.className = 'bg-white p-4 rounded shadow flex justify-between items-center';
      item.innerHTML = `
        <div>
          <h3 class="text-lg font-bold">${p.name}</h3>
          <p class="text-gray-600">Price: ₹${p.price}</p>
          <p class="text-gray-600">Quantity: <span id="qty-${p.id}">${qty}</span></p>
          <div class="mt-2">
            <button class="bg-blue-600 text-white px-2 py-1 rounded" onclick="updateQty(${p.id}, 1)">+</button>
            <button class="bg-blue-600 text-white px-2 py-1 rounded" onclick="updateQty(${p.id}, -1)">-</button>
            <button class="bg-red-600 text-white px-2 py-1 rounded" onclick="removeItem(${p.id})">Remove</button>
          </div>
        </div>
        <p class="text-lg font-bold">₹${p.price * qty}</p>
      `;
      container.appendChild(item);
    }
  });

  totalDiv.innerHTML = `Total: ₹${total} (${totalItems} items)`;

  if (Object.keys(cart).length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    totalDiv.innerHTML = '';
    checkoutBtn.style.display = 'none';
  }
}

function updateQty(id, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  cart[id] = (cart[id] || 0) + change;
  if (cart[id] <= 0) delete cart[id];
  localStorage.setItem('cart', JSON.stringify(cart));

  fetch('/api/products')
    .then(res => res.json())
    .then(products => renderCart(products, cart));
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  delete cart[id];
  localStorage.setItem('cart', JSON.stringify(cart));

  fetch('/api/products')
    .then(res => res.json())
    .then(products => renderCart(products, cart));
}
