import { act, renderHook } from '@testing-library/react';
import { useToggle } from './useToggle';

describe('useToggle', () => {
  it('starts off by default', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.isOn).toBe(false);
  });

  it('starts from the given value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current.isOn).toBe(true);
  });

  it('flips on toggle and always turns off on close', () => {
    const { result } = renderHook(() => useToggle());

    act(() => result.current.toggle());
    expect(result.current.isOn).toBe(true);

    act(() => result.current.toggle());
    expect(result.current.isOn).toBe(false);

    act(() => result.current.close());
    expect(result.current.isOn).toBe(false);
  });
});
