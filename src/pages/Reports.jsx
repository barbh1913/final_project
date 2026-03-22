import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { reportSummary } from '../data/mockData';

function Reports() {
  return (
    <section>
      <PageHeader
        title="דוחות וניתוחים"
        subtitle="תמיכה בקבלת החלטות עבור פיקוד בכיר ושלישות."
      />

      <div className="stats-grid">
        <StatCard title="זמינות ממוצעת" value="76%" />
        <StatCard title="אחוז היענות לזימונים" value="81%" />
        <StatCard title="אחוז נוכחות" value={reportSummary.attendanceRate} />
      </div>

      <div className="card">
        <h3>מה ניתן להציג כאן בהמשך?</h3>
        <ul className="plain-list">
          <li>גרפים של זמינות לפי חודשים</li>
          <li>פילוח חוסרים לפי תפקיד</li>
          <li>השוואה בין יחידות וצוותים</li>
          <li>תחזית עומסים לתעסוקות עתידיות</li>
        </ul>
      </div>
    </section>
  );
}

export default Reports;
