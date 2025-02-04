const controlPanel = document.querySelector(".control");
const gamePanel = document.querySelector(".game-container");
const arrow = document.querySelector(".arrow");
const scoreCounter = document.querySelector(".scoreDisplay");
const newGameBtn = document.querySelector(".newGameBtn")
const targetBox = document.querySelector(".targetColor");
const buttonsGrid = document.querySelector(".options-grid")
const statusDisplay = document.querySelector(".status");
const checkIcon = document.querySelector(".checkicon").cloneNode(true);
const defaultOptions = document.querySelector(".options-grid").innerHTML;
console.log(defaultOptions)
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

window.addEventListener("DOMContentLoaded" , () => {
    controlPanel.classList.add("appear-animation");
    gamePanel.classList.add("appear-animation");
    arrow.classList.add("waiting-animation");
    scoreCounter.innerHTML = 0;
})

newGameBtn.addEventListener("click" , startNewGame);
window.onload = () => {
    launchGame();
}

// Game functions
function playRound() {
    buttonsGrid.innerHTML = ""
    targetBox.innerHTML = ""
    let randomIndex = getRandomIndex(colors);
    let randomColor = colors[randomIndex];
    targetBox.style.backgroundColor = `rgb(${randomColor})`;
    let correctColorIndex = Math.floor(Math.random() * 6) + 1;
    for (let i = 1 ; i <= 6 ; i++) {
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
        statusDisplay.classList.remove("incorrect");
        statusDisplay.classList.add("correct");
        statusDisplay.innerHTML = "Correct!";
        statusDisplay.appendChild(checkIcon)
        checkIcon.classList.add("check-animation");
        scoreCounter.innerHTML = playerScore;
    }
    else
    {
        statusDisplay.classList.remove("correct");
        statusDisplay.classList.add("incorrect");
        statusDisplay.classList.remove("shake-animation")
        
        setTimeout(() => {
            statusDisplay.classList.add("shake-animation");
        } , 10);

        statusDisplay.innerHTML = "Wrong!";
        scoreCounter.innerHTML = playerScore;
    }

    playRound()
}

function startNewGame()
{
    playerScore = 0
    scoreCounter.innerHTML = playerScore;
    statusDisplay.classList.remove("correct");
    statusDisplay.classList.remove("incorrect");
    statusDisplay.innerHTML = "Waiting...";
    window.addEventListener("click" , launchGame)
    window.addEventListener("touchstart", launchGame);
    console.log(defaultOptions)
    document.querySelector(".options-grid").innerHTML = defaultOptions;
    
    alert("New game has started");
}

function launchGame()
{
    playRound()
    window.removeEventListener("click" , launchGame)
    window.removeEventListener("touchstart", launchGame);
}


// Utilities functions
function createVariant(color)
{
    
    let rgb = color.split(",").map(num => parseInt(num.trim())); // array for the channels (int)
    for(let i = 0 ; i < 3 ; i++)
    {
        // change the range of channel by 50
        let randomValue = Math.round(Math.random());
        if (randomValue === 0) {
            rgb[i] = lightenChannel(rgb[i]); 
        } else {
            rgb[i] = darkenChannel(rgb[i]); 
        }
    }
    return rgb.join(",")
}

function getRandomIndex(array)
{
    return Math.floor(Math.random() * array.length)
}


function lightenChannel(channel)
{
    let newVal = channel + Math.floor(Math.random() * 255);
    if(newVal >= 255)
    {
        newVal = 255;
    }
    return newVal
}

function darkenChannel(channel)
{
    let newVal = channel - Math.floor(Math.random() * 255);
    if(newVal <= 0)
    {
        newVal = 0;
    }
    return newVal
}
