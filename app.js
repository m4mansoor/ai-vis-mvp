// Presentation Application JavaScript
class PresentationApp {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 6;
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.progressFill = document.querySelector('.progress-fill');
        this.slideCounter = {
            current: document.getElementById('currentSlide'),
            total: document.getElementById('totalSlides')
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateSlideCounter();
        this.initializeChart();
        this.updateProgressBar();
    }

    setupEventListeners() {
        // Navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.addEventListener('click', () => this.previousSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides - 1);
                    break;
            }
        });
        
        // Slide indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch/swipe support
        let startX = null;
        let startY = null;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            
            // Horizontal swipe should be more significant than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
            
            startX = null;
            startY = null;
        });
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    goToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= this.totalSlides) return;
        
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // Add prev class to current slide for animation
        if (slideIndex > this.currentSlide) {
            this.slides[this.currentSlide].classList.add('prev');
        }
        
        // Update current slide
        this.currentSlide = slideIndex;
        
        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
        
        // Remove prev class after animation
        setTimeout(() => {
            this.slides.forEach(slide => slide.classList.remove('prev'));
        }, 600);
        
        // Update UI elements
        this.updateSlideCounter();
        this.updateProgressBar();
        this.updateNavigationButtons();
        
        // Initialize chart if we're on the budget slide
        if (slideIndex === 2) {
            setTimeout(() => {
                this.initializeChart();
            }, 300);
        }
    }

    updateSlideCounter() {
        this.slideCounter.current.textContent = this.currentSlide + 1;
        this.slideCounter.total.textContent = this.totalSlides;
    }

    updateProgressBar() {
        const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
        this.progressFill.style.width = `${progress}%`;
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.disabled = this.currentSlide === 0;
        nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }

    initializeChart() {
        const canvas = document.getElementById('budgetChart');
        if (!canvas || canvas.chart) return; // Prevent duplicate initialization
        
        const ctx = canvas.getContext('2d');
        
        // Budget data
        const budgetData = {
            labels: ['Hardware Components', 'Engineering Labor', 'Contingency'],
            datasets: [{
                data: [15500, 21000, 3500],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                borderColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                borderWidth: 2,
                hoverBorderWidth: 3,
                hoverBackgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
            }]
        };

        const config = {
            type: 'doughnut',
            data: budgetData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // We have custom legend
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const percentage = ((value / 40000) * 100).toFixed(1);
                                return `${label}: ${value.toLocaleString()} SAR (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '60%',
                animation: {
                    animateRotate: true,
                    duration: 1000
                },
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                }
            }
        };

        canvas.chart = new Chart(ctx, config);
    }

    // Method to handle window resize
    handleResize() {
        // Reinitialize chart on resize if we're on the budget slide
        if (this.currentSlide === 2) {
            const canvas = document.getElementById('budgetChart');
            if (canvas && canvas.chart) {
                canvas.chart.resize();
            }
        }
    }

    // Public method to start presentation
    startPresentation() {
        this.goToSlide(0);
        
        // Auto-advance demo (uncomment for auto-play)
        // this.startAutoAdvance();
    }

    // Auto-advance functionality (optional)
    startAutoAdvance(interval = 10000) {
        this.autoAdvanceTimer = setInterval(() => {
            if (this.currentSlide < this.totalSlides - 1) {
                this.nextSlide();
            } else {
                this.stopAutoAdvance();
            }
        }, interval);
    }

    stopAutoAdvance() {
        if (this.autoAdvanceTimer) {
            clearInterval(this.autoAdvanceTimer);
            this.autoAdvanceTimer = null;
        }
    }

    // Fullscreen functionality
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

// Additional utility functions
function formatCurrency(amount, currency = 'SAR') {
    return new Intl.NumberFormat('en-SA', {
        style: 'decimal',
        minimumFractionDigits: 0
    }).format(amount) + ' ' + currency;
}

function animateValue(element, start, end, duration = 1000) {
    const startTime = performance.now();
    const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

// Enhanced interaction features
class PresentationEnhancements {
    constructor(app) {
        this.app = app;
        this.setupEnhancements();
    }

    setupEnhancements() {
        // Add slide transition sounds (optional)
        this.setupSounds();
        
        // Add mouse movement effects
        this.setupMouseEffects();
        
        // Add keyboard shortcuts help
        this.setupKeyboardHelp();
    }

    setupSounds() {
        // Create audio context for subtle interaction sounds
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio context not supported');
        }
    }

    playTransitionSound() {
        if (!this.audioContext) return;
        
        // Create a subtle click sound
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    setupMouseEffects() {
        // Add subtle parallax effect to background
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const slides = document.querySelectorAll('.slide.active');
            slides.forEach(slide => {
                const moveX = (mouseX - 0.5) * 20;
                const moveY = (mouseY - 0.5) * 20;
                slide.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }

    setupKeyboardHelp() {
        // Show keyboard shortcuts on '?' key
        document.addEventListener('keydown', (e) => {
            if (e.key === '?' || e.key === 'h') {
                this.showKeyboardHelp();
            } else if (e.key === 'Escape') {
                this.hideKeyboardHelp();
            } else if (e.key === 'f' || e.key === 'F11') {
                e.preventDefault();
                this.app.toggleFullscreen();
            }
        });
    }

    showKeyboardHelp() {
        // Create help overlay if it doesn't exist
        if (document.getElementById('keyboard-help')) return;
        
        const helpOverlay = document.createElement('div');
        helpOverlay.id = 'keyboard-help';
        helpOverlay.innerHTML = `
            <div class="help-content">
                <h3>Keyboard Shortcuts</h3>
                <div class="shortcut-grid">
                    <div class="shortcut-item">
                        <kbd>←</kbd> <kbd>↑</kbd> Previous slide
                    </div>
                    <div class="shortcut-item">
                        <kbd>→</kbd> <kbd>↓</kbd> <kbd>Space</kbd> Next slide
                    </div>
                    <div class="shortcut-item">
                        <kbd>Home</kbd> First slide
                    </div>
                    <div class="shortcut-item">
                        <kbd>End</kbd> Last slide
                    </div>
                    <div class="shortcut-item">
                        <kbd>F</kbd> <kbd>F11</kbd> Fullscreen
                    </div>
                    <div class="shortcut-item">
                        <kbd>Esc</kbd> Close this help
                    </div>
                </div>
                <p>Press <kbd>?</kbd> or <kbd>H</kbd> to show this help</p>
            </div>
        `;
        
        // Add styles
        helpOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(10px);
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            #keyboard-help .help-content {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                padding: 2rem;
                max-width: 400px;
                color: white;
                backdrop-filter: blur(20px);
            }
            #keyboard-help h3 {
                margin: 0 0 1.5rem 0;
                text-align: center;
                color: #1FB8CD;
            }
            #keyboard-help .shortcut-grid {
                display: grid;
                gap: 0.75rem;
                margin-bottom: 1.5rem;
            }
            #keyboard-help .shortcut-item {
                display: flex;
                align-items: center;
                font-size: 0.9rem;
            }
            #keyboard-help kbd {
                background: #1FB8CD;
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-family: monospace;
                font-size: 0.8rem;
                margin-right: 0.5rem;
                min-width: 1.5rem;
                text-align: center;
            }
            #keyboard-help p {
                text-align: center;
                margin: 0;
                font-size: 0.8rem;
                opacity: 0.8;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(helpOverlay);
        
        // Close on click
        helpOverlay.addEventListener('click', (e) => {
            if (e.target === helpOverlay) {
                this.hideKeyboardHelp();
            }
        });
    }

    hideKeyboardHelp() {
        const helpOverlay = document.getElementById('keyboard-help');
        if (helpOverlay) {
            helpOverlay.remove();
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PresentationApp();
    const enhancements = new PresentationEnhancements(app);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        app.handleResize();
    });
    
    // Start the presentation
    app.startPresentation();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Performance optimization: Preload next slide images/content
    const preloadNextSlide = () => {
        const nextSlideIndex = app.currentSlide + 1;
        if (nextSlideIndex < app.totalSlides) {
            const nextSlide = document.getElementById(`slide-${nextSlideIndex}`);
            if (nextSlide) {
                nextSlide.style.display = 'flex';
                setTimeout(() => {
                    nextSlide.style.display = '';
                }, 100);
            }
        }
    };
    
    // Preload slides as user navigates
    document.addEventListener('keydown', preloadNextSlide);
    document.getElementById('nextBtn').addEventListener('click', preloadNextSlide);
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PresentationApp, PresentationEnhancements };
}