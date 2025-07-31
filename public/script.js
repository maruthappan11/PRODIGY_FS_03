fetch('/api/products')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('products');
    products.forEach(p => {
      const div = document.createElement('div');
      div.className = 'bg-white p-4 rounded shadow';
      div.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="w-full h-40 object-cover mb-4 rounded" />
        <h3 class="text-xl font-bold mb-2">${p.name}</h3>
        <p class="text-gray-600 mb-2">${p.description}</p>
        <p class="font-semibold mb-4">₹${p.price}</p>
        <button class="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700" onclick="addToCart(${p.id})">Add to Cart</button>
      `;
      container.appendChild(div);
    });
  });

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  cart[id] = cart[id] ? cart[id] + 1 : 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  showToast('Added to cart ');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2000);
}
