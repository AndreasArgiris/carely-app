export const ELLIPSIS = '…';

/** Page buttons to show, e.g. [1, '…', 4, 5, 6, '…', 10]. */
export function getPageNumbers(page, pageCount, siblings = 1) {
  if (pageCount <= 5 + siblings * 2) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
  const from = Math.max(2, page - siblings);
  const to = Math.min(pageCount - 1, page + siblings);
  const middle = Array.from({ length: to - from + 1 }, (_, index) => from + index);

  return [
    1,
    ...(from > 2 ? [ELLIPSIS] : []),
    ...middle,
    ...(to < pageCount - 1 ? [ELLIPSIS] : []),
    pageCount,
  ];
}
