/* =====================================================
   PIXELTRAIVO® - OPTIMIZED JAVASCRIPT
   Ultra-Fast Performance + Enhanced Features
   Version: 2.0
   ===================================================== */

// ==================== PRELOADER (FASTER - 500ms) ====================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    if (preloader) {
      preloader.classList.add('hide');
    }
  }, 500); // Reduced from 1000ms to 500ms
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
}, { passive: true }); // Performance optimization

// Mobile menu toggle (faster animation)
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

// ==================== VIMEO VIDEO HOVER PLAY/PAUSE (OPTIMIZED) ====================
window.addEventListener('load', () => {
  // Check if Vimeo API is loaded
  if (typeof Vimeo === 'undefined') {
    console.warn('⚠️ Vimeo Player API not loaded yet');
    // Retry after delay
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
  // ===== SHOWREEL VIDEO - Hover to Play with Loop =====
  const showreelPlayer = document.getElementById('showreelPlayer');
  if (showreelPlayer) {
    try {
      const player = new Vimeo.Player(showreelPlayer);
      const videoWrapper = showreelPlayer.closest('.video-player');
      
      // Enable loop
      player.setLoop(true).catch(err => console.log('Loop setting error:', err));
      
      // Set quality for faster loading
      player.setQuality('auto').catch(err => console.log('Quality setting error:', err));
      
      if (videoWrapper) {
        videoWrapper.addEventListener('mouseenter', () => {
          player.play().catch(err => console.log('Play error:', err));
        });
        
        videoWrapper.addEventListener('mouseleave', () => {
          player.pause().catch(err => console.log('Pause error:', err));
        });
      }
      
      console.log('✅ Showreel video initialized');
    } catch (err) {
      console.error('Showreel player error:', err);
    }
  }

  // ===== PORTFOLIO VIDEOS - Hover to Play with Loop (OPTIMIZED) =====
  const portfolioVideos = document.querySelectorAll('.portfolio-video');
  const portfolioPlayers = [];
  
  if (portfolioVideos.length > 0) {
    portfolioVideos.forEach((iframe, index) => {
      try {
        const player = new Vimeo.Player(iframe);
        portfolioPlayers.push(player);
        
        // Enable loop for each video
        player.setLoop(true).catch(err => console.log('Loop error:', err));
        
        // Set quality for faster loading
        player.setQuality('auto').catch(err => console.log('Quality error:', err));
        
        const card = iframe.closest('.portfolio-card');
        
        if (card) {
          card.addEventListener('mouseenter', () => {
            // Pause all other videos (performance optimization)
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
    
    console.log(`✅ Initialized ${portfolioPlayers.length} portfolio videos`);
  }
}

// ==================== PORTFOLIO HORIZONTAL SCROLL (ENHANCED) ====================
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
    const walk = (x - startX) * 2.5; // Increased sensitivity
    portfolioWrapper.scrollLeft = scrollLeft - walk;
  });
  
  // Enhanced touch support for mobile
  let touchStartX = 0;
  let touchScrollLeft = 0;
  
  portfolioWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX - portfolioWrapper.offsetLeft;
    touchScrollLeft = portfolioWrapper.scrollLeft;
  }, { passive: true });
  
  portfolioWrapper.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - portfolioWrapper.offsetLeft;
    const walk = (x - touchStartX) * 2.5; // Better sensitivity
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
      observer.unobserve(entry.target); // Unobserve after animation
    }
  });
}, observerOptions);

// Observe fade-in elements
const fadeElements = document.querySelectorAll('.fade-in, .benefit-item');
fadeElements.forEach(el => observer.observe(el));

if (fadeElements.length > 0) {
  console.log(`✅ Observing ${fadeElements.length} elements`);
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

// ==================== FORM VALIDATION (ENHANCED) ====================
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
    
    // Show success message
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

// ==================== FLOATING CARDS PARALLAX (OPTIMIZED) ====================
const floatingCards = document.querySelectorAll('.floating-card');

if (floatingCards.length > 0 && window.innerWidth > 1024) {
  let mouseX = 0;
  let mouseY = 0;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  }, { passive: true });
  
  function animateCards() {
    floatingCards.forEach((card, index) => {
      const speed = (index + 1) * 0.5;
      const x = (mouseX - 0.5) * speed * 20;
      const y = (mouseY - 0.5) * speed * 20;
      
      card.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    requestAnimationFrame(animateCards);
  }
  
  animateCards();
  console.log('✅ Parallax initialized');
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
  if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');
  }
});

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

console.log('%c ⚡ Ultra-Fast Performance Mode Active ', 'background: #fbbf24; color: #0a0a0a; font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 4px;');

console.log('%c 📧 Contact: pixeltraivo@gmail.com ', 'color: #ff6b35; font-size: 11px;');

console.log('%c 📱 WhatsApp: +91 88157 20085 ', 'color: #ff6b35; font-size: 11px;');

console.log('%c ────────────────────────────────────── ', 'color: rgba(255, 107, 53, 0.3);');

console.log('%c 🚀 Features Loaded: ', 'color: #ff6b35; font-weight: bold; font-size: 12px;');
console.log('  ✓ Fast Video Loading');
console.log('  ✓ Smooth Animations');
console.log('  ✓ Mobile Optimized');
console.log('  ✓ Touch Gestures');
console.log('  ✓ Form Protection');

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
  }
});


/* ==================== ADVANCED CUSTOM CURSOR + EFFECTS ==================== */

