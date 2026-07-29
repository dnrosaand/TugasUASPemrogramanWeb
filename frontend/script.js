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
    } else {
        userBtn.innerHTML = `
        <svg class="icon" xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24"
        viewBox="0 0 24 24">
        <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm0 2a9 9 0 016.447 15.276 7 7 0 00-12.895 0A9 9 0 0112 3Zm0 2a4 4 0 100 8 4 4 0 000-8Zm0 2a2 2 0 110 4 2 2 0 010-4Zm-.1 9.001L11.899 16a5 5 0 014.904 3.61A8.96 8.96 0 0112 21a8.96 8.96 0 01-4.804-1.391 5 5 0 014.704-3.608Z"/>
        </svg>
        `;
    }


    userBtn.addEventListener("click", function (e) {
        e.preventDefault();

        if (userDropdown) {
            if (userDropdown.style.display === "block") {
                userDropdown.style.display = "none";
            } else {
                userDropdown.style.display = "block";
            }
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

// Kalau belum login
else if (userBtn) {

    userBtn.addEventListener("click", function(e){

        e.preventDefault();

        window.location.href = "login.html";

    });

}


// LOGOUT

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function(){

        sessionStorage.removeItem("user");

        window.location.href = "index.html";

    });

}

// =======================
// DETAIL PRODUK
// =======================

function goToDetail(card) {

    const product = {
        image: card.dataset.image,
        category: card.dataset.category,
        artist: card.dataset.artist,
        name: card.dataset.name,
        price: card.dataset.price,
        oldprice: card.dataset.oldprice,
        sold: card.dataset.sold,
        stock: card.dataset.stock,
        desc: card.dataset.desc
    };

    localStorage.setItem("product", JSON.stringify(product));
    window.location.href = "detail.html";
}

// =======================
// QTY BUTTON
// =======================

const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const qtyInput = document.getElementById("qty");

if (plusBtn && minusBtn && qtyInput) {
    plusBtn.addEventListener("click", function () {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    });

    minusBtn.addEventListener("click", function () {
        if (parseInt(qtyInput.value) > 1) {
            qtyInput.value = parseInt(qtyInput.value) - 1;
        }
    });
}

// =======================
// LOAD PRODUCT DARI BACKEND
// =======================

async function loadProducts() {

    const container = document.getElementById("flash-sale-products");

    if (!container) return;

    try {

        const response = await fetch("https://tugasuaspemrogramanweb-production.up.railway.app/api/products");
        const products = await response.json();

        products.forEach(product => {

            // Hitung persentase terjual
            const soldPercent = Math.round(
                (product.sold / (product.sold + product.stock)) * 100
            );

            container.innerHTML += `
                <div class="product-card"
                    onclick="goToDetail(this)"
                    data-image="${product.image}"
                    data-category="${product.category}"
                    data-artist="${product.artist}"
                    data-name="${product.name}"
                    data-price="${product.price}"
                    data-oldprice="${product.old_price}"
                    data-sold="${product.sold}"
                    data-stock="${product.stock}"
                    data-desc="${product.description}">

                    <img src="${product.image}" alt="${product.name}">

                    <div class="product-info">

                        <small>${product.status}</small>

                        <p class="product-name">
                            ${product.name}
                        </p>

                        <p class="price">
                            Rp${Number(product.price).toLocaleString("id-ID")}
                            <span>Rp${Number(product.old_price).toLocaleString("id-ID")}</span>
                        </p>

                        <div class="flash-sale-box">

                            <div class="progress">
                                <div class="progress-bar" style="width:${soldPercent}%"></div>
                            </div>

                            <p class="sold-text">
                                ${soldPercent}% Terjual
                            </p>

                        </div>

                    </div>

                </div>
            `;

        });

    } catch (err) {

        console.error("Gagal mengambil produk:", err);

    }

}

loadProducts();

// ================= OUR STOCK ================= //

console.log("PATH:", window.location.pathname);

if (window.location.pathname.includes("ourstock")) {
    console.log("MASUK OUR STOCK");
    loadStocks();
}


async function loadStocks() {

    console.log("LOAD STOCK JALAN");

    try {

        const response = await fetch(
            "https://tugasuaspemrogramanweb-production.up.railway.app/api/stocks"
        );


        const products = await response.json();


        console.log("DATA STOCK:", products);


        const productGrid = document.getElementById("our-stock-products");


        console.log("PRODUCT GRID:", productGrid);


        if (!productGrid) {
            console.error("Element our-stock-products tidak ditemukan");
            return;
        }


        products.forEach(product => {


            const card = `

            <div class="product-card"
                onclick="goToDetail(this)"

                data-image="${product.image}"
                data-category="${product.category}"
                data-artist="${product.artist}"
                data-name="${product.name}"
                data-price="${product.price}"
                data-oldprice="${product.old_price || ''}"
                data-stock="${product.stock}"
                data-sold="${product.sold}"
                data-desc="${product.description}"
            >


                <img 
                    src="${product.image}" 
                    alt="${product.name}"
                >


                <div class="product-info">


                    <small>
                        ${product.status}
                    </small>


                    <p class="product-name">
                        ${product.name}
                    </p>


                    <p class="price">
                        Rp${Number(product.price).toLocaleString("id-ID")}
                    </p>


                    <div class="product-action">


                        <button class="buy-btn">
                            Belanja
                        </button>


                        <img 
                            src="img/Shopping cart.png" 
                            alt="cart"
                        >


                    </div>


                </div>


            </div>

            `;


            productGrid.insertAdjacentHTML(
                "beforeend",
                card
            );


        });


    } catch(error) {


        console.error(
            "ERROR STOCK:",
            error
        );


    }

}

// =======================
// LOGIN USER
// =======================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function(e){

        e.preventDefault();


        const email = document.getElementById("email").value;
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


            if(response.ok){

                sessionStorage.setItem(
                    "user",
                    JSON.stringify(result.user)
                );

                alert("Login berhasil!");
                window.location.href = "index.html";
            } else {
                alert(result.message);
            }


        } catch(error){

            console.error(error);

            alert("Server tidak terhubung.");

        }


    });

}

