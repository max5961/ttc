const user = (name, symbol, computer) => {
    return {
        name,
        symbol,
        computer
    }
}

const p1 = user('p1', 'X', false);
const p2 = user('p2', 'O', false);
const cpu = user('cpu', 'O', true);


const gameBoard = (function(){

    let board = [null, null, null, null, null, null, null, null, null];
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

    // module methods
    const checkWin = board => {

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

    const placeChoice = (index,symbol) => {
        if(board[index] === null){
            board[index] = symbol;
        }
        checkWin(board);
    }

    return {
        //getters
        getBoard,
        getGameOver,
        getWinningSquares,

        //module methods
        checkWin,
        placeChoice,
        
    }
})();

const handleClicks = (function(){
    let firstPlayer = true;
    let computerMode = true;

    const getDataIndex = (e) => e.target.getAttribute('data-index');

    const changeInputter = () => {
        firstPlayer = !firstPlayer;
    }

    const getPlayer = () => {
        if(firstPlayer && !computerMode){
            return p1;
        }

        else if(firstPlayer){
            changeInputter();
            return p1;
        }

        else if(!firstPlayer && !computerMode){
            changeInputter();
            return p2
        }
    }

    const placeChoice = (e) => {
        player = getPlayer();
        console.log(player);
        
        if(e.target.textContent === '' && !gameBoard.getGameOver()){
                e.target.textContent = player.symbol;
                gameBoard.placeChoice(getDataIndex(e), player.symbol)

                if(computerMode){
                    placeComputerChoice();
                }
            }
        }
    

    const placeComputerChoice = () => {
        const board = gameBoard.getBoard();

        const getRandomChoice = () => Math.floor(Math.random() * 8);

        let index = getRandomChoice()
        while(board[index] != null){
            index = getRandomChoice();
        }

        gameBoard.placeChoice(index, cpu.symbol);
        changeInputter();
        updateComputerGUI(index);
    }

    const updateComputerGUI = (index) => {
        console.log()
        document.querySelectorAll('.square').forEach(square => {
            if(square.getAttribute('data-index') == index) {
                square.textContent = cpu.symbol;
            }
        })
    }

    const gameOver = () => {
        if(gameBoard.getGameOver()){
            let indexes = gameBoard.getWinningSquares();
            document.querySelectorAll('.square').forEach(square => {
                const index = square.getAttribute('data-index');
                if(indexes.toString().includes(index)){
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
        firstPlayer,
        getDataIndex,
        changeInputter,
        getPlayer,
        placeChoice,
        placeComputerChoice,
        updateComputerGUI,
        gameOver,
    }
})();

const placeChoice = (e) => {
    handleClicks.placeChoice(e);
    handleClicks.gameOver();
}

document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', placeChoice)
})



