const dice = document.querySelector('.dice');
const restartBtn = document.querySelector('.btn--restart')
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const current1 = document.querySelector('#current--1');
const current2 = document.querySelector('#current--2');

let currentScore = 0;

dice.classList.add('hidden');

rollBtn.addEventListener('click', function () {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    dice.classList.remove('hidden');
    dice.src = `images/dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
        currentScore += diceNumber;
        current1.textContent = currentScore;
    } else {

    }
});