const GAME_BOARD_COLOR = '#3e3e3e';
const STROKE_COLOR = '#000';

class Tetrimino {
    constructor(shape, ctx, scale, color) {
        this.shape = shape;
        this.ctx = ctx;
        this.scale = scale;
        this.color = color;
        var middle = Math.floor(ctx.canvas.clientWidth / 2);

        this.posX = middle - Math.floor(shape.length * scale);
        this.posY = 0;
    }

    drop() {
        this.posY += this.scale;
    }

    moveRight() {
        this.posX += this.scale;
    }

    moveLeft() {
        this.posX -= this.scale;
    }

    rotate() {
        this.shape = this.shape.reverse();
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < i; j++) {
                let temp = this.shape[i][j];
                this.shape[i][j] = this.shape[j][i];
                this.shape[j][i] = temp;
            }
        }
    }

    draw() {
        this.getState().forEach(fs => {
            this.ctx.fillStyle = fs.color;
            //console.log(`${this.posX} + ${x * this.scale} - ${this.posY} + ${x * this.scale}`);
            this.ctx.fillRect(fs.x, fs.y, this.scale, this.scale);

            this.ctx.strokeStyle = STROKE_COLOR;
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(fs.x, fs.y, this.scale, this.scale);
        });
    }

    clear() {
        this.getState().forEach(t => {
            this.ctx.fillStyle = GAME_BOARD_COLOR;
            this.ctx.fillRect(t.x, t.y, this.scale, this.scale);

            this.ctx.strokeStyle = GAME_BOARD_COLOR;
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(t.x, t.x, this.scale, this.scale);
        });
    }

    getState() {
        let finalState = [];
        for (let y = 0; y < this.shape.length; y++) {
            for (let x = 0; x < this.shape[y].length; x++) {
                if (this.shape[y][x]) {
                    finalState.push({
                        x: this.posX + (x * this.scale),
                        y: this.posY + (y * this.scale),
                        color: this.color
                    });
                }
            }
        }
        return finalState;
    }
}