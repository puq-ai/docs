// Theme Toggle Implementation (Simplified)
(function() {
  function initThemeToggle() {
    var themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', function() {
      var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      var newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('jtd-theme', newTheme);

      // Update CSS file - map 'light' to 'default' CSS file
      var cssTheme = (newTheme === 'light') ? 'default' : newTheme;
      if (window.jtd && typeof jtd.setTheme === 'function') {
        jtd.setTheme(cssTheme);
      }

      themeToggle.setAttribute('aria-pressed', newTheme === 'dark' ? 'true' : 'false');
      themeToggle.setAttribute('aria-label', newTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  // System preference change listener
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('jtd-theme')) {
      var newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      // Map 'light' to 'default' CSS file
      var cssTheme = (newTheme === 'light') ? 'default' : newTheme;
      if (window.jtd && typeof jtd.setTheme === 'function') {
        jtd.setTheme(cssTheme);
      }
    }
  });

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  } else {
    initThemeToggle();
  }
})();

// Table of Contents - Active Heading Tracking
(function() {
  'use strict';

  function initToc() {
    var tocList = document.getElementById('toc-list');
    var tocSidebar = document.getElementById('toc-sidebar');
    if (!tocList || !tocSidebar) return;

    var allHeadings = document.querySelectorAll('main h1[id], main h2[id], main h3[id]');
    var headings = Array.prototype.slice.call(allHeadings, 1);

    if (headings.length < 2) {
      tocSidebar.style.display = 'none';
      return;
    }

    // Build TOC list
    headings.forEach(function(heading) {
      var li = document.createElement('li');
      li.className = 'toc-item';
      var link = document.createElement('a');
      link.href = '#' + heading.id;
      link.className = 'toc-link';
      link.textContent = heading.textContent.replace(/^#\s*/, '');
      if (heading.tagName === 'H1') link.classList.add('toc-link-h1');
      else if (heading.tagName === 'H3') link.classList.add('toc-link-h3');
      li.appendChild(link);
      tocList.appendChild(li);
    });

    var tocLinks = tocList.querySelectorAll('.toc-link');
    var tocNav = document.querySelector('.toc-nav');
    var currentActive = null;
    var ticking = false;
    var isClickScrolling = false;
    var clickScrollTimer = null;

    // Dynamic offset: read actual header height from DOM
    function getHeaderOffset() {
      var mainHeader = document.getElementById('main-header');
      return mainHeader ? mainHeader.offsetHeight + 16 : 76;
    }

    // Keep the active TOC link visible within the scrollable TOC nav
    function scrollTocToActive(activeLink) {
      if (!tocNav || !activeLink) return;
      var linkTop = activeLink.offsetTop - tocNav.offsetTop;
      var linkBottom = linkTop + activeLink.offsetHeight;
      var visibleTop = tocNav.scrollTop;
      var visibleBottom = visibleTop + tocNav.clientHeight;
      if (linkTop < visibleTop) {
        tocNav.scrollTop = linkTop - 8;
      } else if (linkBottom > visibleBottom) {
        tocNav.scrollTop = linkBottom - tocNav.clientHeight + 8;
      }
    }

    // Determine which heading is currently active based on scroll position
    function updateActiveHeading() {
      if (isClickScrolling) { ticking = false; return; }
      var headerOffset = getHeaderOffset();
      var scrollY = window.scrollY || window.pageYOffset;
      var windowHeight = window.innerHeight;
      var docHeight = document.documentElement.scrollHeight;
      var activeIndex = 0;

      if (scrollY + windowHeight >= docHeight - 10) {
        activeIndex = headings.length - 1;
      } else {
        for (var i = 0; i < headings.length; i++) {
          if (headings[i].getBoundingClientRect().top <= headerOffset) {
            activeIndex = i;
          }
        }
      }

      if (currentActive !== activeIndex) {
        tocLinks.forEach(function(link) { link.classList.remove('active'); });
        if (tocLinks[activeIndex]) {
          tocLinks[activeIndex].classList.add('active');
          scrollTocToActive(tocLinks[activeIndex]);
        }
        currentActive = activeIndex;
      }
      ticking = false;
    }

    // Scroll listener with rAF throttle
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(updateActiveHeading);
        ticking = true;
      }
    }, { passive: true });

    // Click handler: immediately activate clicked link, suppress scroll tracking
    tocList.addEventListener('click', function(e) {
      var link = e.target;
      while (link && link !== tocList) {
        if (link.classList && link.classList.contains('toc-link')) break;
        link = link.parentElement;
      }
      if (!link || link === tocList || link.classList.contains('toc-link-top')) return;

      tocLinks.forEach(function(l) { l.classList.remove('active'); });
      link.classList.add('active');
      for (var i = 0; i < tocLinks.length; i++) {
        if (tocLinks[i] === link) { currentActive = i; break; }
      }

      isClickScrolling = true;
      if (clickScrollTimer) clearTimeout(clickScrollTimer);
      clickScrollTimer = setTimeout(function() { isClickScrolling = false; }, 800);
      scrollTocToActive(link);
    });

    // Set initial active state
    updateActiveHeading();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToc);
  } else {
    initToc();
  }
})();

// Search Term Highlight on Destination Page
(function() {
  'use strict';

  function initSearchCapture() {
    var searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    document.addEventListener('click', function(e) {
      var link = e.target.closest('.search-result');
      if (link && searchInput.value.trim()) {
        sessionStorage.setItem('jtd-search-term', searchInput.value.trim());
      }
    });
  }

  function highlightSearchTerm() {
    var term = sessionStorage.getItem('jtd-search-term');
    if (!term) return;
    sessionStorage.removeItem('jtd-search-term');

    var mainContent = document.querySelector('.main-content') || document.querySelector('main');
    if (!mainContent) return;

    var words = term.split(/\s+/).filter(function(w) { return w.length > 1; });
    if (words.length === 0) return;

    var escapedWords = words.map(function(w) {
      return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    });
    var regex = new RegExp('(' + escapedWords.join('|') + ')', 'gi');

    var walker = document.createTreeWalker(mainContent, NodeFilter.SHOW_TEXT, null, false);
    var textNodes = [];
    while (walker.nextNode()) {
      if (regex.test(walker.currentNode.nodeValue)) {
        textNodes.push(walker.currentNode);
      }
      regex.lastIndex = 0;
    }

    var highlights = [];
    textNodes.forEach(function(node) {
      var parent = node.parentElement;
      if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') return;

      var frag = document.createDocumentFragment();
      var parts = node.nodeValue.split(regex);
      parts.forEach(function(part) {
        if (regex.test(part)) {
          var mark = document.createElement('span');
          mark.className = 'search-term-highlight';
          mark.textContent = part;
          frag.appendChild(mark);
          highlights.push(mark);
        } else {
          frag.appendChild(document.createTextNode(part));
        }
        regex.lastIndex = 0;
      });
      parent.replaceChild(frag, node);
    });

    if (highlights.length > 0) {
      highlights[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    setTimeout(function() {
      highlights.forEach(function(el) { el.classList.add('fade-out'); });
      setTimeout(function() {
        highlights.forEach(function(el) {
          if (el.parentNode) {
            el.parentNode.replaceChild(document.createTextNode(el.textContent), el);
          }
        });
      }, 600);
    }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initSearchCapture();
      highlightSearchTerm();
    });
  } else {
    initSearchCapture();
    highlightSearchTerm();
  }
})();
