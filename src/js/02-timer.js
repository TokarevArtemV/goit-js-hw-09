import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  clockContainer: document.querySelector('.timer'),
};

const optionsToFlatpickr = {
  enableTime: true,
  dateFormat: 'd-m-Y H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timerData = new Date(selectedDates[0]).getTime();
    changeTimer(timerData);
  },
};


class ClockFace {
    
}



let intervalId;
let timerData;
let timerIsActive = false;

flatpickr(refs.input, optionsToFlatpickr);
disableBtnState(refs.startBtn);

refs.startBtn.addEventListener('click', () => {
  if (timerIsActive) {
    return;
  }
  intervalId = setInterval(() => {
    changeTimer(timerData);
  }, 1000);
  timerIsActive = true;
});

function changeTimer(time) {
  if (time <= Date.now()) {
    disableBtnState(refs.startBtn);
    if (!timerIsActive) {
      Notify.info('Please choose a date in the future');
    } else {
        timerIsActive = false;
        Notify.success('Timer is over');
      }
      
    clearInterval(intervalId);
    return;
  }
  enableBtnState(refs.startBtn);
  const timerTime = convertMsToTime(time - Date.now());
  renderTime(timerTime);
}

function renderTime(time) {
  [...refs.clockContainer.children].forEach((elem, index) => {
    elem.firstElementChild.textContent = time[index];
  });
}

function disableBtnState(activeBtn) {
  activeBtn.style.pointerEvents = 'none';
  activeBtn.style.color = 'grey';
}
function enableBtnState(activeBtn) {
  activeBtn.style.pointerEvents = 'auto';
  activeBtn.style.color = 'black';
}

function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let day = Math.floor(hours / 24);

  seconds = padTo2Digits(seconds % 60);
  minutes = padTo2Digits(minutes % 60);
  hours = padTo2Digits(hours % 24);
  day = padTo2Digits(day);

  return [day, hours, minutes, seconds];
}
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
