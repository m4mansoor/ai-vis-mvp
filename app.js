// AI Vehicle Damage Detection MVP - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initAnimations();
    initSmoothScrolling();
    initCtaButtons();
    initModalSystem();
    initCounterAnimations();
    initImageLazyLoading();
    initScrollProgress();
});

// Animation on scroll functionality
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Add fade-in animation
                if (target.classList.contains('animate-on-scroll')) {
                    target.classList.add('fade-in');
                }
                
                // Add slide animations
                if (target.classList.contains('slide-left')) {
                    target.classList.add('slide-in-left');
                }
                
                if (target.classList.contains('slide-right')) {
                    target.classList.add('slide-in-right');
                }
                
                // Trigger counter animations
                if (target.classList.contains('counter-section')) {
                    animateCounters(target);
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.capability-card, .timeline-item, .payment-card, .value-card, .guarantee-item');
    animatedElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });

    // Observe sections for slide animations
    const leftSlideElements = document.querySelectorAll('.summary-text, .architecture-details');
    leftSlideElements.forEach(el => {
        el.classList.add('slide-left');
        el.style.opacity = '0';
        el.style.transform = 'translateX(-50px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    const rightSlideElements = document.querySelectorAll('.demo-showcase, .architecture-images');
    rightSlideElements.forEach(el => {
        el.classList.add('slide-right');
        el.style.opacity = '0';
        el.style.transform = 'translateX(50px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    // Create navigation menu
    const nav = createNavigationMenu();
    document.body.appendChild(nav);

    // Handle scroll to section
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// Create floating navigation menu
function createNavigationMenu() {
    const nav = document.createElement('nav');
    nav.className = 'floating-nav';
    nav.innerHTML = `
        <div class="nav-container">
            <div class="nav-logo">AI Vehicle Detection</div>
            <ul class="nav-links">
                <li><a href="#executive-summary">Summary</a></li>
                <li><a href="#ai-capabilities">AI Features</a></li>
                <li><a href="#budget">Budget</a></li>
                <li><a href="#timeline">Timeline</a></li>
                <li><a href="#cta">Get Started</a></li>
            </ul>
            <button class="nav-toggle" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    `;

    // Add navigation styles
    const navStyles = `
        .floating-nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--color-border);
            z-index: 1000;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }
        
        .floating-nav.visible {
            transform: translateY(0);
        }
        
        .nav-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: var(--space-12) var(--space-16);
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .nav-logo {
            font-weight: var(--font-weight-bold);
            color: var(--color-primary);
            font-size: var(--font-size-lg);
        }
        
        .nav-links {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: var(--space-24);
        }
        
        .nav-links a {
            text-decoration: none;
            color: var(--color-text);
            font-weight: var(--font-weight-medium);
            transition: color 0.3s ease;
        }
        
        .nav-links a:hover {
            color: var(--color-primary);
        }
        
        .nav-toggle {
            display: none;
            flex-direction: column;
            background: none;
            border: none;
            cursor: pointer;
            gap: 3px;
        }
        
        .nav-toggle span {
            width: 20px;
            height: 2px;
            background: var(--color-text);
            transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            
            .nav-toggle {
                display: flex;
            }
        }
        
        @media (prefers-color-scheme: dark) {
            .floating-nav {
                background: rgba(38, 40, 40, 0.95);
            }
        }
    `;

    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = navStyles;
    document.head.appendChild(styleSheet);

    // Show nav on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }
        
        lastScrollTop = scrollTop;
    });

    return nav;
}

// CTA Button functionality
function initCtaButtons() {
    const ctaButtons = document.querySelectorAll('.btn--primary, .cta-button');
    const outlineButtons = document.querySelectorAll('.btn--outline');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showContactModal('start-project');
        });
    });

    outlineButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showContactModal('schedule-demo');
        });
    });
}

