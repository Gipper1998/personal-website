// Grab all the cards needed.
const cards = document.querySelectorAll(".card");

// Getting the cards and match counter.
let matched = 0, totalMatches = 8;
let cardOne, cardTwo;

// Boolean values.
let disableDeck = false, firstFlip = false, gameStart = false;

const reset = document.getElementById("reset");

/**
 * When window loads.
 */
window.onload = function()
{
    randomQuote();
    shuffleCards();
}

/**
 * When reset button is pressed, reload page.
 */
reset.addEventListener("click", function() 
{
    reset.style.visibility = "hidden";
    shuffleCards();
});

/**
 * Flip card over.
 * @param {*} param0 
 * @returns 
 */
function flipCard({target: clickedCard}) 
{
    // Detect if this is the first flip for future opportunities to expand.
    if (!firstFlip)
    {
        firstFlip = true;
        gameStart = true;
    }
    // Double check card flip
    if(cardOne != clickedCard && !disableDeck) 
    {
        // Add to class.
        clickedCard.classList.add("flip");

        // If card one is empty, set card one to clicked and return.
        if(!cardOne) 
        {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;

        // Get the class configured and send to match function, 
        // disable the deck so that nothing else happens.
        let cardOneImg = cardOne.querySelector(".back-view img").src;
        let cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

/**
 * Check if the cards match.
 * @param {*} img1 
 * @param {*} img2 
 * @returns 
 */
function matchCards(img1, img2) 
{
    // If they match, add point.
    if(img1 == img2) 
    {
        // If it's right, flip once over
        let tempOne = cardOne;
        let tempTwo = cardTwo;

        setTimeout(() => {
            tempOne.classList.remove("flip");
            tempTwo.classList.remove("flip");
        }, 400);

        setTimeout(() => {
            tempOne.classList.add("flip");
            tempTwo.classList.add("flip");
        }, 500);

        // Add to match and check if it equals total matches.
        matched++;
        if (matched == totalMatches)
        {
            gameStart = false;
            reset.style.visibility = "visible";
        }

        // Once the events are removed, the deck can be 
        // reopened and the two cards will be reset.
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    // If they aren't add the shake class to reference "No match."
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1000);
}

/**
 * Reset function.
 */
function shuffleCards() 
{ 
    reset.style.visibility = 'hidden';
    cards.forEach(card => {
        card.addEventListener("click", flipCard);
    });
    
    //Resets values
    matched = 0;
    disableDeck = false, gameStart = false;
    cardOne = cardTwo = "";

    //Image array
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

    // Sort the array in random positions
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    // Iterate through all the cards found
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `games/memory/memory-images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
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
