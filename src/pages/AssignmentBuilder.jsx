import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { assignments as allAssignments } from '../data/mockData';

function AssignmentBuilder() {
  const [fromDate, setFromDate] = useState('2026-03-25');
  const [toDate, setToDate] = useState('2026-03-26');
  const [position, setPosition] = useState('לוחם');
  const [quantity, setQuantity] = useState(2);
  const [notes, setNotes] = useState('');
  const [assignments, setAssignments] = useState(allAssignments);

  // open (unassigned) positions from assignments data
  const openPositions = assignments.filter((item) => item.status === 'חוסר');

  const handleCreate = () => {
    if (!fromDate || !toDate || !position || quantity < 1) {
      alert('אנא מלא את כל השדות הנדרשים');
      return;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      alert('טווח תאריכים לא תקין: תאריך התחלה חייב להיות לפני סיום');
      return;
    }

    const nextId = assignments.length
      ? Math.max(...assignments.map((item) => item.id)) + 1
      : 1000;

    const newItem = {
      id: nextId,
      fromDate,
      toDate,
      position,
      quantity,
      notes,
      assigned: 'חסר',
      status: 'חוסר',
    };

    setAssignments((prev) => [...prev, newItem]);
    setNotes('');
    alert('השיבוץ נוצר בהצלחה ויוצג ברשימת התקנים הפתוחים');
  };

  return (
    <section>
      <PageHeader
        title="יצירת שיבוץ חדש"
        subtitle="דווח על תפקיד שנדרש עבורו שיבוץ מילואימניק"
      />

      <div className="card form-grid">
        <label>
          מתאריך
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </label>
        <label>
          עד תאריך
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
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
          <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
        </label>
        <label>
          הערות
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="למשל: נדרש ניסיון קודם" />
        </label>
      </div>

      <div style={{ marginTop: '12px' }}>
        <button onClick={handleCreate}>צור</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>תקנים פתוחים שלא מאויישים</h3>
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>מספר</th>
                <th>מתאריך</th>
                <th>עד תאריך</th>
                <th>תפקיד</th>
                <th>כמות</th>
                <th>הערות</th>
              </tr>
            </thead>
            <tbody>
              {openPositions.length === 0 ? (
                <tr>
                  <td colSpan="7">אין תקנים פתוחים</td>
                </tr>
              ) : (
                openPositions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.fromDate}</td>
                    <td>{item.toDate}</td>
                    <td>{item.position}</td>
                    <td>{item.quantity || 1}</td>
                    <td>{item.notes || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default AssignmentBuilder;
