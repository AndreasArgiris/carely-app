import { clear, set } from 'idb-keyval';
import { renderQueryHook } from '@/test/renderQueryHook';
import { useExams } from './useExams';

describe('useExams', () => {
  beforeEach(() => clear());

  it('starts with the sample exams', async () => {
    const { result } = await renderQueryHook(() => useExams());
    expect(result.current.exams.map((exam) => exam.title)).toEqual([
      'Full blood count',
      'ECG at rest',
    ]);
  });

  it('sorts exams newest first', async () => {
    await set('exams', [
      { id: 'old', examDate: '2026-01-10', files: [] },
      { id: 'new', examDate: '2026-09-01', files: [] },
      { id: 'mid', examDate: '2026-05-20', files: [] },
    ]);
    const { result } = await renderQueryHook(() => useExams());

    expect(result.current.exams.map((exam) => exam.id)).toEqual(['new', 'mid', 'old']);
  });
});
