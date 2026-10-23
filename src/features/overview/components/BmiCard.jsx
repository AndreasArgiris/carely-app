import { BMI_RANGES, healthyWeightRange } from '@/shared/lib/health';
import { Card, CardTitle } from '@/shared/ui/Card';
import { RangeScale } from './RangeScale';

export function BmiCard({ bmi, bmiRange, heightCm, weightKg }) {
  const healthy = healthyWeightRange(heightCm);
  const isInRange = healthy && weightKg >= healthy.min && weightKg <= healthy.max;

  return (
    <Card>
      <CardTitle title="Body mass index" hint="WHO adult classification" />
      <RangeScale segments={BMI_RANGES} value={bmi} highlight="Healthy" />
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-4 text-xs">
        <div>
          <p className="text-zinc-400">Your category</p>
          <p className="text-sm font-bold">{bmiRange?.label ?? '—'}</p>
        </div>
        <div>
          <p className="text-zinc-400">Healthy weight for {heightCm} cm</p>
          <p className="text-sm font-bold tabular-nums">
            {healthy ? `${healthy.min} – ${healthy.max} kg` : '—'}
          </p>
          {weightKg && (
            <p className="text-zinc-500">
              You: {weightKg} kg {isInRange ? '· in range' : ''}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
