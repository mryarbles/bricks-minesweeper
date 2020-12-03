import {
  buildBoard,
  getRandomCell,
  buildEmptyMatrix
} from './AppStoreProvider';

describe('stores.AppStoreProvider.buildBoard', () => {
  it('should build the board correctly', () => {
    let bombs = 5;
    const board = buildBoard(5, 10, bombs, [5, 5]);
    expect(board).toBeArray();
    expect(board).toBeArrayOfSize(5);
    expect(board[0]).toBeArrayOfSize(10);

    board.forEach((row) => {
      const foundBombs = row.filter((value) => value === 9);
      bombs = bombs - foundBombs.length;
    });

    expect(bombs).toBe(0);
  });

  it('should not allow bomb in initial play cell', () => {
    const board = buildBoard(2, 2, 1, [0, 0]);
    let x = 0;
    while (x++ < 100) {
      expect(board[0][0]).toBe(0);
    }
  });
});

describe('getRandomCell', () => {
  it('should randomize cell selection', () => {
    let x = 0;
    while (x++ < 100) {
      const cell = getRandomCell(5, 5);
      console.log(cell);
      expect(cell[0] >= 0 && cell[0] < 5).toBeTruthy();
    }
  });
});

describe('buildEmptyMatrix', () => {
  it('should build matrix with all 0s', () => {
    const board = buildEmptyMatrix(5, 5);
    debugger;
    expect(board[0]).toBeArrayOfSize(5);
  });
});