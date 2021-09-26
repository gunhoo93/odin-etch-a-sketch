import { renderHtmlBoard } from './ui';
import { Board } from './etch';

const board = new Board({ rows: 16, columns: 16 });
renderHtmlBoard(document.querySelector('.board-container'), board);