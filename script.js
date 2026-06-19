// Toggle Mobile Menu
function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    if (menu) menu.classList.toggle("open");
}

// Sparkle Effect
if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', function(e) {
        createSpark(e.pageX, e.pageY);
    });
}

function createSpark(x, y) {
    const spark = document.createElement('div');
    spark.classList.add('spark');
    spark.style.left = x + 'px';
    spark.style.top = y + 'px';
    const randomX = (Math.random() - 0.5) * 50;
    spark.style.setProperty('--x-move', randomX + 'px');
    document.body.appendChild(spark);
    setTimeout(() => { spark.remove(); }, 1000);
}

/* --- MUSIC PLAYER LOGIC --- */
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-music');
    const btn = document.getElementById('music-toggle');
    const icon = document.getElementById('music-icon');
    const text = document.getElementById('music-text');

    if (!audio || !btn || !icon || !text) return;

    audio.volume = 0.28;
    audio.preload = 'auto';

    const isPlaying = localStorage.getItem('musicPlaying') === 'true';
    const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');
    const savedAt = parseInt(localStorage.getItem('musicSavedAt') || '0', 10);

    if (savedTime) {
        const travelTime = isPlaying && savedAt ? (Date.now() - savedAt) / 1000 : 0;
        audio.currentTime = savedTime + travelTime;
    }

    function updateUI(playing) {
        if (playing) {
            btn.classList.add('playing');
            icon.textContent = '||';
            text.textContent = 'Pause';
        } else {
            btn.classList.remove('playing');
            icon.textContent = '>';
            text.textContent = 'Play';
        }
    }

    function saveProgress() {
        localStorage.setItem('musicTime', audio.currentTime || 0);
        localStorage.setItem('musicSavedAt', Date.now().toString());
    }

    function playMusic() {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => updateUI(true))
                .catch(() => {
                    localStorage.setItem('musicPlaying', 'false');
                    updateUI(false);
                });
        }
    }

    if (isPlaying) {
        playMusic();
    } else {
        updateUI(false);
    }

    btn.addEventListener('click', () => {
        if (audio.paused) {
            localStorage.setItem('musicPlaying', 'true');
            playMusic();
        } else {
            saveProgress();
            audio.pause();
            localStorage.setItem('musicPlaying', 'false');
            updateUI(false);
        }
    });

    window.addEventListener('pagehide', saveProgress);
    window.addEventListener('beforeunload', saveProgress);

    setInterval(() => {
        if (!audio.paused) saveProgress();
    }, 250);
});
