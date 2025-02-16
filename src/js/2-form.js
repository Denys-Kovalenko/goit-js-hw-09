import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
form.email.value = savedData.email || '';
form.message.value = savedData.message || '';

form.addEventListener(
  'input',
  throttle(() => {
    const formData = {
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();

  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!email || !message) {
    alert('Please fill in all fields!');
    return;
  }

  console.log({ email, message });

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});
