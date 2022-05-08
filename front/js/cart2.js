//récuperation du local storage
let produitLocalStorages = JSON.parse(localStorage.getItem("basket"));
// console.log(produitLocalStorages);

//recuperation des données du back
async function getProducts() {
  let response = await fetch("http://localhost:3000/api/products");
  let products = await response.json();
  console.log(panierProducts);
  //recuperation des infos des kanap dans le back grace a la comparaison du local storage et du back
  let tableauComplet = findCorrespondingProducts(products, produitLocalStorages);
  // console.log(tableauComplet);

  drawProducts2(tableauComplet);

  changeQuantity(quantityInputs, produitLocalStorages);

  // getKanapId(kanaps);

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
// console.log(deleteBtns);
let kanaps = document.getElementsByClassName("cart__item");

function deleteItem(deleteBtns, produitLocalStorages, idcolorKanaps) {
  for (let j = 0; j < deleteBtns.length; j++) {
    deleteBtns[j].addEventListener("click", (e) => {
      e.preventDefault();
      console.log(deleteBtns[j]);

      let idcolorKanaps = deleteBtns[j].closest(".cart__item");
      console.log(idcolorKanaps);
      console.log(idcolorKanaps.dataset.id);

      newProduitLocalStorage = [];
      newProduitLocalStorage = produitLocalStorages.filter((product) => {
        if (product._id !== idcolorKanaps.dataset.id || product.colors !== idcolorKanaps.dataset.color) {
          console.log(product);
          return product;
        }
      });
      localStorage.setItem("basket", JSON.stringify(newProduitLocalStorage));
      console.log(newProduitLocalStorage);
    });
  }
}

//------------------------------------------gestion quantite et prix total--------------------------------------------------

const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
let totalQ = 0;
let totalP = 0;
function totalQuantiteArticles(produitLocalStorages) {
  //console.log(produitLocalStorages);
  for (let k = 0; k < produitLocalStorages.length; k++) {
    totalQ += produitLocalStorages[k].quantite;
  }
  totalQuantity.innerHTML = totalQ;
  //console.log(totalQ);
}

function totalPriceArticle(products, produitLocalStorages) {
  produitLocalStorages.map((produitLocalStorage) => {
    products.forEach((product) => {
      if (product._id == produitLocalStorage._id) {
        totalP += produitLocalStorage.quantite * product.price;
      }
    });
    // console.log(totalP);
  });
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
function sendOrder(produitLocalStorages) {
  btnCommander.addEventListener("click", (e) => {
    e.preventDefault();

    checkInputs();

    let basket = [];
    for (produitLocalStorage of produitLocalStorages) {
      // console.log(produitLocalStorage);
      basket.push(produitLocalStorage._id);
    }

    let order = {
      contact: {
        firstName: prenom.value,
        lastName: nom.value,
        address: adresse.value,
        city: ville.value,
        email: email.value,
      },
      products: basket,
    };
    //console.log(order);
    //console.log(JSON.stringify(order.products[1]));

    sendToBack(order);
  });
}
sendOrder(produitLocalStorages);

//verification des inputs du formulaire
function checkInputs() {
  let masqueNomPrenomVille = /^[A-Za-z-]{3,30}$/;
  let masqueAdresse = /^[0-9|/s]+[A-Za-z-|\s]{3,30}$/;
  let masqueMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const textAlert = (value) => {
    return `${value}: erreur ,verifier vos informations`;
  };

  if (!masqueNomPrenomVille.test(prenom.value)) {
    alert(textAlert("prenom invalide"));
  }
  if (!masqueNomPrenomVille.test(nom.value)) {
    alert(textAlert("nom invalide"));
  }
  if (!masqueAdresse.test(adresse.value)) {
    alert(textAlert("adresse non valide"));
  }
  if (!masqueNomPrenomVille.test(ville.value)) {
    alert(textAlert("ville non valide"));
  }
  if (!masqueMail.test(email.value)) {
    alert(textAlert("mail non valide"));
  }
}

async function sendToBack(order) {
  const promise1 = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      console.log(data);
      // localStorage.clear();

      document.location.href = "confirmation.html?id=" + data.orderId;
    });
}
