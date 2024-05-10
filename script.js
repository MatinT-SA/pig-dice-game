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


// Audio
const oops = new Audio('Oops.mp3');

let scores, currentScore, activePlayer, playing;

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

const startOver = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 1;
    playing = true;

    score1.textContent = 0;
    score2.textContent = 0;
    current1.textContent = 0;
    current2.textContent = 0;
    player1.classList.remove('players--winner');
    player2.classList.remove('players--winner');
    player1.classList.add('active');
    player2.classList.remove('active');
}

startOver();

dice.classList.add('hidden');

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

holdBtn.addEventListener('click', function () {
    if (playing) {
        // subtracting 1 from activePlayer because it starts from 1
        scores[activePlayer - 1] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer - 1];
        console.log(scores[activePlayer]);

        // 2- check if player's score is => 100
        // finish the game
        if (scores[activePlayer - 1] >= 20) {
            playing = false;

            document.querySelector(`.player--${activePlayer}`).classList.add('players--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('active');

            dice.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
});

restartBtn.addEventListener('click', startOver);