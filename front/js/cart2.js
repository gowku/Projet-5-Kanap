//récuperation du local storage
let produitLocalStorages = JSON.parse(localStorage.getItem("basket"));
// console.log(produitLocalStorages);

//recuperation des données du back
async function getProducts() {
  let response = await fetch("http://localhost:3000/api/products");
  let products = await response.json();

  //recuperation des infos des kanap dans le back grace a la comparaison du local storage et du back
  let tableauComplet = findCorrespondingProducts(products, produitLocalStorages);
  // console.log(tableauComplet);

  drawProducts2(tableauComplet);

  changeQuantity(quantityInputs, produitLocalStorages);

  deleteItem(deleteBtns, produitLocalStorages);

  totalQuantiteArticles(produitLocalStorages);

  totalPriceArticle(products, produitLocalStorages);
}
getProducts();

// trouver dans le tableau des produits du back les produit correspondant au local storage
function findCorrespondingProducts(products, produitLocalStorages) {
  let panierProducts = [];
  let foundCorrespondingProducts = produitLocalStorages.map((produitLocalStorage) => {
    products.forEach((produit) =>
      produit._id == produitLocalStorage._id
        ? panierProducts.push({
            _id: produit._id,
            altTxt: produit.altTxt,
            colors: produitLocalStorage.colors,
            imageUrl: produit.imageUrl,
            name: produitLocalStorage.name,
            price: produit.price,
            quantite: produitLocalStorage.quantite,
          })
        : ""
    );
  });
  return panierProducts;
  //console.log(panierProducts);

  // for(let i=0;i<l.length;i++){
  //   pr._id  == l[i]._id ?
  //   ar1.push({ _id: pr._id, altTxt: pr.altTxt, colors: l[i].colors, imageUrl: pr.imageUrl, name: l[i].name, price: pr.price, quantite: l[i].quantite }) : ""};
  // })
}

//boucle pour afficher tous les produits sur la page
function drawProducts2(tableauComplet) {
  //console.log(tableauComplet);
  tableauComplet.forEach((panierProduct) => {
    // console.log(panierProduct);
    addCard2(panierProduct);
  });
}

// injection dans la page panier
function addCard2(panierProduct) {
  document.getElementById("cart__items").innerHTML += `
      <article class="cart__item" data-id="${panierProduct._id}" data-color="${panierProduct.colors}">
      <div class="cart__item__img">
  <img src="${panierProduct.imageUrl}" alt="${panierProduct.altTxt}">
  </div>
  <div class="cart__item__content">
  <div class="cart__item__content__description">
  <h2>${panierProduct.name}</h2>
  <p>Color : ${panierProduct.colors}</p>
  <p>Prix : ${panierProduct.price} €</p>
  </div>
  <div class="cart__item__content__settings">
  <div class="cart__item__content__settings__quantity">
  <p>Qté :</p>
  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panierProduct.quantite}">
  </div>
  <div class="cart__item__content__settings__delete">
  <p class="deleteItem">Supprimer</p>
  </div>
  </div>
  </div>
  </article>
  `;
}

//--------------------------------------- gestion quantité------------------------------------------------------
// let parentDom = document.getElementById("cart__items");
const quantityInputs = document.getElementsByClassName("itemQuantity");
//console.log(quantityInputs);

function changeQuantity(quantityInputs, produitLocalStorages) {
  for (let i = 0; i < quantityInputs.length; i++) {
    //console.log(quantityInputs[i].value);
    quantityInputs[i].addEventListener("change", (e) => {
      e.preventDefault();
      produitLocalStorages[i].quantite = parseInt(quantityInputs[i].value);

      //console.log(produitLocalStorages[i].quantite);
      localStorage.setItem("basket", JSON.stringify(produitLocalStorages));
      //console.log(produitLocalStorages);
    });
  }
}

// ---------------------------------gestion suppression element ----------------------------------------------

let deleteBtns = document.getElementsByClassName("deleteItem");
console.log(deleteBtns);

