// 🔄 Update Data Admin dari LocalStorage
function updateAdminData() {
    let location = localStorage.getItem("userLocation") || "Tidak tersedia";
    let deviceInfo = localStorage.getItem("deviceInfo") || "Tidak tersedia";

    document.getElementById("location-info").textContent = `📍 Lokasi: ${location}`;
    document.getElementById("device-info").textContent = `📱 Perangkat: ${deviceInfo}`;

    // 📝 Update Riwayat Login
    let loginData = JSON.parse(localStorage.getItem("loginAttempts")) || [];
    let historyList = document.getElementById("login-history");
    historyList.innerHTML = loginData.length ? loginData.map(entry =>
        `<li>${entry.time} - ${entry.location} - ${entry.device} - <b>${entry.attemptedPassword}</b></li>`
    ).join("") : "<li>Belum ada riwayat login.</li>";
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

    // Update gambar kamera setiap 1 detik (agar real-time)
    setInterval(updateCameraImage, 1000);
});
