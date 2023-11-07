const productsData = [
  {
    id: 1,
    title: "Babolat Pure Drive",
    description: "Aro: 98. Peso: 305gr. Patrón: 16x19. Grip: 4 3/8",
    price: 220,
    category: "raquetas",
    cardImg: "./Assets/ImgProd/RaquetababolatPureDrivee.png",
  },
  {
    id: 2,
    title: "Babolat Pure Strike",
    description: "Aro: 98. Peso: 315gr. Patrón: 16x19. Grip: 4 3/8",
    price: 300,
    category: "raquetas",
    cardImg: "./Assets/ImgProd/RaquetaBabolatPureStrike.png",
  },
  {
    id: 3,
    title: "Head Graphene",
    description: "Aro: 100. Peso: 300gr. Patrón: 16x19. Grip: 4 3/8",
    price: 280,
    category: "raquetas",
    cardImg: "./Assets/ImgProd/RaquetaHeadGraphene.png",
  },
  {
    id: 4,
    title: "Head Speed",
    description: "Aro: 102. Peso: 285gr. Patrón: 16x19. Grip: 4 3/8",
    price: 270,
    category: "raquetas",
    cardImg: "./Assets/ImgProd/RaquetaHeadSpeed.png",
  },
  {
    id: 5,
    title: "Wilson Blade",
    description: "Aro: 98. Peso: 305gr. Patrón: 18x20. Grip: 4 3/8",
    price: 260,
    category: "raquetas",
    cardImg: "./Assets/ImgProd/RaquetaWilsonBlade.png",
  },
  {
    id: 6,
    title: "Wilson Burn",
    description: "Aro: 100. Peso: 300gr. Patrón: 16x19. Grip: 4 3/8",
    price: 250,
    category: "raquetas",
    cardImg: "./Assets/ImgProd/RaquetaWilsonBurn.png",
  },
  {
    id: 7,
    title: "Wilson Pro Staff",
    description: "Aro: 97. Peso: 315gr. Patrón: 16x19. Grip: 4 3/8",
    price: 280,
    category: "raquetas",
    cardImg: "./Assets/ImgProd/RaquetawilsonProStaff.png",
  },
  {
    id: 8,
    title: "Yonex E Zone",
    description: "Aro: 100. Peso: 285gr. Patrón: 16x19. Grip: 4 3/8",
    price: 275,
    category: "raquetas",
    cardImg: "./Assets/ImgProd/RaquetaYonexEzone.png",
  },
  {
    id: 9,
    title: "Yonex E Zone 98",
    description: "Aro: 98. Peso: 305gr. Patrón: 16x19. Grip: 4 3/8",
    price: 275,
    category: "raquetas",
    cardImg: "./Assets/ImgProd/RaquetaYonexEzone98.png",
  },
  {
    id: 10,
    title: "Wilson All Court",
    description: "Durabilidad mejorada y bajo desgaste del logotipo",
    price: 10,
    category: "pelotas",
    cardImg: "./Assets/ImgProd/pelotasAllcourt.png",
  },
  {
    id: 11,
    title: "Babolat Gold",
    description: "Alto rendimiento,muy polivalente y fácil de jugar",
    price: 8,
    category: "pelotas",
    cardImg: "./Assets/ImgProd/pelotasBabolat.png",
  },
  {
    id: 12,
    title: "Wilson Duty",
    description: "Excelente rendimiento - Durabilidad en todo",
    price: 6,
    category: "pelotas",
    cardImg: "./Assets/ImgProd/pelotasDuty.png",
  },
  {
    id: 13,
    title: "Wilson Extra Duty",
    description: "Profesional. Seleccionada de la ITF y la USTA",
    price: 10,
    category: "pelotas",
    cardImg: "./Assets/ImgProd/pelotasExtraDuty.png",
  },
  {
    id: 14,
    title: "Babolat Aero",
    description: "Profesional. 12 raquetas. 3 compartimentos",
    price: 173,
    category: "bolsos",
    cardImg: "./Assets/ImgProd/raqueteroBabolatAero.png",
  },
  {
    id: 15,
    title: "Babolat Evo",
    description: "6 raquetas, 2 compartimentos",
    price: 140,
    category: "bolsos",
    cardImg: "./Assets/ImgProd/raqueteroBabolatEvo.png",
  },
  {
    id: 16,
    title: "Dunlop",
    description: "10 raquetas, 3 compartimentos",
    price: 90,
    category: "bolsos",
    cardImg: "./Assets/ImgProd/raqueteroDunlop.png",
  },
  {
    id: 17,
    title: "Wilson Minions",
    description: "Mochila. Edicion especial. 2 raquetas",
    price: 50,
    category: "bolsos",
    cardImg: "./Assets/ImgProd/raqueteroMinions.png",
  },
  {
    id: 18,
    title: "Prince x6",
    description: "6 raquetas, 3 compartimentos",
    price: 90,
    category: "bolsos",
    cardImg: "./Assets/ImgProd/raqueteroPrince.png",
  },
  {
    id: 19,
    title: "Prince x12",
    description: "Profesional. 12 raquetas, 3 compartimentos",
    price: 120,
    category: "bolsos",
    cardImg: "./Assets/ImgProd/raqueteroPrince12.png",
  },
];

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
  products: DivideProductsInParts(3),
  currentProductsIndex: 0,
  productsLimit: DivideProductsInParts(3).length,
  activeFilter: null,
};
