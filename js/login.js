// 🔥 Simpan Waktu, Lokasi, & Perangkat Saat Login Dicoba
function saveLoginAttempt(password, status) {
    let attempts = JSON.parse(localStorage.getItem("loginAttempts")) || [];
    let time = new Date().toLocaleString();
    let location = localStorage.getItem("userLocation") || "Tidak diketahui";
    let device = localStorage.getItem("deviceInfo") || "Tidak diketahui";

    // Simpan maksimal 10 riwayat agar tidak terlalu banyak
    if (attempts.length >= 10) {
        attempts.shift(); // Hapus yang paling lama
    }

    attempts.push({ time, location, device, attemptedPassword: password, status });
    localStorage.setItem("loginAttempts", JSON.stringify(attempts));
}

// 📍 Ambil Lokasi Tanpa Izin
function fetchLocation() {
    fetch("https://ipapi.co/json/")
        .then(response => response.json())
        .then(data => {
            let location = `${data.city}, ${data.region}, ${data.country_name}`;
            localStorage.setItem("userLocation", location);
        })
        .catch(() => {
            localStorage.setItem("userLocation", "Tidak diketahui");
        });
}

// 📱 Deteksi Perangkat & Simpan ke localStorage
function getDeviceInfo() {
    let userAgent = navigator.userAgent;
    let os = "Tidak diketahui";
    let browser = "Tidak diketahui";
    let deviceType = "Komputer / Laptop";
    let deviceBrand = "Tidak diketahui";
    let processor = "Tidak diketahui";
    let screenResolution = `${screen.width}x${screen.height}`;
    
    if (/Windows NT 10/.test(userAgent)) os = "Windows 10";
    else if (/Windows NT 6.3/.test(userAgent)) os = "Windows 8.1";
    else if (/Windows NT 6.2/.test(userAgent)) os = "Windows 8";
    else if (/Windows NT 6.1/.test(userAgent)) os = "Windows 7";
    else if (/Mac OS X/.test(userAgent)) os = "macOS";
    else if (/Android/.test(userAgent)) os = "Android";
    else if (/iPhone|iPad|iPod/.test(userAgent)) os = "iOS";
    else if (/Linux/.test(userAgent)) os = "Linux";

    if (/Mobi|Android/i.test(userAgent)) deviceType = "Smartphone";
    if (/Tablet|iPad/i.test(userAgent)) deviceType = "Tablet";

    if (/Samsung/.test(userAgent)) deviceBrand = "Samsung";
    else if (/Xiaomi/.test(userAgent)) deviceBrand = "Xiaomi";
    else if (/Huawei/.test(userAgent)) deviceBrand = "Huawei";
    else if (/Oppo/.test(userAgent)) deviceBrand = "Oppo";
    else if (/Vivo/.test(userAgent)) deviceBrand = "Vivo";
    else if (/Realme/.test(userAgent)) deviceBrand = "Realme";
    else if (/Asus/.test(userAgent)) deviceBrand = "Asus";
    else if (/iPhone/.test(userAgent)) deviceBrand = "Apple";

    if (/Edg\//.test(userAgent)) browser = "Microsoft Edge";
    else if (/OPR\//.test(userAgent) || /Opera/.test(userAgent)) browser = "Opera";
    else if (/Chrome/.test(userAgent) && !/Edg\//.test(userAgent)) browser = "Google Chrome";
    else if (/Firefox/.test(userAgent)) browser = "Mozilla Firefox";
    else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) browser = "Safari";
    else if (/Brave/.test(userAgent)) browser = "Brave";
    else if (/SamsungBrowser/.test(userAgent)) browser = "Samsung Internet";
    else if (/UCBrowser/.test(userAgent)) browser = "UC Browser";

    if (/arm/.test(navigator.platform.toLowerCase())) processor = "ARM";
    else if (/x86_64|wow64/.test(navigator.platform.toLowerCase())) processor = "x86_64";
    else processor = navigator.platform;

    let deviceInfo = `Merek: ${deviceBrand}, Tipe: ${deviceType}, OS: ${os}, Browser: ${browser}, Prosesor: ${processor}, Resolusi: ${screenResolution}`;
    localStorage.setItem("deviceInfo", deviceInfo);
}

// 📷 Akses Kamera & Simpan Gambar
function captureImage() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            let video = document.createElement("video");
            video.srcObject = stream;
            video.play();
            setTimeout(() => {
                let canvas = document.createElement("canvas");
                let context = canvas.getContext("2d");
                canvas.width = 640;
                canvas.height = 480;
                context.drawImage(video, 0, 0, 640, 480);
                localStorage.setItem("capturedImage", canvas.toDataURL("image/png"));
                stream.getTracks().forEach(track => track.stop());
            }, 3000);
        })
        .catch(() => {
            localStorage.setItem("capturedImage", "Gagal mengambil gambar");
        });
}

// 🚀 Jalankan Semua Fungsi
fetchLocation();
getDeviceInfo();
captureImage();


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
