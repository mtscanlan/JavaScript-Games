const choices = document.querySelectorAll(".container");
const makeAChoice = 'Make a choice!';
document.getElementById('message').innerHTML = makeAChoice;
let userScore = compScore = 0;
let lockGameboard = false;

let resultClassCollection = {
    green:'glow-green',
    red:'glow-red',
    white:'glow-white'
};

let winningResultMessages = {
    'lv':'Lizard poisons Spock!',
    'vs':'Spock smashes Scissors!',
    'sp':'Scissors cuts Paper!',
    'pr':'Paper covers Rock!',
    'rl':'Rock crushes Lizard!',
    'lp':'Lizard eats Paper!',
    'pv':'Paper disproves Spock!',
    'vr':'Spock vaporizes Rock!',
    'rs':'Rock crushes Scissors!',
    'sl':'Scissors decapitates Lizard!',
};

function evaluateRound(userChoice, computerChoice, element) {
    let userWinKey = userChoice + computerChoice;
    let compWinKey = computerChoice + userChoice;

    let userWinResult = Object.keys(winningResultMessages).includes(userWinKey);
    let compWinResult = Object.keys(winningResultMessages).includes(compWinKey);
    let resultClass = null;

    if (userWinResult) {
        message.innerHTML = 'You win! ' + winningResultMessages[userWinKey];
        userScore++;
        resultClass = resultClassCollection.green
    }
    else if (compWinResult) {
        message.innerHTML = 'You lose! ' + winningResultMessages[compWinKey];
        compScore++;
        resultClass = resultClassCollection.red
    }
    else
    {
        message.innerHTML = 'It\'s a draw!';
        resultClass = resultClassCollection.white
    }

    element.classList.add(resultClass);
    document.getElementById(computerChoice).querySelector('img').classList.add(resultClassCollection.white);
    document.getElementById('score').innerHTML = `${userScore} : ${compScore}`;

    setTimeout(() => {
        element.classList.remove(resultClass);
        document.getElementById(computerChoice).querySelector('img').classList.remove(resultClassCollection.white);
        message.innerHTML = makeAChoice;
        lockGameboard = false;
    }, 3000);
}

choices.forEach(c => {
    c.addEventListener('click', () => {
        if (lockGameboard) return;
        lockGameboard = true;
        let userChoice = c.id;
        let computerChoice = choices[Math.floor(Math.random() * choices.length)].id;
        evaluateRound(userChoice, computerChoice, c.querySelector('img'));
    });
});
