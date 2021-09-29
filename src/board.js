/**
 * Manages reference to a board element
 */
export class Board {
    constructor({ target, length }) {
        this.target = target;
        this.length = length;
        this.board = document.createElement('div');
        this._build();
    }

    _build() {
        const { length, board } = this;
        const tiles = [];
        for (let i = 0; i < length * length; ++i) {
            tiles.push(document.createElement('div'));
        }
        board.className = 'board';
        board.style['display'] = 'grid';
        board.style['grid-template-rows'] = `repeat(${length}, calc(100% / ${length}))`;
        board.style['grid-template-columns'] = `repeat(${length}, calc(100% / ${length}))`;
        board.replaceChildren(...tiles);
    }

    resize(length) {
        this.length = parseInt(length);
        this._build();
        this.render();
    }

    reset() {
        this._build();
        this.render();
    }

    render() {
        this.target.appendChild(this.board); // appendChild acts like a replace when same element ref is passed
    }

    showLines() {
        this.board.classList.add('show-grid');
    }

    hideLines() {
        this.board.classList.remove('show-grid');
    }
}

