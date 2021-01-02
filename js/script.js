const game = (() => {
  "use strict";

   // turns HTML collection into an array
  const _fields = [...document.getElementsByClassName("field")];

  // player one object with default options
  const _playerOne = {
    name: "Player 1",
    character: "X",
    turn: true,
    score: 0
  };
  
  // player two object with default options
  const _playerTwo = {
    name: "Player 2",
    character: "O",
    turn: false,
    score: 0,
    isComputer: false
  };

  // stores winning player into this object - false if none
  const _winner = {
    player: false
  };

  // only public method - most of listeners are assigned here
  const welcomePage = () => {

    // add listener to start button - assign names and characters if given
    _setStartBtn();

    // add listener to restart button which will show when winner announced
    _setRestartBtn();

    // set home btn
    _setHomeBtn();

    // set listeners to 9 fields on board
    _setUpBoard();
  };

  // add listener to start button - assign names and characters if given - call play method
  const _setStartBtn = () => {
    const start = document.getElementsByClassName("start")[0];
    start.addEventListener("click", () => {
      _playerOne.name = document.getElementById("playerOneName").value;
      _playerOne.character = document.getElementById("playerOneCharacter").value[0];
      _playerTwo.name = document.getElementById("playerTwoName").value;
      _playerTwo.character = document.getElementById("playerTwoCharacter").value[0];
      _playerTwo.isComputer = document.getElementById("playerTwoIsComputer").checked ? true : false;

      // sets fields for a game
      _play();
    });
  };

  // add listener to restart button which will show when winner announced
  const _setRestartBtn = () => {
    const restartBtnWinner = document.querySelector("#restartBtnWinner");
    restartBtnWinner.addEventListener("click", () => { 
      _hideWinner();
      _play();
    });
  };

  // set home button
  const _setHomeBtn = () => {
    const homeBtn = document.querySelector("#homeBtn");
    homeBtn.addEventListener("click", () => {
      let winner = document.querySelector("#winner");
      _resetBoard();
      if (winner.classList.contains("hidden") == false) {
        _hideWinner();
      };
      document.querySelector("#welcomePage").classList.remove("hidden");
      _playerOne.score = 0;
      _playerTwo.score = 0;
      _hideWinner();
    });
  };

  // set listeners to 9 fields on board
  const _setUpBoard = () => {
    // add event listener to every field
    _fields.forEach(element => {
      element.addEventListener("click", () => {
        if (_playerOne.turn && element.textContent == "") {
          
          element.textContent = _playerOne.character;
          element.classList.toggle("bg-danger");

          // if plays against computer - randomly picks fields
          if (_playerTwo.isComputer == true) {
            let freeFields = _fields.filter(field => field.textContent == "");
            let computerField = freeFields[Math.floor(Math.random() * freeFields.length)];
            computerField.textContent = _playerTwo.character;
            computerField.classList.toggle("bg-success");
          } else {
            _playerOne.turn = false;
            _playerTwo.turn = true;
          };
        
        } else if (_playerTwo.turn && element.textContent == "") {
          element.textContent = _playerTwo.character;
          _playerOne.turn = true;
          _playerTwo.turn = false;
          element.classList.toggle("bg-success");
        }
        if (_winner.player == false) {
          _isWinner();
        };
        let isFilled = 0;
        _fields.forEach( (element) => {
          if (element.textContent == "") {
            isFilled++;
          };
        });
        if (_winner.player != false || isFilled == 0 ) {
          // anounce winner with option to restart
          const winnerDiv = document.getElementById("winner");
          _showWinner();

          const winnerSpan = document.querySelector("#winnerName");

          _winner.player == false ? winnerSpan.textContent = "It's a tie!" : winnerSpan.textContent = `${_winner.player.name} has won the game!`;
          winnerDiv.prepend(winnerSpan);
        };
      });
    });
  };

  // sets fields for a game
  const _play = () => {
    const welcomePageDiv = document.querySelector("#welcomePage");
    welcomePageDiv.classList.add("hidden");
    
    _resetBoard();
  };

  // resets board fields
  const _resetBoard = () => {
    _fields.forEach(field => {
      field.textContent = "";
      field.classList.remove("bg-danger");
      field.classList.remove("bg-success");
    });
    _winner.player = false;
  };

  // used when announcing the winner
  const _hideWinner = () => {
    const winnerDiv = document.getElementById("winner");
    winnerDiv.classList.add("hidden");

    document.getElementsByClassName("wrapper")[0].classList.remove("blur");

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

    document.getElementsByClassName("wrapper")[0].classList.add("blur");

    // show results
    const results = [...document.getElementsByClassName("result")];
    results.forEach(result => {
      result.classList.remove("hidden");
    });
    document.querySelector("#resultOneName").textContent = _playerOne.name + ` (${_playerOne.character})` + ":";
    document.querySelector("#resultTwoName").textContent = _playerTwo.name + ` (${_playerTwo.character})` + ":";
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

  return { welcomePage, _playerTwo, _fields };

})();

game.welcomePage();
