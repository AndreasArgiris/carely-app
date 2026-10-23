import { Send } from 'lucide-react';
import { useFormState } from '@/shared/hooks/useFormState';
import { toInputDateTime } from '@/shared/lib/date';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/fields';
import { MOODS } from '../useJournal';

const createInitial = () => ({ text: '', mood: 'okay', recordedAt: toInputDateTime() });

export function JournalComposer({ onSubmit }) {
  const { values, handleChange, setField, reset } = useFormState(createInitial);
  const hasText = values.text.trim().length > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({
      ...values,
      text: values.text.trim(),
      recordedAt: new Date(values.recordedAt).toISOString(),
    });
    reset();
  };

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          name="text"
          value={values.text}
          onChange={handleChange}
          rows={3}
          aria-label="Note"
          placeholder="How are you feeling? e.g. It's evening, I feel a little dizzy…"
          className="w-full resize-none rounded-2xl bg-sun-50/60 p-4 text-sm outline-none placeholder:text-zinc-400 focus:shadow-glow-sm"
        />
        <div className="flex flex-wrap items-center gap-2">
          {MOODS.map((mood) => (
            <button
              key={mood.value}
              type="button"
              aria-pressed={values.mood === mood.value}
              onClick={() => setField('mood', mood.value)}
              className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold transition duration-200 hover:border-zinc-400 hover:bg-sun-50 aria-pressed:border-ink aria-pressed:bg-sun aria-pressed:shadow-glow-sm"
            >
              {mood.emoji} {mood.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <div className="w-52">
              <Input
                type="datetime-local"
                name="recordedAt"
                aria-label="Date and time"
                value={values.recordedAt}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" disabled={!hasText}>
              <Send className="size-4" /> Save
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
