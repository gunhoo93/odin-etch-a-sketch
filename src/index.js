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
$boardResizer.addEventListener('change', evt => {
    const length = parseInt(evt.target.value);
    board.render(length);
});
$boardResizer.dispatchEvent(new Event('change'));

const $settings = document.querySelector('#settings');
$settings.addEventListener('contextmenu', evt => {
    evt.preventDefault();
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