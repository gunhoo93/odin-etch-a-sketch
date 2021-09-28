export class Board {
    constructor({ target }) {
        this.target = target;
        this.board = document.createElement('div');
        this.board.className = 'board';
        this.board.style['display'] = 'grid';
    }

    render(length) {
        const tiles = [];
        for (let i = 0; i < length * length; ++i) {
            tiles.push(document.createElement('div'));
        }
        this.board.style['grid-template-rows'] = `repeat(${length}, calc(100% / ${length}))`;
        this.board.style['grid-template-columns'] = `repeat(${length}, calc(100% / ${length}))`;
        this.board.replaceChildren(...tiles);
        this.target.appendChild(this.board); // appendChild acts like a replace when same element ref is passed
    }
}

