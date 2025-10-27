/* =====================================================
   PIXELTRAIVO® - CLEAN OPTIMIZED JAVASCRIPT
   Fast Performance + Essential Features Only
   Version: 2.0 - No Heavy Effects
   ===================================================== */

// ==================== PRELOADER (FAST - 500ms) ====================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    if (preloader) {
      preloader.classList.add('hide');
    }
  }, 500);
});

// ==================== NAVIGATION ====================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect (optimized)
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (navbar) {
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  lastScroll = currentScroll;
}, { passive: true });

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

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    if (navMenu) navMenu.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');
  }
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

// ==================== VIMEO VIDEO HOVER PLAY/PAUSE ====================
window.addEventListener('load', () => {
  // Check if Vimeo API is loaded
  if (typeof Vimeo === 'undefined') {
    console.warn('⚠️ Vimeo Player API not loaded yet - retrying...');
    setTimeout(() => {
      if (typeof Vimeo !== 'undefined') {
        initializeVideos();
      }
    }, 1000);
    return;
  }
  
  initializeVideos();
});

function initializeVideos() {
  // ===== SHOWREEL VIDEO - Hover to Play =====
  const showreelPlayer = document.getElementById('showreelPlayer');
  if (showreelPlayer) {
    try {
      const player = new Vimeo.Player(showreelPlayer);
      const videoWrapper = showreelPlayer.closest('.video-player');
      
      // Enable loop
      player.setLoop(true).catch(err => console.log('Loop error:', err));
      
      // Set quality
      player.setQuality('auto').catch(err => console.log('Quality error:', err));
      
      if (videoWrapper) {
        videoWrapper.addEventListener('mouseenter', () => {
          player.play().catch(err => {});
        });
        
        videoWrapper.addEventListener('mouseleave', () => {
          player.pause().catch(err => {});
        });
      }
      
      console.log('✅ Showreel video initialized');
    } catch (err) {
      console.error('Showreel player error:', err);
    }
  }

  // ===== PORTFOLIO VIDEOS - Hover to Play =====
  const portfolioVideos = document.querySelectorAll('.portfolio-video');
  const portfolioPlayers = [];
  
  if (portfolioVideos.length > 0) {
    portfolioVideos.forEach((iframe, index) => {
      try {
        const player = new Vimeo.Player(iframe);
        portfolioPlayers.push(player);
        
        // Enable loop
        player.setLoop(true).catch(err => {});
        
        // Set quality
        player.setQuality('auto').catch(err => {});
        
        const card = iframe.closest('.portfolio-card');
        
        if (card) {
          card.addEventListener('mouseenter', () => {
            // Pause all other videos (performance)
            portfolioPlayers.forEach((p, i) => {
              if (i !== index) {
                p.pause().catch(err => {});
              }
            });
            
            // Play current video
            player.play().catch(err => {});
          });
          
          card.addEventListener('mouseleave', () => {
            player.pause().catch(err => {});
          });
        }
      } catch (err) {
        console.error(`Portfolio video ${index} error:`, err);
      }
    });
    
    console.log(`✅ Initialized ${portfolioPlayers.length} portfolio videos`);
  }
}

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
    const walk = (x - startX) * 2.5;
    portfolioWrapper.scrollLeft = scrollLeft - walk;
  });
  
  // Touch support for mobile
  let touchStartX = 0;
  let touchScrollLeft = 0;
  
  portfolioWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX - portfolioWrapper.offsetLeft;
    touchScrollLeft = portfolioWrapper.scrollLeft;
  }, { passive: true });
  
  portfolioWrapper.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - portfolioWrapper.offsetLeft;
    const walk = (x - touchStartX) * 2.5;
    portfolioWrapper.scrollLeft = touchScrollLeft - walk;
  }, { passive: true });
  
  console.log('✅ Portfolio scroll initialized');
}

// ==================== INTERSECTION OBSERVER (FADE-IN) ====================
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
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe fade-in elements
const fadeElements = document.querySelectorAll('.fade-in, .benefit-item');
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
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  console.log('✅ Back to top initialized');
}

// ==================== TESTIMONIALS AUTO-SCROLL ====================
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
    
    // Check if fields are filled
    if (!nameValue || !emailValue || !messageValue) {
      e.preventDefault();
      alert('⚠️ Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      e.preventDefault();
      alert('⚠️ Please enter a valid email address');
      return;
    }
    
    console.log('✅ Form validation passed');
  });
  
  console.log('✅ Form validation initialized');
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
  }, { passive: true });
}

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

// ==================== ACCESSIBILITY ====================
// Escape key to close mobile menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      if (navToggle) navToggle.classList.remove('active');
    }
  }
});

// Focus trap in mobile menu
if (navMenu) {
  const focusableElements = navMenu.querySelectorAll('a, button');
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  navMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }
  });
}

