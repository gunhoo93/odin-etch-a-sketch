/**
 * ColorPicker that generates random color on every request.
 * It gurantees a black color every 10th request.
 */
export class DimmingRandomColor {
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

export class UserPickedColor {
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