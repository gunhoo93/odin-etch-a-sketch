export class ColorSchemePicker {
    constructor(schemes) {
        this.schemes = schemes;
        this.scheme = Object.values(schemes)[0];
    }

    pick(name) {
        if (this.schemes.hasOwnProperty(name)) {
            this.scheme = this.schemes[name];
        } else {
            console.warn(`ColorScheme "${name}" does not exists`);
        }
    }

    getColor() {
        return this.scheme.getColor();
    }
}

/**
 * ColorPicker that generates random color on every request.
 * It gurantees a black color every 10th request.
 */
export class DimmingRandomColorScheme {
    constructor() {
        this.round = 0;
    }

    getColor() {
        const hue = Math.floor(Math.random() * 360);
        const light = 90 - 9 * ((this.round % 10) + 1);
        this.round += 1;
        return HSL(hue, 100, light);
    }
}

export class UserPickedColorScheme {
    constructor(input) {
        this.color = '#000';
        input.addEventListener('input', (evt) => {
            this.color = evt.target.value;
        });
    }

    getColor() {
        return this.color;
    }
}

function HSL(h, s, l) {
    return `hsl(${h}, ${s}%, ${l}%)`;
}