// Constant values.
let boardSize = 30;
const playBoard = document.querySelector(".game-board");
const scoreElement = document.querySelector(".game-score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".game-controls i");


let foodX, foodY;
let gameOver = false;

let snakeX = 5, snakeY = 10;
let snakeBody = [];

let setIntervalID;

let velocityX = 0, velocityY = 0;

let gameScore = 0;

// Get high score from local storage.
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;


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

const handleGameOver = () =>
{
    clearInterval(setIntervalID);
    document.getElementById("game-reset").style.visibility = "visible";
}

function reset()
{
    document.getElementById("game-reset").style.visibility = "hidden";
    location.reload();
}

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
        default:
            break;

    }
    try
    {
        e.preventDefault();

    }
    catch(e)
    {

    }
}

controls.forEach(key => 
{
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));
});

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

changeFoodPos();

// Set to interval at 125ms.
setIntervalID = setInterval(initGame, 100)

document.addEventListener("keydown", changeDirection);

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

window.onload = function()
{
    randomQuote();
}
