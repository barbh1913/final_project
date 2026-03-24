import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// הסרנו את currentUser מה-mockData כי עכשיו הוא מגיע מה-Context ב-App
import { currentUser as mockUser } from '../data/mockData'; 

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

// שים לב: הוספנו { context } בתוך הסוגריים כדי לקבל את הנתונים מ-App.jsx
function Layout({ context }) {
  const navigate = useNavigate();

  // משתמשים ביוזר שמגיע מהקונטקסט (ואם הוא לא קיים, לוקחים מהמוק כגיבוי)
  const user = context?.currentUser || mockUser;

  const isCommander = user.role === 'מפקדת צוות' || user.role === 'מפקד';
  const isManager = user.role === 'מנהל מערכת';
  const isSoldier = user.role === 'לוחם' || user.role === 'נהג' || user.role === 'חובש' || user.role === 'מילואימניק';

  const links = [
    ...baseLinks,
    ...(isCommander || isManager ? commanderLinks : []),
    ...(isSoldier ? soldierLinks : []),
  ];

  const handleLogout = () => {
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

        <button className="logout-button" onClick={handleLogout} style={{ marginTop: 'auto' }}>
          התנתק
        </button>
      </aside>

      <main className="content-area">
        {/* השורה הקריטית: מעבירים את ה-context לתוך ה-Outlet */}
        <Outlet context={context} />
      </main>
    </div>
  );
}

export default Layout;