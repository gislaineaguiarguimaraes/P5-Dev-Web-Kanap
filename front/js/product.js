//Récuperation de la chaine de requete dans l'url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//Extraire l'id
const urlParams = new URLSearchParams(queryString_url_id);
console.log(urlParams);

const myId = urlParams.get('_id');
console.log(myId);

//Recuperation des info du produit de la page avec l'id
fetch(`http://localhost:3000/api/products/${myId}`)
  .then((response) => response.json())
  .then((data) => {

    console.log(data);

//Ajout de l'image du produit
    const imgProduct = document.createElement ('img');
    imgProduct.src = data.imageUrl; 
    imgProduct.alt = data.altTxt;
    document.querySelector('.item__img').appendChild(imgProduct);


  //Ajout du titre du produit
  document.querySelector('#title').textContent = data.name;

   //Ajout du prix du produit
   document.querySelector('p span').textContent = data.price;

   //Ajout de la description du produit
   document.querySelector('#description').textContent = data.description;

    //Ajout des options de couleur du produit
    for(let i = 0; i < data.colors.length; i+=1) {
        const optionColor = document.createElement('option');
        optionColor.value = data.colors[i];
        optionColor.textContent = data.colors[i];
        document.querySelector('#colors').appendChild(optionColor)
    }
 
})
  
  