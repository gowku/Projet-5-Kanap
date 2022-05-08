// recuperation id dans l'url
const urlId = window.location.search;
//console.log(urlId);

const idSearchParams = new URLSearchParams(urlId);
//console.log(idSearchParams);

const id = idSearchParams.get("id");
console.log(id);

document.getElementById("orderId").textContent = id;
