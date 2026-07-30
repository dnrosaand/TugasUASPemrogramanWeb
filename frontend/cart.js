// =======================
// LOAD CART
// =======================

function loadCart() {

    const cartContainer = document.getElementById("cart-items");
    const totalItem = document.getElementById("total-item");
    const totalPrice = document.getElementById("total-price");

    if (!cartContainer) return;

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = "";

    // =======================
    // KERANJANG KOSONG
    // =======================

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <p class="empty-cart">
                Keranjang masih kosong.
            </p>
        `;

        totalItem.textContent = "0";
        totalPrice.textContent = "Rp0";

        return;

    }

    let totalBarang = 0;
    let totalHarga = 0;

    cart.forEach((product, index) => {

        // =======================
        // FIX IMAGE PATH
        // =======================

        let imagePath = (product.image || "")
            .trim()
            .replace(/\\/g, "/");

        if (
            imagePath &&
            !imagePath.startsWith("http") &&
            !imagePath.startsWith("img/")
        ) {
            imagePath = "img/" + imagePath;
        }

        const qty = product.qty || 1;

        totalBarang += qty;
        totalHarga += Number(product.price || 0) * qty;

        cartContainer.innerHTML += `
            <div class="cart-item">

                <img
                    src="${imagePath}"
                    alt="${product.name || "Produk"}"
                >

                <div class="cart-info">

                    <h3>${product.name || "-"}</h3>

                    <p class="artist">
                        ${product.artist || ""}
                    </p>

                    <p class="price">
                        Rp${Number(product.price || 0).toLocaleString("id-ID")}
                    </p>

                </div>

                <div class="cart-action">

                    <button
                        class="qty-btn"
                        onclick="changeQty(${index}, -1)"
                    >
                        −
                    </button>

                    <span class="qty">
                        ${qty}
                    </span>

                    <button
                        class="qty-btn"
                        onclick="changeQty(${index}, 1)"
                    >
                        +
                    </button>

                    <button
                        class="delete-btn"
                        onclick="removeCart(${index})"
                    >
                        Hapus
                    </button>

                </div>

            </div>
        `;

    });

    totalItem.textContent = totalBarang;

    totalPrice.textContent =
        "Rp" + totalHarga.toLocaleString("id-ID");

}


// =======================
// HAPUS PRODUK
// =======================

function removeCart(index) {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();

}


// =======================
// UBAH JUMLAH PRODUK
// =======================

function changeQty(index, value) {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart[index]) return;

    cart[index].qty =
        (cart[index].qty || 1) + value;

    if (cart[index].qty <= 0) {

        cart.splice(index, 1);

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();

}


// =======================
// CHECKOUT
// =======================

const checkoutBtn =
    document.getElementById("checkout-btn");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {

            alert("Keranjang masih kosong.");
            return;

        }

        alert("Checkout berhasil!");

        localStorage.removeItem("cart");

        loadCart();

    });

}


// =======================
// LOAD CART
// =======================

loadCart();