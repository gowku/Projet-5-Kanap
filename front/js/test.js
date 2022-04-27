//------------------------------------------gestion du localStorage--------------------------------------

//ajouter un produit dans le local storage
// function pushLocalStorage() {
//   basket.push(optionProduct);
//   localStorage.setItem("basket", JSON.stringify(basket));
//   //console.log(products);
// }

// //variable pour mettre les clés des articles
// let basket = JSON.parse(localStorage.getItem("basket"));
// //console.log(products);

// //verifier si il y a deja quelquechose dans le localstorage
// if (basket) {
//   //si local storage deja rempli
//   pushLocalStorage();
// } else {
//   //si local storage vide
//   basket = [];
//   pushLocalStorage();
// }


------------------------------------------------------------------------------------------------------

// function addBasket(optionProduct) {
//     let basket = getBasket();
//     let foundProduct = basket.find((optionProduct) => optionProduct._id == product._id);
//     //console.log(product.colors);
//     if (foundProduct != undefined) {
//       //console.log(quantite.value);
//       foundProduct.quantite = parseInt(foundProduct.quantite, 10) + parseInt(quantite.value, 10);
//     } else {
//       optionProduct.quantite = quantite.value;
//       basket.push(optionProduct);
//     }
//     saveBasket(basket);
//   }
//   addBasket(optionProduct);


----------------------------------------------------------------------------------------------------
// for (i = 0 ; i < basket.length ; i++ ){
//     if( basket[i]._id == optionProduct._id && basket[i].colors == optionProduct.colors){
//        basket[i].quantite = parseInt(basket[i].quantite,10) + parseInt(optionProduct.quantite)
//     }
//     else {
//       optionProduct.quantite = quantite.value;
//       basket.push(optionProduct);
//     }
//     saveBasket(basket);
//   }
//   addBasket(optionProduct);


