const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const navLinks = qsa('.site-nav a');
const sections = qsa('main section[id]');
const navToggle = qs('.nav-toggle');
const navList = qs('#nav-links');
const progressBar = qs('.progress-bar span');
const backToTop = qs('#backToTop');

qsa('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = qs(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    navList?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const updateActiveSection = () => {
  const fromTop = window.scrollY + 120;
  let currentId = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= fromTop) currentId = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
  });
};

const updateProgressBar = () => {
  const scrollRoot = document.documentElement;
  const max = scrollRoot.scrollHeight - scrollRoot.clientHeight;
  const progress = max > 0 ? (scrollRoot.scrollTop / max) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
};

const updateBackToTop = () => {
  backToTop?.classList.toggle('is-visible', window.scrollY > 700);
};

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  },
  { threshold: 0.16 }
);

qsa('.reveal').forEach((node) => revealObserver.observe(node));

const numberObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const node = entry.target;
      const target = Number(node.dataset.count);
      const suffix = node.dataset.suffix || '';
      if (!Number.isFinite(target)) return;

      const duration = 1100;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Number.isInteger(target)
          ? Math.floor(target * eased)
          : (target * eased).toFixed(1);
        node.textContent = `${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      numberObserver.unobserve(node);
    });
  },
  { threshold: 0.5 }
);

qsa('[data-count]').forEach((node) => numberObserver.observe(node));

qsa('[data-tilt]').forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    if (window.innerWidth < 900) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = (0.5 - (y / rect.height)) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

window.addEventListener('scroll', updateActiveSection, { passive: true });
window.addEventListener('scroll', updateProgressBar, { passive: true });
window.addEventListener('scroll', updateBackToTop, { passive: true });
window.addEventListener('load', updateActiveSection);
window.addEventListener('load', updateProgressBar);
window.addEventListener('load', updateBackToTop);
