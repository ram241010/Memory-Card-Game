const gameBoard = document.getElementById('game-board');
const movesCounter = document.getElementById('moves');
const winnerPopup = document.getElementById('winner-popup');
const finalMoves = document.getElementById('final-moves');
const playAgainBtn = document.getElementById('play-again');
const body = document.body;

const cardIcons = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍍', '🥭'];
let shuffledCards = [...cardIcons, ...cardIcons].sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;

// Create cards
function createCards() {
  shuffledCards.forEach((icon) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${icon}</div>
        <div class="card-back"></div>
      </div>
    `;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Flip card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  checkMatch();
}

// Check if two cards match
function checkMatch() {
  moves++;
  movesCounter.textContent = `Moves: ${moves}`;

  const isMatch = firstCard.querySelector('.card-front').textContent === secondCard.querySelector('.card-front').textContent;

  if (isMatch) {
    disableCards();
    matches += 1;

    if (matches === cardIcons.length) {
      setTimeout(showWinnerPopup, 500);
    }
  } else {
    unflipCards();
  }
}

// Disable matched cards
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

// Unflip cards if not matched
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

// Reset board
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Show winner popup
function showWinnerPopup() {
  finalMoves.textContent = moves;
  winnerPopup.classList.remove('hidden');
}

// Play again
playAgainBtn.addEventListener('click', () => {
  gameBoard.innerHTML = '';
  moves = 0;
  matches = 0;
  movesCounter.textContent = 'Moves: 0';
  winnerPopup.classList.add('hidden');
  shuffledCards = [...cardIcons, ...cardIcons].sort(() => 0.5 - Math.random());
  createCards();
});

// Change background color dynamically
function changeBackgroundColor() {
  const colors = ['#1e1e2f', '#4ecca3', '#3ca68b', '#2b2b45', '#1a1a2e'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  body.style.background = `linear-gradient(135deg, ${randomColor}, #000)`;
}

// Initialize game
createCards();
setInterval(changeBackgroundColor, 5000);
