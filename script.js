/* ============================================================
   SUNRISE CAFE & BAKERY — Demo Website Scripts
   Artisan Bakery & Brunch Cafe | Austin, TX
   ============================================================ */

// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

document.addEventListener("DOMContentLoaded", () => {
  // ==================== NAVBAR ====================
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  // Scroll behavior — add "scrolled" class past 50px
  const handleScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Mobile toggle — toggle nav-open on body and navbar
  navToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");

    navToggle.setAttribute("aria-expanded", String(isOpen));

    const spans = navToggle.querySelectorAll("span");
    if (isOpen) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  });

  // Close mobile menu helper
  const closeMobileMenu = (returnFocus = false) => {
    document.body.classList.remove("nav-open");
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    const spans = navToggle.querySelectorAll("span");
    spans[0].style.transform = "";
    spans[1].style.opacity = "";
    spans[2].style.transform = "";
    if (returnFocus) navToggle.focus();
  };

  // Close mobile menu on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMobileMenu());
  });

  // Escape key closes mobile menu and returns focus to toggle
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      closeMobileMenu(true);
    }
  });

  // ==================== SMOOTH SCROLL ====================
  // Offset for fixed navbar height
  const SCROLL_OFFSET = 80;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const top =
          targetEl.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // ==================== ACTIVE NAV LINK ON SCROLL ====================
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  const highlightNav = () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navAnchors.forEach((a) => {
      const isActive = a.getAttribute("href") === `#${current}`;
      a.classList.toggle("active", isActive);
      if (isActive) {
        a.setAttribute("aria-current", "true");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  };

  window.addEventListener("scroll", highlightNav, { passive: true });
  highlightNav();

  // ==================== SCROLL ANIMATIONS ====================
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -60px 0px",
    threshold: 0.1,
  };

  // Pre-compute stagger index per parent to avoid repeated DOM queries in observer
  const staggerMap = new Map();
  const parentCounters = new Map();
  animatedElements.forEach((el) => {
    const parent = el.parentElement;
    const count = parentCounters.get(parent) || 0;
    staggerMap.set(el, count);
    parentCounters.set(parent, count + 1);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = (staggerMap.get(entry.target) || 0) * 80;
        setTimeout(() => {
          entry.target.classList.add("is-visible");
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => observer.observe(el));

  // ==================== MENU CATEGORY FILTER ====================
  const filterBtns = document.querySelectorAll(".menu-tab");
  const menuItems = document.querySelectorAll(".menu-card");
  const menuGrid = document.getElementById("menuGrid");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active filter button and ARIA attributes
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const category = btn.dataset.category;
      const categoryLabel = btn.textContent.trim();

      // Announce filter change to screen readers
      if (menuGrid) {
        menuGrid.setAttribute("aria-busy", "true");
      }

      menuItems.forEach((item, i) => {
        const show = category === "all" || item.dataset.category === category;
        item.classList.toggle("hidden", !show);

        // Re-animate visible items with stagger
        if (show) {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          setTimeout(() => {
            item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, i * 50);
        }
      });

      // Announce update completion
      setTimeout(() => {
        if (menuGrid) {
          menuGrid.setAttribute("aria-busy", "false");
        }
      }, 300);
    });

    // Make tabs keyboard accessible
    btn.addEventListener("keydown", (e) => {
      const buttons = Array.from(filterBtns);
      const currentIndex = buttons.indexOf(e.target);
      let nextBtn = null;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextBtn = buttons[(currentIndex + 1) % buttons.length];
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        nextBtn = buttons[(currentIndex - 1 + buttons.length) % buttons.length];
      } else if (e.key === "Home") {
        e.preventDefault();
        nextBtn = buttons[0];
      } else if (e.key === "End") {
        e.preventDefault();
        nextBtn = buttons[buttons.length - 1];
      }

      if (nextBtn) {
        nextBtn.click();
        nextBtn.focus();
      }
    });
  });

  // ==================== NEWSLETTER FORM ====================
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitBtn = newsletterForm.querySelector("button");

    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        emailInput.setAttribute("aria-invalid", "true");
        emailInput.setAttribute("aria-describedby", "email-error");
        const error = document.createElement("div");
        error.id = "email-error";
        error.className = "sr-only";
        error.setAttribute("role", "alert");
        error.textContent = "Please enter your email address.";
        emailInput.parentElement.appendChild(error);
        return;
      }

      if (!emailRegex.test(email)) {
        emailInput.setAttribute("aria-invalid", "true");
        emailInput.setAttribute("aria-describedby", "email-error");
        const error = document.getElementById("email-error");
        if (error) {
          error.textContent = "Please enter a valid email address.";
        }
        return;
      }

      // Clear any previous errors
      emailInput.removeAttribute("aria-invalid");
      emailInput.removeAttribute("aria-describedby");
      const existingError = document.getElementById("email-error");
      if (existingError) existingError.remove();

      if (email) {
        // Formspree placeholder — swap the action URL to connect:
        // newsletterForm.action = 'https://formspree.io/f/YOUR_FORM_ID';
        // newsletterForm.submit();

        submitBtn.textContent = "Subscribed!";
        submitBtn.style.background =
          "linear-gradient(135deg, #6aab73, #3d8b4f)";
        submitBtn.setAttribute("aria-live", "polite");
        submitBtn.setAttribute("aria-atomic", "true");
        emailInput.value = "";
        emailInput.placeholder = "Thanks! Check your inbox.";

        setTimeout(() => {
          submitBtn.textContent = "Subscribe";
          submitBtn.style.background = "";
          emailInput.placeholder = "Your email address";
        }, 3000);
      }
    });

    // Remove error on focus
    emailInput.addEventListener("focus", () => {
      emailInput.removeAttribute("aria-invalid");
      emailInput.removeAttribute("aria-describedby");
      const error = document.getElementById("email-error");
      if (error) error.remove();
    });
  }

  // ==================== GALLERY LIGHTBOX PLACEHOLDER ====================
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    // Make items focusable
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");

    const handleGalleryClick = () => {
      const img = item.querySelector("img");
      const caption = item.querySelector(".gallery-caption");
      const src = img ? img.getAttribute("src") : null;
      const alt = img ? img.getAttribute("alt") : "";
      const text = caption ? caption.textContent : alt;

      // TODO: Implement full lightbox overlay, e.g.:
      // showLightbox(src, text);
    };

    item.addEventListener("click", handleGalleryClick);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleGalleryClick();
      }
    });
  });

  // ==================== HERO PARALLAX EFFECT ====================
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    let parallaxTicking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!parallaxTicking) {
          requestAnimationFrame(() => {
            if (window.scrollY < window.innerHeight) {
              const offset = window.scrollY * 0.3;
              heroContent.style.transform = `translateY(${offset}px)`;
              heroContent.style.opacity = String(
                1 - window.scrollY / (window.innerHeight * 0.8),
              );
            }
            parallaxTicking = false;
          });
          parallaxTicking = true;
        }
      },
      { passive: true },
    );
  }

  // ==================== COUNTER / BADGE ANIMATION ====================
  const counters = document.querySelectorAll(".stat-number, .badge strong");
  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = "fadeInUp 0.6s ease forwards";
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((el) => counterObserver.observe(el));
  }

  // ==================== MENU CARD HOVER TILT ====================
  document.querySelectorAll(".menu-item").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // ==================== TESTIMONIAL SLIDER ====================
  const track = document.getElementById("testimonialTrack");
  if (track) {
    const cards = track.querySelectorAll(".testimonial-card");
    const dotsContainer = document.getElementById("testimonialDots");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let currentSlide = 0;
    let slidesPerView = window.innerWidth >= 768 ? 2 : 1;
    let totalSlides = Math.ceil(cards.length / slidesPerView);

    // Create dots with ARIA attributes
    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = "";
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("button");
        dot.className = `dot ${i === currentSlide ? "active" : ""}`;
        dot.setAttribute("aria-label", `Go to review ${i + 1}`);
        dot.setAttribute("aria-selected", String(i === currentSlide));
        dot.setAttribute("role", "tab");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goToSlide(index) {
      currentSlide = index;
      const offset = -(currentSlide * (100 / slidesPerView)) * slidesPerView;
      track.style.transform = `translateX(${offset}%)`;

      if (dotsContainer) {
        dotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
          const isActive = i === currentSlide;
          dot.classList.toggle("active", isActive);
          dot.setAttribute("aria-selected", String(isActive));
        });
      }

      // Announce current slide to screen readers
      const slider = document.getElementById("testimonialSlider");
      if (slider) {
        const announcement = document.createElement("div");
        announcement.setAttribute("aria-live", "polite");
        announcement.className = "sr-only";
        announcement.textContent = `Review ${currentSlide + 1} of ${totalSlides}`;
        slider.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        goToSlide(currentSlide > 0 ? currentSlide - 1 : totalSlides - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
      });
    }

    // Keyboard navigation for slider
    document.addEventListener("keydown", (e) => {
      const slider = document.getElementById("testimonialSlider");
      if (slider && slider.contains(document.activeElement)) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          goToSlide(currentSlide > 0 ? currentSlide - 1 : totalSlides - 1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
        }
      }
    });

    // Auto-advance every 5s (unless user prefers reduced motion)
    let autoPlay = null;
    if (!prefersReducedMotion) {
      autoPlay = setInterval(() => {
        goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
      }, 5000);
    }

    // Pause on hover and focus
    const slider = document.getElementById("testimonialSlider");
    if (slider) {
      const pauseAutoPlay = () => {
        if (autoPlay) clearInterval(autoPlay);
      };
      const resumeAutoPlay = () => {
        if (!prefersReducedMotion && !autoPlay) {
          autoPlay = setInterval(() => {
            goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
          }, 5000);
        }
      };

      slider.addEventListener("mouseenter", pauseAutoPlay);
      slider.addEventListener("mouseleave", resumeAutoPlay);
      slider.addEventListener("focusin", pauseAutoPlay);
      slider.addEventListener("focusout", resumeAutoPlay);
    }

    // Handle resize
    window.addEventListener("resize", () => {
      const newPerView = window.innerWidth >= 768 ? 2 : 1;
      if (newPerView !== slidesPerView) {
        slidesPerView = newPerView;
        totalSlides = Math.ceil(cards.length / slidesPerView);
        currentSlide = 0;
        createDots();
        goToSlide(0);
      }
    });

    createDots();
  }
});
