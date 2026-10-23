import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Pill, Plus, X } from 'lucide-react';
import { useToggle } from '@/shared/hooks/useToggle';
import { AnimatedListItem } from '@/shared/ui/AnimatedListItem';
import { Button } from '@/shared/ui/Button';
import { Collapse } from '@/shared/ui/Collapse';
import { EmptyState } from '@/shared/ui/EmptyState';
import { PageHeader } from '@/shared/ui/PageHeader';
import { SegmentedControl } from '@/shared/ui/SegmentedControl';
import { Toolbar } from '@/shared/ui/Toolbar';
import { MedicationCard } from './components/MedicationCard';
import { MedicationForm } from './components/MedicationForm';
import { MEDICATION_FILTERS, useMedications } from './useMedications';

const matchesFilter = (filter, medication) =>
  filter === 'all' || (filter === 'active') === !medication.completedAt;

export function MedicationsPage() {
  const { medications, addItem, removeItem, markCompleted, markActive } = useMedications();
  const [filter, setFilter] = useState('active');
  const form = useToggle();
  const visible = medications.filter((medication) => matchesFilter(filter, medication));
  const activeCount = medications.filter((medication) => !medication.completedAt).length;

  const handleAdd = async (medication) => {
    await addItem(medication);
    form.close();
  };

  return (
    <>
      <PageHeader
        eyebrow="Treatment"
        title="Medications"
        description="Dosage, schedule, purpose and side effects of everything you take."
        action={
          <Button onClick={form.toggle}>
            {form.isOn ? <X className="size-4" /> : <Plus className="size-4" />}
            {form.isOn ? 'Close' : 'Add medication'}
          </Button>
        }
      />
      <Collapse isOpen={form.isOn}>
        <MedicationForm onSubmit={handleAdd} />
      </Collapse>
      <Toolbar>
        <SegmentedControl
          label="Medication status"
          options={MEDICATION_FILTERS}
          value={filter}
          onChange={setFilter}
        />
        <p className="text-xs font-semibold text-zinc-500">{activeCount} currently taking</p>
      </Toolbar>
      {visible.length === 0 ? (
        <EmptyState icon={Pill} title="No medications" text="Nothing in this list yet." />
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          <AnimatePresence initial={false}>
            {visible.map((medication) => (
              <AnimatedListItem key={medication.id}>
                <MedicationCard
                  medication={medication}
                  onComplete={markCompleted}
                  onResume={markActive}
                  onRemove={removeItem}
                />
              </AnimatedListItem>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </>
  );
}
