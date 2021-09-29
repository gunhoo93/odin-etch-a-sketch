/**
 * Settings scope
 *  Colors
 *  EraseBehavior
 *  Board size
 *  Grid line toggle
 *  Board reset
 *
 * Setting interaction
 *  Open/Close on setting click (sending open/close signal to settings will make it visible/hidden)
 *  Open/Close on board click
 */
export function handleBoardResize(board, { input, label }) {
    input.addEventListener('input', evt => {
        const length = evt.target.value;
        label.textContent = `${length}x${length}`;
    });
    // Only draw upon receiving final input
    input.addEventListener('change', evt => {
        const length = evt.target.value;
        board.resize(length);
    });
}