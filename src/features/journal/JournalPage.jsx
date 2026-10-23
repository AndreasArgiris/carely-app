import { AnimatePresence } from 'framer-motion';
import { NotebookPen } from 'lucide-react';
import { useDateRangeFilter } from '@/shared/hooks/useDateRangeFilter';
import { AnimatedListItem } from '@/shared/ui/AnimatedListItem';
import { DateRangeFilter } from '@/shared/ui/DateRangeFilter';
import { EmptyState } from '@/shared/ui/EmptyState';
import { PageHeader } from '@/shared/ui/PageHeader';
import { Toolbar } from '@/shared/ui/Toolbar';
import { JournalComposer } from './components/JournalComposer';
import { JournalEntry } from './components/JournalEntry';
import { groupByDay, useJournal } from './useJournal';

export function JournalPage() {
  const { entries, addItem, removeItem } = useJournal();
  const { range, setRange, filtered, isActive } = useDateRangeFilter(
    entries,
    (entry) => entry.recordedAt,
  );
  const groups = groupByDay(filtered);

  return (
    <>
      <PageHeader
        eyebrow="Diary"
        title="General notes"
        description="How you feel, symptoms, anything worth telling your doctor — stamped with date and time."
      />
      <JournalComposer onSubmit={addItem} />
      <Toolbar>
        <p className="text-xs font-semibold text-zinc-500">{filtered.length} notes</p>
        <DateRangeFilter range={range} onChange={setRange} isActive={isActive} />
      </Toolbar>
      {groups.length === 0 ? (
        <EmptyState icon={NotebookPen} title="No notes" text="Write your first note above." />
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <section key={group.day}>
              <h2 className="mb-2 text-xs font-bold tracking-wider text-zinc-400 uppercase">
                {group.day}
              </h2>
              <ul className="space-y-2">
                <AnimatePresence initial={false}>
                  {group.entries.map((entry) => (
                    <AnimatedListItem key={entry.id}>
                      <JournalEntry entry={entry} onRemove={removeItem} />
                    </AnimatedListItem>
                  ))}
                </AnimatePresence>
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
