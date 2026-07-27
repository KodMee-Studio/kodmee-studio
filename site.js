(function () {
  document.querySelectorAll('.nav-dropdown').forEach(function (dropdown) {
    var trigger = dropdown.querySelector('.nav-trigger');

    function close() {
      dropdown.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', function () {
      var willOpen = !dropdown.classList.contains('is-open');
      dropdown.classList.toggle('is-open', willOpen);
      trigger.setAttribute('aria-expanded', String(willOpen));
    });

    // stop clicks inside the panel from reaching the document handler
    dropdown.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    document.addEventListener('click', close);

    dropdown.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        close();
        trigger.focus();
      }
    });
  });

  var copyYear = document.getElementById('copy-year');
  if (copyYear) {
    copyYear.textContent = new Date().getFullYear();
  }
})();
