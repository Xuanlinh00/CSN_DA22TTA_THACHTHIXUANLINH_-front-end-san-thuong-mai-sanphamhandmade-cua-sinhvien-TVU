
document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("productId")); // Chuyển sang số
    const product = await fetchData(`products/${productId}`);
    const productContainer = document.getElementById("product-detail");

    if (!product) {
        productContainer.innerHTML = "<p>Sản phẩm không tồn tại.</p>";
        return;
    }

    // Hiển thị chi tiết sản phẩm
    productContainer.innerHTML = `
        <div class="row g-0">
            <div class="col-md-3">
                <img src="${product.image}" class="img-fluid rounded-start" alt="${product.name}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p><strong>Giá:</strong> ${product.price.toLocaleString()} VNĐ</p>
                    <p><strong>Số lượng còn:</strong> ${product.stock}</p>
                    <button class="btn-add" id="addCart">Thêm vào giỏ hàng</button>
                </div>
            </div>
        </div>
    `;

    // Gắn sự kiện thêm vào giỏ hàng
    document.getElementById("addCart").addEventListener("click", () => {
        addToCart(productId);
    });
});

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productInCart = cart.find(item => item.id === productId);

    if (productInCart) {
        productInCart.count += 1;
    } else {function displayCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
    
        cartContainer.innerHTML = ''; // Xóa nội dung cũ
        let totalPrice = 0;
    
        if (cart.length === 0) {
            cartContainer.innerHTML = '<tr><td colspan="5" class="text-center">Giỏ hàng trống</td></tr>';
        } else {
            cart.forEach(item => {
                const itemTotal = item.price * item.count;
                totalPrice += itemTotal;
    
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.price.toLocaleString()} VNĐ</td>
                    <td>
                        <input type="number" class="form-control quantity-input" value="${item.count}" min="1" data-id="${item.id}">
                    </td>
                    <td>${itemTotal.toLocaleString()} VNĐ</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Xóa</button>
                    </td>
                `;
                cartContainer.appendChild(row);
            });
        }
    
        cartTotal.textContent = totalPrice.toLocaleString(); // Cập nhật tổng tiền
    }
    
        cart.push({ id: productId, count: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((total, item) => total + item.count, 0);
    const badge = document.querySelector(".badge.bg-danger");
    badge.textContent = totalCount;
}

// Cập nhật badge giỏ hàng khi tải trang
document.addEventListener("DOMContentLoaded", updateCartBadge);

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productInCart = cart.find(item => item.id === productId);

    if (productInCart) {
        productInCart.count += 1;
    } else {
        cart.push({ id: productId, count: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge(); 
}
