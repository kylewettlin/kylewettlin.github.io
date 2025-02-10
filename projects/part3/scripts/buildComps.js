document.addEventListener('DOMContentLoaded', () => {
  const compManager = new CompositionManager();
  const form = document.getElementById('compBuilder');
  const previewContainer = document.querySelector('.comp-preview-container');
  
  // Populate all select elements with agents
  const agentList = compManager.getAgentList();
  const selects = document.querySelectorAll('select');
  
  selects.forEach(select => {
    agentList.forEach(agent => {
      const option = document.createElement('option');
      option.value = agent;
      option.textContent = agent === 'Kayo' ? 'KAY/O' : agent;
      select.appendChild(option);
    });
  });

  // Preview handling
  function updatePreview() {
    previewContainer.innerHTML = '';
    selects.forEach(select => {
      if (select.value) {
        const img = document.createElement('img');
        img.src = `images/agents/${select.value}.png`;
        img.alt = select.value;
        previewContainer.appendChild(img);
      }
    });
  }

  selects.forEach(select => {
    select.addEventListener('change', updatePreview);
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check for duplicate agents
    const selectedAgents = Array.from(selects).map(select => select.value);
    const uniqueAgents = new Set(selectedAgents);
    if (uniqueAgents.size !== 5) {
      alert('Please select 5 different agents');
      return;
    }

    const composition = {
      title: document.getElementById('comp-title').value,
      agents: selectedAgents
    };

    compManager.saveComposition(composition);
    alert('Composition saved successfully!');
    form.reset();
    previewContainer.innerHTML = '';
    
    // Redirect to my-comps page
    window.location.href = 'my-comps.html';
  });
}); 