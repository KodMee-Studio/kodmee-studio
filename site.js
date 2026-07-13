(function () {
  document.querySelectorAll('.nav-dropdown').forEach(function (dropdown) {
    var trigger = dropdown.querySelector('.nav-trigger');

    trigger.addEventListener('click', function () {
      dropdown.classList.toggle('is-open');
    });

    // stop clicks inside the panel from reaching the document handler
    dropdown.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    document.addEventListener('click', function () {
      dropdown.classList.remove('is-open');
    });
  });
})();
