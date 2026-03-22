import PageHeader from '../components/PageHeader';
import { soldiers } from '../data/mockData';

function AssignmentBuilder() {
  const matchingSoldiers = soldiers.filter((soldier) => soldier.status !== 'לא פנוי');

  return (
    <section>
      <PageHeader
        title="יצירת שיבוץ חדש"
        subtitle="מסך המדגים דרישות תפקיד והצעת התאמות אוטומטיות."
        action={<button>בצע שיבוץ אוטומטי</button>}
      />

      <div className="card form-grid">
        <label>
          תאריך
          <input type="date" defaultValue="2026-03-25" />
        </label>
        <label>
          תפקיד
          <select defaultValue="לוחם">
            <option>לוחם</option>
            <option>נהג</option>
            <option>חובש</option>
          </select>
        </label>
        <label>
          כמות נדרשת
          <input type="number" defaultValue="2" min="1" />
        </label>
        <label>
          הערות
          <input type="text" placeholder="למשל: נדרש ניסיון קודם" />
        </label>
      </div>

      <div className="card">
        <h3>התאמות מוצעות</h3>
        {matchingSoldiers.map((soldier) => (
          <div key={soldier.id} className="list-row">
            <span>{soldier.name}</span>
            <span>{soldier.role}</span>
            <span>{soldier.status}</span>
            <button className="secondary-button">אשר</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AssignmentBuilder;
