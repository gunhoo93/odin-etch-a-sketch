import './style.css';
import { Board } from './board';
import { StylusPicker, AutoEraseStylus, DragToEraseStylus } from './stylus';
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
const $stylusPicker = document.querySelector('#stylus-picker');
const stylusPicker = new StylusPicker({
    'auto': new AutoEraseStylus(colorSchemePicker),
    'drag': new DragToEraseStylus(colorSchemePicker, $board)
});
$stylusPicker.addEventListener('click', (evt) => {
    const { stylus } = evt.target.dataset;
    if (stylus) {
        stylusPicker.pick(stylus);
    }
});
const board = new Board({
    target: $board,
    stylus: stylusPicker
});

const $boardResizer = document.querySelector('#board-resizer');
$boardResizer.addEventListener('change', evt => {
    const length = parseInt(evt.target.value);
    board.render(length);
});
$boardResizer.dispatchEvent(new Event('change'));