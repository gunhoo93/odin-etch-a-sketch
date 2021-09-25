import { Board } from '../etch';

describe('Board', () => {
    test('painting a clean tile should paint the tile', () => {
        const board = new Board({ width: 5, height: 5 });
        board.paint(0, 0, '#000');

        expect(board.getTileColor(0, 0)).toBe('#000');
    });

    test('painting a dirty tile should clean the tile', () => {
        const board = new Board({ width: 5, height: 5 });
        board.paint(0, 0, '#000');
        board.paint(0, 0, '#000');

        expect(board.getTileColor(0, 0)).toBe(null);
    });

    test('painting a tile outside of the board should throw error', () => {
        const board = new Board({ width: 1, height: 1 });

        expect(() => board.paint(-1, 0)).toThrow();
        expect(() => board.paint(0, -1)).toThrow();
        expect(() => board.paint(1, 0)).toThrow();
        expect(() => board.paint(0, 1)).toThrow();

    });
});