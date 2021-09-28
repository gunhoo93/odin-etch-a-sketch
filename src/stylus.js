import { EventHandler } from './utils';

export class StylusPicker {
    constructor({ stylusOptions }) {
        this.stylusOptions = stylusOptions;

        this.stylus = Object.values(stylusOptions)[0];
        this.stylus.init();
    }

    pick(name) {
        if (this.stylusOptions.hasOwnProperty(name)) {
            this.stylus.dispose();
            this.stylus = this.stylusOptions[name];
            this.stylus.init();
        } else {
            console.warn(`Stylus "${name}" does not exists`);
        }
    }

    draw(tile) {
        this.stylus.draw(tile);
    }
}

class Stylus extends EventHandler {
    constructor({ colorScheme, board }) {
        super(board);

        this.colorScheme = colorScheme;
        this.register('mouseover', evt => {
            this.draw(evt.target);
        });
    }

    draw(tile) {
        tile.style['background-color'] = this.colorScheme.getColor();
    };

    erase(tile) {
        tile.style['background-color'] = null;
    }
}

export class AutoEraseStylus extends Stylus {
    constructor({ colorScheme, board }) {
        super({ colorScheme, board });
    }

    draw(tile) {
        this.isDirty(tile) ? this.erase(tile) : super.draw(tile);
    }

    isDirty(tile) {
        return !!tile.style['background-color'];
    }
}

export class DragToEraseStylus extends Stylus {
    constructor({ colorScheme, board }) {
        super({ colorScheme, board });

        this.mousedown = false;
        this.register('mousedown', (evt) => {
            evt.preventDefault();
            this.mousedown = true;
        });
        this.register('mouseup', () => {
            this.mousedown = false;
        });
        this.register('mouseleave', () => {
            this.mousedown = false;
        });
    }

    draw(tile) {
        this.mousedown ? this.erase(tile) : super.draw(tile);
    }
}

export class ToggleToEraseStylus extends Stylus {
    constructor({ colorScheme, board }) {
        super({ colorScheme, board });

        this.toggleEraser = false;
        this.register('click', () => {
            this.toggleEraser = !this.toggleEraser;
        });
    }

    draw(tile) {
        this.toggleEraser ? this.erase(tile) : super.draw(tile);
    }
}
