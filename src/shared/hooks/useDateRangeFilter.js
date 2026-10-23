import { useState } from 'react';
import { isWithinRange } from '@/shared/lib/date';

export const EMPTY_RANGE = { from: '', to: '' };

export function useDateRangeFilter(items, getDate) {
  const [range, setRange] = useState(EMPTY_RANGE);
  const filtered = items.filter((item) => isWithinRange(getDate(item), range.from, range.to));
  const isActive = Boolean(range.from || range.to);

  return { range, setRange, filtered, isActive };
}
