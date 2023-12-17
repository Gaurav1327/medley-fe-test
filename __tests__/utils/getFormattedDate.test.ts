import { getFormattedDate } from '../../src/utils/getFormattedDate';

describe('getFormattedDate function', () => {
  it('should format the date correctly', () => {
    const formattedDate2 = getFormattedDate('2023-06-15T14:30:00');
    expect(formattedDate2).toBe('Thu, Jun 15, 14:30');
  });

  it('should format the date as per local timezone', () => {
    const formattedDate1 = getFormattedDate('2023-12-31T08:15:00Z');
    expect(formattedDate1).toBe('Sun, Dec 31, 13:45');
  });

  it('should handle invalid date input', () => {
    const formattedDate = getFormattedDate('');
    expect(formattedDate).toBe('Invalid Date');
  });
});
