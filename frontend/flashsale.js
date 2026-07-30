// =======================
// FLASH SALE PRODUCT
// =======================


async function loadProducts() {


    const container =
    document.getElementById("flash-sale-products");


    if(!container) return;



    try{


        const response =
        await fetch(
        "https://tugasuaspemrogramanweb-production.up.railway.app/api/products"
        );


        const products =
        await response.json();



        console.log("PRODUCT DATA:", products);



        products.forEach(product=>{


            // =======================
            // FIX IMAGE PATH
            // =======================

            let imagePath = (product.image || "").trim();

console.log("Image dari database:", imagePath);

// Kalau database belum ada "img/", tambahkan
if (!imagePath.startsWith("img/")) {
    imagePath = "img/" + imagePath;
}

console.log("Image yang dipakai:", imagePath);



            const total =
            Number(product.sold) + Number(product.stock);


            const soldPercent =
            total > 0
            ? Math.round(
                (Number(product.sold) / total) * 100
            )
            : 0;




            container.innerHTML += `


            <div class="product-card"

            onclick="goToDetail(this)"


            data-image="${imagePath}"

            data-category="${product.category || ''}"

            data-artist="${product.artist || ''}"

            data-name="${product.name || ''}"

            data-price="${product.price || 0}"

            data-oldprice="${product.old_price || 0}"

            data-sold="${product.sold || 0}"

            data-stock="${product.stock || 0}"

            data-desc="${product.description || ''}"

            >



                <img 
                src="${imagePath}"
                alt="${product.name}"
                onerror="this.src='img/default-product.png'"
                >



                <div class="product-info">


                    <small>
                    ${product.status || "Ready Stock"}
                    </small>



                    <p class="product-name">
                    ${product.name}
                    </p>



                    <p class="price">

                    Rp${Number(product.price)
                    .toLocaleString("id-ID")}



                    ${
                    product.old_price
                    ?
                    `<span>
                    Rp${Number(product.old_price)
                    .toLocaleString("id-ID")}
                    </span>`
                    :
                    ""
                    }

                    </p>




                    <div class="flash-sale-box">


                        <div class="progress">

                            <div 
                            class="progress-bar"
                            style="width:${soldPercent}%">
                            </div>

                        </div>


                        <p class="sold-text">
                        ${soldPercent}% Terjual
                        </p>


                    </div>


                </div>


            </div>


            `;



        });



    }catch(error){


        console.error(
            "Gagal mengambil produk:",
            error
        );


    }


}



loadProducts();




// =======================
// DETAIL PRODUCT
// =======================


function goToDetail(card){


    const product = {


        image:
        card.dataset.image,


        category:
        card.dataset.category,


        artist:
        card.dataset.artist,


        name:
        card.dataset.name,


        price:
        card.dataset.price,


        oldprice:
        card.dataset.oldprice,


        sold:
        card.dataset.sold,


        stock:
        card.dataset.stock,


        desc:
        card.dataset.desc


    };



    localStorage.setItem(
        "product",
        JSON.stringify(product)
    );



    window.location.href =
    "detail.html";


}