// ==================== SCROLL PROGRESS BAR ====================
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: linear-gradient(90deg, #ff6b35, #fbbf24);
  z-index: 9999;
  transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
}, { passive: true });

console.log('✅ Scroll progress bar added');

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
});

// Prevent errors from breaking the app
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled Promise Rejection:', e.reason);
  e.preventDefault();
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

// ==================== CONSOLE BRANDING ====================
console.log('%c ✨ PIXELTRAIVO® ', 'background: linear-gradient(135deg, #ff6b35, #ff8c5f); color: white; font-size: 24px; font-weight: bold; padding: 12px 24px; border-radius: 8px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');

console.log('%c 🎬 Professional Video Editor & Motion Designer ', 'background: #0f172a; color: #ff6b35; font-size: 14px; font-weight: 600; padding: 8px 16px; border-radius: 6px; border: 2px solid #ff6b35;');

console.log('%c 💼 Crafting Visual Stories That Resonate ', 'color: #ff6b35; font-size: 12px; font-weight: 500; font-style: italic;');

console.log('%c ────────────────────────────────────── ', 'color: rgba(255, 107, 53, 0.3);');

console.log('%c ✅ Website Loaded Successfully! ', 'background: #10b981; color: white; font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 6px;');

console.log('%c ⚡ Clean & Fast Performance Mode Active ', 'background: #fbbf24; color: #0a0a0a; font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 4px;');

console.log('%c 📧 Contact: pixeltraivo@gmail.com ', 'color: #ff6b35; font-size: 11px;');

console.log('%c 📱 WhatsApp: +91 88157 20085 ', 'color: #ff6b35; font-size: 11px;');

console.log('%c ────────────────────────────────────── ', 'color: rgba(255, 107, 53, 0.3);');

console.log('%c 🚀 Features Loaded: ', 'color: #ff6b35; font-weight: bold; font-size: 12px;');
console.log('  ✓ Smooth Scrolling');
console.log('  ✓ Video Hover Play');
console.log('  ✓ Portfolio Scroll');
console.log('  ✓ Fade-in Animations');
console.log('  ✓ Stats Counter');
console.log('  ✓ Form Validation');
console.log('  ✓ Mobile Optimized');
console.log('  ✓ Scroll Progress Bar');

console.log('%c ────────────────────────────────────── ', 'color: rgba(255, 107, 53, 0.3);');

console.log('%c © 2025 PixelTraivo® | All Rights Reserved ', 'color: rgba(255, 107, 53, 0.6); font-size: 10px;');

console.log('%c Made with ❤️ for Creative Storytelling ', 'color: rgba(255, 107, 53, 0.6); font-size: 10px;');

// ==================== INITIALIZATION CHECK ====================
function initApp() {
  const requiredElements = {
    navbar: document.getElementById('navbar'),
    backToTop: document.getElementById('backToTop'),
    contactForm: document.querySelector('.contact-form'),
    portfolioWrapper: document.querySelector('.portfolio-scroll-wrapper'),
    showreelPlayer: document.getElementById('showreelPlayer')
  };
  
  console.log('%c 📋 Element Status: ', 'color: #ff6b35; font-weight: bold;');
  
  let foundCount = 0;
  Object.entries(requiredElements).forEach(([name, element]) => {
    if (element) {
      console.log(`  ✅ ${name}`);
      foundCount++;
    } else {
      console.log(`  ⚠️  ${name} (optional)`);
    }
  });
  
  console.log(`\n%c 🎯 ${foundCount}/${Object.keys(requiredElements).length} Elements Loaded `, 'background: #10b981; color: white; padding: 4px 12px; border-radius: 4px; font-weight: bold;');
  
  console.log('%c ────────────────────────────────────── ', 'color: rgba(255, 107, 53, 0.3);');
}

// Run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// ==================== PERFORMANCE MONITORING ====================
window.addEventListener('load', () => {
  if (window.performance) {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`%c ⚡ Page Load Time: ${loadTime}ms `, 'background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px;');
    
    // Log FCP and LCP (if available)
    if (window.PerformanceObserver) {
      try {
        const perfObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              console.log(`%c 🎨 FCP: ${Math.round(entry.startTime)}ms `, 'background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px;');
            }
          }
        });
        perfObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        // Observer not supported
      }
    }
  }
});

// ==================== SIMPLIFIED PARALLAX (OPTIONAL - LIGHTWEIGHT) ====================
// Subtle parallax effect on hero section only (no lag)
if (window.innerWidth > 1024) {
  const hero = document.querySelector('.hero');
  
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }, { passive: true });
    
    console.log('✅ Lightweight parallax active');
  }
}

// ==================== END ====================
console.log('%c\n🎉 All Systems Ready! Website is Fully Functional.\n ', 'color: #10b981; font-weight: bold; font-size: 14px;');