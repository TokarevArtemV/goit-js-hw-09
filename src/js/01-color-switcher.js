const root = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

notActiveBtn(stopBtn);

root.addEventListener('click', changeColor);

let intervalId;

function changeColor({ target }) {
  if (target.dataset.start === '') {
      activeBtn(stopBtn);
      notActiveBtn(startBtn);
    return (intervalId = setInterval(() => {
      const currentCollor = getRandomHexColor();
      root.style.backgroundColor = currentCollor;
    }, 1000));
  }
  if (target.dataset.stop === '') {
      clearInterval(intervalId);
      activeBtn(startBtn);
      notActiveBtn(stopBtn);
  }
}

function notActiveBtn(btn) {
  btn.style.pointerEvents = 'none';
  btn.style.color = 'grey';
}

function activeBtn(btn) {
  btn.style.pointerEvents = 'auto';
  btn.style.color = 'black';
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}