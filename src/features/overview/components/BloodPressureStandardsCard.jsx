import { ArrowLeft } from 'lucide-react';
import { BLOOD_PRESSURE_RANGES } from '@/shared/lib/health';
import { Card, CardTitle } from '@/shared/ui/Card';

export function BloodPressureStandardsCard({ category }) {
  return (
    <Card>
      <CardTitle
        title="Blood pressure standards"
        hint="American Heart Association, adults (mmHg)"
      />
      <table className="w-full text-left text-xs">
        <thead className="text-[10px] tracking-wider text-zinc-400 uppercase">
          <tr>
            <th className="pb-2 font-bold">Category</th>
            <th className="pb-2 font-bold">Systolic</th>
            <th className="pb-2 font-bold">Diastolic</th>
          </tr>
        </thead>
        <tbody>
          {BLOOD_PRESSURE_RANGES.map((range) => {
            const isCurrent = range.label === category?.label;
            return (
              <tr
                key={range.label}
                className={isCurrent ? 'bg-sun shadow-glow-sm' : 'border-t border-zinc-100'}
              >
                <td className="rounded-l-xl px-2 py-2 font-semibold">
                  <span className="flex items-center gap-1.5">
                    {range.label}
                    {isCurrent && <ArrowLeft className="size-3" aria-label="your last reading" />}
                  </span>
                </td>
                <td className="px-2 py-2 tabular-nums">{range.systolic}</td>
                <td className="rounded-r-xl px-2 py-2 tabular-nums">{range.diastolic}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
