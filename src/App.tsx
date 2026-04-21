import { useState, useEffect } from 'react';
import itemsData from './data/items_db.json';
import glossaryData from './data/glossary.json';
import ItemGrid from './components/ItemGrid';
import FilterSidebar from './components/FilterSidebar';

export type Filters = {
  searchTerm: string;
  slot: string;
  maxCost: string;
  hideSpent: boolean;
  hideConsumed: boolean;
  showFlaggedOnly: boolean;
  showUnreviewedOnly: boolean;
};

export type ItemStatusMap = Record<string, 'verified' | 'flagged' | null>;

function App() {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    slot: '',
    maxCost: '',
    hideSpent: false,
    hideConsumed: false,
    showFlaggedOnly: false,
    showUnreviewedOnly: false,
  });

  const [itemStatuses, setItemStatuses] = useState<ItemStatusMap>({});

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    fetch('/api/status')
      .then(res => res.json())
      .then(data => setItemStatuses(data || {}))
      .catch(e => console.error("Could not fetch status:", e));
  }, []);

  const updateItemStatus = (id: string, status: 'verified' | 'flagged' | null) => {
    const newStatuses = { ...itemStatuses };
    if (status === null) {
      delete newStatuses[id];
    } else {
      newStatuses[id] = status;
    }
    
    setItemStatuses(newStatuses);
    
    if (import.meta.env.DEV) {
      fetch('/api/save-status', {
        method: 'POST',
        body: JSON.stringify(newStatuses)
      }).catch(e => console.error("Could not save status:", e));
    }
  };
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Frosthaven Item Helper</h1>
        <p>A beautiful database of artifacts and gear.</p>
      </header>
      <main className="app-main">
        <FilterSidebar filters={filters} setFilters={setFilters} itemStatuses={itemStatuses} />
        <ItemGrid 
          items={itemsData} 
          filters={filters} 
          glossary={glossaryData} 
          itemStatuses={itemStatuses} 
          updateItemStatus={updateItemStatus} 
        />
      </main>
    </div>
  );
}

export default App;