const writeName = document.querySelector('#name-input');
const namelabel = document.querySelector('#name-label');
const pScore = document.querySelector('#player-score');
const cScore = document.querySelector('#computer-score');
const Pchose = document.querySelector('#player-chose');
const Cchose = document.querySelector('#computer-chose');

let playerName = '';
let playerChooses;
let computerChooses;
let playerScore = 1;
let computerScore = 1;




const nameButton = document.querySelector('#name-button');
nameButton.addEventListener('click', changeName)
function changeName(event) {
    event.preventDefault();
    playerName = writeName.value; // assign the value of writeName input to playerName variable
    namelabel.innerText = playerName;
    writeName.value = '';
}




const btnContainer = document.querySelector('#button-container');
btnContainer.addEventListener('click', readInput)
function readInput(e) {
    if (e.target.innerText == 'Sten') {
        playerChooses = 'rock';
    }
    else if (e.target.innerText == 'Sax') {
        playerChooses = 'scissors';
    }
    else {
        playerChooses = 'paper';
    }
    // result(playerChooses);
    console.log(playerChooses);
    computerLogic(playerChooses);
    resultLogic(playerChooses, computerChooses);
    resultScore(playerScore, computerScore);

    function computerLogic() {
        let randomMath = Math.round(Math.random() * 2);
        if (randomMath == 0) {
            computerChooses = `paper`
        }
        else if (randomMath == 1) {
            computerChooses = `rock`
        }
        else {
            computerChooses = `scissor`
        }

        // console.log(randomMath)
        console.log(computerChooses)
        // result(computerChooses, playerChooses)
    }
    function resultLogic() {
        if (playerChooses === `rock` && computerChooses === `scissor` || playerChooses === `paper` && computerChooses === `rock` || playerChooses === `scissors` && computerChooses === `paper`) {
            pScore.innerText = playerScore++;
        }
        else if (playerChooses === `rock` && computerChooses === `paper` || playerChooses === `scissors` && computerChooses === `rock` || playerChooses === `paper` && computerChooses === `scissor`) {
            cScore.innerText = computerScore++;
        }
        else {

            setTimeout(function () { alert("Draw, try again!!"); }, 500);

        }
        console.log(pScore)
    }

    function resultScore() {
        if (computerScore >= 2) {
            setTimeout(function () { alert("You lost! Try again!!"); }, 500);
        }
        postDatabase(playerScore);
      }
      
    Pchose.innerText = `${namelabel.innerText} chose ${playerChooses}😎`;
    Cchose.innerText = ` CPU chose ${computerChooses}🤖 `;

}

const resetb = document.querySelector('#reset-button');
resetb.addEventListener('click', resetButton)
function resetButton(event) {
    playerScore = 0;
    computerScore = 0;
    namelabel.value = '';
}

const baseurl = `https://highscore---rockpaperscissor-default-rtdb.europe-west1.firebasedatabase.app/Highscore.json`;

async function getdata() {
    const response = await fetch(baseurl);
    const data = await response.json();
    console.log(data)
    displayScoreInfo(data);
  }
  

getdata();

async function displayScoreInfo(data) {
    try {
        const array = Object.values(data);
        array.sort((a, b) => b.score - a.score);

        const highScoreWrapper = document.createElement('div');
        highScoreWrapper.classList.add('high-score-wrapper');

        highScoreWrapper.innerHTML = '<h2>High Scores:</h2>';

        array.slice(0, 5).forEach((item) => {
            const info = document.createElement('p');
            info.innerText = `${item.name}: ${item.score}`;
            highScoreWrapper.appendChild(info);
        });

        const highestScoreContainer = document.querySelector('#highscore');
        highestScoreContainer.innerHTML = '';
        highestScoreContainer.appendChild(highScoreWrapper);
    } catch (error) {
        console.error(error);
    }
}


async function postDatabase(playerPoints) {
    const obj = {
        name: playerName,
        score: playerPoints
    };
    const option = {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    };
    const response = await fetch(baseurl, option);
    const data = await response.json();
    console.log(data);
    displayScoreInfo(data);
}
