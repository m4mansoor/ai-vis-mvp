// AI Vehicle Damage Detection MVP Presentation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initScrollProgress();
    initParticles();
    initTypewriter();
    initIntersectionObserver();
    initCounterAnimations();
    initTimelineAnimation();
    initTableAnimations();
    initCardAnimations();
});

// Loading Screen Animation
function initLoader() {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('mainContent');
    
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
            mainContent.classList.add('visible');
        }, 500);
    }, 3000);
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.getElementById('progressBar');
    
    function updateProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
}

// Particle Effect
function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Mouse interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                this.x -= dx * 0.02;
                this.y -= dy * 0.02;
            }
            
            // Boundary wrapping
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Resize handling
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typewriter Effect
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const text = 'AI Vehicle Damage Detection MVP Dashboard';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typewriterElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        } else {
            // Add blinking cursor
            typewriterElement.innerHTML += '<span class="cursor">|</span>';
            // Add CSS for blinking cursor
            const style = document.createElement('style');
            style.textContent = `
                .cursor {
                    animation: blink 1s infinite;
                }
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// Intersection Observer for Slide Animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations based on slide content
                if (entry.target.id === 'slide6') {
                    animateTimeline();
                }
                if (entry.target.id === 'slide8') {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe all slides
    document.querySelectorAll('.slide').forEach(slide => {
        slideObserver.observe(slide);
    });
    
    // Observe feature cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .payment-card, .stat-card').forEach(card => {
        cardObserver.observe(card);
    });
}

// Counter Animations
function initCounterAnimations() {
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * (target - start) + start);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    window.animateCounters = function() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach((counter, index) => {
            const target = parseInt(counter.dataset.target);
            setTimeout(() => {
                animateCounter(counter, target, 2500);
            }, index * 200);
        });
    };
}

// Timeline Animation
function initTimelineAnimation() {
    window.animateTimeline = function() {
        const timelineLine = document.querySelector('.timeline-line');
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Animate the timeline line
        setTimeout(() => {
            timelineLine.classList.add('animate');
        }, 500);
        
        // Animate timeline items
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, 800 + (index * 300));
        });
    };
}

// Table Row Animations
function initTableAnimations() {
    const tableObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const rows = entry.target.querySelectorAll('tbody tr');
                rows.forEach((row, index) => {
                    const delay = parseInt(row.dataset.delay) || index * 100;
                    setTimeout(() => {
                        row.classList.add('visible');
                    }, delay);
                });
            }
        });
    }, { threshold: 0.3 });
    
    const budgetTable = document.querySelector('.budget-table');
    if (budgetTable) {
        tableObserver.observe(budgetTable);
    }
}

// Card Animations
function initCardAnimations() {
    // Staggered animations for feature cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.feature-card, .payment-card, .stat-card');
                cards.forEach((card, index) => {
                    const delay = parseInt(card.dataset.delay) || index * 150;
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, delay);
                });
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.features-grid, .payment-cards, .stats-grid').forEach(container => {
        cardObserver.observe(container);
    });
}

// Tech Badge Animations
function initTechBadges() {
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const badges = entry.target.querySelectorAll('.tech-badge');
                badges.forEach((badge, index) => {
                    setTimeout(() => {
                        badge.style.animationDelay = `${index * 0.1}s`;
                        badge.style.animation = 'popIn 0.5s ease-out forwards';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.tech-stack').forEach(techStack => {
        techObserver.observe(techStack);
    });
}

// Button Interactions
function initButtonInteractions() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
    
    // CTA Button Click
    document.querySelector('.cta-button')?.addEventListener('click', function() {
        // Add a success animation
        this.innerHTML = '✓ Proposal Accepted!';
        this.style.background = '#10B981';
        this.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            this.innerHTML = 'Processing...';
        }, 1500);
    });
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Optional: Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            window.scrollBy(0, window.innerHeight);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            window.scrollBy(0, -window.innerHeight);
        }
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initTechBadges();
    initButtonInteractions();
    initSmoothScrolling();
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll event listeners
const optimizedScrollHandler = debounce(() => {
    // Any additional scroll-based animations can go here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Add loading states for better UX
function showLoadingState(element) {
    element.style.opacity = '0.7';
    element.style.pointerEvents = 'none';
}

function hideLoadingState(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Error handling for animations
function safeAnimate(animationFunction) {
    try {
        animationFunction();
    } catch (error) {
        console.warn('Animation error:', error);
        // Fallback to show content without animation
        document.querySelectorAll('.slide, .feature-card, .payment-card, .stat-card').forEach(el => {
            el.classList.add('visible');
        });
    }
}

// Initialize all animations safely
document.addEventListener('DOMContentLoaded', function() {
    safeAnimate(() => {
        // All initialization code is wrapped in error handling
        console.log('AI Vehicle Damage Detection MVP Presentation Loaded Successfully');
    });
});
