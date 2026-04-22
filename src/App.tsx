import { HashRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemsPage from './pages/ItemsPage';
import PainConduitPage from './pages/PainConduitPage';

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemsPage />} />
          <Route path="/characters/pain-conduit" element={<PainConduitPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;