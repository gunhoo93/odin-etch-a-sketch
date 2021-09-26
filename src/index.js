import './style.css';
import { BoardElement, ColorPickerElement, initializeEtchSketch } from './ui';
import { Board } from './board';
import { DimmingRandomColor, UserPickedColor } from './colors';

initializeEtchSketch({
    board: new BoardElement({
        target: document.querySelector('#board'),
        width: 960,
        height: 960,
        board: new Board({ rows: 16, columns: 16 })
    }),
    colorPicker: new ColorPickerElement({
        container: document.querySelector('#color-scheme-picker'),
        colorSchemes: {
            'user-picked-color': new UserPickedColor(document.querySelector('#color-input')),
            'random-color': new DimmingRandomColor()
        }
    })
});