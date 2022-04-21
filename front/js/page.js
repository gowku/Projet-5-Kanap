// recuperation id dans l'url

const urlId = window.location.search;
//console.log(urlId);

const idSearchParams = new URLSearchParams(urlId);
//console.log(idSearchParams);

const id = idSearchParams.get("id");
//console.log(id);

// affichage du produit grace a l'id de l'url
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    //console.log(value);
    addTxt(value);
  })

  .catch(function (err) {
    console.log(err);
  });

//injection html dans la page produit
function addTxt(value) {
  document.querySelector(".item__img").innerHTML += `<img src="${value.imageUrl}" alt="${value.altTxt}">`;
  document.getElementById("title").innerHTML += `${value.name}`;
  document.getElementById("price").innerHTML += `${value.price}`;
  document.getElementById("description").innerHTML += `${value.description}`;

  const options = value.colors;

  for (let i = 0; i < options.length; i++) {
    document.getElementById("colors").innerHTML += `<option value ="${value.colors[i]}">${value.colors[i]}</option>`;
    console.log(value.colors);
  }
}
