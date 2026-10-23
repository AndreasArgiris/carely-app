import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

/** renderHook inside a fresh QueryClient, resolved once every IndexedDB load has finished. */
export async function renderQueryHook(hook) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrapper = ({ children }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  const view = renderHook(hook, { wrapper });

  await waitFor(() => {
    const queries = client.getQueryCache().getAll();
    expect(queries.length > 0 && queries.every((query) => query.state.status !== 'pending')).toBe(
      true,
    );
  });
  return view;
}
