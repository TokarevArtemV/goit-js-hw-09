import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formInput: document.querySelector('.form'),
};

refs.formInput.addEventListener('submit', submitForm);

function submitForm(evt) {
  evt.preventDefault();
  const objData = {};
  const formData = new FormData(refs.formInput);
  formData.forEach((value, key) => {
    objData[key] = value;
  });
  createFunctions(objData);
}

function createFunctions(objData) {
  for (let index = 0; index < objData.amount; index++) {
    const position = index + 1;
    const delay = Number(objData.delay) + Number(objData.step) * index;
    const promise = createPromise(position, delay);

    promise
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
          timeout: 6000,
          width: '300px',
          position: 'center-center',
          fontSize: '13px',
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
          timeout: 6000,
          width: '300px',
          position: 'center-center',
          fontSize: '13px',
        });
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, rejact) => {
    const shouldResolve = Math.random() > 0.3;
    const obj = {
      position,
      delay,
    };
    setTimeout(() => {
      if (shouldResolve) {
        resolve(obj);
      } else {
        rejact(obj);
      }
    }, delay);
  });
}
