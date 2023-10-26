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
    time = new Date(selectedDates[0]).getTime();
    clockFace.setTimer(time);
  },
};

class ClockFace {
  static convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let day = Math.floor(hours / 24);

    seconds = ClockFace.padTo2Digits(seconds % 60);
    minutes = ClockFace.padTo2Digits(minutes % 60);
    hours = ClockFace.padTo2Digits(hours % 24);
    day = ClockFace.padTo2Digits(day);

    return [day, hours, minutes, seconds];
  }
  static padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  intervalId;
  timerData;
  timerIsActive = false;

  constructor(render, startBtn) {
    this.render = render;
    this.startBtn = startBtn;
  }

  disableBtnState(btn) {
    btn.style.pointerEvents = 'none';
    btn.style.color = 'grey';
  }
  enableBtnState(btn) {
    btn.style.pointerEvents = 'auto';
    btn.style.color = 'black';
  }

  start() {
    if (this.timerIsActive) {
      return;
    }
    this.intervalId = setInterval(() => {
      this.changeTimer(this.timerData);
    }, 1000);
    this.timerIsActive = true;
  }

  setTimer(time) {
    this.timerData = time;
    if (time <= Date.now()) {
      this.disableBtnState(this.startBtn);
      if (!this.timerIsActive) {
        Notify.info('Please choose a date in the future');
        this.render(['00', '00', '00', '00']);
        return;
      } else {
        this.render(['00', '00', '00', '00']);
        return;
      }
    }
    this.enableBtnState(this.startBtn);
    const timerTime = ClockFace.convertMsToTime(time - Date.now());
    this.render(timerTime);
  }

  changeTimer(time) {
    if (time <= Date.now()) {
      this.disableBtnState(refs.startBtn);

      this.timerIsActive = false;
      Notify.success('Timer is over');
      clearInterval(this.intervalId);
      return;
    }
    this.enableBtnState(refs.startBtn);
    const timerTime = ClockFace.convertMsToTime(time - Date.now());
    this.render(timerTime);
  }
}

const clockFace = new ClockFace(renderTime, refs.startBtn);
clockFace.disableBtnState(refs.startBtn);

refs.startBtn.addEventListener('click', () => {
  clockFace.start();
});

flatpickr(refs.input, optionsToFlatpickr);

function renderTime(time) {
  [...refs.clockContainer.children].forEach((elem, index) => {
    elem.firstElementChild.textContent = time[index];
  });
}
