const gameBoard = (function(){
    let board = [null, null, null, null, null, null, null, null, null];

    const checkWin = board => {
        if(board[0] === board[1] && board[1] === board[2]){
            console.log(`${board[0]} has won`);
        }
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
        board
    }
})();

gameBoard.choice('max', 0);
gameBoard.choice('max', 1);
gameBoard.choice('max', 2);
