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

export class ArtistStylus extends Stylus {
    constructor(colorScheme, board) {
        super(colorScheme);

        this.modes = CycleArray(['draw', 'erase', 'inactive']);
        board.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            evt.deltaY < 0 ? this.modes.next() : this.modes.prev();
            console.log(this.modes.current());
        });
    }

    draw(tile) {
        switch (this.modes.current()) {
            case 'draw':
                super.draw(tile);
                break;
            case 'erase':
                super.erase(tile);
                break;
            case 'neutral':
                return;
        }
    }
}

function CycleArray(array) {
    let i = 0;

    return {
        next() {
            i += 1;
            if (i === array.length) {
                i = 0;
            }
        },
        prev() {
            i -= 1;
            if (i < 0) {
                i = array.length - 1;
            }
        },
        current() {
            return array[i];
        }
    };
}