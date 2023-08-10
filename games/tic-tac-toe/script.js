const quotes = [
    "\"If you're going through hell, keep going.\" - Winston Churchill",
    "\"Don't be afraid to fail. Don't waste energy trying to cover up failure. Learn from your failures and go on to the next challenge.\” — H. Stanley Judd",
    "\"I continue to strive for excellence everyday, because I continue to push through any challenge that comes my way.\" - Trent Halama",
    "\"Only those who dare to fail greatly can ever achieve greatly.\" — Robert F. Kennedy",
    "\"Whatever you decide to do, make sure it makes you happy.\" — Paulo Coelho"  
];

function randomQuote()
{
    let total = quotes.length;
    let quote = getRndInteger(1, total);
    document.getElementById("quote").innerHTML = quotes[quote - 1];
}

function getRndInteger(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

let gameBoard = ["", "", "", "", "", "", "", "", ""];
let winPositions = 
[
    // rows
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    //cols
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    //diag
    [0, 4, 8], [2, 4, 6]
];

let pieces = ["X", "O"];
let playerTurn = pieces[getRndInteger(0, 1)];
let gameEnd = false;

window.onload = function()
{
    randomQuote();
    update();
}

function update()
{
    for (let i = 0; i < 9; i++) 
    {
        const doc = document.getElementById(i.toString());
        doc.addEventListener("click", function()
        {
            if (this.innerHTML === "" && !gameEnd)
            {
                // Find the place where clicked and place with class
                this.innerHTML = playerTurn;
                this.classList.add(playerTurn.toLowerCase());
                
                // Check for win
                checkWin();

                // If game ends, don't switch
                if (!gameEnd)
                {
                    if (playerTurn == "X")
                    {
                        playerTurn = "O";
                    }
                    else
                    {
                        playerTurn = "X";
                    }
                }
                else
                {
                    playerTurn = "F";
                }
                updateTurn();
            }
        });
    }

    // Reset button
    const reset = document.getElementById("reset");
    reset.addEventListener("click", function() 
    {
        for (let i = 0; i < 9; i++) 
        {
            document.getElementById(i.toString()).innerHTML = "";
            document.getElementById(i.toString()).classList.remove("x");
            document.getElementById(i.toString()).classList.remove("o");
            document.getElementById(i.toString()).classList.remove("shimmer");
        }
        gameEnd = false;
        playerTurn = pieces[getRndInteger(0, 1)];
        updateTurn();
    });    
}


function checkWin()
{
    for (let i = 0; i < winPositions.length; i++)
    {
        // Check where the win is located at.
        if (
            document.getElementById(winPositions[i][0].toString()).innerHTML === playerTurn &&
            document.getElementById(winPositions[i][1].toString()).innerHTML === playerTurn &&
            document.getElementById(winPositions[i][2].toString()).innerHTML === playerTurn
        )
        // If found, highlight and end game. 
        {
            document.getElementById(winPositions[i][0].toString()).classList.add("shimmer");
            document.getElementById(winPositions[i][1].toString()).classList.add("shimmer");
            document.getElementById(winPositions[i][2].toString()).classList.add("shimmer"); 
            gameEnd = true;
        }
    }
}

function updateTurn()
{
    let turnBoard = document.getElementById("turn-check");
    if (playerTurn == "X")
    {
        turnBoard.style.color = "blue";
    }
    else if (playerTurn == "O")
    {
        turnBoard.style.color = "red";
    }
    else
    {
        turnBoard.style.color = "green";
    }
    turnBoard.innerHTML = playerTurn;
}


