import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loadValue, saveValue } from '@/shared/lib/storage';

/** Persisted single object (IndexedDB) exposed through TanStack Query. */
export function useStoredValue(key, seed) {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: [key], queryFn: () => loadValue(key, seed) });

  const mutation = useMutation({
    mutationFn: async (value) => {
      await saveValue(key, value);
      return value;
    },
    onSuccess: (value) => queryClient.setQueryData([key], value),
  });

  return { value: query.data ?? seed, isLoading: query.isLoading, save: mutation.mutateAsync };
}
