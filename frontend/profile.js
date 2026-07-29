// =======================
// PROFILE USER
// =======================


const profileName = document.getElementById("profileName");
const profilePhone = document.getElementById("profilePhone");


const profileUser = JSON.parse(
    sessionStorage.getItem("user")
);



if(profileName && profilePhone){


    if(!profileUser){

        window.location.href="login.html";

    }else{

        profileName.textContent =
        profileUser.fullname || "-";


        profilePhone.textContent =
        profileUser.phone || "-";

    }

}



// =======================
// FOTO PROFILE
// =======================


const profileImage =
document.getElementById("profileImage");


if(profileImage){


    if(profileUser && profileUser.photo){

        profileImage.src =
        profileUser.photo;

    }


}




const photoInput =
document.getElementById("photoInput");


const previewPhoto =
document.getElementById("previewPhoto");




if(photoInput && previewPhoto){



    // tampil foto lama

    if(profileUser && profileUser.photo){

        previewPhoto.src =
        profileUser.photo;

    }



    // preview foto baru


    photoInput.addEventListener(
        "change",
        function(){


        const file =
        this.files[0];


        if(!file)return;


        previewPhoto.src =
        URL.createObjectURL(file);


    });



}






// =======================
// EDIT PROFILE
// =======================


const fullnameInput =
document.getElementById("fullname");


const emailInput =
document.getElementById("email");


const phoneInput =
document.getElementById("phone");


const provinceInput =
document.getElementById("province");


const cityInput =
document.getElementById("city");


const districtInput =
document.getElementById("district");


const villageInput =
document.getElementById("village");


const streetInput =
document.getElementById("street");


const houseNumberInput =
document.getElementById("houseNumber");


const rtRwInput =
document.getElementById("rtRw");


const detailInput =
document.getElementById("detail");


const saveBtn =
document.getElementById("saveProfile");






if(
fullnameInput &&
emailInput &&
phoneInput &&
provinceInput &&
cityInput &&
districtInput &&
villageInput &&
streetInput &&
houseNumberInput &&
rtRwInput &&
detailInput &&
saveBtn
){



if(!profileUser){

    window.location.href="login.html";

}





// tampilkan data lama


fullnameInput.value =
profileUser.fullname || "";


emailInput.value =
profileUser.email || "";


phoneInput.value =
profileUser.phone || "";


provinceInput.value =
profileUser.province || "";


cityInput.value =
profileUser.city || "";


districtInput.value =
profileUser.district || "";


villageInput.value =
profileUser.village || "";


streetInput.value =
profileUser.street || "";


houseNumberInput.value =
profileUser.house_number || "";


rtRwInput.value =
profileUser.rt_rw || "";


detailInput.value =
profileUser.detail || "";








saveBtn.addEventListener(
"click",
async()=>{


try{



// =======================
// UPLOAD FOTO
// =======================


if(photoInput && photoInput.files.length > 0){



const formData =
new FormData();


formData.append(
"photo",
photoInput.files[0]
);




const uploadResponse =
await fetch(

`https://tugasuaspemrogramanweb-production.up.railway.app/api/users/upload-photo/${profileUser.id}`,

{

method:"POST",

body:formData

}

);




const uploadResult =
await uploadResponse.json();




if(!uploadResponse.ok){

alert(uploadResult.message);

return;

}




profileUser.photo =
uploadResult.photo;



sessionStorage.setItem(
"user",
JSON.stringify(profileUser)
);



}







// =======================
// UPDATE DATA USER
// =======================



const response =
await fetch(

`https://tugasuaspemrogramanweb-production.up.railway.app/api/users/${profileUser.id}`,

{


method:"PUT",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

fullname:
fullnameInput.value,


email:
emailInput.value,


phone:
phoneInput.value,


province:
provinceInput.value,


city:
cityInput.value,


district:
districtInput.value,


village:
villageInput.value,


street:
streetInput.value,


houseNumber:
houseNumberInput.value,


rtRw:
rtRwInput.value,


detail:
detailInput.value


})


}

);







const result =
await response.json();






if(response.ok){



const updatedUser={


...profileUser,


fullname:
fullnameInput.value,


email:
emailInput.value,


phone:
phoneInput.value,


province:
provinceInput.value,


city:
cityInput.value,


district:
districtInput.value,


village:
villageInput.value,


street:
streetInput.value,


house_number:
houseNumberInput.value,


rt_rw:
rtRwInput.value,


detail:
detailInput.value,


photo:
profileUser.photo


};






sessionStorage.setItem(

"user",

JSON.stringify(updatedUser)

);






alert(
"Profil berhasil diperbarui"
);




window.location.href=
"profile.html";






}else{


alert(
result.message ||
"Gagal memperbarui profil"
);


}





}catch(error){



console.error(error);


alert(
"Terjadi kesalahan server"
);



}



});


}