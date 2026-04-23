import { useState, useEffect } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import itemsData from '../data/items_db.json';
import glossaryData from '../data/glossary.json';
import ItemGrid from '../components/ItemGrid';
import FilterSidebar from '../components/FilterSidebar';

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

function ItemsPage() {
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
    <Box sx={{ minHeight: '100vh', bgcolor: '#0f172a', color: '#f8fafc', py: 4 }}>
      <Container maxWidth="xl">
        <Box 
          component="header" 
          sx={{ 
            mb: 6, 
            pb: 4, 
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 900, 
              mb: 1,
              background: 'linear-gradient(to right, #38bdf8, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}
          >
            Frosthaven Item Database
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#94a3b8' }}>
            Browse and filter all items from Frosthaven.
          </Typography>
        </Box>

        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={4} 
          sx={{ alignItems: 'flex-start' }}
        >
          <FilterSidebar 
            filters={filters} 
            setFilters={setFilters} 
            itemStatuses={itemStatuses} 
          />
          <ItemGrid 
            items={itemsData} 
            filters={filters} 
            glossary={glossaryData} 
            itemStatuses={itemStatuses} 
            updateItemStatus={updateItemStatus} 
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default ItemsPage;
