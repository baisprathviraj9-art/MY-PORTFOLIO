// Interactive AI/ML Portfolio Controller

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Neural Network Background Canvas
  initNeuralCanvas();

  // 2. Sharing Knowledge & Tools Data & Interactive Search/Tabs
  initKnowledgeHub();

  // 3. Professional Journey Timeline Controller
  initTimeline();

  // 4. Contact Form Controller
  initContactForm();

  // 5. Mobile Navigation Menu Toggle
  initMobileNav();

  // 6. Scroll Reveal Animations
  initScrollReveal();

  // 7. Active nav link on scroll
  initActiveNav();

  // 8. Header scroll shadow
  initHeaderScroll();

  // 9. Back to Top button
  initBackToTop();
});

/* ========================================================================= */
/* 1. Neural Network Canvas Background                                       */
/* ========================================================================= */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const connectionDistance = 120;
  const particleCount = Math.min(80, Math.floor((width * height) / 18000)); // Responsive density

  const mouse = {
    x: null,
    y: null,
    radius: 150
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1;
      // Assign cyan, blue, or purple theme colors
      const r = Math.random();
      if (r < 0.4) {
        this.color = 'rgba(0, 242, 254, '; // Cyan
      } else if (r < 0.8) {
        this.color = 'rgba(79, 172, 254, '; // Blue
      } else {
        this.color = 'rgba(127, 0, 255, '; // Purple
      }
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off walls
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse interactive push/pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          // Softly push away from mouse
          this.x -= (dx / distance) * force * 0.8;
          this.y -= (dy / distance) * force * 0.8;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '0.6)';
      ctx.fill();
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update & Draw Particles
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    // Draw connecting neural lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const alpha = (1 - distance / connectionDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          // Connect using cyan-to-purple glowing style line
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}

