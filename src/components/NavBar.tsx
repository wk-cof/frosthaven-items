import { NavLink, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Stack, 
  Container 
} from '@mui/material';

function NavBar() {
  const location = useLocation();

  const isItemsActive = location.pathname === '/';

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: 'rgba(15, 23, 42, 0.8)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'none',
        backgroundImage: 'none'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}>
              ❄️
            </Typography>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 800,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                fontFamily: 'Space Grotesk'
              }}
            >
              Frosthaven Helper
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button
              component={NavLink}
              to="/"
              startIcon={<span>🎒</span>}
              sx={{
                color: isItemsActive ? '#38bdf8' : '#94a3b8',
                fontWeight: 700,
                px: 2,
                borderRadius: 2,
                bgcolor: isItemsActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(56, 189, 248, 0.05)',
                  color: '#38bdf8'
                }
              }}
            >
              Items
            </Button>
            <Button
              component={NavLink}
              to="/characters/pain-conduit"
              startIcon={<span>🔗</span>}
              sx={{
                color: location.pathname === '/characters/pain-conduit' ? '#38bdf8' : '#94a3b8',
                fontWeight: 700,
                px: 2,
                borderRadius: 2,
                bgcolor: location.pathname === '/characters/pain-conduit' ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(56, 189, 248, 0.05)',
                  color: '#38bdf8'
                }
              }}
            >
              Shackles
            </Button>
            <Button
              component={NavLink}
              to="/characters/pyroclast"
              startIcon={<span>🔥</span>}
              sx={{
                color: location.pathname === '/characters/pyroclast' ? '#f97316' : '#94a3b8',
                fontWeight: 700,
                px: 2,
                borderRadius: 2,
                bgcolor: location.pathname === '/characters/pyroclast' ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(249, 115, 22, 0.05)',
                  color: '#f97316'
                }
              }}
            >
              Meteor
            </Button>
            <Button
              component={NavLink}
              to="/characters/crashing-tide"
              startIcon={<span>🐚</span>}
              sx={{
                color: location.pathname === '/characters/crashing-tide' ? '#0ea5e9' : '#94a3b8',
                fontWeight: 700,
                px: 2,
                borderRadius: 2,
                bgcolor: location.pathname === '/characters/crashing-tide' ? 'rgba(14, 165, 233, 0.1)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(14, 165, 233, 0.05)',
                  color: '#0ea5e9'
                }
              }}
            >
              Coral
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
