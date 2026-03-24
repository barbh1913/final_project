import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { shortageReports as initialReports, currentUser, assignments as allAssignments, soldiers } from '../data/mockData';

function ShortageReport() {
  const [reports, setReports] = useState(initialReports);
  const [assignments, setAssignments] = useState(allAssignments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  
  // States לטופס
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [position, setPosition] = useState('לוחם');
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState('');

  const isCommander = currentUser.role === 'מפקדת צוות' || currentUser.role === 'מפקד';
  const isManager = currentUser.role === 'מנהל מערכת';

  const openModalForAdd = () => {
    setEditingReport(null);
    setFromDate('');
    setToDate('');
    setPosition('לוחם');
    setQuantity(1);
    setReason('');
    setIsModalOpen(true);
  };

  const openModalForEdit = (report) => {
    setEditingReport(report);
    setFromDate(report.fromDate || '');
    setToDate(report.toDate || '');
    setPosition(report.position || 'לוחם');
    setQuantity(report.quantity || 1);
    setReason(report.reason || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveReport = () => {
    // וולידציה פונקציונלית - שדות ריקים
    if (!fromDate || !toDate || !position || quantity < 1 || !reason.trim()) {
      alert('יש למלא את כל השדות: מתאריך, עד תאריך, תפקיד, כמות, סיבה');
      return;
    }

    // וולידציה פונקציונלית - תקינות תאריכים
    if (new Date(fromDate) > new Date(toDate)) {
      alert('טווח תאריכים לא תקין: תאריך התחלה חייב להיות לפני סיום');
      return;
    }

    if (editingReport) {
      // עדכון דיווח קיים
      setReports((prev) =>
        prev.map((r) =>
          r.id === editingReport.id
            ? {
                ...r,
                fromDate,
                toDate,
                position,
                quantity,
                reason: reason.trim(),
                status: 'ממתין לאישור' // החזרת סטטוס לבדיקה מחדש לאחר עריכה
              }
            : r
        )
      );
    } else {
      // הוספת דיווח חדש
      const nextId = reports.length ? Math.max(...reports.map((r) => r.id)) + 1 : 1;
      setReports((prev) => [
        ...prev,
        {
          id: nextId,
          reporter: currentUser.name,
          reporterRole: currentUser.role,
          fromDate,
          toDate,
          position,
          quantity,
          reason: reason.trim(),
          status: 'ממתין לאישור',
          createdAt: new Date().toISOString().split('T')[0],
        },
      ]);
    }

    closeModal();
  };

  const handleApprove = (reportId) => {
    if (!isManager) return;

    // 1. עדכון סטטוס הדיווח בטבלה
    let targetReport = null;
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          targetReport = { ...r, status: 'מאושר' };
          return {
            ...targetReport,
            approvedBy: currentUser.name,
            approvedAt: new Date().toISOString().split('T')[0],
          };
        }
        return r;
      })
    );

    // 2. יצירת שיבוץ פונקציונלי חדש במערכת
    const report = reports.find(r => r.id === reportId);
    if (report) {
      const nextAssignmentId = assignments.length ? Math.max(...assignments.map((a) => a.id)) + 1 : 1;
      
      const newAssignment = {
        id: nextAssignmentId,
        fromDate: report.fromDate,
        toDate: report.toDate,
        position: report.position,
        assigned: 'חסר', // נוצר כשיבוץ ריק לאיוש
        status: 'חוסר'   // סטטוס שיגרום לזה להופיע בדשבורד כבעיה פתוחה
      };

      setAssignments((prev) => [...prev, newAssignment]);
      alert(`הדיווח אושר. נוצר שיבוץ חדש (ID: ${nextAssignmentId}) לתפקיד ${report.position}`);
    }
  };

  const handleReject = (reportId) => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'ממתין לאישור': return '#ffa500';
      case 'מאושר': return '#28a745';
      case 'נדחה': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <section>
      <PageHeader
        title="ניהול שיבוצים ומחסור"
        subtitle="דיווחי מחסור ואישור שיבוצים"
        action={
          isCommander ? (
            <button onClick={openModalForAdd}>דווח על מחסור</button>
          ) : null
        }
      />

      <div>
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
                          onClick={() => handleApprove(report.id)}
                          style={{ backgroundColor: '#28a745', color: 'white' }}
                        >
                          אשר
                        </button>
                        <button
                          className="secondary-button"
                          onClick={() => handleReject(report.id)}
                          style={{ backgroundColor: '#dc3545', color: 'white' }}
                        >
                          דחה
                        </button>
                      </>
                    )}
                    {isCommander && report.status === 'ממתין לאישור' && report.reporter === currentUser.name && (
                      <button
                        className="secondary-button"
                        onClick={() => openModalForEdit(report)}
                      >
                        ערוך
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '24px',
              borderRadius: '8px',
              minWidth: '400px',
              maxWidth: '600px',
            }}
          >
            <h2>{editingReport ? 'ערוך דיווח מחסור' : 'דיווח על מחסור בכוח אדם'}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <label>
                מתאריך
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </label>
              <label>
                עד תאריך
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </label>
              <label>
                תפקיד
                <select value={position} onChange={(e) => setPosition(e.target.value)}>
                  <option>לוחם</option>
                  <option>נהג</option>
                  <option>חובש</option>
                </select>
              </label>
              <label>
                כמות נדרשת
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </label>
              <label style={{ gridColumn: 'span 2' }}>
                סיבה
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="למשל: חוסר מתוכנן בגלל מחלה"
                  style={{ width: '100%' }}
                />
              </label>
            </div>
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button onClick={closeModal}>בטל</button>
              <button onClick={handleSaveReport}>שמור</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ShortageReport;