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
// ADD TO CART (CARD)
// =======================

function addToCart(event, button) {

    event.stopPropagation();

    const card = button.closest(".product-card");

    if (!card) return;

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

    saveToCart(product);

}


// =======================
// ADD TO CART (DETAIL)
// =======================

function addDetailToCart() {

    const product =
        JSON.parse(localStorage.getItem("product"));

    if (!product) {

        alert("Produk tidak ditemukan.");
        return;

    }

    const qty =
        parseInt(document.getElementById("qty").value) || 1;

    product.qty = qty;

    saveToCart(product);

}


// =======================
// SIMPAN KE CART
// =======================

function saveToCart(product) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(item =>
        item.name === product.name &&
        item.artist === product.artist
    );

    if (existingProduct) {

        existingProduct.qty += product.qty;

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