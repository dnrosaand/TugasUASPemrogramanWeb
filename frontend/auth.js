// LOGIN


const loginForm=
document.getElementById("loginForm");


if(loginForm){


loginForm.addEventListener("submit",async(e)=>{


e.preventDefault();


const email=
document.getElementById("email").value;


const password=
document.getElementById("password").value;



const response=
await fetch(
"https://tugasuaspemrogramanweb-production.up.railway.app/api/users/login",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
password
})

});


const result=
await response.json();



if(response.ok){


sessionStorage.setItem(
"user",
JSON.stringify(result.user)
);


alert("Login berhasil");

window.location.href="index.html";


}else{


alert(result.message);


}


});


}





// DATA DIRI REGISTER


const nextBtn=
document.getElementById("nextBtn");


if(nextBtn){


nextBtn.onclick=()=>{


const data={

firstName:
firstname.value,

lastName:
lastname.value,

email:
email.value,

phone:
phone.value,

password:
password.value


};



sessionStorage.setItem(
"registerData",
JSON.stringify(data)
);


window.location.href="alamat.html";


};


}