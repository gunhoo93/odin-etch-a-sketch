import './style.css';
import { Board } from './board';
import { StylusPicker, AutoEraseStylus, DragToEraseStylus, ToggleToEraseStylus } from './stylus';
import { ColorSchemePicker, DimmingRandomColorScheme, UserPickedColorScheme } from './color-schemes';

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
    board: board.board,
    stylusOptions: {
        'auto': new AutoEraseStylus(colorSchemePicker),
        'drag': new DragToEraseStylus(colorSchemePicker),
        'toggle': new ToggleToEraseStylus(colorSchemePicker)
    }
});
$stylusPicker.addEventListener('click', (evt) => {
    const { stylus } = evt.target.dataset;
    if (stylus) {
        stylusPicker.pick(stylus);
    }
});


const $boardResizer = document.querySelector('#board-resizer');
$boardResizer.addEventListener('change', evt => {
    const length = parseInt(evt.target.value);
    board.render(length);
});
$boardResizer.dispatchEvent(new Event('change'));