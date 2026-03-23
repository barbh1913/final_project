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
        <h1>כניסה למערכת המילואימניקים</h1>

        <label>
          מספר אישי / תעודת זהות
          <input type="text" placeholder="הקלידי מספר אישי" required />
        </label>

        <label>
          סיסמה
          <input type="password" placeholder="הקלידי סיסמה" required />
        </label>

        
        <button type="submit">התחברות</button>
      </form>
    </div>
  );
}

export default Login;
