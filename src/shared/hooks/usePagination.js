import { useState } from 'react';

export function usePagination(items, pageSize = 10) {
  const [requestedPage, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  // Clamped during render so deleting the last row of the last page stays valid.
  const page = Math.min(requestedPage, pageCount);
  const start = (page - 1) * pageSize;

  return {
    page,
    pageCount,
    setPage,
    pageItems: items.slice(start, start + pageSize),
    firstIndex: start + 1,
    lastIndex: Math.min(start + pageSize, items.length),
    total: items.length,
  };
}
