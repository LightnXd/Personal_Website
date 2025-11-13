class ProjectCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['folder', 'count', 'title', 'description', 'github-frontend', 'github-backend', 'github-scraper'];
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
    const githubScraper = this.getAttribute('github-scraper') || '';

    // Build GitHub links
    let githubLinks = '';
    const parts = [];
    if (githubFrontend) parts.push(`<a href="${githubFrontend}" target="_blank">Frontend</a>`);
    if (githubBackend) parts.push(`<a href="${githubBackend}" target="_blank">Backend</a>`);
    if (githubScraper) parts.push(`<a href="${githubScraper}" target="_blank">Scraper</a>`);

    if (parts.length) {
      githubLinks = `
        <p>Explore the project on GitHub: ${parts.join(' | ')}</p>
      `;
    }

    // Note: `technologies` attribute removed — no tech section rendered

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