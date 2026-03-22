import PageHeader from '../components/PageHeader';
import { soldiers } from '../data/mockData';

function Users() {
  return (
    <section>
      <PageHeader
        title="ניהול משתמשים"
        subtitle="מסך של שלישות לניהול משתמשים, תפקידים והרשאות."
        action={<button>הוסף משתמש</button>}
      />

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>שם</th>
              <th>תפקיד</th>
              <th>סטטוס</th>
              <th>פעולה</th>
            </tr>
          </thead>
          <tbody>
            {soldiers.map((soldier) => (
              <tr key={soldier.id}>
                <td>{soldier.name}</td>
                <td>{soldier.role}</td>
                <td>{soldier.status}</td>
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

export default Users;
