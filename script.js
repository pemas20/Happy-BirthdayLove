document.addEventListener('DOMContentLoaded', function () {
    // Variables
    let activeSection = 'home';

    // Elements
   const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.menu a');
    const loadingScreen = document.querySelector('.loading-screen');
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const voiceMessage = document.getElementById('voice-message');
    const messageElement = document.querySelector('.message');
    const voiceBtn = document.getElementById("voice-control");
    const playIcon = document.getElementById("play-icon");
    const btnText = document.getElementById("btn-text");

    // Show music popup
    function showMusicPopup() {
        const popup = document.getElementById('music-popup');
        if (!popup) return;
        popup.classList.add('active');

        document.getElementById('enable-music').onclick = () => {
            bgMusic.play()
                .then(() => {
                    musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                    popup.classList.remove('active');
                })
                .catch(e => {
                    alert('Klik tombol speaker nanti yaa');
                    popup.classList.remove('active');
                });
        };

        document.getElementById('disable-music').onclick = () => {
            popup.classList.remove('active');
        };
    }

    // Navigation setup
    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetSection = this.getAttribute('href').slice(1);

                navLinks.forEach(navLink => navLink.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));

                this.classList.add('active');
                document.getElementById(targetSection).classList.add('active');
                activeSection = targetSection;

                window.scrollTo(0, 0);

                if (targetSection === 'home') {
                    triggerConfetti();
                }
            });
        });
    }

    // Countdown timer
    function startCountdown() {
        const birthdayDate = new Date('May 13, 2025 00:00:00').getTime();
        updateCountdown();
        setInterval(updateCountdown, 1000);

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = birthdayDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysElement.textContent = String(days).padStart(2, '0');
            hoursElement.textContent = String(hours).padStart(2, '0');
            minutesElement.textContent = String(minutes).padStart(2, '0');
            secondsElement.textContent = String(seconds).padStart(2, '0');

            if (distance < 0) {
                document.querySelector('.countdown').innerHTML = '<h3>HAPPY BIRTHDAY SAYANGGKUUUU 🥳🎉💓</h3>';
                triggerConfetti();
            }
        }
    }

    // Music control
    function setupMusicControl() {
        musicToggle.addEventListener('click', function () {
            if (bgMusic.paused) {
                bgMusic.play()
                    .then(() => {
                        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                    })
                    .catch(error => {
                        console.log('Audio playback prevented:', error);
                    });
            } else {
                bgMusic.pause();
                musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    }

    // POPUP VIDEO
    function setupVideoPopup() {
        const video = document.querySelector('video');
        const popup = document.getElementById('video-popup');

        video.addEventListener('play', () => {
            if (!bgMusic.paused) {
                popup.classList.add('active');
            }
        });

        document.getElementById('pause-for-video').onclick = () => {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            popup.classList.remove('active');
        };

        document.getElementById('continue-music').onclick = () => {
            popup.classList.remove('active');
        };
    }

    let isPlaying = false;
voiceBtn.addEventListener('click', () => {
    if (!isPlaying) {
        // Kecilkan volume backsound
        if (bgMusic && !bgMusic.paused) {
            bgMusic.volume = 0.1; // Kecilkan volume backsound
        }

        // Mainkan suara narasi
        voiceAudio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        btnText.textContent = 'Klik lagi untuk berhenti yaa...';
        isPlaying = true;
    } else {
        // Kembalikan volume backsound
        bgMusic.volume = 1.0;

        // Hentikan suara narasi
        voiceAudio.pause();
        voiceAudio.currentTime = 0;
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        btnText.textContent = 'Bacanya sambil klik ini yaa...';
        isPlaying = false;
    }
});


    // Typing animation
    function typeWriter(text, element, speed = 100) {
        let i = 0;
        element.textContent = '';
        const typing = setInterval(() => {
            element.textContent += text[i];
            i++;
            if (i === text.length) clearInterval(typing);
        }, speed);
    }

    // Floating hearts
    function createFloatingHearts() {
        const heartsContainer = document.querySelector('.floating-hearts');
        const heartCount = 10;

        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤';
            heart.style.position = 'absolute';
            heart.style.color = `rgba(139, 0, 0, ${Math.random() * 0.3 + 0.1})`;
            heart.style.fontSize = `${Math.random() * 20 + 10}px`;
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.animation = `float ${Math.random() * 6 + 4}s infinite ease-in-out`;
            heart.style.animationDelay = `${Math.random() * 5}s`;
            heartsContainer.appendChild(heart);
        }
    }

    // Confetti trigger
    function triggerConfetti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#8b0000', '#ff6b6b', '#f8a5c2']
            });
        }
    }

    // INIT
    function init() {
        // Hide loading screen after 3 seconds
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                showMusicPopup();
            }, 500);
        }, 3000);

        setupNavigation();
        startCountdown();
        setupMusicControl();
        setupVoiceMessage();
        setupVideoPopup();
        typeWriter("Terima kasih telah menjadi wanita terbaik dalam hidupku", messageElement, 50);
        createFloatingHearts();
    }

    // RUN INIT
    init();
});
