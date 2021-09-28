export class StylusPicker {
    constructor(stylusSet) {
        this.stylusSet = stylusSet;
        this.stylus = Object.values(stylusSet)[0];
    }

    pick(name) {
        if (this.stylusSet.hasOwnProperty(name)) {
            this.stylus = this.stylusSet[name];
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
    constructor(colorScheme, board) {
        super(colorScheme);

        this.mousedown = false;
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

    draw(tile) {
        this.mousedown ? this.erase(tile) : super.draw(tile);
    }
}

export class ToggleToEraseStylus extends Stylus {
    constructor(colorScheme, board) {
        super(colorScheme);
        this.toggleEraser = false;

        board.addEventListener('click', () => {
            this.toggleEraser = !this.toggleEraser;
        });
    }

    draw(tile) {
        this.toggleEraser ? this.erase(tile) : super.draw(tile);
    }
}
