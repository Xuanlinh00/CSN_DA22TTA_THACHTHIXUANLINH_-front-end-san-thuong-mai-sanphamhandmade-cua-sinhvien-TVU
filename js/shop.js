document.addEventListener("DOMContentLoaded", async () => {
    const shops = await fetchData("stores");
    const shopContainer = document.getElementById("shop-list");

    shops.forEach(shop => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                  <img src="${shop.image}" class="card-img-top" alt="${shop.store_name}">
                    <h5 class="card-title">${shop.store_name}</h5>
                    <p class="card-text">${shop.description}</p>
                    <a href="shop-detail.html?shopId=${shop.id}" class="btn ">Xem gian hàng</a>
                </div>
            </div>
        `;
        shopContainer.appendChild(card);
    });
});