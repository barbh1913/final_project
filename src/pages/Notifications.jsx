import { useOutletContext } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

function Notifications() {
  const { 
    applications, setApplications, 
    assignments, setAssignments,
    currentUser 
  } = useOutletContext();

  // בדיקה גמישה יותר - אם המילה 'מפקד' או 'מנהל' מופיעה בתפקיד
  const isManager = currentUser?.role?.includes('מנהל');
  const isCommander = currentUser?.role?.includes('מפקד');

  const handleApproveApplication = (applicationId) => {
    const application = applications.find(app => app.id === applicationId);
    if (!application) return;

    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: 'מאושר' } : app
      )
    );

    setAssignments((prev) =>
      prev.map((asn) =>
        asn.id === application.assignmentId
          ? { ...asn, assigned: application.soldierName, status: 'מאושר' }
          : asn
      )
    );

    alert(`ההרשמה של ${application.soldierName} אושרה!`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ממתין לאישור': return '#ffa500';
      case 'מאושר': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <section>
      <PageHeader title="התראות וזימונים" subtitle="ניהול בקשות והרשמות" />
      
      {/* כפתור עזר זמני לדיבאג - אם אתה לא רואה כפתור אישור, תלחץ עליו ותגיד לי מה הוא כותב */}
      <button 
        onClick={() => alert(`משתמש: ${currentUser.name}\nתפקיד: ${currentUser.role}\nisCommander: ${isCommander}`)}
        style={{ fontSize: '10px', marginBottom: '10px', opacity: 0.5 }}
      >
        בדיקת הרשאות (דיבאג)
      </button>

      <div className="card">
        <h3>בקשות ממתינות לאישור ({applications.length})</h3>
        <table style={{ width: '100%', textAlign: 'right' }}>
          <thead>
            <tr>
              <th>חייל</th>
              <th>תאריכים</th>
              <th>סטטוס</th>
              <th>פעולה</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.soldierName}</td>
                <td>{app.fromDate} - {app.toDate}</td>
                <td style={{ color: getStatusColor(app.status), fontWeight: 'bold' }}>
                  {app.status}
                </td>
                <td>
                  {/* הסרתי זמנית את בדיקת ה-isManager רק כדי שתראה אם הכפתור מופיע */}
                  {app.status === 'ממתין לאישור' ? (
                    <button 
                      onClick={() => handleApproveApplication(app.id)}
                      style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      אשר שיבוץ
                    </button>
                  ) : (
                    <span>בוצע</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Notifications;