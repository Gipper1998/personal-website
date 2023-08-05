const quotes = [
    "\"If you're going through hell, keep going.\" - Winston Churchill",
    "\"Don't be afraid to fail. Don't waste energy trying to cover up failure. Learn from your failures and go on to the next challenge.\” — H. Stanley Judd",
    "\"I continue to strive for excellence everyday, because I continue to push through any challenge that comes my way.\" - Trent Halama",
    "\"Only those who dare to fail greatly can ever achieve greatly.\" — Robert F. Kennedy",
    "\"Whatever you decide to do, make sure it makes you happy.\" — Paulo Coelho"  
];

function getRndInteger(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function randomQuote()
{
    let total = quotes.length;
    let quote = getRndInteger(1, total);
    document.getElementById("quote").innerHTML = quotes[quote - 1];
}

let playerOne = "R", playerTwo = "Y"
let turn = playerOne;

let gameOver = false;
let board;
let currColumns;

let rows = 6;
let cols = 7;

window.onload = function()
{
    setGame();
    randomQuote();
    document.getElementById("reset").addEventListener("click", reset);
}

function updateTurn()
{
    let turnBoard = document.getElementById("turn-check");
    if (turn == playerOne)
    {
        turnBoard.style.color = "red";
    }
    else if (turn == playerTwo)
    {
        turnBoard.style.color = "yellow";
    }
    else
    {
        turnBoard.style.color = "blue";
    }
    turnBoard.innerHTML = turn;
}

function reset()
{
    for (let i = 0; i < rows; i++)
    {
        for (let j = 0; j < cols; j++)
        {
            document.getElementById(i.toString() + "-" + j.toString()).remove();
        }
    }
    gameOver = false;
    setGame();
}

function setGame()
{
    let random = getRndInteger(1, 10);
    if (random > 5)
    {
        turn = playerOne;
    }
    else
    {
        turn = playerTwo;
    }
    updateTurn();
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    for (let i = 0; i < rows; i++)
    {
        let row = [];
        for (let j = 0; j < cols; j++)
        {
            // For the JS
            row.push(' ');

            // HTML side
            let tile = document.createElement("div");
            let piece = document.createElement("piece");
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add("tile");

            tile.addEventListener("click", setPiece);

            // Auto append tile into the board
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() 
{
    if (gameOver) 
    {
        return;
    }

    // Get the cord split, detect current row and see how low it is.
    let cords = this.id.split("-");
    let col = parseInt(cords[1]);
    let row = currColumns[col]; 

    if (row < 0) 
    { 
        return;
    }


    // Change Piece and add class
    let tile = document.getElementById(row.toString() + "-" + col.toString());
    
    // Add class to it and change player
    if (turn == playerOne) 
    {
        tile.classList.add("fall");
        tile.classList.add("player-one");
        board[row][col] = turn; 
        turn = playerTwo;
    }
    else 
    {
        tile.classList.add("player-two");
        tile.classList.add("fall");
        board[row][col] = turn; 
        turn = playerOne;
    }

    // Update row height for the col and update arr.
    row -= 1; 
    currColumns[col] = row; 

    checkWinner();
    updateTurn();
}

function checkWinner() {
    
    // Horizontal Check
    for (let i = 0; i < rows; i++) 
    {
        for (let j = 0; j < cols - 3; j++)
        {
           if (board[i][j] != ' ') 
           {
               if (board[i][j] == board[i][j + 1] && board[i][j + 1] == board[i][j + 2] && board[i][j + 2] == board[i][j + 3]) 
               {
                    let tileOne = document.getElementById(i.toString() + "-" + j.toString());
                    let tileTwo = document.getElementById(i.toString() + "-" + (j + 1).toString());
                    let tileThree = document.getElementById(i.toString() + "-" + (j + 2).toString());
                    let tileFour = document.getElementById(i.toString() + "-" + (j + 3).toString());
                    setTimeout(function()
                    {
                        tileOne.classList.add("shimmer");
                        tileTwo.classList.add("shimmer");
                        tileThree.classList.add("shimmer");
                        tileFour.classList.add("shimmer");
                    }, 210);
                    gameOver = true;
                    turn = "F";
                    updateTurn();
                    return;
               }
           }
        }
   }

   // Vertical Check
   for (let j = 0; j < cols; j++) 
   {
       for (let i = 0; i < rows - 3; i++) 
       {
           if (board[i][j] != ' ') 
           {
               if (board[i][j] == board[i + 1][j] && board[i + 1][j] == board[i + 2][j] && board[i + 2][j] == board[i + 3][j]) 
               {
                    let tileOne = document.getElementById(i.toString() + "-" + j.toString());
                    let tileTwo = document.getElementById((i + 1).toString() + "-" + j.toString());
                    let tileThree = document.getElementById((i + 2).toString() + "-" + j.toString());
                    let tileFour = document.getElementById((i + 3).toString() + "-" + j.toString());
                    setTimeout(function()
                    {
                        tileOne.classList.add("shimmer");
                        tileTwo.classList.add("shimmer");
                        tileThree.classList.add("shimmer");
                        tileFour.classList.add("shimmer");
                    }, 210);
                    gameOver = true;
                    turn = "F";
                    updateTurn();
                    return;
               }
           }
       }
   }

   // Anti-Diagonal Check
   for (let i = 0; i < rows - 3; i++) 
   {
       for (let j = 0; j < cols - 3; j++) 
       {
           if (board[i][j] != ' ') 
           {
               if (board[i][j] == board[i + 1][j + 1] && board[i + 1][j + 1] == board[i + 2][j + 2] && board[i + 2][j + 2] == board[i + 3][j + 3]) 
               {
                    let tileOne = document.getElementById(i.toString() + "-" + j.toString());
                    let tileTwo = document.getElementById((i + 1).toString() + "-" + (j + 1).toString());
                    let tileThree = document.getElementById((i + 2).toString() + "-" + (j + 2).toString());
                    let tileFour = document.getElementById((i + 3).toString() + "-" + (j + 3).toString());
                    setTimeout(function()
                    {
                        tileOne.classList.add("shimmer");
                        tileTwo.classList.add("shimmer");
                        tileThree.classList.add("shimmer");
                        tileFour.classList.add("shimmer");
                    }, 210);
                    gameOver = true;
                    turn = "F";
                    updateTurn();
                    return;
               }
           }
       }
   }

   // Diagonal Check
   for (let i = 3; i < rows; i++) 
   {
       for (let j = 0; j < cols - 3; j++) 
       {
           if (board[i][j] != ' ') 
           {
               if (board[i][j] == board[i - 1][j + 1] && board[i - 1][j + 1] == board[i - 2][j + 2] && board[i - 2][j + 2] == board[i - 3][j + 3]) 
               {
                    let tileOne = document.getElementById(i.toString() + "-" + j.toString());
                    let tileTwo = document.getElementById((i - 1).toString() + "-" + (j + 1).toString());
                    let tileThree = document.getElementById((i - 2).toString() + "-" + (j + 2).toString());
                    let tileFour = document.getElementById((i - 3).toString() + "-" + (j + 3).toString());
                    setTimeout(function()
                    {
                        tileOne.classList.add("shimmer");
                        tileTwo.classList.add("shimmer");
                        tileThree.classList.add("shimmer");
                        tileFour.classList.add("shimmer");
                    }, 210);
                    gameOver = true;
                    turn = "F";
                    updateTurn();
                    return;
               }
           }
       }
   }
}
