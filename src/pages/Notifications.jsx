import PageHeader from '../components/PageHeader';
import { shortageReports as initialReports, applications as initialApplications, assignments as initialAssignments, currentUser, soldiers } from '../data/mockData';
import { useState } from 'react';

function Notifications() {
  const [reports, setReports] = useState(initialReports);
  const [applications, setApplications] = useState(initialApplications);
  const [assignments, setAssignments] = useState(initialAssignments);

  const isManager = currentUser.role === 'מנהל מערכת';

  const handleApproveReport = (reportId) => {
    if (!isManager) return;

    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: 'מאושר',
              approvedBy: currentUser.name,
              approvedAt: new Date().toISOString().split('T')[0],
            }
          : r
      )
    );

    // Create assignment in AssignmentBuilder
    const report = reports.find((r) => r.id === reportId);
    if (report) {
      const nextId = Math.max(...assignments.map((a) => a.id)) + 1;
      setAssignments((prev) => [
        ...prev,
        {
          id: nextId,
          fromDate: report.fromDate,
          toDate: report.toDate,
          position: report.position,
          assigned: 'חסר',
          status: 'חוסר',
        },
      ]);
    }

    alert(`דיווח המחסור אושר ויצר שיבוץ פתוח בעמוד יצירת שיבוץ`);
  };

  const handleRejectReport = (reportId) => {
    if (!isManager) return;

    const rejectionReason = prompt('סיבת הדחייה:');
    if (!rejectionReason) return;

    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: 'נדחה',
              rejectedBy: currentUser.name,
              rejectedAt: new Date().toISOString().split('T')[0],
              rejectionReason,
            }
          : r
      )
    );
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

    // Update assignment to approved status
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === application.assignmentId
          ? {
              ...assignment,
              assigned: application.soldierName,
              status: 'מאושר',
            }
          : assignment
      )
    );

    alert(`ההרשמה של ${application.soldierName} אושרה והשיבוץ הפך לפעיל!`);
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
        title="התראות וזימונים"
        subtitle="ניהול דיווחי מחסור והרשמות לשיבוצים"
      />

      {/* טבלת דיווחי מחסור */}
      <div style={{ marginBottom: '30px' }}>
        <h3>דיווחי מחסור</h3>
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>מספר</th>
                <th>מדווח</th>
                <th>מתאריך</th>
                <th>עד תאריך</th>
                <th>תפקיד</th>
                <th>כמות</th>
                <th>סיבה</th>
                <th>סטטוס</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.reporter}</td>
                  <td>{report.fromDate}</td>
                  <td>{report.toDate}</td>
                  <td>{report.position}</td>
                  <td>{report.quantity}</td>
                  <td>{report.reason}</td>
                  <td>
                    <span
                      style={{
                        color: getStatusColor(report.status),
                        fontWeight: 'bold',
                      }}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {isManager && report.status === 'ממתין לאישור' && (
                      <>
                        <button
                          className="secondary-button"
                          onClick={() => handleApproveReport(report.id)}
                          style={{ backgroundColor: '#28a745', color: 'white' }}
                        >
                          אשר
                        </button>
                        <button
                          className="secondary-button"
                          onClick={() => handleRejectReport(report.id)}
                          style={{ backgroundColor: '#dc3545', color: 'white' }}
                        >
                          דחה
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* טבלת שיבוצים והרשמות */}
      <div>
        <h3>שיבוצים והרשמות</h3>
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
                <th>סטטוס</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const soldier = soldiers.find(s => s.id === app.soldierId);
                return (
                  <tr key={app.id}>
                    <td>{app.assignmentId}</td>
                    <td>{app.fromDate}</td>
                    <td>{app.toDate}</td>
                    <td>{app.position}</td>
                    <td>{app.soldierName}</td>
                    <td>{soldier?.phone || '-'}</td>
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
                      {isManager && app.status === 'ממתין לאישור' && (
                        <button
                          className="secondary-button"
                          onClick={() => handleApproveApplication(app.id)}
                          style={{ backgroundColor: '#28a745', color: 'white' }}
                        >
                          אשר שיבוץ
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Notifications;
