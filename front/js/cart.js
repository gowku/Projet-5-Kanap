//récuperation du local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("basket"));
console.log(produitLocalStorage);

//recuperation des données du back
// async function getproducts() {
//   let response = await fetch("http://localhost:3000/api/products");
//   let products = await response.json();
//   //console.log(products);
//   drawProductsBack(products);
//   drawProductsLocalStorage(produitLocalStorage);
//   //addCard2();
// }
// getproducts();

//boucle pour afficher tous les produits sur la page
// function drawProductsBack(products) {
//   //console.log(products);
//   products.forEach((product) => {
//     //console.log(product.altTxt);
//     //       return {
//     //           let urlImage = product.imageUrl ,
//     //           let txtAlt = product.altTxt ,
//     //           let name = product.name ,
//     //           let price =product.price ;
//     // console.log(urlImage)
//     //       }
//   });
// }
console.log(product.imageUrl);

//boucle pour afficher tous les produits sur la page
function drawProductsLocalStorage(produitLocalStorage) {
  // getproducts(products);
  console.log(produitLocalStorage);
  produitLocalStorage.forEach((produit) => {
    console.log(produit);
    addCard2(produit);
  });
}

function addCard2(produit, product) {
  document.getElementById("cart__items").innerHTML += `
  <!--  <article class="cart__item" data-id="${produit._id}" data-color="${produit.colors}">
  <div class="cart__item__img">
    <img src="${product.imageUrl}" alt="${product.altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>Nom du produit</h2>
      <p>Vert</p>
      <p>42,00 €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté :${produit.quantite} </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article> -->
    `;
}
