// ============================================
// Hero Auto-Slider
// ============================================
(function () {
  const slides = document.querySelectorAll('.hero__slide');
  const dots = document.querySelectorAll('.hero__dot');
  let current = 0;
  let interval;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }

  function startAutoplay() {
    interval = setInterval(next, 4500);
  }

  function stopAutoplay() {
    clearInterval(interval);
  }

  // Dot click
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAutoplay();
      goTo(i);
      startAutoplay();
    });
  });

  // Pause on hover
  const heroEl = document.getElementById('hero');
  if (heroEl) {
    heroEl.addEventListener('mouseenter', stopAutoplay);
    heroEl.addEventListener('mouseleave', startAutoplay);
  }

  if (slides.length > 0) startAutoplay();
})();

// ============================================
// Sticky Bar on Scroll
// ============================================
const stickyBar = document.getElementById('sticky-bar');
const hero = document.getElementById('hero');

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });

if (hero) heroObserver.observe(hero);

// ============================================
// Scroll Reveal Animations
// ============================================
const revealEls = document.querySelectorAll(
  '.pain__grid, .solution__card, .plan-card, .gallery__item, .why__inner, .faq__item, .final-cta__content, .solution__header, .gallery__col'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// Staggered children animation for gallery cols
const galleryCols = document.querySelectorAll('.gallery__col');
galleryCols.forEach((col, colIndex) => {
  const items = col.querySelectorAll('.gallery__item');
  const colObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        items.forEach((item, i) => {
          setTimeout(() => {
            item.classList.add('visible');
          }, colIndex * 100 + i * 80);
        });
        colObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  colObserver.observe(col);
});

// Staggered plan cards
const planGrid = document.querySelector('.plans__grid');
if (planGrid) {
  const planObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.plan-card');
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 120);
        });
        planObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  planObserver.observe(planGrid);
}

// ============================================
// FAQ Accordion
// ============================================
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
  const btn = item.querySelector('.faq__question');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    faqItems.forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
    });

    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// Track WhatsApp CTA Clicks (Console log)
// ============================================
document.querySelectorAll('[id$="-btn"], .wa-float').forEach(btn => {
  btn.addEventListener('click', () => {
    console.log(`CTA clicked: ${btn.id || 'wa-float'}`);
  });
});