if (window.innerWidth > 1024) {
  
  // Create cursor elements
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
  let particles = [];

  // Mouse move event
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    
    // Create particle trail (every 5th frame)
    if (Math.random() > 0.8) {
      createParticle(mouseX, mouseY);
    }
  });

  // Smooth follower animation
  function animateFollower() {
    const delay = 0.15;
    followerX += (mouseX - followerX) * delay;
    followerY += (mouseY - followerY) * delay;
    
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Create particle effect
  function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    const tx = (Math.random() - 0.5) * 100;
    const ty = (Math.random() - 0.5) * 100;
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 800);
  }

  // Click ripple effect
  document.addEventListener('click', (e) => {
    cursor.classList.add('click');
    setTimeout(() => cursor.classList.remove('click'), 150);
    
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = (e.clientX - 10) + 'px';
    ripple.style.top = (e.clientY - 10) + 'px';
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });

  // Hover states for different elements
  const buttons = document.querySelectorAll('.btn, .download-btn-windows, .download-btn-macos');
  const links = document.querySelectorAll('.nav-link, a');
  const videos = document.querySelectorAll('.video-player, .portfolio-card, .video-frame');

  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      cursorFollower.classList.add('hover-button');
    });
    btn.addEventListener('mouseleave', () => {
      cursorFollower.classList.remove('hover-button');
    });
  });

  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursorFollower.classList.add('hover-link');
    });
    link.addEventListener('mouseleave', () => {
      cursorFollower.classList.remove('hover-link');
    });
  });

  videos.forEach(video => {
    video.addEventListener('mouseenter', () => {
      cursorFollower.classList.add('hover-video');
    });
    video.addEventListener('mouseleave', () => {
      cursorFollower.classList.remove('hover-video');
    });
  });

  console.log('✅ Advanced custom cursor initialized');
}

/* ==================== MAGNETIC BUTTONS EFFECT ==================== */

if (window.innerWidth > 1024) {
  const magneticElements = document.querySelectorAll('.btn, .service-card, .portfolio-card, .lut-card, .nav-link');
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = x * 0.15;
      const moveY = y * 0.15;
      
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
  
  console.log('✅ Magnetic button effect initialized');
}

/* ==================== 3D CARD TILT EFFECT ==================== */

if (window.innerWidth > 1024) {
  const tiltCards = document.querySelectorAll('.service-card, .portfolio-card, .lut-card, .coming-soon-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.setProperty('--rotate-x', rotateX + 'deg');
      card.style.setProperty('--rotate-y', rotateY + 'deg');
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
    });
  });
  
  console.log('✅ 3D card tilt effect initialized');
}

/* ==================== SCROLL REVEAL ANIMATION ==================== */

const revealElements = document.querySelectorAll('.service-card, .portfolio-card, .lut-card, .testimonial-card, .benefit-item, .coming-soon-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('reveal', 'active');
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

console.log('✅ Scroll reveal animation initialized');

/* ==================== PARALLAX MOUSE EFFECT ==================== */

if (window.innerWidth > 1024) {
  const parallaxSections = document.querySelectorAll('.hero, .showreel, .services');
  
  parallaxSections.forEach(section => {
    const bg = document.createElement('div');
    bg.className = 'parallax-bg';
    section.insertBefore(bg, section.firstChild);
    
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      bg.style.setProperty('--mouse-x', x + '%');
      bg.style.setProperty('--mouse-y', y + '%');
    });
  });
  
  console.log('✅ Parallax mouse effect initialized');
}

/* ==================== SMOOTH SCROLL PROGRESS ==================== */

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

console.log('✅ Scroll progress bar initialized');

/* ==================== ENHANCED HOVER GLOW ==================== */

const glowElements = document.querySelectorAll('.btn, .gradient-text, .nav-link');

glowElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.filter = 'drop-shadow(0 0 15px rgba(255, 107, 53, 0.6))';
  });
  
  el.addEventListener('mouseleave', () => {
    el.style.filter = 'none';
  });
});

console.log('✅ Enhanced hover glow initialized');

/* ==================== TYPING EFFECT (Optional for Hero) ==================== */

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Uncomment to enable typing effect on hero title
/*
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const originalText = heroTitle.textContent;
  window.addEventListener('load', () => {
    typeWriter(heroTitle, originalText, 50);
  });
}
*/

/* ==================== PERFORMANCE MONITORING ==================== */

console.log('%c 🎨 Advanced Animations Loaded! ', 'background: linear-gradient(135deg, #ff6b35, #fbbf24); color: white; font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 6px;');

console.log('%c Features Active: ', 'color: #ff6b35; font-weight: bold;');
console.log('  ✓ Custom Cursor');
console.log('  ✓ Magnetic Buttons');
console.log('  ✓ 3D Card Tilt');
console.log('  ✓ Particle Trail');
console.log('  ✓ Click Ripple');
console.log('  ✓ Scroll Reveal');
console.log('  ✓ Parallax Background');
console.log('  ✓ Scroll Progress Bar');
console.log('  ✓ Hover Glow Effects');




/* ==================== FLOATING BACKGROUND PARTICLES ==================== */

if (window.innerWidth > 1024) {
  const particlesContainer = document.createElement('div');
  particlesContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  `;
  document.body.appendChild(particlesContainer);

  function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(255, 107, 53, ${Math.random() * 0.5 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: 100%;
      animation: floatUp ${Math.random() * 10 + 15}s linear infinite;
    `;
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 25000);
  }

  // Create particles periodically
  setInterval(createFloatingParticle, 300);

  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  console.log('✅ Background particles initialized');
}