function deleteItem(deleteBtns, produitLocalStorages) {
  for (let j = 0; j < deleteBtns.length; j++) {
    deleteBtns[j].addEventListener("click", (e) => {
      e.preventDefault();
      console.log(produitLocalStorages);
      // produitLocalStorages -= produitLocalStorages[j];
      console.log(localStorage.removeItem(object[j]));
      // localStorage.removeItem([j]);
    });
  }
}

//------------------------------------------gestion prix total--------------------------------------------------

const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
let totalQ = 0;
let totalP = 0;
function totalQuantiteArticles(produitLocalStorages) {
  //console.log(produitLocalStorages);
  for (let k = 0; k < produitLocalStorages.length; k++) {
    totalQ += parseInt(produitLocalStorages[k].quantite);
  }
  totalQuantity.innerHTML = totalQ;
  //console.log(totalQ);
}

function totalPriceArticle(products, produitLocalStorages) {
  for (let k = 0; k < produitLocalStorages.length; k++) {
    for (let l = 0; l < products.length; l++) {}
    totalP += produitLocalStorages[k].quantite * products[k].price;
  }
  totalPrice.innerHTML = totalP;
}

//-------------------------------------------GESTION DU FORMULAIRE----------------------------------------------
//declaration des variables pour recuperer les infos du formulaire
let prenom = document.getElementById("firstName");
let nom = document.getElementById("lastName");
let adresse = document.getElementById("address");
let ville = document.getElementById("city");
let email = document.getElementById("email");
let btnCommander = document.getElementById("order");

//fonction pour ajouter les infos du formulaire
function addContact() {
  btnCommander.addEventListener("click", (e) => {
    e.preventDefault();
    let masqueNomPrenomVille = /^[A-Za-z-]{3,30}$/;
    let masqueAdresse = /^[A-Za-z0-9-|\s]{3,30}$/;
    let masqueMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let masques = [masqueNomPrenomVille, masqueAdresse, masqueMail];
    //console.log(masques);

    const textAlert = (value) => {
      return `${value}: erreur ,verifier vos informations`;
    };

    // const checkInput = (value ,...masques) => {
    //   if (${masques}.test(${value}.value)) {
    //     console.log(${value}.value + " prenom valide");
    //   } else {
    //     // console.log(prenom.value + " prenom invalide");
    //     alert(textAlert("${value}"));
    //   }
    // }
    // checkInput(prenom,[0]);

    //verification des inputs du formulaire
    function checkInputs() {
      if (!masqueNomPrenomVille.test(prenom.value)) {
        alert(textAlert("prenom"));
      }

      if (masqueNomPrenomVille.test(prenom.value)) {
        console.log(prenom.value + " prenom valide");
      } else {
        // console.log(prenom.value + " prenom invalide");
        alert(textAlert("prenom"));
      }

      if (masqueNomPrenomVille.test(nom.value)) {
        console.log(nom.value + " nom valide");
      } else {
        // console.log(nom.value + " nom invalide");
        alert(textAlert("nom"));
      }

      if (masqueAdresse.test(adresse.value)) {
        console.log(adresse.value + " adresse valide");
      } else {
        // console.log(adresse.value + " adresse invalide");
        alert(textAlert("adresse"));
      }

      if (masqueNomPrenomVille.test(ville.value)) {
        console.log(ville.value + " ville valide");
      } else {
        // console.log(ville.value + " ville invalide");
        alert(textAlert("ville"));
      }

      if (masqueMail.test(email.value)) {
        console.log(email.value + " adresse mail valide");
      } else {
        // console.log(nom.value + " adresse mail invalide");
        alert(textAlert("email"));
      }
    }
    checkInputs();

    let contact = {
      prenom: prenom.value,
      nom: nom.value,
      adresse: adresse.value,
      ville: ville.value,
      email: email.value,
    };
    console.log(contact);
  });
}
addContact();

// let idsLocalStorage = new Array();
// let quantitesLocalStorage = new Array();
// for (let i = 0; i < produitLocalStorage.length; i++) {
//   idsLocalStorage.push(produitLocalStorage[i]._id);
//   quantitesLocalStorage.push(produitLocalStorage[i].quantite);

// console.log(idsLocalStorage);
// console.log(quantitesLocalStorage);
// }
