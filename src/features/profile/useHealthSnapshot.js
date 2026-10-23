import { useAppointments } from '@/features/appointments/useAppointments';
import { useLatestMeasurements } from '@/features/measurements/useMeasurements';
import { calculateAge } from '@/shared/lib/date';
import { BMI_RANGES, calculateBmi, classifyBloodPressure, findRange } from '@/shared/lib/health';
import { useProfile } from './useProfile';

/** Everything the info panel and overview show — all derived, nothing stored twice. */
export function useHealthSnapshot() {
  const { profile } = useProfile();
  const { latestBloodPressure, latestBody, latestMeasurement, latestByKind } =
    useLatestMeasurements();
  const { nextAppointment } = useAppointments();

  const weightKg = latestBody?.weightKg ?? null;
  const bmi = calculateBmi(weightKg, profile.heightCm);

  return {
    profile,
    latestMeasurement,
    latestByKind,
    age: calculateAge(profile.birthDate),
    weightKg,
    bodyFatPct: latestBody?.bodyFatPct ?? null,
    bodyMeasuredAt: latestBody?.recordedAt ?? null,
    bmi,
    bmiRange: findRange(BMI_RANGES, bmi),
    bloodPressure: latestBloodPressure,
    bloodPressureCategory: classifyBloodPressure(
      latestBloodPressure?.systolic,
      latestBloodPressure?.diastolic,
    ),
    nextAppointment,
  };
}
