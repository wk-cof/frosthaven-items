import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  IconButton, 
  Stack, 
  Chip, 
  Link,
  Tooltip
} from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { renderTextWithTooltips } from './RuleTooltip';
import { toTitleCase } from '../utils/stringUtils';

function ItemCard({ item, glossary, status, onStatusChange }: any) {
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
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#f8fafc', lineHeight: 1.2 }}>
            {toTitleCase(item.name)}
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 900, color: '#334155' }}>
          #{item.id}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', p: 2, gap: 2 }}>
        <Box sx={{ width: 100, flexShrink: 0 }}>
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
          {(item.cost && Number(item.cost) > 0) && (
            <Typography sx={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 700 }}>
              💰 {item.cost}
            </Typography>
          )}
          <Typography sx={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            🎒 {toTitleCase(item.slot || 'None')}
          </Typography>
          {item.spent && <Chip label="Spent" size="small" sx={{ height: 20, bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.2)', fontSize: '0.65rem', fontWeight: 800 }} />}
          {item.consumed && <Chip label="Consumed" size="small" sx={{ height: 20, bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '0.65rem', fontWeight: 800 }} />}
          {item.resources && Object.entries(item.resources).map(([res, count]) => (
            <Typography key={res} sx={{ fontSize: '0.75rem', color: '#64748b' }}>
              📦 {String(count)} {res.startsWith('Item ') ? (
                <Link href={`#item-${res.replace('Item ', '')}`} sx={{ color: '#38bdf8', textDecoration: 'none' }}>{toTitleCase(res)}</Link>
              ) : toTitleCase(res)}
            </Typography>
          ))}
        </Stack>
      </Box>

      <CardContent sx={{ pt: 0, '& .MuiTypography-root': { fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6 } }}>
        {renderTextWithTooltips(item.text, glossary)}
      </CardContent>
    </Card>
  );
}

export default ItemCard;
