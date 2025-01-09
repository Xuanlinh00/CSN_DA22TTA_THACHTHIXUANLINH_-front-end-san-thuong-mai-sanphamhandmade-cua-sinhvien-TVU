document.addEventListener('DOMContentLoaded', () => {
    const cartTotalElement = document.getElementById('cart-total');

    // Lấy giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Hàm tính tổng tiền giỏ hàng
    const calculateCartTotal = async () => {
        try {
            const response = await fetch('http://localhost:3000/products');
            const products = await response.json();
            console.log('Sản phẩm:', products); // Log sản phẩm

            let total = 0;

            cart.forEach(itemCart => {
                const search = products.find(product => product.id === itemCart.id.toString());
                if (search) {
                    const itemTotal = search.price * itemCart.count;
                    total += itemTotal;
                }
            });

            cartTotalElement.textContent = total.toLocaleString();
        } catch (error) {
            console.error('Lỗi:', error);
            cartTotalElement.textContent = "0";
        }
    };

    calculateCartTotal();
});
document.addEventListener('DOMContentLoaded', () => {
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    const checkoutForm = document.getElementById('checkout-form');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const calculateCartTotal = async () => {
        try {
            const response = await fetch('http://localhost:3000/products');
            const products = await response.json();
            console.log('Sản phẩm:', products); // Log sản phẩm

            let total = 0;

            cart.forEach(itemCart => {
                const search = products.find(product => product.id === itemCart.id.toString());
                if (search) {
                    const itemTotal = search.price * itemCart.count;
                    total += itemTotal;
                }
            });

            cartTotalElement.textContent = total.toLocaleString();
        } catch (error) {
            console.error('Lỗi:', error);
            cartTotalElement.textContent = "0";
        }
    };

    const handleCheckout = () => {
        // Kiểm tra dữ liệu biểu mẫu
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        if (name && email && address) {
            // Hiển thị thông báo thanh toán thành công
            alert('Thanh toán thành công! Cảm ơn bạn đã mua hàng.');
            // Xóa giỏ hàng sau khi thanh toán
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            // Cập nhật hiển thị giỏ hàng
            cartTotalElement.textContent = "0";
        } else {
            alert('Vui lòng điền đầy đủ thông tin để tiếp tục.');
        }
    };

    checkoutButton.addEventListener('click', handleCheckout);

    calculateCartTotal();
});
