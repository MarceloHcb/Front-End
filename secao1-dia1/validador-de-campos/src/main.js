import validator from 'validator';

console.log(validator);
const email = document.getElementById('email');
const button = document.querySelector('button');
const h2 = document.querySelector('h2');
const select = document.querySelector('select');

button.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(email.value);
  const result = select.options[select.selectedIndex].value;
  console.log(result);
  h2.innerText = result;
});
