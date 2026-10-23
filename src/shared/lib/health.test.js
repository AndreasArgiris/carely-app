import {
  BMI_RANGES,
  calculateBmi,
  classifyBloodPressure,
  classifyGlucose,
  classifyOxygen,
  classifyTemperature,
  findRange,
  healthyWeightRange,
} from './health';

describe('health standards', () => {
  it('calculates BMI rounded to one decimal', () => {
    expect(calculateBmi(80, 180)).toBe(24.7);
    expect(calculateBmi(null, 180)).toBeNull();
  });

  it('finds the BMI category', () => {
    expect(findRange(BMI_RANGES, 24.7).label).toBe('Healthy');
    expect(findRange(BMI_RANGES, 31).label).toBe('Obese');
  });

  it('classifies blood pressure by the AHA table', () => {
    expect(classifyBloodPressure(115, 75).label).toBe('Normal');
    expect(classifyBloodPressure(125, 78).label).toBe('Elevated');
    expect(classifyBloodPressure(118, 84).label).toBe('Hypertension stage 1');
    expect(classifyBloodPressure(145, 85).label).toBe('Hypertension stage 2');
    expect(classifyBloodPressure(185, 100).label).toBe('Hypertensive crisis');
  });

  it('classifies blood sugar with fasting vs post-meal cut-offs', () => {
    expect(classifyGlucose(95, 'fasting').label).toBe('Normal');
    expect(classifyGlucose(110, 'fasting').label).toBe('Prediabetes');
    expect(classifyGlucose(110, 'after-meal').label).toBe('Normal');
    expect(classifyGlucose(210, 'after-meal').label).toBe('Diabetes range');
    expect(classifyGlucose(60, 'random').label).toBe('Low');
  });

  it('classifies temperature and oxygen saturation', () => {
    expect(classifyTemperature(36.8).isNormal).toBe(true);
    expect(classifyTemperature(38.4).label).toBe('Fever');
    expect(classifyOxygen(97).label).toBe('Normal');
    expect(classifyOxygen(88).label).toBe('Very low');
  });

  it('derives a healthy weight range from height', () => {
    expect(healthyWeightRange(180)).toEqual({ min: 59.9, max: 80.7 });
  });
});
