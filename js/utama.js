        let colors = ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣"]; // Emoji warna-warni

        let titleText = "Halaman Nabilaa";
        let i = 0;

        setInterval(() => {
            document.title = colors[i % colors.length] + " " + titleText + " " + colors[i % colors.length];
            i++;
        }, 1000); // Ganti setiap 1 detik

  // Preload audio agar tidak ada delay saat tombol ditekan

  const clickSound = new Audio('');


  function playClickSound() {
      let soundClone = clickSound.cloneNode(); // Mengkloning audio agar bisa diputar berulang tanpa delay
      soundClone.play();
  }

  // Menambahkan event listener pada semua tombol
  document.querySelectorAll('.transparent-button, .dropdown-content button').forEach(button => {
      button.addEventListener('click', playClickSound);
  });
  

    // Script JavaScript untuk Mengganti Musik

        function gantiMusik(file) {
            let audioPlayer = document.getElementById("audioPlayer");
            let audioSource = document.getElementById("audioSource");
            audioSource.src = file;
            audioPlayer.load();
            audioPlayer.play();
        }

        // Mencegah zoom menggunakan gesture pada perangkat mobile
        document.addEventListener('gesturestart', function (e) {
            e.preventDefault();
        });

        // Mencegah zoom dengan kombinasi ctrl + scroll di desktop
        document.addEventListener('wheel', function (e) {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        }, { passive: false });

        // Mencegah zoom menggunakan pinch-to-zoom pada perangkat mobile
        document.addEventListener('touchmove', function (e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });

        //wallpaper
        const wallpapers = [
        'https://kkykrnwn.github.io/script-bucin/img/papayang1.jpg',
        'https://kkykrnwn.github.io/script-bucin/img/papayang2.jpg',
        'https://kkykrnwn.github.io/script-bucin/img/papayang3.jpg',
        'https://kkykrnwn.github.io/script-bucin/img/papayang4.jpg',
        'https://kkykrnwn.github.io/script-bucin/img/papayang5.jpg',
        'https://kkykrnwn.github.io/script-bucin/img/papayang6.jpg',
        'https://kkykrnwn.github.io/script-bucin/img/papayang7.jpg',
        'https://kkykrnwn.github.io/script-bucin/img/papayang8.jpg',
        'https://kkykrnwn.github.io/script-bucin/img/papayang9.jpg',
        'https://kkykrnwn.github.io/script-bucin/img/papayang10.jpg'
        ];

        let index = 0;
        function gantiWallpaper() {
            document.body.style.backgroundImage = `url('${wallpapers[index]}')`;
            index = (index + 1) % wallpapers.length;
        }

        setInterval(gantiWallpaper, 5000); // Ganti setiap 5 detik

        // Pencegahan zoom
        document.addEventListener('gesturestart', e => e.preventDefault());
        document.addEventListener('wheel', e => { if (e.ctrlKey) e.preventDefault(); }, { passive: false });
        document.addEventListener('touchmove', e => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
        
        function handleScrollAnimation() {
            const elements = document.querySelectorAll('.fade-in, .scale-in, .rotate-in');
            elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    element.classList.add('visible');
                } else {
                    element.classList.remove('visible');
                }
            });
        }
        window.addEventListener('scroll', handleScrollAnimation);
        document.addEventListener('DOMContentLoaded', handleScrollAnimation);

