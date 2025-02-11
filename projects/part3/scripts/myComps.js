document.addEventListener('DOMContentLoaded', () => {
  const compManager = new CompositionManager();
  const container = document.querySelector('.comps-container');

  // Add map filter
  const filterContainer = document.createElement('div');
  filterContainer.className = 'map-filter';
  filterContainer.innerHTML = `
    <select id="map-filter">
      <option value="">All Maps</option>
      ${compManager.getMaps().map(map => 
        `<option value="${map}">${map}</option>`
      ).join('')}
    </select>
  `;
  container.insertBefore(filterContainer, container.querySelector('.agent-list-divider'));

  function renderCompositions(mapFilter = '') {
    const compositions = compManager.getCompositionsByMap(mapFilter);
    
    // Clear existing compositions except title and filter
    const title = container.querySelector('.agent-list-title');
    const filter = container.querySelector('.map-filter');
    const divider = container.querySelector('.agent-list-divider');
    container.innerHTML = '';
    container.appendChild(title);
    container.appendChild(filter);
    container.appendChild(divider);

    compositions.forEach(comp => {
      const compItem = document.createElement('div');
      compItem.className = 'comp-item';
      compItem.innerHTML = `
        <div class="map-background">
          <img src="images/maps/${comp.map}.png" alt="${comp.map} map">
          <button class="delete-comp" data-id="${comp.id}" aria-label="Delete composition"></button>
        </div>
        <div class="comp-content">
          <div class="comp-title">
            <h2>${comp.map}</h2>
          </div>
          <div class="comp-agents">
            ${comp.agents.map(agent => `
              <a href="agent-list.html?agent=${agent}">
                <img src="images/agents/${agent}.png" alt="${agent === 'Kayo' ? 'KAY/O' : agent}">
              </a>
            `).join('')}
          </div>
        </div>
      `;
      container.appendChild(compItem);
    });

    // Add delete handlers
    document.querySelectorAll('.delete-comp').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        compManager.deleteComposition(id);
        renderCompositions(mapFilter);
      });
    });
  }

  // Handle map filtering
  document.getElementById('map-filter').addEventListener('change', (e) => {
    renderCompositions(e.target.value);
  });

  // Initial render
  renderCompositions();
}); 