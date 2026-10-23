import { useCollection } from '@/shared/hooks/useCollection';
import { daysFromToday, formatDate, sortByDateDesc } from '@/shared/lib/date';
import { createId } from '@/shared/lib/id';

export const MOODS = [
  { value: 'good', label: 'Feeling good', emoji: '🙂' },
  { value: 'okay', label: 'Okay', emoji: '😐' },
  { value: 'unwell', label: 'Unwell', emoji: '🤒' },
];

const journalSeed = [
  {
    id: createId(),
    text: "It's evening, I feel a little dizzy. Skipped lunch today.",
    mood: 'unwell',
    recordedAt: new Date(`${daysFromToday(-1)}T19:40`).toISOString(),
  },
  {
    id: createId(),
    text: '30 min walk in the park, energy levels good.',
    mood: 'good',
    recordedAt: new Date(`${daysFromToday(-3)}T11:10`).toISOString(),
  },
];

/** Groups entries (already sorted newest first) by calendar day. */
export function groupByDay(entries) {
  return entries.reduce((groups, entry) => {
    const day = formatDate(entry.recordedAt);
    const group = groups.at(-1);
    if (group?.day === day) group.entries.push(entry);
    else groups.push({ day, entries: [entry] });
    return groups;
  }, []);
}

export function useJournal() {
  const collection = useCollection('journal', journalSeed);
  return { ...collection, entries: sortByDateDesc(collection.items, (entry) => entry.recordedAt) };
}
