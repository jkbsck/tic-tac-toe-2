const game = (() => {
  "use strict";

  const _fields = [...document.getElementsByClassName("field")]; // turns HTML collection into an array

  const _playerOne = {
    name: "Player 1",
    character: "X",
    turn: true,
    score: 0
  };
  
  const _playerTwo = {
    name: "Player 2",
    character: "O",
    turn: false,
    score: 0
  };

  const _winner = {
    player: false
  };

  const welcomePage = () => {
    // assign names and characters if given
    const start = document.getElementsByClassName("start")[0];
    start.addEventListener("click", () => {
      _playerOne.name = document.getElementById("playerOneName").value;
      _playerOne.character = document.getElementById("playerOneCharacter").value[0];
      _playerTwo.name = document.getElementById("playerTwoName").value;
      _playerTwo.character = document.getElementById("playerTwoCharacter").value[0];

      _play();
    });

    _setRestartBtn();

    // set home btn
    const homeBtn = document.querySelector("#homeBtn");
    homeBtn.addEventListener("click", () => {
      let winner = document.querySelector("#winner");
      _resetBoard();
      if (winner.classList.contains("hidden") == false ) {
        _hideWinner();
      };
      document.querySelector("#welcomePage").classList.remove("hidden");
      _playerOne.score = 0;
      _playerTwo.score = 0;
      _hideWinner();
    });

    _setUpBoard();
  };

  const _play = () => {
    const welcomePageDiv = document.querySelector("#welcomePage");
    welcomePageDiv.classList.add("hidden");
    
    _resetBoard();
  };

  const _resetBoard = () => {
    _fields.forEach(field => {
      field.textContent = "";
      field.classList.remove("bg-danger");
      field.classList.remove("bg-success");
    });
    _winner.player = false;
  };

  // restart event listener test
  const _setRestartBtn = () => {
    const restartBtnWinner = document.querySelector("#restartBtnWinner");
    restartBtnWinner.addEventListener("click", () => { 
      _hideWinner();
      _play();
    });
  };

  const _setUpBoard = () => {
    // add event listener to every field
    _fields.forEach(element => {
      element.addEventListener("click", () => {
        if (_playerOne.turn && element.textContent == "") {
          element.textContent = _playerOne.character;
          _playerOne.turn = false;
          _playerTwo.turn = true;
          element.classList.toggle("bg-danger");
        } else if (_playerTwo.turn && element.textContent == "") {
          element.textContent = _playerTwo.character;
          _playerOne.turn = true;
          _playerTwo.turn = false;
          element.classList.toggle("bg-success");
        }
        if (_winner.player == false) {
          _isWinner();
        };
        if (_winner.player != false) {
          // anounce winner with option to restart
          const winnerDiv = document.getElementById("winner");
          _showWinner();

          const winnerSpan = document.querySelector("#winnerName");
          winnerSpan.textContent = `${_winner.player.name} has won the game!`;
          winnerDiv.prepend(winnerSpan);
        };
      });
    });
  };

  // used when announcing the winner
  const _hideWinner = () => {
    const winnerDiv = document.getElementById("winner");
    winnerDiv.classList.add("hidden");

    document.getElementsByTagName("body")[0].classList.remove("blur");

    // hide results
    if (_playerOne.score == 0 && _playerTwo.score == 0) {
      const results = [...document.getElementsByClassName("result")];
      results.forEach(result => {
        result.classList.add("hidden");
      });
    };
  };

  // used when announcing the winner
  const _showWinner = () => {
    const winnerDiv = document.getElementById("winner");
    winnerDiv.classList.remove("hidden");

    document.getElementsByTagName("body")[0].classList.add("blur");

    // show results
    const results = [...document.getElementsByClassName("result")];
    results.forEach(result => {
      result.classList.remove("hidden");
    });
    document.querySelector("#resultOneName").textContent = _playerOne.name + ":";
    document.querySelector("#resultTwoName").textContent = _playerTwo.name + ":";
    document.querySelector("#resultOneScore").textContent = _playerOne.score;
    document.querySelector("#resultTwoScore").textContent = _playerTwo.score;
  };

  const _isWinner = () => {
    // checks rows for winner
    for (let i = 0; i < 9; i += 3) {
      if (_fields[i].textContent !== "" && (_fields[i].textContent === _fields[i + 1].textContent && _fields[i].textContent === _fields[i + 2].textContent)) {
        // assigns winner to _winner.player object
        _winner.player = _fields[i].textContent == _playerOne.character ? _playerOne : _playerTwo;
        _winner.player.score++;
      };
    };

    // checks columns for winner
    for (let i = 0; i < 3; i++) {
      if (_fields[i].textContent !== "" && (_fields[i].textContent === _fields[i + 3].textContent && _fields[i].textContent === _fields[i + 6].textContent)) {
        // assigns winner to _winner.player object
        _winner.player = _fields[i].textContent == _playerOne.character ? _playerOne : _playerTwo;
        _winner.player.score++;
      };
    };

    // checks diagonals for winner
    if (_fields[0].textContent !== "" && (_fields[0].textContent === _fields[4].textContent && _fields[0].textContent === _fields[8].textContent)) {
      // assigns winner to _winner.player object
      _winner.player = _fields[0].textContent == _playerOne.character ? _playerOne : _playerTwo;
      _winner.player.score++;
    };

    if (_fields[2].textContent !== "" && (_fields[2].textContent === _fields[4].textContent && _fields[2].textContent === _fields[6].textContent)) {
      // assigns winner to _winner.player object
      _winner.player = _fields[2].textContent == _playerOne.character ? _playerOne : _playerTwo;
      _winner.player.score++;
    };
  };

  return { welcomePage };

})();

game.welcomePage();
