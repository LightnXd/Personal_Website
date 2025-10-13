class ProjectCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['folder', 'count', 'title', 'description', 'github-frontend', 'github-backend', 'technologies'];
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  render() {
    const folder = this.getAttribute('folder') || '';
    const count = this.getAttribute('count') || '1';
    const title = this.getAttribute('title') || 'Project Title';
    const description = this.getAttribute('description') || 'Project description';
    const githubFrontend = this.getAttribute('github-frontend') || '';
    const githubBackend = this.getAttribute('github-backend') || '';
    const technologies = this.getAttribute('technologies') || '';

    // Build GitHub links
    let githubLinks = '';
    if (githubFrontend && githubBackend) {
      githubLinks = `
        <p>Explore the project on GitHub: 
          <a href="${githubFrontend}" target="_blank"><strong>Frontend</strong></a> | 
          <a href="${githubBackend}" target="_blank"><strong>Backend</strong></a>
        </p>
      `;
    } else if (githubFrontend) {
      githubLinks = `
        <p>Check it out on <a href="${githubFrontend}" target="_blank"><strong>GitHub</strong></a>.</p>
      `;
    }

    // Build technologies section
    let techSection = '';
    if (technologies) {
      const techList = technologies.split(',').map(tech => `<li>${tech.trim()}</li>`).join('');
      techSection = `
        <p>Technologies used:</p>
        <ul>${techList}</ul>
      `;
    }

    this.innerHTML = `
      <div class="content4">
        <div class="image-carousel" data-folder="${folder}" data-count="${count}">
          <div class="carousel-nav">
            <button class="carousel-btn prev-btn" onclick="changeImage(this, -1)">❮</button>
            <img class="project-image" src="${folder}/1.png" alt="Project Image" />
            <button class="carousel-btn next-btn" onclick="changeImage(this, 1)">❯</button>
          </div>
          <div class="image-counter">
            <span class="image-counter-text">1 / ${count}</span>
          </div>
        </div>
        <div class="text-content">
          <h3>${title}</h3>
          ${description}
          ${techSection}
          ${githubLinks}
        </div>
      </div>
    `;

    // Initialize carousel functionality for this component
    setTimeout(() => {
      const carousel = this.querySelector('.image-carousel');
      const imageElement = this.querySelector('.project-image');
      
      if (carousel && imageElement) {
        // Add click event for image zoom
        imageElement.addEventListener('click', function() {
          console.log('Project card image clicked:', this.src); // Debug log
          if (window.openImageModal) {
            window.openImageModal(this.src, carousel);
          }
        });
      }
    }, 10);
  }
}

customElements.define('project-card', ProjectCard);