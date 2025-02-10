document.addEventListener('DOMContentLoaded', () => {
  const compManager = new CompositionManager();
  const container = document.querySelector('.comps-container');

  function renderCompositions() {
    const compositions = compManager.getCompositions();
    
    // Clear existing compositions except the title
    const title = container.querySelector('.agent-list-title');
    const divider = container.querySelector('.agent-list-divider');
    container.innerHTML = '';
    container.appendChild(title);
    container.appendChild(divider);

    compositions.forEach(comp => {
      const compItem = document.createElement('div');
      compItem.className = 'comp-item';
      compItem.innerHTML = `
        <div class="comp-title">
          <h2>${comp.title}</h2>
        </div>
        <button class="delete-comp" data-id="${comp.id}" aria-label="Delete composition"></button>
        <div class="comp-agents">
          ${comp.agents.map(agent => `
            <a href="agent-list.html?agent=${agent}">
              <img src="images/agents/${agent}.png" alt="${agent === 'Kayo' ? 'KAY/O' : agent}">
            </a>
          `).join('')}
        </div>
      `;
      container.appendChild(compItem);
    });

    // Add delete handlers
    document.querySelectorAll('.delete-comp').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        compManager.deleteComposition(id);
        renderCompositions();
      });
    });
  }

  renderCompositions();
}); 