import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const timeValue = document.querySelectorAll('.value');
let selectedTime = null;

startBtn.setAttribute('disabled', true);
timer.style.display = 'flex';
timer.style.gap = '10px';
timeValue.forEach(el => {
  el.style.display = 'block';
  el.style.fontSize = '25px';
  el.style.textAlign = 'center';
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();
    if (selectedTime <= Date.now()) {
      startBtn.setAttribute('disabled', true);
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

const fp = flatpickr('input#datetime-picker', options);
startBtn.addEventListener('click', startTimer);

function startTimer() {
  startBtn.setAttribute('disabled', true);
  const timer = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    const arrayConvertMs = [days, hours, minutes, seconds];
    arrayConvertMs.forEach((el, i) => (timeValue[i].textContent = el));

    if (selectedTime <= currentTime) {
      clearInterval(timer);
      timeValue.forEach(el => (el.textContent = '00'));
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
