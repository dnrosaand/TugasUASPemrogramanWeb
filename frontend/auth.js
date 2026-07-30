// =======================
// LOGIN
// =======================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {

            const response = await fetch(
                "https://tugasuaspemrogramanweb-production.up.railway.app/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const result = await response.json();

            if (response.ok) {

                sessionStorage.setItem(
                    "user",
                    JSON.stringify(result.user)
                );

                alert("Login berhasil!");

                window.location.href = "index.html";

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.error(error);

            alert("Terjadi kesalahan. Silakan coba lagi.");

        }

    });

}


// =======================
// DATA DIRI REGISTER
// =======================

const nextBtn = document.getElementById("nextBtn");

if (nextBtn) {

    nextBtn.addEventListener("click", () => {

        const firstName = document.getElementById("firstname").value.trim();
        const lastName = document.getElementById("lastname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Validasi
        if (
            !firstName ||
            !lastName ||
            !email ||
            !phone ||
            !password ||
            !confirmPassword
        ) {

            alert("Semua data harus diisi.");

            return;

        }

        if (password !== confirmPassword) {

            alert("Konfirmasi kata sandi tidak sesuai.");

            return;

        }

        const data = {

            firstName,
            lastName,
            email,
            phone,
            password

        };

        sessionStorage.setItem(
            "registerData",
            JSON.stringify(data)
        );

        window.location.href = "alamat.html";

    });

}