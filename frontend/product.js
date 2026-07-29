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




