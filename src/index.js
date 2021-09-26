import './style.css';
import { createEtchSketch, createColorPicker } from './ui';
import { DimmingRandomColor, UserPickedColor } from './colors';

createEtchSketch({
    target: document.querySelector('#board-container'),
    length: 64,
    colorPicker: createColorPicker({
        target: document.querySelector('#color-scheme-picker'),
        colorSchemes: {
            'user-picked-color': new UserPickedColor(document.querySelector('#color-input')),
            'random-color': new DimmingRandomColor()
        }
    })
});