import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Stack, 
  Container,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function NavBar() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenSearch = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSearch = () => {
    setAnchorEl(null);
  };


  const navItems = [
    { label: 'Items', path: '/', icon: '🎒', color: '#38bdf8' },
    { label: 'Shackles', path: '/characters/pain-conduit', iconImg: '/frosthaven-items/assets/characters/pain-conduit/icon.png', color: '#ec4899' },
    { label: 'Meteor', path: '/characters/pyroclast', iconImg: '/frosthaven-items/assets/characters/pyroclast/icon.png', color: '#f97316' },
    { label: 'Coral', path: '/characters/crashing-tide', iconImg: '/frosthaven-items/assets/characters/crashing-tide/icon.png', color: '#0ea5e9' },
    { label: 'Infuser', path: '/characters/infuser', iconImg: '/frosthaven-items/assets/characters/infuser/icon.png', color: '#10b981' },
  ];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: 'rgba(15, 23, 42, 0.95)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'none',
        backgroundImage: 'none',
        zIndex: 1200
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
                letterSpacing: '.05rem',
                color: 'inherit',
                textDecoration: 'none',
                fontFamily: 'Space Grotesk',
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}
            >
              Frosthaven Helper
            </Typography>
          </Stack>

          {isMobile ? (
            <Box>
              <IconButton
                size="large"
                aria-label="navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenSearch}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseSearch}
                sx={{
                  '& .MuiPaper-root': {
                    bgcolor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.1)',
                    minWidth: 200,
                    mt: 1
                  }
                }}
              >
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <MenuItem 
                      key={item.path} 
                      onClick={handleCloseSearch}
                      component={NavLink}
                      to={item.path}
                      sx={{
                        color: isActive ? item.color : '#94a3b8',
                        fontWeight: 700,
                        gap: 1.5,
                        py: 1.5,
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.05)',
                          color: item.color
                        }
                      }}
                    >
                      {item.iconImg ? (
                        <img 
                          src={item.iconImg} 
                          alt={item.label} 
                          style={{ 
                            width: 20, 
                            height: 20, 
                            filter: isActive ? 'none' : 'brightness(0) invert(1)' 
                          }} 
                        />
                      ) : (
                        <span>{item.icon}</span>
                      )}
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
          ) : (
            <Stack direction="row" spacing={1}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    component={NavLink}
                    to={item.path}
                    startIcon={
                      item.iconImg ? (
                        <img 
                          src={item.iconImg} 
                          alt={item.label} 
                          style={{ 
                            width: 20, 
                            height: 20, 
                            filter: 'brightness(0) invert(1)' 
                          }} 
                        />
                      ) : (
                        <span>{item.icon}</span>
                      )
                    }
                    sx={{
                      color: isActive ? item.color : '#94a3b8',
                      fontWeight: 700,
                      px: 2,
                      borderRadius: 2,
                      bgcolor: isActive ? `${item.color}1A` : 'transparent',
                      '&:hover': {
                        bgcolor: `${item.color}0D`,
                        color: item.color
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
