function game() {
  let playerScore = 0;
  let computerScore = 0;
  let moves = 0;
  const maxMoves = 10;

  const playGame = () => {
    const rockBtn = document.querySelector(".rockBtn");
    const paperBtn = document.querySelector(".paperBtn");
    const scissorsBtn = document.querySelector(".scissorsBtn");

    const playerChoice = [rockBtn, paperBtn, scissorsBtn];
    const computerChoice = ["rock", "paper", "scissors"];

    const mapEmojiToChoice = (emoji) => {
      if (emoji === "✊") return "rock";
      if (emoji === "✋") return "paper";
      if (emoji === "✌") return "scissors";
    };

    const getComputerChoice = () => {
      const randomIndex = Math.floor(Math.random() * computerChoice.length);
      return computerChoice[randomIndex];
    };

    playerChoice.forEach((button) => {
      button.addEventListener("click", function () {
        const movesLeft = document.getElementById("moves-left");
        moves++;
        movesLeft.innerText = `${maxMoves - moves}`;

        const playerSelection = mapEmojiToChoice(this.innerText.trim());
        const computerSelection = getComputerChoice();

        winner(playerSelection, computerSelection);

        checkGameOver();
      });
    });
  };

  const checkGameOver = () => {
    if (moves >= maxMoves) {
      gameOver();
    }
  };

  function winner(player, computer) {
    const playerScoreElement = document.getElementById("player-score");
    const computerScoreElement = document.getElementById("computer-score");

    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      playerScore++;
      playerScoreElement.innerText = playerScore;
    } else if (player === computer) {
      console.log("It's a tie!");
    } else {
      computerScore++;
      computerScoreElement.innerText = computerScore;
    }
  }

  const gameOver = () => {
    const result = document.getElementById("result");
    result.innerText = `Game Over! Final Score - Player: ${playerScore}, Computer: ${computerScore}`;

    const buttons = document.querySelectorAll(
      ".rockBtn, .paperBtn, .scissorsBtn"
    );
    buttons.forEach((button) => {
      button.disabled = true;
    });
  };

  playGame();
}

game();
