class Boundary {
    constructor(ctx, scale) {
        this.scale = scale;
        this.ctx = ctx;
        this.pixels = [];
        this.floor = [];
        this.leftWall = [];
        this.rightWall = [];

        for (let i = 0; i < this.ctx.canvas.width; i = i + scale) {
            this.floor.push({
                x: i,
                y: this.ctx.canvas.height
            });
        }

        for (let i = 0; i < this.ctx.canvas.height; i = i + scale) {
            this.leftWall.push({
                x: 0 - scale,
                y:i
            });
            this.rightWall.push({
                x:this.ctx.canvas.width,
                y:i
            });
        }
    }

    addPixel(pixel) {
        this.pixels.push(pixel);
    }

    checkAndRemoveFullRowOfPixels() {
        let groups = this.pixels.reduce(function (rv, x) {
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
        this.pixels = Object.values(groups).flat();

        return removed;
    }

    redrawPixels() {
        this.ctx.fillStyle = GAME_BOARD_COLOR;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.strokeStyle = GAME_BOARD_COLOR;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.pixels.forEach(fe => {
            this.ctx.fillStyle = fe.color;
            this.ctx.fillRect(fe.x, fe.y, this.scale, this.scale);

            this.ctx.strokeStyle = STROKE_COLOR;
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(fe.x, fe.y, this.scale, this.scale);
        });
    }

    isInFloor(pixel) {
        return this.floor.some(f => {
            return f.x == pixel.x && f.y == pixel.y;
        });
    }

    isInLeftWall(pixel) {
        return this.leftWall.some(lw => {
            return lw.x == pixel.x && lw.y == pixel.y;
        });
    }

    isInPixel(pixel) {
        return this.pixels.some(p => {
            return p.x == pixel.x && p.y == pixel.y;
        });
    }

    isInRightWall(pixel) {
        return this.rightWall.some(rw => {
            return rw.x == pixel.x && rw.y == pixel.y;
        });
    }

    isInWall(pixel) {
        return this.isInLeftWall(pixel) || this.isInRightWall(pixel);
    }
}