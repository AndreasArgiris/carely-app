import { get, set } from 'idb-keyval';

export async function loadValue(key, seed) {
  const stored = await get(key);
  if (stored !== undefined) return stored;
  await set(key, seed);
  return seed;
}

export function saveValue(key, value) {
  return set(key, value);
}
