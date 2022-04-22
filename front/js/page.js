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

    //recuperation des valeurs produit
    let optionProduct = {
      _id: product._id,
      name: product.name,
      colors: choixClient,
      quantite: quantite.value,
      price: product.price,
    };
    console.log(optionProduct);
    //------------------------------------------gestion du localStorage--------------------------------------

    //ajouter un produit dans le local storage
    function pushLocalStorage() {
      // isTheSame();
      products.push(optionProduct);
      localStorage.setItem("product", JSON.stringify(products));
      //console.log(products);
    }

    //variable pour mettre les clés des articles
    let products = JSON.parse(localStorage.getItem("product"));
    //console.log(products);

    //verifier si il y a deja quelquechose dans le localstorage
    if (products) {
      //si local storage deja rempli
      pushLocalStorage();
    } else {
      //si local storage vide
      products = [];
      pushLocalStorage();
    }
    // function isTheSame() {
    //   products.forEach((product) => {
    //     if (optionProduct.colors === product.colors) {
    //       console.log(true);
    //     } else {
    //       console.log(false);
    //       Storage.removeItem();
    //     }
    // });
    // }
    // console.log(products);
  });
}
