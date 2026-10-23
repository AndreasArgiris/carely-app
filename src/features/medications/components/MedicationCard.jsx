import { AlertTriangle, CheckCircle2, Pill, RotateCcw, Target, Trash2 } from 'lucide-react';
import { toInputDateTime } from '@/shared/lib/date';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { formatFrequency } from '../useMedications';
import { MedicationTimeline } from './MedicationTimeline';

function Detail({ icon: Icon, label, text }) {
  if (!text) return null;
  return (
    <p className="flex gap-2 text-sm text-zinc-600">
      <Icon className="mt-0.5 size-4 shrink-0 text-zinc-400" aria-hidden />
      <span>
        <span className="font-semibold text-ink">{label}: </span>
        {text}
      </span>
    </p>
  );
}

export function MedicationCard({ medication, onComplete, onResume, onRemove }) {
  const isActive = !medication.completedAt;
  const handleComplete = () => onComplete(medication.id, toInputDateTime());

  return (
    <article
      className={`flex h-full flex-col gap-4 rounded-3xl border bg-white p-5 transition ${isActive ? 'border-sun-300 shadow-card' : 'border-zinc-100'}`}
    >
      <header className="flex items-start gap-3">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-2xl ${isActive ? 'bg-sun shadow-glow-sm' : 'bg-zinc-100'}`}
        >
          <Pill className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold">{medication.name}</h3>
          <p className="text-sm text-zinc-500">
            {medication.dose} ·{' '}
            {formatFrequency(medication.frequencyCount, medication.frequencyPeriod)}
          </p>
        </div>
        <Badge tone={isActive ? 'sun' : 'ink'}>{isActive ? 'Still taking' : 'Completed'}</Badge>
      </header>
      <div className="space-y-2">
        <Detail icon={Target} label="Purpose" text={medication.purpose} />
        <Detail icon={AlertTriangle} label="Side effects" text={medication.sideEffects} />
      </div>
      <MedicationTimeline startedAt={medication.startedAt} completedAt={medication.completedAt} />
      <footer className="mt-auto flex gap-2">
        {isActive ? (
          <Button size="sm" onClick={handleComplete}>
            <CheckCircle2 className="size-3.5" /> Mark completed
          </Button>
        ) : (
          <Button size="sm" variant="outline" onClick={() => onResume(medication.id)}>
            <RotateCcw className="size-3.5" /> Still taking
          </Button>
        )}
        <Button
          size="sm"
          variant="danger"
          aria-label="Delete medication"
          onClick={() => onRemove(medication.id)}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </footer>
    </article>
  );
}
