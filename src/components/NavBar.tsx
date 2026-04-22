import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="nav-inner">
        <div className="nav-brand">
          <span className="nav-logo">❄️</span>
          <span className="nav-title">Frosthaven Helper</span>
        </div>
        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">🎒</span>
            Items
          </NavLink>
          <NavLink to="/characters/pain-conduit" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">⚔️</span>
            Characters
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
