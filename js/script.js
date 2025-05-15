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
                phoneLink.href = 'tel:03094649399';
                phoneLink.className = 'phone-number';
                
                const phoneIcon = document.createElement('i');
                phoneIcon.className = 'fas fa-phone-alt';
                
                const phoneText = document.createElement('span');
                phoneText.textContent = '03094649399';
                
                phoneLink.appendChild(phoneIcon);
                phoneLink.appendChild(phoneText);
                
                const aboutLink = document.createElement('a');
                aboutLink.href = 'about.html';
                aboutLink.className = 'support-link';
                aboutLink.textContent = 'About Us';
                
                const supportLink = document.createElement('a');
                supportLink.href = 'get-support.html';
                supportLink.className = 'support-link';
                supportLink.textContent = 'Get support';
                
                const loginLink = document.createElement('a');
                loginLink.href = '#hero';
                loginLink.className = 'login-link';
                loginLink.textContent = 'Log in';
                
                const getStartedBtn = document.createElement('a');
                getStartedBtn.href = '#hero';
                getStartedBtn.className = 'get-started-btn';
                getStartedBtn.textContent = 'Get started';
                
                // Add items to mobile menu
                mobileMenu.appendChild(phoneLink);
                mobileMenu.appendChild(aboutLink);
                mobileMenu.appendChild(supportLink);
                mobileMenu.appendChild(loginLink);
                mobileMenu.appendChild(getStartedBtn);
                
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