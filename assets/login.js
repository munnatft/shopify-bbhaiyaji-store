const emailRegex = /^[\w-.]+@([\w]+\.)+[\w]{2,4}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
const form = document.getElementById("customer_login")
const emailInput = document.querySelector('#CustomerEmail');
const emailErrorElement = document.querySelector('#email-error')
const passwordInput = document.querySelector('#CustomerPassword');
const passwordErrorElement = document.querySelector('#password-error');
form.addEventListener('submit',(event) => {
  event.preventDefault()
  let emailError = false;
  let passwordError = false;
  if(!emailRegex.test(emailInput.value)) {
    emailError = true
  }
  if(!passwordRegex.test(passwordInput.value)) {
    passwordError = true;
  }

  passwordError ? passwordErrorElement.classList.add("error") : passwordErrorElement.classList.remove("error")
  emailError ? emailErrorElement.classList.add("error") : emailErrorElement.classList.remove("error")

  if(passwordError || emailError) {
    return ;
  }
  form.onsubmit()
})