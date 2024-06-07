const header = document.getElementById("topHeader");
const sidebar = document.getElementById("mySidebar");

window.onload = function()
{
    header.style.backgroundColor = "transparent";
    checkTop();
    randomQuote();
}

function openSideMenu()
{
    sidebar.style.width = "300px";
}

function closeSideMenu()
{
    sidebar.style.width = "0";
}

function checkTop()
{
    if (window.scrollY == 0)
    {
        header.style.backgroundColor = "rgba(123, 201, 134, 0.1)";
        header.style.color = "white"
        header.style.transition = "all 0.5s"
    }
    else
    {
        header.style.backgroundColor = "rgba( 57, 201, 149, 0.3)";
        header.style.transition = "background-color 0.5s"
    }
}

window.onresize = function()
{
    closeSideMenu();
}

function scrollHome()
{
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
    closeSideMenu();
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