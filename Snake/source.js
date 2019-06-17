const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const difficultyButtons = document.querySelectorAll('.diffSel');
const scale = 20;
let difficuiltyLevel = 100;
let cancellationToken = null;
let snake = new Snake(scale, context);
let difficultyLevelToSpeed = {
    'easy':400,
    'normal':200,
    'hard':100,
    'expert':50,
    'torment':25
};

function clearBoard() {
    context.fillStyle = '#3e3e3e';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function playgame() {
    snake.resetBoard();
    snake.draw();

    (function travel() {
        if (!snake.isDead) {
            snake.move();
            clearBoard();
            snake.draw();
            cancellationToken = setTimeout(travel, difficuiltyLevel);
            snake.cancellationToken = cancellationToken;
        }
    })();
};

difficultyButtons.forEach(b => {
    b.addEventListener('click', () => {
        let difficulty = b.dataset.diff;
        difficuiltyLevel = difficultyLevelToSpeed[difficulty];
        clearTimeout(cancellationToken);
        playgame();
    });
});

document.addEventListener("keydown", event => {
    snake.setDirection(event.key.replace('Arrow', ''));
});

playgame();