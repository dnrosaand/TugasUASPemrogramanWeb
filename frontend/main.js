const userBtn = document.getElementById("user-btn");
const userDropdown = document.getElementById("userDropdown");
const user = JSON.parse(sessionStorage.getItem("user"));


// Kalau user sudah login
if (user && userBtn) {

    if (user.photo) {
        userBtn.innerHTML = `
        <img
        src="${user.photo}"
        class="header-profile-photo"
        alt="Profile">
        `;
    }


    userBtn.addEventListener("click", function (e) {

        e.preventDefault();

        if (userDropdown) {

            userDropdown.style.display =
            userDropdown.style.display === "block"
            ? "none"
            : "block";

        }

    });


    document.addEventListener("click", function (e) {

        if (
            userDropdown &&
            !userDropdown.contains(e.target) &&
            !userBtn.contains(e.target)
        ) {

            userDropdown.style.display = "none";

        }

    });

}


else if(userBtn){

    userBtn.addEventListener("click", function(e){

        e.preventDefault();

        window.location.href="login.html";

    });

}



// LOGOUT

const logoutBtn = document.getElementById("logoutBtn");


if(logoutBtn){

    logoutBtn.addEventListener("click",function(){

        sessionStorage.removeItem("user");

        window.location.href="index.html";

    });

}