const userBtn = document.getElementById("user-btn");

if (userBtn) {
    userBtn.addEventListener("click", function(e) {
        e.preventDefault();
        window.location.href = "login.html";
    });
}