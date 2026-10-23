import { formatDateTime, formatDuration } from '@/shared/lib/date';

function TimelineEntry({ label, value }) {
  return (
    <div>
      <dt className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">{label}</dt>
      <dd className="text-xs font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

export function MedicationTimeline({ startedAt, completedAt }) {
  const isActive = !completedAt;

  return (
    <dl className="flex flex-wrap gap-x-6 gap-y-2 rounded-2xl bg-zinc-50 px-4 py-3">
      <TimelineEntry label="Started" value={formatDateTime(startedAt)} />
      {isActive ? (
        <TimelineEntry label="Taking for" value={formatDuration(startedAt)} />
      ) : (
        <>
          <TimelineEntry label="Completed" value={formatDateTime(completedAt)} />
          <TimelineEntry label="Duration" value={formatDuration(startedAt, completedAt)} />
        </>
      )}
    </dl>
  );
}
