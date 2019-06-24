class I extends Tetrimino {
    constructor(ctx, scale) {
        super([
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
        ], ctx, scale, 'aqua');
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
}

class L extends Tetrimino {
    constructor(ctx, scale) {
        super([
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
        ], ctx, scale, 'coral');
    }
}

class O extends Tetrimino {
    constructor(ctx, scale) {
        super([
            [1, 1],
            [1, 1]
        ], ctx, scale, 'gold');
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
}

class T extends Tetrimino {
    constructor(ctx, scale) {
        super([
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ], ctx, scale, 'mediumvioletred');
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
}