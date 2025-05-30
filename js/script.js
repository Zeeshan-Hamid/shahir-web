// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            let mobileMenu = document.querySelector('.mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.classList.add('mobile-menu');
                
                // Create mobile menu items with the same structure as desktop
                const phoneLink = document.createElement('a');
                phoneLink.href = 'tel:855-730-5677';
                phoneLink.className = 'phone-number';
                phoneLink.innerHTML = '<i class="fas fa-phone-alt"></i><span>855-730-5677</span>';

                const techSupportLink = document.createElement('a');
                techSupportLink.href = 'about.html';
                techSupportLink.textContent = 'Tech Support';

                const paymentInquiriesLink = document.createElement('a');
                paymentInquiriesLink.href = 'get-support.html';
                paymentInquiriesLink.textContent = 'Payment Inquiries';
                
                const loginLink = document.createElement('a');
                loginLink.href = '#hero';
                loginLink.textContent = 'Log in';
                
                const signupLink = document.createElement('a');
                signupLink.href = '#hero';
                signupLink.className = 'get-started-btn';
                signupLink.textContent = 'Get started';
                
                // Add all items to mobile menu
                mobileMenu.appendChild(phoneLink);
                mobileMenu.appendChild(techSupportLink);
                mobileMenu.appendChild(paymentInquiriesLink);
                mobileMenu.appendChild(loginLink);
                mobileMenu.appendChild(signupLink);
                
                // Insert after header
                const header = document.querySelector('header');
                header.parentNode.insertBefore(mobileMenu, header.nextSibling);
            }
            
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Hide mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.querySelector('.mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            // If click is outside mobile menu and hamburger
            if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Call setActiveNavLink on scroll
    window.addEventListener('scroll', setActiveNavLink);
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For demonstration purposes, we'll just show an alert
            alert(`Thank you for your message, ${name}! We will get back to you soon.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Form submission handling for signup form
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create form data object
            const formData = new FormData(this);
            const formDataObject = {};
            
            // Convert FormData to object
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Log form data for debugging
            console.log('Sending data:', formDataObject);
            
            // Send data to backend
            fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataObject)
            })
            .then(response => {
                // Log raw response for debugging
                console.log('Response status:', response.status);
                console.log('Response headers:', [...response.headers.entries()]);
                
                // Check if response is ok
                if (!response.ok) {
                    throw new Error(`Server responded with status: ${response.status}`);
                }
                
                // Try to parse JSON with error handling
                return response.text().then(text => {
                    if (!text) {
                        throw new Error('Empty response received from server');
                    }
                    
                    try {
                        return JSON.parse(text);
                    } catch (err) {
                        console.error('Error parsing JSON:', err);
                        console.log('Raw response:', text);
                        throw new Error('Invalid JSON response from server');
                    }
                });
            })
            .then(data => {
                // Reset loading state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                if (data.success) {
                    // Show success modal instead of alert
                    showModal('thank-you-modal');
                    this.reset();
                } else {
                    // Show error message
                    alert('Error: ' + (data.message || 'Something went wrong. Please try again.'));
                }
            })
            .catch(error => {
                // Reset loading state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Show error message with detailed info
                console.error('Error:', error);
                alert(`Error submitting form: ${error.message}. Please check console for details.`);
            });
        });
    }
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-content');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Add CSS for reveal animation in JavaScript to keep CSS file cleaner
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .portfolio-item, .about-content, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Call revealOnScroll on page load and scroll
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    
    // Categories menu toggle
    const categoriesHamburger = document.querySelector('.categories-hamburger');
    const categoriesMenu = document.querySelector('.categories-menu-container');
    
    if (categoriesHamburger && categoriesMenu) {
        categoriesHamburger.addEventListener('click', function() {
            categoriesHamburger.classList.toggle('active');
            categoriesMenu.classList.toggle('active');
        });
    }
});

// Modal functionality
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Close modal when clicking the close button
        const closeButtons = modal.querySelectorAll('.close-modal, #modal-close-btn');
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                closeModal(modal);
            });
        });
        
        // Close modal when clicking outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    }
}

function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Initialize modal state
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('thank-you-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
    }
}); 