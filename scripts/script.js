const quotes = [
    "\"If you're going through hell, keep going.\" - Winston Churchill",
    "\"Don't be afraid to fail. Don't waste energy trying to cover up failure. Learn from your failures and go on to the next challenge.\” — H. Stanley Judd",
    "\"I continue to strive for excellence everyday, because I continue to push through any challenge that comes my way.\" - Trent Halama",
    "\"Only those who dare to fail greatly can ever achieve greatly.\" — Robert F. Kennedy",
    "\"Whatever you decide to do, make sure it makes you happy.\" — Paulo Coelho"  
];

function openSideMenu()
{
    document.getElementById("mySidebar").style.width = "300px";
}

function closeSideMenu()
{
    document.getElementById("mySidebar").style.width = "0";
}

function checkTop()
{
    if (window.scrollY == 0)
    {
        document.getElementById("topHeader").style.backgroundColor = "rgba(75, 125, 112, 0.5)";
        document.getElementById("topHeader").style.color = "white"
        document.getElementById("topHeader").style.transition = "all 0.5s"
    }
    else
    {
        document.getElementById("topHeader").style.backgroundColor = "rgba(75, 125, 112, 0.8)";
        document.getElementById("topHeader").style.transition = "background-color 0.5s"
    }
}

function firstLoad()
{
    document.getElementById("topHeader").style.backgroundColor = "transparent";
    checkTop();
    randomQuote();
}

window.onresize = function()
{
    closeSideMenu();
}

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

function scrollHome()
{
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
    closeSideMenu();
}