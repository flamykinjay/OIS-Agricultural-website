/**
 * Ogas Integrated Services (OIS v1)
 * js/index.js — behaviour that only the landing page (index.html) needs.
 *
 *  - About section: accessible pill tabs (About Us / Vision / Mission).
 *  - Stat cards: numbers count up the first time they scroll into view.
 *
 * Classic script in an IIFE so it works when opened via file://.
 */
(function () {
  'use strict';

  /** How long the stat count-up animation runs, in milliseconds. */
  var COUNTER_DURATION_MS = 1800;

  /* ------------------------------------------------------------------------
     About tabs
     Follows the WAI-ARIA tabs pattern: arrow keys move between tabs,
     Home/End jump to the first/last tab, and only the active tab is in the
     Tab order (roving tabindex).
     ------------------------------------------------------------------------ */
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
            targetIndex = index === lastIndex ? 0 : index + 1; // Wrap to the first tab.
            break;
          case 'ArrowLeft':
            targetIndex = index === 0 ? lastIndex : index - 1; // Wrap to the last tab.
            break;
          case 'Home':
            targetIndex = 0;
            break;
          case 'End':
            targetIndex = lastIndex;
            break;
          default:
            return; // Ignore every other key so normal behaviour is untouched.
        }

        event.preventDefault();
        activateTab(tabs[targetIndex], true);
      });
    });
  }

  /* ------------------------------------------------------------------------
     Stat counters
     The final number is written in the HTML (so it is correct without JS);
     the script resets it to 0 and animates up to data-count-to.
     ------------------------------------------------------------------------ */

  /** Ease-out cubic: starts fast and settles gently on the final number. */
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

    // Leave the final numbers in place when animation is unwanted or unsupported.
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target); // Count up once only.
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