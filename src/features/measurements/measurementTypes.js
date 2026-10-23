import { Droplet, HeartPulse, Scale, Thermometer, Wind } from 'lucide-react';
import {
  classifyBloodPressure,
  classifyGlucose,
  classifyOxygen,
  classifyTemperature,
} from '@/shared/lib/health';

/**
 * Every measurement kind the app tracks. Kinds with a `field` are single-value
 * readings and share the same form field, row, and trend chart.
 */
export const MEASUREMENT_TYPES = [
  { kind: 'bp', label: 'Blood pressure', icon: HeartPulse },
  { kind: 'body', label: 'Weight & fat', icon: Scale },
  {
    kind: 'glucose',
    label: 'Blood sugar',
    icon: Droplet,
    field: 'glucose',
    unit: 'mg/dL',
    step: '1',
    placeholder: '95',
    band: { from: 70, to: 100 },
    bandHint: 'shaded band = fasting target 70–99',
    classify: (item) => classifyGlucose(item.glucose, item.context),
  },
  {
    kind: 'temperature',
    label: 'Temperature',
    icon: Thermometer,
    field: 'temperatureC',
    unit: '°C',
    step: '0.1',
    placeholder: '36.6',
    band: { from: 36.1, to: 37.2 },
    bandHint: 'shaded band = normal 36.1–37.2',
    classify: (item) => classifyTemperature(item.temperatureC),
  },
  {
    kind: 'oxygen',
    label: 'Oxygen (SpO₂)',
    icon: Wind,
    field: 'spo2',
    unit: '%',
    step: '1',
    placeholder: '98',
    band: { from: 95, to: 100 },
    bandHint: 'shaded band = normal 95–100',
    classify: (item) => classifyOxygen(item.spo2),
  },
];

export const SINGLE_VALUE_TYPES = MEASUREMENT_TYPES.filter((type) => type.field);

export const MEASUREMENT_KINDS = [
  { value: 'all', label: 'All' },
  ...MEASUREMENT_TYPES.map((type) => ({ value: type.kind, label: type.label })),
];

export function findMeasurementType(kind) {
  return MEASUREMENT_TYPES.find((type) => type.kind === kind);
}

function classifyBloodPressureReading(item) {
  const category = classifyBloodPressure(item.systolic, item.diastolic);
  return category && { label: category.label, isNormal: category.label === 'Normal' };
}

/** A display-ready summary of any measurement: value, unit and status. */
export function describeMeasurement(item) {
  const type = findMeasurementType(item.kind);
  if (item.kind === 'bp') {
    return {
      type,
      value: `${item.systolic}/${item.diastolic}`,
      unit: 'mmHg',
      reading: classifyBloodPressureReading(item),
    };
  }
  if (item.kind === 'body') {
    const fat = item.bodyFatPct != null ? ` · ${item.bodyFatPct}% fat` : '';
    return { type, value: `${item.weightKg}`, unit: `kg${fat}`, reading: null };
  }
  return { type, value: `${item[type.field]}`, unit: type.unit, reading: type.classify(item) };
}
