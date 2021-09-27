export class Board {
    constructor({ target, stylus }) {
        this.target = target;
        this.stylus = stylus;
    }

    render(length) {
        const board = document.createElement('div');
        board.className = 'board';
        board.style['display'] = 'grid';
        board.style['grid-template-rows'] = `repeat(${length}, calc(100% / ${length}))`;
        board.style['grid-template-columns'] = `repeat(${length}, calc(100% / ${length}))`;

        for (let i = 0; i < length * length; ++i) {
            const tile = document.createElement('div');
            board.appendChild(tile);
        }

        board.addEventListener('mouseover', (evt) => {
            this.stylus.draw(evt.target);
        });

        this.target.replaceChildren(board);
    }
}
