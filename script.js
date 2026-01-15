// Toggle Mobile Menu
function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("open");
}

// Sparkle Effect
document.addEventListener('mousemove', function(e) {
    createSpark(e.pageX, e.pageY);
});

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

    // If we are on a page without the player, stop here
    if (!audio || !btn) return;

    // 1. Set Volume (30% is good for background)
    audio.volume = 0.3;

    // 2. Check Memory (Is music supposed to be on?)
    const isPlaying = localStorage.getItem('musicPlaying') === 'true';
    const savedTime = localStorage.getItem('musicTime');

    // 3. Restore Timestamp (Start where we left off)
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    // 4. Update Button Look
    function updateUI(playing) {
        if (playing) {
            btn.classList.add('playing');
            icon.textContent = '♪'; 
            text.textContent = 'Pause';
        } else {
            btn.classList.remove('playing');
            icon.textContent = '►'; 
            text.textContent = 'Play';
        }
    }

    // 5. Try to Autoplay if it was on
    if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                updateUI(true);
            }).catch(() => {
                // Browser blocked it? Set state to off.
                localStorage.setItem('musicPlaying', 'false');
                updateUI(false);
            });
        }
    } else {
        updateUI(false);
    }

    // 6. Handle Button Click
    btn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            localStorage.setItem('musicPlaying', 'true');
            updateUI(true);
        } else {
            audio.pause();
            localStorage.setItem('musicPlaying', 'false');
            updateUI(false);
        }
    });

    // 7. Save Progress Every Second
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem('musicTime', audio.currentTime);
        }
    }, 1000);
});