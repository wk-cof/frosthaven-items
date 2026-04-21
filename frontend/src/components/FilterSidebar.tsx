import { Filters } from '../App';

type Props = {
  filters: Filters;
  setFilters: (f: Filters) => void;
};

// Available slots
const SLOTS = [
  { id: '', label: 'All Slots' },
  { id: '1h', label: '1 Hand' },
  { id: '2h', label: '2 Hands' },
  { id: 'body', label: 'Body' },
  { id: 'head', label: 'Head' },
  { id: 'legs', label: 'Legs' },
  { id: 'small', label: 'Small Item' },
];

function FilterSidebar({ filters, setFilters }: Props) {
  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <aside className="filter-sidebar">
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>Filters</h2>
      
      <div className="filter-group">
        <label>Search string</label>
        <input
          type="text"
          className="search-input"
          placeholder="Search items..."
          value={filters.searchTerm}
          onChange={(e) => updateFilter('searchTerm', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Equipment Slot</label>
        <select 
          className="search-input" 
          value={filters.slot}
          onChange={(e) => updateFilter('slot', e.target.value)}
        >
          {SLOTS.map(slot => (
            <option key={slot.id} value={slot.id}>{slot.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Max Cost (Gold)</label>
        <input
          type="number"
          className="search-input"
          placeholder="Any"
          min="0"
          value={filters.maxCost}
          onChange={(e) => updateFilter('maxCost', e.target.value)}
        />
      </div>

      <div className="filter-group toggle-group" style={{ marginTop: '1.5rem' }}>
        <label className="toggle-label">
          <input 
            type="checkbox" 
            checked={filters.hideSpent}
            onChange={(e) => updateFilter('hideSpent', e.target.checked)}
          />
          Hide Spent Items
        </label>
        
        <label className="toggle-label">
          <input 
            type="checkbox" 
            checked={filters.hideConsumed}
            onChange={(e) => updateFilter('hideConsumed', e.target.checked)}
          />
          Hide Consumed Items
        </label>
      </div>
    </aside>
  );
}

export default FilterSidebar;
