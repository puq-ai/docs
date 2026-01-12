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

      if (window.jtd && typeof jtd.setTheme === 'function') {
        jtd.setTheme(newTheme);
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
      if (window.jtd && typeof jtd.setTheme === 'function') {
        jtd.setTheme(newTheme);
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

// Table of Contents with Intersection Observer
(function() {
  'use strict';

  function initToc() {
    var tocList = document.getElementById('toc-list');
    var tocSidebar = document.getElementById('toc-sidebar');

    if (!tocList || !tocSidebar) return;

    var allHeadings = document.querySelectorAll('main h1[id], main h2[id], main h3[id]');
    var headings = Array.prototype.slice.call(allHeadings, 1); // Skip page title

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

      if (heading.tagName === 'H1') {
        link.classList.add('toc-link-h1');
      } else if (heading.tagName === 'H3') {
        link.classList.add('toc-link-h3');
      }

      li.appendChild(link);
      tocList.appendChild(li);
    });

    // Intersection Observer for scroll tracking
    var tocLinks = tocList.querySelectorAll('.toc-link');
    var currentActive = null;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          var index = headings.findIndex(function(h) { return h.id === id; });

          if (index !== -1 && currentActive !== index) {
            tocLinks.forEach(function(link) { link.classList.remove('active'); });
            tocLinks[index].classList.add('active');
            currentActive = index;
          }
        }
      });
    }, {
      rootMargin: '-80px 0px -70% 0px',
      threshold: 0
    });

    headings.forEach(function(heading) {
      observer.observe(heading);
    });

    // Set initial active state
    if (tocLinks.length > 0) {
      tocLinks[0].classList.add('active');
      currentActive = 0;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToc);
  } else {
    initToc();
  }
})();
