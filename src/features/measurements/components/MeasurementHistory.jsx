import { AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';
import { usePagination } from '@/shared/hooks/usePagination';
import { AnimatedListItem } from '@/shared/ui/AnimatedListItem';
import { EmptyState } from '@/shared/ui/EmptyState';
import { Pagination } from '@/shared/ui/Pagination';
import { MeasurementRow } from './MeasurementRow';

export const PAGE_SIZE = 10;

export function MeasurementHistory({ items, onRemove }) {
  const { pageItems, setPage, ...pagination } = usePagination(items, PAGE_SIZE);

  if (items.length === 0) {
    return (
      <EmptyState
        icon={Activity}
        title="No measurements"
        text="Nothing recorded in this period yet."
      />
    );
  }

  return (
    <section aria-label="Measurement history">
      <ul key={pagination.page} className="space-y-2">
        <AnimatePresence initial={false}>
          {pageItems.map((item) => (
            <AnimatedListItem key={item.id}>
              <MeasurementRow item={item} isLatest={item.id === items[0].id} onRemove={onRemove} />
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </ul>
      <Pagination {...pagination} onPageChange={setPage} />
    </section>
  );
}
