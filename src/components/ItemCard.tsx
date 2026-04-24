import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  IconButton, 
  Stack, 
  Link,
  Tooltip
} from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { renderTextWithTooltips } from './RuleTooltip';
import { toTitleCase } from '../utils/stringUtils';
import { SlotIcon } from './SlotIcon';
import { ResourceIcon } from './ResourceIcon';

function ItemCard({ item, glossary, status, onStatusChange, onImageClick }: any) {
  const isVerified = status === 'verified';
  const isFlagged = status === 'flagged';

  return (
    <Card 
      id={`item-${item.id}`}
      sx={{ 
        bgcolor: 'rgba(22, 28, 45, 0.7)', 
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'rgba(56, 189, 248, 0.3)',
          transform: 'translateY(-4px)',
          bgcolor: 'rgba(30, 41, 59, 0.8)',
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          {import.meta.env.DEV && (
            <Stack direction="row" spacing={0.5}>
              <Tooltip title="Verified">
                <IconButton 
                  size="small" 
                  onClick={() => onStatusChange(isVerified ? null : 'verified')}
                  sx={{ 
                    color: isVerified ? '#4ade80' : 'rgba(255,255,255,0.2)',
                    border: '1px solid',
                    borderColor: isVerified ? '#4ade80' : 'transparent',
                    p: 0.5
                  }}
                >
                  <CheckCircleOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Needs Work">
                <IconButton 
                  size="small" 
                  onClick={() => onStatusChange(isFlagged ? null : 'flagged')}
                  sx={{ 
                    color: isFlagged ? '#f87171' : 'rgba(255,255,255,0.2)',
                    border: '1px solid',
                    borderColor: isFlagged ? '#f87171' : 'transparent',
                    p: 0.5
                  }}
                >
                  <FlagOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
          <SlotIcon slot={item.slot || 'None'} size={18} showTooltip={false} />
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#f8fafc', lineHeight: 1.2 }}>
            {toTitleCase(item.name)}
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 900, color: '#334155' }}>
          #{item.id}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          p: 2, 
          gap: 2 
        }}>
          <Box 
            sx={{ 
              width: { xs: '100%', sm: 200 },
              maxWidth: { xs: 300, sm: 200 },
              margin: { xs: '0 auto', sm: 0 },
              flexShrink: 0, 
              cursor: 'zoom-in',
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'scale(1.05)' }
            }}
            onClick={() => onImageClick(`${import.meta.env.BASE_URL}assets/items/${item.image.split('/').pop()}`)}
          >
            {item.image && (
              <Box
                component="img"
                src={`${import.meta.env.BASE_URL}assets/items/${item.image.split('/').pop()}`}
                alt={toTitleCase(item.name)}
                sx={{ width: '100%', borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3)' }}
                loading="lazy"
              />
            )}
          </Box>
          <Stack spacing={1} sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <SlotIcon slot={item.slot || 'None'} size={16} showTooltip={false} />
              <Typography sx={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                {toTitleCase(item.slot || 'None')}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} sx={{ my: 0.5, flexWrap: 'wrap', gap: 1 }}>
              {item.spent && (
                <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', bgcolor: 'rgba(245, 158, 11, 0.1)', px: 1, py: 0.25, borderRadius: 1, border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <Box component="img" src={`${import.meta.env.BASE_URL}assets/general/fh-tap-card-color-icon.png`} sx={{ width: 14, height: 14, objectFit: 'contain', filter: 'invert(1)' }} />
                  <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase' }}>Spent</Typography>
                </Stack>
              )}
              {item.consumed && (
                <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', bgcolor: 'rgba(239, 68, 68, 0.1)', px: 1, py: 0.25, borderRadius: 1, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <Box component="img" src={`${import.meta.env.BASE_URL}assets/general/fh-lost-black-card-color-icon.png`} sx={{ width: 14, height: 14, objectFit: 'contain', filter: 'invert(1)' }} />
                  <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, color: '#f87171', textTransform: 'uppercase' }}>Consumed</Typography>
                </Stack>
              )}
            </Stack>
            {/* Unified Resource Cost List (Gold + Materials) */}
            <Stack spacing={0.5}>
              {Number(item.cost) > 0 && (
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '0.75rem', color: '#fbbf24', minWidth: 12, fontWeight: 700 }}>{item.cost}</Typography>
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                    <ResourceIcon resource="Gold" size={16} />
                    <Typography sx={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 700 }}>Gold</Typography>
                  </Stack>
                </Stack>
              )}
              
              {item.resources && Object.entries(item.resources).map(([res, count]) => (
                <Stack key={res} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '0.75rem', color: '#64748b', minWidth: 12 }}>{String(count)}</Typography>
                  {res.startsWith('Item ') ? (
                    <Link href={`#item-${res.replace('Item ', '')}`} sx={{ color: '#38bdf8', textDecoration: 'none', fontSize: '0.75rem' }} onClick={(e) => e.stopPropagation()}>{toTitleCase(res)}</Link>
                  ) : (
                    <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                      <ResourceIcon resource={res} size={16} />
                      <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8' }}>{toTitleCase(res)}</Typography>
                    </Stack>
                  )}
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>

        <CardContent sx={{ pt: 0, '& .MuiTypography-root': { fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6 } }}>
          {renderTextWithTooltips(item.text, glossary)}
        </CardContent>

        {item.footer && (
          <Box sx={{ 
            px: 2, 
            pb: 2, 
            mt: -1,
            display: 'flex', 
            justifyContent: 'flex-start',
            '& .MuiTypography-root': { fontSize: '0.85rem', fontWeight: 600 }
          }}>
            <Box sx={{ 
              bgcolor: 'rgba(56, 189, 248, 0.1)', 
              px: 1.5, 
              py: 0.5, 
              borderRadius: 2,
              border: '1px solid rgba(56, 189, 248, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              {renderTextWithTooltips(item.footer, glossary)}
            </Box>
          </Box>
        )}
      </Box>
    </Card>
  );
}

export default ItemCard;
