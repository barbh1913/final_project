import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Assignments from './pages/Assignments';
import AssignmentBuilder from './pages/AssignmentBuilder';
import Notifications from './pages/Notifications';
import Users from './pages/Users';
import Profile from './pages/Profile';
import ShortageReport from './pages/ShortageReport';
import OpenAssignments from './pages/OpenAssignments';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/assignment-builder" element={<AssignmentBuilder />} />
        <Route path="/shortage-report" element={<ShortageReport />} />
        <Route path="/open-assignments" element={<OpenAssignments />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
