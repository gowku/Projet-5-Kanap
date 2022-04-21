const url = "http://localhost:3000/api/products";

//recuperation des produits dans le back

const promise = fetch(url)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    //console.log(value);
    drawProducts(value);
  })

  .catch(function (err) {
    console.log(err);
  });

//boucle pour afficher tous les produits sur la page

function drawProducts(products) {
  console.log(products);
  products.forEach((product) => {
    // console.log(product);
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
