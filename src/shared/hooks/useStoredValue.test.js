import { act, waitFor } from '@testing-library/react';
import { clear, get, set } from 'idb-keyval';
import { renderQueryHook } from '@/test/renderQueryHook';
import { useStoredValue } from './useStoredValue';

const seed = { theme: 'light' };

describe('useStoredValue', () => {
  beforeEach(() => clear());

  it('loads the seed and stores it on first use', async () => {
    const { result } = await renderQueryHook(() => useStoredValue('settings', seed));

    expect(result.current.value).toEqual(seed);
    expect(await get('settings')).toEqual(seed);
  });

  it('prefers the stored value over the seed', async () => {
    await set('settings', { theme: 'dark' });
    const { result } = await renderQueryHook(() => useStoredValue('settings', seed));

    expect(result.current.value).toEqual({ theme: 'dark' });
  });

  it('saves a new value', async () => {
    const { result } = await renderQueryHook(() => useStoredValue('settings', seed));

    await act(() => result.current.save({ theme: 'dark' }));

    await waitFor(() => expect(result.current.value).toEqual({ theme: 'dark' }));
    expect(await get('settings')).toEqual({ theme: 'dark' });
  });
});
