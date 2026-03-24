import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
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

// ייבוא הנתונים הראשוניים
import * as mock from './data/mockData';

function App() {
  // ניהול הסטייט המרכזי של האפליקציה
  const [reports, setReports] = useState(mock.shortageReports);
  const [assignments, setAssignments] = useState(mock.assignments);
  const [applications, setApplications] = useState(mock.applications);

  // אובייקט שמאגד את כל הנתונים והפונקציות לעדכון
  const contextValue = {
    reports, setReports,
    assignments, setAssignments,
    applications, setApplications,
    soldiers: mock.soldiers,
    currentUser: mock.currentUser
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout context={contextValue} />}>
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