const root = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

changeBtnState(startBtn, stopBtn);

root.addEventListener('click', changeColor);

let intervalId;

function changeColor({ target }) {
  if (target.dataset.start === '') {
      changeBtnState(stopBtn, startBtn);
    return (intervalId = setInterval(() => {
      const currentCollor = getRandomHexColor();
      root.style.backgroundColor = currentCollor;
    }, 1000));
  }
  if (target.dataset.stop === '') {
      clearInterval(intervalId);
      changeBtnState(startBtn, stopBtn);
  }
}


function changeBtnState(activeBtn, disableBtn) {
  activeBtn.style.pointerEvents = 'auto';
  activeBtn.style.color = 'black';
  disableBtn.style.pointerEvents = 'none';
  disableBtn.style.color = 'grey';
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}