const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset-btn");
const msgContainer = document.querySelector(".msg-contianer");
const msg = document.getElementById("msg");
const newBtn = document.getElementById("new-btn");

let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
let player = "X";
let computer = "O";


const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];


function checkWinner() {
  for (let combo of winningCombos) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      showMessage(`${board[a]} wins!`);
      return;
    }
  }
  if (!board.includes("")) {
    gameOver = true;
    showMessage("It's a tie!");
  }
}


function showMessage(text) {
  msg.textContent = text;
  msgContainer.classList.remove("hide");
}


function playerMove(index) {
  if (board[index] !== "" || gameOver) return;
  board[index] = player;
  boxes[index].textContent = player;
  checkWinner();
  if (!gameOver) {
    setTimeout(computerMove, 300); 
  }
}

function computerMove() {
  let emptyBoxes = board.map((v,i) => v === "" ? i : null).filter(v => v !== null);
  if (emptyBoxes.length === 0) return;
  let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  board[randomIndex] = computer;
  boxes[randomIndex].textContent = computer;
  checkWinner();
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach(box => box.textContent = "");
  gameOver = false;
  msgContainer.classList.add("hide");
}

boxes.forEach((box,index) => {
  box.addEventListener("click", () => playerMove(index));
});

resetBtn.addEventListener("click", resetBoard);
newBtn.addEventListener("click", resetBoard);
