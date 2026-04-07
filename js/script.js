// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', function () {
        navLinks.classList.toggle('nav-open');
        menuBtn.classList.toggle('open');
    });

    // Optional: Close menu when a link is clicked (for single-page navigation)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-open');
            menuBtn.classList.remove('open');
        });
    });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// Learn More buttons - Expand service details
document.querySelectorAll('.learn-more-btn').forEach(button => {
    button.addEventListener('click', function () {
        const serviceCard = this.closest('.service-card');
        const details = serviceCard.querySelector('.service-details');
        const isExpanded = details.style.display === 'block';

        // Toggle details visibility
        if (isExpanded) {
            details.style.display = 'none';
            this.textContent = 'Learn More';
        } else {
            details.style.display = 'block';
            this.textContent = 'Show Less';
        }
    });
});

// Add input validation feedback (keep this for better UX)
document.querySelectorAll('form input, form select, form textarea').forEach(input => {
    input.addEventListener('blur', function () {
        if (this.hasAttribute('required') && !this.value) {
            this.style.borderColor = '#dc3545';
        } else {
            this.style.borderColor = '#e8f0f0';
        }
    });

    input.addEventListener('input', function () {
        if (this.value) {
            this.style.borderColor = '#28a745';
        }
    });
});

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

/* ============================================================
   CRESTVILLE AI — JS ADDITIONS
   Append these to the BOTTOM of your existing js/script.js
   ============================================================ */

/* ── ANIMATED STAT COUNTERS (Hero stats bar) ── */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

/* ── METRIC BAR ANIMATIONS (Results section) ── */
function animateMetricBars() {
    const bars = document.querySelectorAll('.metric-bar-fill');
    bars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width') || bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = targetWidth + (targetWidth.toString().includes('%') ? '' : '%');
        }, 200);
    });
}

/* ── INTERSECTION OBSERVER — trigger animations on scroll ── */
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger counters when hero stats come into view
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
                sectionObserver.unobserve(entry.target);
            }
            // Trigger metric bars when results section comes into view
            if (entry.target.classList.contains('results-metrics')) {
                animateMetricBars();
                sectionObserver.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe hero stats and results metrics
const heroStats = document.querySelector('.hero-stats');
const resultsMetrics = document.querySelector('.results-metrics');
if (heroStats) sectionObserver.observe(heroStats);
if (resultsMetrics) sectionObserver.observe(resultsMetrics);

/* ── SCROLL REVEAL for all .reveal elements ── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    '.pain-card, .service-card, .why-card, .scenario-card, .process-step, .value-prop, .help-benefit'
).forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});