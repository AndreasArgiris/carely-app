import { GLUCOSE_CONTEXTS } from '@/shared/lib/health';
import { Field, Input, Select } from '@/shared/ui/fields';

const NUMBER_PROPS = { type: 'number', inputMode: 'decimal', step: 'any', min: 0 };

export function BloodPressureFields({ values, onChange }) {
  return (
    <>
      <Field label="Systolic (mmHg)">
        <Input
          {...NUMBER_PROPS}
          name="systolic"
          value={values.systolic}
          onChange={onChange}
          required
          placeholder="120"
        />
      </Field>
      <Field label="Diastolic (mmHg)">
        <Input
          {...NUMBER_PROPS}
          name="diastolic"
          value={values.diastolic}
          onChange={onChange}
          required
          placeholder="80"
        />
      </Field>
      <Field label="Pulse (bpm)">
        <Input
          {...NUMBER_PROPS}
          name="pulse"
          value={values.pulse}
          onChange={onChange}
          placeholder="70"
        />
      </Field>
    </>
  );
}

export function BodyFields({ values, onChange }) {
  return (
    <>
      <Field label="Weight (kg)">
        <Input
          {...NUMBER_PROPS}
          name="weightKg"
          value={values.weightKg}
          onChange={onChange}
          required
          placeholder="78.5"
        />
      </Field>
      <Field label="Body fat (%)">
        <Input
          {...NUMBER_PROPS}
          name="bodyFatPct"
          value={values.bodyFatPct}
          onChange={onChange}
          placeholder="20.4"
        />
      </Field>
    </>
  );
}

export function SingleValueFields({ type, values, onChange }) {
  return (
    <>
      <Field label={`${type.label} (${type.unit})`}>
        <Input
          {...NUMBER_PROPS}
          step={type.step}
          name="value"
          value={values.value}
          onChange={onChange}
          required
          placeholder={type.placeholder}
        />
      </Field>
      {type.kind === 'glucose' && (
        <Field label="When">
          <Select
            name="context"
            value={values.context}
            onChange={onChange}
            options={GLUCOSE_CONTEXTS}
          />
        </Field>
      )}
    </>
  );
}
