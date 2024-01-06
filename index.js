let cols = 7;
let rows = 6;
let counter = 0;
let topSelect = 3;
let gameBoard = [];
let currentPlayer = "1";
let gameOver = false;

window.onload = function() {
    initialize();
}

function initialize() {
    //Initialize 7X6 board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < cols; c++) {
            row.push(0);
            let tile = document.createElement("span");
            tile.id = c.toString() + "-" + r.toString();
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
        }
        gameBoard.push(row);
    }
    
    //Setup top selector indicator board
    for (let i = 0; i < cols; i++) {
        let topTile = document.createElement("span");
        topTile.id = i.toString();
        topTile.classList.add("upperTile");
        document.getElementById("topBoard").appendChild(topTile);
    }
    
    //Setup Initial Tile Starting top middle
    let test = document.getElementById("3");
    test.classList.remove("upperTile");
    test.classList.add(`player${currentPlayer}`);

    //Key Listener - Arrows - Space
    document.addEventListener("keyup", (e) => {
        if (!gameOver) {
            processInput(e);
        }
    })
}

//When keyboard buttons are pressed
function processInput(e) {
    if (e.code == "ArrowLeft") {
        if (topSelect != 0) {
            move(-1);
        }
    } else if (e.code == "ArrowRight") {
        if (topSelect != 6) {
            move(1);
        }
    } else if (e.code == "Space") {
        updateGameboard(topSelect);
        checkGameWin();
    }
} 

//Updates gameboard whenever a tile is placed. Also places
//Tile on the board.
function updateGameboard(col) {
    let newTile;
    let tracker = 0;
    let foundTile = true;
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i][col] != 0) {
            tracker = i;
            break;
        } else if (i == 5) {
            newTile = document.getElementById(col.toString() + "-" + i.toString());
            newTile.classList.remove("tile");
            newTile.classList.add(`player${currentPlayer}`);
            gameBoard[i][col] = currentPlayer;
            foundTile = false;
            switchPlayer();    
        }
    }
    if ((foundTile) && (tracker != 0)) {
        tracker -= 1;
        newTile = document.getElementById(col.toString() + "-" + tracker.toString());
        newTile.classList.remove("tile");
        newTile.classList.add(`player${currentPlayer}`);
        gameBoard[tracker][col] = currentPlayer;
        switchPlayer();
    }
    // Toggle between players 1 and 2
    function switchPlayer() {
        let switchTiles = document.getElementById(topSelect);
        switchTiles.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === "1" ? "2" : "1"; 
        switchTiles.classList.add(`player${currentPlayer}`);
    }
}

//Moves tile indicator from left to right on top
function move(direction) {
    let top = document.getElementById(topSelect);
    top.classList.remove(`player${currentPlayer}`);
    top.classList.add("upperTile");
    let newTop;
    if (direction < 0) {
        newTop = document.getElementById(topSelect - 1);
        topSelect -= 1;
    } else {
        newTop = document.getElementById(topSelect + 1);
        topSelect += 1;
    }
    newTop.classList.remove("upperTile");
    newTop.classList.add(`player${currentPlayer}`);
}

//Checks for win condition and displays winners name
function checkGameWin() {
    for (let i = 0; i < gameBoard.length; i ++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            //Horizontal Check
            if ((j < gameBoard[i].length - 3) &&
                (gameBoard[i][j] != 0) &&
                (gameBoard[i ][j] == gameBoard[i][j+1]) && 
                (gameBoard[i][j] == gameBoard[i][j+2]) &&
                (gameBoard[i][j] == gameBoard[i][j+3])) {
                winGame();
                console.log("Horiz");
            }

            //Vertical Check
            if ((i < gameBoard.length - 3) &&
            (gameBoard[i][j] != 0) &&
            (gameBoard[i][j] == gameBoard[i+1][j]) && 
            (gameBoard[i][j] == gameBoard[i+2][j]) &&
            (gameBoard[i][j] == gameBoard[i+3][j])) {
                winGame();
                console.log("Vert");
            }

            //Left Diag Check
            if ((i < gameBoard.length - 3) &&
            (j < gameBoard[i].length - 3) &&
            (gameBoard[i][j] != 0) &&
            (gameBoard[i][j] == gameBoard[i+1][j+1]) && 
            (gameBoard[i][j] == gameBoard[i+2][j+2]) &&
            (gameBoard[i][j] == gameBoard[i+3][j+3])) {
                winGame();
                console.log("Ldiagonal");

            }

            //Right Diag Check
            if ((i < gameBoard.length - 3) &&
            (j < gameBoard[i].length - 3) &&
            (gameBoard[i+3][j] != 0) &&
            (gameBoard[i+3][j] == gameBoard[i+2][j+1]) && 
            (gameBoard[i+3][j] == gameBoard[i+1][j+2]) &&
            (gameBoard[i+3][j] == gameBoard[i][j+3])) {
                winGame();
                console.log("Rdiagonal");
            }
        }

        //Displays which player wins game, switches player number to correct player
        function winGame() {
            gameOver = true;
            currentPlayer = currentPlayer === "1" ? "2" : "1"; 
            let winningScreen = document.querySelector(`.winningScreen${currentPlayer}`);
            winningScreen.style.display = 'block';
            return true;
        }
    }
}

// New Game button logic
function newGame() {
    hideWinningScreen();
    resetGameBoard();
    refreshTiles();
    resetTopIndicator();
    gameOver = false;

    function hideWinningScreen() {
        let winningScreen = document.querySelector(`.winningScreen${currentPlayer}`);
        winningScreen.style.display = 'none';
    }
    
    function resetGameBoard() {
        gameBoard = [];
    }
    
    // Refreshes tiles and reinitializes gameboard with 0's
    function refreshTiles() {
        for (let r = 0; r < rows; r++) {
            let row = [];
            for (let c = 0; c < cols; c++) {
                let space = document.getElementById(c.toString() + "-" + r.toString());
                space.classList.remove("player1");
                space.classList.remove("player2");
                space.classList.remove("tile");
                space.classList.add("tile");
                row.push(0);
            }
            gameBoard.push(row);
        }
    }

    function resetTopIndicator() {
        let opposite = currentPlayer === "1" ? "2" : "1"; 
        let topInd = document.getElementById(topSelect);
        topInd.classList.remove(`player${opposite}`);
        topInd.classList.add("upperTile");
        topSelect = 3;
        let newInd = document.getElementById(topSelect);
        newInd.classList.remove("upperTile");
        newInd.classList.add(`player${currentPlayer}`);
    }
}
