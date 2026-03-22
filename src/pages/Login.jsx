import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <h1>כניסה למערכת מש"ב</h1>
        <p>אב טיפוס של צד משתמש לניהול שיבוצי מילואים וזמינות.</p>

        <label>
          מספר אישי / תעודת זהות
          <input type="text" placeholder="הקלידי מספר אישי" required />
        </label>

        <label>
          סיסמה
          <input type="password" placeholder="הקלידי סיסמה" required />
        </label>

        <label>
          סוג משתמש
          <select defaultValue="מפקד">
            <option>מילואימניק</option>
            <option>מפקד</option>
            <option>שלישות</option>
            <option>פיקוד בכיר</option>
          </select>
        </label>

        <button type="submit">התחברות</button>
      </form>
    </div>
  );
}

export default Login;
