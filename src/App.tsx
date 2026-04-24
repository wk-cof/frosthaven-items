import { HashRouter, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import NavBar from './components/NavBar';
import ItemsPage from './pages/ItemsPage';
import PainConduitPage from './pages/PainConduitPage';
import PyroclastPage from './pages/PyroclastPage';
import CrashingTidePage from './pages/CrashingTidePage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#38bdf8',
    },
    background: {
      default: '#0f172a',
      paper: 'rgba(30, 41, 59, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Space Grotesk", sans-serif' },
    h2: { fontFamily: '"Space Grotesk", sans-serif' },
    h3: { fontFamily: '"Space Grotesk", sans-serif' },
    h4: { fontFamily: '"Space Grotesk", sans-serif' },
    h5: { fontFamily: '"Space Grotesk", sans-serif' },
    h6: { fontFamily: '"Space Grotesk", sans-serif' },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <HashRouter>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemsPage />} />
            <Route path="/characters/pain-conduit" element={<PainConduitPage />} />
            <Route path="/characters/pyroclast" element={<PyroclastPage />} />
            <Route path="/characters/crashing-tide" element={<CrashingTidePage />} />
          </Routes>
        </Box>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;