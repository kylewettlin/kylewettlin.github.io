class CompositionManager {
  constructor() {
    this.storageKey = 'valorant-compositions';
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
      id: Date.now(), // Use timestamp as unique ID
      ...composition
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
      'Astra', 'Breach', 'Brimstone', 'Chamber', 'Cypher', 
      'Deadlock', 'Fade', 'Gekko', 'Harbor', 'Iso', 'Jett', 
      'Kayo', 'Killjoy', 'Neon', 'Omen', 'Phoenix', 'Raze', 
      'Reyna', 'Sage', 'Skye', 'Sova', 'Viper', 'Yoru'
    ].sort();
  }
} 