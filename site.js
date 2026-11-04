(function () {
  var dropdowns = Array.prototype.map.call(document.querySelectorAll('.nav-dropdown'), function (dropdown) {
    var trigger = dropdown.querySelector('.nav-trigger');

    function close() {
      dropdown.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    return { dropdown: dropdown, trigger: trigger, close: close };
  });

  dropdowns.forEach(function (entry) {
    entry.trigger.addEventListener('click', function () {
      var willOpen = !entry.dropdown.classList.contains('is-open');

      // only one dropdown can be open at a time
      dropdowns.forEach(function (other) {
        if (other !== entry) other.close();
      });

      entry.dropdown.classList.toggle('is-open', willOpen);
      entry.trigger.setAttribute('aria-expanded', String(willOpen));
    });

    // stop clicks inside the panel from reaching the document handler
    entry.dropdown.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    document.addEventListener('click', entry.close);

    entry.dropdown.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        entry.close();
        entry.trigger.focus();
      }
    });
  });

  // Language switch: slide the thumb first, then open the other language
  var langSwitch = document.querySelector('.lang-switch');
  if (langSwitch) {
    var currentLang = langSwitch.getAttribute('data-lang');
    var langLink = langSwitch.querySelector('a');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    langLink.addEventListener('click', function (e) {
      if (reduceMotion || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      langSwitch.setAttribute('data-lang', currentLang === 'en' ? 'de' : 'en');
      setTimeout(function () { window.location.href = langLink.href; }, 180);
    });

    // back button may restore this page with the thumb still on the other side
    window.addEventListener('pageshow', function () {
      langSwitch.setAttribute('data-lang', currentLang);
    });
  }

  var copyYear = document.getElementById('copy-year');
  if (copyYear) {
    copyYear.textContent = new Date().getFullYear();
  }
})();
