// Photography Gallery JavaScript

// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryLikeBtns = document.querySelectorAll('.gallery-like');
const loadMoreBtn = document.getElementById('load-more-btn');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxCategory = document.querySelector('.lightbox-category');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxLikeBtn = document.querySelector('.lightbox-like');
const newsletterForm = document.querySelector('.newsletter-form');
const categoryLinks = document.querySelectorAll('.footer-col ul li a[data-filter]');

// Current state
let currentFilter = 'all';
let currentImageIndex = 0;
const imagesData = [];
let likedImages = JSON.parse(localStorage.getItem('likedImages')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize images data
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-info h3').textContent;
        const category = item.dataset.category;
        
        imagesData.push({
            element: item,
            src: img.src,
            title: title,
            category: category,
            index: index
        });
    });
    
    // Update like buttons
    updateLikeButtons();
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Gallery Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active filter button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Get filter category
        currentFilter = btn.dataset.filter;
        
        // Filter gallery items
        galleryItems.forEach(item => {
            if (currentFilter === 'all' || item.dataset.category === currentFilter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Like Functionality
galleryLikeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const item = btn.closest('.gallery-item');
        const imgSrc = item.querySelector('img').src;
        
        toggleLike(imgSrc, btn);
    });
});

// Lightbox Like
lightboxLikeBtn.addEventListener('click', () => {
    const imgSrc = lightboxImage.src;
    const galleryItem = Array.from(galleryItems).find(item => 
        item.querySelector('img').src === imgSrc
    );
    
    if (galleryItem) {
        const likeBtn = galleryItem.querySelector('.gallery-like');
        toggleLike(imgSrc, likeBtn);
        updateLightboxLikeButton(imgSrc);
    }
});

function toggleLike(imgSrc, button) {
    const heartIcon = button.querySelector('i');
    
    if (likedImages.includes(imgSrc)) {
        // Unlike
        likedImages = likedImages.filter(src => src !== imgSrc);
        heartIcon.className = 'far fa-heart';
        button.classList.remove('liked');
        
        // Show notification
        showNotification('Removed from favorites');
    } else {
        // Like
        likedImages.push(imgSrc);
        heartIcon.className = 'fas fa-heart';
        button.classList.add('liked');
        
        // Show notification
        showNotification('Added to favorites');
    }
    
    // Save to localStorage
    localStorage.setItem('likedImages', JSON.stringify(likedImages));
}

function updateLikeButtons() {
    galleryItems.forEach(item => {
        const imgSrc = item.querySelector('img').src;
        const likeBtn = item.querySelector('.gallery-like');
        const heartIcon = likeBtn.querySelector('i');
        
        if (likedImages.includes(imgSrc)) {
            heartIcon.className = 'fas fa-heart';
            likeBtn.classList.add('liked');
        } else {
            heartIcon.className = 'far fa-heart';
            likeBtn.classList.remove('liked');
        }
    });
}

function updateLightboxLikeButton(imgSrc) {
    const heartIcon = lightboxLikeBtn.querySelector('i');
    
    if (likedImages.includes(imgSrc)) {
        heartIcon.className = 'fas fa-heart';
    } else {
        heartIcon.className = 'far fa-heart';
    }
}

// Lightbox Functionality
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-info h3').textContent;
        const category = item.querySelector('.gallery-info p').textContent;
        
        // Find current image index
        currentImageIndex = Array.from(galleryItems).indexOf(item);
        
        // Update lightbox
        lightboxImage.src = img.src;
        lightboxTitle.textContent = title;
        lightboxCategory.textContent = category;
        
        // Update like button in lightbox
        updateLightboxLikeButton(img.src);
        
        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Lightbox Navigation
lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

lightboxPrev.addEventListener('click', () => {
    const filteredItems = getFilteredItems();
    currentImageIndex = (currentImageIndex - 1 + filteredItems.length) % filteredItems.length;
    updateLightboxContent(filteredItems[currentImageIndex]);
});

lightboxNext.addEventListener('click', () => {
    const filteredItems = getFilteredItems();
    currentImageIndex = (currentImageIndex + 1) % filteredItems.length;
    updateLightboxContent(filteredItems[currentImageIndex]);
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    } else if (e.key === 'ArrowLeft') {
        lightboxPrev.click();
    } else if (e.key === 'ArrowRight') {
        lightboxNext.click();
    }
});

