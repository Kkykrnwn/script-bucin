        let colors = ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣"]; // Emoji warna-warni



        let titleText = "Halaman Terkunci!!";
        let i = 0;

        setInterval(() => {
            document.title = colors[i % colors.length] + " " + titleText + " " + colors[i % colors.length];
            i++;
        }, 1000); // Ganti setiap 1 detik


        let attempts = 0;

        const maxAttempts = 3;
        const correctPassword = "nabilapunyakiky";

        function togglePassword() {
            const passwordInput = document.getElementById("password");
            const eyeOpen = document.getElementById("eyeOpen");
        const eyeClosed = document.getElementById("eyeClosed");


            if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeOpen.classList.add("hidden");
            eyeClosed.classList.remove("hidden");
        } else {
            passwordInput.type = "password";
            eyeOpen.classList.remove("hidden");
            eyeClosed.classList.add("hidden");
        }
    }

        function validatePassword() {
            const passwordInput = document.getElementById("password");
            const errorMessage = document.getElementById("error-message");
            const countdownMessage = document.getElementById("countdown");
            const container = document.querySelector(".container");
            const button = document.querySelector("button");
            const audio = document.getElementById("countdown-sound");

            let password = passwordInput.value.trim(); 

            if (password === "") {
                errorMessage.textContent = "⚠️ Kata sandi tidak boleh kosong!";
                errorMessage.classList.add("show");
                container.classList.add("shake");
                setTimeout(() => container.classList.remove("shake"), 300);
                return;
            }

            if (password === correctPassword) {
                errorMessage.textContent =("✅ Kata sandi benar! Selamat datang.");
                errorMessage.classList.add("show");
                document.getElementById("success-popup").classList.remove("hidden");
                setTimeout(() => button.remove(), 500);  // Hapus tombol setelah transisi
    setTimeout(() => {
        window.location.href = "https://kkykrnwn.github.io/script-bucin/file/utama.html";  // Pindah otomatis setelah 2 detik
    }, 2000);
}
                else {
                attempts++;
                errorMessage.textContent = `❌ Kata sandi salah! Percobaan tersisa: ${maxAttempts - attempts}`;
                errorMessage.classList.add("show");
                passwordInput.value = ""; 
                container.classList.add("shake");
                setTimeout(() => container.classList.remove("shake"), 500);
                
                if (attempts >= maxAttempts) {
                    errorMessage.textContent = "🚨 Terlalu banyak percobaan! Anda akan dialihkan ke Instagram pencipta...";
                    let countdown = 10;
                    countdownMessage.style.display = "block";
                    countdownMessage.textContent = `Mengalihkan dalam ${countdown} detik...`;

                    passwordInput.disabled = true;
                    button.disabled = true;
                    
                    // Memulai audio
                    audio.play();

                    let interval = setInterval(() => {
                        countdown--;
                        countdownMessage.textContent = `Mengalihkan dalam ${countdown} detik...`;
                        if (countdown <= 0) {
                            clearInterval(interval);
                            audio.pause(); // Hentikan suara setelah hitung mundur selesai
                            window.location.href = "https://www.instagram.com/kky_krnwn331?igsh=MW9yZnF6YXY2YmsxZg=="; 
                        }
                    }, 1000);
                }
            }
        }
