import { DimmingRandomColorScheme } from "../color-schemes";

describe('DimmingRandomColorScheme', () => {
    test('gurantees black on every 10th call', () => {
        const colorPicker = new DimmingRandomColorScheme();
        repeat(9, () => colorPicker.getColor());
        expect(colorPicker.getColor()).toMatch(/0%\)$/);

        repeat(9, () => colorPicker.getColor());
        expect(colorPicker.getColor()).toMatch(/0%\)$/);
    });
});

function repeat(n, fn) {
    for (let i = 0; i < n; ++i) {
        fn();
    }
}