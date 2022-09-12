//Récupération des produits enregistrés dans LocalStorage
function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        return[];
    }else {
        return JSON.parse(cart);
    }
}
let cart = getCart();
console.log(cart);

//Récupération des informations produit dans l'api
fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
   
    
    const novaLista = data.filter(function (id) {
       return id === cart.id
    });
    console.log(novaLista)


    //Boucle pour afficher chaque produit dans le panier
    for (p = 0; p < cart.length; p+=1){
        
        //Faire le lien avec le DOM
        let sectionKanap = document.querySelector('#cart__items');

        //Creation article produit
        let articleProduct = document.createElement('article');
        articleProduct.className ='cart__item';
        sectionKanap.appendChild(articleProduct);
        
        //Ajout de l'image du produit
        let divImg = document.createElement('div');
        divImg.className = 'cart__item__img';
        articleProduct.appendChild(divImg);

        let imgProduct= document.createElement("img");
        imgProduct.src = data.imageUrl;
        divImg.appendChild(imgProduct);
        
        //Ajout de la div pour la description de l'article 
        let divDescription= document.createElement('div');
        divDescription.className = 'cart__item__content__description';

        let h2Description = document.createElement('h2');
        h2Description.textContent = 'Meu produto';
        divDescription.appendChild (h2Description);

        let pDescriptionColor = document.createElement('p');
        pDescriptionColor.textContent = cart[p].color;
        divDescription.appendChild (pDescriptionColor);

        let pDescriptionPrice = document.createElement('p');
        pDescriptionPrice.textContent = 'Preço';
        divDescription.appendChild (pDescriptionPrice);

        let divSettings = document.createElement('div');
        divSettings.className = 'cart__item__content__settings';
        articleProduct.appendChild(divSettings);

        //Ajout de la div pour la quantité de l'article
        let divQnt = document.createElement('div');
        divQnt.className = 'cart__item__content__settings__quantity';
        divSettings.appendChild(divQnt);

        let pQnt = document.createElement('p');
        pQnt.textContent = 'Qté :'
        divQnt.appendChild(pQnt);

        //Création input quantité
        let inputQnt = document.createElement('input');
        inputQnt.type = 'number';
        inputQnt.className = 'itemQuantity';
        inputQnt.name = 'itemQuantity';
        inputQnt.min = '1';
        inputQnt.max = '100';
        inputQnt.value = cart[p].quantity ;
        divQnt.appendChild(inputQnt);

        //Ajout div pour la partie supprimer un produit
        let divSettingsDelete = document.createElement('div');
        divSettingsDelete.className = 'cart__item__content__settings__delete';
        divSettings.appendChild(divSettingsDelete);

        let pDeleteItem = document.createElement('p');
        pDeleteItem.className = 'deleteItem';
        pDeleteItem.textContent = 'Supprimer';
        divSettingsDelete.appendChild(pDeleteItem);

        //Ajout de la div qui contiendra les informations sur le produit
        let divCartContent = document.createElement('div');
        divCartContent.className = 'cart__item__content';
        divCartContent.appendChild(divDescription);
        divCartContent.appendChild(divSettings);
        articleProduct.appendChild(divCartContent);
        
    }

});


    




