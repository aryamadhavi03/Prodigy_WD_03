document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');
    const playWithFriendButton = document.getElementById('playWithFriend');
    const playWithAIButton = document.getElementById('playWithAI');
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;
    let playWithAI = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes('') ? null : 'Tie';
    };

    const aiMove = () => {
        let emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        handleCellClick(randomCell);
    };

    const handleCellClick = (index) => {
        if (board[index] === '' && isGameActive) {
            board[index] = currentPlayer;
            cells[index].textContent = currentPlayer;
            let winner = checkWinner();
            if (winner) {
                isGameActive = false;
                message.textContent = winner === 'Tie' ? "It's a tie!" : `Player ${winner} has won!`;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                if (playWithAI && currentPlayer === 'O') {
                    setTimeout(aiMove, 500);
                }
            }
        }
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    resetButton.addEventListener('click', () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => cell.textContent = '');
        message.textContent = '';
    });

    playWithFriendButton.addEventListener('click', () => {
        playWithAI = false;
        resetButton.click();
    });

    playWithAIButton.addEventListener('click', () => {
        playWithAI = true;
        resetButton.click();
    });
});
