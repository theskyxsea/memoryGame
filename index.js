const playAreaEl = document.getElementById("playArea-el");
const scoreAreaEl = document.getElementById("scoreArea-el");
const lifeEl = document.getElementById("life-el");
const resultAreaEl = document.getElementById("resultArea-el");
const lifelineEl = document.getElementById("lifeline-el");
const scriptEl = document.getElementById("script-el");
const styleEl = document.getElementById("style-el");
const maindivEl = document.getElementById("mainDiv");
const footerEl = document.getElementById("footer-el");
let level = 1;
let randArray;
let checkArray = [];
let tempThis = [];
let difficulty = 3;
let life = 3;
let score = 0;
let gameStart = false;
let alive = false;
let win = false;
let lifeline = 4;
alert(`Instructions: To start the game Press Thanos Hand.
you can either go with luck or memory.
Tap the 'Iron-man Healmet' button to have a peek and memorize the location of cards.
You can go with 3 wrong Atempts and 4 lifelines to memorise the card.

OR

Just start opening cards and take guesses about the matching card!
open any card and you have to try to guess the location of the card matching it!
Good luck 🤗`);

//game status update

function checkThis() {
  if (checkArray[0] != checkArray[1]) {
    life--;
    if (level > 3) {
      display();
    }
    return false;
  } else {
    score++;
    return true;
  }
}

//on click working of game

function addThis(s) {
  gameStart = true;
  if (win) return;
  if (!alive) return;
  showIt(s);
  if (checkArray.length == 0) {
    tempThis.push(s);
    checkArray.push(randArray[s]);
  } else if (checkArray.length == 1 && s != tempThis[0]) {
    tempThis.push(s);
    checkArray.push(randArray[s]);

    if (checkThis() == false) {
      setTimeout(() => {
        for (let i = 0; i < tempThis.length; i++) {
          hideIt(tempThis[i]);
        }
      }, 400);
      checkArray = [];

      if (life == 0) {
        tempThis = [];
        checkArray = [];
        level = 1;
        difficulty = 3;
        alive = false;
        resultAreaEl.innerHTML = `<img class="result" src="thanosFailed.gif" alt="avengers" />`;
        playAreaEl.innerHTML = ``;
      }
      lifeEl.innerHTML = `life : ${life}`;
    } else {
      scoreAreaEl.innerHTML = `Scoreborad : ${score} `;
      tempThis = [];
      checkArray = [];

      if (score == difficulty) {
        win = true;
        resultAreaEl.innerHTML = `<img class="container result" src="thanosWin.gif" alt="avengers" />`;
        setTimeout(() => {
          resultAreaEl.innerHTML = "";
          //playAreaEl.classList.remove(`conontainer${difficulty}`);
          //playAreaEl.classList.add(`conontainer${difficulty}`);
          //display();
        }, 1200);
        playAreaEl.innerHTML = ``;
        difficultyUp();
      }
    }

    //tempThis = [];
    //checkArray = [];
  }
}

//display function with calling
function display() {
  randArray = check(difficulty);
  resultAreaEl.innerHTML = "";
  playAreaEl.classList.remove("padded");

  let textHtml = ``;
  for (let i = 0; i < randArray.length; i++) {
    textHtml += `<div id="box${i}" class="imgBox">
        <img id="img${i}" class="toggle" onclick="addThis(${i})" src="image${randArray[i]}.jpg" alt="avengers" />
      </div>`;
  }
  playAreaEl.innerHTML = textHtml;
  cssUpdate();

  alive = true;
  win = false;
  gameStart = false;
  score = 0;
  life = 3;
  lifeline = 4;
  scoreAreaEl.innerHTML = `Scoreborad : ${score}`;
  lifeEl.innerHTML = `Life : ${life}`;
  lifelineEl.innerHTML = `Lifline : ${lifeline}`;
}
//===============================================

//show all function
function showAll() {
  if (gameStart) return;
  if (!lifeline) return;
  if (win) return;
  if (!alive) return;
  for (let i = 0; i < randArray.length; i++) {
    showIt(i);
  }
  setTimeout(() => {
    for (let i = 0; i < randArray.length; i++) {
      hideIt(i);
    }
  }, 200);
  lifeline--;
  lifelineEl.innerHTML = `Lifeline : ${lifeline}`;
}
//===============================================

//image show function
function showIt(i) {
  let imgEl = document.getElementById(`img${i}`);
  imgEl.classList.remove("toggle");
  // console.log(randArray[i]);
}
//===============================================

//image hide function
function hideIt(i) {
  let imgEl = document.getElementById(`img${i}`);
  imgEl.classList.add("toggle");
}
//===============================================

//get array for display
function check(difficulty) {
  let array = [];
  //0-->2 ==> 2 times each value
  let num = Math.floor(Math.random() * difficulty); //3
  let lengthCount = 1;
  array.push(num);

  while (lengthCount < difficulty * 2) {
    let addOn = true;
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (i != j && num == array[i] && num == array[j]) {
          addOn = false;
          break;
        }
      }
    }

    if (addOn == true) {
      array.push(num);
      lengthCount++;
    }

    num = Math.floor(Math.random() * difficulty);
  }
  //console.log(array);
  return array;
}
//===============================================
function difficultyUp() {
  level++;
  difficulty += 2;
  gameStart = false;
  //console.log("hii");
}

//======================================================
function cssUpdate() {
  let gridSize = 90 / difficulty;
  let tempstr = ``;
  for (let i = 0; i < difficulty; i++) {
    tempstr += ` ${gridSize}%`;
  }
  playAreaEl.style.gridTemplateColumns = tempstr;
  //playAreaEl.classList.remove("container3");
  //playAreaEl.classList.add("container6");
}
