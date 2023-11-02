const productsData = [
  {
    id: 1,
    title: "Babolat Pure Drive",
    description: "Aro: 98. Peso: 305gr. Patrón: 16x19. Grip: 4 3/8",
    price: 100,
    category: "raquetas",
    cardImg: "./Assets/ImgProd/RaquetaBabolatPureDrive.png",
  },
];

console.log(productsData);

// Funcion para dividir el array en X cantidad de arrays
const DivideProductsInParts = (size) => {
  let productList = [];

  for (let i = 0; i < productsData.length; i += size) {
    productList.push(productsData.slice(i, i + size));
  }
  return productList;
};

// Appstate
const appState = {
  products: DivideProductsInParts(6),
  currentProductsIndex: 0,
  productsLimit: DivideProductsInParts(6).length,
  activeFilter: null,
};
