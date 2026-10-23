import { act, renderHook } from '@testing-library/react';
import { useFileSelection } from './useFileSelection';

const file = (name, type = 'application/pdf') => new File(['x'], name, { type });
const names = (files) => files.map((item) => item.name);

describe('useFileSelection', () => {
  it('keeps only PDFs, by type or by extension', () => {
    const { result } = renderHook(() => useFileSelection());

    act(() =>
      result.current.addFiles([
        file('a.pdf'),
        file('photo.png', 'image/png'),
        file('SCAN.PDF', ''),
      ]),
    );

    expect(names(result.current.files)).toEqual(['a.pdf', 'SCAN.PDF']);
  });

  it('appends to the files already selected', () => {
    const { result } = renderHook(() => useFileSelection());

    act(() => result.current.addFiles([file('a.pdf')]));
    act(() => result.current.addFiles([file('b.pdf')]));

    expect(names(result.current.files)).toEqual(['a.pdf', 'b.pdf']);
  });

  it('removes a file by index and clears all', () => {
    const { result } = renderHook(() => useFileSelection());

    act(() => result.current.addFiles([file('a.pdf'), file('b.pdf'), file('c.pdf')]));
    act(() => result.current.removeFile(1));
    expect(names(result.current.files)).toEqual(['a.pdf', 'c.pdf']);

    act(() => result.current.clearFiles());
    expect(result.current.files).toEqual([]);
  });
});
