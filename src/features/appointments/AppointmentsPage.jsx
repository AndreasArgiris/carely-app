import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CalendarClock, Plus, X } from 'lucide-react';
import { useDateRangeFilter } from '@/shared/hooks/useDateRangeFilter';
import { useToggle } from '@/shared/hooks/useToggle';
import { AnimatedListItem } from '@/shared/ui/AnimatedListItem';
import { Button } from '@/shared/ui/Button';
import { Collapse } from '@/shared/ui/Collapse';
import { DateRangeFilter } from '@/shared/ui/DateRangeFilter';
import { EmptyState } from '@/shared/ui/EmptyState';
import { PageHeader } from '@/shared/ui/PageHeader';
import { SegmentedControl } from '@/shared/ui/SegmentedControl';
import { Toolbar } from '@/shared/ui/Toolbar';
import { AppointmentCard } from './components/AppointmentCard';
import { AppointmentForm } from './components/AppointmentForm';
import { STATUS_FILTERS, useAppointments } from './useAppointments';

export function AppointmentsPage() {
  const { appointments, nextAppointment, addItem, removeItem, setStatus } = useAppointments();
  const [status, setStatusFilter] = useState('planned');
  const form = useToggle();
  const byStatus = appointments.filter((item) => status === 'all' || item.status === status);
  const { range, setRange, filtered, isActive } = useDateRangeFilter(
    byStatus,
    (item) => item.scheduledAt,
  );

  const handleAdd = async (appointment) => {
    await addItem(appointment);
    form.close();
  };

  return (
    <>
      <PageHeader
        eyebrow="Planning"
        title="Planned exams & visits"
        description="Upcoming medical exams and doctor appointments."
        action={
          <Button onClick={form.toggle}>
            {form.isOn ? <X className="size-4" /> : <Plus className="size-4" />}
            {form.isOn ? 'Close' : 'Plan new'}
          </Button>
        }
      />
      <Collapse isOpen={form.isOn}>
        <AppointmentForm onSubmit={handleAdd} />
      </Collapse>
      <Toolbar>
        <SegmentedControl
          label="Status"
          options={STATUS_FILTERS}
          value={status}
          onChange={setStatusFilter}
        />
        <DateRangeFilter range={range} onChange={setRange} isActive={isActive} />
      </Toolbar>
      {filtered.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          title="Nothing here"
          text="Plan an exam or a doctor visit to see it here."
        />
      ) : (
        <ul className="space-y-3">
          <AnimatePresence initial={false}>
            {filtered.map((appointment) => (
              <AnimatedListItem key={appointment.id}>
                <AppointmentCard
                  appointment={appointment}
                  isNext={appointment.id === nextAppointment?.id}
                  onStatusChange={setStatus}
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
