// Library of words found.
import {fiveLetterDictionary} from './dictionary.js';

// Take the library and substitute into this array.
const totalWords = fiveLetterDictionary;

// Array of guess words and current available space.
let guessedWords = [[]];
let availableSpace = 1;

// Get the word and amount of guesses.
let word;
let guessedWordCount = 0;

// Boolean values.
let gameEnd = false, gotWord = false, typing = false;

// Elements.
const keys = document.querySelectorAll(".keyboard-row button");
const message = document.getElementById("message");
const reset = document.getElementById("reset");

/**
 * When window loads.
 */
window.onload = function()
{
    randomQuote();
    createSquares();
    getNewWord();
}

/**
 * When reset button is pressed, reload page.
 */
reset.addEventListener("click", function() 
{
    document.getElementById("reset").style.visibility = "hidden";
    location.reload();
});    

/**
 * Detect key press using content loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < keys.length; i++) 
    {
        keys[i].onclick = ({ target }) => {   
            
            // Check if a boolean was flipped.
            if (gameEnd === true || gotWord === true || typing === true)
            {
                return;
            }

            const letter = target.getAttribute("data-key");
            if (letter === "enter") 
            {
                handleSubmitWord();
            }
            else if (letter === "del") 
            {
                handleDeleteLetter();
            }
            else
            {
                updateGuessedWords(letter.toUpperCase());
            }
        };
    }

});

/**
 * Same as above, but used for the keyboard.
 */
document.addEventListener('keydown', function(e)
{
    if (gameEnd === true || gotWord === true || typing === true)
    {
        return;
    }

    if (e.key.length === 1 && e.key.match((/[a-z]/i)))
    {
        let letter = e.key;
        updateGuessedWords(letter.toUpperCase());
    }
    else if (e.key === "Enter")
    {
        handleSubmitWord();
    }
    else if (e.key === "Delete" || e.key === "Backspace")
    {
        handleDeleteLetter();
    }
    else
    {
        return;
    }
});

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
 * Handles getting the current word array.
 * @returns 
 */
function getCurrentWordArr() 
{
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
}

/**
 * Update the current word guess, but not submitting.
 * @param {*} letter 
 */
function updateGuessedWords(letter) 
{
    const currentWordArr = getCurrentWordArr();
    const availableSpaceEl = document.getElementById(String(availableSpace));

    // Adding it to list if condition met.
    if (currentWordArr && currentWordArr.length < 5) 
    {
        currentWordArr.push(letter);

        availableSpace = availableSpace + 1;
        availableSpaceEl.textContent = letter;
        availableSpaceEl.style.borderColor = "rgba(127, 129, 131, 0.9)";
        availableSpaceEl.style.animation = 'textFilled 0.05s forwards';
    }

    // Remove any animation for next one after a small delay.
    setTimeout(() =>
    {
        availableSpaceEl.style.animation = 'none';
    }, 100);
}

// Replace the color for the keys.
function replaceKeyColor(key, color, interval)
{
    for (let i = 0; i < keys.length; i++)
    {
        const letter = keys[i].getAttribute("data-key");

        // If matched, set delay and add.
        if (letter.toUpperCase() === key)
        {
            setTimeout(() => {
                if (color === 'g')
                {
                    keys[i].style.background = "rgba(83, 141, 78, 0.9)";
                }
                else if (color === 'y')
                {
                    keys[i].style.background = "rgba(181, 159, 59, 0.9)";
                }
                else
                {
                    keys[i].style.background = "rgba(58, 58, 60, 0.9)";
                }
            }, interval * 6);
        }
    }

    return false;
}

// If an error were to occur, send with animation.
function sendErrorMessage(msg)
{
    message.innerHTML = msg;
    message.style.transition = 'none';
    message.style.opacity = 1;

    // Small delay for error to go away.
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transition = 'opacity 0.2s';
    }, 1000);
}

// The final game, sends message depending on if they get the word.
function sendFinalMessage()
{
    if (gotWord === true)
    {
        message.innerHTML = "Splendid!";
        message.style.transition = 'none';

        // Delay for displaying message and reset button.
        setTimeout(() => {
            message.style.opacity = 1;
            reset.style.opacity = 1;
            reset.style.visibility = 'visible';
        }, 1200);
    }
    else
    {
        message.innerHTML = "The word was: " + word;
        message.style.transition = 'none';

        // Delay for displaying message and reset button..
        setTimeout(() => {
            message.style.opacity = 1;
            reset.style.opacity = 1;
            reset.style.visibility = 'visible';
        }, 1200);
    }
}

/**
 * The long function that checks everything.
 * @returns 
 */
