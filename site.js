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

  var copyYear = document.getElementById('copy-year');
  if (copyYear) {
    copyYear.textContent = new Date().getFullYear();
  }
})();
