import { AnimatePresence } from 'framer-motion';
import { FileSearch, Plus, X } from 'lucide-react';
import { useDateRangeFilter } from '@/shared/hooks/useDateRangeFilter';
import { useToggle } from '@/shared/hooks/useToggle';
import { AnimatedListItem } from '@/shared/ui/AnimatedListItem';
import { Button } from '@/shared/ui/Button';
import { Collapse } from '@/shared/ui/Collapse';
import { DateRangeFilter } from '@/shared/ui/DateRangeFilter';
import { EmptyState } from '@/shared/ui/EmptyState';
import { PageHeader } from '@/shared/ui/PageHeader';
import { Toolbar } from '@/shared/ui/Toolbar';
import { ExamCard } from './components/ExamCard';
import { ExamForm } from './components/ExamForm';
import { useExams } from './useExams';

export function ExamsPage() {
  const { exams, addItem, removeItem } = useExams();
  const form = useToggle();
  const { range, setRange, filtered, isActive } = useDateRangeFilter(
    exams,
    (exam) => exam.examDate,
  );

  const handleAdd = async (exam) => {
    await addItem(exam);
    form.close();
  };

  return (
    <>
      <PageHeader
        eyebrow="Records"
        title="Medical exam history"
        description="Every result in one timeline — attach the PDFs and keep notes."
        action={
          <Button onClick={form.toggle}>
            {form.isOn ? <X className="size-4" /> : <Plus className="size-4" />}
            {form.isOn ? 'Close' : 'Add exam'}
          </Button>
        }
      />
      <Collapse isOpen={form.isOn}>
        <ExamForm onSubmit={handleAdd} />
      </Collapse>
      <Toolbar>
        <p className="text-xs font-semibold text-zinc-500">
          {filtered.length} of {exams.length} exams
        </p>
        <DateRangeFilter range={range} onChange={setRange} isActive={isActive} />
      </Toolbar>
      {filtered.length === 0 ? (
        <EmptyState
          icon={FileSearch}
          title="No exams found"
          text="Try another date range or add a new exam."
        />
      ) : (
        <ul className="relative space-y-4 before:absolute before:top-2 before:bottom-2 before:left-[6px] before:w-px before:bg-zinc-200">
          <AnimatePresence initial={false}>
            {filtered.map((exam) => (
              <AnimatedListItem key={exam.id}>
                <ExamCard exam={exam} onRemove={removeItem} />
              </AnimatedListItem>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </>
  );
}
