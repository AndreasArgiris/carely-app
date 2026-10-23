import { ELLIPSIS, getPageNumbers } from './pagination';

describe('getPageNumbers', () => {
  it('lists every page when there are few', () => {
    expect(getPageNumbers(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('collapses distant pages into ellipses', () => {
    expect(getPageNumbers(1, 12)).toEqual([1, 2, ELLIPSIS, 12]);
    expect(getPageNumbers(6, 12)).toEqual([1, ELLIPSIS, 5, 6, 7, ELLIPSIS, 12]);
    expect(getPageNumbers(12, 12)).toEqual([1, ELLIPSIS, 11, 12]);
  });
});
