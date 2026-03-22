import PageHeader from '../components/PageHeader';
import { currentUser } from '../data/mockData';

function Profile() {
  return (
    <section>
      <PageHeader
        title="פרופיל משתמש"
        subtitle="עדכון פרטים אישיים ותצוגת מידע בסיסי על המשתמש המחובר."
      />

      <div className="card profile-grid">
        <div><strong>שם:</strong> {currentUser.name}</div>
        <div><strong>דרגה:</strong> {currentUser.rank}</div>
        <div><strong>תפקיד:</strong> {currentUser.role}</div>
        <div><strong>יחידה:</strong> {currentUser.unit}</div>
        <div><strong>טלפון:</strong> {currentUser.phone}</div>
      </div>
    </section>
  );
}

export default Profile;
