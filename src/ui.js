const Pixel = (size) => `${size}px`;

export function initializeEtchSketch({ board, colorPicker }) {
    board.listen('mouseover', (evt) => {
        board.paint(evt.target, colorPicker.getColor());
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
    constructor({ container, colorSchemes = {} }) {
        this.colorSchemes = colorSchemes;
        this.currentScheme = colorSchemes[Object.keys(colorSchemes)[0]];

        container.addEventListener('click', (evt) => {
            const data = evt.target.dataset;
            console.log(data.scheme, this.colorSchemes[data.scheme], this.colorSchemes);
            if (data.hasOwnProperty('scheme')) {
                this.currentScheme = this.colorSchemes[data.scheme];
            }
        });
    }

    getColor() {
        return this.currentScheme.getColor();
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