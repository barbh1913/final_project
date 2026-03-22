import PageHeader from '../components/PageHeader';
import { soldiers } from '../data/mockData';

function Availability() {
  return (
    <section>
      <PageHeader
        title="ניהול זמינות"
        subtitle="עדכון וצפייה בזמינות המילואימניקים לפי תאריך ותפקיד."
        action={<button>שמור עדכון</button>}
      />

      <div className="card form-grid">
        <label>
          תאריך
          <input type="date" defaultValue="2026-03-25" />
        </label>
        <label>
          סטטוס זמינות
          <select defaultValue="פנוי">
            <option>פנוי</option>
            <option>פנוי חלקית</option>
            <option>לא פנוי</option>
          </select>
        </label>
        <label className="full-width">
          הערות
          <textarea placeholder="למשל: זמין רק למשמרת לילה"></textarea>
        </label>
      </div>

      <div className="card">
        <h3>רשימת זמינויות</h3>
        <table>
          <thead>
            <tr>
              <th>שם</th>
              <th>תפקיד</th>
              <th>סטטוס</th>
              <th>תאריכים פנויים</th>
            </tr>
          </thead>
          <tbody>
            {soldiers.map((soldier) => (
              <tr key={soldier.id}>
                <td>{soldier.name}</td>
                <td>{soldier.role}</td>
                <td>{soldier.status}</td>
                <td>{soldier.dates.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Availability;
