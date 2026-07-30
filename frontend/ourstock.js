// =======================
// LOAD OUR STOCK PRODUCT
// =======================

async function loadStocks() {
    const productGrid = document.getElementById("our-stock-products");

    // Kalau bukan halaman Our Stock
    if (!productGrid) return;

    try {
        const response = await fetch(
            "https://tugasuaspemrogramanweb-production.up.railway.app/api/stocks"
        );

        const products = await response.json();

        products.forEach((product) => {
            // =======================
            // FIX IMAGE PATH
            // =======================

            let imagePath = (product.image || "")
                .trim()
                .replace(/\\/g, "/");

            if (
                !imagePath.startsWith("http") &&
                !imagePath.startsWith("img/")
            ) {
                imagePath = "img/" + imagePath;
            }

            productGrid.innerHTML += `
                <div
                    class="product-card"
                    onclick="goToDetail(this)"
                    data-image="${imagePath}"
                    data-category="${product.category || ""}"
                    data-artist="${product.artist || ""}"
                    data-name="${product.name || ""}"
                    data-price="${product.price || 0}"
                    data-oldprice="${product.old_price || 0}"
                    data-stock="${product.stock || 0}"
                    data-sold="${product.sold || 0}"
                    data-desc="${product.description || ""}"
                >

                    <img
                        src="${imagePath}"
                        alt="${product.name}"
                        onerror="this.src='img/default-product.png'"
                    >

                    <div class="product-info">

                        <small>
                            ${product.status || ""}
                        </small>

                        <p class="product-name">
                            ${product.name}
                        </p>

                        <p class="price">
                            Rp${Number(product.price).toLocaleString("id-ID")}
                        </p>

                        <div class="product-action">

                            <button class="buy-btn">
                                Belanja
                            </button>

                            <img
                                src="img/Shopping cart.png"
                                alt="cart"
                            >

                        </div>

                    </div>

                </div>
            `;
        });

    } catch (error) {
        console.error("Gagal mengambil stock:", error);
    }
}

// Jalankan
loadStocks();