// =======================
// DATA DIRI
// =======================

const nextBtn = document.getElementById("nextBtn");

if (nextBtn) {

    nextBtn.addEventListener("click", function () {

        const firstName = document.getElementById("firstname").value.trim();
        const lastName = document.getElementById("lastname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

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
            alert("Konfirmasi password tidak sama.");
            return;
        }

        const registerData = {
            firstName,
            lastName,
            email,
            phone,
            password
        };

        sessionStorage.setItem(
            "registerData",
            JSON.stringify(registerData)
        );

        window.location.href = "alamat.html";

    });

}

// ------Alamat------- //
document.addEventListener("DOMContentLoaded", () => {

    const agreeCheck = document.getElementById("agreeCheck");
    const registerBtn = document.getElementById("registerBtn");

    if (agreeCheck && registerBtn) {

        registerBtn.disabled = true;

        agreeCheck.addEventListener("change", function () {

            registerBtn.disabled = !this.checked;

        });

        // =======================
        // CEK DATA DARI HALAMAN PERTAMA
        // =======================

        registerBtn.addEventListener("click", async function () {

    const user = JSON.parse(sessionStorage.getItem("registerData"));

    if (!user) {
        alert("Data diri belum diisi.");
        return;
    }

    const data = {
        fullname: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        password: user.password,

        province: document.getElementById("province").value,
        city: document.getElementById("city").value,
        district: document.getElementById("district").value,
        village: document.getElementById("village").value,
        street: document.getElementById("street").value,
        houseNumber: document.getElementById("houseNumber").value,
        rtRw: document.getElementById("rtRw").value,
        detail: document.getElementById("detail").value
    };

    try {

        if (
            data.province === "Provinsi" ||
            data.city === "Kabupaten/Kota" ||
            data.district === "Kecamatan" ||
            data.village === "Kelurahan/Desa"
        ) {
            alert("Silakan lengkapi alamat.");
            return;
        }

        const response = await fetch("https://tugasuaspemrogramanweb-production.up.railway.app/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Registrasi berhasil!");
            sessionStorage.removeItem("registerData");
            window.location.href = "login.html";
        }
        else {

            alert(result.message);

        }

    } catch (err) {

        console.error(err);
        alert("Server Error");

    }

});

    }

});

