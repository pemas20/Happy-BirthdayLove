document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.menu a');
    const loadingScreen = document.querySelector('.loading-screen');
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const voiceMessage = document.getElementById('voice-message');
    const voiceBtn = document.getElementById('voice-control');
    const playIcon = document.getElementById('play-icon');
    const btnText = document.getElementById('btn-text');
    const messageEl = document.querySelector('.message');
  
    // Init
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        showMusicPopup();
      }, 500);
    }, 3000);
  
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = link.getAttribute('href').slice(1);
  
        navLinks.forEach(nav => nav.classList.remove('active'));
        sections.forEach(sec => sec.classList.remove('active'));
  
        link.classList.add('active');
        document.getElementById(target)?.classList.add('active');
        window.scrollTo(0, 0);
  
        if (target === 'home') triggerConfetti();
      });
    });
  
    function showMusicPopup() {
      const popup = document.getElementById('music-popup');
      if (!popup) return;
      popup.classList.add('active');
  
      document.getElementById('enable-music')?.addEventListener('click', () => {
        bgMusic.play().then(() => {
          musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
          popup.classList.remove('active');
        }).catch(() => {
          popup.classList.remove('active');
          alert('Klik tombol speaker untuk mengaktifkan audio.');
        });
      });
  
      document.getElementById('disable-music')?.addEventListener('click', () => {
        popup.classList.remove('active');
      });
    }
  
    musicToggle?.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.play().then(() => {
          musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }).catch(() => {
          alert('Izinkan audio untuk memutar musik.');
        });
      } else {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
      }
    });
  
    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => {
        if (voiceMessage.paused) {
          bgMusic.volume = 0.1;
          voiceMessage.play().then(() => {
            playIcon.classList.replace('fa-play', 'fa-pause');
            btnText.textContent = 'Jeda Pesan';
          });
        } else {
          voiceMessage.pause();
          bgMusic.volume = 1;
          playIcon.classList.replace('fa-pause', 'fa-play');
          btnText.textContent = 'Putar Pesan Suara';
        }
      });
  
      voiceMessage.addEventListener('ended', () => {
        bgMusic.volume = 1;
        playIcon.classList.replace('fa-pause', 'fa-play');
        btnText.textContent = 'Putar Pesan Suara';
      });
    }
  
    document.querySelector('video')?.addEventListener('play', () => {
      if (!bgMusic.paused) {
        document.getElementById('video-popup')?.classList.add('active');
      }
    });
  
    document.getElementById('pause-for-video')?.addEventListener('click', () => {
      bgMusic.pause();
      musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
      document.getElementById('video-popup')?.classList.remove('active');
    });
  
    document.getElementById('continue-music')?.addEventListener('click', () => {
      document.getElementById('video-popup')?.classList.remove('active');
    });
  
    function startCountdown() {
      const target = new Date('2025-05-13T00:00:00').getTime();
      setInterval(() => {
        const now = Date.now();
        const diff = target - now;
  
        if (diff <= 0) {
          document.querySelector('.countdown').innerHTML = '<h3>HAPPY BIRTHDAY SAYANGGKUUUU 🥳🎉💓</h3>';
          triggerConfetti();
          return;
        }
  
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
  
        daysEl.textContent = String(d).padStart(2, '0');
        hoursEl.textContent = String(h).padStart(2, '0');
        minutesEl.textContent = String(m).padStart(2, '0');
        secondsEl.textContent = String(s).padStart(2, '0');
      }, 1000);
    }
  
    function triggerConfetti() {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#ff6b6b', '#f8a5c2', '#8b0000']
        });
      }
    }
  
    function typeWriter(text, element, speed = 60) {
      let i = 0;
      element.textContent = '';
      const interval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text[i++];
        } else {
          clearInterval(interval);
        }
      }, speed);
    }
  
    function createFloatingHearts() {
      const container = document.querySelector('.floating-hearts');
      if (!container) return;
      for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.style.cssText = `
          position:absolute;
          font-size:${Math.random() * 20 + 10}px;
          left:${Math.random() * 100}%;
          top:${Math.random() * 100}%;
          color:rgba(139,0,0,${Math.random() * 0.5 + 0.2});
          animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
          animation-delay:${Math.random() * 5}s;
        `;
        container.appendChild(heart);
      }
    }
  
    startCountdown();
    typeWriter("Terima kasih telah menjadi wanita terbaik dalam hidupku", messageEl);
    createFloatingHearts();
  });
  
