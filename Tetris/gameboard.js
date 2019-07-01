const LEFT = 'ArrowLeft';
const RIGHT = 'ArrowRight';
const DOWN = 'ArrowDown';
const GAME_BOARD_COLOR = '#3e3e3e';
const STROKE_COLOR = '#000';


class Gameboard {
    constructor(scale, difficultyLevel, canvas) {
        this.scale = scale;
        this.context = canvas.getContext('2d');
        this.atRestPixels = new Boundary(this.context, scale);

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
        return this.currentPiece.getState().some(s => this.atRestPixels.isInFloor(s)) || 
            this.currentPiece.getState().some(s => this.atRestPixels.isInPixel(s));
    }

    collision() {
        return this.currentPiece.getState().some(s => this.atRestPixels.isInWall(s)) || 
            this.currentPiece.getState().some(s => this.atRestPixels.isInPixel(s));
    }

    removeFullRows() {
        let removed = this.atRestPixels.checkAndRemoveFullRowOfPixels();
        if (removed > 0) {
            this.atRestPixels.redrawPixels();
        }
    }

    interact(key) {
        let tempCurrent = this.currentPiece.getState();
        switch (key) {
            case LEFT:
                this.currentPiece.moveLeft();
                if (this.collision()) {
                    this.currentPiece.moveRight();
                    return;
                }
                break;
            case RIGHT:
                this.currentPiece.moveRight();
                if (this.collision()) {
                    this.currentPiece.moveLeft();
                    return;
                }
                break;
            case DOWN:
                this.currentPiece.drop();
                if (this.hasLanded()) {
                    tempCurrent.forEach(fe => this.atRestPixels.addPixel(fe));
                    this.getNextPiece();
                    this.removeFullRows();
                    return;
                }
                break;
            case ' ':
                this.currentPiece.rotate();
                if (this.atRestPixels.isInLeftWall())
            default:
                break;
        }

        tempCurrent.forEach(fe => {
            this.context.fillStyle = GAME_BOARD_COLOR;
            this.context.fillRect(fe.x, fe.y, this.scale, this.scale);

            this.context.strokeStyle = GAME_BOARD_COLOR;
            this.context.lineWidth = 2;
            this.context.strokeRect(fe.x, fe.y, this.scale, this.scale);
        });

        this.currentPiece.draw();
    }
}