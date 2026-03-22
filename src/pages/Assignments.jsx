import PageHeader from '../components/PageHeader';
import { assignments } from '../data/mockData';

function Assignments() {
  return (
    <section>
      <PageHeader
        title="שיבוצים פעילים"
        subtitle="צפייה, עריכה ובקרה על כל השיבוצים שנוצרו במערכת."
      />

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>תאריך</th>
              <th>תפקיד</th>
              <th>משובץ</th>
              <th>סטטוס</th>
              <th>פעולה</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.position}</td>
                <td>{item.assigned}</td>
                <td>{item.status}</td>
                <td>
                  <button className="secondary-button">עריכה</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Assignments;
