import './style.css';
import { Board } from './board';
import { StylusPicker, AutoEraseStylus, DragToEraseStylus, ToggleToEraseStylus } from './stylus';
import { ColorSchemePicker, DimmingRandomColorScheme, UserPickedColorScheme } from './color-schemes';
import { handleBoardSetting, handleSettingsToggle } from './settings';

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
    target: $board,
    length: 16
});
board.render();

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

handleBoardSetting(board, {
    input: document.querySelector('#board-resizer'),
    sizeDisplay: document.querySelector('#board-size'),
    reset: document.querySelector('#board-reset'),
    showLines: document.querySelector('#toggle-grid-line')
});

handleSettingsToggle({
    settings: document.querySelector('#settings'),
    board: $board
});