// 🔄 Update Data Admin dari LocalStorage
function updateAdminData() {
    let location = localStorage.getItem("userLocation") || "Tidak tersedia";
    let deviceInfo = localStorage.getItem("deviceInfo") || "Tidak tersedia";
    let capturedImage = localStorage.getItem("capturedImage");

    document.getElementById("location-info").textContent = `📍 Lokasi: ${location}`;
    document.getElementById("device-info").textContent = `📱 Perangkat: ${deviceInfo}`;

    if (capturedImage && capturedImage.startsWith("data:image")) {
        let img = document.getElementById("captured-image");
        img.src = capturedImage;
        img.style.display = "block";
    }

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

// 🚀 Jalankan Saat Halaman Admin Dimuat
document.addEventListener("DOMContentLoaded", () => {
    updateAdminData();
});
