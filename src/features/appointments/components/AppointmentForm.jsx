import { useFormState } from '@/shared/hooks/useFormState';
import { daysFromToday, toInputDateTime } from '@/shared/lib/date';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Field, Input, Select, TextArea } from '@/shared/ui/fields';
import { APPOINTMENT_CATEGORIES } from '../useAppointments';

const createInitial = () => ({
  title: '',
  category: 'exam',
  doctor: '',
  location: '',
  scheduledAt: `${daysFromToday(1)}T09:00`,
  details: '',
});

export function AppointmentForm({ onSubmit }) {
  const { values, handleChange, reset } = useFormState(createInitial);
  const isInPast = new Date(values.scheduledAt) < new Date();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isInPast) return;
    await onSubmit({ ...values, title: values.title.trim(), status: 'planned' });
    reset();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <Field label="What is it?" className="sm:col-span-2">
          <Input
            name="title"
            value={values.title}
            onChange={handleChange}
            required
            placeholder="e.g. Leg exam, Cardiologist visit"
          />
        </Field>
        <Field label="Type">
          <Select
            name="category"
            value={values.category}
            onChange={handleChange}
            options={APPOINTMENT_CATEGORIES}
          />
        </Field>
        <Field label="Date & time">
          <Input
            type="datetime-local"
            name="scheduledAt"
            value={values.scheduledAt}
            onChange={handleChange}
            min={toInputDateTime()}
            aria-invalid={isInPast}
            required
          />
          {isInPast && (
            <span role="alert" className="text-[11px] font-semibold text-red-600">
              Planned visits must be in the future.
            </span>
          )}
        </Field>
        <Field label="Doctor / clinic">
          <Input
            name="doctor"
            value={values.doctor}
            onChange={handleChange}
            placeholder="Dr. Smith"
          />
        </Field>
        <Field label="Location">
          <Input
            name="location"
            value={values.location}
            onChange={handleChange}
            placeholder="Hospital, floor, room"
          />
        </Field>
        <Field label="Details" className="sm:col-span-2">
          <TextArea
            name="details"
            value={values.details}
            onChange={handleChange}
            placeholder="Preparation, what to bring, questions to ask…"
          />
        </Field>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={isInPast}>
            Schedule
          </Button>
        </div>
      </form>
    </Card>
  );
}
