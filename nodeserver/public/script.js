// script.js - JavaScript for the Node.js Live Server Demo

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Page loaded! Live reload is active.');
    
    // Demo button functionality
    const demoBtn = document.getElementById('demo-btn');
    const demoOutput = document.getElementById('demo-output');
    let clickCount = 0;

    demoBtn.addEventListener('click', function() {
        clickCount++;
        demoOutput.textContent = `Button clicked ${clickCount} time${clickCount !== 1 ? 's' : ''}!`;
        demoOutput.classList.add('active');
        
        // Add some visual feedback
        demoBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            demoBtn.style.transform = '';
        }, 150);
    });

    // Live reload status indicator
    function updateLiveReloadStatus() {
        const statusElement = document.createElement('div');
        statusElement.id = 'live-reload-status';
        statusElement.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #48bb78;
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        statusElement.textContent = '🔄 Live Reload Active';
        document.body.appendChild(statusElement);
    }

    // Initialize live reload status
    updateLiveReloadStatus();

    // Add some interactive features
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeftColor = '#48bb78';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeftColor = '#667eea';
        });
    });

    // Add a simple counter animation
    function animateCounter(element, start, end, duration) {
        let startTime = null;
        
        function animate(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }

    // Add a fun feature: click counter with animation
    let totalClicks = 0;
    document.addEventListener('click', function(e) {
        if (e.target !== demoBtn) {
            totalClicks++;
            console.log(`Total clicks on page: ${totalClicks}`);
        }
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'r':
                    e.preventDefault();
                    console.log('🔄 Manual reload triggered');
                    window.location.reload();
                    break;
                case 'd':
                    e.preventDefault();
                    console.log('🐛 Debug info:', {
                        userAgent: navigator.userAgent,
                        viewport: {
                            width: window.innerWidth,
                            height: window.innerHeight
                        },
                        totalClicks: totalClicks,
                        clickCount: clickCount
                    });
                    break;
            }
        }
    });

    // Add a welcome message
    setTimeout(() => {
        console.log('💡 Tips:');
        console.log('  - Try editing this file and saving to see live reload!');
        console.log('  - Press Ctrl+R (or Cmd+R) to manually reload');
        console.log('  - Press Ctrl+D (or Cmd+D) to see debug info');
        console.log('  - Check the Network tab to see the live reload connection');
    }, 1000);

    // Add some visual feedback for file changes
    const originalTitle = document.title;
    let changeIndicator = false;

    // Listen for visibility changes to detect reloads
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            changeIndicator = true;
        } else if (changeIndicator) {
            // Page became visible again after being hidden (likely a reload)
            console.log('🔄 Page reloaded!');
            changeIndicator = false;
        }
    });

    // Add a simple performance monitor
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
    });
});
