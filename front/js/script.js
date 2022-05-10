//recuperation des produits dans le back et affichage sur la page
async function getproducts() {
  let response = await fetch("http://localhost:3000/api/products");
  let products = await response.json();
  //console.log(products);

  drawProducts(products);
}
getproducts();

//boucle pour afficher tous les produits sur la page
function drawProducts(products) {
  //console.log(products);
  products.forEach((product) => {
    //console.log(product);
    addCard(product);
  });
}

// injection html dans la page acceuil
function addCard(product) {
  document.getElementById("items").innerHTML += `
    <a href="./product.html?id=${product._id}">
      <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
      </article>
    </a>`;
}
