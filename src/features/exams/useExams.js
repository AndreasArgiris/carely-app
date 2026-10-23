import { useCollection } from '@/shared/hooks/useCollection';
import { daysFromToday, sortByDateDesc } from '@/shared/lib/date';
import { createId } from '@/shared/lib/id';

const examsSeed = [
  {
    id: createId(),
    title: 'Full blood count',
    examDate: daysFromToday(-12),
    doctor: 'Central Lab',
    note: 'All values in range. Vitamin D slightly low — retest in 3 months.',
    files: [],
  },
  {
    id: createId(),
    title: 'ECG at rest',
    examDate: daysFromToday(-96),
    doctor: 'Dr. Anna Kovacs, cardiology',
    note: 'Sinus rhythm, no abnormalities.',
    files: [],
  },
];

export function useExams() {
  const collection = useCollection('exams', examsSeed);
  return { ...collection, exams: sortByDateDesc(collection.items, (exam) => exam.examDate) };
}
