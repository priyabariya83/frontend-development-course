// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                
                navLinks.querySelectorAll('li').forEach(li => {
                    li.style.margin = '10px 0';
                });
            }
        });
    }
    
    // Schedule tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const day = this.getAttribute('data-day');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(day).classList.add('active');
        });
    });
    
    // Ticket selection buttons
    const selectTicketBtns = document.querySelectorAll('.select-ticket');
    const ticketRadios = document.querySelectorAll('input[name="ticket-tier"]');
    const selectedTierInfo = document.getElementById('selected-tier-info');
    
    // Ticket tier information
    const tierInfo = {
        general: {
            name: "General Admission",
            price: "$499",
            description: "Includes access to all conference sessions, conference materials, and lunch & refreshments."
        },
        professional: {
            name: "Professional Pass",
            price: "$799",
            description: "Includes all General Admission benefits plus access to 3 workshops of your choice."
        },
        vip: {
            name: "VIP Experience",
            price: "$1,299",
            description: "Includes all Professional Pass benefits plus gourmet meals, all workshops, and exclusive VIP networking events."
        }
    };
    
    // Set default selected tier info
    updateSelectedTierInfo('professional');
    
    // Ticket button click handlers
    selectTicketBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tier = this.getAttribute('data-tier');
            
            // Find and check the corresponding radio button
            const radioBtn = document.querySelector(`#tier-${tier}`);
            if (radioBtn) {
                radioBtn.checked = true;
                updateSelectedTierInfo(tier);
                
                // Scroll to form
                document.getElementById('registration-form').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Radio button change handlers
    ticketRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                updateSelectedTierInfo(this.value);
            }
        });
    });
    
    // Function to update selected tier info display
    function updateSelectedTierInfo(tier) {
        const info = tierInfo[tier];
        if (info) {
            selectedTierInfo.innerHTML = `
                <strong>${info.name} (${info.price})</strong><br>
                ${info.description}
            `;
        }
    }
    
    // Registration form submission
    const registrationForm = document.getElementById('registration-form');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const fullName = document.getElementById('full-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const ticketTier = document.querySelector('input[name="ticket-tier"]:checked');
            const terms = document.getElementById('terms').checked;
            
            // Basic validation
            if (!fullName) {
                alert('Please enter your full name.');
                return;
            }
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            if (!ticketTier) {
                alert('Please select a ticket type.');
                return;
            }
            
            if (!terms) {
                alert('You must agree to the terms and conditions.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Get selected tier info
            const selectedTier = tierInfo[ticketTier.value];
            
            // Show success message
            alert(`Thank you for registering for TechForward 2024!\n\nRegistration Details:\nName: ${fullName}\nEmail: ${email}\nTicket: ${selectedTier.name} (${selectedTier.price})\n\nA confirmation email has been sent to ${email}.`);
            
            // In a real application, you would submit the form data to a server here
            // For demo purposes, we'll just reset the form
            registrationForm.reset();
            
            // Reset to default selection
            document.getElementById('tier-professional').checked = true;
            updateSelectedTierInfo('professional');
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const subject = this.querySelectorAll('input[type="text"]')[1].value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message
            alert(`Thank you for your message, ${name}!\n\nWe have received your inquiry and will respond to you at ${email} within 24-48 hours.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
                
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});