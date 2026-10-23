export function StatTile({ label, value, unit }) {
  return (
    <div className="rounded-2xl bg-zinc-50 px-3 py-2.5">
      <p className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">{label}</p>
      <p className="mt-0.5 truncate text-base font-extrabold tabular-nums">
        {value ?? '—'}
        {value != null && unit && (
          <span className="ml-0.5 text-xs font-semibold text-zinc-400">{unit}</span>
        )}
      </p>
    </div>
  );
}
