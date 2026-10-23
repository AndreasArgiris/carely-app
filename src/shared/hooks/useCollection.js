import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loadValue, saveValue } from '@/shared/lib/storage';
import { createId } from '@/shared/lib/id';

const EMPTY = [];

/** Persisted list (IndexedDB) exposed through TanStack Query. */
export function useCollection(key, seed = EMPTY) {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: [key], queryFn: () => loadValue(key, seed) });

  const mutation = useMutation({
    mutationFn: async (transform) => {
      const next = transform(await loadValue(key, seed));
      await saveValue(key, next);
      return next;
    },
    onSuccess: (next) => queryClient.setQueryData([key], next),
  });

  return {
    items: query.data ?? EMPTY,
    isLoading: query.isLoading,
    addItem: (item) => mutation.mutateAsync((list) => [{ id: createId(), ...item }, ...list]),
    updateItem: (id, changes) =>
      mutation.mutateAsync((list) =>
        list.map((item) => (item.id === id ? { ...item, ...changes } : item)),
      ),
    removeItem: (id) => mutation.mutateAsync((list) => list.filter((item) => item.id !== id)),
  };
}
