import { act, waitFor } from '@testing-library/react';
import { clear, get, set } from 'idb-keyval';
import { daysFromToday } from '@/shared/lib/date';
import { renderQueryHook } from '@/test/renderQueryHook';
import { useAppointments } from './useAppointments';

const appointment = (id, offsetDays, status = 'planned') => ({
  id,
  title: id,
  scheduledAt: `${daysFromToday(offsetDays)}T10:00`,
  status,
});
const ids = (items) => items.map((item) => item.id);

describe('useAppointments', () => {
  beforeEach(async () => {
    await clear();
    await set('appointments', [
      appointment('later', 9),
      appointment('past', -3),
      appointment('soon', 2),
      appointment('cancelled', 1, 'cancelled'),
    ]);
  });

  it('sorts appointments oldest first', async () => {
    const { result } = await renderQueryHook(() => useAppointments());
    expect(ids(result.current.appointments)).toEqual(['past', 'cancelled', 'soon', 'later']);
  });

  it('picks the earliest planned appointment still ahead', async () => {
    const { result } = await renderQueryHook(() => useAppointments());
    expect(result.current.nextAppointment.id).toBe('soon');
  });

  it('has no next appointment when nothing planned is ahead', async () => {
    await set('appointments', [appointment('past', -3), appointment('cancelled', 1, 'cancelled')]);
    const { result } = await renderQueryHook(() => useAppointments());

    expect(result.current.nextAppointment).toBeNull();
  });

  it('changes status and moves on to the following appointment', async () => {
    const { result } = await renderQueryHook(() => useAppointments());

    await act(() => result.current.setStatus('soon', 'completed'));

    await waitFor(() => expect(result.current.nextAppointment.id).toBe('later'));
    const stored = await get('appointments');
    expect(stored.find((item) => item.id === 'soon').status).toBe('completed');
  });
});
