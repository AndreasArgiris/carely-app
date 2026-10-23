import { useCollection } from '@/shared/hooks/useCollection';
import { daysFromToday } from '@/shared/lib/date';
import { createId } from '@/shared/lib/id';

export const APPOINTMENT_CATEGORIES = [
  { value: 'exam', label: 'Medical exam' },
  { value: 'visit', label: 'Doctor visit' },
];

export const STATUS_FILTERS = [
  { value: 'planned', label: 'Upcoming' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'all', label: 'All' },
];

const appointmentsSeed = [
  {
    id: createId(),
    title: 'Leg vein ultrasound',
    category: 'exam',
    doctor: 'Dr. Lina Weber',
    location: 'City Vascular Clinic, room 4',
    scheduledAt: `${daysFromToday(4)}T09:30`,
    details: 'Doppler exam of both legs. Wear loose trousers.',
    status: 'planned',
  },
  {
    id: createId(),
    title: 'Annual check-up',
    category: 'visit',
    doctor: 'Dr. Marco Ruiz (GP)',
    location: 'Family practice',
    scheduledAt: `${daysFromToday(19)}T16:00`,
    details: 'Bring blood pressure log and medication list.',
    status: 'planned',
  },
  {
    id: createId(),
    title: 'Full blood count',
    category: 'exam',
    doctor: 'Central Lab',
    location: 'Ground floor',
    scheduledAt: `${daysFromToday(-12)}T08:00`,
    details: 'Fasting from midnight.',
    status: 'completed',
  },
];

const byScheduledAt = (a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt);

export function selectNextAppointment(items, now = new Date()) {
  return (
    items
      .filter((item) => item.status === 'planned' && new Date(item.scheduledAt) >= now)
      .sort(byScheduledAt)[0] ?? null
  );
}

export function useAppointments() {
  const collection = useCollection('appointments', appointmentsSeed);
  const appointments = [...collection.items].sort(byScheduledAt);

  return {
    ...collection,
    appointments,
    nextAppointment: selectNextAppointment(appointments),
    setStatus: (id, status) => collection.updateItem(id, { status }),
  };
}
