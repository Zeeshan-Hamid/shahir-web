// Support page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle for support header
    const supportHamburger = document.querySelector('.support-hamburger');
    
    if (supportHamburger) {
        supportHamburger.addEventListener('click', function() {
            supportHamburger.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            let supportMobileMenu = document.querySelector('.support-mobile-menu');
            
            if (!supportMobileMenu) {
                supportMobileMenu = document.createElement('div');
                supportMobileMenu.classList.add('support-mobile-menu');
                
                // Create mobile menu items
                const homeLink = document.createElement('a');
                homeLink.href = 'index.html';
                homeLink.textContent = 'Home';
                
                const aboutLink = document.createElement('a');
                aboutLink.href = 'about.html';
                aboutLink.textContent = 'About Us';
                
                const phoneLink = document.createElement('a');
                phoneLink.href = 'tel:03094649399';
                phoneLink.className = 'support-phone-mobile';
                
                const phoneIcon = document.createElement('i');
                phoneIcon.className = 'fas fa-phone-alt';
                
                const phoneText = document.createElement('span');
                phoneText.textContent = '03094649399';
                
                phoneLink.appendChild(phoneIcon);
                phoneLink.appendChild(phoneText);
                
                const loginLink = document.createElement('a');
                loginLink.href = 'index.html#signup-form';
                loginLink.textContent = 'Log in';
                
                const signupLink = document.createElement('a');
                signupLink.href = 'index.html#signup-form';
                signupLink.className = 'signup-link';
                signupLink.textContent = 'Sign up';
                
                // Add items to mobile menu
                supportMobileMenu.appendChild(homeLink);
                supportMobileMenu.appendChild(aboutLink);
                supportMobileMenu.appendChild(phoneLink);
                supportMobileMenu.appendChild(loginLink);
                supportMobileMenu.appendChild(signupLink);
                
                // Insert after header
                const header = document.querySelector('.support-header');
                header.parentNode.insertBefore(supportMobileMenu, header.nextSibling);
            }
            
            supportMobileMenu.classList.toggle('active');
        });
    }
    
    // Hide support mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const supportMobileMenu = document.querySelector('.support-mobile-menu');
        const supportHamburger = document.querySelector('.support-hamburger');
        
        if (supportMobileMenu && supportMobileMenu.classList.contains('active')) {
            // If click is outside mobile menu and hamburger
            if (!supportMobileMenu.contains(event.target) && !supportHamburger.contains(event.target)) {
                supportMobileMenu.classList.remove('active');
                supportHamburger.classList.remove('active');
            }
        }
    });
}); 