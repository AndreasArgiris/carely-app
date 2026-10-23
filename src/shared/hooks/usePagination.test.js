import { act, renderHook } from '@testing-library/react';
import { usePagination } from './usePagination';

const numbers = (count) => Array.from({ length: count }, (_, index) => index + 1);

describe('usePagination', () => {
  it('shows the first page of ten by default', () => {
    const { result } = renderHook(() => usePagination(numbers(23)));

    expect(result.current).toMatchObject({
      page: 1,
      pageCount: 3,
      pageItems: numbers(10),
      firstIndex: 1,
      lastIndex: 10,
      total: 23,
    });
  });

  it('slices a partial last page', () => {
    const { result } = renderHook(() => usePagination(numbers(23), 10));

    act(() => result.current.setPage(3));

    expect(result.current).toMatchObject({
      page: 3,
      pageItems: [21, 22, 23],
      firstIndex: 21,
      lastIndex: 23,
    });
  });

  it('clamps to the last page when items are removed', () => {
    const { result, rerender } = renderHook(({ items }) => usePagination(items, 10), {
      initialProps: { items: numbers(23) },
    });

    act(() => result.current.setPage(3));
    rerender({ items: numbers(20) });

    expect(result.current.page).toBe(2);
    expect(result.current.pageItems).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });

  it('keeps one empty page when there are no items', () => {
    const { result } = renderHook(() => usePagination([]));

    expect(result.current).toMatchObject({ page: 1, pageCount: 1, pageItems: [], total: 0 });
  });
});
