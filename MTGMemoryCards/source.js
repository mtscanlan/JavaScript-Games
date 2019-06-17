const cards = document.querySelectorAll(".cardblock");
let lockBoard = false;
let firstCard, secondCard = null;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }
    secondCard = this;
    lockBoard = true;

    if (firstCard.dataset.cardtype === secondCard.dataset.cardtype) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    } 
    else {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 500);
    }
}

function shuffle() {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });

    // Wait for transition animation from removing the 'flip' class before shuffling.
    setTimeout(() => {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    }, 500);

    resetBoard();
};

function resetBoard() {
    lockBoard = false;
    firstCard = secondCard = null;
}

shuffle();