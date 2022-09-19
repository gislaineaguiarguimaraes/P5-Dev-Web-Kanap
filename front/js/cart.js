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

if(cart.length == 0){
    const parent = document.querySelector('#cartAndFormContainer');
    const section = document.querySelector('.cart');
    parent.removeChild(section);
    const txtH2 = document.createElement('h2');
    txtH2.textContent = 'Votre panier est vide.';
    parent.appendChild(txtH2); 

}else {   
    for(let p = 0; p < cart.length; p++){
        id = cart[p].id;
        affichekanap(id, cart[p].color, cart[p].quantity)      
    };
};
 
let totalPrice = 0;
async function affichekanap (kanapId, kanapColor, kanapQuantity){
//Recuperation des info du produit avec l'id
await fetch(`http://localhost:3000/api/products/${kanapId}`)
.then((response) => response.json())
.then((kanap) => {
    
    //Faire le lien avec le DOM
    let sectionkanap = document.querySelector('#cart__items');

    //Creation article produit
    let articleProduct = document.createElement('article');
    articleProduct.className ='cart__item';
    sectionkanap.appendChild(articleProduct);

    //Ajout de l'image du produit
    let divImg = document.createElement('div');
    divImg.className = 'cart__item__img';
    articleProduct.appendChild(divImg);

    let imgProduct= document.createElement("img");
    imgProduct.src = kanap.imageUrl;
    divImg.appendChild(imgProduct);

    //Ajout de la div pour la description de l'article 
    let divDescription= document.createElement('div');
    divDescription.className = 'cart__item__content__description';

    //Ajout nom du produit
    let h2Description = document.createElement('h2');
    h2Description.textContent = kanap.name;
    divDescription.appendChild (h2Description);

    //Ajout couleur du produit
    let pDescriptionColor = document.createElement('p');
    pDescriptionColor.textContent = kanapColor;
    divDescription.appendChild (pDescriptionColor);

    //Ajout prix du produit
    let pDescriptionPrice = document.createElement('p');
    pDescriptionPrice.textContent = kanap.price;
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
    inputQnt.setAttribute('value', kanapQuantity);
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

    //Ajout quantité total de produits

    let totalQuantity = 0;

    for (let p = 0; p < cart.length; p++){
        totalQuantity += parseInt(cart[p].quantity); 
    }
    let totalQnt = document.querySelector('#totalQuantity');
    totalQnt.textContent = parseInt(totalQuantity);

    //Ajout total prix produit
    totalPrice += kanap.price * kanapQuantity;
    let totalCost = document.querySelector('#totalPrice');
    totalCost.textContent = totalPrice;


    //Création d'événement d'écoute input
    function modifQuantity() {
        let inputQuantity = document.querySelectorAll(".itemQuantity");
    
        for (let i = 0; i < inputQuantity.length; i++){
            inputQuantity[i].addEventListener("change" , (event) => {
                event.preventDefault();
                if(inputQuantity[i].value != cart[i].quantity){
                    cart[i].quantity = inputQuantity[i].value;
                    localStorage.setItem("cart", JSON.stringify(cart));
                }
                location.reload();
            });
            
        };
    ;
    };
    modifQuantity()

    
});  
};
