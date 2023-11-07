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
const total = document.querySelector(".total"); //total
const buyBtn = document.querySelector(".btn-buy"); //boton comprar
const deleteBtn = document.querySelector(".btn-delete"); //boton vaciar carrito
const productsCart = document.querySelector(".cart-container"); //container del carrito
// Modal del success
const successModal = document.querySelector(".add-modal");
//contenedor de productos y catergorias
// Contenedor de productos
const productsContainer = document.querySelector(".products-container");
const showMoreBtn = document.querySelector(".btn-load");
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
//

//funciones LS//
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

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
                <div class="card-button">
                  <button class="btn-add" data-id='${id}' 
                  data-title='${title}'
                  data-price='${price}' 
                  data-img='${cardImg}'
                  >Add</button>
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

//////////////////////RENDERIZAR Y VER MAS //////////////////////////////
// Funcion para saber si estamos al final del array
const isLast = () => {
  return appState.currentProductsIndex === appState.productsLimit - 1;
};

// Funcion ver mas
const showMoreProducts = () => {
  appState.currentProductsIndex += 1;
  let { products, currentProductsIndex } = appState;
  renderProducts(products[currentProductsIndex]);
  if (isLast()) {
    showMoreBtn.classList.add("hidden");
  }
};

// Funcion ocultar boton ver mas
const setShowMoreVisibility = () => {
  if (!appState.activeFilter) {
    showMoreBtn.classList.remove("hidden");
    return;
  }

  showMoreBtn.classList.add("hidden");
};

//funciones de filtrado
// Funcion para cambiar el estado de los botones de las categorias
const changeBtnActive = (selectedCategory) => {
  const categories = [...categoriesList];

  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }

    categoryBtn.classList.add("active");
  });
};

// Funcion para cambiar el estado del filtro activo
const changeFiltersState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  changeBtnActive(appState.activeFilter);
  setShowMoreVisibility(appState.activeFilter);
};

// Funcion para filtrar los productos
const renderFilteredProducts = () => {
  const filteredProducts = productsData.filter(
    (product) => product.category === appState.activeFilter
  );
  renderProducts(filteredProducts);
};

// Funcion para aplicar filtro
const applyFilter = ({ target }) => {
  appState.currentProductsIndex = 0;
  if (!isInactiveFilterBtn(target)) return;
  changeFiltersState(target);
  productsContainer.innerHTML = "";
  if (appState.activeFilter) {
    //si hay filtro activo, renderizo
    renderFilteredProducts();
    appState.currentProductsIndex = 0;
    return;
  }
  renderProducts(appState.products[0]);
};

// Funcion para saber si el elemento que apretamos es un boton de categoria y no esta activo
const isInactiveFilterBtn = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};

//funcion del carrito
// template del carrito
const createCartProductTemplate = (cartProduct) => {
  const { id, price, img, title } = cartProduct;

  return `
  <div class="cart-item">
            <img src="${img}" alt="${title}" />
            <div class="item-info">
              <h3 class="item-title">${title}</h3>
              <p class="item-p">Precio</p>
              <span class="item-price">$ ${price}</span>
            </div>
  </div>
  `;
};

// Render
const renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `<p class="empty-msg">No hay productos aun</p>`;
    return;
  }
  productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};

//FUNCIONES DEL CARRITO
// Funcion para obtener el total de la compra
const getCartTotal = () => {
  return cart.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0);
};

// Funcion para mostrar el total del carrito
const showCartTotal = () => {
  total.innerHTML = `U$S ${getCartTotal().toFixed(2)}`;
};

// Funcion para actualizar la burbuja con la cantidad de productos en el cart
const renderCartBubble = () => {
  cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
};

// Funcion para habilitar o deshabilitar botones
const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};

// Funcion para actualizar el carro
const updateCartState = () => {
  saveCart();
  renderCart();
  showCartTotal();
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  renderCartBubble();
};

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;
  const product = e.target.dataset;
  // condicional para saber si ya hay mismo producto en el carro, tira error
  if (isExistingCartProduct(product)) {
    showSuccessModalError(
      "Producto ya existente en el carrito. Solo puede adquirirse 1 unidad"
    );
  } else {
    createCartProduct(product);
    showSuccessModal("Producto añadido");
  }
  updateCartState();
};

// Funcion para agregar una unidad al producto
// const addUnitToProduct = (product) => {
//   cart = cart.map((cartProduct) =>
//     cartProduct.id === product.id
//       ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
//       : cartProduct
//   );
// };

// Funcion para saber si un producto ya existe en el carrito
const isExistingCartProduct = (product) => {
  return cart.find((item) => item.id === product.id);
};

// Funcion para crear un objeto con el dato del producto y agregando una unidad
const createCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};

// Funcion para mostrar el modal
const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg;

  setTimeout(() => {
    successModal.classList.remove("active-modal");
  }, 2000);
};

//funcion para mostrar el modal Error
const showSuccessModalError = (msg) => {
  successModal.classList.add("active-modal-error");
  successModal.textContent = msg;

  setTimeout(() => {
    successModal.classList.remove("active-modal-error");
  }, 2000);
};

// Funcion para manejar el evento click de + en el producto carrito
// const handlePlusBtnEvent = (id) => {
//   const existingCartProduct = cart.find((item) => item.id === id);
//   addUnitToProduct(existingCartProduct);
// };

// Funcion para manejar el evento click del - en el producto carrito
// const handleMinusBtnEvent = (id) => {
//   const existingCartProduct = cart.find((item) => item.id === id);

//   if (existingCartProduct.quantity === 1) {
//     if (window.confirm("Deseas eliminar el producto?")) {
//       removeProductFromCart(existingCartProduct);
//     }
//     return;
//   }

//   substractProductUnit(existingCartProduct);
// };

// const substractProductUnit = (existingCartProduct) => {
//   cart = cart.map((product) => {
//     return product.id === existingCartProduct.id
//       ? { ...product, quantity: Number(product.quantity) - 1 }
//       : product;
//   });
// };

const removeProductFromCart = (existingCartProduct) => {
  cart = cart.filter((product) => product.id !== existingCartProduct.id);
  updateCartState();
};

// Funcion para manejar la cantidad de los productos en el carro
// const handleQuantity = (e) => {
//   if (e.target.classList.contains("up")) {
//     handlePlusBtnEvent(e.target.dataset.id);
//   } else if (e.target.classList.contains("down")) {
//     handleMinusBtnEvent(e.target.dataset.id);
//   }
//   // para todos los casos
//   updateCartState();
// };

const resetCartItems = () => {
  cart = [];
  updateCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItems();
    alert(successMsg);
  }
};

const completeBuy = () => {
  completeCartAction("Deseas completar tu compra?", "Gracias por tu compra!");
};

const deleteCart = () => {
  completeCartAction(
    "Deseas vaciar el carrito?",
    "No hay productos en el carro"
  );
};

//init
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
  categoriesContainer.addEventListener("click", applyFilter);
  showMoreBtn.addEventListener("click", showMoreProducts);
  //funciones para agregar al carrito y renderizar
  productsContainer.addEventListener("click", addProduct);
  productsCart.addEventListener("click", updateCartState);
  document.addEventListener("DOMContentLoaded", renderCart);
  //funciones para el carrito
  buyBtn.addEventListener("click", completeBuy);
  deleteBtn.addEventListener("click", deleteCart);
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  renderCartBubble(cart);
};

init();
