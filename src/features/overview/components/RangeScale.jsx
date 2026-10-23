import { motion } from 'framer-motion';

const clampPercent = (value) => Math.min(100, Math.max(0, value));

export function RangeScale({ segments, value, highlight, unit = '' }) {
  const min = segments[0].from;
  const max = segments.at(-1).to;
  const toPercent = (point) => clampPercent(((point - min) / (max - min)) * 100);

  return (
    <div className="pt-7">
      <div className="relative">
        <div className="flex h-3 gap-0.5 overflow-hidden rounded-full">
          {segments.map((segment) => (
            <div
              key={segment.label}
              style={{ width: `${toPercent(segment.to) - toPercent(segment.from)}%` }}
              className={segment.label === highlight ? 'bg-sun shadow-glow-sm' : 'bg-zinc-200'}
            />
          ))}
        </div>
        {value != null && (
          <motion.div
            initial={{ left: '0%', opacity: 0 }}
            animate={{ left: `${toPercent(value)}%`, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="absolute -top-7 flex -translate-x-1/2 flex-col items-center"
          >
            <span className="rounded-full bg-ink px-2 py-0.5 text-[11px] font-bold text-white tabular-nums">
              {value}
              {unit}
            </span>
            <span className="h-5 w-0.5 bg-ink" />
          </motion.div>
        )}
      </div>
      <div className="mt-2 flex gap-0.5">
        {segments.map((segment) => (
          <p
            key={segment.label}
            style={{ width: `${toPercent(segment.to) - toPercent(segment.from)}%` }}
            className="truncate text-[10px] font-semibold text-zinc-500"
            title={segment.label}
          >
            {segment.label}
            <span className="block font-normal text-zinc-400 tabular-nums">{segment.from}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
