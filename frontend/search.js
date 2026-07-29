// =======================
// SEARCH INPUT HEADER
// =======================

const searchInput = document.getElementById("searchInput");


if(searchInput){


    searchInput.addEventListener("keypress", function(e){


        if(e.key === "Enter"){


            const keyword = searchInput.value.trim();


            if(keyword !== ""){


                window.location.href =
                `search.html?keyword=${keyword}`;


            }


        }


    });


}



// =======================
// LOAD SEARCH RESULT
// =======================


async function loadSearchProducts(){


    const container =
    document.getElementById("search-products");


    // kalau bukan halaman search
    if(!container) return;




    const params =
    new URLSearchParams(
        window.location.search
    );



    const keyword =
    params.get("keyword");



    if(!keyword){

        container.innerHTML =
        "<p>Pencarian kosong</p>";

        return;

    }





    try{


        const response =
        await fetch(
        "https://tugasuaspemrogramanweb-production.up.railway.app/api/products"
        );



        const products =
        await response.json();




        const result =
        products.filter(product=>{


            const name =
            product.name?.toLowerCase() || "";


            const artist =
            product.artist?.toLowerCase() || "";


            const category =
            product.category?.toLowerCase() || "";



            const search =
            keyword.toLowerCase();




            return (

                name.includes(search) ||

                artist.includes(search) ||

                category.includes(search)

            );


        });






        if(result.length === 0){


            container.innerHTML = `

            <p class="no-result">
                Produk tidak ditemukan
            </p>

            `;


            return;

        }







        result.forEach(product=>{


            container.innerHTML += `


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
                alt="${product.name}">



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


                </div>


            </div>



            `;



        });






    }catch(error){


        console.error(
            "Gagal load search:",
            error
        );


    }



}




loadSearchProducts();