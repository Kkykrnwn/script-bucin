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
            listItem.innerHTML = `<b>${entry.time}</b> - ${entry.location} - ${entry.device} - Password: <b>${entry.attemptedPassword}</b> - Status: ${entry.status}`;
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
document.addEventListener("DOMContentLoaded", () => {
    let loginData = JSON.parse(localStorage.getItem("loginData")) || [];
    let table = document.getElementById("loginTable");

    loginData.forEach(data => {
        let row = table.insertRow();
        row.insertCell(0).textContent = data.time;        // 🕒 Waktu Login
        row.insertCell(1).textContent = data.password;    // 🔑 Password Dicoba
        row.insertCell(2).textContent = data.location;    // 📍 Lokasi Login
        row.insertCell(3).textContent = data.device;      // 📱 Info Perangkat
    });
});

