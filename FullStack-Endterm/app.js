const API_URL = "https://dummyjson.com/carts";

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const cartContainer = document.getElementById("cartContainer");

    
    const fetchCarts = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data.carts;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    
    const renderCarts = (carts) => {
        cartContainer.innerHTML = "";
        carts.forEach(cart => {
            const cartDiv = document.createElement("div");
            cartDiv.classList.add("cart");
            cartDiv.innerHTML = `
                <h3>Cart #${cart.id}</h3>
                <div class="cart-info">
                    <p><strong>Total:</strong> $${cart.total.toFixed(2)}</p>
                    <p><strong>Discounted Total:</strong> $${cart.discountedTotal.toFixed(2)}</p>
                    <p><strong>User ID:</strong> ${cart.userId}</p>
                    <p><strong>Total Products:</strong> ${cart.totalProducts}</p>
                    <p><strong>Total Quantity:</strong> ${cart.totalQuantity}</p>
                </div>
                <h4>Products:</h4>
                ${cart.products.map(product => `
                    <div class="product">
                        <img src="${product.thumbnail}" alt="${product.title}">
                        <div class="product-info">
                            <p><strong>${product.title}</strong></p>
                            <p>Price: $${product.price.toFixed(2)} | Quantity: ${product.quantity}</p>
                            <p>Total: $${(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                `).join("")}
            `;
            cartContainer.appendChild(cartDiv);
        });
    };

    
    const filterCarts = (carts, query) => {
        return carts.filter(cart => cart.id.toString() === query);
    };

    
    const initializeApp = async () => {
        const carts = await fetchCarts();

        
        renderCarts(carts);

        
        searchButton.addEventListener("click", () => {
            const query = searchInput.value.replace("Cart #", "").trim();
            const filteredCarts = filterCarts(carts, query);
            renderCarts(filteredCarts);
        });
    };

    initializeApp();
});
