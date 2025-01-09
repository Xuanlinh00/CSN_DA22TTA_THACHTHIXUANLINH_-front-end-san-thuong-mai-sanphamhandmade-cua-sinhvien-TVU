

  // Hàm fetch dữ liệu từ API
async function fetchData(endpoint) {
    try {
        const response = await fetch(`http://localhost:3000/${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}
//xử lý tìm kiếm 
document.getElementById("searchForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    const products = await fetchData("products");

    const searchResults = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery)
    );

    if (searchResults.length > 0) {
        const searchContainer = document.getElementById("product-list") || document.getElementById("featured-products");
        searchContainer.innerHTML = "";

        searchResults.forEach(product => {
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
            searchContainer.appendChild(card);
        });
    } else {
        alert("Không tìm thấy sản phẩm nào!");
    }
});

// JavaScript để hiển thị nút khi cuộn xuống và ẩn khi ở trên cùng
window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// JavaScript để cuộn lên đầu trang khi nhấp vào nút
document.getElementById('scrollToTop').addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

