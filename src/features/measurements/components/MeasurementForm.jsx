import { useFormState } from '@/shared/hooks/useFormState';
import { toInputDateTime } from '@/shared/lib/date';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Field, Input, TextArea } from '@/shared/ui/fields';
import { SegmentedControl } from '@/shared/ui/SegmentedControl';
import { MEASUREMENT_KINDS, findMeasurementType } from '../measurementTypes';
import { BloodPressureFields, BodyFields, SingleValueFields } from './MeasurementFields';

const FORM_KINDS = MEASUREMENT_KINDS.filter((kind) => kind.value !== 'all');

const createInitial = () => ({
  kind: 'bp',
  recordedAt: toInputDateTime(),
  systolic: '',
  diastolic: '',
  pulse: '',
  weightKg: '',
  bodyFatPct: '',
  value: '',
  context: 'fasting',
  note: '',
});

const toNumber = (value) => (value === '' ? null : Number(value));

function toReading(values) {
  if (values.kind === 'bp') {
    return {
      systolic: toNumber(values.systolic),
      diastolic: toNumber(values.diastolic),
      pulse: toNumber(values.pulse),
    };
  }
  if (values.kind === 'body') {
    return { weightKg: toNumber(values.weightKg), bodyFatPct: toNumber(values.bodyFatPct) };
  }
  const { field } = findMeasurementType(values.kind);
  const context = values.kind === 'glucose' ? { context: values.context } : {};
  return { [field]: toNumber(values.value), ...context };
}

function toMeasurement(values) {
  return {
    kind: values.kind,
    recordedAt: new Date(values.recordedAt).toISOString(),
    note: values.note.trim(),
    ...toReading(values),
  };
}

function KindFields({ values, onChange }) {
  if (values.kind === 'bp') return <BloodPressureFields values={values} onChange={onChange} />;
  if (values.kind === 'body') return <BodyFields values={values} onChange={onChange} />;
  const type = findMeasurementType(values.kind);
  return <SingleValueFields type={type} values={values} onChange={onChange} />;
}

export function MeasurementForm({ onSubmit }) {
  const { values, handleChange, setField, reset } = useFormState(createInitial);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(toMeasurement(values));
    reset();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <SegmentedControl
            label="Measurement type"
            options={FORM_KINDS}
            value={values.kind}
            onChange={(kind) => setField('kind', kind)}
          />
        </div>
        <Field label="Date & time">
          <Input
            type="datetime-local"
            name="recordedAt"
            value={values.recordedAt}
            onChange={handleChange}
            required
          />
        </Field>
        <KindFields values={values} onChange={handleChange} />
        <Field label="Note" className="sm:col-span-3">
          <TextArea
            name="note"
            value={values.note}
            onChange={handleChange}
            placeholder="e.g. measured after coffee"
          />
        </Field>
        <div className="sm:col-span-3">
          <Button type="submit">Save measurement</Button>
        </div>
      </form>
    </Card>
  );
}
