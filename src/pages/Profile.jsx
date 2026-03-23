import PageHeader from '../components/PageHeader';
import { currentUser } from '../data/mockData';

function Profile() {
  return (
    <section>
      <PageHeader
        title="פרופיל משתמש"
      />

      <div className="card profile-grid">
        <div><strong>שם:</strong> {currentUser.name}</div>
        <div><strong>דרגה:</strong> {currentUser.rank}</div>
        <div><strong>תפקיד:</strong> {currentUser.role}</div>
        <div><strong>יחידה:</strong> {currentUser.unit}</div>
        <div><strong>טלפון:</strong> {currentUser.phone}</div>
        <div><strong>מייל:</strong> {currentUser.email}</div>
      </div>
    </section>
  );
}

export default Profile;
