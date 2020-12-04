import toRem from './toRem';

describe('utils.toRem', () => {
  it('should convert a number to a rem value', () => {
    const result = toRem(16);
    expect(result).toBe('1rem');
    const result2 = toRem(24);
    expect(result2).toBe('1.5rem');
  });

  it('should convert a string to a rem value', () => {
    const result = toRem('16');
    expect(result).toBe('1rem');

    const result2 = toRem('16 32');
    expect(result2).toBe('1rem 2rem');
  });

  it('should deal with px in string', () => {
    const result = toRem('16px');
    expect(result).toBe('1rem');
    const result2 = toRem('24px');
    expect(result2).toBe('1.5rem');
    const result3 = toRem('16px 24px');
    expect(result3).toBe('1rem 1.5rem');
  });
});
