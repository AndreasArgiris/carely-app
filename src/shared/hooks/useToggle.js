import { useState } from 'react';

export function useToggle(initial = false) {
  const [isOn, setIsOn] = useState(initial);
  const toggle = () => setIsOn((value) => !value);
  const close = () => setIsOn(false);
  return { isOn, toggle, close };
}
