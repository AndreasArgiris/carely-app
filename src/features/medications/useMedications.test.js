import { act, waitFor } from '@testing-library/react';
import { clear, get, set } from 'idb-keyval';
import { renderQueryHook } from '@/test/renderQueryHook';
import { useMedications } from './useMedications';

const medication = (id, startedAt, completedAt = null) => ({
  id,
  name: id,
  startedAt,
  completedAt,
});

describe('useMedications', () => {
  beforeEach(async () => {
    await clear();
    await set('medications', [
      medication('older', '2026-03-01T08:00'),
      medication('newest', '2026-10-01T08:00'),
      medication('finished', '2026-06-01T08:00', '2026-06-08T20:00'),
    ]);
  });

  it('sorts medications by start date, newest first', async () => {
    const { result } = await renderQueryHook(() => useMedications());
    expect(result.current.medications.map((item) => item.id)).toEqual([
      'newest',
      'finished',
      'older',
    ]);
  });

  it('marks a medication completed and active again', async () => {
    const { result } = await renderQueryHook(() => useMedications());
    const find = (items) => items.find((item) => item.id === 'older');

    await act(() => result.current.markCompleted('older', '2026-10-20T09:00'));
    await waitFor(() =>
      expect(find(result.current.medications).completedAt).toBe('2026-10-20T09:00'),
    );
    expect(find(await get('medications')).completedAt).toBe('2026-10-20T09:00');

    await act(() => result.current.markActive('older'));
    await waitFor(() => expect(find(result.current.medications).completedAt).toBeNull());
  });
});
