import { Notify } from 'notiflix';

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

formRef.addEventListener('submit', e => {
  e.preventDefault();
  let { amount, step, delay } = e.target.elements;
  delayNum = +delay.value;
  // Это конечно костыль, но единственный рабочий вариант, так как сначала знаение идёт строкой , а на 34 рядке нам надо число добавить к перемнной
  for (let i = 1; i <= +amount.value; i++) {
    createPromise(i, delayNum)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayNum += +step.value;
  }
  delayNum = +delay.value;
  // e.currentTarget.reset();
});
