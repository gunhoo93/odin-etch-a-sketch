export function renderHtmlBoard($target, board) {
    const $tiles = [];
    for (const [row, column] of board) {
        const $tile = document.createElement('div');
        $tile.className = 'tile';
        $tile.dataset.row = row;
        $tile.dataset.column = column;

        const $tileLabel = document.createElement('span');
        $tileLabel.className = 'visually-hidden';
        $tileLabel.textContent = `row ${row + 1} column ${column + 1}`;
        $tile.appendChild($tileLabel);
        $tiles.push($tile);
    }

    // Enforces $target to contain a single board.
    $target.replaceChildren(...$tiles);
}
