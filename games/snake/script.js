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


// The board
let blockSize = 20, rows = 20, cols = 20;
let board;
let context;

// The snakes head (located at [5, 5])
let snakeX;
let snakeY;

// Snake Body
let snakeBody = [];
let prevBody = [];

// The Food (located at [10, 10])
let foodX;
let foodY;

// Velocity
let velocityX = 0;
let velocityY = 0;

let interval;
let gameOver = false;
let firstMove = false;

// Touch screen
let touchStartX = null;
let touchStartY = null;

let high = 0, current = 0;
let statusBar = "Moving";
let currentKey = 0, prevKey = 0;

// Timer stuff
let count = 0, second = 0;
let timer = false;

window.onload = function()
{
    randomQuote();
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d") // Used for draeing on the board.
    placeFood();
    placeStart();
    prevBody.push([snakeX, snakeY])
    interval = setInterval(update, 1000/10); // 10 Miliseconds, update
}

function random(max)
{
    return Math.floor(Math.random() * max) * blockSize;
}

function reset()
{
    prevBody = [];
    snakeBody = [];
    gameOver = false;
    timer = false;
    velocityX = 0;
    velocityY = 0;
    current = 0;
    prevKey = 0;
    currentKey = 0;
    statusBar = "Moving";
    second = 0;
    count = 0;

    clearInterval(interval);
    placeFood();
    placeStart();
    
    prevBody.push([snakeX, snakeY]);
    interval = setInterval(update, 1000/10); // 10 Miliseconds, update
}

function update()
{
    console.log(interval);
    if (velocityX > 0 || velocityY > 0)
    {
        timer = true;
    }

    document.getElementById("high-score-num").innerHTML = high.toString();
    document.getElementById("high-score-num").style.color = "magenta";
    document.getElementById("status-bar-type").style.color = "green";
    document.getElementById("status-bar-type").innerHTML = statusBar;
    document.getElementById("current-score-num").innerHTML = current.toString();
    document.getElementById("current-score-num").style.color = "magenta";

    // Check for key press and see if its the same as last
    checkPress();
    if (currentKey != 0 && prevKey != currentKey)
    {
        prevKey = currentKey;
        changeDirection(currentKey);
    }

    document.addEventListener("touchstart", touchStart);
    document.addEventListener("touchmove", touchMove);

    document.getElementById("reset").addEventListener("click", reset);

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Check if snake ate the food
    if (snakeX == foodX && snakeY == foodY)
    {
        snakeBody.push([foodX, foodY])
        current++;
        if (current > high)
        {
            high++;
        }
        placeFood();
    }

    // Start very end of body, tail to get prev value to move forward
    for (let i = snakeBody.length - 1; i > 0; i--)
    {
        snakeBody[i] = snakeBody[i - 1];
    }

    // Move the snake head.
    if (snakeBody.length)
    {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++)
    {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Check if game is over
    if ((snakeX < 0 || snakeX > ((cols - 1) * blockSize)) || (snakeY < 0 || (snakeY > (rows - 1) * blockSize)))
    {
        clearInterval(interval);
        for (let i = 0; i < prevBody.length; i++)
        {
            context.fillRect(prevBody[i][0], prevBody[i][1], blockSize, blockSize);
        }
        gameOver = true;
        timer = false;
        statusBar = "Game Over";
        document.getElementById("status-bar-type").style.color = "red"; 
        document.getElementById("status-bar-type").innerHTML = statusBar;
        return;
    }

    for (let i = 0; i < snakeBody.length; i++)
    {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1])
        {
            clearInterval(interval);
            for (let i = 0; i < prevBody.length; i++)
            {
                context.fillRect(prevBody[i][0], prevBody[i][1], blockSize, blockSize);
            }
            gameOver = true;
            timer = false;
            statusBar = "Game Over";
            document.getElementById("status-bar-type").style.color = "red"; 
            document.getElementById("status-bar-type").innerHTML = statusBar;
            return;
        }
    }

    prevBody[0] = (snakeX, snakeY);
    for (let i = 0; i < snakeBody.length; i++)
    {
        prevBody[(i + 1)] = snakeBody[i];
    }
}

function checkPress()
{
    document.onkeydown = function(e)
    {
        if (!gameOver)
        {
            e.preventDefault();
        }
        switch(e.code)
        {
            case "ArrowUp":
                currentKey = 1;
                break;
            case "ArrowDown":
                currentKey = 2;
                break;
            case "ArrowLeft":
                currentKey = 3;
                break;
            case "ArrowRight":
                currentKey = 4;
                break;
            default:
                currentKey = 0;
                break;
        }
    }
}

function changeDirection(dir)
{
    switch(dir)
    {
        case 1:
            {
                if (velocityY != 1)
                {
                    velocityX = 0;
                    velocityY = -1;
                }
                break;
            }
        case 2:
            {
                if (velocityY != -1)
                {
                    velocityX = 0;
                    velocityY = 1;
                }
                break;
            }
        case 3:
            {
                if (velocityX != 1)
                {
                    velocityX = -1;
                    velocityY = 0;
                }
                break;
            }
        case 4:
            {
                if (velocityX != -1)
                {
                    velocityX = 1;
                    velocityY = 0;
                }
                break;
            }
        default:
            break;
    }
}

function touchStart(e)
{
    touchStartX = e.touches[0].clientX; 
    touchStartY = e.touches[0].clientY;                                      
}

function touchMove(e)
{
    if (!touchStartX || !touchStartY)
    {
        return;
    }
    let endX = e.touches[0].clientX; 
    let endY = e.touches[0].clientY;   

    let xDif = touchStartX - endX;
    let yDif = touchStartY - endY;

    if (Math.abs(xDif) > Math.abs(yDif))
    {
        // Left
        if (xDif > 0 && velocityX != 1)
        {
            velocityX = -1;
            velocityY = 0;
        }
        // Right
        else if (velocityX != -1)
        {
            velocityX = 1;
            velocityY = 0;
        }
    }
    else
    {
        // Up
        if (yDif > 0 && velocityY != 1)
        {
            velocityX = 0;
            velocityY = -1;
        }
        // Down
        else if (velocityY != -1)
        {
            velocityX = 0;
            velocityY = 1;
        }
    }      
}

// Place the food randomly
function placeFood()
{
    let valid = false
    while(!valid)
    {
        let found = false;
        foodX = random(cols);
        foodY = random(rows);
        for (let i = 0; i < snakeBody.length; i++)
        {
            if (foodX == snakeBody[i][0] && foodY == snakeBody[i][1])
            {
                found = true;
                break;
            }
        }
        if (!found)
        {
            valid = true;
        }
    }

}

// Place a random start point
function placeStart()
{
    snakeX = random(cols);
    snakeY = random(rows);
}
