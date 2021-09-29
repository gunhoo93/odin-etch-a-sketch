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

/**
 * Settings scope
 *  Colors
 *  EraseBehavior
 *  Board size
 *  Grid line toggle
 *  Board reset
 * 
 * Setting interaction
 *  Open/Close on setting click (sending open/close signal to settings will make it visible/hidden)
 *  Open/Close on board click
 */
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

const onRightClick = (target, fn) => {
    target.addEventListener('contextmenu', evt => {
        evt.preventDefault();
    });
    target.addEventListener('mousedown', evt => {
        if (evt.button === 2) {
            fn(evt);
        }
    });
};

const $settings = document.querySelector('#settings');
onRightClick($settings, () => {
    $settings.classList.toggle('is-hidden');
});

onRightClick($board, (evt) => {
    const { clientX, clientY } = evt;
    $settings.style.left = clientX + 'px';
    $settings.style.top = clientY + 'px';
    $settings.classList.toggle('is-hidden');
});