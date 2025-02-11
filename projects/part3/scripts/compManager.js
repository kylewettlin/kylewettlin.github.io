class CompositionManager {
  constructor() {
    this.storageKey = 'valorant-compositions';
    this.maps = [
      'Abyss',
      'Ascent',
      'Bind',
      'Breeze',
      'Fracture',
      'Haven',
      'Icebox',
      'Lotus',
      'Pearl',
      'Split',
      'Sunset'
    ].sort();
  }

  // Get all saved compositions
  getCompositions() {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : [];
  }

  // Save a new composition
  saveComposition(composition) {
    const compositions = this.getCompositions();
    compositions.push({
      id: Date.now(),
      map: composition.map,
      agents: composition.agents
    });
    localStorage.setItem(this.storageKey, JSON.stringify(compositions));
  }

  // Delete a composition
  deleteComposition(compId) {
    const compositions = this.getCompositions();
    const filtered = compositions.filter(comp => comp.id !== compId);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
  }

  // Get all available agents
  getAgentList() {
    return [
      'Astra', 'Breach', 'Brimstone', 'Chamber', 'Clove', 'Cypher', 
      'Deadlock', 'Fade', 'Gekko', 'Harbor', 'Iso', 'Jett', 
      'Kayo', 'Killjoy', 'Neon', 'Omen', 'Phoenix', 'Raze', 
      'Reyna', 'Sage', 'Skye', 'Sova', 'Tejo', 'Viper', 
      'Vyse', 'Yoru'
    ].sort();
  }

  // Add map getter
  getMaps() {
    return this.maps;
  }

  // Add method to get compositions by map
  getCompositionsByMap(map) {
    const compositions = this.getCompositions();
    if (!map || map === 'All Maps') return compositions;
    return compositions.filter(comp => comp.map === map);
  }
} 