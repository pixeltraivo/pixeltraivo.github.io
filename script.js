/* =====================================================
   PIXELTRAIVO - PROFESSIONAL VIDEO EDITOR PORTFOLIO
   Complete JavaScript with All Features
   ===================================================== */

// ==================== PRELOADER ====================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    if (preloader) {
      preloader.classList.add('hide');
    }
  }, 1000);
});

// ==================== NAVIGATION ====================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (navbar) {
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// Mobile menu toggle
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu) navMenu.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');
  });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== VIMEO VIDEO HOVER PLAY/PAUSE WITH LOOP ====================
window.addEventListener('load', () => {
  // Check if Vimeo API is loaded
  if (typeof Vimeo === 'undefined') {
    console.warn('⚠️ Vimeo Player API not loaded');
    return;
  }

  // ===== SHOWREEL VIDEO - Hover to Play with Loop =====
  const showreelPlayer = document.getElementById('showreelPlayer');
  if (showreelPlayer) {
    try {
      const player = new Vimeo.Player(showreelPlayer);
      const videoWrapper = showreelPlayer.closest('.video-player');
      
      // Enable loop
      player.setLoop(true).catch(err => console.log('Loop setting error:', err));
      
      if (videoWrapper) {
        videoWrapper.addEventListener('mouseenter', () => {
          player.play().catch(err => console.log('Play error:', err));
        });
        
        videoWrapper.addEventListener('mouseleave', () => {
          player.pause().catch(err => console.log('Pause error:', err));
        });
      }
      
      console.log('✅ Showreel video initialized with loop');
    } catch (err) {
      console.error('Showreel player error:', err);
    }
  }

  // ===== PORTFOLIO VIDEOS - Hover to Play with Loop =====
  const portfolioVideos = document.querySelectorAll('.portfolio-video');
  const portfolioPlayers = [];
  
  if (portfolioVideos.length > 0) {
    portfolioVideos.forEach((iframe, index) => {
      try {
        const player = new Vimeo.Player(iframe);
        portfolioPlayers.push(player);
        
        // Enable loop for each video
        player.setLoop(true).catch(err => console.log('Loop setting error:', err));
        
        const card = iframe.closest('.portfolio-card');
        
        if (card) {
          card.addEventListener('mouseenter', () => {
            // Pause all other videos
            portfolioPlayers.forEach((p, i) => {
              if (i !== index) {
                p.pause().catch(err => {});
              }
            });
            
            // Play current video
            player.play().catch(err => console.log('Play error:', err));
          });
          
          card.addEventListener('mouseleave', () => {
            player.pause().catch(err => console.log('Pause error:', err));
          });
        }
      } catch (err) {
        console.error(`Portfolio video ${index} error:`, err);
      }
    });
    
    console.log(`✅ Initialized ${portfolioPlayers.length} portfolio videos with loop`);
  }
});

// ==================== PORTFOLIO HORIZONTAL SCROLL ====================
const portfolioWrapper = document.querySelector('.portfolio-scroll-wrapper');

if (portfolioWrapper) {
  let isDown = false;
  let startX;
  let scrollLeft;

  // Mouse drag to scroll
  portfolioWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    portfolioWrapper.style.cursor = 'grabbing';
    startX = e.pageX - portfolioWrapper.offsetLeft;
    scrollLeft = portfolioWrapper.scrollLeft;
  });

  portfolioWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    portfolioWrapper.style.cursor = 'grab';
  });

  portfolioWrapper.addEventListener('mouseup', () => {
    isDown = false;
    portfolioWrapper.style.cursor = 'grab';
  });

  portfolioWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - portfolioWrapper.offsetLeft;
    const walk = (x - startX) * 2;
    portfolioWrapper.scrollLeft = scrollLeft - walk;
  });
  
  // Touch support for mobile
  let touchStartX = 0;
  let touchScrollLeft = 0;
  
  portfolioWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX - portfolioWrapper.offsetLeft;
    touchScrollLeft = portfolioWrapper.scrollLeft;
  });
  
  portfolioWrapper.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - portfolioWrapper.offsetLeft;
    const walk = (x - touchStartX) * 2;
    portfolioWrapper.scrollLeft = touchScrollLeft - walk;
  });
  
  console.log('✅ Portfolio horizontal scroll initialized');
}

// ==================== INTERSECTION OBSERVER (FADE-IN ANIMATIONS) ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
    }
  });
}, observerOptions);

// Observe all fade-in elements
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));

if (fadeElements.length > 0) {
  console.log(`✅ Observing ${fadeElements.length} fade-in elements`);
}

// ==================== BACK TO TOP BUTTON ====================
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  console.log('✅ Back to top button initialized');
}

// ==================== TESTIMONIALS AUTO-SCROLL PAUSE ON HOVER ====================
const testimonialsTrack = document.querySelector('.testimonials-track');

if (testimonialsTrack) {
  testimonialsTrack.addEventListener('mouseenter', () => {
    testimonialsTrack.style.animationPlayState = 'paused';
  });
  
  testimonialsTrack.addEventListener('mouseleave', () => {
    testimonialsTrack.style.animationPlayState = 'running';
  });
  
  console.log('✅ Testimonials scroll initialized');
}

