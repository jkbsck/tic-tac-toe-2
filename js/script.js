const game = (() => {
  "use strict";

  const _fields = [...document.getElementsByClassName("field")]; // turns HTML collection into an array

  const _playerOne = {
    name: "Player 1",
    character: "X",
    turn: true
  };
  
  const _playerTwo = {
    name: "Player 2",
    character: "O",
    turn: false
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

      _setRestartBtn();
      _play();
    });

    // set home btn
    const homeBtn = document.querySelector("#homeBtn");
    homeBtn.addEventListener("click", () => {
      let winner = document.querySelector("#winner");
      _resetBoard();
      if (winner.classList.contains("hidden") == false ) {
      //   winner.classList.add("hidden");
        _hideWinner();
      };
      // document.querySelector("#welcomePage").classList.remove("hidden");
      _play()
    });
  };

  const _play = () => {
    if (_winner.player === false) {
      const welcomePageDiv = document.querySelector("#welcomePage");
      welcomePageDiv.classList.toggle("hidden");
    } else {
      _resetBoard();
    };

   _setUpBoard();
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
      // element.addEventListener("click", helper);
      element.addEventListener("click", () => {
        // console.log(this);
        if (_playerOne.turn && element.textContent == "") {
          // _playRound(_playerOne);
          element.textContent = _playerOne.character;
          _playerOne.turn = false;
          _playerTwo.turn = true;
          element.classList.toggle("bg-danger");
        } else if (_playerTwo.turn && element.textContent == "") {
          // _playRound(_playerTwo);
          element.textContent = _playerTwo.character;
          _playerOne.turn = true;
          _playerTwo.turn = false;
          element.classList.toggle("bg-success");
        }
        _isWinner();
        if (_winner.player != false ) {
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
  };

  // used when announcing the winner
  const _showWinner = () => {
    const winnerDiv = document.getElementById("winner");
    winnerDiv.classList.remove("hidden");

    document.getElementsByTagName("body")[0].classList.add("blur");
  };

  const _isWinner = () => {
    // checks rows for winner
    for (let i = 0; i < 9; i += 3) {
      if (_fields[i].textContent !== "" && (_fields[i].textContent === _fields[i + 1].textContent && _fields[i].textContent === _fields[i + 2].textContent)) {
        // assigns winner to _winner.player object
        _winner.player = _fields[i].textContent == _playerOne.character ? _playerOne : _playerTwo;
      };
    };

    // checks columns for winner
    for (let i = 0; i < 3; i++) {
      if (_fields[i].textContent !== "" && (_fields[i].textContent === _fields[i + 3].textContent && _fields[i].textContent === _fields[i + 6].textContent)) {
        // assigns winner to _winner.player object
        _winner.player = _fields[i].textContent == _playerOne.character ? _playerOne : _playerTwo;
      };
    };

    // checks diagonals for winner
    if (_fields[0].textContent !== "" && (_fields[0].textContent === _fields[4].textContent && _fields[0].textContent === _fields[8].textContent)) {
      // assigns winner to _winner.player object
      _winner.player = _fields[0].textContent == _playerOne.character ? _playerOne : _playerTwo;
    };

    if (_fields[2].textContent !== "" && (_fields[2].textContent === _fields[4].textContent && _fields[2].textContent === _fields[6].textContent)) {
      // assigns winner to _winner.player object
      _winner.player = _fields[2].textContent == _playerOne.character ? _playerOne : _playerTwo;
    };
  };

  return { welcomePage, _fields, _playerOne, _playerTwo, _winner };

})();

game.welcomePage();
