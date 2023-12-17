import { getPaginationNumbers } from '../../src/utils/getPaginationDetails';

describe('getPaginationNumbers function', () => {
  it('should return correct pages when totalPages <= 5', () => {
    expect(getPaginationNumbers(1, 5)).toEqual([[1, 2, 3, 4, 5]]);
    expect(getPaginationNumbers(1, 3)).toEqual([[1, 2, 3]]);
  });

  it('should return correct pages when currentPage <= 3', () => {
    expect(getPaginationNumbers(1, 10)).toEqual([[1, 2, 3, 4], [10]]);
    expect(getPaginationNumbers(3, 8)).toEqual([[1, 2, 3, 4], [8]]);
  });

  it('should return correct pages when currentPage > totalPages - 3', () => {
    expect(getPaginationNumbers(8, 10)).toEqual([[1], [7, 8, 9, 10]]);
    expect(getPaginationNumbers(5, 6)).toEqual([[1], [3, 4, 5, 6]]);
  });

  it('should return correct pages for ', () => {
    expect(getPaginationNumbers(4, 10)).toEqual([[1], [3, 4, 5], [10]]);
    expect(getPaginationNumbers(6, 20)).toEqual([[1], [5, 6, 7], [20]]);
  });
});
