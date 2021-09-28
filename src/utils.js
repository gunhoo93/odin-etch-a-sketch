export class EventHandler {
    constructor(target) {
        this.target = target;
        this.handlers = [];
    }

    register(evt, handler) {
        this.handlers.push([evt, handler]);
    }

    init() {
        this.handlers.forEach(([evt, handler]) => {
            this.target.addEventListener(evt, handler);
        });
    }

    dispose() {
        this.handlers.forEach(([evt, handler]) => {
            this.target.removeEventListener(evt, handler);
        });
    }
}