import { act, renderHook } from '@testing-library/react';
import { EMPTY_RANGE, useDateRangeFilter } from './useDateRangeFilter';

const items = [
  { id: 'a', date: '2026-10-01T09:00' },
  { id: 'b', date: '2026-10-05T23:30' },
  { id: 'c', date: '2026-10-10T08:00' },
];
const getDate = (item) => item.date;
const ids = (list) => list.map((item) => item.id);

describe('useDateRangeFilter', () => {
  it('returns every item while no range is set', () => {
    const { result } = renderHook(() => useDateRangeFilter(items, getDate));

    expect(result.current.range).toEqual(EMPTY_RANGE);
    expect(result.current.isActive).toBe(false);
    expect(ids(result.current.filtered)).toEqual(['a', 'b', 'c']);
  });

  it('keeps items from the start date onwards', () => {
    const { result } = renderHook(() => useDateRangeFilter(items, getDate));

    act(() => result.current.setRange({ from: '2026-10-05', to: '' }));

    expect(result.current.isActive).toBe(true);
    expect(ids(result.current.filtered)).toEqual(['b', 'c']);
  });

  it('includes the whole end day', () => {
    const { result } = renderHook(() => useDateRangeFilter(items, getDate));

    act(() => result.current.setRange({ from: '2026-10-02', to: '2026-10-05' }));

    expect(ids(result.current.filtered)).toEqual(['b']);
  });
});
