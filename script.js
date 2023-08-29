const playerChoiceRef = document.getElementById('playerChoice')
const computerChoiceRef = document.getElementById('computerChoice')
const playerScoreRef = document.getElementById('playerScore')
const computerScoreRef = document.getElementById('computerScore')
const currentRoundRef = document.getElementById('currentRound')
const message = document.getElementById('message');
const buttons = document.querySelectorAll('.choice');
const restart = document.getElementById('restart');

let playerScore = 0;
let computerScore = 0;
let round = 1;

function getComputerChoice() {
  const num = Math.floor(Math.random() * 3);
  switch(num) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
  }
}

function playRound(playerSelection, computerSelection) {
  const choices = ["rock", "paper", "scissors"];
  const playerSelectionIndex = choices.indexOf(playerSelection.toLowerCase());
  const computerSelectionIndex = choices.indexOf(computerSelection.toLowerCase());

  // Player wins
  if(playerSelectionIndex === (computerSelectionIndex + 1) % 3) {
    playerScore++;
    message.innerHTML = `You win! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}.`
  }
  // Computer wins
  else if(computerSelectionIndex === (playerSelectionIndex + 1) % 3) {
    computerScore++;
    message.innerHTML = `You lose! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}.`
  }
  // Draw
  else {
    message.innerHTML = `Draw. You both chose ${playerSelection}.`
  }

  // Update DOM
  round++;
  updateUI();
  playerChoiceRef.innerHTML = stringToEmoji(playerSelection);
  computerChoiceRef.innerHTML = stringToEmoji(computerSelection);

  // Check if game is over
  if(playerScore === 5) {
    message.innerHTML = `You won the game! GG`
    disableButtons();
    restart.classList.add('visible');
    
  } else if(computerScore === 5) {
    message.innerHTML = `You lost the game! Skill issue`
    disableButtons();
    restart.classList.add('visible');
  }
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  round = 1;
  updateUI();
  buttons.forEach((button) => {
    button.disabled = false;
  })
  playerChoiceRef.innerHTML = '?'
  computerChoiceRef.innerHTML = '?'
  restart.classList.remove('visible');
  message.innerHTML = 'Pick rock, paper or scissors.'
}

function disableButtons() {
  buttons.forEach((button) => {
    button.disabled = true;
  })
}

function updateUI() {
  playerScoreRef.innerHTML = playerScore;
  computerScoreRef.innerHTML = computerScore;
  currentRoundRef.innerHTML = round;
}

function stringToEmoji(string) {
  switch(string) {
    case "rock":
      return '✊'
    case "paper":
      return '✋'
    case "scissors":
      return '✌️'
  }
}


function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}