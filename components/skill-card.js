class SkillCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['image', 'title', 'description', 'skills'];
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  render() {
    const image = this.getAttribute('image') || '';
    const title = this.getAttribute('title') || 'Skill Title';
    const description = this.getAttribute('description') || 'Skill description';
    const skills = this.getAttribute('skills') || '';

    // Build skills list
    let skillsList = '';
    if (skills) {
      const skillItems = skills.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
      skillsList = `<ul>${skillItems}</ul>`;
    }

    this.innerHTML = `
      <div class="skill-card-container">
        <img src="${image}" alt="${title}" class="skill-image" />
        <div class="skill-text-content">
          <h2>${title}</h2>
          <p>${description}</p>
          ${skillsList}
        </div>
      </div>
    `;
  }
}

customElements.define('skill-card', SkillCard);