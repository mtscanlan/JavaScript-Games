class Apple {
    constructor(scale, context) {
        this.context = context;
        this.scale = scale;

        this.x = 0;
        this.y = 0;
    }

    draw() {
        this.context.fillStyle = '#ff0800';
        this.context.fillRect(this.x, this.y, this.scale, this.scale);
    }

    move() {
        this.x = Math.floor(Math.random() * (this.context.canvas.width / this.scale)) * this.scale;
        this.y = Math.floor(Math.random() * (this.context.canvas.height / this.scale)) * this.scale;
    }

    eat(posX, posY) {
        return this.x == posX && this.y == posY;
    }
}