const Pixel = (size) => `${size}px`;

export function initializeEtchSketch({ board, colorPicker }) {
    board.listen('mouseover', (evt) => {
        board.paint(evt.target, colorPicker.color);
    });
}

export class BoardElement {
    constructor({ target, width, height, board }) {
        const tiles = [];
        const tileWidth = width / board.columns;
        const tileHeight = height / board.rows;
        for (const [row, column] of board) {
            const tile = createTileElement({
                width: tileWidth,
                height: tileHeight,
                row: row,
                column: column
            });
            tiles.push(tile);
        }
        target.style.width = Pixel(width);
        target.style.height = Pixel(height);

        // Enforces $target to contain a single board.
        target.replaceChildren(...tiles);

        this.element = target;
        this.board = board;
    }

    paint($tile, color) {
        const { row, column } = $tile.dataset;
        if (row === undefined || column === undefined) {
            console.warn('Tile element missing row, column data attribute');
        }
        this.board.paint(row, column, color);
        $tile.style['background-color'] = this.board.getTileColor(row, column);
    }

    listen(evtType, handler) {
        this.element.addEventListener(evtType, handler);
    }
}

export class ColorPickerElement {
    constructor({ target, initialColor = '#000' }) {
        this.color = initialColor;
        target.addEventListener('input', (evt) => {
            this.color = evt.target.value;
        });
    }
}

function createTileElement({ width, height, row, column }) {
    const elem = document.createElement('div');
    elem.className = 'tile';
    elem.dataset.row = row;
    elem.dataset.column = column;
    elem.style.width = Pixel(width);
    elem.style.height = Pixel(height);

    const label = document.createElement('span');
    label.className = 'visually-hidden';
    label.textContent = `row ${row + 1} column ${column + 1}`;
    elem.appendChild(label);

    return elem;
}