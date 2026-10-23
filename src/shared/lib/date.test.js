import { calculateAge, isWithinRange } from './date';

describe('date helpers', () => {
  it('calculates age around the birthday', () => {
    expect(calculateAge('1990-06-15', new Date('2026-06-14'))).toBe(35);
    expect(calculateAge('1990-06-15', new Date('2026-06-15'))).toBe(36);
  });

  it('filters by inclusive date range', () => {
    expect(isWithinRange('2026-10-10T12:00', '2026-10-10', '2026-10-10')).toBe(true);
    expect(isWithinRange('2026-10-09T23:00', '2026-10-10', '')).toBe(false);
    expect(isWithinRange('2026-10-11T00:30', '', '2026-10-10')).toBe(false);
  });
});
