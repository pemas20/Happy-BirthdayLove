document.addEventListener('DOMContentLoaded', function() {
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

    // Initialize
    function init() {
        // Hide loading screen after 3 seconds
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 3000);

        setTimeout(() => {
            showMusicPopup();
        }, 3500);

        // Setup navigation
        setupNavigation();
        
        // Start countdown
        startCountdown();
        
        // Setup music control
        setupMusicControl();
        
        // Setup voice message
        setupVoiceMessage();
        
        // Typing animation for message
        typeWriter("Terima kasih telah menjadi wanita terbaik dalam hidupku", messageElement, 50);
        
        // Create floating hearts
        createFloatingHearts();
    }

    // Show music popup
    function showMusicPopup() {
        const musicPopup = document.getElementById('music-popup');
        musicPopup.classList.add('active');
        
        document.getElementById('enable-music').addEventListener('click', function() {
            bgMusic.muted = false;
            bgMusic.play()
                .then(() => {
                    musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                    musicPopup.classList.remove('active');
                })
                .catch(error => {
                    console.log('Audio playback error:', error);
                    musicPopup.classList.remove('active');
                });
        });
        
        document.getElementById('disable-music').addEventListener('click', function() {
            musicPopup.classList.remove('active');
        });
    }

    // Navigation setup
    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetSection = this.getAttribute('href').slice(1);
                
                // Remove active class from all links and sections
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked link and target section
                this.classList.add('active');
                document.getElementById(targetSection).classList.add('active');
                
                // Update active section
                activeSection = targetSection;
                
                // Scroll to top
                window.scrollTo(0, 0);
                
                // Trigger confetti when going to home section
                if (targetSection === 'home') {
                    triggerConfetti();
                }
            });
        });
    }
    
    // Countdown timer
    function startCountdown() {
        // Birthday date: May 13, 2025
        const birthdayDate = new Date('May 13, 2025 00:00:00').getTime();
        
        // Update countdown every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = birthdayDate - now;
            
            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update elements
            daysElement.textContent = String(days).padStart(2, '0');
            hoursElement.textContent = String(hours).padStart(2, '0');
            minutesElement.textContent = String(minutes).padStart(2, '0');
            secondsElement.textContent = String(seconds).padStart(2, '0');
            
            // If birthday has arrived
            if (distance < 0) {
                document.querySelector('.countdown').innerHTML = '<h3>HAPPY BIRTHDAY SAYANGGKUUUU 🥳🎉💓</h3>';
                triggerConfetti();
            }
        }
    }
    
    // Music control
    function setupMusicControl() {
        musicToggle.addEventListener('click', function() {
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
    
    // Voice message control
    function setupVoiceMessage() {
        voiceBtn.addEventListener("click", function() {
            if (voiceMessage.paused) {
                bgMusic.volume = 0.1; // Very low but not muted
                voiceMessage.play()
                    .then(() => {
                        playIcon.classList.replace("fa-play", "fa-pause");
                        btnText.textContent = "Jeda Pesan";
                    })
                    .catch(error => {
                        console.log('Voice message playback error:', error);
                        alert('Gagal memutar pesan suara. Pastikan browser mendukung audio.');
                    });
            } else {
                voiceMessage.pause();
                bgMusic.volume = 1;
                playIcon.classList.replace("fa-pause", "fa-play");
                btnText.textContent = "Putar Pesan Suara";
            }
        });
        
        voiceMessage.addEventListener("ended", function() {
            bgMusic.volume = 1;
            playIcon.classList.replace("fa-pause", "fa-play");
            btnText.textContent = "Putar Pesan Suara";
        });
    }
    
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
    
    // Create floating hearts
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
    
    // Trigger confetti
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
    
    // Initialize the app
    init();
});
