import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ELLIPSIS, getPageNumbers } from '@/shared/lib/pagination';

const PAGE_BUTTON =
  'grid h-8 min-w-8 place-items-center rounded-full px-2 text-xs font-semibold tabular-nums transition';

function PageButton({ page, isCurrent, onSelect }) {
  return (
    <button
      type="button"
      aria-label={`Page ${page}`}
      aria-current={isCurrent ? 'page' : undefined}
      onClick={() => onSelect(page)}
      className={`${PAGE_BUTTON} ${isCurrent ? 'bg-sun text-ink shadow-glow-sm' : 'text-zinc-500 hover:bg-sun-50 hover:text-ink'}`}
    >
      {page}
    </button>
  );
}

function StepButton({ label, icon: Icon, isDisabled, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={isDisabled}
      onClick={onClick}
      className={`${PAGE_BUTTON} border border-zinc-200 text-ink hover:border-ink disabled:pointer-events-none disabled:opacity-30`}
    >
      <Icon className="size-4" />
    </button>
  );
}

export function Pagination({ page, pageCount, firstIndex, lastIndex, total, onPageChange }) {
  if (total === 0) return null;

  return (
    <nav aria-label="Pagination" className="mt-5 flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-zinc-500 tabular-nums">
        Showing{' '}
        <span className="font-semibold text-ink">
          {firstIndex}–{lastIndex}
        </span>{' '}
        of {total}
      </p>
      {pageCount > 1 && (
        <div className="flex items-center gap-1">
          <StepButton
            label="Previous page"
            icon={ChevronLeft}
            isDisabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          />
          {getPageNumbers(page, pageCount).map((item, index) =>
            item === ELLIPSIS ? (
              <span key={`gap-${index}`} className="px-1 text-xs text-zinc-400">
                {ELLIPSIS}
              </span>
            ) : (
              <PageButton
                key={item}
                page={item}
                isCurrent={item === page}
                onSelect={onPageChange}
              />
            ),
          )}
          <StepButton
            label="Next page"
            icon={ChevronRight}
            isDisabled={page === pageCount}
            onClick={() => onPageChange(page + 1)}
          />
        </div>
      )}
    </nav>
  );
}
