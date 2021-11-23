const playAreaEl = document.getElementById("playArea-el");
const scoreAreaEl = document.getElementById("scoreArea-el");
const lifeEl = document.getElementById("life-el");
const resultAreaEl = document.getElementById("resultArea-el");
const lifelineEl = document.getElementById("lifeline-el");
let randArray = check();
let checkArray = [];
let tempThis = [];
let life = 3;
let score = 0;
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
    if (life == 0) {
      alive = false;
      resultAreaEl.innerHTML = `<img class="result" src="thanosFailed.gif" alt="avengers" />`;
      playAreaEl.innerHTML = ``;
    }
    lifeEl.innerHTML = `life : ${life}`;
    return false;
  } else {
    score++;
    if (score == 3) {
      win = true;
      resultAreaEl.innerHTML = `<img class="container result" src="thanosWin.gif" alt="avengers" />`;
      playAreaEl.innerHTML = ``;
    }
    return true;
  }
}

//on click working of game

function addThis(s) {
  if (win) return;
  if (!alive) return;
  showIt(s);
  if (checkArray.length == 0) {
    tempThis.push(s);
    checkArray.push(randArray[s]);
  } else if (checkArray.length == 1) {
    tempThis.push(s);
    checkArray.push(randArray[s]);

    if (checkThis() == false) {
      setTimeout(() => {
        for (let i = 0; i < tempThis.length; i++) {
          hideIt(tempThis[i]);
        }
      }, 200);
      temp = [];
      checkArray = [];
    } else {
      scoreAreaEl.innerHTML = `Scoreborad : ${score} `;
      tempThis = [];
      checkArray = [];
    }

    //tempThis = [];
    //checkArray = [];
  }
}

//display function with calling
function display() {
  resultAreaEl.innerHTML = "";
  playAreaEl.classList.remove("padded");
  let textHtml = ``;
  for (let i = 0; i < randArray.length; i++) {
    textHtml += `<div id="box${i}" class="imgBox">
        <img id="img${i}" class="toggle" onclick="addThis(${i})" src="image${randArray[i]}.jpg" alt="avengers" />
      </div>`;
  }
  playAreaEl.innerHTML = textHtml;
  alive = true;
  win = false;
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
function check() {
  let array = [];
  //0-->2 ==> 2 times each value
  let num = Math.floor(Math.random() * 3);
  let lengthCount = 1;
  array.push(num);
  while (lengthCount < 6) {
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
    num = Math.floor(Math.random() * 3);
  }
  return array;
}
//===============================================
