import { BODY_FAT_RANGES, findRange } from '@/shared/lib/health';
import { Card, CardTitle } from '@/shared/ui/Card';
import { RangeScale } from './RangeScale';

export function BodyFatCard({ bodyFatPct, sex }) {
  const ranges = BODY_FAT_RANGES[sex] ?? BODY_FAT_RANGES.male;
  const current = findRange(ranges, bodyFatPct);

  return (
    <Card>
      <CardTitle title="Body fat" hint={`ACE ranges for ${sex === 'female' ? 'women' : 'men'}`} />
      <RangeScale segments={ranges} value={bodyFatPct} highlight="Fitness" unit="%" />
      <div className="mt-5 border-t border-zinc-100 pt-4 text-xs">
        <p className="text-zinc-400">Your category</p>
        <p className="text-sm font-bold">{current?.label ?? '—'}</p>
      </div>
    </Card>
  );
}
