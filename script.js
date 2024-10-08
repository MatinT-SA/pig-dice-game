const dice = document.querySelector('.dice');
const restartBtn = document.querySelector('.btn--restart')
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const current1 = document.querySelector('#current--1');
const current2 = document.querySelector('#current--2');
const player1 = document.querySelector('.player--1');
const player2 = document.querySelector('.player--2');
const player1Heading = document.querySelector('.player--1_heading');
const player2Heading = document.querySelector('.player--2_heading');
const player1Current = document.querySelector('.player--1_current');
const player2Current = document.querySelector('.player--2_current');
const score1 = document.querySelector('#score--1');
const score2 = document.querySelector('#score--2');
const changeWinningScoreBtn = document.getElementById('change-winning-score');
const winningScore = document.getElementById('winning-score');
const promptInput = document.getElementById('prompt-input');
const promptConfirm = document.getElementById('prompt-confirm');

// Audio
const player1Winner = new Audio('src/Player1.mp3');
const player2Winner = new Audio('src/Player2.mp3');
const oops = new Audio('src/Oops.mp3');
function toggleAudio() {
    var audio = document.getElementById("bg-music");
    var audioControl = document.getElementById("audio-control");

    if (audio.paused) {
        audio.play();
        audioControl.src = "images/muted-audio.png";
    } else {
        audio.pause();
        audioControl.src = "images/play-audio.png";
    }
}

let scores, currentScore, activePlayer, playing, winningThreshold;

// Focusing winningScoreBtn
function setFocusOnWinningThresholdButton() {
    changeWinningScoreBtn.focus();
}

// Restart
const startOver = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 1;
    playing = true;
    winningThreshold = 100;
    changeWinningScoreBtn.disabled = false;

    score1.textContent = 0;
    score2.textContent = 0;
    current1.textContent = 0;
    current2.textContent = 0;
    player1.classList.remove('players--winner');
    player2.classList.remove('players--winner');
    player1.classList.add('active');
    player2.classList.remove('active');
    player1Heading.classList.add('heading-active');
    player2Heading.classList.remove('heading-active');

    dice.classList.add('hidden');

    displayPopUpScoreChanged(winningThreshold);
    setFocusOnWinningThresholdButton();
}

// Switching to the next player function
const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 1 ? 2 : 1;
    // toggling the active class for players
    player1.classList.toggle('active');
    player2.classList.toggle('active');
    // toggling heading-active class for players
    player1Heading.classList.toggle('heading-active');
    player2Heading.classList.toggle('heading-active');
}

// Popup winner
const displayWinnerMessage = (winner) => {
    const popup = document.createElement('div');
    popup.classList.add('winner-popup');
    popup.textContent = `The winner is ${winner}`;
    document.body.appendChild(popup);

    popup.offsetHeight;

    popup.classList.add('visible');

    setTimeout(() => {
        popup.remove();
    }, 2000);
};

// Displaying Current Score
const displayPopUpScoreChanged = (score) => {
    const popup = document.createElement('div');
    popup.classList.add('winner-popup');
    popup.textContent = `The Winning Score is ${score}`;
    document.body.appendChild(popup);

    popup.offsetHeight;

    popup.classList.add('visible');

    setTimeout(() => {
        popup.remove();
    }, 2000);
}

// Roll Button
rollBtn.addEventListener('click', function () {
    if (playing) {
        const diceNumber = Math.trunc(Math.random() * 6) + 1;

        dice.classList.remove('hidden');
        dice.src = `images/dice-${diceNumber}.png`;

        if (diceNumber !== 1) {
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // shaking the current section for the lost player and removing it after 500ms
            if (activePlayer === 1) {
                player1Current.classList.add('shake');
            } else {
                player2Current.classList.add('shake');
            }
            setTimeout(() => {
                player1Current.classList.remove('shake');
                player2Current.classList.remove('shake');
            }, 500);
            // playing oops sound
            oops.play();
            // scaling up the dice 1
            dice.classList.add('dice-scaled');
            setTimeout(() => {
                dice.classList.remove('dice-scaled');
            }, 500);

            switchPlayer();
        }
    }
});

// Hold Button
holdBtn.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer - 1] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer - 1];

        if (scores[activePlayer - 1] >= winningThreshold) {
            playing = false;

            document.querySelector(`.player--${activePlayer}`).classList.add('players--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('active');

            dice.classList.add('hidden');
            displayWinnerMessage(`Player ${activePlayer}`);

            // Disable the button when the game ends
            changeWinningScoreBtn.disabled = true;

            // Winning Audio
            activePlayer === 1 ? player1Winner.play() : player2Winner.play();
        } else {
            switchPlayer();
        }
    }
});

// Restart Button
restartBtn.addEventListener('click', function () {
    startOver();
    changeWinningScoreBtn.disabled = false;
});

// Modal Rules
function openModal() {
    document.getElementById('rules').style.display = 'block';
    promptInput.focus();
}

// Modal Winning Score
function openModalWinningScore() {
    document.getElementById('winning-score').style.display = 'block';
    promptInput.focus();
    promptInput.select();
}

function closeModal() {
    document.getElementById('rules').style.display = 'none';
    document.getElementById('winning-score').style.display = 'none';
}

// Winning Score
changeWinningScoreBtn.addEventListener('click', function () {
    if (playing) {
        openModalWinningScore();
    }
});

// Allowing Enter Key for Winning Score
promptInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        promptConfirm.click();
    }
});

promptConfirm.addEventListener('click', function () {
    const userInput = promptInput.value;
    const inputNumber = parseInt(userInput);

    if (!isNaN(inputNumber) && inputNumber >= 20 && inputNumber <= 100) {
        winningThreshold = inputNumber;

        scores = [0, 0];
        currentScore = 0;
        activePlayer = 1;
        score1.textContent = 0;
        score2.textContent = 0;
        current1.textContent = 0;
        current2.textContent = 0;

        winningScore.style.display = 'none';
        displayPopUpScoreChanged(winningThreshold);
    } else {
        alert("Please enter a valid number between 20 and 100.");
    }
});

dice.classList.add('hidden');
startOver();