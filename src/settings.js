export function handleBoardSetting(board, { input, sizeDisplay, reset, showLines }) {
    input.addEventListener('input', evt => {
        const length = evt.target.value;
        sizeDisplay.textContent = `${length}x${length}`;
    });
    // Only draw upon receiving final input
    input.addEventListener('change', evt => {
        const length = evt.target.value;
        board.resize(length);
    });

    reset.addEventListener('click', () => {
        board.reset();
        showLines.checked = false;
    });

    showLines.addEventListener('change', (evt) => {
        evt.target.checked ? board.showLines() : board.hideLines();
    });
}

export function handleSettingsToggle({ settings, board }) {
    [settings, board].forEach(elem => {
        onRightClick(elem, () => {
            settings.classList.add('is-hidden'); // classList.add won't add duplicate
        });
    });

    onRightClick(board, (evt) => {
        const { clientX, clientY } = evt;
        settings.style.left = clientX + 'px';
        settings.style.top = clientY + 'px';
        settings.classList.remove('is-hidden');
    });
}

const onRightClick = (target, fn) => {
    target.addEventListener('contextmenu', evt => {
        evt.preventDefault();
    });
    target.addEventListener('mousedown', evt => {
        if (evt.button === 2) {
            fn(evt);
        }
    });
};