// Game state
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let gameStatus = document.querySelector('.game-status');

// Winning combinations
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize game
function initGame() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box, index) => {
        box.textContent = '';
        box.classList.remove('x', 'o', 'winner');
        box.disabled = false;
        box.addEventListener('click', () => handleBoxClick(index));
    });
    updateGameStatus();
}

// Handle box click
function handleBoxClick(index) {
    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }

    // Update board
    gameBoard[index] = currentPlayer;
    const box = document.querySelectorAll('.box')[index];
    box.textContent = currentPlayer;
    box.classList.add(currentPlayer.toLowerCase());
    box.disabled = true;

    // Check for win or draw
    checkResult();
    
    // Switch player
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateGameStatus();
    }
}

// Check game result
function checkResult() {
    let roundWon = false;
    let winningLine = [];

    // Check winning conditions
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] && 
            gameBoard[a] === gameBoard[b] && 
            gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            winningLine = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        gameStatus.textContent = `🎉 Player ${currentPlayer} Wins! 🎉`;
        gameStatus.classList.add('winner-message');
        
        // Highlight winning boxes
        winningLine.forEach(index => {
            document.querySelectorAll('.box')[index].classList.add('winner');
        });
        
        // Disable all boxes
        document.querySelectorAll('.box').forEach(box => {
            box.disabled = true;
        });
        return;
    }

    // Check for draw
    if (!gameBoard.includes('')) {
        gameActive = false;
        gameStatus.textContent = "🤝 It's a Draw! 🤝";
        gameStatus.classList.add('draw-message');
        return;
    }
}

// Update game status
function updateGameStatus() {
    if (gameActive) {
        gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
        gameStatus.classList.remove('winner-message', 'draw-message');
    }
}

// Reset game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    gameStatus.classList.remove('winner-message', 'draw-message');
    initGame();
}

// Initialize game on load
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    
    // Reset button event listener
    const resetBtn = document.querySelector('.reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetGame);
    }
});

