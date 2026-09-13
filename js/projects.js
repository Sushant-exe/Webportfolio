/**
 * ============================================================================
 * PROJECTS DATA, DYNAMIC FILTERING & MODAL SYSTEM
 * ============================================================================
 */

const PROJECTS_DATA = [
  {
    id: 'nexus-ai',
    title: 'Nexus Cloud AI Analytics',
    category: 'ai',
    categoryLabel: 'AI & Cloud Computing',
    summary: 'Autonomous telemetry & AI model inference dashboard providing real-time neural network diagnostics and compute allocation.',
    image: 'assets/images/project1.jpg',
    tags: ['React', 'TypeScript', 'FastAPI', 'PyTorch', 'Tailwind', 'Docker'],
    highlights: [
      'Sub-20ms distributed query pipeline across 1,200+ neural model nodes.',
      'Real-time WebSocket telemetry rendering 60 FPS multi-axis charts with Canvas/WebGL.',
      'Built-in compute auto-scaling saving 34% cloud cluster expenditures.'
    ],
    liveUrl: 'https://example.com/nexus-ai-demo',
    githubUrl: 'https://github.com/sushant/nexus-ai-engine'
  },
  {
    id: 'omnipay-global',
    title: 'OmniPay Global Fintech Hub',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Fintech',
    summary: 'Decentralized multi-currency fiat & crypto settlement platform with cross-border instant remittance and virtual cards.',
    image: 'assets/images/project2.jpg',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Stripe API', 'Redis'],
    highlights: [
      'Engineered idempotent transaction engine processing $4M+ simulated daily turnover.',
      'End-to-end AES-256-GCM encryption with biometric authorization workflows.',
      'Sub-second settlement confirmation with automated reconciliation webhooks.'
    ],
    liveUrl: 'https://example.com/omnipay-demo',
    githubUrl: 'https://github.com/sushant/omnipay-core'
  },
  {
    id: 'devflow-studio',
    title: 'DevFlow Cloud IDE Workspace',
    category: 'apps',
    categoryLabel: 'Web Apps & DevTools',
    summary: 'Browser-based collaborative cloud IDE featuring real-time pair programming, live container terminals, and instantaneous hot reload.',
    image: 'assets/images/project3.jpg',
    tags: ['TypeScript', 'Monaco Editor', 'WebAssembly', 'Go', 'Docker', 'WebSockets'],
    highlights: [
      'Collaborative operational transformation (CRDT) engine with sub-15ms sync latency.',
      'Isolated Docker container sandbox spawning ephemeral dev environments in 1.8s.',
      'Integrated LSP (Language Server Protocol) with auto-completion and syntax linting.'
    ],
    liveUrl: 'https://example.com/devflow-studio',
    githubUrl: 'https://github.com/sushant/devflow-studio'
  },
  {
    id: 'synapse-health',
    title: 'Synapse Health AI Biomarkers',
    category: 'ai',
    categoryLabel: 'AI & HealthTech',
    summary: 'Preventive healthcare telemetry platform integrating continuous ECG, HRV, and physiological stress analysis models.',
    image: 'assets/images/project4.jpg',
    tags: ['Vue 3', 'Python', 'TensorFlow', 'PostgreSQL', 'GraphQL', 'AWS IoT'],
    highlights: [
      'Deep learning anomaly detection detecting cardiac irregularities with 99.1% accuracy.',
      'HIPAA-compliant zero-knowledge medical data vaults and federated learning hooks.',
      'Interactive 3D physiological avatar visualizer with localized biometric status.'
    ],
    liveUrl: 'https://example.com/synapse-health',
    githubUrl: 'https://github.com/sushant/synapse-biometrics'
  }
];

function initProjects() {
  const container = document.getElementById('projects-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!container) return;

  function renderProjects(filter = 'all') {
    container.innerHTML = '';
    const filtered = filter === 'all' 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === filter);

    filtered.forEach((project, idx) => {
      const card = document.createElement('article');
      card.className = 'glass-card project-card reveal-fade is-revealed';
      card.setAttribute('data-id', project.id);
      card.style.animationDelay = `${idx * 0.1}s`;

      const tagsHtml = project.tags.slice(0, 4).map(t => `<span class="tech-chip">${t}</span>`).join('');

      card.innerHTML = `
        <div class="project-img-wrap">
          <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy" />
          <span class="project-category-badge">${project.categoryLabel}</span>
        </div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <div class="project-tags">
            ${tagsHtml}
          </div>
          <div class="project-actions">
            <button type="button" class="btn btn-primary btn-sm open-modal-btn" data-id="${project.id}">
              <span>View Case Study</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" aria-label="GitHub Repository">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span>Code</span>
            </a>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    // Attach click listeners to new modal buttons
    container.querySelectorAll('.open-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openProjectModal(id);
      });
    });
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });

  // Modal Open Handler
  function openProjectModal(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project || !modalOverlay) return;

    document.getElementById('modal-img').src = project.image;
    document.getElementById('modal-img').alt = project.title;
    document.getElementById('modal-category').textContent = project.categoryLabel;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.summary;
    
    // Tags
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = project.tags.map(t => `<span class="tech-chip">${t}</span>`).join('');

    // Highlights
    const highlightsContainer = document.getElementById('modal-highlights');
    highlightsContainer.innerHTML = project.highlights.map(h => `
      <div class="modal-highlight-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${h}</span>
      </div>
    `).join('');

    // Action Links
    document.getElementById('modal-live-link').href = project.liveUrl;
    document.getElementById('modal-github-link').href = project.githubUrl;

    modalOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  // Modal Close Handler
  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Initial render
  renderProjects('all');
}

document.addEventListener('DOMContentLoaded', initProjects);
