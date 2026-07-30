// =======================
// GO TO DETAIL
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

    localStorage.setItem(
        "product",
        JSON.stringify(product)
    );

    window.location.href = "detail.html";

}


// =======================
// ADD TO CART
// =======================

function addToCart(event, button) {

    // Supaya tidak ikut membuka detail
    event.stopPropagation();

    const card = button.closest(".product-card");

    const product = {

        image: card.dataset.image,
        category: card.dataset.category,
        artist: card.dataset.artist,
        name: card.dataset.name,
        price: Number(card.dataset.price),
        oldprice: Number(card.dataset.oldprice),
        sold: Number(card.dataset.sold),
        stock: Number(card.dataset.stock),
        desc: card.dataset.desc,
        qty: 1

    };

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(item =>
        item.name === product.name &&
        item.artist === product.artist
    );

    if (existingProduct) {

        existingProduct.qty++;

    } else {

        cart.push(product);

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Produk berhasil dimasukkan ke keranjang!");

}


// =======================
// QTY
// =======================

const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const qtyInput = document.getElementById("qty");

if (plusBtn && minusBtn && qtyInput) {

    plusBtn.onclick = () => {

        qtyInput.value =
            parseInt(qtyInput.value) + 1;

    };

    minusBtn.onclick = () => {

        if (parseInt(qtyInput.value) > 1) {

            qtyInput.value =
                parseInt(qtyInput.value) - 1;

        }

    };

}

// =======================
// ADD TO CART FROM DETAIL
// =======================

const addCartBtn = document.getElementById("add-cart-btn");

if (addCartBtn) {

    addCartBtn.addEventListener("click", () => {

        const product =
            JSON.parse(localStorage.getItem("product"));

        if (!product) {
            alert("Produk tidak ditemukan.");
            return;
        }

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        // Ambil jumlah dari input qty
        const qty =
            parseInt(document.getElementById("qty")?.value) || 1;

        const existingProduct = cart.find(item =>
            item.name === product.name &&
            item.artist === product.artist
        );

        if (existingProduct) {

            existingProduct.qty += qty;

        } else {

            cart.push({
                ...product,
                qty: qty
            });

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert("Produk berhasil dimasukkan ke keranjang!");

    });

}