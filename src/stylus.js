export class StylusPicker {
    constructor({ board, stylusOptions }) {
        this.stylusOptions = stylusOptions;
        this.board = board;
        this.stylus = Object.values(stylusOptions)[0];
        this.stylus.init(board);
    }

    pick(name) {
        if (this.stylusOptions.hasOwnProperty(name)) {
            this.stylus = this.stylusOptions[name];
            this.stylus.init(this.board);
        } else {
            console.warn(`Stylus "${name}" does not exists`);
        }
    }

    draw(tile) {
        this.stylus.draw(tile);
    }
}

class Stylus {
    constructor(colorScheme) {
        this.colorScheme = colorScheme;
    }

    draw(tile) {
        tile.style['background-color'] = this.colorScheme.getColor();
    };

    erase(tile) {
        tile.style['background-color'] = null;
    }

    init(board) {
        board.addEventListener('mouseover', (evt) => {
            this.draw(evt.target);
        });
    }
}

export class AutoEraseStylus extends Stylus {
    constructor(colorScheme) {
        super(colorScheme);
    }

    draw(tile) {
        this.isDirty(tile) ? this.erase(tile) : super.draw(tile);
    }

    isDirty(tile) {
        return !!tile.style['background-color'];
    }
}

export class DragToEraseStylus extends Stylus {
    constructor(colorScheme) {
        super(colorScheme);

        this.mousedown = false;
    }

    draw(tile) {
        this.mousedown ? this.erase(tile) : super.draw(tile);
    }

    init(board) {
        super.init(board);

        board.addEventListener('mousedown', (evt) => {
            evt.preventDefault();
            this.mousedown = true;
        });
        board.addEventListener('mouseup', () => {
            this.mousedown = false;
        });
        board.addEventListener('mouseleave', () => {
            this.mousedown = false;
        });
    }
}

export class ToggleToEraseStylus extends Stylus {
    constructor(colorScheme) {
        super(colorScheme);
        this.toggleEraser = false;
    }

    draw(tile) {
        this.toggleEraser ? this.erase(tile) : super.draw(tile);
    }

    init(board) {
        super.init(board);
        board.addEventListener('click', () => {
            this.toggleEraser = !this.toggleEraser;
        });
    }
}
