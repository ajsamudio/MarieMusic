/**
 * main.js
 * Handles: sticky nav shadow, dropdown accessibility,
 *          newsletter modal, and news ticker.
 */

/* ==============================================
   STICKY NAV — add shadow on scroll
   ============================================== */
(function initStickyNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
    } else {
      nav.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    }
  }, { passive: true });
}());

/* ==============================================
   DROPDOWN — keyboard accessibility (Enter/Space)
   ============================================== */
(function initDropdowns() {
  document.querySelectorAll('.has-dropdown > a').forEach(trigger => {
    trigger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const dropdown = trigger.nextElementSibling;
        if (!dropdown) return;
        const isOpen = dropdown.style.display === 'block';
        dropdown.style.display = isOpen ? '' : 'block';
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', e => {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.dropdown').forEach(d => {
        d.style.display = '';
      });
    }
  });
}());

/* ==============================================
   NEWSLETTER MODAL
   Show after 3 s delay (first visit only)
   ============================================== */
(function initNewsletterModal() {
  const modal      = document.getElementById('newsletterModal');
  const closeBtn   = document.getElementById('modalClose');
  const noThanks   = document.getElementById('modalNoThanks');
  const subscribeBtn = document.getElementById('modalSubscribe');
  const ticker     = document.getElementById('newsTicker');
  const tickerClose = document.getElementById('newsTickerClose');

  if (!modal) return;

  function openModal() {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (ticker) ticker.classList.remove('is-visible');
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    // Show the persistent news ticker after dismissal
    if (ticker) ticker.classList.add('is-visible');
  }

  // Show modal after delay (skip if already dismissed this session)
  if (!sessionStorage.getItem('newsletterDismissed')) {
    setTimeout(openModal, 3000);
  } else {
    // Already dismissed — just show the ticker
    if (ticker) ticker.classList.add('is-visible');
  }

  // Close via X button
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      sessionStorage.setItem('newsletterDismissed', '1');
      closeModal();
    });
  }

  // Close via "No thanks"
  if (noThanks) {
    noThanks.addEventListener('click', () => {
      sessionStorage.setItem('newsletterDismissed', '1');
      closeModal();
    });
  }

  // Subscribe — scrolls to contact section
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
      sessionStorage.setItem('newsletterDismissed', '1');
      closeModal();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Close when clicking the overlay backdrop
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      sessionStorage.setItem('newsletterDismissed', '1');
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      sessionStorage.setItem('newsletterDismissed', '1');
      closeModal();
    }
  });

  // Ticker: clicking the ticker pill re-opens the modal
  if (ticker) {
    ticker.addEventListener('click', e => {
      if (e.target !== tickerClose) {
        sessionStorage.removeItem('newsletterDismissed');
        openModal();
      }
    });
  }

  // Ticker X — hides the ticker entirely
  if (tickerClose) {
    tickerClose.addEventListener('click', e => {
      e.stopPropagation();
      ticker.classList.remove('is-visible');
    });
  }
}());

/* ==============================================
   ACTIVE NAV LINK — highlight current section
   ============================================== */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('is-active'));
        const active = document.querySelector(`.nav-list a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('is-active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}());
