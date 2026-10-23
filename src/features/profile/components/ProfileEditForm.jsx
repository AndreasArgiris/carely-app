import { useFormState } from '@/shared/hooks/useFormState';
import { Button } from '@/shared/ui/Button';
import { Field, Input, Select } from '@/shared/ui/fields';
import { SEX_OPTIONS } from '../useProfile';

export function ProfileEditForm({ profile, onSave, onCancel }) {
  const { values, handleChange } = useFormState(() => profile);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSave({ ...values, heightCm: Number(values.heightCm) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Field label="Full name">
        <Input name="fullName" value={values.fullName} onChange={handleChange} required />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Birth date">
          <Input
            type="date"
            name="birthDate"
            value={values.birthDate}
            onChange={handleChange}
            required
          />
        </Field>
        <Field label="Sex">
          <Select name="sex" value={values.sex} onChange={handleChange} options={SEX_OPTIONS} />
        </Field>
        <Field label="Height (cm)">
          <Input
            type="number"
            min={50}
            max={250}
            name="heightCm"
            value={values.heightCm}
            onChange={handleChange}
            required
          />
        </Field>
        <Field label="Blood type">
          <Input name="bloodType" value={values.bloodType} onChange={handleChange} />
        </Field>
      </div>
      <Field label="Insurance number">
        <Input name="insuranceNumber" value={values.insuranceNumber} onChange={handleChange} />
      </Field>
      <Field
        label="Country you live in"
        hint="Weight & body fat come from your latest measurement."
      >
        <Input name="country" value={values.country} onChange={handleChange} />
      </Field>
      <div className="flex gap-2">
        <Button type="submit" size="sm">
          Save
        </Button>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
