import { Trash2 } from 'lucide-react';
import { formatTime } from '@/shared/lib/date';
import { Button } from '@/shared/ui/Button';
import { MOODS } from '../useJournal';

export function JournalEntry({ entry, onRemove }) {
  const mood = MOODS.find((item) => item.value === entry.mood);

  return (
    <div className="group flex gap-4 rounded-2xl border border-zinc-100 bg-white p-4 transition hover:shadow-card">
      <div className="w-12 shrink-0 text-center">
        <p className="text-xs font-bold tabular-nums">{formatTime(entry.recordedAt)}</p>
        {mood && (
          <p className="mt-1 text-lg" title={mood.label} aria-label={mood.label}>
            {mood.emoji}
          </p>
        )}
      </div>
      <p className="flex-1 text-sm whitespace-pre-line text-zinc-700">{entry.text}</p>
      <Button
        variant="danger"
        size="sm"
        aria-label="Delete note"
        onClick={() => onRemove(entry.id)}
        className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
      >
        <Trash2 className="size-3.5" />
      </Button>
    </div>
  );
}
