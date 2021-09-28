/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/board.js
class Board {
    constructor({ target }) {
        this.target = target;
        this.board = document.createElement('div');
        this.board.className = 'board';
        this.board.style['display'] = 'grid';
    }

    render(length) {
        const tiles = [];
        for (let i = 0; i < length * length; ++i) {
            tiles.push(document.createElement('div'));
        }
        this.board.style['grid-template-rows'] = `repeat(${length}, calc(100% / ${length}))`;
        this.board.style['grid-template-columns'] = `repeat(${length}, calc(100% / ${length}))`;
        this.board.replaceChildren(...tiles);
        this.target.appendChild(this.board); // appendChild acts like a replace when same element ref is passed
    }

    toggleGrid() {
        this.board.classList.toggle('show-grid');
    }
}


;// CONCATENATED MODULE: ./src/utils.js
class EventHandler {
    constructor(target) {
        this.target = target;
        this.handlers = [];
    }

    register(evt, handler) {
        this.handlers.push([evt, handler]);
    }

    init() {
        this.handlers.forEach(([evt, handler]) => {
            this.target.addEventListener(evt, handler);
        });
    }

    dispose() {
        this.handlers.forEach(([evt, handler]) => {
            this.target.removeEventListener(evt, handler);
        });
    }
}
;// CONCATENATED MODULE: ./src/stylus.js


class StylusPicker {
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

class AutoEraseStylus extends Stylus {
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

class DragToEraseStylus extends Stylus {
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

class ToggleToEraseStylus extends Stylus {
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

;// CONCATENATED MODULE: ./src/color-schemes.js
class ColorSchemePicker {
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
class DimmingRandomColorScheme {
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

class UserPickedColorScheme {
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
;// CONCATENATED MODULE: ./src/index.js





const $colorSchemePicker = document.querySelector('#color-scheme-picker');
const colorSchemePicker = new ColorSchemePicker({
    'manual': new UserPickedColorScheme(document.querySelector('#color-input')),
    'random': new DimmingRandomColorScheme()
});
$colorSchemePicker.addEventListener('click', (evt) => {
    const { color } = evt.target.dataset;
    if (color) {
        colorSchemePicker.pick(color);
    }
});

const $board = document.querySelector('#board-container');
const board = new Board({
    target: $board
});

const $stylusPicker = document.querySelector('#stylus-picker');
const stylusPicker = new StylusPicker({
    stylusOptions: {
        'auto': new AutoEraseStylus({
            board: board.board,
            colorScheme: colorSchemePicker
        }),
        'drag': new DragToEraseStylus({
            board: board.board,
            colorScheme: colorSchemePicker
        }),
        'toggle': new ToggleToEraseStylus({
            board: board.board,
            colorScheme: colorSchemePicker
        })
    }
});
$stylusPicker.addEventListener('click', (evt) => {
    const { stylus } = evt.target.dataset;
    if (stylus) {
        stylusPicker.pick(stylus);
    }
});


const $boardResizer = document.querySelector('#board-resizer');
const $boardSize = document.querySelector('#board-size');
$boardResizer.addEventListener('input', evt => {
    const length = evt.target.value;
    $boardSize.textContent = `${length}x${length}`;
});
$boardResizer.addEventListener('change', evt => {
    const length = parseInt(evt.target.value);
    board.render(length);
});
$boardResizer.dispatchEvent(new Event('change'));

const $boardReset = document.querySelector('#board-reset');
$boardReset.addEventListener('click', () => {
    $boardResizer.dispatchEvent(new Event('change'));
});

const $toggleGridLine = document.querySelector('#toggle-grid-line');
$toggleGridLine.addEventListener('change', () => {
    board.toggleGrid();
});

const $settings = document.querySelector('#settings');
$settings.addEventListener('contextmenu', evt => {
    evt.preventDefault();
});
$settings.addEventListener('mousedown', evt => {
    if (evt.button === 2) {
        $settings.classList.toggle('is-hidden');
    }
});
$board.addEventListener('contextmenu', evt => {
    evt.preventDefault();
});
$board.addEventListener('mousedown', evt => {
    if (evt.button === 2) {
        const { clientX, clientY } = evt;
        $settings.style.left = clientX + 'px';
        $settings.style.top = clientY + 'px';
        $settings.classList.toggle('is-hidden');
    }
});
/******/ })()
;