function handleSubmitWord() 
{

    // Preset values to make it a little easier.
    const currentWordArr = getCurrentWordArr();
    const interval = 200;
    const firstLetterId = guessedWordCount * 5 + 1;
    const currentWord = currentWordArr.join("");
    typing = true;

    // Checker to make sure it's length is 5 and exists in dictionary.
    if (currentWordArr.length !== 5 || totalWords.indexOf(currentWord.toLowerCase()) === -1) 
    {

        // Add animation for letter block and display error message.
        for (let i = 0; i < 5; i++)
        {
            const letterId = firstLetterId + i;
            const letterElement = document.getElementById(letterId);
            letterElement.style.animation = 'shake 0.5s forwards';
            if (currentWordArr.length !== 5)
            {
                sendErrorMessage("Word less than 5 letters.");
            }
            else
            {
                sendErrorMessage("Word not found.");
            }
        }

        // Reset animations after delay.
        setTimeout(() => {
            typing = false;
            for (let i = 0; i < 5; i++)
            {
                const letterId = firstLetterId + i;
                const letterElement = document.getElementById(letterId);
                letterElement.style.animation = 'none';
            }
        }, interval + 200);
        return;
    }

    // Not let user type after a small period to perform other operations.
    else
    {
        setTimeout(() => {
            typing = false;
        }, interval * 5.5);
    }

    // Check for duplicates and set the tile color.
    let remainingLetters = word;
    let tileColor = ['r', 'r', 'r', 'r', 'r'];
    for (let i = 0; i < currentWordArr.length; i++)
    {

        // If letter is in right spot, set it green.
        if (currentWordArr[i] === word[i])
        {
            tileColor[i] = 'g';
            replaceKeyColor(currentWordArr[i], tileColor[i], interval);

            // Remove remaining letters.
            remainingLetters = remainingLetters.replace(currentWordArr[i], '');
        }

        // Else set to gray (for the key).
        else
        {
            replaceKeyColor(currentWordArr[i], tileColor[i], interval);
        }
    }

    // Now check if right letter, but in wrong spot.
    for (let i = 0; i < currentWordArr.length; i++)
    {

        // If found, similar to green except make it yellow.
        if (remainingLetters.includes(currentWordArr[i]) && currentWordArr[i] !== word[i]) 
        {    
            remainingLetters = remainingLetters.replace(currentWordArr[i], '');
            tileColor[i] = 'y';
            replaceKeyColor(currentWordArr[i], tileColor[i], interval);
        }
    }

    // Set the color animation to html element after a delay.
    for (let i = 0; i < tileColor.length; i++)
    {
        const letterId = firstLetterId + i;
        const letterElement = document.getElementById(letterId);

        setTimeout(() => {
            if (tileColor[i] == 'g')
            {
                letterElement.style.animation = 'shrinkExpandGreen 0.4s forwards';
            }
            else if (tileColor[i]  == 'r')
            {
                letterElement.style.animation = 'shrinkExpandGray 0.4s forwards';
            }
            else
            {
                letterElement.style.animation = 'shrinkExpandYellow 0.4s forwards'; 
            }
        }, i* interval);
    }
    
    // If the word guessed equals word, game done.
    if (currentWord === word)
    {
        gotWord = true;
        sendFinalMessage();
        
        setTimeout(() => {

            // Add win animation.
            for (let i = 0; i < 5; i++)
            {
                const letterId = firstLetterId + i;
                const letterElement = document.getElementById(letterId);
                letterElement.style.backgroundColor = "rgba(83, 141, 78, 0.9)";
                letterElement.style.borderColor = "rgba(0, 0, 0, 0)";
                setTimeout(() => {
                    letterElement.style.animation = 'wave 0.8s ease';
                    letterElement.style.animationDelay = `${i * 0.1}s`;

                }, i);
            }
        }, interval * 7);
        
        return;
    }

    // If none of them are right, game over.
    if (guessedWords.length == 6)
    {
        gameEnd = true;
        sendFinalMessage();
        return;
    }

    // If were still under length of 6, then increment and push.
    guessedWordCount += 1;
    guessedWords.push([]);
}

/**
 * Create the squares.
 */
function createSquares() 
{
    const gameBoard = document.getElementById("board");

    for (let i = 0; i < 30; i++) 
        {
        let square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("id", i + 1);
        gameBoard.appendChild(square);
    }
}

/**
 * Handle all deletion characters.
 * @returns 
 */
function handleDeleteLetter() 
{
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr.length === 0)
    {
        return;
    }

    currentWordArr.pop();

    guessedWords[guessedWords.length - 1] = currentWordArr;

    const lastLetterEl = document.getElementById(String(availableSpace - 1));

    if (lastLetterEl === null)
    {
        return;
    }

    lastLetterEl.style.borderColor = 'rgba(58, 58, 60, 0.9)';
    lastLetterEl.textContent = "";
    availableSpace = availableSpace - 1;
}

/**
 * Get a new word when page loads.
 */
function getNewWord()
{
    let random = getRndInteger(0, totalWords.length);
    word = totalWords[random];
    word = word.toUpperCase();
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

