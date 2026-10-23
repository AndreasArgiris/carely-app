import { useCollection } from '@/shared/hooks/useCollection';
import { daysFromToday, sortByDateDesc } from '@/shared/lib/date';
import { createId } from '@/shared/lib/id';

export const FREQUENCY_PERIODS = [
  { value: 'day', label: 'per day' },
  { value: 'week', label: 'per week' },
  { value: 'month', label: 'per month' },
  { value: 'as-needed', label: 'as needed' },
];

export const MEDICATION_FILTERS = [
  { value: 'active', label: 'Still taking' },
  { value: 'completed', label: 'Completed' },
  { value: 'all', label: 'All' },
];

const medicationsSeed = [
  {
    id: createId(),
    name: 'Amlodipine',
    dose: '5 mg',
    frequencyCount: 1,
    frequencyPeriod: 'day',
    purpose: 'Blood pressure control',
    sideEffects: 'Ankle swelling, flushing, headache',
    startedAt: `${daysFromToday(-140)}T08:00`,
    completedAt: null,
  },
  {
    id: createId(),
    name: 'Vitamin D3',
    dose: '50,000 IU',
    frequencyCount: 1,
    frequencyPeriod: 'month',
    purpose: 'Vitamin D deficiency',
    sideEffects: 'Rare: nausea, constipation',
    startedAt: `${daysFromToday(-12)}T09:00`,
    completedAt: null,
  },
  {
    id: createId(),
    name: 'Amoxicillin',
    dose: '500 mg',
    frequencyCount: 3,
    frequencyPeriod: 'day',
    purpose: 'Sinus infection',
    sideEffects: 'Diarrhoea, rash',
    startedAt: `${daysFromToday(-64)}T08:00`,
    completedAt: `${daysFromToday(-57)}T20:00`,
  },
];

export function formatFrequency(count, period) {
  if (period === 'as-needed') return 'As needed';
  const times = Number(count) === 1 ? 'Once' : Number(count) === 2 ? 'Twice' : `${count} times`;
  return `${times} a ${period}`;
}

export function useMedications() {
  const collection = useCollection('medications', medicationsSeed);
  const medications = sortByDateDesc(collection.items, (item) => item.startedAt);

  return {
    ...collection,
    medications,
    markCompleted: (id, completedAt) => collection.updateItem(id, { completedAt }),
    markActive: (id) => collection.updateItem(id, { completedAt: null }),
  };
}
