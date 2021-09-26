export function createEtchSketch({ target, rows, columns, colorPicker }) {
    const board = document.createElement('div');
    board.className = 'board';
    board.style['display'] = 'grid';
    board.style['grid-template-rows'] = `repeat(${rows}, calc(100% / ${rows}))`;
    board.style['grid-template-columns'] = `repeat(${columns}, calc(100% / ${columns}))`;

    for (let i = 0; i < rows * columns; ++i) {
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