// =======================
// LOAD OUR STOCK PRODUCT
// =======================

async function loadStocks() {

    const productGrid = document.getElementById("our-stock-products");

    // kalau bukan halaman ourstock
    if (!productGrid) return;


    try {

        const response = await fetch(
            "https://tugasuaspemrogramanweb-production.up.railway.app/api/stocks"
        );


        const products = await response.json();


        console.log("DATA STOCK:", products);



        products.forEach(product => {


            productGrid.innerHTML += `

            <div class="product-card"

                onclick="goToDetail(this)"

                data-image="${product.image}"
                data-category="${product.category}"
                data-artist="${product.artist}"
                data-name="${product.name}"
                data-price="${product.price}"
                data-oldprice="${product.old_price || ''}"
                data-stock="${product.stock}"
                data-sold="${product.sold}"
                data-desc="${product.description}"

            >


                <img 
                    src="${product.image}"
                    alt="${product.name}"
                >



                <div class="product-info">


                    <small>
                        ${product.status || ""}
                    </small>



                    <p class="product-name">
                        ${product.name}
                    </p>



                    <p class="price">
                        Rp${Number(product.price)
                        .toLocaleString("id-ID")}
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



    } catch(error) {


        console.error(
            "Gagal mengambil stock:",
            error
        );


    }

}


// jalankan
loadStocks();