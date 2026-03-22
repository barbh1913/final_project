function StatCard({ title, value }) {
  return (
    <div className="card stat-card">
      <span className="muted">{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default StatCard;
