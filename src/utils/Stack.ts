interface IIteratorResult<T> {
  value: T;
  done: boolean;
}

export interface IStack<T> {
  pop(): T;
  push(item: T): IStack<T>;
  peek(index: number): T;
  next(): IIteratorResult<T>;
  hasNext: boolean;
  isEmpty: boolean;
  size: number;
}

export default class Stack<T> implements IStack<T> {
  private index: number = 0;
  private data: T[];

  constructor(data: T[] = []) {
    this.data = data;
  }

  get isEmpty(): boolean {
    return this.data.length === 0;
  }

  get hasNext(): boolean {
    return this.isEmpty === false;
  }

  push(item: T): IStack<T> {
    this.data.push(item);
    return this;
  }

  pop(): T {
    return this.data.pop();
  }

  peek(index: number): T {
    return this.data[index];
  }

  next(): IIteratorResult<T> {
    if (this.index < this.data.length) {
      return { value: this.data[this.index++], done: false };
    } else {
      this.index = 0;
      return { value: undefined, done: true };
    }
  }

  get size(): number {
    return this.data.length;
  }

  /* [Symbol.iterator](): any {
    return {
      next: (): IteratorResult<T> => {
        if (this.index < this.data.length) {
          return {value: this.data[this.index++], done: false};
        } else {
          this.index = 0; //If we would like to iterate over this again without forcing manual update of the index
          return {value: undefined, done: true};
        }
      }
    }
  }*/
}
