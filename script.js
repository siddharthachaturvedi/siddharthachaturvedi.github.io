/*
 * Siddhartha Chaturvedi • Strategic AI Visionary
 * Bauhaus x Japanese Minimalism
 */

(function () {
  // Utilities
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // Mobile Navigation
  function initMobileNav() {
    const navToggle = $('#nav-toggle');
    const overlay = $('#nav-mobile-overlay');

    if (!navToggle || !overlay) return;

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

    // Close on mobile link click
    $$('.nav-mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        overlay.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Smooth Scroll with Offset
  function initSmoothScroll() {
    $$('.nav-link, .nav-mobile-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = $(`#${targetId}`);

        if (target) {
          const navHeight = 80;
          const targetPosition = target.offsetTop - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Scroll Spy
  function initScrollSpy() {
    const sections = ['hero', 'about', 'current', 'connect'];
    const links = {};

    sections.forEach(id => {
      const link = $(`.nav-link[href='#${id}']`);
      if (link) links[id] = link;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Object.values(links).forEach(link => link.classList.remove('active'));
          const activeLink = links[entry.target.id];
          if (activeLink) activeLink.classList.add('active');
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(id => {
      const section = $(`#${id}`);
      if (section) observer.observe(section);
    });
  }

  // Triad Node Interactions
  function initTriadNodes() {
    const nodes = $$('.triad-node');
    let activeNode = null;

    nodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        if (activeNode && activeNode !== node) {
          activeNode.classList.remove('active');
        }
        node.classList.add('active');
        activeNode = node;
      });

      node.addEventListener('mouseleave', () => {
        node.classList.remove('active');
        if (activeNode === node) {
          activeNode = null;
        }
      });

      node.addEventListener('click', () => {
        const isActive = node.classList.contains('active');
        nodes.forEach(n => n.classList.remove('active'));

        if (!isActive) {
          node.classList.add('active');
          activeNode = node;
        } else {
          activeNode = null;
        }
      });
    });
  }

  // Fade-in Animations on Scroll
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const animateElements = $$('.hero-identity, .value-function, .hero-cta, .section-header, .focus-item, .triad-node');
    animateElements.forEach((el) => {
      observer.observe(el);
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initSmoothScroll();
    initScrollSpy();
    initTriadNodes();
    initScrollAnimations();
  });
})();