// Modal system
function initModalSystem() {
    const modalHtml = `
        <div class="modal hidden" id="contact-modal">
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="modal-title">Get Started Today</h3>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="contact-form" class="contact-form">
                        <div class="form-group">
                            <label for="name" class="form-label">Full Name *</label>
                            <input type="text" id="name" name="name" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="email" class="form-label">Email Address *</label>
                            <input type="email" id="email" name="email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="company" class="form-label">Company Name</label>
                            <input type="text" id="company" name="company" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="phone" class="form-label">Phone Number</label>
                            <input type="tel" id="phone" name="phone" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="message" class="form-label">Project Details</label>
                            <textarea id="message" name="message" rows="4" class="form-control" placeholder="Tell us about your vehicle inspection needs..."></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn--primary btn--full-width">Send Request</button>
                        </div>
                    </form>
                    
                    <div id="success-message" class="success-message hidden">
                        <div class="success-icon">✅</div>
                        <h4>Request Sent Successfully!</h4>
                        <p>Thank you for your interest. We'll contact you within 24 hours to discuss your AI Vehicle Damage Detection project.</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Add modal styles
    const modalStyles = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .modal.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
        }
        
        .modal-content {
            position: relative;
            background: var(--color-surface);
            border-radius: var(--radius-lg);
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .modal.visible .modal-content {
            transform: scale(1);
        }
        
        .modal-header {
            padding: var(--space-24);
            border-bottom: 1px solid var(--color-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--color-text-secondary);
            transition: color 0.3s ease;
        }
        
        .modal-close:hover {
            color: var(--color-text);
        }
        
        .modal-body {
            padding: var(--space-24);
        }
        
        .contact-form {
            display: block;
        }
        
        .success-message {
            text-align: center;
            padding: var(--space-24) 0;
        }
        
        .success-icon {
            font-size: 3rem;
            margin-bottom: var(--space-16);
        }
        
        .success-message h4 {
            color: var(--color-success);
            margin-bottom: var(--space-12);
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);

    // Modal event listeners
    const modal = document.getElementById('contact-modal');
    const closeButton = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    const form = document.getElementById('contact-form');

    closeButton.addEventListener('click', hideModal);
    backdrop.addEventListener('click', hideModal);
    form.addEventListener('submit', handleFormSubmit);

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('visible')) {
            hideModal();
        }
    });
}

function showContactModal(type) {
    const modal = document.getElementById('contact-modal');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    // Reset modal state
    form.classList.remove('hidden');
    successMessage.classList.add('hidden');
    form.reset();

    // Set title based on type
    if (type === 'schedule-demo') {
        title.textContent = 'Schedule a Demo';
        document.getElementById('message').placeholder = 'When would you like to schedule the demo? Any specific features you want to see?';
    } else {
        title.textContent = 'Start Your Project';
        document.getElementById('message').placeholder = 'Tell us about your vehicle inspection needs and project requirements...';
    }

    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('visible'), 10);
    
    // Focus first input
    setTimeout(() => document.getElementById('name').focus(), 300);
}

function hideModal() {
    const modal = document.getElementById('contact-modal');
    modal.classList.remove('visible');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        const form = document.getElementById('contact-form');
        const successMessage = document.getElementById('success-message');
        
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            hideModal();
        }, 3000);
    }, 1500);
}

// Counter animations
function initCounterAnimations() {
    function animateValue(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    window.animateCounters = function(section) {
        const statValues = section.querySelectorAll('.stat-value, .guarantee-metric');
        
        statValues.forEach(stat => {
            const text = stat.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            const suffix = text.replace(/\d/g, '');
            
            if (!isNaN(number)) {
                stat.textContent = '0' + suffix;
                animateValue(stat, 0, number, 2000, suffix);
            }
        });
    };
}

// Image lazy loading
function initImageLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading animation
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                // Trigger load if not already loaded
                if (img.complete) {
                    img.style.opacity = '1';
                }
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    
    const progressStyles = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: rgba(var(--color-border-rgb, 94, 82, 64), 0.2);
            z-index: 1001;
        }
        
        .scroll-progress-bar {
            height: 100%;
            background: var(--color-primary);
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = progressStyles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(progressBar);
    
    const progressBarElement = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBarElement.style.width = Math.min(scrollPercent, 100) + '%';
    });
}

// Performance optimization - Debounce scroll events
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

// Add smooth hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card, .capability-card, .payment-card, .value-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Console welcome message
console.log(`
🚗 AI Vehicle Damage Detection MVP
=================================
Professional presentation ready!
- 92% AI Detection Accuracy
- 4-Week Delivery Timeline  
- $5,000 Complete Solution
- Ready to deploy and present

Contact us to get started!
`);

// Export functions for external use
window.AIVehicleDetection = {
    showContactModal,
    hideModal,
    animateCounters
};
