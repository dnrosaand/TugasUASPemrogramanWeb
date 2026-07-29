function goToDetail(card){


const product={

image:card.dataset.image,
category:card.dataset.category,
artist:card.dataset.artist,
name:card.dataset.name,
price:card.dataset.price,
oldprice:card.dataset.oldprice,
sold:card.dataset.sold,
stock:card.dataset.stock,
desc:card.dataset.desc

};


localStorage.setItem(
"product",
JSON.stringify(product)
);


window.location.href="detail.html";


}



// QTY

const minusBtn=document.getElementById("minus");
const plusBtn=document.getElementById("plus");
const qtyInput=document.getElementById("qty");


if(plusBtn && minusBtn && qtyInput){


plusBtn.onclick=()=>{

qtyInput.value=
parseInt(qtyInput.value)+1;

};


minusBtn.onclick=()=>{


if(parseInt(qtyInput.value)>1){

qtyInput.value=
parseInt(qtyInput.value)-1;

}


};


}




// FLASH SALE


async function loadProducts(){


const container=
document.getElementById("flash-sale-products");


if(!container)return;



try{


const response=
await fetch(
"https://tugasuaspemrogramanweb-production.up.railway.app/api/products"
);


const products=
await response.json();



products.forEach(product=>{


container.innerHTML+=`

<div class="product-card"
onclick="goToDetail(this)"

data-image="${product.image}"
data-category="${product.category}"
data-artist="${product.artist}"
data-name="${product.name}"
data-price="${product.price}"
data-oldprice="${product.old_price}"
data-stock="${product.stock}"
data-desc="${product.description}">


<img src="${product.image}">


<p class="product-name">
${product.name}
</p>


<p class="price">
Rp${Number(product.price).toLocaleString("id-ID")}
</p>


</div>

`;

});


}catch(err){

console.error(err);

}


}


loadProducts();





// OUR STOCK


async function loadStocks(){


const grid=
document.getElementById("our-stock-products");


if(!grid)return;


try{


const response=
await fetch(
"https://tugasuaspemrogramanweb-production.up.railway.app/api/stocks"
);


const products=
await response.json();



products.forEach(product=>{


grid.innerHTML+=`

<div class="product-card"
onclick="goToDetail(this)"

data-image="${product.image}"
data-name="${product.name}"
data-price="${product.price}"
data-desc="${product.description}">


<img src="${product.image}">


<p class="product-name">
${product.name}
</p>


<p class="price">
Rp${Number(product.price).toLocaleString("id-ID")}
</p>


</div>

`;


});


}catch(error){

console.log(error);

}

}


loadStocks();