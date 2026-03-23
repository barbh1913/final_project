import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { currentUser } from '../data/mockData';

const baseLinks = [
  { to: '/dashboard', label: 'דשבורד' },
  { to: '/assignments', label: 'שיבוצים' },
  { to: '/assignment-builder', label: 'יצירת שיבוץ' },
  { to: '/notifications', label: 'התראות' },
  { to: '/users', label: 'משתמשים' },
  { to: '/profile', label: 'פרופיל' },
];

const commanderLinks = [
  { to: '/shortage-report', label: 'דיווח מחסור' },
  { to: '/open-assignments', label: 'שיבוצים והרשמות' },
];

const soldierLinks = [
  { to: '/open-assignments', label: 'שיבוצים פתוחים' },
];

function Layout() {
  const navigate = useNavigate();

  const isCommander = currentUser.role === 'מפקדת צוות' || currentUser.role === 'מפקד';
  const isManager = currentUser.role === 'מנהל מערכת';
  const isSoldier = currentUser.role === 'לוחם' || currentUser.role === 'נהג' || currentUser.role === 'חובש' || currentUser.role === 'מילואימניק';

  const links = [
    ...baseLinks,
    ...(isCommander || isManager ? commanderLinks : []),
    ...(isSoldier ? soldierLinks : []),
  ];

  const handleLogout = () => {
    // אם יש צורך לנקות session או token אפשר לעשות פה
    navigate('/');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>המילואימניקים</h2>
        <p className="sidebar-subtitle">מערכת שיבוץ ביטחונית</p>
        <nav>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button className="logout-button" onClick={handleLogout} style={{ marginTop: '16px' }}>
          התנתק
        </button>
      </aside>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
