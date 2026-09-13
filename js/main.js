/**
 * ============================================================================
 * MAIN APPLICATION LOGIC: TYPEWRITER, THEMES, NAVIGATION, TABS & ANIMATIONS
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mouse Spotlight Tracking
  const spotlight = document.querySelector('.mouse-spotlight');
  if (spotlight) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateSpotlight() {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      spotlight.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(updateSpotlight);
    }
    updateSpotlight();
  }

  // 2. Typewriter Effect in Hero
  const typewriterTextEl = document.getElementById('typewriter-text');
  if (typewriterTextEl) {
    const phrases = [
      'Full-Stack Software Engineer',
      'Distributed Systems Architect',
      'High-Performance UI/UX Craftsman',
      'AI & Cloud Computing Enthusiast'
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 75;

    function type() {
      const currentPhrase = phrases[phraseIdx];
      
      if (isDeleting) {
        typewriterTextEl.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 35;
      } else {
        typewriterTextEl.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        typeSpeed = 1800; // Pause at end of phrase
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typeSpeed = 400; // Pause before new word
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // 3. Navbar Scrolled State
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 4. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 5. ScrollSpy for Active Nav Links
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    threshold: 0.25,
    rootMargin: '-70px 0px -40% 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  // 6. Theme Accent Switcher
  const themeDots = document.querySelectorAll('.theme-dot');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'violet';

  function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('portfolio-theme', themeName);
    themeDots.forEach(dot => {
      if (dot.getAttribute('data-color') === themeName) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  setTheme(savedTheme);

  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const color = dot.getAttribute('data-color');
      setTheme(color);
    });
  });

  // 7. Skills Tab Switcher & Progress Bar Animation
  const skillTabs = document.querySelectorAll('.tab-btn');
  const skillPanels = document.querySelectorAll('.skills-panel');

  function animateSkillBars(panel) {
    const fills = panel.querySelectorAll('.skill-bar-fill');
    fills.forEach(fill => {
      const level = fill.getAttribute('data-level') || '85%';
      fill.style.width = '0%';
      requestAnimationFrame(() => {
        setTimeout(() => {
          fill.style.width = level;
        }, 100);
      });
    });
  }

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetCategory = tab.getAttribute('data-tab');
      skillPanels.forEach(panel => {
        if (panel.id === `skills-${targetCategory}`) {
          panel.classList.add('active');
          animateSkillBars(panel);
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // Initialize first active panel bars
  const activePanel = document.querySelector('.skills-panel.active');
  if (activePanel) animateSkillBars(activePanel);

  // 8. Scroll Reveal Observer for Elements
  const reveals = document.querySelectorAll('.reveal-fade');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObserver.observe(el));

  // 9. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
