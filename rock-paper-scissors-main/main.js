function game() {
  let playerScore = 0;
  let computerScore = 0;
  let moves = 0;
  const maxMoves = 10;
  const computerChoiceDisplay = document.getElementById("computer-choice");

  const playGame = () => {
    const rockBtn = document.querySelector(".rockBtn");
    const paperBtn = document.querySelector(".paperBtn");
    const scissorsBtn = document.querySelector(".scissorsBtn");

    const playerChoice = [rockBtn, paperBtn, scissorsBtn];
    const computerChoice = ["✊", "✋", "✌"];

    playerChoice.forEach((button) => {
      button.classList.add("glow-active");
    });

    const mapEmojiToChoice = (emoji) => {
      if (emoji === "✊") return "rock";
      if (emoji === "✋") return "paper";
      if (emoji === "✌") return "scissors";
    };

    const getComputerChoice = (callback) => {
      let shuffleIndex = 0;
      const shuffleInterval = 100;

      const shuffle = setInterval(() => {
        computerChoiceDisplay.innerText = computerChoice[shuffleIndex];
        shuffleIndex = (shuffleIndex + 1) % computerChoice.length;
      }, shuffleInterval);

      setTimeout(() => {
        clearInterval(shuffle);
        const randomIndex = Math.floor(Math.random() * computerChoice.length);
        const finalChoice = computerChoice[randomIndex];
        computerChoiceDisplay.innerText = finalChoice;
        computerChoiceDisplay.classList.add("computer-glow");
        callback(finalChoice);
      }, 1000);
    };

    playerChoice.forEach((button) => {
      button.addEventListener("click", function () {
        playerChoice.forEach((btn) => btn.classList.remove("clicked"));
        this.classList.add("clicked");

        const movesLeft = document.getElementById("moves-left");
        moves++;
        movesLeft.innerText = `Moves left: ${maxMoves - moves}`;

        const playerSelection = mapEmojiToChoice(this.innerText.trim());

        getComputerChoice((computerSelection) => {
          winner(playerSelection, mapEmojiToChoice(computerSelection));
          checkGameOver();
        });
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
    const demoCommentaryElement = document.getElementById("demo");

    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      playerScore++;
      playerScoreElement.innerText = `Player: ${playerScore}`;
      demoCommentaryElement.innerText = `You won a point!`;
      document.getElementById("demo").style.color = "green";
    } else if (player === computer) {
      demoCommentaryElement.innerText = `It's a tie!`;
      document.getElementById("demo").style.color = "white";
    } else {
      computerScore++;
      computerScoreElement.innerText = `Computer: ${computerScore}`;
      demoCommentaryElement.innerText = `The computer won a point!`;
      document.getElementById("demo").style.color = "red";
    }
  }

  const gameOver = () => {
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
      button.classList.remove("glow-active");
    });

    const gameOverMessage = document.getElementById("game-over-message");
    gameOverMessage.style.display = "flex";
    gameOverMessage.style.opacity = "1";

    const audio = new Audio("gameOverSound.wav");
    
    audio.play();

    setTimeout(() => {
      gameOverMessage.style.opacity = "0";
      setTimeout(() => {
        gameOverMessage.style.display = "none";
      }, 1000);
    }, 3000);
  };

  const restartGame = () => {
    playerScore = 0;
    computerScore = 0;
    moves = 0;

    document.getElementById(
      "player-score"
    ).innerText = `Player: ${playerScore}`;
    document.getElementById(
      "computer-score"
    ).innerText = `Computer: ${computerScore}`;
    document.getElementById("demo").innerText = `Make your move!`;
    document.getElementById("moves-left").innerText = `Moves left: ${maxMoves}`;
    document.getElementById("demo").style.color = "white";
    document.getElementById("computer-choice").innerText = `🤖`;

    const buttons = document.querySelectorAll(
      ".rockBtn, .paperBtn, .scissorsBtn"
    );
    buttons.forEach((button) => {
      button.disabled = false;
      button.classList.add("glow-active");
      button.classList.remove("clicked");
    });

    computerChoiceDisplay.classList.remove("computer-glow");
  };

  const restartBtn = document.querySelector(".restartBtn");
  restartBtn.addEventListener("click", restartGame);
  playGame();
}

game();