// ======================= PROFILE USER ======================= //
const profileName = document.getElementById("profileName");
const profilePhone = document.getElementById("profilePhone");

if (profileName && profilePhone) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
        window.location.href = "login.html";
    }
    profileName.textContent = user.fullname;
    profilePhone.textContent = user.phone;
}

const profileImage = document.getElementById("profileImage");
if (profileImage) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.photo) {
        profileImage.src = user.photo;
    }
}

const photoInput = document.getElementById("photoInput");
const previewPhoto = document.getElementById("previewPhoto");

if (photoInput && previewPhoto) {

    // tampilkan foto lama
    if (user && user.photo) {
        previewPhoto.src = user.photo;
    }

    // preview foto baru
    photoInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        previewPhoto.src = URL.createObjectURL(file);

    });

}

// ------ edit ------ //
const fullnameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const provinceInput = document.getElementById("province");
const cityInput = document.getElementById("city");
const districtInput = document.getElementById("district");
const villageInput = document.getElementById("village");
const streetInput = document.getElementById("street");
const houseNumberInput = document.getElementById("houseNumber");
const rtRwInput = document.getElementById("rtRw");
const detailInput = document.getElementById("detail");
const saveBtn = document.getElementById("saveProfile");

if (
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
) {
    if (!user) {
        window.location.href = "login.html";
    }
    fullnameInput.value = user.fullname || "";
    emailInput.value = user.email || "";
    phoneInput.value = user.phone || "";
    
    provinceInput.value = user.province || "";
    cityInput.value = user.city || "";
    districtInput.value = user.district || "";
    villageInput.value = user.village || "";
    streetInput.value = user.street || "";
    houseNumberInput.value = user.house_number || "";
    rtRwInput.value = user.rt_rw || "";
    detailInput.value = user.detail || "";

    saveBtn.addEventListener("click", async () => {
        try {
            if (photoInput.files.length > 0) {

    const formData = new FormData();
    formData.append("photo", photoInput.files[0]);

    const uploadResponse = await fetch(
        `https://tugasuaspemrogramanweb-production.up.railway.app/api/users/upload-photo/${user.id}`,
        {
            method: "POST",
            body: formData
        }
    );

    const uploadResult = await uploadResponse.json();

    if (!uploadResponse.ok) {
        alert(uploadResult.message);
        return;
    }

    user.photo = uploadResult.photo;
}

            const response = await fetch(
                `https://tugasuaspemrogramanweb-production.up.railway.app/api/users/${user.id}`,
                {
                    method: "PUT",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fullname: fullnameInput.value,
                        email: emailInput.value,
                        phone: phoneInput.value,
                        province: provinceInput.value,
                        city: cityInput.value,
                        district: districtInput.value,
                        village: villageInput.value,
                        street: streetInput.value,
                        houseNumber: houseNumberInput.value,
                        rtRw: rtRwInput.value,
                        detail: detailInput.value
                    })
                }
            );
            const result = await response.json();
            if (response.ok) {
                // Update session
                const updatedUser = {
                    ...user,
                    fullname: fullnameInput.value,
                    email: emailInput.value,
                    phone: phoneInput.value,
                    province: provinceInput.value,
                    city: cityInput.value,
                    district: districtInput.value,
                    village: villageInput.value,
                    street: streetInput.value,
                    house_number: houseNumberInput.value,
                    rt_rw: rtRwInput.value,
                    detail: detailInput.value
                    photo: user.photo
                };
                sessionStorage.setItem(
                    "user",
                    JSON.stringify(updatedUser)
                );
                alert("Profil berhasil diperbarui.");
                window.location.href = "profile.html";
            } else {
                alert(result.message || "Gagal memperbarui profil.");
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan pada server.");
        }
    });
}