export const currentUser = {
  id: 1,
  name: 'בר בן חמו',
  role: 'מפקדת צוות',
  unit: 'יחידת מילואים 101',
  rank: 'סרן',
  phone: '050-1234567',
};

export const soldiers = [
  { id: 1, name: 'דניאל כהן', role: 'לוחם', status: 'פנוי', dates: ['2026-03-25', '2026-03-26'] },
  { id: 2, name: 'יוסי לוי', role: 'נהג', status: 'לא פנוי', dates: ['2026-03-28'] },
  { id: 3, name: 'אורן מזרחי', role: 'חובש', status: 'פנוי חלקית', dates: ['2026-03-25'] },
  { id: 4, name: 'נדב תנעמי', role: 'לוחם', status: 'פנוי', dates: ['2026-03-27', '2026-03-28'] },
];

export const assignments = [
  { id: 101, date: '2026-03-25', position: 'לוחם', assigned: 'דניאל כהן', status: 'מאושר' },
  { id: 102, date: '2026-03-25', position: 'חובש', assigned: 'אורן מזרחי', status: 'ממתין לאישור' },
  { id: 103, date: '2026-03-28', position: 'נהג', assigned: 'חסר', status: 'חוסר' },
];

export const notifications = [
  { id: 1, title: 'שיבוץ חדש לתאריך 25/03', body: 'שובצת לתפקיד לוחם במשמרת ערב.', type: 'info' },
  { id: 2, title: 'חוסר בכוח אדם', body: 'חסר נהג לתאריך 28/03.', type: 'warning' },
  { id: 3, title: 'דיווח נוכחות נסגר', body: 'יש להשלים דיווח נוכחות עד 22:00.', type: 'success' },
];

export const attendance = [
  { id: 1, name: 'דניאל כהן', date: '2026-03-25', arrived: true },
  { id: 2, name: 'אורן מזרחי', date: '2026-03-25', arrived: false },
  { id: 3, name: 'נדב תנעמי', date: '2026-03-27', arrived: true },
];

export const reportSummary = {
  totalAvailable: 9,
  openAssignments: 4,
  shortages: 1,
  attendanceRate: '87%',
};
