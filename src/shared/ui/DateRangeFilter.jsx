import { CalendarRange, X } from 'lucide-react';
import { daysFromToday } from '@/shared/lib/date';
import { EMPTY_RANGE } from '@/shared/hooks/useDateRangeFilter';
import { Button } from './Button';

const PRESETS = [
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
  { label: '1y', days: 365 },
];

const INPUT =
  'h-8 rounded-full border border-zinc-200 bg-white px-3 text-xs outline-none focus:border-ink';

export function DateRangeFilter({ range, onChange, isActive }) {
  const handlePreset = (days) => onChange({ from: daysFromToday(-days), to: '' });
  const handleField = (event) => onChange({ ...range, [event.target.name]: event.target.value });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <CalendarRange className="size-4 text-zinc-400" aria-hidden />
      {PRESETS.map((preset) => (
        <Button
          key={preset.label}
          variant="ghost"
          size="sm"
          onClick={() => handlePreset(preset.days)}
        >
          {preset.label}
        </Button>
      ))}
      <input
        type="date"
        name="from"
        aria-label="From date"
        value={range.from}
        onChange={handleField}
        className={INPUT}
      />
      <span className="text-xs text-zinc-400">to</span>
      <input
        type="date"
        name="to"
        aria-label="To date"
        value={range.to}
        onChange={handleField}
        className={INPUT}
      />
      {isActive && (
        <Button variant="ghost" size="sm" onClick={() => onChange(EMPTY_RANGE)}>
          <X className="size-3.5" /> Clear
        </Button>
      )}
    </div>
  );
}
