import reorder from './reorder';

describe('utils.reorder', () => {
  it('should reorder array correctly', () => {
    const testArr = [0, 1, 2, 3, 4];
    const done = reorder(testArr, 0, 3);
    expect(done).toBeArrayOfSize(5);
    expect(done[3]).toBe(0);
    expect(done).toEqual([1, 2, 3, 0, 4]);
  });
});
