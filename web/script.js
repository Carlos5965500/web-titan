let cart = [];

function addToCart(productName, price) {
  let found = false;
  cart.forEach(item => {
    if (item.name === productName) {
      item.quantity++;
      found = true;
    }
  });
  if (!found) {
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  displayCart();
}

function removeItem(productName) {
  cart.forEach(item => {
    if (item.name === productName) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart = cart.filter(cartItem => cartItem.name !== productName);
      }
    }
  });
  displayCart();
}

function displayCart() {
  const cartList = document.getElementById('cartItems');
  cartList.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    const quantity = item.quantity > 1 ? `(${item.quantity}) ` : '';
    li.textContent = `${quantity}${item.name} - $${item.price}`;
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="material-icons-outlined">delete</i> Eliminar';
    removeButton.addEventListener('click', () => {
      removeItem(item.name);
    });
    li.appendChild(removeButton);
    
    cartList.appendChild(li);
  });
}

function toggleCart() {
  const cartElement = document.getElementById('cart');
  cartElement.style.display = cartElement.style.display === 'none' ? 'block' : 'none';
}

function downloadCart() {
  const confirmation = confirm("¿Desea descargar el carrito como un archivo de texto?");
  if (confirmation) {
    const data = cart.map(item => ` (presenta este txt en discord https//:discord.com) ${item.quantity}x ${item.name} - $${item.price}`).join('\n');
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'listas.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else {
    alert("No se ha descargado el carrito.");
  }
}
