import { Notify } from 'notiflix';

let delay = 0;
let step = 0;
let amount = 0;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

const formRef = document.querySelector('.form');
const delayRef = document.querySelector('input[name="delay"]');
const stepRef = document.querySelector('input[name="step"]');
const amountRef = document.querySelector('input[name="amount"]');

delayRef.addEventListener('input', e => (delay = +e.target.value));

stepRef.addEventListener('input', e => (step = +e.target.value));
amountRef.addEventListener('input', e => (amount = +e.target.value));
// formRef.addEventListener('input', changeValue);

formRef.addEventListener('submit', e => {
  e.preventDefault();
  for (let i = 1; i <= amount; i++, delay += step) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  e.currentTarget.reset();
});

// function changeValue(e) {
//   e.target.name = +e.target.value;
// }