function getFilteredItems() {
    if (currentFilter === 'all') {
        return Array.from(galleryItems);
    } else {
        return Array.from(galleryItems).filter(item => 
            item.dataset.category === currentFilter
        );
    }
}

function updateLightboxContent(item) {
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-info h3').textContent;
    const category = item.querySelector('.gallery-info p').textContent;
    
    lightboxImage.src = img.src;
    lightboxTitle.textContent = title;
    lightboxCategory.textContent = category;
    
    // Update like button
    updateLightboxLikeButton(img.src);
}

// Load More Functionality (Simulated)
loadMoreBtn.addEventListener('click', () => {
    // Show loading state
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Create new gallery items (in a real app, these would come from an API)
        const newItems = [
            {
                category: 'landscape',
                title: 'Mountain Sunrise',
                desc: 'Landscape • Sunrise'
            },
            {
                category: 'portrait',
                title: 'Studio Portrait',
                desc: 'Portrait • Studio'
            },
            {
                category: 'wildlife',
                title: 'Forest Deer',
                desc: 'Wildlife • Forest'
            }
        ];
        
        // Add new items to gallery
        newItems.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.category = item.category;
            galleryItem.style.animationDelay = `${index * 0.1}s`;
            
            galleryItem.innerHTML = `
                <img src="assets/images/landscape-${Math.floor(Math.random() * 4) + 1}.jpg" alt="${item.title}">
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                    </div>
                    <button class="gallery-like">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            `;
            
            // Add click event for lightbox
            galleryItem.addEventListener('click', function() {
                const img = this.querySelector('img');
                const title = this.querySelector('.gallery-info h3').textContent;
                const category = this.querySelector('.gallery-info p').textContent;
                
                // Find current image index
                currentImageIndex = Array.from(document.querySelectorAll('.gallery-item')).indexOf(this);
                
                // Update lightbox
                lightboxImage.src = img.src;
                lightboxTitle.textContent = title;
                lightboxCategory.textContent = category;
                
                // Update like button in lightbox
                updateLightboxLikeButton(img.src);
                
                // Show lightbox
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            // Add like functionality
            const likeBtn = galleryItem.querySelector('.gallery-like');
            likeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const item = this.closest('.gallery-item');
                const imgSrc = item.querySelector('img').src;
                toggleLike(imgSrc, this);
            });
            
            // Add to gallery
            document.querySelector('.gallery-grid').appendChild(galleryItem);
            
            // Update images data
            imagesData.push({
                element: galleryItem,
                src: galleryItem.querySelector('img').src,
                title: item.title,
                category: item.category,
                index: imagesData.length
            });
        });
        
        // Update like buttons for new items
        updateLikeButtons();
        
        // Reset load more button
        loadMoreBtn.innerHTML = 'Load More Photos';
        loadMoreBtn.disabled = false;
        
        // Show notification
        showNotification('3 new photos loaded!');
        
    }, 1500);
});

// Category links in footer
categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = link.dataset.filter;
        
        // Update active filter button
        filterBtns.forEach(b => b.classList.remove('active'));
        document.querySelector(`.filter-btn[data-filter="${filter}"]`).classList.add('active');
        
        // Filter gallery items
        currentFilter = filter;
        
        galleryItems.forEach(item => {
            if (currentFilter === 'all' || item.dataset.category === currentFilter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Scroll to gallery
        document.querySelector('#gallery').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Newsletter Form
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    // Simple validation
    if (!email || !email.includes('@')) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    emailInput.disabled = true;
    newsletterForm.querySelector('button').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    
    setTimeout(() => {
        showNotification('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
        emailInput.disabled = false;
        newsletterForm.querySelector('button').innerHTML = 'Subscribe';
    }, 1500);
});

// Notification System
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = 'var(--border-radius)';
    notification.style.color = 'white';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '2000';
    notification.style.transform = 'translateX(150px)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';
    
    // Set background color based on type
    if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
    } else {
        notification.style.backgroundColor = '#2ecc71';
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(150px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Scroll to target
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});