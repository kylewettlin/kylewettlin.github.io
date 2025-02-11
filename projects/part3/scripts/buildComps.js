document.addEventListener('DOMContentLoaded', () => {
  const compManager = new CompositionManager();
  const form = document.getElementById('compBuilder');
  const previewContainer = document.querySelector('.comp-preview-container');
  const mapSelect = document.getElementById('map-select');
  const mapPreview = document.querySelector('.map-preview');
  
  // Populate agent selects (excluding map-select)
  const agentList = compManager.getAgentList();
  const agentSelects = document.querySelectorAll('select[name^="agent"]');
  
  agentSelects.forEach(select => {
    agentList.forEach(agent => {
      const option = document.createElement('option');
      option.value = agent;
      option.textContent = agent === 'Kayo' ? 'KAY/O' : agent;
      select.appendChild(option);
    });
  });

  // Populate map select separately
  compManager.getMaps().forEach(map => {
    const option = document.createElement('option');
    option.value = map;
    option.textContent = map;
    mapSelect.appendChild(option);
  });

  // Preview handling (agents only)
  function updatePreview() {
    previewContainer.innerHTML = '';
    agentSelects.forEach(select => {
      if (select.value) {
        const img = document.createElement('img');
        img.src = `images/agents/${select.value}.png`;
        img.alt = select.value;
        previewContainer.appendChild(img);
      }
    });
  }

  agentSelects.forEach(select => {
    select.addEventListener('change', updatePreview);
  });

  // Handle map selection
  mapSelect.addEventListener('change', () => {
    const selectedMap = mapSelect.value;
    if (selectedMap) {
      mapPreview.innerHTML = `<img src="images/maps/${selectedMap}.png" alt="${selectedMap} map">`;
    } else {
      mapPreview.innerHTML = '';
    }
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedAgents = Array.from(document.querySelectorAll('select[name^="agent"]'))
      .map(select => select.value);
    
    const uniqueAgents = new Set(selectedAgents);
    if (uniqueAgents.size !== 5) {
      alert('Please select 5 different agents');
      return;
    }

    const composition = {
      map: mapSelect.value,
      agents: selectedAgents
    };

    compManager.saveComposition(composition);
    alert('Composition saved successfully!');
    form.reset();
    mapPreview.innerHTML = '';
    previewContainer.innerHTML = '';
    
    window.location.href = 'my-comps.html';
  });
}); 