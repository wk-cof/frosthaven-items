import { Grid, Box, Typography } from '@mui/material';
import ItemCard from './ItemCard';
import { Filters, ItemStatusMap } from '../pages/ItemsPage';

type Props = {
  items: any[];
  filters: Filters;
  glossary: any;
  itemStatuses: ItemStatusMap;
  updateItemStatus: (id: string, status: 'verified' | 'flagged' | null) => void;
};

function ItemGrid({ items, filters, glossary, itemStatuses, updateItemStatus }: Props) {
  const filtered = items.filter((item: any) => {
    const searchMatch = !filters.searchTerm || 
      item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      (item.text && item.text.toLowerCase().includes(filters.searchTerm.toLowerCase()));
    if (!searchMatch) return false;

    if (filters.slot) {
      if (!item.slot) return false;
      if (typeof item.slot === 'string' && item.slot.toLowerCase() !== filters.slot.toLowerCase()) {
        return false;
      }
    }

    if (filters.maxCost) {
      const maxC = parseInt(filters.maxCost, 10);
      if (!isNaN(maxC)) {
        if (!item.cost) return false;
        const itemCost = parseInt(item.cost, 10);
        if (isNaN(itemCost) || itemCost > maxC) return false;
      }
    }

    if (filters.hideSpent && item.spent) return false;
    if (filters.hideConsumed && item.consumed) return false;
    if (filters.showFlaggedOnly && itemStatuses[String(item.id)] !== 'flagged') return false;
    if (filters.showUnreviewedOnly && itemStatuses[String(item.id)]) return false;

    return true;
  });

  return (
    <Box sx={{ flex: 1 }}>
      {filtered.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8, color: '#475569' }}>
          <Typography variant="h6">No items match your filters.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((item: any) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
              <ItemCard 
                item={item} 
                glossary={glossary} 
                status={itemStatuses[String(item.id)]}
                onStatusChange={(status: any) => updateItemStatus(String(item.id), status)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ItemGrid;
