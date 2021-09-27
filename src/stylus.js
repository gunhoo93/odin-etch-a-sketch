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
    constructor(colorScheme) {
        super(colorScheme);

        this.mousedown = false;
        // TODO: find better place to put these and make sure to clean if not in use.
        document.addEventListener('mousedown', (evt) => {
            this.mousedown = true;
        });
        document.addEventListener('mouseup', () => {
            this.mousedown = false;
        });
    }

    draw(tile) {
        this.mousedown ? this.erase(tile) : super.draw(tile);
    }
}