import ItemCard from './ItemCard';
import { Filters, ItemStatusMap } from '../App';

type Props = {
  items: any[];
  filters: Filters;
  glossary: any;
  itemStatuses: ItemStatusMap;
  updateItemStatus: (id: string, status: 'verified' | 'flagged' | null) => void;
};

function ItemGrid({ items, filters, glossary, itemStatuses, updateItemStatus }: Props) {
  const filtered = items.filter((item: any) => {
    // 1. Search term match (name or text)
    const searchMatch = !filters.searchTerm || 
      item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      (item.text && item.text.toLowerCase().includes(filters.searchTerm.toLowerCase()));
    if (!searchMatch) return false;

    // 2. Slot match
    if (filters.slot) {
      if (!item.slot) return false;
      if (typeof item.slot === 'string' && item.slot.toLowerCase() !== filters.slot.toLowerCase()) {
        return false;
      }
    }

    // 3. Max cost match (if specified and if cost is numeric)
    if (filters.maxCost) {
      const maxC = parseInt(filters.maxCost, 10);
      if (!isNaN(maxC)) {
        if (!item.cost) return false; // if no cost, treat as missing/unpurchaseable
        const itemCost = parseInt(item.cost, 10);
        if (isNaN(itemCost) || itemCost > maxC) {
          return false;
        }
      }
    }

    // 4. Hide Spent Items
    if (filters.hideSpent && item.spent) {
      return false;
    }

    // 5. Hide Consumed Items
    if (filters.hideConsumed && item.consumed) {
      return false;
    }

    // 6. Show Flagged Only
    if (filters.showFlaggedOnly) {
      if (itemStatuses[String(item.id)] !== 'flagged') return false;
    }

    // 7. Show Unreviewed Only
    if (filters.showUnreviewedOnly) {
      if (itemStatuses[String(item.id)]) return false;
    }

    return true;
  });

  return (
    <div className="item-grid">
      {filtered.map((item: any) => (
        <ItemCard 
          key={item.id} 
          item={item} 
          glossary={glossary} 
          status={itemStatuses[String(item.id)]}
          onStatusChange={(status: any) => updateItemStatus(String(item.id), status)}
        />
      ))}
    </div>
  );
}

export default ItemGrid;
