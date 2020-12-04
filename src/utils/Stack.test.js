import Stack from './Stack';

describe('utils/Stack', () => {
  it('should allow you to iterate through elements', () => {
    const stack = new Stack([1, 2, 3, 4, 5]);
    stack.next();
    stack.next();
    const three = stack.next();
    expect(three).toMatchObject({ done: false, value: 3 });
  });

  it('should allow you to add to stack', () => {
    const stack = new Stack();
    stack.push(1);
    expect(stack.size).toBe(1);
  });

  it('should allow you to remove from stack', () => {
    const stack = new Stack([1, 2, 3, 4]);
    const value = stack.pop();
    expect(value).toBe(4);
    expect(stack.size).toBe(3);
  });

  it('should provide api to determine if stack is empty', () => {
    const stack = new Stack([1]);
    expect(stack.isEmpty).toBe(false);
    const value = stack.pop();
    expect(stack.isEmpty).toBe(true);
  });
});
