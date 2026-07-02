/* Yan Rooven Andrew Portfolio — script.js */

// ===== Particle Animation =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 80;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.7 ? '#00d4ff' : Math.random() > 0.5 ? '#7b2ff7' : '#ffffff'
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity;
    ctx.fill();

    // Draw connections
    for (let j = i + 1; j < particles.length; j++) {
      const dx = p.x - particles[j].x;
      const dy = p.y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = (1 - dist / 120) * 0.15;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();
window.addEventListener('resize', () => { resizeCanvas(); createParticles(); });

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Menu =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== Active Nav Link =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
});

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.glass-card, .section-header, .hero-badge, .hero-actions');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ===== Skill Tag Hover Glow =====
document.querySelectorAll('.skill-tag').forEach(tag => {
  const level = tag.dataset.level;
  tag.addEventListener('mouseenter', () => {
    const intensity = level / 100;
    tag.style.boxShadow = `0 0 ${8 + intensity * 12}px rgba(0,212,255,${intensity * 0.4})`;
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.boxShadow = '';
  });
});

// ===== Typing Effect for Code Window =====
const codeBody = document.querySelector('.code-body pre code');
if (codeBody) {
  const originalHTML = codeBody.innerHTML;
  codeBody.innerHTML = '';
  let i = 0;
  const speed = 30;
  function typeCode() {
    if (i < originalHTML.length) {
      if (originalHTML[i] === '<') {
        const endIndex = originalHTML.indexOf('>', i);
        if (endIndex !== -1) {
          codeBody.innerHTML += originalHTML.substring(i, endIndex + 1);
          i = endIndex + 1;
        } else {
          codeBody.innerHTML += originalHTML[i];
          i++;
        }
      } else {
        codeBody.innerHTML += originalHTML[i];
        i++;
      }
      setTimeout(typeCode, originalHTML[i - 1] === '\n' ? speed * 3 : speed);
    }
  }
  setTimeout(typeCode, 1500);
}

// ===== Stat Counter Animation =====
document.querySelectorAll('.stat-number').forEach(stat => {
  const target = stat.textContent;
  const isPlus = target.includes('+');
  const num = parseInt(target);
  let current = 0;
  const duration = 2000;
  const step = num / (duration / 16);
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animate = () => {
          current += step;
          if (current >= num) {
            stat.textContent = num + (isPlus ? '+' : '');
            return;
          }
          stat.textContent = Math.floor(current) + (isPlus ? '+' : '');
          requestAnimationFrame(animate);
        };
        animate();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counterObserver.observe(stat);
});

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== 1. Mode clair/sombre toggle =====
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});
if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-mode');

// ===== 2. Animations au scroll (IntersectionObserver) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== 3. Cartes 3D tilt =====
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// ===== 4. GitHub Activity Feed =====
async function loadGitHubActivity() {
  const container = document.getElementById('github-activity');
  if (!container) return;
  try {
    const [eventsRes, reposRes] = await Promise.all([
      fetch('https://api.github.com/users/yanhacking/events?per_page=5'),
      fetch('https://api.github.com/users/yanhacking/repos?sort=updated&per_page=5')
    ]);
    const events = await eventsRes.json();
    const repos = await reposRes.json();
    let html = '<div class="activity-grid">';
    repos.forEach(repo => {
      const updated = new Date(repo.updated_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
      html += `<div class="activity-card glass-card">
        <div class="activity-header">
          <span class="activity-icon">📦</span>
          <a href="${repo.html_url}" target="_blank"><h4>${repo.name}</h4></a>
        </div>
        <p class="activity-desc">${repo.description || 'No description'}</p>
        <div class="activity-meta">
          <span class="activity-lang" style="background:${getLangColor(repo.language)}"></span>
          <span>${repo.language || 'N/A'}</span>
          <span class="activity-date">${updated}</span>
        </div>
      </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  } catch(e) { container.innerHTML = '<p>Activité GitHub temporairement indisponible</p>'; }
}
function getLangColor(lang) {
  const colors = { JavaScript: '#f1e05a', Python: '#3572A5', TypeScript: '#3178c6', HTML: '#e34c26', CSS: '#563d7c', PHP: '#4F5D95', Dart: '#00B4AB' };
  return colors[lang] || '#ccc';
}
loadGitHubActivity();

// ===== 5. Curseur glow =====
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
});
document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursorGlow.style.width = '40px'; cursorGlow.style.height = '40px'; });
  el.addEventListener('mouseleave', () => { cursorGlow.style.width = '20px'; cursorGlow.style.height = '20px'; });
});

// ===== 6. Formulaire de contact =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    const subject = encodeURIComponent(`Contact portfolio - ${name}`);
    const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:yanhaiti@outlook.fr?subject=${subject}&body=${body}`;
  });
}

// ===== 7. Typewriter effect =====
const typewriter = document.getElementById('typewriter');
if (typewriter) {
  const text = typewriter.textContent;
  typewriter.textContent = '';
  typewriter.classList.add('typewriter-active');
  let i = 0;
  function type() {
    if (i < text.length) {
      typewriter.textContent += text.charAt(i);
      i++;
      setTimeout(type, 80);
    }
  }
  setTimeout(type, 500);
}