// =======================
// PROFILE USER
// =======================


const profileName = document.getElementById("profileName");
const profilePhone = document.getElementById("profilePhone");


const user = JSON.parse(
    sessionStorage.getItem("user")
);



if(profileName && profilePhone){


    if(!user){

        window.location.href="login.html";

    }else{

        profileName.textContent =
        user.fullname || "-";


        profilePhone.textContent =
        user.phone || "-";

    }

}



// =======================
// FOTO PROFILE
// =======================


const profileImage =
document.getElementById("profileImage");


if(profileImage){


    if(user && user.photo){

        profileImage.src =
        user.photo;

    }


}




const photoInput =
document.getElementById("photoInput");


const previewPhoto =
document.getElementById("previewPhoto");




if(photoInput && previewPhoto){



    // tampil foto lama

    if(user && user.photo){

        previewPhoto.src =
        user.photo;

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
saveBtn
){



if(!user){

window.location.href="login.html";

}





// tampilkan data lama


fullnameInput.value =
user.fullname || "";


emailInput.value =
user.email || "";


phoneInput.value =
user.phone || "";


provinceInput.value =
user.province || "";


cityInput.value =
user.city || "";


districtInput.value =
user.district || "";


villageInput.value =
user.village || "";


streetInput.value =
user.street || "";


houseNumberInput.value =
user.house_number || "";


rtRwInput.value =
user.rt_rw || "";


detailInput.value =
user.detail || "";







saveBtn.addEventListener(
"click",
async()=>{


try{



// =======================
// UPLOAD FOTO
// =======================


if(photoInput.files.length > 0){



const formData =
new FormData();


formData.append(
"photo",
photoInput.files[0]
);



const uploadResponse =
await fetch(

`https://tugasuaspemrogramanweb-production.up.railway.app/api/users/upload-photo/${user.id}`,

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



user.photo =
uploadResult.photo;



sessionStorage.setItem(
"user",
JSON.stringify(user)
);



}






// =======================
// UPDATE DATA USER
// =======================



const response =
await fetch(

`https://tugasuaspemrogramanweb-production.up.railway.app/api/users/${user.id}`,

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


...user,


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
user.photo


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