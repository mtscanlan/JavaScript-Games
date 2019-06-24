class I extends Tetrimino {
    constructor(ctx, scale) {
        super([
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
        ], ctx, scale, 'aqua');
    }

    clear() {
        super.clear();
    }

    draw() {
        super.draw();
    }

    drop() {
        super.drop();
    }

    getState() {
        return super.getState();
    }

    move(direction) {
        super.move(direction);
    }

    rotate() {
        super.rotate();
    }
}

class J extends Tetrimino {
    constructor(ctx, scale) {
        super([
            [0, 1, 1],
            [0, 1, 0],
            [0, 1, 0],
        ], ctx, scale, 'blue');
    }

    clear() {
        super.clear();
    }

    draw() {
        super.draw();
    }

    drop() {
        super.drop();
    }

    getState() {
        return super.getState();
    }

    move(direction) {
        super.move(direction);
    }

    rotate() {
        super.rotate();
    }
}

class L extends Tetrimino {
    constructor(ctx, scale) {
        super([
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
        ], ctx, scale, 'coral');
    }

    clear() {
        super.clear();
    }

    draw() {
        super.draw();
    }

    drop() {
        super.drop();
    }

    getState() {
        return super.getState();
    }

    move(direction) {
        super.move(direction);
    }

    rotate() {
        super.rotate();
    }
}

class O extends Tetrimino {
    constructor(ctx, scale) {
        super([
            [1, 1],
            [1, 1]
        ], ctx, scale, 'gold');
    }

    clear() {
        super.clear();
    }

    draw() {
        super.draw();
    }

    drop() {
        super.drop();
    }

    getState() {
        return super.getState();
    }

    move(direction) {
        super.move(direction);
    }

    rotate() {
        super.rotate();
    }
}

class S extends Tetrimino {
    constructor(ctx, scale) {
        super([
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ], ctx, scale, 'lime');
    }

    clear() {
        super.clear();
    }

    draw() {
        super.draw();
    }

    drop() {
        super.drop();
    }

    getState() {
        return super.getState();
    }

    move(direction) {
        super.move(direction);
    }

    rotate() {
        super.rotate();
    }
}

class T extends Tetrimino {
    constructor(ctx, scale) {
        super([
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ], ctx, scale, 'mediumvioletred');
    }

    clear() {
        super.clear();
    }

    draw() {
        super.draw();
    }

    drop() {
        super.drop();
    }

    getState() {
        return super.getState();
    }

    move(direction) {
        super.move(direction);
    }

    rotate() {
        super.rotate();
    }
}

class Z extends Tetrimino {
    constructor(ctx, scale) {
        super([
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ], ctx, scale, 'crimson');
    }

    clear() {
        super.clear();
    }

    draw() {
        super.draw();
    }

    drop() {
        super.drop();
    }

    getState() {
        return super.getState();
    }

    move(direction) {
        super.move(direction);
    }

    rotate() {
        super.rotate();
    }
}