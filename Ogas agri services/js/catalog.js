(function () {
  'use strict';

  var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

  var ACTIVE_SECTION_ROOT_MARGIN = '-25% 0px -65% 0px';

  var catalog = window.OIS_CATALOG;
  var sectionRoot = document.querySelector('[data-catalog-root]');
  var navList = document.querySelector('[data-catalog-nav]');

  if (!catalog || !sectionRoot) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function createElement(tagName, className, textContent) {
    var element = document.createElement(tagName);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  }

  function createIcon(symbolId, className) {
    var svg = document.createElementNS(SVG_NAMESPACE, 'svg');
    var use = document.createElementNS(SVG_NAMESPACE, 'use');

    svg.setAttribute('class', className);
    svg.setAttribute('aria-hidden', 'true');
    use.setAttribute('href', '#' + symbolId);
    svg.appendChild(use);

    return svg;
  }

  function formatAmount(amount) {
    return catalog.currency + Number(amount).toLocaleString('en-NG');
  }

  function buildWhatsAppLink(messageTemplate, itemName) {
    var message = messageTemplate.replace('{name}', itemName);
    return 'https://wa.me/' + catalog.whatsappNumber + '?text=' + encodeURIComponent(message);
  }

  function createMedia(item, category) {
    var media = createElement('div', 'media-frame product-card__media');

    var image = document.createElement('img');
    image.loading = 'lazy';
    image.decoding = 'async';
    image.alt = '';
    image.src = item.image;

    media.appendChild(createIcon('icon-leaf', 'icon media-frame__placeholder'));
    media.appendChild(image);

    if (category.comingSoon) {
      media.appendChild(createElement('span', 'product-card__badge', 'Coming soon'));
    }

    return media;
  }

  function createPriceList(item, category) {
    if (category.comingSoon || !item.prices || !item.prices.length) {
      return createElement('p', 'product-card__soon', 'Pricing at launch');
    }

    var list = createElement('ul', 'product-card__prices');
    list.setAttribute('role', 'list');

    item.prices.forEach(function (price) {
      var row = createElement('li', 'product-card__price');
      row.appendChild(createElement('span', 'product-card__unit', price.unit));
      row.appendChild(createElement('span', 'product-card__amount', formatAmount(price.amount)));
      list.appendChild(row);
    });

    return list;
  }

  function createOrderLink(item, category) {
    var link = createElement('a', 'product-card__order');

    link.href = buildWhatsAppLink(category.action.message, item.name);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', category.action.label + ' ' + item.name + ' on WhatsApp');

    link.appendChild(createIcon('icon-whatsapp', 'icon icon--filled'));
    link.appendChild(createElement('span', '', category.action.label));

    return link;
  }

  function createProductCard(item, category) {
    var card = createElement('article', 'product-card');
    if (category.comingSoon) card.classList.add('product-card--upcoming');

    var body = createElement('div', 'product-card__body');
    body.appendChild(createElement('h3', 'product-card__name', item.name));
    if (item.note) body.appendChild(createElement('p', 'product-card__note', item.note));
    body.appendChild(createPriceList(item, category));

    card.appendChild(createMedia(item, category));
    card.appendChild(body);
    card.appendChild(createOrderLink(item, category));

    return card;
  }

  function createSection(category, index) {
    var toneClasses = index % 2 === 0 ? 'section--light section--sage' : 'section--light';
    var section = createElement('section', 'section catalog-section ' + toneClasses);
    var headingId = category.id + '-heading';

    section.id = category.id;
    section.setAttribute('aria-labelledby', headingId);

    var layout = createElement('div', 'container catalog-section__layout');

    var heading = createElement('header', 'catalog-section__heading');
    var title = createElement('h2', 'catalog-section__title', category.title);
    title.id = headingId;

    heading.appendChild(createElement('p', 'section-tag', category.group));
    heading.appendChild(title);
    heading.appendChild(createElement('p', 'catalog-section__text', category.description));

    var grid = createElement('ul', 'product-grid');
    grid.setAttribute('role', 'list');

    category.items.forEach(function (item) {
      var gridItem = createElement('li', 'product-grid__item');
      gridItem.appendChild(createProductCard(item, category));
      grid.appendChild(gridItem);
    });

    layout.appendChild(heading);
    layout.appendChild(grid);
    section.appendChild(layout);

    return section;
  }

  function renderCategoryNav() {
    if (!navList) return;

    catalog.categories.forEach(function (category) {
      var listItem = createElement('li');
      var link = createElement('a', 'catalog-nav__link', category.navLabel || category.title);

      link.href = '#' + category.id;
      listItem.appendChild(link);
      navList.appendChild(listItem);
    });
  }

  function initActiveCategoryNav(sections) {
    if (!navList || !('IntersectionObserver' in window)) return;

    var linksBySectionId = {};
    Array.prototype.forEach.call(navList.querySelectorAll('a'), function (link) {
      linksBySectionId[link.getAttribute('href').slice(1)] = link;
    });

    function keepLinkVisible(link) {
      var scrollTarget = link.offsetLeft - navList.clientWidth / 2 + link.offsetWidth / 2;
      navList.scrollTo({ left: scrollTarget, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }

    function setActiveSection(sectionId) {
      Object.keys(linksBySectionId).forEach(function (id) {
        if (id === sectionId) {
          linksBySectionId[id].setAttribute('aria-current', 'true');
          keepLinkVisible(linksBySectionId[id]);
        } else {
          linksBySectionId[id].removeAttribute('aria-current');
        }
      });
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: ACTIVE_SECTION_ROOT_MARGIN }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function scrollToHashTarget() {
    if (!window.location.hash) return;

    var target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (target) target.scrollIntoView();
  }

  var sections = catalog.categories.map(createSection);

  sections.forEach(function (section) {
    sectionRoot.appendChild(section);
  });

  renderCategoryNav();
  initActiveCategoryNav(sections);
  scrollToHashTarget();
})();