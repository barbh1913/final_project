import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { soldiers, roles as availableRoles } from '../data/mockData';

function Users() {
  const [users, setUsers] = useState(soldiers);
  const [selectedUserIds, setSelectedUserIds] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(availableRoles[0]);
  const [unit, setUnit] = useState('');
  const [rank, setRank] = useState('');

  const openModalForAdd = () => {
    setEditingUser(null);
    setName('');
    setPhone('');
    setEmail('');
    setRole(availableRoles[0]);
    setUnit('');
    setRank('');
    setIsModalOpen(true);
  };

  const openModalForEdit = (user) => {
    setEditingUser(user);
    setName(user.name || '');
    setPhone(user.phone || '');
    setEmail(user.email || '');
    setRole(user.role || availableRoles[0]);
    setUnit(user.unit || '');
    setRank(user.rank || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleSelectUser = (userId) => {
    setSelectedUserIds((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedUserIds.size === users.length) {
      setSelectedUserIds(new Set());
    } else {
      setSelectedUserIds(new Set(users.map((u) => u.id)));
    }
  };

  // bulk delete users (selected rows)
  const handleDeleteSelected = () => {
    if (!selectedUserIds.size) return;
    if (window.confirm(`למחוק ${selectedUserIds.size} משתמשים?`)) {
      setUsers((prev) => prev.filter((u) => !selectedUserIds.has(u.id)));
      setSelectedUserIds(new Set());
    }
  };

  // bulk reset password for selected users
  const handleResetPasswordSelected = () => {
    if (!selectedUserIds.size) return;
    const names = users.filter((u) => selectedUserIds.has(u.id)).map((u) => u.name);
    alert(`סיסמה אופסה ל: ${names.join(', ')}`);
    setSelectedUserIds(new Set());
  };

  // open edit modal when exactly one user is selected
  const handleEditSelected = () => {
    if (selectedUserIds.size !== 1) return;
    const userId = Array.from(selectedUserIds)[0];
    const user = users.find((u) => u.id === userId);
    if (user) openModalForEdit(user);
  };

  // save new user or update existing user
  const handleSaveUser = () => {
    if (!name.trim() || !phone.trim() || !email.trim() || !unit.trim() || !rank.trim()) {
      alert('יש למלא את כל השדות: שם, טלפון, מייל, תפקיד, יחידה, דרגה');
      return;
    }

    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                name: name.trim(),
                phone: phone.trim(),
                email: email.trim(),
                role,
                unit: unit.trim(),
                rank: rank.trim(),
              }
            : u
        )
      );
    } else {
      const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      setUsers((prev) => [
        ...prev,
        {
          id: nextId,
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          role,
          unit: unit.trim(),
          rank: rank.trim(),
        },
      ]);
    }

    closeModal();
  };

  // reset password for single user only (UI-only action)
  const handleResetPassword = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    alert(`סיסמה של ${user.name} אופסה בהצלחה`);
  };

  // delete single user from the list
  const handleDeleteUser = (userId) => {
    if (window.confirm('למחוק משתמש זה?')) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    }
  };

  return (
    <section>
      <PageHeader
        title="ניהול משתמשים"
        subtitle="מסך של שלישות לניהול משתמשים, תפקידים והרשאות."
        action={
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={openModalForAdd}>הוסף משתמש</button>
          </div>
        }
      />

      {selectedUserIds.size > 0 && (
        <div style={{ marginBottom: '12px', backgroundColor: '#f5f5f5', border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}>
          <strong>{`נבחרו ${selectedUserIds.size} משתמשים`}</strong>
          <div style={{ display: 'inline-flex', gap: '8px', marginLeft: '12px' }}>
            <button onClick={handleEditSelected} disabled={selectedUserIds.size !== 1}>
              ערוך
            </button>
            <button onClick={handleResetPasswordSelected}>איפוס סיסמה</button>
            <button onClick={handleDeleteSelected}>מחיקה</button>
            <button onClick={() => setSelectedUserIds(new Set())}>נקה בחירה</button>
          </div>
        </div>
      )}

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked={selectedUserIds.size === users.length && users.length > 0} onChange={selectAll} />
              </th>
              <th>שם</th>
              <th>טלפון</th>
              <th>מייל</th>
              <th>תפקיד</th>
              <th>יחידה</th>
              <th>דרגה</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUserIds.has(user.id)}
                    onChange={() => toggleSelectUser(user.id)}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.phone || '-'}</td>
                <td>{user.email || '-'}</td>
                <td>{user.role}</td>
                <td>{user.unit || '-'}</td>
                <td>{user.rank || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', minWidth: '320px', maxWidth: '520px' }}>
            <h2>{editingUser ? 'ערוך משתמש' : 'הוסף משתמש'}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <input type="text" placeholder="שם משתמש" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" placeholder="טלפון" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input type="email" placeholder="מייל" value={email} onChange={(e) => setEmail(e.target.value)} />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                {availableRoles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <input type="text" placeholder="יחידה" value={unit} onChange={(e) => setUnit(e.target.value)} />
              <input type="text" placeholder="דרגה" value={rank} onChange={(e) => setRank(e.target.value)} />
            </div>
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button onClick={closeModal}>בטל</button>
              <button onClick={handleSaveUser}>שמור</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Users;
