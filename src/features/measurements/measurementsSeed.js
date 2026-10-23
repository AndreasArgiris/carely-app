import { createId } from '@/shared/lib/id';

const DAY_MS = 86_400_000;

function atDaysAgo(days, hour) {
  const date = new Date(Date.now() - days * DAY_MS);
  date.setHours(hour, 15, 0, 0);
  return date.toISOString();
}

function createBloodPressure(index) {
  const wave = Math.sin(index / 3);
  return {
    id: createId(),
    kind: 'bp',
    recordedAt: atDaysAgo(index * 6, index % 2 ? 8 : 20),
    systolic: Math.round(124 + wave * 6 - index * 0.25),
    diastolic: Math.round(81 + wave * 4 - index * 0.1),
    pulse: Math.round(70 + Math.cos(index) * 5),
    note: index === 4 ? 'After a long day at work' : '',
  };
}

function createBody(index) {
  return {
    id: createId(),
    kind: 'body',
    recordedAt: atDaysAgo(index * 14, 7),
    weightKg: Math.round((79.4 + index * 0.32 + Math.sin(index) * 0.4) * 10) / 10,
    bodyFatPct: Math.round((20.1 + index * 0.18 + Math.cos(index) * 0.3) * 10) / 10,
    note: index === 0 ? 'Morning, before breakfast' : '',
  };
}

function createGlucose(index) {
  const isFasting = index % 2 === 0;
  return {
    id: createId(),
    kind: 'glucose',
    recordedAt: atDaysAgo(index * 4, isFasting ? 7 : 14),
    glucose: Math.round((isFasting ? 92 : 128) + Math.sin(index) * 8),
    context: isFasting ? 'fasting' : 'after-meal',
    note: index === 1 ? 'Pasta for lunch' : '',
  };
}

const TEMPERATURES = [36.6, 36.8, 38.4, 37.9, 37.1, 36.7, 36.5];

function createTemperature(celsius, index) {
  return {
    id: createId(),
    kind: 'temperature',
    recordedAt: atDaysAgo(60 - index, 21),
    temperatureC: celsius,
    note: celsius >= 38 ? 'Sinus infection, started antibiotics' : '',
  };
}

function createOxygen(index) {
  return {
    id: createId(),
    kind: 'oxygen',
    recordedAt: atDaysAgo(index * 10, 9),
    spo2: 97 + (index % 3),
    note: '',
  };
}

const range = (count) => Array.from({ length: count }, (_, index) => index);

export const measurementsSeed = [
  ...range(30).map(createBloodPressure),
  ...range(14).map(createBody),
  ...range(20).map(createGlucose),
  ...TEMPERATURES.map(createTemperature),
  ...range(8).map(createOxygen),
];
