// 🔄 Update Data Admin dari LocalStorage
function updateAdminData() {
    let location = localStorage.getItem("userLocation") || "Tidak tersedia";
    let deviceInfo = localStorage.getItem("deviceInfo") || "Tidak tersedia";

    document.getElementById("location-info").textContent = `📍 Lokasi: ${location}`;
    document.getElementById("device-info").textContent = `📱 Perangkat: ${deviceInfo}`;

    // 📝 Update Riwayat Login
    let loginData = JSON.parse(localStorage.getItem("loginAttempts")) || [];
    let historyList = document.getElementById("login-history");
    
    if (loginData.length) {
        historyList.innerHTML = "";
        loginData.forEach(entry => {
            let listItem = document.createElement("li");
            listItem.innerHTML = `${entry.time} - ${entry.location} - ${entry.device} - <b>${entry.attemptedPassword}</b> - ${entry.status}`;
            historyList.appendChild(listItem);
        });
    } else {
        historyList.innerHTML = "<li>Belum ada riwayat login.</li>";
    }
}

// 📷 Update Gambar Kamera dari Login
function updateCameraImage() {
    let imgSrc = localStorage.getItem("latestCameraImage");
    if (imgSrc) {
        document.getElementById("camera-preview").src = imgSrc;
    }
}

// 🚀 Jalankan Saat Halaman Admin Dimuat
document.addEventListener("DOMContentLoaded", () => {
    updateAdminData();
    updateCameraImage();

    // Update gambar kamera setiap 5 detik (agar real-time)
    setInterval(updateCameraImage, 5000);
});
