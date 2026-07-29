const userBtn = document.getElementById("user-btn");
const userDropdown = document.getElementById("userDropdown");

const user = JSON.parse(sessionStorage.getItem("user"));


if (user && userBtn) {

    if (user.photo) {

        userBtn.innerHTML = `
            <img 
            src="${user.photo}"
            class="header-profile-photo">
        `;

    } else {

        userBtn.innerHTML = `
        <svg class="icon"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24"
        viewBox="0 0 24 24">

        <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Z"/>

        </svg>
        `;
    }


    userBtn.addEventListener("click",function(e){

        e.preventDefault();

        if(userDropdown){

            userDropdown.style.display =
            userDropdown.style.display === "block"
            ? "none"
            :"block";

        }

    });



    document.addEventListener("click",function(e){

        if(
            userDropdown &&
            !userDropdown.contains(e.target) &&
            !userBtn.contains(e.target)
        ){

            userDropdown.style.display="none";

        }

    });



}else if(userBtn){


    userBtn.addEventListener("click",function(e){

        e.preventDefault();

        window.location.href="login.html";

    });

}




const logoutBtn=document.getElementById("logoutBtn");


if(logoutBtn){

    logoutBtn.addEventListener("click",()=>{

        sessionStorage.removeItem("user");

        window.location.href="index.html";

    });

}