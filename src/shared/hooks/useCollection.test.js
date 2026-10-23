import { act, waitFor } from '@testing-library/react';
import { clear, get, set } from 'idb-keyval';
import { renderQueryHook } from '@/test/renderQueryHook';
import { useCollection } from './useCollection';

const seed = [{ id: 'a', name: 'First' }];
const names = (items) => items.map((item) => item.name);

describe('useCollection', () => {
  beforeEach(() => clear());

  it('loads the seed and stores it on first use', async () => {
    const { result } = await renderQueryHook(() => useCollection('things', seed));

    expect(result.current.items).toEqual(seed);
    expect(await get('things')).toEqual(seed);
  });

  it('prefers stored items over the seed', async () => {
    await set('things', [{ id: 'b', name: 'Stored' }]);
    const { result } = await renderQueryHook(() => useCollection('things', seed));

    expect(names(result.current.items)).toEqual(['Stored']);
  });

  it('starts empty without a seed', async () => {
    const { result } = await renderQueryHook(() => useCollection('things'));
    expect(result.current.items).toEqual([]);
  });

  it('adds new items to the front with a generated id', async () => {
    const { result } = await renderQueryHook(() => useCollection('things', seed));

    await act(() => result.current.addItem({ name: 'Second' }));

    await waitFor(() => expect(names(result.current.items)).toEqual(['Second', 'First']));
    expect(result.current.items[0].id).toEqual(expect.any(String));
    expect(await get('things')).toEqual(result.current.items);
  });

  it('merges changes into one item', async () => {
    const { result } = await renderQueryHook(() => useCollection('things', seed));

    await act(() => result.current.updateItem('a', { name: 'Renamed' }));

    await waitFor(() => expect(result.current.items).toEqual([{ id: 'a', name: 'Renamed' }]));
    expect(await get('things')).toEqual([{ id: 'a', name: 'Renamed' }]);
  });

  it('removes an item', async () => {
    const { result } = await renderQueryHook(() => useCollection('things', seed));

    await act(() => result.current.removeItem('a'));

    await waitFor(() => expect(result.current.items).toEqual([]));
    expect(await get('things')).toEqual([]);
  });
});
