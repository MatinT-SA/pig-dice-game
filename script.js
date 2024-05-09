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

let currentScore = 0;
let activePlayer = 1;

dice.classList.add('hidden');

rollBtn.addEventListener('click', function () {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    dice.classList.remove('hidden');
    dice.src = `images/dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
        currentScore += diceNumber;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        // Switching to the next player
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;
        activePlayer = activePlayer === 1 ? 2 : 1;

        player1.classList.toggle('active');
        player2.classList.toggle('active');

        player1Heading.classList.toggle('heading-active');
        player2Heading.classList.toggle('heading-active');


        // 4- adding a voice like "ouch!" played for the lost player

        // 5- shaking the current section for lost player


    }
});