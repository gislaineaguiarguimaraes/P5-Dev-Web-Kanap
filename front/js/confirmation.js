//Récuperation de la chaine de requete dans l'url
const queryString = window.location.search;
console.log(queryString);


//Extraire l'id
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);

const myId = urlParams.get('id');
console.log(myId);

const confirmation = document.getElementById('orderId');
confirmation.textContent = myId