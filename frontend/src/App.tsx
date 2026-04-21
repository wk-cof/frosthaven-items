import { useState } from 'react';
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
};

function App() {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    slot: '',
    maxCost: '',
    hideSpent: false,
    hideConsumed: false,
  });
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Frosthaven Item Helper</h1>
        <p>A beautiful database of artifacts and gear.</p>
      </header>
      <main className="app-main">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <ItemGrid items={itemsData} filters={filters} glossary={glossaryData} />
      </main>
    </div>
  );
}

export default App;