export const currentUser = {
  id: 1,
  name: 'בר בן חמו',
  role: 'מפקדת צוות',
  unit: 'יחידת מילואים 101',
  rank: 'סרן',
  phone: '050-1234567',
  email: 'bar@example.com',
};

export const soldiers = [
  { id: 1, name: 'דניאל כהן', role: 'לוחם', phone: '050-1111111', email: 'daniel@example.com', unit: 'יחידה 101', rank: 'סמל', dates: ['2026-03-25', '2026-03-26'] },
  { id: 2, name: 'יוסי לוי', role: 'נהג', phone: '050-2222222', email: 'yossi@example.com', unit: 'יחידה 102', rank: 'סרן', dates: ['2026-03-28'] },
  { id: 3, name: 'אורן מזרחי', role: 'חובש', phone: '050-3333333', email: 'oren@example.com', unit: 'יחידה 103', rank: 'רב סמל', dates: ['2026-03-25'] },
  { id: 4, name: 'נדב תנעמי', role: 'לוחם', phone: '050-4444444', email: 'nadav@example.com', unit: 'יחידה 104', rank: 'סגן', dates: ['2026-03-27', '2026-03-28'] },
];

export const users = soldiers;

// role options are now provided from mock DB data
export const roles = ['מנהל מערכת', 'משבץ', 'מפקד', 'מילואימניק'];

export const assignments = [
  { id: 101, fromDate: '2026-03-25', toDate: '2026-03-25', position: 'לוחם', assigned: 'דניאל כהן', status: 'מאושר' },
  { id: 102, fromDate: '2026-03-25', toDate: '2026-03-26', position: 'חובש', assigned: 'אורן מזרחי', status: 'מאושר' },
  { id: 103, fromDate: '2026-03-28', toDate: '2026-03-28', position: 'נהג', assigned: 'יוסי לוי', status: 'מאושר' },
  { id: 104, fromDate: '2026-03-27', toDate: '2026-03-29', position: 'לוחם', assigned: 'נדב תנעמי', status: 'מאושר' },
  { id: 105, fromDate: '2026-03-26', toDate: '2026-03-26', position: 'חובש', assigned: 'חסר', status: 'חוסר' },
];

export const notifications = [
  { id: 1, title: 'שיבוץ חדש לתאריך 25/03', body: 'שובצת לתפקיד לוחם במשמרת ערב.', type: 'info' },
  { id: 2, title: 'חוסר בכוח אדם', body: 'חסר נהג לתאריך 28/03.', type: 'warning' },
  { id: 3, title: 'דיווח נוכחות נסגר', body: 'יש להשלים דיווח נוכחות עד 22:00.', type: 'success' },
  { id: 4, title: 'דיווח מחסור אושר', body: 'דיווח המחסור שלך לתפקיד נהג (25-26/03) אושר ויצר שיבוץ פתוח.', type: 'success' },
  { id: 5, title: 'שיבוץ פתוח זמין', body: 'שיבוץ פתוח לתפקיד לוחם בתאריכים 27-29/03.', type: 'info' },
  { id: 6, title: 'הרשמה לשיבוץ', body: 'המילואימניק נדב תנעמי נרשם לשיבוץ הפתוח שלך.', type: 'info' },
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

export const shortageReports = [
  {
    id: 1,
    reporter: 'בר בן חמו',
    reporterRole: 'מפקדת צוות',
    fromDate: '2026-03-25',
    toDate: '2026-03-26',
    position: 'נהג',
    quantity: 2,
    reason: 'חוסר מתוכנן בגלל מחלה',
    status: 'מאושר',
    createdAt: '2026-03-20',
    approvedBy: 'מנהל מערכת',
    approvedAt: '2026-03-23',
  },
  {
    id: 2,
    reporter: 'בר בן חמו',
    reporterRole: 'מפקדת צוות',
    fromDate: '2026-03-28',
    toDate: '2026-03-28',
    position: 'לוחם',
    quantity: 1,
    reason: 'חוסר לא צפוי',
    status: 'מאושר',
    createdAt: '2026-03-22',
    approvedBy: 'מנהל מערכת',
    approvedAt: '2026-03-23',
  },
  {
    id: 3,
    reporter: 'בר בן חמו',
    reporterRole: 'מפקדת צוות',
    fromDate: '2026-03-27',
    toDate: '2026-03-27',
    position: 'חובש',
    quantity: 1,
    reason: 'חוסר בגלל חופשה',
    status: 'נדחה',
    createdAt: '2026-03-21',
    rejectedBy: 'מנהל מערכת',
    rejectedAt: '2026-03-22',
    rejectionReason: 'אין תקציב נוסף',
  },
];

export const applications = [
  {
    id: 1,
    soldierId: 4, // נדב תנעמי
    soldierName: 'נדב תנעמי',
    assignmentId: 104, // שיבוץ לוחם 27-29/03
    position: 'לוחם',
    fromDate: '2026-03-27',
    toDate: '2026-03-29',
    appliedAt: '2026-03-23',
    status: 'ממתין לאישור',
  },
];
