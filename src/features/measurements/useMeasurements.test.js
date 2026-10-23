import { clear, set } from 'idb-keyval';
import { renderQueryHook } from '@/test/renderQueryHook';
import { useLatestMeasurements, useMeasurements } from './useMeasurements';

const at = (day) => `2026-10-${day}T08:00:00.000Z`;
const measurements = [
  { id: 'bp-old', kind: 'bp', recordedAt: at('01'), systolic: 120, diastolic: 80 },
  { id: 'body-new', kind: 'body', recordedAt: at('05'), weightKg: 80, bodyFatPct: 20 },
  { id: 'bp-new', kind: 'bp', recordedAt: at('10'), systolic: 130, diastolic: 85 },
  { id: 'body-old', kind: 'body', recordedAt: at('02'), weightKg: 81, bodyFatPct: 21 },
  { id: 'glucose', kind: 'glucose', recordedAt: at('03'), glucose: 95, context: 'fasting' },
];
const ids = (items) => items.map((item) => item.id);

describe('useMeasurements', () => {
  beforeEach(async () => {
    await clear();
    await set('measurements', measurements);
  });

  it('sorts measurements newest first', async () => {
    const { result } = await renderQueryHook(() => useMeasurements());
    expect(ids(result.current.measurements)).toEqual([
      'bp-new',
      'body-new',
      'glucose',
      'body-old',
      'bp-old',
    ]);
  });

  it('splits measurements by kind', async () => {
    const { result } = await renderQueryHook(() => useMeasurements());

    expect(ids(result.current.bloodPressure)).toEqual(['bp-new', 'bp-old']);
    expect(ids(result.current.body)).toEqual(['body-new', 'body-old']);
    expect(ids(result.current.ofKind('glucose'))).toEqual(['glucose']);
    expect(result.current.ofKind('temperature')).toEqual([]);
  });
});

describe('useLatestMeasurements', () => {
  beforeEach(() => clear());

  it('picks the newest reading overall and per kind', async () => {
    await set('measurements', measurements);
    const { result } = await renderQueryHook(() => useLatestMeasurements());

    expect(result.current.latestMeasurement.id).toBe('bp-new');
    expect(result.current.latestBloodPressure.id).toBe('bp-new');
    expect(result.current.latestBody.id).toBe('body-new');
    expect(ids(result.current.latestByKind)).toEqual(['bp-new', 'body-new', 'glucose']);
  });

  it('returns nothing when there are no readings', async () => {
    await set('measurements', []);
    const { result } = await renderQueryHook(() => useLatestMeasurements());

    expect(result.current).toMatchObject({
      latestMeasurement: null,
      latestBloodPressure: null,
      latestBody: null,
      latestByKind: [],
    });
  });
});