/* ========================================================================= */
/* 2. Sharing Knowledge & Tools Hub                                          */
/* ========================================================================= */
function initKnowledgeHub() {
  const tabs = document.querySelectorAll('.tab-btn');
  const searchInput = document.getElementById('search-input');
  const cardsContainer = document.getElementById('cards-container');

  if (!cardsContainer) return;

  // DB of articles and resources — all URLs are real and open in new tab
  const knowledgeDB = {
    articles: [
      {
        title: 'Fine-Tuning LLMs with LoRA & PEFT',
        category: 'NLP & Deep Learning',
        description: 'A deep-dive tutorial on parameter-efficient fine-tuning for Llama models using Hugging Face PEFT on consumer-grade GPUs.',
        date: 'June 2025',
        readTime: '8 min read',
        linkText: 'Read Article',
        url: 'https://huggingface.co/blog/peft'
      },
      {
        title: 'Optimizing Model Inference with TensorRT',
        category: 'MLOps',
        description: 'Learn how to compile PyTorch models using TensorRT to reduce latency by up to 5x on Nvidia edge platforms.',
        date: 'May 2025',
        readTime: '6 min read',
        linkText: 'Read Article',
        url: 'https://developer.nvidia.com/blog/accelerating-inference-up-to-6x-faster-in-pytorch-with-torch-tensorrt/'
      },
      {
        title: 'Understanding Vision Transformers (ViTs)',
        category: 'Computer Vision',
        description: 'An intuitive breakdown of self-attention mechanisms in visual data, compared to traditional CNN architectures.',
        date: 'April 2025',
        readTime: '10 min read',
        linkText: 'Read Article',
        url: 'https://arxiv.org/abs/2010.11929'
      }
    ],
    resources: [
      {
        title: 'PyTorch Custom Dataset & DataLoader Tutorial',
        category: 'Code Template',
        description: 'Official PyTorch tutorial on building custom Dataset classes with transforms, batching, and DataLoader usage.',
        date: 'Jun 2025',
        readTime: 'Official Docs',
        linkText: 'Open Resource',
        url: 'https://pytorch.org/tutorials/beginner/basics/data_tutorial.html'
      },
      {
        title: 'MLflow Tracking — Official Quickstart Guide',
        category: 'Infrastructure',
        description: 'Spin up experiment tracking, model registry, and artifact logging with MLflow in minutes.',
        date: 'Mar 2025',
        readTime: 'Official Docs',
        linkText: 'Open Resource',
        url: 'https://mlflow.org/docs/latest/getting-started/intro-quickstart/index.html'
      },
      {
        title: 'Optuna — Hyperparameter Optimization Framework',
        category: 'Utility Script',
        description: 'Optuna-based automated hyperparameter tuning compatible with PyTorch, TensorFlow, and Scikit-Learn pipelines.',
        date: 'Feb 2025',
        readTime: 'Open Source',
        linkText: 'Open Resource',
        url: 'https://optuna.readthedocs.io/en/stable/tutorial/10_key_features/002_configurations.html'
      }
    ]
  };

  let activeTab = 'articles';
  let searchQuery = '';

  function renderHub() {
    const list = knowledgeDB[activeTab] || [];
    // Filter list based on search query
    const filteredList = list.filter((item) => {
      const matchText = (item.title + ' ' + item.category + ' ' + item.description).toLowerCase();
      return matchText.includes(searchQuery.toLowerCase());
    });

    cardsContainer.innerHTML = '';

    if (filteredList.length === 0) {
      cardsContainer.innerHTML = `
        <div class="glass-panel" style="padding: 3rem; text-align: center; color: var(--text-secondary);">
          <p>No results found for "${searchQuery}" in ${activeTab}. Try checking spelling or search keywords.</p>
        </div>
      `;
      return;
    }

    filteredList.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'glass-panel knowledge-card';
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <div class="knowledge-card-meta">
          <span class="meta-category">${item.category}</span>
          <span>•</span>
          <span>${item.date}</span>
          <span>•</span>
          <span>${item.readTime}</span>
        </div>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <a href="${item.url}" class="knowledge-card-link" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">${item.linkText} <i class="fas fa-external-link-alt"></i></a>
      `;

      // Clicking anywhere on the card opens the URL
      card.addEventListener('click', () => {
        window.open(item.url, '_blank', 'noopener,noreferrer');
      });

      cardsContainer.appendChild(card);
    });
  }

  // Add click events to Tab switches
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      activeTab = tab.dataset.tab;
      searchInput.value = '';
      searchQuery = '';

      // Update search placeholder dynamically (without FE.DEV)
      if (activeTab === 'articles') {
        searchInput.placeholder = 'Search technical articles...';
      } else {
        searchInput.placeholder = 'Search templates, scripts, configurations...';
      }

      renderHub();
    });
  });

  // Search input change handler
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderHub();
  });

  // Initial render
  renderHub();
}

/* ========================================================================= */
/* 3. Timeline (Professional Journey) Controller                            */
/* ========================================================================= */
function initTimeline() {
  // The Professional Journey section is now static HTML (vertical card timeline).
  // No dynamic JS needed — scroll reveal animations are handled by initScrollReveal().
}

/* ========================================================================= */
/* 4. Contact Form Controller                                               */
/* ========================================================================= */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // Basic Validation
    if (!name || !email || !subject || !message) {
      showFeedback('Please fill out all fields before submitting.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

    showFeedback('Sending message...', 'info');

    fetch('https://formsubmit.co/ajax/baisprathviraj9@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        message: message
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success === "true" || data.success === true) {
          showFeedback('Thank you! Your message has been sent successfully.', 'success');
          form.reset();
        } else {
          showFeedback('Something went wrong. Please try again.', 'error');
        }
      })
      .catch(error => {
        showFeedback('Error sending message. Please try again later.', 'error');
        console.error(error);
      });
  });

  function showFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className = 'form-feedback'; // reset

    if (type === 'success') {
      feedback.classList.add('success');
    } else if (type === 'error') {
      feedback.classList.add('error');
    } else {
      feedback.style.display = 'block';
      feedback.style.background = 'rgba(255, 255, 255, 0.05)';
      feedback.style.border = '1px solid var(--border-color)';
      feedback.style.color = 'var(--text-primary)';
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
}

/* ========================================================================= */
/* 5. Mobile Navigation Menu Toggle                                         */
/* ========================================================================= */
function initMobileNav() {
  const navToggle = document.getElementById('mobile-toggle');
  const nav = document.querySelector('nav');

  if (!navToggle || !nav) return;

  // Simple drawer implementation for mobile
  navToggle.addEventListener('click', () => {
    const isVisible = nav.style.display === 'flex';

    if (isVisible) {
      nav.style.display = 'none';
      navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '4.5rem';
      nav.style.left = '0';
      nav.style.width = '100%';
      nav.style.background = 'var(--bg-secondary)';
      nav.style.borderBottom = '1px solid var(--border-color)';
      nav.style.padding = '2rem';
      nav.style.gap = '1.5rem';
      navToggle.innerHTML = '<i class="fas fa-times"></i>';
    }
  });

  // Close drawer if width resized beyond tablet breakpoint or navigation link clicked
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      nav.style.display = '';
      nav.style.flexDirection = '';
      nav.style.position = '';
      nav.style.top = '';
      nav.style.left = '';
      nav.style.width = '';
      nav.style.background = '';
      nav.style.borderBottom = '';
      nav.style.padding = '';
      nav.style.gap = '';
      navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        nav.style.display = 'none';
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });
}

/* ========================================================================= */
/* 6. Scroll Reveal Animations                                               */
/* ========================================================================= */
function initScrollReveal() {
  // Add reveal class to all major sections and cards
  const targets = document.querySelectorAll(
    '.section-title-wrap, .glass-panel, .project-card, .about-left, .about-right, .exp-card, .contact-left, .contact-right'
  );

  targets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Reveal once only
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ========================================================================= */
/* 7. Active Nav Link Highlighting on Scroll                                 */
/* ========================================================================= */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ========================================================================= */
/* 8. Header Scroll Shadow                                                   */
/* ========================================================================= */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
      header.style.borderBottomColor = 'rgba(255,255,255,0.08)';
    } else {
      header.style.boxShadow = 'none';
      header.style.borderBottomColor = 'var(--border-color)';
    }
  }, { passive: true });
}

/* ========================================================================= */
/* 9. Back to Top Button                                                     */
/* ========================================================================= */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  // Show button after scrolling 300px down
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  // Smooth scroll to top on click
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
