import { Trash2 } from 'lucide-react';
import { formatDate, formatTime } from '@/shared/lib/date';
import { GLUCOSE_CONTEXTS } from '@/shared/lib/health';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { describeMeasurement, findMeasurementType } from '../measurementTypes';

function ReadingBadge({ reading }) {
  if (!reading) return null;
  return <Badge tone={reading.isNormal ? 'soft' : 'neutral'}>{reading.label}</Badge>;
}

function extraDetail(item) {
  if (item.kind === 'bp' && item.pulse) return `${item.pulse} bpm`;
  if (item.kind === 'body' && item.bodyFatPct != null) return `${item.bodyFatPct}% fat`;
  return GLUCOSE_CONTEXTS.find((option) => option.value === item.context)?.label;
}

function MeasurementValue({ item, isLatest }) {
  const { value, reading, type } = describeMeasurement(item);
  const unit = { bp: 'mmHg', body: 'kg' }[item.kind] ?? type.unit;
  const detail = extraDetail(item);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-lg font-extrabold tabular-nums">{value}</span>
      <span className="text-xs text-zinc-400">{unit}</span>
      {detail && <span className="text-xs text-zinc-500">· {detail}</span>}
      <ReadingBadge reading={reading} />
      {isLatest && <Badge tone="sun">Latest</Badge>}
    </div>
  );
}

export function MeasurementRow({ item, isLatest = false, onRemove }) {
  const type = findMeasurementType(item.kind);
  const Icon = type.icon;

  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border bg-white p-4 transition hover:shadow-card ${isLatest ? 'border-sun-300 shadow-glow-sm' : 'border-zinc-100'}`}
    >
      <span
        className="grid size-10 shrink-0 place-items-center rounded-xl bg-sun-50"
        title={type.label}
      >
        <Icon className="size-4.5" aria-label={type.label} />
      </span>
      <div className="min-w-0 flex-1">
        <MeasurementValue item={item} isLatest={isLatest} />
        {item.note && <p className="mt-0.5 truncate text-xs text-zinc-500">{item.note}</p>}
      </div>
      <div className="text-right text-xs">
        <p className="font-semibold">{formatDate(item.recordedAt)}</p>
        <p className="text-zinc-400">{formatTime(item.recordedAt)}</p>
      </div>
      <Button
        variant="danger"
        size="sm"
        aria-label="Delete measurement"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 className="size-3.5" />
      </Button>
    </div>
  );
}
