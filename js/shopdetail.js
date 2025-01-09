
document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const shopId = urlParams.get("shopId");

    if (!shopId) {
        alert("Không tìm thấy gian hàng!");
        return;
    }

    // Fetch thông tin gian hàng
    const shops = await fetchData("stores");
    const shop = shops.find(s => s.id == shopId);

    if (!shop) {
        alert("Gian hàng không tồn tại!");
        return;
    }

    // Hiển thị thông tin gian hàng
    document.getElementById("shop-name").textContent = shop.store_name;
    document.getElementById("shop-description").textContent = shop.description;

    // Fetch sản phẩm của gian hàng
    const products = await fetchData("products");
    const shopProducts = products.filter(product => product.store_id == shopId);

    const shopProductsContainer = document.getElementById("shop-products");
    if (shopProducts.length === 0) {
        shopProductsContainer.innerHTML = "<p class='text-center'>Gian hàng chưa có sản phẩm nào.</p>";
    } else {
        shopProducts.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("col-md-4", "mb-4");
            card.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p><strong>Giá:</strong> ${product.price.toLocaleString()} VNĐ</p>
                        <a href="detail.html?productId=${product.id}" class="btn btn-primary">Xem chi tiết</a>
                    </div>
                </div>
            `;
            shopProductsContainer.appendChild(card);
        });
    }
});
