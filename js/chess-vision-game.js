startButton = document.getElementById("btn");
startButton.addEventListener("click", () => {
  startGame();
});

function startGame() {
  inGameEvents();
  setTimeout(() => {
    endGame();
  }, 31000);
  //hide start button after start
  startButton.style.display = "none";
}
function inGameEvents() {
  drawBoard();
  drawXY();
  startTimer();
  showInstructions();
  // checkInput(targetId) is a call back function which activated automaticly on click!
}

function endGame() {
  removeBoard();
  resetTimer();
}

//Global Vaiabels
var avalibleLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];
var avalibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
var orders;
var i;
var l;
var divContainer = document.getElementById("board-holder");

//functions implementations
function drawBoard() {
  for (i = 1; i <= 8; i++) {
    avalibleLetters.forEach((element) => {
      l = element;
      let newDiv = document.createElement("div");
      newDiv.style.width = "15px";
      newDiv.style.height = "15px";
      newDiv.style.padding = "15px";
      newDiv.style.borderRadius = "1px";
      newDiv.id = `${l}${i}`;
      newDiv.addEventListener("click", (event) => {
        //passing event.target.id as argument for the call back function, to be used in
        //it to know which element had been called and it's id
        checkInput(event.target.id);
      });
      if (
        i % 2 == 0 &&
        (l == avalibleLetters[0] ||
          l == avalibleLetters[2] ||
          l == avalibleLetters[4] ||
          l == avalibleLetters[6])
      ) {
        newDiv.style.background = "#33FF44";
      } else if (
        i % 2 != 0 &&
        (l == avalibleLetters[1] ||
          l == avalibleLetters[3] ||
          l == avalibleLetters[5] ||
          l == avalibleLetters[7])
      ) {
        newDiv.style.background = "#33FF44";
      } else {
        newDiv.style.background = "#CCCCCC";
      }
      divContainer.appendChild(newDiv);
    });
  }
}
function drawXY() {
  //print x
  divContainer.children[0].innerHTML = `${divContainer.children[0].id
    .split("")
    .reverse()
    .join("")}`;
  for (let i = 1; i < 8; i++) {
    divContainer.children[i].innerHTML = `${
      divContainer.children[i].id.split("")[0]
    }`;
  }
  //print y
  for (let j = 8; j < 64; j += 8) {
    divContainer.children[j].innerHTML = `${
      divContainer.children[j].id.split("")[1]
    }`;
  }
}
function startTimer() {
  const counter = document.getElementById("counter");
  var x = setInterval(() => {
    // edit in timer element
    currentTime = Number(`${counter.innerHTML}`.split(":")[1]);
    Nexttime = currentTime - 1;
    counter.innerHTML = `00:${String(Nexttime)}`;
    if (Nexttime == 0) {
      clearInterval(x);
    }
  }, 1000);
}
function showInstructions() {
  //give the player a random div to click
  let instructions = [];
  let instructionView = document.getElementById("instruction");
  const randomX =
    avalibleLetters[Math.floor(Math.random() * avalibleLetters.length)];
  const randomY =
    avalibleNumbers[Math.floor(Math.random() * avalibleNumbers.length)];
  instructions.push(randomX);
  instructions.push(randomY);
  instructions = instructions.join("");
  instructionView.innerHTML = `Click on : ${instructions}`;
  orders = instructions;
  instructions = instructions.split("");
  instructions.pop();
  instructions.pop();
}
function checkInput(targetId) {
  //validate input of the calller this matches the shown instructions
  if (targetId == orders) {
    //if it correct, add to score, show correct sign, show the next random x & y to instruct player
    //add to score
    let score = document.getElementById("score-board");
    let currentScore = Number(`${score.innerHTML}`.split(":")[1]);
    nextScore = currentScore + 1;
    score.innerHTML = `score:${String(nextScore)}`;
    // show correct sign
    const parent = document.getElementById("imgContainer");
    const img = document.createElement("img");
    img.src = "https://as1.ftcdn.net/v2/jpg/00/08/06/22/1000_F_8062235_95r1VLi5D4a2V5UvzxtBUIb44oHSqsPq.jpg";
    img.style.padding = "15px";
    parent.appendChild(img);
    //show the next random x & y to instruct player
    showInstructions();
  } else {
    //if it is not correct, show not correct sign, show the next random x & y to instruct player
    const parent = document.getElementById("imgContainer");
    const img = document.createElement("img");
    img.src = "https://as2.ftcdn.net/v2/jpg/03/76/40/93/1000_F_376409393_AplVbY9EcXNCQz6LPilH8RbScpeG8Cp9.jpg";
    img.style.padding = "15px";
    parent.appendChild(img);
    //show the next random x & y to instruct player
    showInstructions();
  }
}
function removeBoard() {
  divContainer.replaceChildren();
}
function resetTimer() {
  const counter = document.getElementById("counter");
  counter.innerHTML = `00:30`;
}
