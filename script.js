// 1. Toggle Mobile Menu
function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("open");
}

// 2. Sparkle Effect (Keep this)
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
    setTimeout(() => {
        spark.remove();
    }, 1000);
}

// 3. SMOOTH PAGE TRANSITIONS LOGIC
document.addEventListener('DOMContentLoaded', () => {
    
    // Select all links on the page
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Check if the link is internal (points to another html file)
            // And ensure it's not a hash link (#) or a new tab target
            if (href && !href.startsWith('#') && link.target !== '_blank' && !href.startsWith('mailto:')) {
                
                e.preventDefault(); // Stop the immediate jump
                
                // Add the fade-out class to body
                document.body.classList.add('fade-out');

                // Wait 500ms (matching the CSS transition), then go to the link
                setTimeout(() => {
                    window.location.href = href;
                }, 500); 
            }
        });
    });
});

// 4. Fix for Safa