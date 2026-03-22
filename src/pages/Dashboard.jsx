import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { assignments, notifications, reportSummary } from '../data/mockData';

function Dashboard() {
  return (
    <section>
      <PageHeader
        title="דשבורד ניהולי"
        subtitle="תמונת מצב מהירה של זמינות, שיבוצים, חוסרים והתראות."
      />

      <div className="stats-grid">
        <StatCard title="כוח אדם פנוי" value={reportSummary.totalAvailable} />
        <StatCard title="שיבוצים פתוחים" value={reportSummary.openAssignments} />
        <StatCard title="חוסרים" value={reportSummary.shortages} />
        <StatCard title="אחוז נוכחות" value={reportSummary.attendanceRate} />
      </div>

      <div className="two-columns">
        <div className="card">
          <h3>שיבוצים קרובים</h3>
          {assignments.map((item) => (
            <div key={item.id} className="list-row">
              <span>{item.date}</span>
              <span>{item.position}</span>
              <span>{item.assigned}</span>
              <span className="badge">{item.status}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <h3>התראות אחרונות</h3>
          {notifications.map((item) => (
            <div key={item.id} className="notification-item">
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
