export class Board {
    constructor({ width, height }) {
        this.width = width;
        this.height = height;

        this.board = [];
        for (let row = 0; row < height; ++row) {
            this.board.push([]);
            for (let column = 0; column < width; ++column) {
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

