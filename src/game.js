const board = document.getElementById('game-board');
const resetGameBtn = document.getElementById('game-reset');
const squares = document.querySelectorAll('#game-board button');
const gameStatus = document.getElementById('game-status'); // you still have this <span> in HTML
const players = ['X', 'O'];

let gameOver = false;
let currentPlayer = players[0];

gameStatus.textContent = "X's turn!";

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWin(player) {
  for (let i = 0; i < winCombinations.length; i++) {
    const [a, b, c] = winCombinations[i];
    if (
      squares[a].textContent === player &&
      squares[b].textContent === player &&
      squares[c].textContent === player
    ) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === "") {
      return false;
    }
  }
  return true;
}

function endGame(message) {
  gameStatus.textContent = message;
  gameOver = true;
}

function resetGame() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
  }
  gameStatus.textContent = "X's turn!";
  currentPlayer = players[0];
  gameOver = false;
}

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', () => {
    if (squares[i].textContent !== '' || gameOver) {
      return;
    }

    squares[i].textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
      endGame(`Game over! ${currentPlayer} wins!`);
      return;
    }

    if (checkTie()) {
      endGame("It's a tie!");
      return;
    }

    currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
    gameStatus.textContent = `${currentPlayer}'s turn!`;
  });
}

resetGameBtn.addEventListener('click', resetGame);
