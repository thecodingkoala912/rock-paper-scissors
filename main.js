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
        movesLeft.innerText = `Moves left: ${maxMoves - moves}`;

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
    const demoCommentaryElement=document.getElementById("demo");

    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      playerScore++;
      playerScoreElement.innerText = `Player: ${playerScore}`;
      demoCommentaryElement.innerText=`You won a point!`;
    } else if (player === computer) {
      demoCommentaryElement.innerText=`It's a tie!`;
    } else {
      computerScore++;
      computerScoreElement.innerText =`Computer: ${computerScore}`;
      demoCommentaryElement.innerText=`The computer won a point!`;
    }
  }

  const gameOver = () => {
    const result = document.getElementById("result");
    result.innerText = `Game Over!`;

    if (playerScore > computerScore) {
        alert("Congratulations! You won!");
    } else if (computerScore > playerScore) {
        alert("You lost! Better luck next time.");
    } else {
        alert("It's a tie!");
    }

    const buttons = document.querySelectorAll(
      ".rockBtn, .paperBtn, .scissorsBtn"
    );
    buttons.forEach((button) => {
      button.disabled = true;
    });
};

  const restartGame = () => {
    playerScore = 0;
    computerScore = 0;
    moves = 0;

    
    document.getElementById("player-score").innerText = `Player: ${playerScore}`;
    document.getElementById("computer-score").innerText = `Computer: ${computerScore}`;
    document.getElementById("demo").innerText=`Make your move!`;
    document.getElementById("moves-left").innerText = `Moves left: ${maxMoves}`;
    document.getElementById("result").innerText = "";

    
    const buttons = document.querySelectorAll(".rockBtn, .paperBtn, .scissorsBtn");
    buttons.forEach((button) => {
      button.disabled = false;
    });
  };


  const restartBtn = document.querySelector(".restartBtn");
  restartBtn.addEventListener("click", restartGame);
  playGame();
}

game();
