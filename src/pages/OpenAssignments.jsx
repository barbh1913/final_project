import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { assignments, soldiers, currentUser, applications as initialApplications, notifications as initialNotifications } from '../data/mockData';

function OpenAssignments() {
  const [applications, setApplications] = useState(initialApplications);
  const [notifications, setNotifications] = useState(initialNotifications);

  const isManager = currentUser.role === 'מנהל מערכת';
  const isSoldier = currentUser.role === 'לוחם' || currentUser.role === 'נהג' || currentUser.role === 'חובש' || currentUser.role === 'מילואימניק';

  // Get current soldier details (for soldiers)
  const currentSoldier = soldiers.find(s => s.name === currentUser.name);

  const handleApply = (assignmentId) => {
    if (!currentSoldier) return;

    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return;

    const nextId = applications.length ? Math.max(...applications.map(a => a.id)) + 1 : 1;

    const newApplication = {
      id: nextId,
      soldierId: currentSoldier.id,
      soldierName: currentSoldier.name,
      assignmentId: assignment.id,
      position: assignment.position,
      fromDate: assignment.fromDate,
      toDate: assignment.toDate,
      appliedAt: new Date().toISOString().split('T')[0],
      status: 'ממתין לאישור',
    };

    setApplications(prev => [...prev, newApplication]);

    // Add notification for commanders about new application
    const nextNotificationId = notifications.length ? Math.max(...notifications.map(n => n.id)) + 1 : 1;
    const newNotification = {
      id: nextNotificationId,
      title: 'הרשמה חדשה לשיבוץ',
      body: `המילואימניק ${currentSoldier.name} נרשם לשיבוץ פתוח לתפקיד ${assignment.position} (${assignment.fromDate} - ${assignment.toDate}).`,
      type: 'info',
    };
    setNotifications(prev => [...prev, newNotification]);

    alert(`ההרשמה שלך לשיבוץ ${assignment.position} (${assignment.fromDate} - ${assignment.toDate}) נשלחה בהצלחה!`);
  };

  const handleApproveApplication = (applicationId) => {
    if (!isManager) return;

    const application = applications.find(app => app.id === applicationId);
    if (!application) return;

    // Update application status
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId
          ? {
              ...app,
              status: 'מאושר',
              approvedAt: new Date().toISOString().split('T')[0],
            }
          : app
      )
    );

    alert(`ההרשמה של ${application.soldierName} אושרה!`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ממתין לאישור':
        return '#ffa500';
      case 'מאושר':
        return '#28a745';
      case 'נדחה':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <section>
      <PageHeader
        title={isManager ? "ניהול שיבוצים והרשמות" : "שיבוצים פתוחים"}
        subtitle={
          isManager
            ? "שיבוצים פתוחים והרשמות ממתינות לאישור"
            : currentSoldier
              ? `שיבוצים פתוחים לתפקיד ${currentSoldier.role} שזמינים להרשמה`
              : "שיבוצים פתוחים"
        }
      />

      {isManager ? (
        // Manager view - show assignments with applications
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>מספר שיבוץ</th>
                <th>מתאריך</th>
                <th>עד תאריך</th>
                <th>תפקיד</th>
                <th>מילואימניק</th>
                <th>טלפון</th>
                <th>תאריך הרשמה</th>
                <th>סטטוס הרשמה</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {assignments
                .filter(assignment => assignment.status === 'חוסר')
                .map((assignment) => {
                  const assignmentApplications = applications.filter(app => app.assignmentId === assignment.id);
                  return assignmentApplications.length > 0 ? (
                    assignmentApplications.map((app) => (
                      <tr key={`${assignment.id}-${app.id}`}>
                        <td>{assignment.id}</td>
                        <td>{assignment.fromDate}</td>
                        <td>{assignment.toDate}</td>
                        <td>{assignment.position}</td>
                        <td>{app.soldierName}</td>
                        <td>{soldiers.find(s => s.id === app.soldierId)?.phone || '-'}</td>
                        <td>{app.appliedAt}</td>
                        <td>
                          <span
                            style={{
                              color: getStatusColor(app.status),
                              fontWeight: 'bold',
                            }}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td>
                          {app.status === 'ממתין לאישור' && (
                            <button
                              className="secondary-button"
                              onClick={() => handleApproveApplication(app.id)}
                              style={{ backgroundColor: '#28a745', color: 'white' }}
                            >
                              אשר הרשמה
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key={assignment.id}>
                      <td>{assignment.id}</td>
                      <td>{assignment.fromDate}</td>
                      <td>{assignment.toDate}</td>
                      <td>{assignment.position}</td>
                      <td colSpan="4">אין הרשמות עדיין</td>
                      <td>-</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : currentSoldier ? (
        // Soldier view - show assignments for application
        <>
          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>מתאריך</th>
                  <th>עד תאריך</th>
                  <th>תפקיד</th>
                  <th>סטטוס</th>
                  <th>פעולה</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const openAssignments = assignments.filter(assignment =>
                    assignment.status === 'חוסר' &&
                    assignment.position === currentSoldier.role
                  );

                  const assignmentsWithApplicationStatus = openAssignments.map(assignment => {
                    const hasApplied = applications.some(app =>
                      app.soldierId === currentSoldier.id &&
                      app.assignmentId === assignment.id
                    );
                    return {
                      ...assignment,
                      hasApplied,
                    };
                  });

                  return assignmentsWithApplicationStatus.length === 0 ? (
                    <tr>
                      <td colSpan="5">אין שיבוצים פתוחים לתפקיד שלך כרגע</td>
                    </tr>
                  ) : (
                    assignmentsWithApplicationStatus.map((assignment) => (
                      <tr key={assignment.id}>
                        <td>{assignment.fromDate}</td>
                        <td>{assignment.toDate}</td>
                        <td>{assignment.position}</td>
                        <td>
                          <span style={{ color: '#dc3545', fontWeight: 'bold' }}>
                            {assignment.status}
                          </span>
                        </td>
                        <td>
                          {assignment.hasApplied ? (
                            <span style={{ color: '#28a745', fontWeight: 'bold' }}>
                              נרשמת ✓
                            </span>
                          ) : (
                            <button
                              className="secondary-button"
                              onClick={() => handleApply(assignment.id)}
                              style={{ backgroundColor: '#007bff', color: 'white' }}
                            >
                              הירשם
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  );
                })()}
              </tbody>
            </table>
          </div>

          {applications.filter(app => app.soldierId === currentSoldier.id).length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3>הרשמות שלי</h3>
              <div className="card">
                <table>
                  <thead>
                    <tr>
                      <th>תפקיד</th>
                      <th>מתאריך</th>
                      <th>עד תאריך</th>
                      <th>תאריך הרשמה</th>
                      <th>סטטוס</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications
                      .filter(app => app.soldierId === currentSoldier.id)
                      .map((app) => (
                        <tr key={app.id}>
                          <td>{app.position}</td>
                          <td>{app.fromDate}</td>
                          <td>{app.toDate}</td>
                          <td>{app.appliedAt}</td>
                          <td>
                            <span style={{ color: getStatusColor(app.status), fontWeight: 'bold' }}>
                              {app.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="card">
          <p>לא נמצאו פרטי מילואימניק עבור המשתמש הנוכחי.</p>
        </div>
      )}
    </section>
  );
}

export default OpenAssignments;