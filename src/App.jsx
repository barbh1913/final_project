import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Availability from './pages/Availability';
import Assignments from './pages/Assignments';
import AssignmentBuilder from './pages/AssignmentBuilder';
import Attendance from './pages/Attendance';
import Notifications from './pages/Notifications';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/assignment-builder" element={<AssignmentBuilder />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
