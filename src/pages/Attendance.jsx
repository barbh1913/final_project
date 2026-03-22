import PageHeader from '../components/PageHeader';
import { attendance } from '../data/mockData';

function Attendance() {
  return (
    <section>
      <PageHeader
        title="דיווח נוכחות"
        subtitle="סימון מי הגיע בפועל לתעסוקה ושמירת מאגר היסטורי."
        action={<button>שמור דיווח</button>}
      />

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>שם</th>
              <th>תאריך</th>
              <th>הגיע?</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>
                  <input type="checkbox" defaultChecked={item.arrived} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Attendance;
