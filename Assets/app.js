const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
//traigo el menu y el carrito y lo que necesito
const cartBtn = document.querySelector(".cart-label"); //el div del carrito
const menuBtn = document.querySelector(".menu-label"); //el div del menu
const cartMenu = document.querySelector(".cart"); //div del carrito
const barsMenu = document.querySelector(".navbar-list"); //div del menu
const overlay = document.querySelector(".overlay");
const cartBubble = document.querySelector(".cart-bubble"); //bubble del carrito

/*******FUNCIONES GENERICAS********/
// Funcion check input vacio
const isEmpty = (input) => {
  return !input.value.trim().length;
};

// Funcion min/max input
const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length <= max;
};

// Funcion con Regex del email
const isEmailValid = (input) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  // Testear
  return re.test(input.value.trim());
};

// Funciones render Html error y clases
// Funcion para ERROR
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.style.display = "block";
  error.textContent = message;
};

// Funcion para OK
const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");

  const error = formField.querySelector("small");
  error.textContent = "";
};

/*****FUNCIONES ESPECIFICAS DE LOS INPUTS----- */

// Funcion para validar el name
const checkInput = (input) => {
  let valid = false;
  const MIN_CAR = 3;
  const MAX_CAR = 25;

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
    showError(input, "El email es obligatorio");
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
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

// Funcion para validar el formulario
const validateForm = (e) => {
  e.preventDefault();

  let isNameValid = checkInput(nameInput);
  let isEmailValid = checkEmail(emailInput);
  let isMessageValid = checkMessage(messageInput);

  let isValidForm = isNameValid && isEmailValid && isMessageValid;

  alert("Gracias por escribirnos. En breve nos comunicaremos con vos");
  window.location.href = "index.html";
};

/*****FUNCIONES PARA EL CARRITO Y EL MENU----- */
const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");

  if (barsMenu.classList.contains("open-menu")) {
    barsMenu.classList.remove("open-menu");
    return;
  }

  overlay.classList.toggle("show-overlay");
};

const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");

  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

// Funcion para cerrar el menu cuando se clickea el overlay
const closeOnOverlayClick = () => {
  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

// Funcion para cerrar menues, cuando scrolleamos
const closeOnScroll = () => {
  if (
    barsMenu.classList.contains("open-menu") &&
    cartMenu.classList.contains("open-cart")
  ) {
    return;
  }

  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

// Funcion init
const init = () => {
  //funciones para el form de contacto
  nameInput.addEventListener("input", () => checkInput(nameInput));
  emailInput.addEventListener("input", () => checkEmail(emailInput));
  messageInput.addEventListener("input", () => checkMessage(messageInput));
  contactForm.addEventListener("submit", validateForm);
  //funciones para el carrito y el menu hamburguer
  cartBtn.addEventListener("click", toggleCart);
  menuBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeOnOverlayClick);
  window.addEventListener("scroll", closeOnScroll);
};

init();
