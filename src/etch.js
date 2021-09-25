export class Board {
    constructor({ rows, columns }) {
        this.width = columns;
        this.height = rows;

        this.board = [];
        for (let row = 0; row < rows; ++row) {
            this.board.push([]);
            for (let column = 0; column < columns; ++column) {
                this.board[row].push(new Tile());
            }
        }
    }

    paint(row, column, color) {
        const tile = this.board[row][column];
        tile.isClean() ? tile.paint(color) : tile.clean();
    }

    getTileColor(row, column) {
        const tile = this.board[row][column];
        return tile.color;
    }

    [Symbol.iterator]() {
        const width = this.width;
        const height = this.height;

        return {
            row: 0,
            column: 0,
            next() {
                if (this.column == width) {
                    this.column = 0;
                    this.row += 1;
                }
                if (this.column < width && this.row < height) {
                    return { value: [this.row, this.column++], done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
}

class Tile {
    constructor() {
        this.color = null;
    }

    paint(color) {
        this.color = color;
    }

    clean() {
        this.color = null;
    }

    isClean() {
        return this.color == null;
    }
}

