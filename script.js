const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const newBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const diceImage = document.querySelector(".dice");

let dice, score0, score1, current0, current1;
let playing = true;

//starting conditions
const reset = function () {
  if (!player0.classList.contains("player--active"))
    player0.classList.add("player--active");
  if (player1.classList.contains("player--active"))
    player1.classList.remove("player--active");

  playing = true;
  score0 = score1 = current0 = current1 = 0;
  score0El.textContent = score0;
  score1El.textContent = score1;
  current0El.textContent = current0;
  current1El.textContent = current1;

  diceImage.classList.add("hidden");
  holdBtn.style.cursor = "pointer";
  rollBtn.style.cursor = "pointer";
  if (player0.classList.contains("player--winner"))
    player0.classList.remove("player--winner");
  if (player1.classList.contains("player--winner"))
    player1.classList.remove("player--winner");
};

const switchPlayer = function () {
  if (player0.classList.contains("player--active")) {
    current0 = 0;
    current0El.textContent = current0;
  } else {
    current1 = 0;
    current1El.textContent = current1;
  }
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

reset();

rollBtn.addEventListener("click", function () {
  if (playing) {
    dice = Math.trunc(Math.random() * 6) + 1;
    diceImage.classList.remove("hidden");
    diceImage.src = `images/dice-${dice}.png`;
    if (dice === 1) {
      switchPlayer();
    } else {
      if (player0.classList.contains("player--active")) {
        current0 += dice;
        current0El.textContent = current0;
      } else {
        current1 += dice;
        current1El.textContent = current1;
      }
    }
  }
});

holdBtn.addEventListener("click", function () {
  if (playing) {
    if (player0.classList.contains("player--active")) {
      score0 += current0;
      score0El.textContent = score0;
      if (score0 >= 100) {
        player0.classList.add("player--winner");
        holdBtn.style.cursor = "not-allowed";
        rollBtn.style.cursor = "not-allowed";
        playing = false;
      } else switchPlayer();
    } else {
      score1 += current1;
      score1El.textContent = score1;
      if (score1 >= 100) {
        player1.classList.add("player--winner");
        holdBtn.style.cursor = "not-allowed";
        rollBtn.style.cursor = "not-allowed";
        playing = false;
      } else switchPlayer();
    }
  }
});

newBtn.addEventListener("click", reset);
