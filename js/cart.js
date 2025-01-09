const cartContainer = document.querySelector('.cart-container');
const cartTotalElement = document.getElementById('cart-total');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log('Giỏ hàng:', cart);

const renderCartItem = async () => {
    try {
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();
        console.log('Sản phẩm:', products);

        if (cart.length !== 0) {
            let total = 0;

            cartContainer.innerHTML = cart.map(itemCart => {
                const search = products.find(product => product.id === itemCart.id.toString());
                console.log('ItemCart:', itemCart);
                console.log('Search:', search);

                if (search) {
                    const itemTotal = search.price * itemCart.count;
                    total += itemTotal;

                    return `
                        <div class="cart-part">
                            <div class="cart-img">
                                <img src="${search.image}" alt="${search.name}">
                            </div>
                            <div class="cart-name">
                                <p><strong>${search.name}</strong></p>
                            </div>
                            <div class="cart-quantity">
                                <input type="number" class="form-control quantity-input" 
                                       value="${itemCart.count}" min="1" data-id="${itemCart.id}">
                            </div>
                            <div class="cart-total">
                                <p>${itemTotal.toLocaleString()} VNĐ</p>
                            </div>
                            <div class="cart-remove">
                                <button onclick="removeCart(${itemCart.id})">Xóa</button>
                            </div>
                        </div>
                    `;
                } else {
                    return `<div class="cart-part">
                                <p>Không tìm thấy sản phẩm với ID: ${itemCart.id}</p>
                            </div>`;
                }
            }).join("");

            cartTotalElement.textContent = total.toLocaleString();
        } else {
            cartContainer.innerHTML = `<p>Giỏ hàng của bạn trống</p>`;
            cartTotalElement.textContent = "0";
        }
    } catch (error) {
        console.error('Lỗi:', error);
        cartContainer.innerHTML = `<p>Đã xảy ra lỗi khi tải giỏ hàng. Vui lòng thử lại sau.</p>`;
        cartTotalElement.textContent = "0";
    }
};

const removeCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItem();
    updateCartBadge(); 
};

document.addEventListener('change', event => {
    if (event.target.classList.contains('quantity-input')) {
        const id = parseInt(event.target.dataset.id);
        const newQuantity = parseInt(event.target.value);

        if (newQuantity < 1) {
            removeCart(id);
        } else {
            const cartItem = cart.find(item => item.id === id);
            if (cartItem) {
                cartItem.count = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartItem();
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    renderCartItem();
    updateCartBadge();
});

const updateCartBadge = () => {
  const totalCount = cart.reduce((total, item) => total + item.count, 0);
  const badge = document.querySelector(".badge.bg-danger");
  if (badge) {
      badge.textContent = totalCount;
  }
};
