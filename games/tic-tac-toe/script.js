// All win positions.
let winPositions = 
[
    // rows
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    //cols
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    //diag
    [0, 4, 8], [2, 4, 6]
];

// Values needed.
let pieces = ["X", "O"];
let playerTurn;
let gameEnd = false;
let counter = 1;

// Html element.
const reset = document.getElementById("reset");

/**
 * When window loads.
 */
window.onload = function()
{
    randomQuote();
    playerTurn = pieces[getRndInteger(0, 1)];
}

/**
 * When reset button is pressed, reload page.
 */
reset.addEventListener("click", function() 
{
    reset.style.visibility = "hidden";
    location.reload();
});    

/**
 * Detect tile press using content loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < 9; i++) 
    {
        const doc = document.getElementById(i.toString());
        doc.addEventListener("click", function()
        {
            if (this.innerHTML === "" && !gameEnd)
            {
                // Find the place where clicked and place with class.
                this.innerHTML = playerTurn;
                this.classList.add(playerTurn.toLowerCase());
                
                // Check for win.
                checkWin();

                // If game ends, don't switch.
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
            }
        });
    }
});

/**
 * Check win function and see if there is a tie.
 * @returns 
 */
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
            reset.style.visibility = "visible";
            return;
        }
    }

    // Tie checker.
    counter++;
    if (counter === 9)
    {
        reset.style.visibility = "visible";
    }
}

/**
 * Random integer function.
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function getRndInteger(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/**
 * Quotes used for website.
 */
const quotes = [
    "\"If you're going through hell, keep going.\" - Winston Churchill",
    "\"Don't be afraid to fail. Don't waste energy trying to cover up failure. Learn from your failures and go on to the next challenge.\” — H. Stanley Judd",
    "\"I continue to strive for excellence everyday, because I continue to push through any challenge that comes my way.\" - Trent Halama",
    "\"Only those who dare to fail greatly can ever achieve greatly.\" — Robert F. Kennedy",
    "\"Whatever you decide to do, make sure it makes you happy.\" — Paulo Coelho"  
];

/**
 * Get a random quote to paste in footers.
 */
function randomQuote()
{
    let total = quotes.length;
    let quote = getRndInteger(1, total);
    document.getElementById("quote").innerHTML = quotes[quote - 1];
}