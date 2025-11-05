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
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
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
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if(window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// Learn More buttons - Expand service details
document.querySelectorAll('.learn-more-btn').forEach(button => {
    button.addEventListener('click', function() {
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

// Professional Form Handling
document.getElementById('consultationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        workEmail: document.getElementById('workEmail').value,
        companyName: document.getElementById('companyName').value,
        companySize: document.getElementById('companySize').value,
        challenge: document.getElementById('challenge').value,
        goals: document.getElementById('goals').value,
        timeline: document.getElementById('timeline').value
    };
    
    // Enhanced validation
    if (!formData.fullName || !formData.workEmail || !formData.companyName || !formData.goals) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.workEmail)) {
        showNotification('Please enter a valid work email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking Your Session...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Success simulation
        showNotification(`Perfect, ${formData.fullName}! Your consultation has been booked. We've sent calendar details to ${formData.workEmail}`, 'success');
        
        // Reset form
        this.reset();
        
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Here you would integrate with:
        // - Calendly API for booking
        // - CRM system (HubSpot, Salesforce)
        // - Email automation (SendGrid, Mailchimp)
        // - Analytics (Google Analytics, Mixpanel)
        
        console.log('Consultation booked:', formData);
        
    }, 2000);
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `form-notification form-notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        padding: 15px 20px;
        border-radius: 8px;
        border-left: 4px solid ${type === 'success' ? '#28a745' : '#dc3545'};
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        z-index: 10000;
        max-width: 400px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add input validation feedback
document.querySelectorAll('#consultationForm input, #consultationForm select, #consultationForm textarea').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value) {
            this.style.borderColor = '#dc3545';
        } else {
            this.style.borderColor = '#e8f0f0';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.value) {
            this.style.borderColor = '#28a745';
        }
    });
});

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});