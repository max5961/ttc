const gameBoard = (function(){
    let board = [null, null, null, null, null, null, null, null, null];
    let gameOver = false;
    let winningSquares = [];

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

    const getWinSquares = () => {
        return winningSquares;
    }

    const getGameOver = () => {
        return gameOver;
    }
    
    const choice = (player, square) => {
        if(board[square] === null){
            board[square] = player;
        }
        console.log(board);
        checkWin(board);
    }

    return {
        choice,
        checkWin,
        getGameOver,
        getWinSquares,
        board,
        gameOver
        
    }
})();

const handleBoardClicks = (function(){
    let playerLog = [];

    function getDataIndexes(e){
        return e.target.getAttribute('data-index');
    }

    function getPlayer(){
        if(playerLog[playerLog.length - 1] === 'p1'){
            return 'p2';
        }
        else {
            return 'p1';
        }
    }

    function pushPlayer(){

        if(playerLog[playerLog.length - 1] === 'p1'){
            playerLog.push('p2');
        } 
        
        else {
            playerLog.push('p1');
        }
    }

    function changeText(player, square, e){
        player = getPlayer();
        if(player === 'p1' && e.target.textContent === '' && !gameBoard.getGameOver()){
            pushPlayer();
            square.textContent = 'X';
            gameBoard.choice(player, getDataIndexes(e));
        } 
        else if(player === 'p2' && e.target.textContent === '' && !gameBoard.getGameOver()) {
            pushPlayer();
            square.textContent = 'O';
            gameBoard.choice(player, getDataIndexes(e));
        }
    }

    function gameOver(){
        if(gameBoard.getGameOver()){
            let indexes = gameBoard.getWinSquares()
            console.log(indexes);
            document.querySelectorAll('.square').forEach(square => {
                index = square.getAttribute('data-index');
                if(indexes.toString().includes(index)){
                    // choose green if winner.  
                    if(indexes.length <= 3){
                        square.style.color = '#5dba6f';
                    }
                    // choose red if tie
                    else {
                        square.style.color = '#ed6559'
                    }
                    
                }
            })
        }
    }

    return {
        playerLog,
        getDataIndexes,
        getPlayer,
        pushPlayer,
        gameOver,
        changeText
    }
})();

function handleBoardClick(e){
    const player = handleBoardClicks.getPlayer();
    const square = e.target;
    handleBoardClicks.changeText(player, square, e)
    handleBoardClicks.gameOver();
}

document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click',  handleBoardClick)
})