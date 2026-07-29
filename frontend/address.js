document.addEventListener("DOMContentLoaded",()=>{


// ================= REGISTER ALAMAT =================


const agreeCheck =
document.getElementById("agreeCheck");


const registerBtn =
document.getElementById("registerBtn");



if(agreeCheck && registerBtn){


    registerBtn.disabled=true;


    agreeCheck.addEventListener("change",function(){

        registerBtn.disabled =
        !this.checked;

    });


}




if(registerBtn){


registerBtn.addEventListener("click",async()=>{


const user =
JSON.parse(
sessionStorage.getItem("registerData")
);



if(!user){

alert("Data diri belum diisi");

return;

}



const data={


fullname:
`${user.firstName} ${user.lastName}`,

email:user.email,

phone:user.phone,

password:user.password,


province:
document.getElementById("province").value,


city:
document.getElementById("city").value,


district:
document.getElementById("district").value,


village:
document.getElementById("village").value,


street:
document.getElementById("street").value,


houseNumber:
document.getElementById("houseNumber").value,


rtRw:
document.getElementById("rtRw").value,


detail:
document.getElementById("detail").value


};




if(
data.province==="" ||
data.city==="" ||
data.district==="" ||
data.village===""
){

alert("Lengkapi alamat terlebih dahulu");

return;

}



try{


const response =
await fetch(
"https://tugasuaspemrogramanweb-production.up.railway.app/api/users/register",
{


method:"POST",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify(data)


});



const result =
await response.json();



if(response.ok){


alert("Registrasi berhasil");


sessionStorage.removeItem(
"registerData"
);


window.location.href="login.html";


}else{


alert(result.message);


}




}catch(error){


console.error(error);


alert("Server Error");


}



});


}





// ================= DATA WILAYAH =================


const wilayah={


"Jawa Timur":{


"Kota Malang":{


"Lowokwaru":[

"Dinoyo",
"Tulusrejo",
"Sumbersari"

],


"Klojen":[

"Kauman",
"Samaan"

]


},



"Kota Surabaya":{


"Sukolilo":[

"Keputih",
"Gebang Putih"

]


},



"Kab. Lamongan":{


"Brondong":[

"Sedayulawas",
"Brondong"

]


}



},



"Nusa Tenggara Timur":{


"Kota Kupang":{


"Kelapa Lima":[

"Oesapa",
"Kelapa Lima"

]


}


}



};






// ================= SELECT ALAMAT =================



const province =
document.getElementById("province");


const city =
document.getElementById("city");


const district =
document.getElementById("district");


const village =
document.getElementById("village");





if(
province &&
city &&
district &&
village
){



// PROVINSI


Object.keys(wilayah)
.forEach(prov=>{


province.innerHTML+=`

<option value="${prov}">
${prov}
</option>

`;


});






// KOTA


province.addEventListener("change",function(){



city.innerHTML=
`
<option value="">
Pilih Kabupaten/Kota
</option>
`;



district.innerHTML=
`
<option value="">
Pilih Kecamatan
</option>
`;



village.innerHTML=
`
<option value="">
Pilih Desa/Kelurahan
</option>
`;




Object.keys(
wilayah[this.value]
)
.forEach(kota=>{


city.innerHTML+=`

<option value="${kota}">
${kota}
</option>

`;


});



});






// KECAMATAN


city.addEventListener("change",function(){



district.innerHTML=
`
<option value="">
Pilih Kecamatan
</option>
`;



village.innerHTML=
`
<option value="">
Pilih Desa/Kelurahan
</option>
`;





Object.keys(
wilayah[province.value][this.value]
)

.forEach(kec=>{


district.innerHTML+=`

<option value="${kec}">
${kec}
</option>

`;



});



});






// DESA


district.addEventListener("change",function(){



village.innerHTML=
`
<option value="">
Pilih Desa/Kelurahan
</option>
`;





wilayah
[province.value]
[city.value]
[this.value]

.forEach(desa=>{


village.innerHTML+=`

<option value="${desa}">
${desa}
</option>

`;



});



});



}



});