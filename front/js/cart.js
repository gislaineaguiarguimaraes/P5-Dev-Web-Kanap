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
    articleProduct.setAttribute ("data-id", kanapId);
    articleProduct.setAttribute ("data-color", kanapColor);

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
    pDescriptionPrice.textContent = ` ${kanap.price} €`;
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
    };
    modifQuantity()

    //Function pour supprimer un produit du panier
    let btnDelete = document.querySelectorAll('.deleteItem');
    
    for(let i = 0; i < btnDelete.length; i++){
        btnDelete[i].addEventListener('click', (e)=>{
            
            let removeColor = btnDelete[i].closest("article").dataset.color;
            let removeId = btnDelete[i].closest("article").dataset.id;
            
            console.log(removeId);
            console.log(removeColor);
            cart = cart.filter(item => item.id !== removeId && item.color !== removeColor);
            console.log(cart);
            // envoyer les nouvelles données dans le localStorage
            localStorage.setItem("cart", JSON.stringify(cart));
            // avertir de la suppression et recharger la page
            if( removeId in cart){
                console.log('deu merda');
            }else{
                alert('Votre article a bien été supprimé.');
            }
            //location.reload();
            
            
            console.log(removeColor);    
        });     
    };
});  
};
//identifier le formulaire
let form = document.querySelector('.cart__order__form');
//Récupérer les différents éléments du formulaire
console.log(form.firstName);
console.log(form.email);

//Écoutez la modification du prénom
form.firstName.addEventListener('change', function(){
    validFirstName(this);
})

let validFirstName = function(data){
    let nameRegExp = new RegExp(
        "^[a-zA-Z\u00C0-\u017F-_']{2,} {0,}[a-zA-Z\u00C0-\u017F-_']{0,}$"
    );
    let testName = nameRegExp.test(data.value);
    let firstNameErrorMsg =document.querySelector('#firstNameErrorMsg')
    if(testName === true){
        firstNameErrorMsg.textContent = (" ")
    }else{
        firstNameErrorMsg.textContent = ('Veuillez entrer un prénom valide.')
    }
};
//Écoutez la modification du nom
form.lastName.addEventListener('change', function(){
    validLastName(this);
})

let validLastName = function(data){
    let nameRegExp = new RegExp(
        "^[a-zA-Z\u00C0-\u017F-_']{2,} {0,}[a-zA-Z\u00C0-\u017F-_']{0,} {0,}[a-zA-Z\u00C0-\u017F-_']{0,}$"
    );
    let testName = nameRegExp.test(data.value);
    let lastNameErrorMsg =document.querySelector('#lastNameErrorMsg')
    console.log(testName);
    if(testName === true){
        lastNameErrorMsg.textContent = (" ")
    }else{
        lastNameErrorMsg.textContent = ('Veuillez entrer un nom valide.')
    };
};
//Écoutez la modification de l'adresse
form.address.addEventListener('change', function(){
    validAddress(this);
})
let validAddress = function(data){
    let addressRegExp = new RegExp(
       /* "^[0-9.-_]+[,-_;.: ]{1,}[a-zA-Z\u00C0-\u017F-_.;,']+ {0,}[a-zA-Z\u00C0-\u017F-_']{0,} {0,}[a-zA-Z\u00C0-\u017F-_']{0,}$"*/
    );
    let testName = addressRegExp.test(data.value);
    let addressErrorMsg =document.querySelector('#addressErrorMsg')
    console.log(testName);
    if(testName === true){
        addressErrorMsg.textContent = (" ")
    }else{
        addressErrorMsg.textContent = ('Veuillez entrer un nom valide.')
    };
};

//Écoutez la modification du mail
form.email.addEventListener('change', function(){
    validEmail(this);
});

let validEmail = function(data){
    let emailRegExp = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
    );
    let testEmail = emailRegExp.test(data.value);
    console.log(testEmail);
};
