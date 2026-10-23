import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useDateRangeFilter } from '@/shared/hooks/useDateRangeFilter';
import { useToggle } from '@/shared/hooks/useToggle';
import { Button } from '@/shared/ui/Button';
import { Collapse } from '@/shared/ui/Collapse';
import { DateRangeFilter } from '@/shared/ui/DateRangeFilter';
import { PageHeader } from '@/shared/ui/PageHeader';
import { SegmentedControl } from '@/shared/ui/SegmentedControl';
import { Toolbar } from '@/shared/ui/Toolbar';
import { MeasurementForm } from './components/MeasurementForm';
import { MeasurementHistory } from './components/MeasurementHistory';
import { MeasurementTrends } from './components/MeasurementTrends';
import { MEASUREMENT_KINDS } from './measurementTypes';
import { useMeasurements } from './useMeasurements';

export function MeasurementsPage() {
  const { measurements, addItem, removeItem } = useMeasurements();
  const [kind, setKind] = useState('all');
  const form = useToggle();
  const byKind = measurements.filter((item) => kind === 'all' || item.kind === kind);
  const { range, setRange, filtered, isActive } = useDateRangeFilter(
    byKind,
    (item) => item.recordedAt,
  );
  // A new filter starts the history back on page 1.
  const historyKey = `${kind}|${range.from}|${range.to}`;

  const handleAdd = async (measurement) => {
    await addItem(measurement);
    form.close();
  };

  return (
    <>
      <PageHeader
        eyebrow="Tracking"
        title="Measurements"
        description="Blood pressure, weight, body fat, blood sugar, temperature and oxygen over time."
        action={
          <Button onClick={form.toggle}>
            {form.isOn ? <X className="size-4" /> : <Plus className="size-4" />}
            {form.isOn ? 'Close' : 'New measurement'}
          </Button>
        }
      />
      <Collapse isOpen={form.isOn}>
        <MeasurementForm onSubmit={handleAdd} />
      </Collapse>
      <Toolbar>
        <SegmentedControl
          label="Measurement type"
          options={MEASUREMENT_KINDS}
          value={kind}
          onChange={setKind}
        />
        <DateRangeFilter range={range} onChange={setRange} isActive={isActive} />
      </Toolbar>
      <MeasurementTrends items={filtered} kind={kind} />
      <MeasurementHistory key={historyKey} items={filtered} onRemove={removeItem} />
    </>
  );
}
