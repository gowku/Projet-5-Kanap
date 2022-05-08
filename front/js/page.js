// recuperation id dans l'url
const urlId = window.location.search;
//console.log(urlId);

const idSearchParams = new URLSearchParams(urlId);
//console.log(idSearchParams);

const id = idSearchParams.get("id");
//console.log(id);

// affichage du produit grace a l'id de l'url
async function getproduct() {
  let response = await fetch(`http://localhost:3000/api/products/${id}`);
  //console.log(response);
  let product = await response.json();
  //console.log(product);

  addTxt(product);

  addOptionProduit(product);
}
getproduct();

//injection html dans la page produit
function addTxt(product) {
  document.querySelector(".item__img").innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.getElementById("title").innerHTML += `${product.name}`;
  document.getElementById("price").innerHTML += `${product.price}`;
  document.getElementById("description").innerHTML += `${product.description}`;

  const options = product.colors;

  //boucle pour ajouter le bon nombre d'options
  for (let i = 0; i < options.length; i++) {
    document.getElementById(
      "colors"
    ).innerHTML += `<option product ="${product.colors[i]}">${product.colors[i]}</option>`;
    //console.log(product.colors);
  }
}
//----------------------------------------------gestion panier-----------------------------------------

//selection id des options
const opt = document.getElementById("colors");
//console.log(opt);

//selection quantité
const quantite = document.getElementById("quantity");
//console.log(quantite);

// selection bouton ajouter au panier
const btnAddPanier = document.getElementById("addToCart");
//console.log(btnAddPanier);

//ecouter le btn et envoyer dans le panier
function addOptionProduit(product) {
  btnAddPanier.addEventListener("click", (e) => {
    e.preventDefault();

    // choix du client
    const choixClient = opt.value;
    //console.log(opt.value);
    const quantity = parseInt(quantite.value, 10);
    //console.log(quantity);

    if (quantity <= 0 || quantity > 100) {
      alert("Quantité incorrect");
      return;
    }

    //recuperation des valeurs produit
    let optionProduct = {
      _id: product._id,
      name: product.name,
      colors: choixClient,
      quantite: quantity,
    };
    //console.log(optionProduct);
    //------------------------------------------gestion du localStorage--------------------------------------

    function getBasket() {
      let basket = localStorage.getItem("basket");
      //console.log(basket);
      if (basket == null) {
        return [];
      } else {
        return JSON.parse(basket);
      }
    }

    function saveBasket(basket) {
      localStorage.setItem("basket", JSON.stringify(basket));
    }

    function addBasket(optionProduct) {
      let basket = getBasket();
      // console.log(basket, optionProduct);
      let foundProduct = basket.find(
        (product) => optionProduct._id == product._id && optionProduct.colors == product.colors
      );
      //console.log(product.colors);
      if (foundProduct) {
        //si foundProduct n'est pas nul
        console.log(foundProduct);
        foundProduct.quantite += parseInt(quantite.value, 10);
      } else {
        basket.push(optionProduct);
      }
      saveBasket(basket);
      afterAddProduct();
    }
    addBasket(optionProduct);
  });

  function afterAddProduct() {
    let confirm = window.confirm(
      "le produit a bien ete ajoute au panier , cliquez sur ok pour continuer vos achats ou sur annuler pour aller au panier"
    );
    if (!confirm) {
      document.location.href = "cart.html";
    }
  }
}
