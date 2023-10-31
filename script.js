const message = document.querySelector('.message');
const gameArea = document.querySelector('.game-area');
const button = document.querySelector('button');

const gameColors = ['red', 'blue', 'green', 'yellow'];

let gameClicks = [];
let userClicks = [];
let inPlay = false;
let playNumber = 2;

window.addEventListener('load', setup);

button.addEventListener('click', function (e) {
  if (!inPlay) {
    player();
  }
});

function messenger(mes) {
  message.innerHTML = mes;
}

function setup() {
  console.log('page loaded');
  for (x = 0; x < gameColors.length; x++) {
    let div = elementFactory('div');
    div.style.backgroundColor = gameColors[x];
    div.classList.add('box');
    div.style.opacity = '0.5';
    div.myColor = gameColors[x];
    div.addEventListener('click', checkAnswer);
    gameArea.appendChild(div);
  }
}

function elementFactory(elType) {
  let element = document.createElement(elType);
  return element;
}

function checkAnswer(e) {
  if (inPlay) {
    let el = e.target;
    console.log(el.myColor);
    userClicks.push(el.myColor);
    el.style.opacity = '1';
    setTimeout(function () {
      el.style.opacity = '0.5';
    }, 500);
    if (userClicks.length == gameClicks.length) {
      inPlay = false;
      endGame();
    }
  }
  console.log(userClicks);
}

function player() {
  button.disabled = true;
  button.style.display = 'none';
  messenger('Match the Pattern');
  gameClicks = [];
  userClicks = [];
  runSequence(playNumber);
}

function runSequence(num) {
  let squares = document.querySelectorAll('.box');
  num--;
  if (num < 0) {
    inPlay = true;
    return;
  }
  let randomNumber = Math.floor(Math.random() * gameColors.length);
  gameClicks.push(gameColors[randomNumber]);
  console.log(gameClicks);
  squares[randomNumber].style.opacity = '1';
  setTimeout(function () {
    squares[randomNumber].style.opacity = '0.5';
    setTimeout(function () {
      runSequence(num);
    }, 100);
  }, 500);
}

function endGame() {
  console.log('Game ended');
  button.disabled = false;
  button.style.display = 'block';
  if (userClicks.toString() == gameClicks.toString()) {
    playNumber++;
    messenger('Correct');
  } else messenger('Incorrect');
}
