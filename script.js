const gameBoard = (function(){
    let board = [null, null, null, null, null, null, null, null, null];

    const checkWin = board => {

        //check columns and rows
        for(let i = 0; i < 9; i++){

            // check all columns
            if(i === 0 || i === 1 || i === 2){
                if((board[i] === board[i+3] && board[i] === board[i+6]) &&
                    board[i] != null
                ){
                    console.log(`${board[i]} wins`)
                }
            }

            // check all rows 
            if(i === 0 || i === 3 || i === 6){
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

const clicks = (function(){
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
        if(player === 'p1' && e.target.textContent === ''){
            pushPlayer();
            square.textContent = 'X';
            gameBoard.choice(player, getDataIndexes(e));
        } 
        else if(player === 'p2' && e.target.textContent === '') {
            pushPlayer();
            square.textContent = 'O';
            gameBoard.choice(player, getDataIndexes(e));
        }
    }

    return {
        playerLog,
        getDataIndexes,
        getPlayer,
        pushPlayer,
        changeText
    }
})();

document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', (e) => {
        clicks.changeText(clicks.getPlayer(), square, e);
    })
})