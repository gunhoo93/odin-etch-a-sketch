import { Board } from '../board';

describe('Board', () => {
    test('painting a clean tile should paint the tile', () => {
        const board = new Board({ rows: 5, columns: 5 });
        board.paint(0, 0, '#000');

        expect(board.getTileColor(0, 0)).toBe('#000');
    });

    test('painting a dirty tile should clean the tile', () => {
        const board = new Board({ rows: 5, columns: 5 });
        board.paint(0, 0, '#000');
        board.paint(0, 0, '#000');

        expect(board.getTileColor(0, 0)).toBe(null);
    });

    test('painting a tile outside of the board should throw error', () => {
        const board = new Board({ rows: 1, columns: 1 });

        expect(() => board.paint(-1, 0)).toThrow();
        expect(() => board.paint(0, -1)).toThrow();
        expect(() => board.paint(1, 0)).toThrow();
        expect(() => board.paint(0, 1)).toThrow();

    });

    test('iterating over a board returns its coordinates', () => {
        const board = new Board({ rows: 2, columns: 2 });
        const output = [];
        for (const coord of board) {
            output.push(coord);
        }
        expect(output).toEqual([[0, 0], [0, 1], [1, 0], [1, 1]]);
    });
});