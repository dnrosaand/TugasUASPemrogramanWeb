const userBtn = document.getElementById("user-btn");

if (userBtn) {
    userBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "login.html";
    });
}

// =======================
// DETAIL PRODUK
// =======================

function goToDetail(card) {

    const product = {
        image: card.dataset.image,
        category: card.dataset.category,
        artist: card.dataset.artist,
        name: card.dataset.name,
        price: card.dataset.price,
        oldprice: card.dataset.oldprice,
        sold: card.dataset.sold,
        stock: card.dataset.stock,
        desc: card.dataset.desc
    };

    localStorage.setItem("product", JSON.stringify(product));
    window.location.href = "detail.html";
}

// =======================
// QTY BUTTON
// =======================

const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const qtyInput = document.getElementById("qty");

if (plusBtn && minusBtn && qtyInput) {
    plusBtn.addEventListener("click", function () {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    });

    minusBtn.addEventListener("click", function () {
        if (parseInt(qtyInput.value) > 1) {
            qtyInput.value = parseInt(qtyInput.value) - 1;
        }
    });
}

// =======================
// LOAD PRODUCT DARI BACKEND
// =======================

async function loadProducts() {

    const container = document.getElementById("flash-sale-products");

    if (!container) return;

    try {

        const response = await fetch("http://localhost:3000/api/products");
        const products = await response.json();

        products.forEach(product => {

            // Hitung persentase terjual
            const soldPercent = Math.round(
                (product.sold / (product.sold + product.stock)) * 100
            );

            container.innerHTML += `
                <div class="product-card"
                    onclick="goToDetail(this)"
                    data-image="${product.image}"
                    data-category="${product.category}"
                    data-artist="${product.artist}"
                    data-name="${product.name}"
                    data-price="${product.price}"
                    data-oldprice="${product.old_price}"
                    data-sold="${product.sold}"
                    data-stock="${product.stock}"
                    data-desc="${product.description}">

                    <img src="${product.image}" alt="${product.name}">

                    <div class="product-info">

                        <small>${product.status}</small>

                        <p class="product-name">
                            ${product.name}
                        </p>

                        <p class="price">
                            Rp${Number(product.price).toLocaleString("id-ID")}
                            <span>Rp${Number(product.old_price).toLocaleString("id-ID")}</span>
                        </p>

                        <div class="flash-sale-box">

                            <div class="progress">
                                <div class="progress-bar" style="width:${soldPercent}%"></div>
                            </div>

                            <p class="sold-text">
                                ${soldPercent}% Terjual
                            </p>

                        </div>

                    </div>

                </div>
            `;

        });

    } catch (err) {

        console.error("Gagal mengambil produk:", err);

    }

}

loadProducts();