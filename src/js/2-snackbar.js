import { errorMessage, sucsessMessage } from './helpers';

const form = document.querySelector('.form');

const makePromise = (state, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });
};

// GENERATE PROMISES
form.addEventListener('submit', event => {
  event.preventDefault();
  //takes values from form
  let formData = new FormData(form);
  const state = formData.get('state');
  const delay = formData.get('delay');

  makePromise(state, delay)
    .then(value => sucsessMessage(`✅ Fulfilled promise in ${delay}ms`))
    .catch(error => errorMessage(`❌ Rejected promise in ${delay}ms`));
});

// --------------------------UI STYLES---------------------------------------

// FIELDSET COLORFULL IF RADIO CHECKED
function fieldSetActiveStyle() {
  const radioButtons = document.querySelectorAll('.radio-button-input');
  const fieldset = document.querySelector('fieldset');

  radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        fieldset.style.color = '#40c9ff';
        fieldset.style.borderColor = '#40c9ff';
      }
    });
  });
}
fieldSetActiveStyle();

// INPUT + LABEL COLORFULL IF IT HAS SOME VALUE
function inputActiveStyle(event) {
  const input = document.querySelector('input');
  const label = document.querySelector('.input-label');
  if (event.target.name === 'delay' && event.target.value) {
    input.style.borderColor = '#40c9ff';
    label.style.color = '#40c9ff';
  }
}
form.addEventListener('input', inputActiveStyle);
