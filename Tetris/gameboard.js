const LEFT = "ArrowLeft";
const RIGHT = "ArrowRight";
const DOWN = "ArrowDown";

class Gameboard {
    constructor(scale, difficultyLevel, canvas) {
        this.scale = scale;
        this.context = canvas.getContext('2d');
        this.atRestStates = [];
        this.floor = [];

        for (var i = 0; i < this.context.canvas.width; i = i + scale) {
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

    interact(key) {
        function groupBy(xs, key) {
            return xs.reduce(function (rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        }

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
                    var groups = groupBy(this.atRestStates, 'y');
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
                        this.context.fillStyle = '#3e3e3e';
                        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    
                        this.context.strokeStyle = "#3e3e3e";
                        this.context.lineWidth = 2;
                        this.context.strokeRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    
                        this.atRestStates.forEach(fe => {
                            this.context.fillStyle = fe.color;
                            this.context.fillRect(fe.x, fe.y, this.scale, this.scale);
        
                            this.context.strokeStyle = "#000";
                            this.context.lineWidth = 2;
                            this.context.strokeRect(fe.x, fe.y, this.scale, this.scale);
                        });
                    }
                    return;
                }
                break;
            case ' ':
                this.currentPiece.rotate();
            default:
                break;
        }
        tempCurrent.forEach(t => {
            this.context.fillStyle = '#3e3e3e';
            this.context.fillRect(t.x, t.y, this.scale, this.scale);

            this.context.strokeStyle = "#3e3e3e";
            this.context.lineWidth = 2;
            this.context.strokeRect(t.x, t.y, this.scale, this.scale);
        });
        this.currentPiece.draw();
    }
}