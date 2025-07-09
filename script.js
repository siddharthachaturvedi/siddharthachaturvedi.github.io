// Minimal Portfolio JavaScript - Refined & Elegant
class RefinedPortfolio {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.navToggle = document.getElementById('nav-toggle');
    this.navMobileOverlay = document.getElementById('nav-mobile-overlay');
    this.navMobileLinks = document.querySelectorAll('.nav-mobile-link');
    this.sections = document.querySelectorAll('section[id]');
    this.activeSection = '';
    this.isMobileMenuOpen = false;
    
    this.init();
  }
  
  init() {
    this.setupScrollSpy();
    this.setupSmoothNavigation();
    this.setupResponsiveContent();
    this.setupIntersectionObserver();
    this.setupKeyboardNavigation();
    this.setupMobileNavigation();
  }
  
  setupScrollSpy() {
    const options = {
      threshold: 0.5,
      rootMargin: '-20% 0px -20% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.updateActiveNav(entry.target.id);
        }
      });
    }, options);
    
    this.sections.forEach(section => observer.observe(section));
  }
  
  updateActiveNav(sectionId) {
    if (this.activeSection === sectionId) return;
    
    this.activeSection = sectionId;
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }
  
  setupSmoothNavigation() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.scrollToSection(targetId);
      });
    });
  }
  
  scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;
    
    // Calculate offset to center section in viewport
    const sectionHeight = targetSection.offsetHeight;
    const viewportHeight = window.innerHeight;
    const sectionTop = targetSection.offsetTop;
    
    let scrollPosition;
    if (sectionHeight >= viewportHeight) {
      scrollPosition = sectionTop;
    } else {
      scrollPosition = sectionTop - (viewportHeight - sectionHeight) / 2;
    }
    
    window.scrollTo({
      top: Math.max(0, scrollPosition),
      behavior: 'smooth'
    });
  }
  
  setupResponsiveContent() {
    let resizeTimeout;
    
    const updateContentVisibility = () => {
      const viewport = this.getViewportSize();
      document.body.setAttribute('data-viewport', viewport);
      
      // Update content visibility based on viewport
      const mobileContent = document.querySelectorAll('.content-mobile');
      const tabletContent = document.querySelectorAll('.content-tablet');
      const desktopContent = document.querySelectorAll('.content-desktop');
      
      [mobileContent, tabletContent, desktopContent].forEach(contentList => {
        contentList.forEach(el => {
          el.style.display = window.getComputedStyle(el).display;
        });
      });
    };
    
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateContentVisibility, 100);
    });
    
    // Initial call
    updateContentVisibility();
  }
  
  getViewportSize() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }
  
  setupIntersectionObserver() {
    // Subtle animations for elements coming into view
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });
    
    // Apply subtle entrance animations
    const animatedElements = document.querySelectorAll(`
      .recognition-item,
      .investigation-item,
      .advisory-section,
      .network-item,
      .availability-section
    `);
    
    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      animationObserver.observe(el);
    });
  }
  
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      
      const currentIndex = Array.from(this.sections).findIndex(
        section => section.id === this.activeSection
      );
      
      let targetIndex = currentIndex;
      
      switch(e.key) {
        case 'ArrowDown':
        case 'j':
          e.preventDefault();
          targetIndex = Math.min(currentIndex + 1, this.sections.length - 1);
          break;
        case 'ArrowUp':
        case 'k':
          e.preventDefault();
          targetIndex = Math.max(currentIndex - 1, 0);
          break;
        case 'Home':
          e.preventDefault();
          targetIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          targetIndex = this.sections.length - 1;
          break;
      }
      
      if (targetIndex !== currentIndex) {
        this.scrollToSection(this.sections[targetIndex].id);
      }
    });
  }
  
  setupMobileNavigation() {
    if (!this.navToggle || !this.navMobileOverlay) return;
    
    // Toggle mobile menu
    this.navToggle.addEventListener('click', () => {
      this.toggleMobileMenu();
    });
    
    // Close menu when clicking overlay
    this.navMobileOverlay.addEventListener('click', (e) => {
      if (e.target === this.navMobileOverlay) {
        this.closeMobileMenu();
      }
    });
    
    // Handle mobile menu links
    this.navMobileLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.scrollToSection(targetId);
        this.closeMobileMenu();
      });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    });
    
    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }
  
  toggleMobileMenu() {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }
  
  openMobileMenu() {
    this.isMobileMenuOpen = true;
    this.navToggle.classList.add('active');
    this.navToggle.setAttribute('aria-expanded', 'true');
    this.navMobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.navToggle.classList.remove('active');
    this.navToggle.setAttribute('aria-expanded', 'false');
    this.navMobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Utility Functions
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Enhanced Link Interactions
const setupLinkInteractions = () => {
  const links = document.querySelectorAll('a[href^="http"], a[href^="mailto"]');
  
  links.forEach(link => {
    // Add external link indicators
    if (link.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      
      // Add subtle visual indicator for external links
      link.style.position = 'relative';
    }
    
    // Smooth hover effects
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-1px)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
};

// Performance Optimizations
const setupPerformanceOptimizations = () => {
  // Enhanced scroll snapping for better UX
  const criticalFonts = [
    'Inter',
    'Playfair Display'
  ];
  
  // Check if fonts are loaded
  if ('fonts' in document) {
    Promise.all(
      criticalFonts.map(font => document.fonts.load(`1rem ${font}`))
    ).then(() => {
      document.body.classList.add('fonts-loaded');
    });
  }
  
  // Optimize images if any exist
  const images = document.querySelectorAll('img');
  if (images.length > 0 && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      if (img.dataset.src) {
        imageObserver.observe(img);
      }
    });
  }
};

// Accessibility Enhancements
const setupAccessibility = () => {
  // Skip to content link
  const skipLink = document.createElement('a');
  skipLink.href = '#hero';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--color-sapphire);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
    transition: top 0.2s;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Announce section changes to screen readers
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.style.cssText = `
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  `;
  document.body.appendChild(announcer);
  
  // Update announcer when section changes
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionTitle = entry.target.querySelector('h1, h2, .section-header');
        if (sectionTitle) {
          announcer.textContent = `Now viewing: ${sectionTitle.textContent}`;
        }
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
  });
};

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Disable smooth scrolling and animations
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.classList.add('reduced-motion');
  }
  
  // Initialize main portfolio functionality
  window.portfolioInstance = new RefinedPortfolio();
  
  // Setup additional enhancements
  setupLinkInteractions();
  setupPerformanceOptimizations();
  setupAccessibility();
  
  // Add loaded class for any CSS transitions
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  });
  
  // Log performance metrics in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
      setTimeout(() => {
        if ('performance' in window) {
          const perfData = performance.getEntriesByType('navigation')[0];
          // console.log('🚀 Page Performance:');
          // console.log(`📊 Load Time: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
          // console.log(`🎨 DOM Content Loaded: ${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`);
        }
      }, 100);
    });
  }
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause any heavy operations when page is hidden
    // console.log('📱 Page hidden - pausing operations');
  } else {
    // Resume operations when page becomes visible
    // console.log('👁️ Page visible - resuming operations');
  }
});

// Global error handling
window.addEventListener('error', (e) => {
  console.error('💥 JavaScript Error:', e.error);
  // In production, you might want to send this to an error tracking service
});

// Expose portfolio instance for debugging
window.RefinedPortfolio = RefinedPortfolio;