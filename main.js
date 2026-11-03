/**
 * Britney Jae Lumod - Personal Digital Portfolio
 * Core JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const contactForm = document.getElementById('contactForm');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastContainer = document.getElementById('toastContainer');

  // Modals
  const projectModal = document.getElementById('projectModal');
  const projectModalContent = document.getElementById('projectModalContent');
  const graphicModal = document.getElementById('graphicModal');
  const graphicModalContent = document.getElementById('graphicModalContent');
  const cvModal = document.getElementById('cvModal');

  // Filter Tabs
  const projectTabs = document.querySelectorAll('[data-project-filter]');
  const projectCards = document.querySelectorAll('.project-card');
  const graphicTabs = document.querySelectorAll('[data-graphic-filter]');
  const graphicCards = document.querySelectorAll('.gallery-item');

  // --- 1. Sticky Navbar & Scroll Effects ---
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Navbar compact state
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // ScrollSpy active link update
    const sections = document.querySelectorAll('section[id]');
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
      mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- 2. Mobile Menu Navigation ---
  if (mobileToggle && mobileDrawer) {
    const toggleMobileMenu = () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        mobileDrawer.classList.add('open');
        mobileToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };

    mobileToggle.addEventListener('click', toggleMobileMenu);

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- 3. Smooth Back To Top ---
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 4. Animated Skill Bars on Viewport Enter ---
  const animateSkillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-level') || '80%';
          bar.style.width = targetWidth;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    animateSkillsObserver.observe(skillsSection);
  }

  // --- 5. Projects Filter Tabs ---
  projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      projectTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-project-filter');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 6. Graphic Design Filter Tabs ---
  graphicTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      graphicTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-graphic-filter');
      graphicCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 7. Toast Notification Utility ---
  window.showToast = (title, message, icon = '✓') => {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-body">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;
    toastContainer.appendChild(toast);

    // Trigger enter animation
    setTimeout(() => toast.classList.add('show'), 20);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  };

  // --- 8. Copy Email to Clipboard ---
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'jaealumod@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email Copied!', 'jaealumod@gmail.com has been copied to your clipboard.', '📋');
      }).catch(() => {
        showToast('Direct Email', 'You can reach Britney at jaealumod@gmail.com', '✉️');
      });
    });
  }

  // --- 9. Project Modal Data & Handlers ---
  const projectDetails = {
    edutrack: {
      title: "EduTrack: Academic Progress & Attendance Management System",
      badge: "Full-Stack Web Application • Production Prototype",
      image: "assets/images/project-edutrack.svg",
      overview: "EduTrack is an integrated web application designed to resolve fragmented academic tracking among educational departments, instructors, and learners. It centralizes academic progress computation, attendance rate monitoring, and milestone notifications into an intuitive, accessible dashboard.",
      features: [
        "Interactive real-time progress forecasting calculator based on course weighting.",
        "Attendance percentage monitor with automated color-coded alerts (<80%).",
        "Faculty review portal with CSV export for lecture attendance records.",
        "Clean, responsive layout optimized for mobile smartphones and desktop lab monitors."
      ],
      tech: ["HTML5", "CSS3 Grid/Flexbox", "JavaScript (ES6+)", "Python", "SQLite"],
      repoLink: "https://github.com/britneylumod/edutrack-portal"
    },
    luminacare: {
      title: "LuminaCare: Clinical Consultation & Booking Management",
      badge: "Healthcare Web System • HCI & Database Project",
      image: "assets/images/project-luminacare.svg",
      overview: "LuminaCare modernizes community clinic operations by offering a barrier-free appointment scheduling interface for patients alongside a patient records overview for attending physicians.",
      features: [
        "Doctor specialty matching engine with real-time consultation calendar.",
        "Patient intake verification form with client-side sanitization.",
        "Automated booking confirmation slip with printable reference badge.",
        "Dark/Light warm visual aesthetic tested for high readability and accessibility standards."
      ],
      tech: ["HTML5", "CSS3 Custom Properties", "Vanilla JavaScript", "Python / REST API"],
      repoLink: "https://github.com/britneylumod/luminacare-system"
    },
    ecoharvest: {
      title: "EcoHarvest: Sustainable Agro-Marketplace Platform",
      badge: "E-Commerce & Agricultural Web Portal",
      image: "assets/images/project-ecoharvest.svg",
      overview: "An e-commerce initiative engineered to empower regional sustainable farmers and artisans. The platform connects producers directly with conscious community buyers, eliminating high intermediary margins.",
      features: [
        "Dynamic category filtering (Single-origin coffee, raw honey, heirloom rice).",
        "Persistent client-side shopping cart with real-time total updates.",
        "Direct farmer story profiles fostering transparency and social impact.",
        "Fast-loading assets and optimized mobile commerce user journeys."
      ],
      tech: ["HTML5 Semantic", "CSS3 Transitions", "JavaScript ES6", "LocalStorage"],
      repoLink: "https://github.com/britneylumod/ecoharvest-marketplace"
    },
    devquest: {
      title: "DevQuest: Gamified IT Certification & Quiz Engine",
      badge: "Educational Interactive Application",
      image: "assets/images/project-devquest.svg",
      overview: "DevQuest is a gamified study companion created to assist software developers and IT professionals in preparing for industry certification exams and technical coding interviews. Features timed quizzes, immediate feedback, and concept flashcards.",
      features: [
        "Asynchronous question engine loading randomized categories (Web Dev, Python, SQL, HCI).",
        "Time-pressured challenge mode with visual countdown timer rings.",
        "Detailed solution breakdowns highlighting why wrong answers were invalid.",
        "Local performance history graphs tracking improvement across study sessions."
      ],
      tech: ["JavaScript ES6+", "HTML5 Canvas/SVG", "CSS3 Keyframe Animations", "JSON"],
      repoLink: "https://github.com/britneylumod/devquest-quiz-engine"
    }
  };

  window.openProjectModal = (projectId) => {
    const data = projectDetails[projectId];
    if (!data || !projectModal || !projectModalContent) return;

    projectModalContent.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span class="timeline-badge">${data.badge}</span>
        <h2 style="font-size: 2.2rem; margin-top: 10px; margin-bottom: 12px;">${data.title}</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
          ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
      <div style="border-radius: 12px; overflow: hidden; margin-bottom: 24px; border: 1px solid var(--border-color);">
        <img src="${data.image}" alt="${data.title}" style="width: 100%; height: auto;">
      </div>
      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 1.2rem; margin-bottom: 10px; color: var(--accent-warm);">Project Overview</h4>
        <p style="font-size: 1.02rem; line-height: 1.7; color: var(--text-secondary);">${data.overview}</p>
      </div>
      <div style="margin-bottom: 30px;">
        <h4 style="font-size: 1.2rem; margin-bottom: 12px; color: var(--accent-warm);">Key Technical Features</h4>
        <ul style="padding-left: 20px; color: var(--text-secondary); line-height: 1.8;">
          ${data.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 14px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
        <a href="#contact" onclick="closeAllModals()" class="btn btn-primary">Inquire About This Project</a>
        <button onclick="showToast('Academic Repository', 'This academic project source code is available upon request for review.', 'ℹ️')" class="btn btn-secondary">Request Code Access</button>
      </div>
    `;

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // --- 10. Graphic Lightbox Modal Data & Handlers ---
  const graphicDetails = {
    aurabotanicals: {
      title: "Aura Botanicals – Organic Brand Identity & Packaging Suite",
      category: "Brand Identity & Packaging",
      tools: "Adobe Illustrator • Photoshop • Minimalist Typography",
      image: "assets/images/graphic-aura-botanicals.svg",
      description: "A comprehensive organic visual identity designed for a clean-beauty skincare line. The project features custom serif logotypes, warm earth-tone palette curation, tactile packaging label mockups, and unboxing collateral."
    },
    techpulse: {
      title: "TechPulse 2026 – Philippine IT Symposium Editorial Poster",
      category: "Poster & Editorial Design",
      tools: "Adobe Photoshop • Illustrator • Modern Typography",
      image: "assets/images/graphic-techpulse.svg",
      description: "Official visual branding and promotional key visual poster for an annual collegiate technology symposium focusing on ethical artificial intelligence, human-centered UI/UX, and cloud architecture."
    },
    cafesolstice: {
      title: "Café Solstice – Specialty Roastery & Bakery Menu Identity",
      category: "Brand Identity & Collateral",
      tools: "Adobe Illustrator • InDesign • Brand Guidelines",
      image: "assets/images/graphic-cafe-solstice.svg",
      description: "An artisan coffee branding experience marrying sun-warmed linen hues with minimal line illustrations. Included printed kraft-paper menu systems, branded cup sleeves, and retail takeaway bags."
    },
    harmonyfest: {
      title: "Harmony Acoustic Festival – Social Media Campaign Kit",
      category: "Social Media & Advertising",
      tools: "Adobe Photoshop • Canva Pro • Digital Campaign Kit",
      image: "assets/images/graphic-harmony-fest.svg",
      description: "A multi-platform digital campaign grid engineered for high social engagement. Produced cohesive carousel announcements, performer story spotlights, and ticket launch teasers for a local charity acoustic concert."
    },
    typography: {
      title: "Serenity & Structure – Editorial Typography Investigation",
      category: "Publication & Typography",
      tools: "Adobe InDesign • Editorial Layout Grid",
      image: "assets/images/graphic-minimalist-type.svg",
      description: "An editorial exploration on the role of negative space, typographic scale hierarchy, and serif elegance in modern information layouts."
    },
    kinfolk: {
      title: "Kinfolk Living – Modern Spaces Lookbook Catalog",
      category: "Editorial Design & Lookbook",
      tools: "Adobe InDesign • Editorial Photography Direction",
      image: "assets/images/graphic-kinfolk-living.svg",
      description: "A 24-page publication layout featuring warm neutral tones, generous margins, and architectural balance celebrating timeless lifestyle aesthetics."
    }
  };

  window.openGraphicModal = (id) => {
    const data = graphicDetails[id];
    if (!data || !graphicModal || !graphicModalContent) return;

    graphicModalContent.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span class="timeline-badge">${data.category}</span>
        <h2 style="font-size: 2rem; margin-top: 8px; margin-bottom: 8px;">${data.title}</h2>
        <p style="font-size: 0.92rem; color: var(--accent-warm); font-weight: 600;">Tools: ${data.tools}</p>
      </div>
      <div style="border-radius: 12px; overflow: hidden; margin-bottom: 24px; border: 1px solid var(--border-color); background: var(--bg-subtle);">
        <img src="${data.image}" alt="${data.title}" style="width: 100%; height: auto;">
      </div>
      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 1.15rem; margin-bottom: 8px; color: var(--text-primary);">Creative Rationale</h4>
        <p style="font-size: 1.02rem; line-height: 1.7; color: var(--text-secondary);">${data.description}</p>
      </div>
      <div style="display: flex; gap: 12px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
        <a href="#contact" onclick="closeAllModals()" class="btn btn-primary btn-sm">Commission Similar Work</a>
        <button onclick="closeAllModals()" class="btn btn-secondary btn-sm">Close Preview</button>
      </div>
    `;

    graphicModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // --- 11. CV Download Modal Handler ---
  window.openCVModal = () => {
    if (!cvModal) return;
    cvModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeAllModals = () => {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => modal.classList.remove('open'));
    document.body.style.overflow = '';
  };

  // Close modal when clicking on backdrop or pressing ESC
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAllModals();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // --- 12. Contact Form Submission Handler ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('senderSubject').value;
      const message = document.getElementById('senderMessage').value.trim();

      // Basic client-side validation
      if (!name || !email || !message) {
        showToast('Required Fields', 'Please fill in your name, email, and message.', '⚠️');
        return;
      }

      // Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Invalid Email', 'Please provide a valid email address.', '⚠️');
        return;
      }

      // Success feedback
      showToast(
        'Message Sent!',
        `Thank you ${name}! Britney has received your inquiry regarding "${subject}" and will respond within 24 hours.`,
        '✨'
      );

      // Reset form
      contactForm.reset();
    });
  }

  // Initial trigger for scroll state on reload
  handleScroll();
});
