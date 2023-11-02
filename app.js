const contactoForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

/*------ Funciones auxiliares ----- */
// Funcion generica para checkear si el campo esta vacio
const isEmpty = (input) => {
  return !input.value.trim().length;
};

// Funcion generica para validar el largo del input
const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length <= max;
};

// Funcion con Regex para validar el email
const isEmailValid = (input) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  // Testear
  return re.test(input.value.trim());
};

// Funcion para mostrar el error al validar el input
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.style.display = "block";
  error.textContent = message;
};

// Funcion para cuando todo esta bien
const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");

  const error = formField.querySelector("small");
  error.textContent = "";
};

/*------ FUNCIONES DE CADA INPUT ----- */

// Funcion para validar el name
const checkName = (input) => {
  let valid = false;
  const MIN_CAR = 3;
  const MAX_CAR = 20;

  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return;
  }

  if (!isBetween(input, MIN_CAR, MAX_CAR)) {
    showError(
      input,
      `Este campo debe tener entre ${MIN_CAR} y ${MAX_CAR} caracteres`
    );
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

// Funcion para validar el email
const checkEmail = (input) => {
  let valid = false;
  if (isEmpty(input)) {
    showError(input, "El email es obligario");
    return;
  }
  if (!isEmailValid(input)) {
    showError(input, "El email no es valido");
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

// Funcion para validar el mensaje
const checkMessage = (input) => {
  let valid = false;

  if (isEmpty(input)) {
    showError(input, "El mensaje es obligatorio");
  }

  showSuccess(input);
  valid = true;
  return valid;
};

// Funcion para validar el formulario
const validateForm = (e) => {
  e.preventDefault();

  let isNameValid = checkName(nameInput);
  let isEmailValid = checkEmail(emailInput);
  let isMessageValid = checkMessage(messageInput);

  let isValidForm = isNameValid && isEmailValid && isMessageValid;

  if (isValidForm) {
    alert("Gracias por contactarte con nosotros, en breve nos comunicaremos");
    window.location.href = "index.html";
  }
};

// Funcion init
const init = () => {
  nameInput.addEventListener("input", () => checkName(nameInput));
  emailInput.addEventListener("input", () => checkEmail(emailInput));
  messageInput.addEventListener("input", () => checkMessage(messageInput));
  contactoForm.addEventListener("submit", validateForm);
};

init();
