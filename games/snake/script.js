// Html elements.
let boardSize = 30;
const playBoard = document.querySelector(".game-board");
const scoreElement = document.querySelector(".game-score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".game-controls i");
const reset = document.getElementById("reset");

// Game variables.
let foodX, foodY;
let gameOver = false;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let gameScore = 0;

// For mobile
let touchStartX, touchStartY, touchEndX, touchEndY;

// Interval.
let setIntervalID;

// Get high score from local storage.
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

/**
 * When window loads.
 */
window.onload = function()
{
    randomQuote();
    
    // Set to interval at 100ms.
    setIntervalID = setInterval(initGame, 100);

    // Set food for beginning
    changeFoodPos();

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
 * Swipe direction begin.
 */
playBoard.addEventListener('touchstart', function(e) 
{
    const touch = e.touches[0];
    touchStartX= touch.clientX;
    touchStartY = touch.clientY;
}, false);

/**
 * Swipde direction end.
 */
playBoard.addEventListener('touchend', function(e) 
{
    const touch = e.changedTouches[0];
    touchEndX = touch.clientX;
    touchEndY = touch.clientY;
    handleSwipe();
}, false);

/**
 * Prevent scrolling
 */
playBoard.addEventListener('touchmove', function(e)
{
    e.preventDefault();
}, false);

/**
 * Control for key press.
 */
controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));
});

/**
 * 
 */
function preventDefaultKey(e)
{
    e.preventDefault();
    changeDirection(e);
}

/**
 * Change direction either with arrow keys, or mouse movements.
 * @param {*} e 
 */
const changeDirection = (e) =>
{

    // Change velocity on direction of key.
    switch(e.key)
    {
        case "ArrowUp":
            if (velocityY == 1)
            {
                break;
            }
            velocityX = 0;
            velocityY = -1;
            break;
        case "ArrowDown":
            if (velocityY == -1)
            {
                break;
            }
            velocityX = 0;
            velocityY = 1;
            break;
        case "ArrowLeft":
            if (velocityX == 1)
            {
                break;
            }
            velocityX = -1;
            velocityY = 0;
            break;
        case "ArrowRight":
            if (velocityX == -1)
            {
                break;
            }
            velocityX = 1;
            velocityY = 0;
            break;
        case "w":
            if (velocityY == 1)
            {
                break;
            }
            velocityX = 0;
            velocityY = -1;
            break;
        case "s":
            if (velocityY == -1)
            {
                break;
            }
            velocityX = 0;
            velocityY = 1;
            break;
        case "a":
            if (velocityX == 1)
            {
                break;
            }
            velocityX = -1;
            velocityY = 0;
            break;
        case "d":
            if (velocityX == -1)
            {
                break;
            }
            velocityX = 1;
            velocityY = 0;
            break;
        default:
            break;
    }
}

/**
 * Event listener for key press.
 */
document.addEventListener("keydown", preventDefaultKey);

/**
 * Change the food position when the snake ate it.
 */
const changeFoodPos = () =>
{
    while(true)
    {
            // Random between 0 - 30.

        foodX = Math.floor(Math.random() * boardSize) + 1;
        foodY = Math.floor(Math.random() * boardSize) + 1;
        if (!snakeBody.includes(foodX, foodY))
        {
            break;
        }
    }

}

/**
 * When game is over.
 */
const handleGameOver = () =>
{
    clearInterval(setIntervalID);
    reset.style.visibility = "visible";
}

/**
 * Calculation for swipe.
 */
function handleSwipe()
{
    // Difference measurement.
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Check which is higher and go in that direction.
    if (Math.abs(diffX) > Math.abs(diffY))
    {
        if (diffX > 0)
        {
            simulateKeyPress('ArrowRight');
        }
        else
        {
            simulateKeyPress('ArrowLeft');
        }
    }
    else
    {
        if (diffY > 0)
        {
            simulateKeyPress('ArrowDown');
        }
        else
        {
            simulateKeyPress('ArrowUp');
        }
    }
}

/**
 * Simulate key press.
 * @param {*} key 
 */
function simulateKeyPress(key) 
{
    const event = new KeyboardEvent('keydown',
    {
        key: key,
        code: key,
        keyCode: key === 'ArrowUp' ? 38 :
            key === 'ArrowDown' ? 40 :
            key === 'ArrowLeft' ? 37 :
            key === 'ArrowRight' ? 39 : 0,
        which: key === 'ArrowUp' ? 38 :
            key === 'ArrowDown' ? 40 :
            key === 'ArrowLeft' ? 37 :
            key === 'ArrowRight' ? 39 : 0,
        bubbles: true
    });

    changeDirection(event)
}

/**
 * Run the game as it needs to track asrychniously.
 * @returns 
 */
const initGame = () =>
{
    if (gameOver)
    {
        return handleGameOver();
    }

    let htmlMarkup = `<div class = "food" style = "grid-area: ${foodY} / ${foodX}"></div>`;
    
    // Check if snake ate the apple/
    if (snakeX === foodX && snakeY === foodY)
    {

        // Redo food position.
        changeFoodPos();

        // Push into body.
        snakeBody.push([foodX, foodY]);

        gameScore++;

        highScore = gameScore >= highScore ? gameScore : highScore;
        localStorage.setItem("high-score", highScore);
        highScoreElement.innerText = `High Score: ${highScore}`;

        scoreElement.innerText = `Score: ${gameScore}`;
    }
    
    for (let i = snakeBody.length - 1; i > 0; i--)
    {
        snakeBody[i] = snakeBody[i - 1];
    }

    // Setting first element to current position of body.
    snakeBody[0] = [snakeX, snakeY];

    // Update direction.
    snakeX += velocityX;
    snakeY += velocityY;

    // Check if out of bounds.
    if (snakeX <= 0 || snakeX > boardSize || snakeY <= 0 || snakeY > boardSize)
    {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++)
    {
        // Adding div for every new part of body.
        htmlMarkup += `<div class = "snake-head" style = "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        
        // Check if snake head hits it's own body.
        if (i !== 0 && 
            snakeBody[0][1] === snakeBody[i][1] && 
            snakeBody[0][0] === snakeBody[i][0])
        {
            gameOver = true;
        }
    }
    
    playBoard.innerHTML = htmlMarkup;
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

