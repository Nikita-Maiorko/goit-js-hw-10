import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// ------------------------FORMATING DATE--------------------------

export function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// ------------------------CONVERT FROM MS-------------------------

export function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// ------------------ MESSAGE--------------------------

export function errorMessage(message) {
  iziToast.error({
    message: message,
    position: window.innerWidth <= 768 ? 'bottomCenter' : 'topCenter',
    transitionIn: 'fadeInDown',

    backgroundColor: 'rgb(231, 19, 36)',
    messageColor: 'white',
    iconColor: 'white',
    messageSize: '16px',
    class: 'toast',
  });
}

export function sucsessMessage(message) {
  iziToast.success({
    message: message,
    position: window.innerWidth <= 768 ? 'bottomCenter' : 'topCenter',
    transitionIn: 'fadeInDown',
    backgroundColor: '#40c9ff',
    messageColor: 'white',
    iconColor: 'white',
    messageSize: '16px',
  });
}

// --------------ADDING AND REMOVE DISABLE STYLES FOR BTN----------------

export function disable(element, className) {
  element.disabled = true;
  element.classList.add(`${className}`);
}

export function enable(element, className) {
  element.disabled = false;
  element.classList.remove(className);
}
