/* ============================================================
   DOT GENERATION
============================================================ */
function buildDots(containerId, trackId) {
  var track     = document.getElementById(trackId);
  var container = document.getElementById(containerId);
  if (!track || !container) return;

  var trackWidth = track.offsetWidth;
  var gap        = 22;
  var count      = Math.floor((trackWidth - 108) / gap);

  for (var i = 0; i < count; i++) {
    var el = document.createElement('div');
    el.className = (i % 8 === 0) ? 'power-pill' : 'dot';
    container.appendChild(el);
  }
}

buildDots('pac-dots',    'pac-row');
buildDots('footer-dots', 'footer-track');

/* ============================================================
   PACMAN EATS DOTS
============================================================ */
function initEating(pacId, dotsContainerId) {
  var pacMan = document.getElementById(pacId);
  var dots   = document.querySelectorAll('#' + dotsContainerId + ' .dot, #' + dotsContainerId + ' .power-pill');
  if (!pacMan || dots.length === 0) return;

  setInterval(function () {
    var pacRect = pacMan.getBoundingClientRect();
    dots.forEach(function (dot) {
      var dotRect = dot.getBoundingClientRect();
      if (pacRect.right > dotRect.left + 4 && pacRect.left < dotRect.right) {
        dot.style.opacity = '0';
      } else if (pacRect.left > dotRect.right + 20) {
        dot.style.opacity = '1';
      }
    });
  }, 40);
}

initEating('pac-man', 'pac-dots');

/* ============================================================
   ACTIVE NAV ON SCROLL
============================================================ */
var sections = document.querySelectorAll('.section');
var navLinks  = document.querySelectorAll('.nav-link');

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      navLinks.forEach(function (link) { link.classList.remove('active'); });
      var active = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 });

sections.forEach(function (s) { observer.observe(s); });

/* ============================================================
   SMOOTH SCROLL (for browsers that need it)
============================================================ */
navLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    var target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.querySelectorAll('.press-start').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    var target = document.querySelector(btn.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================================
   SKILL PILL - random dot blink speed
============================================================ */
document.querySelectorAll('.skill-pill .pellet').forEach(function (pellet, i) {
  pellet.style.animationDelay = (i * 0.18) + 's';
  pellet.style.animation = 'pillBlink ' + (0.8 + (i % 4) * 0.3) + 's ease-in-out infinite';
  pellet.style.animationDelay = (i * 0.15) + 's';
});

/* ============================================================
   KONAMI CODE EASTER EGG
============================================================ */
var seq   = [];
var kode  = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

document.addEventListener('keydown', function (e) {
  seq.push(e.key);
  seq = seq.slice(-10);
  if (seq.join(',') === kode.join(',')) {
    var flash = document.createElement('div');
    flash.style.cssText = [
      'position:fixed', 'inset:0', 'pointer-events:none',
      'z-index:9999', 'animation:konamiFlash 1.2s ease forwards'
    ].join(';');
    document.body.appendChild(flash);

    var st = document.createElement('style');
    st.textContent = '@keyframes konamiFlash{0%,100%{background:transparent}20%,60%{background:rgba(255,215,0,0.15)}40%,80%{background:rgba(0,255,255,0.1)}}';
    document.head.appendChild(st);

    setTimeout(function () { flash.remove(); }, 1300);

    var msg = document.createElement('div');
    msg.style.cssText = [
      'position:fixed','top:50%','left:50%',
      'transform:translate(-50%,-50%)',
      'background:#000','border:4px solid #FFD700',
      'color:#FFD700','font-family:"Press Start 2P",cursive',
      'font-size:14px','padding:30px 40px','z-index:10000',
      'text-align:center','line-height:2.2'
    ].join(';');
    msg.innerHTML = 'EXTRA LIFE!<br><span style="font-size:10px;color:#fff">Secret code unlocked.</span>';
    document.body.appendChild(msg);

    setTimeout(function () { msg.remove(); }, 2500);
  }
});
