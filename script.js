const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
let curr = 'light';
let isTournament = false;
let roundsPlayed = 0;
let musicOn = true;
let sfxOn = true;
const tournamentCheckbox = document.getElementById("tournament-checkbox");
const roundInfo = document.getElementById("round-info");
const container = document.querySelector('.container');
const toggleButton = document.querySelector('.theme');
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const resultEl = document.getElementById("result");
const resetButton = document.getElementById("reset");
const musicButton = document.getElementById("toggle-music");
const sfxButton = document.getElementById("toggle-sfx");
//sounds

//victory sounds
const clickSound = document.getElementById("mouse_tap");
clickSound.load();
const victorySound = document.getElementById("victory_normal");
victorySound.load();
const tourVictorySound = document.getElementById("victory_t");
tourVictorySound.load();

//lose sounds
const loseSound = document.getElementById("lose_sound");
loseSound.load();

//draw sound
const drawSound = document.getElementById("draw_sound");
drawSound.load();

//background music
const backgroundMusic = document.getElementById("bg_music");
backgroundMusic.load();
// backgroundMusic.play();

//theme

document.body.classList.add('light-theme');

//toggle music and sound effects

musicButton.addEventListener("click", () => {
  if (musicOn) {
    if(sfxOn)clickSound.play();
    backgroundMusic.play();
    musicButton.textContent = "🔊 Music: ON";
  } else {
    if(sfxOn)clickSound.play();
    backgroundMusic.pause();
    musicButton.textContent = "🔇 Music: OFF";
  }
  musicOn = !musicOn;
});


sfxButton.addEventListener("click", () => {
  sfxOn = !sfxOn;
  if(sfxOn)clickSound.play();
  sfxButton.textContent = sfxOn ? "🎮 Sound Effects: ON" : "🚫 Sound Effects: OFF";
});


//event listeners for the buttons.

document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    if(sfxOn)clickSound.play();
    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);
    updateUI(result, playerChoice, computerChoice);
  });
});


//reset button for non-tournament mode.

resetButton.addEventListener("click", () => {
  if(sfxOn)clickSound.play();
  resetGame();
  resultEl.textContent = "Game reset! Make your move !";
});




//event listener for the theme toggle button.

toggleButton.addEventListener('click', () => {
  if (curr === 'light') {
    if(sfxOn)clickSound.play();
    document.body.style.backgroundColor = '#262521';
    curr = 'dark';
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');

    toggleButton.style.color = 'white';                    
    toggleButton.style.backgroundColor = '#262521';
    toggleButton.style.border = '2px solid white';        
    toggleButton.innerText = 'Change Theme! 🌕';


    container.style.color = 'white';
    container.style.border = '2px solid white';
    container.style.backgroundColor = '#262521';
    container.style.boxShadow = '0 0 10px white';


    document.querySelector('#tournament-mode').style.color = 'white';
    document.querySelector('#tournament-mode').style.border = '2px solid white';
    document.querySelector('#tournament-mode').style.backgroundColor = '#262521';
    document.querySelector('#tournament-mode').style.boxShadow = '0 0 10px white';


  } else if (curr === 'dark') {
    if(sfxOn)clickSound.play();
    document.body.style.backgroundColor = '#f4f4f4';
    curr = 'light';
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');


    toggleButton.style.color = 'black';
    toggleButton.style.backgroundColor = 'white';
    toggleButton.style.border = '2px solid black';
    toggleButton.innerText = 'Change Theme! ☀️';



    container.style.color = 'black';
    container.style.border = '2px solid black';
    container.style.backgroundColor = 'white';



    document.querySelector('#tournament-mode').style.color = 'black';
    document.querySelector('#tournament-mode').style.border = '2px solid black';
    document.querySelector('#tournament-mode').style.backgroundColor = 'white';
    document.querySelector('#tournament-mode').style.boxShadow = '0 0 10px black';
  }
});


// function to get a random choice for the computer.

function getComputerChoice() {
  const randIndex = Math.floor(Math.random() * choices.length);
  return choices[randIndex];
}


// function to get the result of the game.


function getResult(player, computer) {
  if (player === computer) return "draw";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  } else {
    return "lose";
  }
}


// function for UI updation for the scores, result and tornament.

function updateUI(result, player, computer) {
  if(result === "win") {
    playerScore++;
    resultEl.textContent = `You Win! ${capitalize(player)} beats ${computer}`;
    if(sfxOn)victorySound.play();
  } else if (result === "lose") {
    computerScore++;
    resultEl.textContent = `You Lose! ${capitalize(computer)} beats ${player}`;
    if(sfxOn)loseSound.play();
  } else {
    resultEl.textContent = `It's a Draw! You both chose ${player}`;
    if(sfxOn)drawSound.play();
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;

  if (tournamentCheckbox.checked) {
    roundsPlayed++;
    roundInfo.textContent = `Round ${roundsPlayed} of 5`;

    if (playerScore === 3 || computerScore === 3 || roundsPlayed === 5) {
      setTimeout(() => {
        if (playerScore > computerScore) {
          alert("🎉 You win the match!");
        } else if (playerScore < computerScore) {
          alert("😢 Computer wins the match!");
        } else {
          alert("🤝 The match is a draw!");
        }
        resetGame();
      }, 100);
    }
  }
}


// function to capitalize the first letter of a word

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


//function to reset the game.

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  roundsPlayed = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  resultEl.textContent = "";
  roundInfo.textContent = "";
}
