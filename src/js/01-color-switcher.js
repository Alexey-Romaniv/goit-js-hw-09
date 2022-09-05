const createColorSwitcher = (startButtonSelector, stopButtonSelector) => {
  const startButton = document.querySelector(startButtonSelector);
  const stopButton = document.querySelector(stopButtonSelector);

  let currentInterval = null;

  const start = () => {
    startButton.setAttribute('disabled', 'true');
    stopButton.removeAttribute('disabled');

    currentInterval = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  };

  const stop = () => {
    startButton.removeAttribute('disabled');
    stopButton.setAttribute('disabled', 'true');

    clearInterval(currentInterval);
  };

  startButton.addEventListener('click', start);
  stopButton.addEventListener('click', stop);

  return {
    start,
    stop,
  };
};

const colorSwitcher = createColorSwitcher(
  'button[data-start]',
  'button[data-stop]'
);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
