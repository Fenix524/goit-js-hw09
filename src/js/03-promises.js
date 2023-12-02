import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const thisForm = e.currentTarget;

  const delayInput = thisForm.elements.delay.value;
  const stepInput = parseInt(thisForm.elements.step.value);
  const amountInput = parseInt(thisForm.elements.amount.value);

  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delayInput);
  });

  p.then(() => {
    Notiflix.Notify.info(`✅ Start`);

    for (let i = 1; i <= amountInput; i++) {
      createPromise(i, stepInput * i)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }); 
    }
  });
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        setTimeout(() => {
          resolve({ position, delay });
        }, delay);
      } else {
        setTimeout(() => {
          reject({ position, delay });
        }, delay);
      }
    }, delay);
  });
}
