import { Card, CardTitle } from '@/shared/ui/Card';
import { BloodPressureChart } from '../charts/BloodPressureChart';
import { TrendAreaChart } from '../charts/TrendAreaChart';
import { findMeasurementType } from '../measurementTypes';
import { toChartSeries } from '../useMeasurements';

export function SingleValueTrendCard({ type, items }) {
  return (
    <Card>
      <CardTitle title={type.label} hint={`${type.unit} · ${type.bandHint}`} />
      <TrendAreaChart
        data={toChartSeries(items)}
        dataKey={type.field}
        name={type.label}
        unit={type.unit}
        band={type.band}
      />
    </Card>
  );
}

function BodyTrends({ items }) {
  const data = toChartSeries(items);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardTitle title="Weight" hint="kg" />
        <TrendAreaChart data={data} dataKey="weightKg" name="Weight" unit="kg" />
      </Card>
      <Card>
        <CardTitle title="Body fat" hint="% of body mass" />
        <TrendAreaChart data={data} dataKey="bodyFatPct" name="Body fat" unit="%" />
      </Card>
    </div>
  );
}

function KindTrend({ kind, items }) {
  if (kind === 'bp') {
    return (
      <Card>
        <CardTitle title="Blood pressure" hint="mmHg over the selected period" />
        <BloodPressureChart data={toChartSeries(items)} />
      </Card>
    );
  }
  if (kind === 'body') return <BodyTrends items={items} />;
  return <SingleValueTrendCard type={findMeasurementType(kind)} items={items} />;
}

/** Charts belong to a single category; the "All" tab is a plain history list. */
export function MeasurementTrends({ items, kind }) {
  if (kind === 'all' || items.length < 2) return null;

  return (
    <div className="mb-6">
      <KindTrend kind={kind} items={items} />
    </div>
  );
}
