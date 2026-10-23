import { clear, set } from 'idb-keyval';
import { daysFromToday, toInputDate } from '@/shared/lib/date';
import { BLOOD_PRESSURE_RANGES } from '@/shared/lib/health';
import { renderQueryHook } from '@/test/renderQueryHook';
import { useHealthSnapshot } from './useHealthSnapshot';

const fortyYearsAgo = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 40);
  return toInputDate(date);
};

describe('useHealthSnapshot', () => {
  beforeEach(async () => {
    await clear();
    await set('profile', { fullName: 'Sam Lee', birthDate: fortyYearsAgo(), heightCm: 180 });
  });

  it('derives age, BMI, blood pressure category and the next visit', async () => {
    await set('measurements', [
      {
        id: 'body',
        kind: 'body',
        recordedAt: '2026-10-05T08:00:00.000Z',
        weightKg: 72.9,
        bodyFatPct: 18,
      },
      {
        id: 'bp',
        kind: 'bp',
        recordedAt: '2026-10-10T08:00:00.000Z',
        systolic: 135,
        diastolic: 85,
      },
    ]);
    await set('appointments', [
      { id: 'visit', scheduledAt: `${daysFromToday(3)}T10:00`, status: 'planned' },
    ]);
    const { result } = await renderQueryHook(() => useHealthSnapshot());

    expect(result.current).toMatchObject({
      age: 40,
      weightKg: 72.9,
      bodyFatPct: 18,
      bodyMeasuredAt: '2026-10-05T08:00:00.000Z',
      bmi: 22.5,
      bloodPressureCategory: BLOOD_PRESSURE_RANGES[2],
    });
    expect(result.current.bmiRange.label).toBe('Healthy');
    expect(result.current.latestMeasurement.id).toBe('bp');
    expect(result.current.nextAppointment.id).toBe('visit');
  });

  it('leaves derived values empty without measurements or visits', async () => {
    await set('measurements', []);
    await set('appointments', []);
    const { result } = await renderQueryHook(() => useHealthSnapshot());

    expect(result.current).toMatchObject({
      weightKg: null,
      bodyFatPct: null,
      bmi: null,
      bmiRange: null,
      bloodPressure: null,
      bloodPressureCategory: null,
      latestMeasurement: null,
      nextAppointment: null,
    });
  });
});
