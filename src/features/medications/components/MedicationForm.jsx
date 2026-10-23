import { useFormState } from '@/shared/hooks/useFormState';
import { toInputDateTime } from '@/shared/lib/date';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Field, Input, Select, TextArea } from '@/shared/ui/fields';
import { FREQUENCY_PERIODS } from '../useMedications';

const createInitial = () => ({
  name: '',
  dose: '',
  frequencyCount: '1',
  frequencyPeriod: 'day',
  purpose: '',
  sideEffects: '',
  startedAt: toInputDateTime(),
});

export function MedicationForm({ onSubmit }) {
  const { values, handleChange, reset } = useFormState(createInitial);
  const isAsNeeded = values.frequencyPeriod === 'as-needed';

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({
      ...values,
      name: values.name.trim(),
      frequencyCount: Number(values.frequencyCount),
      completedAt: null,
    });
    reset();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-4">
        <Field label="Medication" className="sm:col-span-2">
          <Input
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            placeholder="e.g. Ibuprofen"
          />
        </Field>
        <Field label="How much" className="sm:col-span-2">
          <Input
            name="dose"
            value={values.dose}
            onChange={handleChange}
            required
            placeholder="e.g. 400 mg, 1 tablet"
          />
        </Field>
        <Field label="Times">
          <Input
            type="number"
            min={1}
            name="frequencyCount"
            value={values.frequencyCount}
            onChange={handleChange}
            disabled={isAsNeeded}
          />
        </Field>
        <Field label="Period">
          <Select
            name="frequencyPeriod"
            value={values.frequencyPeriod}
            onChange={handleChange}
            options={FREQUENCY_PERIODS}
          />
        </Field>
        <Field label="Started" className="sm:col-span-2">
          <Input
            type="datetime-local"
            name="startedAt"
            value={values.startedAt}
            onChange={handleChange}
            required
          />
        </Field>
        <Field label="Purpose" className="sm:col-span-2">
          <TextArea
            name="purpose"
            value={values.purpose}
            onChange={handleChange}
            placeholder="Why are you taking it?"
          />
        </Field>
        <Field label="Possible side effects" className="sm:col-span-2">
          <TextArea
            name="sideEffects"
            value={values.sideEffects}
            onChange={handleChange}
            placeholder="What to watch out for"
          />
        </Field>
        <div className="sm:col-span-4">
          <Button type="submit">Add medication</Button>
        </div>
      </form>
    </Card>
  );
}
