// Homepage hero: 3D carousel of app screenshots
(function () {
  var scene = document.getElementById('carousel');
  if (!scene) return;

  var stage = scene.querySelector('.carousel-stage');
  var ring = scene.querySelector('.carousel-ring');
  var label = scene.querySelector('.carousel-label');
  var slots = Array.prototype.slice.call(ring.children);
  var dots = Array.prototype.slice.call(scene.querySelectorAll('.carousel-dot'));

  var N = slots.length;
  var STEP = 360 / N;
  var AUTO_SPEED = -0.012;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var angle = 0;
  var vel = reduceMotion ? 0 : AUTO_SPEED;
  var target = null;
  var hover = false;
  var drag = null;
  var idleSince = 0;
  var front = 0;
  var last = performance.now();

  function setFront(i) {
    dots[front].classList.remove('is-active');
    dots[front].removeAttribute('aria-current');
    front = i;
    dots[front].classList.add('is-active');
    dots[front].setAttribute('aria-current', 'true');
    label.textContent = slots[front].dataset.app;
  }

  function step(dt) {
    if (!drag) {
      if (target !== null) {
        var d = target - angle;
        angle += d * Math.min(1, dt * 0.008);
        vel = 0;
        if (Math.abs(d) < 0.05) {
          angle = target;
          target = null;
          idleSince = performance.now();
        }
      } else {
        var resting = hover || reduceMotion || (idleSince && performance.now() - idleSince < 2500);
        var auto = resting ? 0 : AUTO_SPEED;
        vel += (auto - vel) * Math.min(1, dt * 0.0025);
        angle += vel * dt;
        if (resting && Math.abs(vel) < 0.004) {
          var snap = Math.round(angle / STEP) * STEP;
          angle += (snap - angle) * Math.min(1, dt * 0.006);
        }
      }
    }

    stage.style.transform = 'scale(' + Math.min(1, scene.clientWidth / 600).toFixed(3) + ')';
    ring.style.transform = 'rotateX(-8deg) rotateY(' + angle.toFixed(2) + 'deg)';

    // Phones orbit the ring but keep facing the viewer; the far ones dim
    slots.forEach(function (slot, i) {
      var world = i * STEP + angle;
      var c = Math.cos(world * Math.PI / 180);
      var face = slot.firstElementChild;
      face.style.transform = 'rotateY(' + (-world).toFixed(2) + 'deg) rotateX(8deg)';
      face.style.filter = 'brightness(' + (0.62 + 0.38 * (c + 1) / 2).toFixed(3) + ')';
    });

    var nextFront = ((Math.round(-angle / STEP) % N) + N) % N;
    if (nextFront !== front) setFront(nextFront);
  }

  function tick(now) {
    var dt = Math.min(48, now - last);
    last = now;
    step(dt);
    requestAnimationFrame(tick);
  }

  function endDrag() {
    drag = null;
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    scene.style.cursor = 'grab';
  }

  function onMove(e) {
    if (!drag) return;
    var dx = e.clientX - drag.x;
    if (Math.abs(dx) > 5) drag.moved = true;
    angle = drag.angle + dx * 0.35;
    var now = performance.now();
    var dt = Math.max(1, now - drag.lastTime);
    vel = vel * 0.6 + ((e.clientX - drag.lastX) * 0.35 / dt) * 0.4;
    drag.lastX = e.clientX;
    drag.lastTime = now;
  }

  function onUp() {
    var moved = drag && drag.moved;
    endDrag();
    vel = Math.max(-1.2, Math.min(1.2, vel));
    idleSince = performance.now();
    if (moved) {
      // a drag that ends on a dot must not also select it
      var kill = function (ev) { ev.stopPropagation(); ev.preventDefault(); };
      scene.addEventListener('click', kill, { capture: true, once: true });
      setTimeout(function () { scene.removeEventListener('click', kill, { capture: true }); }, 50);
    }
  }

  scene.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;
    target = null;
    drag = { x: e.clientX, angle: angle, lastX: e.clientX, lastTime: performance.now(), moved: false };
    vel = 0;
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    scene.style.cursor = 'grabbing';
  });

  scene.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') hover = true; });
  scene.addEventListener('pointerleave', function () { hover = false; });

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      var base = -i * STEP;
      target = base + 360 * Math.round((angle - base) / 360);
    });
  });

  requestAnimationFrame(tick);
})();
