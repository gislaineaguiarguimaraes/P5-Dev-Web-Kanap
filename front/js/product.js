//Récuperation de la chaine de requete dans l'url
const queryString = window.location.search;
console.log(queryString);


//Extraire l'id
const urlParams = new URLSearchParams(queryString);
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
    let optionColor;
    for(let i = 0; i < data.colors.length; i+=1) {
        optionColor = document.createElement('option');
        optionColor.value = data.colors[i];
        optionColor.textContent = data.colors[i];
        document.querySelector('#colors').appendChild(optionColor)
    }
    //Ajout d'un écouteur d'événement au bouton
    let btnAdd = document.querySelector('#addToCart');
    btnAdd.addEventListener('click', function (){

        //Faire le lien avec le DOM
        let quantityKanap = document.querySelector('#quantity');
        let colorKanap = document.querySelector('#colors').value;
  
        console.log(colorKanap);
        if (colorKanap == "" || quantityKanap.value == 0  ){
            alert('Complétez les informations pour continuer.');
        }else {
            //Ajout des info du produit choisi dans l'objet kanap
            let kanap = {
                id: myId,
                quantity: +quantityKanap.value,
                color: colorKanap,
            }
            console.log(kanap); 
            addCart(kanap);
        }
    })


    //Ajout dans le local storage
    function saveToCart(kanap) {
        let panier = getCart();
        panier.push(kanap);
        localStorage.setItem("cart", JSON.stringify(panier));
    }

    //Récuperer le panier
    function getCart() {
        let cart = localStorage.getItem("cart");
        console.log(cart);
        if (cart == null) {
            return[];
        }else {
            return JSON.parse(cart);
        }
    }

    function addCart(product) {
        let cart = getCart();
        let foundProduct = cart.find(p => p.id == product.id && p.color == product.color);
        console.log(foundProduct);
        if (foundProduct != undefined){
            console.log(foundProduct.quantity)
            console.log(product.quantity)
            foundProduct.quantity += product.quantity;
            console.log(foundProduct)
            
            
        }else{
            cart.push(product);
            console.log(foundProduct)
            
            
        }
        //appel function de sauvegarde dans le localStorage
        saveToCart(product);
        console.log(product);
        console.log(cart);
    }
    
})