// ==================== FORM VALIDATION ====================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');
    
    if (!name || !email || !message) {
      console.warn('Form fields not found');
      return;
    }
    
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();
    
    if (!nameValue || !emailValue || !messageValue) {
      e.preventDefault();
      alert('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      e.preventDefault();
      alert('Please enter a valid email address');
      return;
    }
    
    console.log('✅ Form validation passed');
  });
  
  console.log('✅ Contact form validation initialized');
}

// ==================== STATS COUNTER ANIMATION ====================
const statItems = document.querySelectorAll('.stat-item h3');

const animateCounter = (element) => {
  const text = element.textContent;
  const target = parseInt(text);
  
  if (isNaN(target)) return;
  
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current) + '+';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '+';
    }
  };
  
  updateCounter();
};

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statItems.forEach((item, index) => {
        setTimeout(() => {
          animateCounter(item);
        }, index * 200);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  statsObserver.observe(statsSection);
  console.log('✅ Stats counter initialized');
}

// ==================== FLOATING CARDS PARALLAX ====================
const floatingCards = document.querySelectorAll('.floating-card');

if (floatingCards.length > 0 && window.innerWidth > 1024) {
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    floatingCards.forEach((card, index) => {
      const speed = (index + 1) * 0.5;
      const x = (mouseX - 0.5) * speed * 20;
      const y = (mouseY - 0.5) * speed * 20;
      
      card.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
  
  console.log('✅ Floating cards parallax initialized');
}

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');

if (sections.length > 0) {
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        navLink.classList.add('active');
      }
    });
  });
}

// Add active link style
const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `
  .nav-link.active {
    color: #ff6b35 !important;
  }
  
  .nav-link.active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(activeNavStyle);

// ==================== CUSTOM CURSOR (DESKTOP ONLY) ====================
if (window.innerWidth > 1024) {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'cursor-follower';
  document.body.appendChild(cursorFollower);
  
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });
  
  // Smooth follower animation
  function animateFollower() {
    const delay = 0.1;
    followerX += (mouseX - followerX) * delay;
    followerY += (mouseY - followerY) * delay;
    
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(animateFollower);
  }
  
  animateFollower();
  
  // Add cursor styles
  const cursorStyles = document.createElement('style');
  cursorStyles.textContent = `
    .custom-cursor {
      width: 10px;
      height: 10px;
      background: #ff6b35;
      border-radius: 50%;
      position: fixed;
      top: -5px;
      left: -5px;
      pointer-events: none;
      z-index: 10000;
      mix-blend-mode: difference;
    }
    
    .cursor-follower {
      width: 40px;
      height: 40px;
      border: 2px solid rgba(255, 107, 53, 0.5);
      border-radius: 50%;
      position: fixed;
      top: -20px;
      left: -20px;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.15s ease-out;
    }
  `;
  document.head.appendChild(cursorStyles);
  
  console.log('✅ Custom cursor initialized');
}

// ==================== PREVENT ANIMATION ON PAGE LOAD ====================
document.body.classList.add('preload');

const preloadStyle = document.createElement('style');
preloadStyle.textContent = `
  .preload * {
    animation-duration: 0s !important;
    transition-duration: 0s !important;
  }
`;
document.head.appendChild(preloadStyle);

window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.remove('preload');
  }, 100);
});

// ==================== LAZY LOAD IMAGES ====================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ==================== ACCESSIBILITY - KEYBOARD NAVIGATION ====================
// Escape key to close mobile menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');
  }
});

// Focus trap for mobile menu
const focusableElements = 'button, a, input, textarea';
if (navMenu) {
  const focusableContent = navMenu.querySelectorAll(focusableElements);
  const firstFocusableElement = focusableContent[0];
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  document.addEventListener('keydown', function(e) {
    let isTabPressed = e.key === 'Tab';
    if (!isTabPressed) return;

    if (navMenu.classList.contains('active')) {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
});

// ==================== FEATURE DETECTION ====================
const features = {
  intersectionObserver: 'IntersectionObserver' in window,
  smoothScroll: 'scrollBehavior' in document.documentElement.style,
  backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)'),
  webGL: !!document.createElement('canvas').getContext('webgl')
};

console.log('🔍 Browser Features:', features);

// Fallback for smooth scroll
if (!features.smoothScroll) {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'auto' });
      }
    });
  });
}

// ==================== INITIALIZATION CHECK ====================
function initApp() {
  console.log('%c PixelTraivo Portfolio ', 'background: linear-gradient(135deg, #ff6b35, #ff8c5f); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
  console.log('%c Crafted with 💎 by PixelTraivo ', 'color: #ff6b35; font-size: 14px; font-weight: 600;');
  
  // Check required elements
  const requiredElements = {
    navbar: document.getElementById('navbar'),
    backToTop: document.getElementById('backToTop'),
    contactForm: document.querySelector('.contact-form'),
    portfolioWrapper: document.querySelector('.portfolio-scroll-wrapper'),
    showreelPlayer: document.getElementById('showreelPlayer')
  };
  
  console.log('📋 Elements Check:');
  Object.entries(requiredElements).forEach(([name, element]) => {
    if (element) {
      console.log(`  ✅ ${name} found`);
    } else {
      console.log(`  ⚠️ ${name} not found`);
    }
  });
  
  console.log('✅ All scripts loaded successfully!');
}

// Run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// ==================== SERVICE WORKER (OPTIONAL - PWA) ====================
// Uncomment below to enable Progressive Web App features
/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('✅ Service Worker registered'))
      .catch(err => console.log('❌ Service Worker registration failed:', err));
  });
}
*/