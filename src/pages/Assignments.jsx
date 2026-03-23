import PageHeader from '../components/PageHeader';
import { assignments as initialAssignments, soldiers } from '../data/mockData';
import { useState } from 'react';

function Assignments() {
  const [assignments] = useState(initialAssignments);

  // Filter only approved assignments
  const activeAssignments = assignments.filter(item => item.status === 'מאושר');

  // Get soldier details for each assignment
  const assignmentsWithDetails = activeAssignments.map(assignment => {
    const soldier = soldiers.find(s => s.name === assignment.assigned);
    return {
      ...assignment,
      soldierDetails: soldier || null,
    };
  });

  return (
    <section>
      <PageHeader
        title="שיבוצים פעילים"
        subtitle="צפייה בשיבוצים מאושרים עם פרטי המילואימניקים והתאריכים."
      />

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>מתאריך</th>
              <th>עד תאריך</th>
              <th>תפקיד</th>
              <th>מילואימניק</th>
              <th>טלפון</th>
              <th>יחידה</th>
              <th>דרגה</th>
              <th>סטטוס</th>
            </tr>
          </thead>
          <tbody>
            {assignmentsWithDetails.length === 0 ? (
              <tr>
                <td colSpan="8">אין שיבוצים פעילים</td>
              </tr>
            ) : (
              assignmentsWithDetails.map((item) => (
                <tr key={item.id}>
                  <td>{item.fromDate}</td>
                  <td>{item.toDate}</td>
                  <td>{item.position}</td>
                  <td>{item.assigned}</td>
                  <td>{item.soldierDetails?.phone || '-'}</td>
                  <td>{item.soldierDetails?.unit || '-'}</td>
                  <td>{item.soldierDetails?.rank || '-'}</td>
                  <td>
                    <span style={{ color: '#28a745', fontWeight: 'bold' }}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Assignments;
