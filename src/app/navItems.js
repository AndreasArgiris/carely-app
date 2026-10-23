import {
  Activity,
  CalendarClock,
  FileHeart,
  LayoutDashboard,
  NotebookPen,
  Pill,
} from 'lucide-react';

export const NAV_ITEMS = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/exams', label: 'Exam history', icon: FileHeart },
  { to: '/appointments', label: 'Planned visits', icon: CalendarClock },
  { to: '/measurements', label: 'Measurements', icon: Activity },
  { to: '/medications', label: 'Medications', icon: Pill },
  { to: '/notes', label: 'General notes', icon: NotebookPen },
];
