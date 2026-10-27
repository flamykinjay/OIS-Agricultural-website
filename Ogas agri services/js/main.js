(function () {
  'use strict';

  var HEADER_SCROLL_THRESHOLD = 24;

  var DESKTOP_BREAKPOINT_QUERY = '(min-width: 1024px)';

  document.documentElement.classList.add('js-enabled');

  function initHeaderScrollState() {
    var header = document.querySelector('[data-site-header]');
    if (!header) return;

    var isTicking = false;

    function updateHeaderState() {
      header.classList.toggle('is-scrolled', window.scrollY > HEADER_SCROLL_THRESHOLD);
      isTicking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!isTicking) {
          isTicking = true;
          window.requestAnimationFrame(updateHeaderState);
        }
      },
      { passive: true }
    );

    updateHeaderState();
  }

  function initMobileNavigation() {
    var header = document.querySelector('[data-site-header]');
    var toggleButton = document.querySelector('[data-nav-toggle]');
    var navPanel = document.querySelector('[data-site-nav]');
    if (!header || !toggleButton || !navPanel) return;

    var desktopQuery = window.matchMedia(DESKTOP_BREAKPOINT_QUERY);

    function setNavOpen(shouldOpen) {
      navPanel.classList.toggle('is-open', shouldOpen);
      header.classList.toggle('is-nav-open', shouldOpen);
      toggleButton.setAttribute('aria-expanded', String(shouldOpen));
      toggleButton.setAttribute('aria-label', shouldOpen ? 'Close menu' : 'Open menu');
    }

    toggleButton.addEventListener('click', function () {
      setNavOpen(toggleButton.getAttribute('aria-expanded') !== 'true');
    });

    navPanel.addEventListener('click', function (event) {
      if (event.target.closest('a')) setNavOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      var isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
      if (event.key === 'Escape' && isOpen) {
        setNavOpen(false);
        toggleButton.focus();
      }
    });

    document.addEventListener('click', function (event) {
      var isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
      if (isOpen && !header.contains(event.target)) setNavOpen(false);
    });

    desktopQuery.addEventListener('change', function (event) {
      if (event.matches) setNavOpen(false);
    });
  }

  function initWhatsAppFloat() {
    var widget = document.querySelector('[data-whatsapp-float]');
    if (!widget) return;

    var toggleButton = widget.querySelector('[data-whatsapp-toggle]');
    var panel = widget.querySelector('[data-whatsapp-panel]');
    if (!toggleButton || !panel) return;

    toggleButton.setAttribute('role', 'button');
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.setAttribute('aria-controls', panel.id);

    function setPanelOpen(shouldOpen) {
      panel.classList.toggle('is-open', shouldOpen);
      toggleButton.setAttribute('aria-expanded', String(shouldOpen));
      toggleButton.setAttribute(
        'aria-label',
        shouldOpen ? 'Close WhatsApp chat options' : 'Chat with us on WhatsApp'
      );
    }

    function isPanelOpen() {
      return toggleButton.getAttribute('aria-expanded') === 'true';
    }

    toggleButton.addEventListener('click', function (event) {
      event.preventDefault();
      setPanelOpen(!isPanelOpen());
    });

    toggleButton.addEventListener('keydown', function (event) {
      if (event.key === ' ') {
        event.preventDefault();
        setPanelOpen(!isPanelOpen());
      }
    });

    panel.addEventListener('click', function (event) {
      if (event.target.closest('a')) setPanelOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isPanelOpen()) {
        setPanelOpen(false);
        toggleButton.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (isPanelOpen() && !widget.contains(event.target)) setPanelOpen(false);
    });
  }

  function initImageFallbacks() {
    var FRAME_SELECTOR = '.media-frame';

    function markFrameAsMissing(image) {
      var frame = image.closest(FRAME_SELECTOR);
      if (frame) frame.classList.add('is-missing');
    }

    document.addEventListener(
      'error',
      function (event) {
        if (event.target && event.target.tagName === 'IMG') markFrameAsMissing(event.target);
      },
      true
    );

    document.querySelectorAll(FRAME_SELECTOR + ' img').forEach(function (image) {
      if (image.complete && image.naturalWidth === 0) markFrameAsMissing(image);
    });
  }

  function initScrollReveal() {
    var revealElements = document.querySelectorAll('[data-reveal]');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(function (element) {
        element.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    revealElements.forEach(function (element) {
      var delay = element.getAttribute('data-reveal-delay');
      if (delay) element.style.setProperty('--reveal-delay', delay + 'ms');
      observer.observe(element);
    });
  }

  function initCurrentYear() {
    var currentYear = String(new Date().getFullYear());
    document.querySelectorAll('[data-current-year]').forEach(function (element) {
      element.textContent = currentYear;
    });
  }

  initHeaderScrollState();
  initMobileNavigation();
  initWhatsAppFloat();
  initImageFallbacks();
  initScrollReveal();
  initCurrentYear();
})();