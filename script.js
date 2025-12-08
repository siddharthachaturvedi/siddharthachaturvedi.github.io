/* Post-2026 Website - Neo-Futurist Minimalism JavaScript
   - Enhanced theme toggle with cyberpunk effects
   - Mobile menu with holographic animations
   - Advanced scroll spy with intersection observer
   - Scroll-triggered animations for post-2026 UX
   - Venture screenshot lazy loading with retry logic
   - Performance-optimized event handling
*/

(function () {
  // Utilities
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Theme handling
  function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    document.body.classList.toggle('dark-theme', initial === 'dark');
    document.body.classList.toggle('light-theme', initial === 'light');
    const toggle = $('#theme-toggle');
    if (toggle) toggle.checked = initial === 'dark';
  }

  function toggleTheme(checked) {
    document.body.classList.toggle('dark-theme', checked);
    document.body.classList.toggle('light-theme', !checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
  }

  // Mobile nav
  function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const overlay = document.getElementById('nav-mobile-overlay');
    if (!navToggle) return;

    navToggle.addEventListener('click', () => {
      const active = navToggle.classList.toggle('active');
      overlay.classList.toggle('active', active);
      document.body.style.overflow = active ? 'hidden' : '';
      navToggle.setAttribute('aria-expanded', String(active));
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Nav smooth scroll and scroll offset (nav height)
  function initNavLinks() {
    const links = $$('.nav-link');
    const linksMobile = $$('.nav-mobile-link');
    function scrollToId(e, id) {
      if (e) e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      const navHeight = 80;
      const target = Math.max(0, el.offsetTop - navHeight);
      window.scrollTo({ top: target, behavior: 'smooth' });
    }

    links.forEach(a => a.addEventListener('click', (e) => scrollToId(e, a.getAttribute('href').substring(1))));
    linksMobile.forEach(a => a.addEventListener('click', (e) => scrollToId(e, a.getAttribute('href').substring(1))));
  }

  // Scroll spy - highlight active nav link
  function initScrollSpy() {
    const sections = ['hero', 'about', 'current', 'connect'];
    const linkMap = {};
    sections.forEach(id => {
      const link = document.querySelector(`.nav-link[href='#${id}']`);
      if (link) linkMap[id] = link;
    });

    const opts = { threshold: [0.25, 0.5, 0.75], rootMargin: '-80px 0px -50% 0px' };

    let current = 'hero';
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          current = entry.target.id;
        }
      });
      // Update links
      Object.keys(linkMap).forEach(id => linkMap[id].classList.toggle('active', id === current));
    }, opts);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }

  // Scroll-based animations for post-2026 UX
  function initScrollAnimations() {
    const animateOnScroll = (elements, animationClass = 'fade-in') => {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            io.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      elements.forEach(el => io.observe(el));
    };

    // Animate section headers
    const sectionHeaders = $$('.section-header');
    animateOnScroll(sectionHeaders, 'fade-in');

    // Animate focus items
    const focusItems = $$('.focus-item');
    focusItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 100}ms`;
    });
    animateOnScroll(focusItems, 'fade-in');

    // Animate hero elements
    const heroElements = $$('.hero-photo, .hero-name, .hero-tagline, .alignment-framework, .hero-cta');
    heroElements.forEach((el, index) => {
      el.style.transitionDelay = `${index * 100}ms`;
    });
    animateOnScroll(heroElements, 'fade-in-staggered');
  }

  // Alignment Controller Interactive Visualization
  function initAlignmentController() {
    const nodes = $$('.node');
    const legendItems = $$('.legend-item');
    const centerConnections = $('.center-connections');
    const lines = {
      'resonance': ['.line-resonance-relevance', '.line-response-resonance'],
      'relevance': ['.line-resonance-relevance', '.line-relevance-response'],
      'response': ['.line-relevance-response', '.line-response-resonance'],
      'equilibrium': ['.line-resonance-relevance', '.line-relevance-response', '.line-response-resonance']
    };

    let activeNode = null;

    const setActive = (nodeName) => {
      // Clear all active states
      nodes.forEach(n => n.classList.remove('active'));
      legendItems.forEach(l => l.classList.remove('active'));
      $$('.line-active').forEach(l => l.style.opacity = '0');

      if (centerConnections) {
        centerConnections.classList.remove('active');
      }

      if (!nodeName) {
        activeNode = null;
        return;
      }

      activeNode = nodeName;

      // Set active node
      const activeNodeEl = $(`.node-${nodeName}`);
      if (activeNodeEl) {
        activeNodeEl.classList.add('active');
      }

      // Set active legend
      const activeLegend = $(`.legend-item[data-node="${nodeName}"]`);
      if (activeLegend) {
        activeLegend.classList.add('active');
      }

      // Activate corresponding lines
      if (lines[nodeName]) {
        lines[nodeName].forEach(selector => {
          const line = $(selector);
          if (line) line.style.opacity = '1';
        });
      }

      // Special case for equilibrium
      if (nodeName === 'equilibrium' && centerConnections) {
        centerConnections.classList.add('active');
      }
    };

    // Node hover handlers
    nodes.forEach(node => {
      const nodeName = node.dataset.node;

      node.addEventListener('mouseenter', () => {
        setActive(nodeName);
      });

      node.addEventListener('mouseleave', () => {
        setActive(null);
      });
    });

    // Legend item handlers
    legendItems.forEach(item => {
      const nodeName = item.dataset.node;

      item.addEventListener('mouseenter', () => {
        setActive(nodeName);
      });

      item.addEventListener('mouseleave', () => {
        setActive(null);
      });

      item.addEventListener('click', () => {
        if (activeNode === nodeName) {
          setActive(null);
        } else {
          setActive(nodeName);
        }
      });
    });

    // Mouse parallax effect for grid
    const alignmentGrid = $('.alignment-grid');
    if (alignmentGrid) {
      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (e) => {
        const rect = alignmentGrid.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 10 - 5;
        mouseY = ((e.clientY - rect.top) / rect.height) * 10 - 5;
        alignmentGrid.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      };

      const controller = $('.alignment-controller');
      if (controller) {
        controller.addEventListener('mousemove', handleMouseMove);
        controller.addEventListener('mouseleave', () => {
          alignmentGrid.style.transform = 'translate(0, 0)';
        });
      }
    }
  }

  // Initialize everything
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initNavLinks();
    initScrollSpy();
    initScrollAnimations();
    initAlignmentController();

    // Theme toggle handling
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.addEventListener('change', (e) => toggleTheme(e.target.checked));
  });
})();
