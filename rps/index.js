function playGame(playerChoice) {
  pickPlayerChoice(playerChoice);
  const computerChoice = pickComputerChoice();
  displayResults(playerChoice, computerChoice);
}

function pickPlayerChoice(choice) {
  document.getElementById('playerChoiceDisplay').innerHTML = choice;
}

function pickComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  let computerChoice;
  if (randomNumber === 0) {
    computerChoice = 'Rock 🪨';
  }
  if (randomNumber === 1) {
    computerChoice = 'Paper 📰';
  }
  if (randomNumber === 2) {
    computerChoice = 'Scissors ✂️';
  }
  document.getElementById('computerChoiceDisplay').innerHTML = computerChoice;
  return computerChoice;
}

function displayResults(playerChoice, computerChoice) {
  const resultsDisplay = document.getElementById('resultsDisplay');
  console.log(playerChoice, computerChoice);
  if (playerChoice == computerChoice) {
    resultsDisplay.innerHTML = 'Tie';
    return;
  }

  const wins = { 'Rock 🪨': 'Scissors ✂️', 'Paper 📰': 'Rock 🪨', 'Scissors ✂️': 'Paper 📰' };
  if (wins[playerChoice] == computerChoice) {
    resultsDisplay.innerHTML = 'Player ✅';
  } else {
    resultsDisplay.innerHTML = 'Computer ❌';
  }
}
