// Reference ranges: WHO (BMI), AHA 2017 (blood pressure), ACE (body fat).

export const BMI_RANGES = [
  { label: 'Underweight', from: 14, to: 18.5 },
  { label: 'Healthy', from: 18.5, to: 25 },
  { label: 'Overweight', from: 25, to: 30 },
  { label: 'Obese', from: 30, to: 40 },
];

export const BLOOD_PRESSURE_RANGES = [
  { label: 'Normal', systolic: '< 120', diastolic: '< 80' },
  { label: 'Elevated', systolic: '120 – 129', diastolic: '< 80' },
  { label: 'Hypertension stage 1', systolic: '130 – 139', diastolic: '80 – 89' },
  { label: 'Hypertension stage 2', systolic: '≥ 140', diastolic: '≥ 90' },
  { label: 'Hypertensive crisis', systolic: '> 180', diastolic: '> 120' },
];

export const BODY_FAT_RANGES = {
  male: [
    { label: 'Essential', from: 2, to: 6 },
    { label: 'Athletes', from: 6, to: 14 },
    { label: 'Fitness', from: 14, to: 18 },
    { label: 'Average', from: 18, to: 25 },
    { label: 'Obese', from: 25, to: 40 },
  ],
  female: [
    { label: 'Essential', from: 10, to: 14 },
    { label: 'Athletes', from: 14, to: 21 },
    { label: 'Fitness', from: 21, to: 25 },
    { label: 'Average', from: 25, to: 32 },
    { label: 'Obese', from: 32, to: 45 },
  ],
};

export function calculateBmi(weightKg, heightCm) {
  if (!weightKg || !heightCm) return null;
  const meters = heightCm / 100;
  return Math.round((weightKg / (meters * meters)) * 10) / 10;
}

export function findRange(ranges, value) {
  if (value == null) return null;
  return ranges.find((range) => value < range.to) ?? ranges.at(-1);
}

export function healthyWeightRange(heightCm) {
  if (!heightCm) return null;
  const squared = (heightCm / 100) ** 2;
  return { min: Math.round(18.5 * squared * 10) / 10, max: Math.round(24.9 * squared * 10) / 10 };
}

// Blood sugar in mg/dL (ADA). Fasting/before-meal and post-meal readings use different cut-offs.
export const GLUCOSE_CONTEXTS = [
  { value: 'fasting', label: 'Fasting' },
  { value: 'before-meal', label: 'Before meal' },
  { value: 'after-meal', label: '2h after meal' },
  { value: 'random', label: 'Random' },
];

export const GLUCOSE_RANGES = [
  { label: 'Low', fasting: '< 70', afterMeal: '< 70' },
  { label: 'Normal', fasting: '70 – 99', afterMeal: '70 – 139' },
  { label: 'Prediabetes', fasting: '100 – 125', afterMeal: '140 – 199' },
  { label: 'Diabetes range', fasting: '≥ 126', afterMeal: '≥ 200' },
];

const reading = (label) => ({ label, isNormal: label === 'Normal' });

export function classifyGlucose(value, context) {
  if (value == null) return null;
  const isFasting = context === 'fasting' || context === 'before-meal';
  const [prediabetesFrom, diabetesFrom] = isFasting ? [100, 126] : [140, 200];
  if (value < 70) return reading('Low');
  if (value < prediabetesFrom) return reading('Normal');
  if (value < diabetesFrom) return reading('Prediabetes');
  return reading('Diabetes range');
}

export function classifyTemperature(celsius) {
  if (celsius == null) return null;
  if (celsius < 35) return reading('Hypothermia');
  if (celsius < 36.1) return reading('Low');
  if (celsius <= 37.2) return reading('Normal');
  return reading(celsius < 38 ? 'Slightly elevated' : 'Fever');
}

export function classifyOxygen(spo2) {
  if (spo2 == null) return null;
  if (spo2 >= 95) return reading('Normal');
  return reading(spo2 >= 90 ? 'Low' : 'Very low');
}

export function classifyBloodPressure(systolic, diastolic) {
  if (systolic == null || diastolic == null) return null;
  if (systolic > 180 || diastolic > 120) return BLOOD_PRESSURE_RANGES[4];
  if (systolic >= 140 || diastolic >= 90) return BLOOD_PRESSURE_RANGES[3];
  if (systolic >= 130 || diastolic >= 80) return BLOOD_PRESSURE_RANGES[2];
  if (systolic >= 120) return BLOOD_PRESSURE_RANGES[1];
  return BLOOD_PRESSURE_RANGES[0];
}
