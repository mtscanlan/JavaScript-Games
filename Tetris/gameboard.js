const LEFT = 'ArrowLeft';
const RIGHT = 'ArrowRight';
const DOWN = 'ArrowDown';
const GAME_BOARD_COLOR = '#3e3e3e';
const STROKE_COLOR = '#000';


class Gameboard {
    constructor(scale, difficultyLevel, canvas) {
        this.scale = scale;
        this.context = canvas.getContext('2d');
        this.atRestStates = [];
        this.floor = [];

        for (let i = 0; i < this.context.canvas.width; i = i + scale) {
            this.floor.push({
                x: i,
                y: canvas.height
            });
        }

        this.pieces = [
            () => {
                return new I(this.context, scale);
            },
            () => {
                return new J(this.context, scale);
            },
            () => {
                return new L(this.context, scale);
            },
            () => {
                return new O(this.context, scale);
            },
            () => {
                return new S(this.context, scale);
            },
            () => {
                return new T(this.context, scale);
            },
            () => {
                return new Z(this.context, scale);
            }
        ];

        // Initialize and start game
        this.nextPiece = this.getRandom();
        this.getNextPiece();
        setInterval(() => this.interact(DOWN), difficultyLevel);
    }

    getNextPiece() {
        this.currentPiece = this.nextPiece;
        this.nextPiece = this.getRandom();
        this.currentPiece.draw();
    }

    getRandom() {
        return this.pieces[Math.floor(Math.random() * this.pieces.length)]();
    }

    hasLanded() {
        function currentPieceIntersectsPixel(pixel) {
            return this.currentPiece.getState().some(cpp => {
                return cpp.x == pixel.x && cpp.y == pixel.y;
            })
        }

        let isOnFloor = this.floor.filter(currentPieceIntersectsPixel.bind(this)).length > 0;
        let isOnPiece = this.atRestStates.flat().filter(currentPieceIntersectsPixel.bind(this)).length > 0;
        return isOnFloor || isOnPiece;
    }

    handleFullRows() {
        let groups = this.atRestStates.reduce(function (rv, x) {
                (rv[x.y] = rv[x.y] || []).push(x);
                return rv;
            }, {});

        let removed = 0;
        Object.keys(groups).reverse().forEach(fe => {
            if (groups[fe].length == 10) {
                removed++;
                delete groups[fe];
            } else {
                groups[fe].forEach(pixel => pixel.y += this.scale * removed);
            }
        });
        this.atRestStates = Object.values(groups).flat();

        if (removed > 0) {
            this.context.fillStyle = GAME_BOARD_COLOR;
            this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);

            this.context.strokeStyle = GAME_BOARD_COLOR;
            this.context.lineWidth = 2;
            this.context.strokeRect(0, 0, this.context.canvas.width, this.context.canvas.height);

            this.atRestStates.forEach(fe => {
                this.context.fillStyle = fe.color;
                this.context.fillRect(fe.x, fe.y, this.scale, this.scale);

                this.context.strokeStyle = STROKE_COLOR;
                this.context.lineWidth = 2;
                this.context.strokeRect(fe.x, fe.y, this.scale, this.scale);
            });
        }
    }

    interact(key) {
        let tempCurrent = this.currentPiece.getState();
        switch (key) {
            case LEFT:
                this.currentPiece.moveLeft(key);
                break;
            case RIGHT:
                this.currentPiece.moveRight(key);
                break;
            case DOWN:
                this.currentPiece.drop();
                if (this.hasLanded()) {
                    this.atRestStates = [...this.atRestStates, ...tempCurrent];
                    this.getNextPiece();
                    this.handleFullRows();
                    return;
                }
                break;
            case ' ':
                this.currentPiece.rotate();
            default:
                break;
        }
        tempCurrent.forEach(t => {
            this.context.fillStyle = GAME_BOARD_COLOR;
            this.context.fillRect(t.x, t.y, this.scale, this.scale);

            this.context.strokeStyle = GAME_BOARD_COLOR;
            this.context.lineWidth = 2;
            this.context.strokeRect(t.x, t.y, this.scale, this.scale);
        });
        this.currentPiece.draw();
    }
}