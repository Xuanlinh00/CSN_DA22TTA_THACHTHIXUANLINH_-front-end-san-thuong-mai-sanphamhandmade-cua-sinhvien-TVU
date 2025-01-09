document.addEventListener("DOMContentLoaded", async () => {
    const products = await fetchData("featured_products");
    const featuredContainer = document.getElementById("featured-products");

    products.forEach(product => {
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
        featuredContainer.appendChild(card);
    });

   
}
);