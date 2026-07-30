// =======================
// SEARCH INPUT
// =======================

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const keyword = searchInput.value.trim();

            if (keyword) {
                window.location.href = `search.html?keyword=${encodeURIComponent(keyword)}`;
            }
        }
    });
}


// =======================
// LOAD SEARCH RESULT
// =======================

async function loadSearchProducts() {
    const container = document.getElementById("search-products");

    if (!container) return;

    const params = new URLSearchParams(window.location.search);

    const keyword = (params.get("keyword") || "")
        .trim()
        .toLowerCase();

    if (!keyword) {
        container.innerHTML = `
            <p class="no-result">
                Pencarian kosong
            </p>
        `;
        return;
    }

    try {
        const [productRes, stockRes] = await Promise.all([
            fetch("https://tugasuaspemrogramanweb-production.up.railway.app/api/products"),
            fetch("https://tugasuaspemrogramanweb-production.up.railway.app/api/stocks")
        ]);

        const products = await productRes.json();
        const stocks = await stockRes.json();

        const allProducts = [...products, ...stocks];

        // Pisahkan keyword menjadi beberapa kata
        const keywords = keyword
            .replace(/[()]/g, "")
            .split(/\s+/)
            .filter(Boolean);

        const result = allProducts.filter((product) => {

            const text = `
                ${product.name || ""}
                ${product.artist || ""}
                ${product.category || ""}
            `
                .toLowerCase()
                .replace(/[()]/g, "");

            return keywords.every((word) => text.includes(word));
        });

        if (result.length === 0) {
            container.innerHTML = `
                <p class="no-result">
                    Produk tidak ditemukan
                </p>
            `;
            return;
        }

        container.innerHTML = "";

        result.forEach((product) => {

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

            container.innerHTML += `
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

                    </div>

                </div>
            `;
        });

    } catch (error) {
        console.error("Gagal load search:", error);

        container.innerHTML = `
            <p class="no-result">
                Terjadi kesalahan saat memuat produk.
            </p>
        `;
    }
}

loadSearchProducts();