import { formatDateTime } from '@/shared/lib/date';

export function ChartTooltip({ active, payload, unit }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;

  return (
    <div className="rounded-2xl border border-zinc-100 bg-white px-3 py-2 text-xs shadow-glow">
      <p className="mb-1 font-semibold text-zinc-500">{formatDateTime(point.recordedAt)}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ background: entry.stroke }} />
          <span className="text-zinc-500">{entry.name}</span>
          <span className="ml-auto font-bold tabular-nums">
            {entry.value} {unit}
          </span>
        </p>
      ))}
    </div>
  );
}
