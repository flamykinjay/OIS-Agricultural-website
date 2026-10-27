(function () {
  'use strict';

  var COUNTER_DURATION_MS = 1800;

  function initAboutTabs() {
    var tabList = document.querySelector('[data-tabs]');
    if (!tabList) return;

    var tabs = Array.prototype.slice.call(tabList.querySelectorAll('[role="tab"]'));

    function activateTab(tabToActivate, shouldMoveFocus) {
      tabs.forEach(function (tab) {
        var isActive = tab === tabToActivate;
        var panel = document.getElementById(tab.getAttribute('aria-controls'));

        tab.setAttribute('aria-selected', String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
        if (panel) panel.hidden = !isActive;
      });

      if (shouldMoveFocus) tabToActivate.focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        activateTab(tab, false);
      });

      tab.addEventListener('keydown', function (event) {
        var lastIndex = tabs.length - 1;
        var targetIndex;

        switch (event.key) {
          case 'ArrowRight':
            targetIndex = index === lastIndex ? 0 : index + 1; 
            break;
          case 'ArrowLeft':
            targetIndex = index === 0 ? lastIndex : index - 1; 
            break;
          case 'Home':
            targetIndex = 0;
            break;
          case 'End':
            targetIndex = lastIndex;
            break;
          default:
            return; 
        }

        event.preventDefault();
        activateTab(tabs[targetIndex], true);
      });
    });
  }

  function easeOutCubic(progress) {
    return 1 - Math.pow(1 - progress, 3);
  }

  function animateCounter(element) {
    var targetValue = parseInt(element.getAttribute('data-count-to'), 10);
    if (isNaN(targetValue)) return;

    var startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;

      var progress = Math.min((timestamp - startTime) / COUNTER_DURATION_MS, 1);
      element.textContent = String(Math.round(targetValue * easeOutCubic(progress)));

      if (progress < 1) window.requestAnimationFrame(step);
    }

    element.textContent = '0';
    window.requestAnimationFrame(step);
  }

  function initStatCounters() {
    var counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  initAboutTabs();
  initStatCounters();
}());