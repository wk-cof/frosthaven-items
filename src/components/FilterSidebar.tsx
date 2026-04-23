import React from 'react';
import { 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Checkbox, 
  FormControlLabel, 
  Stack,
  Paper,
  Divider
} from '@mui/material';
import { Filters, ItemStatusMap } from '../pages/ItemsPage';
import { SlotIcon } from './SlotIcon';

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  itemStatuses: ItemStatusMap;
};

const SLOTS = [
  { id: '', label: 'All Slots' },
  { id: '1h', label: '1 Hand' },
  { id: '2h', label: '2 Hands' },
  { id: 'body', label: 'Body' },
  { id: 'head', label: 'Head' },
  { id: 'legs', label: 'Legs' },
  { id: 'small', label: 'Small Item' },
];

function FilterSidebar({ filters, setFilters, itemStatuses }: Props) {
  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const updateReviewFilters = (key: 'showFlaggedOnly' | 'showUnreviewedOnly', checked: boolean) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: checked };
      if (checked) {
        if (key === 'showFlaggedOnly') newFilters.showUnreviewedOnly = false;
        if (key === 'showUnreviewedOnly') newFilters.showFlaggedOnly = false;
      }
      return newFilters;
    });
  };

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: 'rgba(0, 0, 0, 0.2)',
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
      '&.Mui-focused fieldset': { borderColor: '#38bdf8' },
    },
    '& .MuiInputLabel-root': { color: '#94a3b8' },
    '& .MuiInputBase-input': { color: '#f8fafc' },
  };

  return (
    <Paper 
      component="aside"
      elevation={0}
      sx={{ 
        width: { xs: '100%', md: 280 }, 
        p: 3, 
        bgcolor: 'rgba(30, 41, 59, 0.4)', 
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 4,
        position: 'sticky',
        top: 88,
        height: 'fit-content'
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          fontSize: '1.2rem', 
          fontWeight: 800, 
          color: '#f8fafc',
          mb: 3,
          pb: 1,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        Filters
      </Typography>
      
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Search Items"
          variant="outlined"
          size="small"
          value={filters.searchTerm}
          onChange={(e) => updateFilter('searchTerm', e.target.value)}
          sx={textFieldSx}
        />

        <FormControl fullWidth size="small" sx={textFieldSx}>
          <InputLabel>Equipment Slot</InputLabel>
          <Select
            value={filters.slot}
            label="Equipment Slot"
            onChange={(e) => updateFilter('slot', e.target.value)}
          >
            {SLOTS.map(slot => (
              <MenuItem key={slot.id} value={slot.id}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  {slot.id && <SlotIcon slot={slot.id} size={18} showTooltip={false} />}
                  <Typography sx={{ fontSize: '0.9rem' }}>{slot.label}</Typography>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Max Cost (Gold)"
          type="number"
          variant="outlined"
          size="small"
          placeholder="Any"
          value={filters.maxCost}
          onChange={(e) => updateFilter('maxCost', e.target.value)}
          sx={textFieldSx}
        />

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />

        <Stack spacing={1}>
          <FormControlLabel
            control={
              <Checkbox 
                size="small" 
                checked={filters.hideSpent} 
                onChange={(e) => updateFilter('hideSpent', e.target.checked)}
                sx={{ color: '#475569', '&.Mui-checked': { color: '#38bdf8' } }}
              />
            }
            label={<Typography sx={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Hide Spent Items</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox 
                size="small" 
                checked={filters.hideConsumed} 
                onChange={(e) => updateFilter('hideConsumed', e.target.checked)}
                sx={{ color: '#475569', '&.Mui-checked': { color: '#38bdf8' } }}
              />
            }
            label={<Typography sx={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Hide Consumed Items</Typography>}
          />
        </Stack>

        {import.meta.env.DEV && (
          <>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Review Status
            </Typography>
            <Stack spacing={0.5}>
              <FormControlLabel
                control={
                  <Checkbox 
                    size="small" 
                    checked={filters.showFlaggedOnly} 
                    onChange={(e) => updateReviewFilters('showFlaggedOnly', e.target.checked)}
                    sx={{ color: '#475569', '&.Mui-checked': { color: '#dc2626' } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                    🚩 Flagged ({Object.values(itemStatuses).filter(s => s === 'flagged').length})
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    size="small" 
                    checked={filters.showUnreviewedOnly} 
                    onChange={(e) => updateReviewFilters('showUnreviewedOnly', e.target.checked)}
                    sx={{ color: '#475569', '&.Mui-checked': { color: '#fbbf24' } }}
                  />
                }
                label={<Typography sx={{ fontSize: '0.9rem', color: '#cbd5e1' }}>❓ Unreviewed</Typography>}
              />
            </Stack>
          </>
        )}
      </Stack>
    </Paper>
  );
}

export default FilterSidebar;
