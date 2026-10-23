import { clear, set } from 'idb-keyval';
import { renderQueryHook } from '@/test/renderQueryHook';
import { useJournal } from './useJournal';

describe('useJournal', () => {
  beforeEach(() => clear());

  it('sorts entries newest first', async () => {
    await set('journal', [
      { id: 'morning', text: 'Slept well', recordedAt: '2026-10-20T07:00:00.000Z' },
      { id: 'evening', text: 'Headache', recordedAt: '2026-10-20T19:00:00.000Z' },
      { id: 'yesterday', text: 'Long walk', recordedAt: '2026-10-19T12:00:00.000Z' },
    ]);
    const { result } = await renderQueryHook(() => useJournal());

    expect(result.current.entries.map((entry) => entry.id)).toEqual([
      'evening',
      'morning',
      'yesterday',
    ]);
  });
});
