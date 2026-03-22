import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'דשבורד' },
  { to: '/availability', label: 'זמינות' },
  { to: '/assignments', label: 'שיבוצים' },
  { to: '/assignment-builder', label: 'יצירת שיבוץ' },
  { to: '/attendance', label: 'נוכחות' },
  { to: '/notifications', label: 'התראות' },
  { to: '/reports', label: 'דוחות' },
  { to: '/users', label: 'משתמשים' },
  { to: '/profile', label: 'פרופיל' },
];

function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>מש"ב</h2>
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
      </aside>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
