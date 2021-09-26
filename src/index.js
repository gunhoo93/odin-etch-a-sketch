import './style.css';
import { BoardElement, ColorPickerElement, initializeEtchSketch } from './ui';
import { Board } from './etch';

initializeEtchSketch({
    board: new BoardElement({
        target: document.querySelector('#board'),
        width: 960,
        height: 960,
        board: new Board({ rows: 16, columns: 16 })
    }),
    colorPicker: new ColorPickerElement({
        target: document.querySelector('#color-input')
    })
});