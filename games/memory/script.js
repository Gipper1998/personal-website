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

const cards = document.querySelectorAll(".card");

let matched = 0, totalMatches = 8;
let cardOne, cardTwo;
let disableDeck = false;
let firstFlip = false;
let count = 0;
let second = 0;

window.onload = function()
{
    randomQuote();
    shuffleCards();
    document.getElementById("reset").addEventListener("click", reset);
}

function reset()
{
    if (matched != totalMatches)
    {
        shuffleCards();
    }
    firstFlip = false;
    count = 0, second = 0;
    setTimeout(() => {
        shuffleCards();
        document.getElementById("time").innerHTML = "0s";
    }, 200);
}

function updateMatches()
{
    let matchDoc = document.getElementById("matches");
    let totalMatchDor = document.getElementById("matches-left");
    matchDoc.innerHTML = matched;
    totalMatchDor.innerHTML = (totalMatches - matched);
}

function startTimer()
{
    if (firstFlip)
    {
        count+= 10;
        if (count == 1000)
        {
            second++;
            count = 0;
        }

        let secondStr = second + "s";
        document.getElementById("time").innerHTML = secondStr;
        setTimeout(startTimer, 10);
    }
}

function flipCard({target: clickedCard}) 
{
    if (!firstFlip)
    {
        firstFlip = true;
        startTimer();
    }
    // Double check card flip
    if(cardOne != clickedCard && !disableDeck) 
    {
        clickedCard.classList.add("flip");

        // If card one is empty, set card one to clicked and return.
        if(!cardOne) 
        {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;

        // Get the class configured and send to match function, disable the deck so that nothing else happens.
        let cardOneImg = cardOne.querySelector(".back-view img").src;
        let cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

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

        matched++;
        updateMatches();

        // Once the events are removed, the deck can be reopened and the two cards will be reset.
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
        console.log("flipped");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1000);
}

// Acts like a reset function, will shuffle the cards and place them throughout the board.
function shuffleCards() 
{ 
    cards.forEach(card => {
        card.addEventListener("click", flipCard);
    });
    //Resets values
    matched = 0;
    disableDeck = false;
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

