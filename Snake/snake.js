const UP = "Up";
const DOWN = "Down";
const LEFT = "Left";
const RIGHT = "Right";

class Snake {
    constructor(scale, context) {
        this.context = context;
        this.scale = scale;
        this.resetBoard();
    }

    set cancellationToken(ct) {
        this.ct = ct;
    }

    setDirection(d) {
        switch (d) {
            case RIGHT:
                this.newDirection = this.direction == LEFT ? this.direction : d;
                break;
            case LEFT:
                this.newDirection = this.direction == RIGHT ? this.direction : d;
                break;
            case UP:
                this.newDirection = this.direction == DOWN ? this.direction : d;
                break;
            case DOWN:
                this.newDirection = this.direction == UP ? this.direction : d;
                break;
        }
    }

    get isDead() { return this.dead; }

    draw() {
        this.context.fillStyle = '#31a0ff';
        for(let i = 0; i < this.parts.length; i++) {
            this.context.fillRect(this.parts[i][0], this.parts[i][1], this.scale, this.scale);
        }
        this.apple.draw();
    }

    resetBoard() {
        this.dead = false;
        this.direction = null;
        this.newDirection = null;
        this.ct = null;

        let posX = Math.floor(Math.random() * (this.context.canvas.width / this.scale)) * this.scale;
        let posY = Math.floor(Math.random() * (this.context.canvas.height / this.scale)) * this.scale;
        this.parts = [[posX,posY]];

        this.apple = new Apple(scale, context);
        this.apple.move();
        this.apple.draw();
    }

    collision(posX, posY) {
        for(let i = 0; i < this.parts.length; i++) {
            if (this.parts[i][0] == posX && this.parts[i][1] == posY) {
                return true;
            }
        }
        return false;
    }

    move() {
        let newX = 0;
        let newY = 0;
        let parts = this.parts;
        this.direction = this.newDirection;
        switch(this.direction){
            case LEFT:
                newX = parts[0][0] <= 0 ? this.context.canvas.width - this.scale : parts[0][0] - this.scale;
                newY = parts[0][1];
                break;
            case RIGHT:
                newX = parts[0][0] >= this.context.canvas.width - this.scale ? 0 : parts[0][0] + this.scale;
                newY = parts[0][1];
                break;
            case UP:
                newX = parts[0][0];
                newY = parts[0][1] <= 0 ? this.context.canvas.height - this.scale : parts[0][1] - this.scale;
                break;
            case DOWN:
                newX = parts[0][0];
                newY = parts[0][1] >= this.context.canvas.height - this.scale ? 0 : parts[0][1] + this.scale;
                break;
            default:
                // We're not moving, game probably reset
                return;
        }
        
        // Die if we collide with ourselves
        if (this.collision(newX, newY)) {
            clearTimeout(ct);
        }

        // No collision, valid square, add the new head position.
        parts.unshift([newX, newY]);

        // If we eat an apple, move it to a new position, otherwiseremove the end of the snake.
        if (this.apple.eat(newX, newY)) {
            this.apple.move();
        }
        else {
            this.parts.pop();
        }
    }
}