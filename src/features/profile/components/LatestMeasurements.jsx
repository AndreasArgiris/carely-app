import { Link } from 'react-router-dom';
import { describeMeasurement } from '@/features/measurements/measurementTypes';
import { formatDateTime, formatRelativeDay } from '@/shared/lib/date';
import { Badge } from '@/shared/ui/Badge';

function LatestHighlight({ item }) {
  const { type, value, unit, reading } = describeMeasurement(item);
  const Icon = type.icon;

  return (
    <div className="rounded-2xl border border-sun-300 bg-sun-50 p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
          <Icon className="size-3.5" /> Latest · {type.label}
        </p>
        {reading && <Badge tone={reading.isNormal ? 'soft' : 'neutral'}>{reading.label}</Badge>}
      </div>
      <p className="text-3xl font-extrabold tracking-tight tabular-nums">
        {value}
        <span className="ml-1 text-xs font-semibold text-zinc-500">{unit}</span>
      </p>
      <p className="mt-1 text-xs text-zinc-500">
        {formatDateTime(item.recordedAt)} · {formatRelativeDay(item.recordedAt)}
      </p>
    </div>
  );
}

function LatestRow({ item }) {
  const { type, value, unit } = describeMeasurement(item);
  const Icon = type.icon;

  return (
    <li className="flex items-center gap-2.5 py-2 text-xs">
      <Icon className="size-3.5 shrink-0 text-zinc-400" aria-label={type.label} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">
          <span className="tabular-nums">{value}</span>{' '}
          <span className="font-normal text-zinc-400">{unit}</span>
        </p>
        <p className="text-[11px] text-zinc-400">{formatDateTime(item.recordedAt)}</p>
      </div>
    </li>
  );
}

export function LatestMeasurements({ latest, latestByKind }) {
  if (!latest) {
    return <p className="text-xs text-zinc-400">No measurements recorded yet.</p>;
  }
  const others = latestByKind.filter((item) => item.id !== latest.id);

  return (
    <section aria-label="Latest measurements" className="space-y-2">
      <LatestHighlight item={latest} />
      {others.length > 0 && (
        <div className="rounded-2xl border border-zinc-100 px-3 py-1">
          <div className="flex items-center justify-between pt-2">
            <p className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
              Last by type
            </p>
            <Link
              to="/measurements"
              className="rounded-full px-2 py-0.5 text-[11px] font-semibold hover:bg-sun-100"
            >
              All
            </Link>
          </div>
          <ul className="divide-y divide-zinc-100">
            {others.map((item) => (
              <LatestRow key={item.id} item={item} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
