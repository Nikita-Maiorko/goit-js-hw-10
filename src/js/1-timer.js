import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import {
  convertMs,
  addLeadingZero,
  errorMessage,
  enable,
  disable,
} from './helpers';

// GLOBAL
let timerID = null;
const startButton = document.querySelector('.button');
const dateTimePicker = document.querySelector('#datetime-picker');
// add disable btn styles
disable(startButton, 'disable-btn');

// FLATPICR LIBRARY IMPLEMENT
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // CLOSING BEHAVIOR LOGIC FOR ONCLOSE METHOD
  onClose(selectedDates) {
    const endDate = new Date(selectedDates[0].getTime());
    const now = new Date().getTime();

    if (endDate - now < 0) {
      errorMessage('Please choose a date in the future');
      return;
    }

    //make btn active
    enable(startButton, 'disable-btn');
    // remove prev interval, add new and start timer
    startButton.removeEventListener('click', startTimer);
    startButton.addEventListener('click', () => {
      startTimer(endDate);
      // make btn & input disabled
      disable(startButton, 'disable-btn');
      disable(dateTimePicker, 'disable-input');
    });
  },
};

try {
  flatpickr('#datetime-picker', options);
} catch (err) {
  console.error('Flatpickr initialization failed:', err);
  errorMessage('Something went wrong. Try again.');
}

//START TIMER LOGIC
function startTimer(endDate) {
  // if prev timer exist
  if (timerID) clearInterval(timerID);

  // start timer
  timerID = setInterval(() => {
    const now = Date.now();
    const timeLeft = endDate - now;
    // convert time to d.h.m.s and adding to html
    let timeUnits = convertMs(endDate - now);
    displayTimer(timeUnits);

    // if time on timer ends
    if (timeLeft <= 0) {
      clearInterval(timerID);
      displayTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      enable(dateTimePicker, 'disable-input');
      return;
    }
  }, 1000);
}

//ADDING TIME TO HTML
function displayTimer(timeUnits) {
  Object.keys(timeUnits).forEach(key => {
    document.querySelector(`[data-${key}]`).textContent = addLeadingZero(
      timeUnits[key]
    );
  });
}
