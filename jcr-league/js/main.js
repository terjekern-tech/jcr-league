// ===== STAT COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.home-stat-number').forEach(function(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1500;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  });
}

// ===== INTERSECTION OBSERVER =====
document.addEventListener('DOMContentLoaded', function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(function(el) {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });

  // Stats counter observer
  var statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  var statsSection = document.querySelector('.home-stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Navbar background on scroll
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(14, 12, 10, 0.98)';
      } else {
        navbar.style.background = 'rgba(14, 12, 10, 0.92)';
      }
    });
  }
});
