import { act, renderHook } from '@testing-library/react';
import { useFormState } from './useFormState';

const createInitial = () => ({ name: '', dose: '' });

describe('useFormState', () => {
  it('starts from the initial values', () => {
    const { result } = renderHook(() => useFormState(createInitial));
    expect(result.current.values).toEqual({ name: '', dose: '' });
  });

  it('updates the field named by an input change event', () => {
    const { result } = renderHook(() => useFormState(createInitial));

    act(() => result.current.handleChange({ target: { name: 'name', value: 'Ibuprofen' } }));

    expect(result.current.values).toEqual({ name: 'Ibuprofen', dose: '' });
  });

  it('sets a single field directly', () => {
    const { result } = renderHook(() => useFormState(createInitial));

    act(() => result.current.setField('dose', '200 mg'));

    expect(result.current.values).toEqual({ name: '', dose: '200 mg' });
  });

  it('resets to freshly created initial values', () => {
    const factory = vi.fn(createInitial);
    const { result } = renderHook(() => useFormState(factory));

    act(() => result.current.setField('name', 'Ibuprofen'));
    act(() => result.current.reset());

    expect(result.current.values).toEqual({ name: '', dose: '' });
    expect(factory).toHaveBeenCalledTimes(2);
  });
});
