//récuperation du local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("basket"));
//console.log(produitLocalStorage);

//recuperation des données du back
async function getProducts() {
  let response = await fetch("http://localhost:3000/api/products");
  let products = await response.json();
  console.log(products);

  //return products;

  //
  // let idsLocalStorage = new Array();
  // let quantitesLocalStorage = new Array();
  // for (let i = 0; i < produitLocalStorage.length; i++) {
  //   idsLocalStorage.push(produitLocalStorage[i]._id);
  //   quantitesLocalStorage.push(produitLocalStorage[i].quantite);

  //   //console.log(idsLocalStorage);
  //   //console.log(quantitesLocalStorage);
  // }

  async function findCorrespondingProduct() {
    console.log(produitLocalStorage._id);
    console.log(products._id);

    let foundCorrespondingProduct = products.filter((product) => produitLocalStorage._id == products._id);
    console.log(foundCorrespondingProduct);
  }
  findCorrespondingProduct();
}
getProducts();

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
