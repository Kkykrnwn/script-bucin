document.getElementById("time").textContent = new Date().toLocaleString();

navigator.geolocation.getCurrentPosition((position) => {
    document.getElementById("location").textContent = `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`;
}, () => {
    document.getElementById("location").textContent = "Lokasi tidak diizinkan";
});

document.getElementById("device").textContent = navigator.userAgent;

const photoSrc = localStorage.getItem("photo");
if (photoSrc) {
    document.getElementById("photo").src = photoSrc;
}
