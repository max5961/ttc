const user = (name, symbol, computer, mode) => {
    return {
        name,
        symbol,
        computer,
        mode
    }
}

const p1 = user('p1', 'X', false, null);
const p2 = user('p2', 'O', false, null);
const cpuEasy = user('cpuEasy', 'O', true, 'easy');
const cpuHard = user('cpuHard', 'O', true, 'hard');


// gameBoard module
const gameBoard = (function(){

    let board = [null, null, null,
                null, null, null,
                null, null, null]
    let gameOver = false;
    let winningSquares = [];

    // getters
    const getBoard = () => {
        return board;
    }

    const getGameOver = () => {
        return gameOver;
    }

    const getWinningSquares = () => {
        return winningSquares;
    }

    // methods
    const checkWin = () => {

        //check columns and rows
        for(let i = 0; i < 9; i++){

            // check all columns
            if(i === 0 || i === 1 || i === 2){
                if((board[i] === board[i+3] && board[i] === board[i+6]) &&
                    board[i] != null
                ){
                    gameOver = true;
                    winningSquares = [i, i+3, i+6];
                    console.log(`${board[i]} wins`)
                    return
                }
            }

            // check all rows 
            if(i === 0 || i === 3 || i === 6){
                if((board[i] === board[i+1] && board[i] === board[i+2]) &&
                    board[i] != null
                    ){
                    gameOver = true;
                    winningSquares = [i, i+1, i+2];
                    console.log(`${board[i]} wins`)
                    return
                }
            }
        }

        // check diagonal 0,4,8
        if((board[0] === board[4] && board[0] === board[8]) && 
            board[0] != null
            ){
            gameOver = true;
            winningSquares = [0,4,8];
            console.log(`${board[0]} wins`)
            return
        }

        // check diagonal 2,4,6
        else if((board[2] === board[4] && board[2] === board[6]) &&
                board[2] != null){
                gameOver = true;
                winningSquares = [2,4,6]
                console.log(`${board[2]} wins`)
                return
        }

        // check for a tie game
        else if(!board.includes(null)){
            gameOver = true;
            winningSquares = [0,1,2,3,4,5,6,7,8];
            console.log('tie game');
        }
    }

    const placeChoice = (index, symbol) => {
        if(board[index] === null){
            board[index] = symbol;

        }

        checkWin();
    }

    const resetGame = () => {
        board = [null, null, null,
            null, null, null,
            null, null, null];

            gameOver = false;

            winningSquares = []
    }

    const adequateSquares = () => {
        // if there is only one square left that is not null, then the computerChoice will not be able to run because the playerChoice will occupy that square.

        return
    }


    return {
        // getters
        getBoard,
        getGameOver,
        getWinningSquares,

        // methods
        checkWin,
        placeChoice,
        resetGame,
    }

})();

// handleClick module
const handleClicks = (function(){

    let computerModeEasy = true;
    let computerModeHard = false;
    let inputter = p1;

    const getDataIndex = (e) => e.target.getAttribute('data-index');

    const changeInputter = () => {
        if(inputter === p1){
            inputter = p2
        }

        else if(inputter === p2){
            inputter = p1;
        }
    }

    const placeChoice = (e) => {

        if(e.target.textContent === '' && !gameBoard.getGameOver()){
            e.target.textContent = inputter.symbol;
            gameBoard.placeChoice(getDataIndex(e), inputter.symbol);
            changeInputter();

            if(computerModeEasy || computerModeHard){
                placeComputerChoice();

                // change inputter back to p1 because the inputter is changed on every square click
                changeInputter();
            }
        }
    }

    const placeComputerChoice = () => {
        let index;
        let symbol;

        if(computerModeEasy){
            index = computerChoice.getComputerChoiceEasy();
            symbol = cpuEasy.symbol;
        }
        else if(computerModeHard){
            // computerChoice.getComputerChoiceHard not yet created
            return
        }

        const updateGUI = (index) => {
            document.querySelectorAll('.square').forEach(square => {
                if(square.getAttribute('data-index') === `${index}`){
                    square.textContent = `${symbol}`;
                }
            })
        }

        const getEmptySquares = () => {
            const board = gameBoard.getBoard();
            const nullCount = board.filter(square => square === null);
            return nullCount.length;
        }

        const squaresLeft = getEmptySquares();


        // do not update GUI or gameBoard if the game has been won or tied
        if(!gameBoard.getGameOver()){
            updateGUI(index);
            gameBoard.placeChoice(index, `${symbol}`);
            gameBoard.checkWin();
        }
    }

    const gameOver = () => {
        if(gameBoard.getGameOver()){
            let indexes = gameBoard.getWinningSquares();

            document.querySelectorAll('.square').forEach(square => {

                const index = square.getAttribute('data-index');

                if(indexes.toString().includes(index)){
                    // if indexes.length is only 3, then there is a winner.  If not, then indexes.length === 9, and there is a tie which will color all squares red.
                    if(indexes.length === 3){
                        square.style.color = '#5dba6f';
                    }
                    else {
                        square.style.color = '#ed6559';
                    }
                }

            })
        }
    }

    return {
        getDataIndex,
        changeInputter,
        placeChoice,
        gameOver,
    }

})();

// computerChoice module
const computerChoice = (function(){
    
    const getComputerChoiceEasy = () => {
        const board = gameBoard.getBoard();
        const emptyLeft = board.filter(square => square === null);
        const canChoose = () => {
            if(emptyLeft.length >= 1){
                return true;
            }
            else {
                return false;
            }
        }
        
        const getRandomChoice = () => Math.floor(Math.random() * 8);

        let index = getRandomChoice();

        while(board[index] != null && canChoose()){
            index = getRandomChoice();
        }

        return index;
    }

    return {
        getComputerChoiceEasy,
    }

})();

const handleSquareClick = (e) => {
    handleClicks.placeChoice(e);
    handleClicks.gameOver();


}

document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', handleSquareClick)
})

const handleStartOver = () => {
    gameBoard.resetGame();
    
    document.querySelectorAll('.square').forEach(square => {
        square.style.color = '#313131';
        square.textContent = '';
    })
}

document.querySelector('.startOver').addEventListener('click', handleStartOver);
