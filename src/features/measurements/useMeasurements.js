import { useCollection } from '@/shared/hooks/useCollection';
import { sortByDateDesc } from '@/shared/lib/date';
import { MEASUREMENT_TYPES } from './measurementTypes';
import { measurementsSeed } from './measurementsSeed';

const getRecordedAt = (item) => item.recordedAt;

export function useMeasurements() {
  const collection = useCollection('measurements', measurementsSeed);
  const sorted = sortByDateDesc(collection.items, getRecordedAt);
  const ofKind = (kind) => sorted.filter((item) => item.kind === kind);

  return {
    ...collection,
    measurements: sorted,
    ofKind,
    bloodPressure: ofKind('bp'),
    body: ofKind('body'),
  };
}

export function useLatestMeasurements() {
  const { measurements, bloodPressure, body, isLoading } = useMeasurements();
  const latestByKind = MEASUREMENT_TYPES.map((type) =>
    measurements.find((item) => item.kind === type.kind),
  ).filter(Boolean);

  return {
    latestMeasurement: measurements[0] ?? null,
    latestByKind,
    latestBloodPressure: bloodPressure[0] ?? null,
    latestBody: body[0] ?? null,
    isLoading,
  };
}

/** Oldest → newest, shaped for Recharts. */
export function toChartSeries(items) {
  return [...items]
    .reverse()
    .map((item) => ({ ...item, time: new Date(item.recordedAt).getTime() }));
}
