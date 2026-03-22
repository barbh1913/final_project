import PageHeader from '../components/PageHeader';
import { notifications } from '../data/mockData';

function Notifications() {
  return (
    <section>
      <PageHeader
        title="התראות וזימונים"
        subtitle="קבלת זימונים, אישור שיבוץ והתראות על חוסרים."
      />

      <div className="card">
        {notifications.map((item) => (
          <div key={item.id} className="notification-item bordered">
            <div>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </div>
            <div className="actions-inline">
              <button className="secondary-button">אישור</button>
              <button className="secondary-button">דחייה</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Notifications;
