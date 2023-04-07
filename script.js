const gameBoard = (function(){
    let board = [null, null, null, null, null, null, null, null, null];

    const checkWin = board => {

        //check columns and rows
        for(let i = 0; i < 9; i++){

            // check all columns
            if(i === 0 || i === 1 || i === 2){
                if(
                    (board[i] === board[i+3] && board[1] === board[i+6]) &&
                    board[i] != null
                ){
                    console.log(`${board[i]} wins`)
                }
            }

            // check all rows 
            else if(i === 0 || i === 3 || i === 6){
                if((board[i] === board[i+1] && board[i] === board[i+2]) &&
                    board[i] != null
                    ){
                    console.log(`${board[i]} wins`)
                }
            }
        }

        // check diagonal 0,4,8
        if((board[0] === board[4] && board[0] === board[8]) && 
            board[0] != null
            ){
            console.log(`${board[0]} wins`)
        }

        // check diagonal 2,4,6
        else if((board[2] === board[4] && board[2] === board[6]) &&
                board[2] != null){
            console.log(`${board[2]} wins`)
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
        board,
    }
})();

gameBoard.choice('max', 1);
gameBoard.choice('max', 4);
gameBoard.choice('max', 7);
