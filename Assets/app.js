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
//contenedor de productos y catergorias
// Contenedor de productos
const productsContainer = document.querySelector(".products-container");
const showMoreBtn = document.querySelector(".btn-load");
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");

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

//funcion renderizador de productos
//html
const createProductTemplate = (product) => {
  const { id, title, description, price, category, cardImg } = product;
  return `<div class="card">
              <div class="card-img"><img src="${cardImg}" alt=""></div>
              <div class="card-info">
                <p class="text-title">${title}</p>
                <p class="text-body">${description}</p>
              </div>
              <div class="card-footer">
                <span class="text-price">U$S ${price}</span>
                <div class="card-button" data-id='${id}' 
                data-name='${title}'
                data-bid='${price}' 
                data-img='${cardImg}'>
                  <svg class="svg-icon" viewBox="0 0 20 20">
                    <path
                      d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"
                    ></path>
                    <path
                      d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"
                    ></path>
                    <path
                      d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"
                    ></path>
                  </svg>

                </div>
              </div>
            </div>`;
};

// Render
const renderProducts = (productList) => {
  productsContainer.innerHTML += productList
    .map(createProductTemplate)
    .join("");
};

//////////////////////FILTROS //////////////////////////////
// Funcion para cambiar el estado de los botones de las categorias
const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];

  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }

    categoryBtn.classList.add("active");
  });
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
  //funciones para mostrar productos
  renderProducts(appState.products[0]);
  showMoreBtn.addEventListener("click", showMoreProducts);
  categoriesContainer.addEventListener("click", applyFilter);
};

init();
