/* Main JS for static site
   - Theme toggle + persistence
   - Mobile menu toggle
   - Scroll spy to mark active nav link
   - Smooth scroll handling
   - Venture screenshot lazy loading via IntersectionObserver
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
    const sections = ['hero', 'about', 'recognition', 'ventures', 'current', 'connect'];
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

  // Venture screenshot lazy loading
  function initVenturePreviews() {
    const imgs = $$('.venture-screenshot');
    if (!imgs.length) return;

    const retryLimit = 2;
    const retryDelay = 2000;

    imgs.forEach(img => {
      const url = img.closest('.venture-card')?.dataset?.url;
      const isFeatured = img.closest('.featured-venture');
      const width = isFeatured ? 1440 : 1200;
      const height = isFeatured ? 960 : 800;
      const mshots = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&h=${height}`;
      const proxy = `https://corsproxy.io/?${encodeURIComponent(mshots)}`;

      let retryCount = 0;

      const attemptLoad = () => {
        img.onload = () => {
          setTimeout(() => img.classList.add('loaded'), 150);
        };
        img.onerror = () => {
          if (retryCount < retryLimit) {
            retryCount++;
            setTimeout(attemptLoad, retryDelay);
          } else {
            const loadingContainer = img.parentElement.querySelector('.venture-preview-loading');
            if (loadingContainer) {
              loadingContainer.innerHTML = '<div style="color: var(--text-secondary); font-size: var(--text-sm); text-align: center; padding: var(--space-md); width: 100%;">Preview unavailable</div>';
            }
          }
        };
        img.crossOrigin = 'anonymous';
        img.src = proxy;
      };

      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !img.src) {
            attemptLoad();
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05, rootMargin: '150px' });

      const card = img.closest('.venture-card');
      if (card) io.observe(card);
    });
  }

  // Initialize everything
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initNavLinks();
    initScrollSpy();
    initVenturePreviews();

    // Theme toggle handling
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.addEventListener('change', (e) => toggleTheme(e.target.checked));
  });
})();
