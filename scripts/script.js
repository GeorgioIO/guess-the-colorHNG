const controlPanel = document.querySelector(".control");
const gamePanel = document.querySelector(".game-container");
const arrow = document.querySelector(".arrow");
const scoreCounter = document.querySelector(".scoreDisplay");
const newGameBtn = document.querySelector(".newGameBtn")
const targetBox = document.querySelector(".targetColor");
const buttonsGrid = document.querySelector(".options-grid")
const statusDisplay = document.querySelector(".status");
let playerScore = 0;

colors = 
[
    "69, 76, 75", "77, 160, 140","90, 77, 237","161, 209, 40","66, 158, 226",
    "26, 60, 58","224, 119, 126","195, 92, 34","241, 40, 183","242, 152, 46",
    "60, 154, 157","248, 161, 27","186, 165, 18","55, 139, 32","48, 29, 11",
    "34, 11, 205","54, 16, 102","47, 235, 199","13, 3, 159","42, 100, 101",
    "177, 22, 113","196, 39, 66","221, 233, 174","40, 67, 19","41, 161, 230",
    "39, 172, 102","87, 1, 15","162, 181, 9","66, 83, 70","160, 133, 140",
    "88, 246, 240","22, 40, 227","97, 105, 248","228, 219, 45","133, 131, 39",
    "106, 110, 237","58, 106, 15","1, 86, 38","154, 46, 88","136, 11, 145",
    "111, 107, 231","65, 223, 101","158, 62, 202","58, 39, 140","7, 226, 210",
    "129, 67, 240","192, 137, 110","183, 246, 182","218, 233, 37","39, 179, 51",
]

window.addEventListener("DOMContentLoaded" , (event) => {
    controlPanel.classList.add("appear-animation");
    gamePanel.classList.add("appear-animation");
    arrow.classList.add("waiting-animation");
    scoreCounter.innerHTML = 0;
    
})

newGameBtn.addEventListener("click" , startNewGame);


function playRound()
{
    buttonsGrid.innerHTML = ""
    targetBox.innerHTML = ""
    let randomIndex = getRandomIndex(colors);
    let randomColor = colors[randomIndex];
    targetBox.style.backgroundColor = `rgb(${randomColor})`;
    let correctColorIndex = Math.floor(Math.random() * 6) + 1;
    for(let i = 1 ; i <= 6 ; i++)
    {

        const button = document.createElement("button");
        button.setAttribute("data-testid" , "colorOption")
        button.classList.add("options")
        if(i === correctColorIndex)
        {
            button.style.backgroundColor = `rgb(${randomColor})`;
            button.dataset.correct = "true";
        }
        else
        {
            let variant = createVariant(randomColor);
            button.style.backgroundColor = `rgb(${variant})`;
            button.dataset.correct = "false";
        }
        buttonsGrid.appendChild(button)

        button.addEventListener("click" , function(event){
            guess(event);
        })
    }
}

function guess(e)
{
    if(e.currentTarget.dataset.correct === "true")
    {
        playerScore++;
        statusDisplay.classList.remove("incorrect")
        statusDisplay.classList.add("correct");
        statusDisplay.innerHTML = "Correct!";
        scoreCounter.innerHTML = playerScore
    }
    else
    {
        statusDisplay.classList.remove("correct")
        statusDisplay.classList.add("incorrect");
        statusDisplay.innerHTML = "Wrong!"
        scoreCounter.innerHTML = playerScore
    }

    playRound()
}

function startNewGame()
{
    playerScore = 0;
    statusDisplay.innerHTML = "Waiting!"
    statusDisplay.classList.remove("correct")
    statusDisplay.classList.remove("incorrect")
    alert("New game has started");
}

function createVariant(color)
{
    let rgb = color.split(","); // array from the rgb
    let randomRGB = rgb[getRandomIndex(rgb)]; // get random from red , green , blue
    let newVal = parseInt(randomRGB) + (Math.floor(Math.random() * 230) - 5);
    return String(rgb).replace(randomRGB , newVal)
}

function getRandomIndex(array)
{
    return Math.floor(Math.random() * array.length)
}


window.addEventListener("click" , launchGame)
window.addEventListener("touchstart", launchGame);

function launchGame()
{
    playRound()
    window.removeEventListener("click" , launchGame)
    window.removeEventListener("touchstart", launchGame);
}