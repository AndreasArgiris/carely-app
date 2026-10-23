import { BloodPressureChart } from '@/features/measurements/charts/BloodPressureChart';
import { TrendAreaChart } from '@/features/measurements/charts/TrendAreaChart';
import { SingleValueTrendCard } from '@/features/measurements/components/MeasurementTrends';
import { findMeasurementType } from '@/features/measurements/measurementTypes';
import { toChartSeries, useMeasurements } from '@/features/measurements/useMeasurements';
import { useHealthSnapshot } from '@/features/profile/useHealthSnapshot';
import { healthyWeightRange } from '@/shared/lib/health';
import { Card, CardTitle } from '@/shared/ui/Card';
import { PageHeader } from '@/shared/ui/PageHeader';
import { BloodPressureStandardsCard } from './components/BloodPressureStandardsCard';
import { BmiCard } from './components/BmiCard';
import { BodyFatCard } from './components/BodyFatCard';
import { GlucoseStandardsCard } from './components/GlucoseStandardsCard';
import { HeroStats } from './components/HeroStats';

const glucoseType = findMeasurementType('glucose');

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  return hour < 18 ? 'Good afternoon' : 'Good evening';
};

export function OverviewPage() {
  const snapshot = useHealthSnapshot();
  const { bloodPressure, body, ofKind } = useMeasurements();
  const glucose = ofKind('glucose');
  const { profile } = snapshot;
  const healthy = healthyWeightRange(profile.heightCm);
  const firstName = profile.fullName.split(' ')[0];

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title={`${greeting()}, ${firstName}`}
        description="Your latest vitals, trends and how they compare to clinical standards."
      />
      <HeroStats snapshot={snapshot} />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <CardTitle title="Blood pressure trend" hint="Systolic & diastolic, mmHg" />
          <BloodPressureChart data={toChartSeries(bloodPressure)} />
        </Card>
        <Card>
          <CardTitle title="Weight" hint="kg · shaded band = healthy weight for your height" />
          <TrendAreaChart
            data={toChartSeries(body)}
            dataKey="weightKg"
            name="Weight"
            unit="kg"
            band={healthy && { from: healthy.min, to: healthy.max }}
          />
        </Card>
        <Card>
          <CardTitle title="Body fat" hint="% of body mass" />
          <TrendAreaChart
            data={toChartSeries(body)}
            dataKey="bodyFatPct"
            name="Body fat"
            unit="%"
          />
        </Card>
        <BmiCard
          bmi={snapshot.bmi}
          bmiRange={snapshot.bmiRange}
          heightCm={profile.heightCm}
          weightKg={snapshot.weightKg}
        />
        <BodyFatCard bodyFatPct={snapshot.bodyFatPct} sex={profile.sex} />
        <BloodPressureStandardsCard category={snapshot.bloodPressureCategory} />
        <GlucoseStandardsCard category={glucoseType.classify(glucose[0] ?? {})} />
        {glucose.length > 1 && (
          <div className="lg:col-span-2">
            <SingleValueTrendCard type={glucoseType} items={glucose} />
          </div>
        )}
      </div>
    </>
  );
}
