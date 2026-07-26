const userBtn = document.getElementById("user-btn");

if (userBtn) {
    userBtn.addEventListener("click", function(e) {
        e.preventDefault();
        window.location.href = "login.html";
    });
}

function goToDetail(card){

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

const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const qtyInput = document.getElementById("qty");

plusBtn.addEventListener("click", function () {
    qtyInput.value = parseInt(qtyInput.value) + 1;
});

minusBtn.addEventListener("click", function () {
    if (parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
    }
});

