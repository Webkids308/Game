import { game } from "./module/vareables.js";
import { profile, setHoverEffect, markCell, swapTurn, endGame, isDraw } from "./module/helper.js";
import { checkWin, winCombinations } from "./module/win.js";

game.startBtn.addEventListener("click", startGame);
game.restartBtn.addEventListener("click", startGame);
game.drawBtn.addEventListener("click", startGame);

profile();

// Start Game
function startGame() {
  setHoverEffect();
  game.blockElements.forEach(cell => {
    cell.classList.remove(game.X_CLASS);
    cell.classList.remove(game.Y_CLASS);
    cell.classList.remove("win");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, {once: true});
  });
  game.startWindow.classList.add("hide");
  game.winEl.classList.remove("show");
  game.drawEl.classList.remove("show");
  game.winnerImg.children.length ? game.winnerImg.removeChild(game.winner) : null
}

// Onclick function
function handleClick(e) {
  const cell = e.target;
  const currentClass = game.turn ? game.Y_CLASS : game.X_CLASS;
  markCell(cell, currentClass);
  let flag = checkWin(currentClass, game.blockElements).filter( (win, index) => {
    if(win) {
      game.winner = game.blockElements[winCombinations[index][0]].cloneNode(true);
      return win !== false /* ! = = */
    }
  });
  // G'alaba yoki durrangni tekshirish
  if(flag.length) {
    endGame(false, game.winEl, game.drawEl);
    game.winnerImg.append(game.winner);
  } else if(isDraw(flag)) {
    endGame(true, game.winEl, game.drawEl);
  }
  game.turn = swapTurn(game.turn);
  setHoverEffect();
}