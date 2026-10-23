import { useState } from 'react';

export function useFormState(createInitial) {
  const [values, setValues] = useState(createInitial);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const setField = (name, value) => setValues((current) => ({ ...current, [name]: value }));
  const reset = () => setValues(createInitial());

  return { values, handleChange, setField, reset };
}
