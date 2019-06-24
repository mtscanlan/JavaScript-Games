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
        for (var i = 0; i < this.shape.length; i++) {
            for (var j = 0; j < i; j++) {
                var temp = this.shape[i][j];
                this.shape[i][j] = this.shape[j][i];
                this.shape[j][i] = temp;
            }
        }
    }

    draw() {
        for (var y = 0; y < this.shape.length; y++) {
            for (var x = 0; x < this.shape[y].length; x++) {
                if (this.shape[y][x]) {
                    this.ctx.fillStyle = this.color;
                    //console.log(`${this.posX} + ${x * this.scale} - ${this.posY} + ${x * this.scale}`);
                    let drawX = this.posX + (x * this.scale);
                    let drawY = this.posY + (y * this.scale);
                    this.ctx.fillRect(drawX, drawY, this.scale, this.scale);

                    this.ctx.strokeStyle = "#000";
                    this.ctx.lineWidth = 2;
                    this.ctx.strokeRect(drawX, drawY, this.scale, this.scale);
                }
            }
        }
    }

    clear() {
        this.getState().forEach(t => {
            this.ctx.fillStyle = '#3e3e3e';
            this.ctx.fillRect(t.x, t.y, this.scale, this.scale);

            this.ctx.strokeStyle = "#3e3e3e";
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(t.x, t.x, this.scale, this.scale);
        });
    }

    getState() {
        var finalState = [];
        for (var y = 0; y < this.shape.length; y++) {
            for (var x = 0; x < this.shape[y].length; x++) {
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