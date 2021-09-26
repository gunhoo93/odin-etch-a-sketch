export function createEtchSketch({ target, length, colorPicker }) {
    const board = document.createElement('div');
    board.className = 'board';
    board.style['display'] = 'grid';
    board.style['grid-template-rows'] = `repeat(${length}, calc(100% / ${length}))`;
    board.style['grid-template-columns'] = `repeat(${length}, calc(100% / ${length}))`;

    for (let i = 0; i < length * length; ++i) {
        const tile = document.createElement('div');
        board.appendChild(tile);
    }

    function paint(tile, color) {
        if (tile.style['background-color']) {
            tile.style['background-color'] = null;
        }
        else {
            tile.style['background-color'] = color;
        }
    }

    board.addEventListener('mouseover', (evt) => {
        paint(evt.target, colorPicker.getColor());
    });

    target.replaceChildren(board);
}

export function createColorPicker({ target, colorSchemes = {} }) {
    let currentScheme = colorSchemes[Object.keys(colorSchemes)[0]];

    target.addEventListener('click', (evt) => {
        const data = evt.target.dataset;
        if (data.hasOwnProperty('scheme')) {
            currentScheme = colorSchemes[data.scheme];
        }
    });

    return {
        getColor() {
            return currentScheme.getColor();
        }
    };
}