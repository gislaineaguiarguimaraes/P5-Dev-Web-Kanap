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

    let btnDeleteItem = document.createElement('p');
    btnDeleteItem.className = 'deleteItem';
    btnDeleteItem.textContent = 'Supprimer';
    divSettingsDelete.appendChild(btnDeleteItem);

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
                if(inputQuantity[i].value > 100){
                    alert('Quantité non autorisée (Maximum 100)')
                    inputQuantity[i].value = cart[i].quantity
                    //inputQuantity[i].value = 100;
                }else if(inputQuantity[i].value != cart[i].quantity){
                    cart[i].quantity = inputQuantity[i].value;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    location.reload();
                }
                
            }); 
        };
    };
    
    modifQuantity()
    //Function pour supprimer un produit du panier
    btnDeleteItem.addEventListener('click', (e)=>{
        e.preventDefault();
        let removeColor = btnDeleteItem.closest("article").dataset.color;
        let removeId = btnDeleteItem.closest("article").dataset.id;
        let confirmRemove = confirm('Voulez-vous vraiment supprimer ce produit du panier?')
        console.log(confirmRemove);
        if (confirmRemove == true){
            cart = cart.filter(item => item._id !== removeId && item.color !== removeColor);
            // envoyer les nouvelles données dans le localStorage
            localStorage.setItem("cart", JSON.stringify(cart));
            // avertir de la suppression et recharger la page
            if (removeId in cart && removeColor in cart){
                alert("Une erreur s'est produite.")
            }else{
                alert('Votre article a bien été supprimé.');
            }
            location.reload();
        }  
    })
});  
};
if(cart.length > 0){
    //identifier le formulaire
    let form = document.querySelector('.cart__order__form');
    //Récupérer les différents éléments du formulaire

    //Écoutez la modification du prénom
    form.firstName.addEventListener('change', function(){
        validFirstName(this);
    })
    let firstName;
    function validFirstName(data){
        let nameRegExp = new RegExp(
            "^[a-zA-Z\u00C0-\u017F-_']{2,} {0,}[a-zA-Z\u00C0-\u017F-_']{0,}$"
        );
        let testName = nameRegExp.test(data.value.trim());
        let firstNameErrorMsg =document.querySelector('#firstNameErrorMsg')
        console.log(testName);
        if(testName === true){
            firstName = data.value.trim();
            firstNameErrorMsg.textContent = (" ")
            return true
        }else{
            firstNameErrorMsg.textContent = ('Veuillez entrer un prénom valide.')
            firstName = "";
        }
    };

    //Écoutez la modification du nom
    form.lastName.addEventListener('change', function(){
        validLastName(this);
    })
    let lastName;
    function validLastName(data){
        let nameRegExp = new RegExp(
            "^[a-zA-Z\u00C0-\u017F-_']{1,} {0,}[a-zA-Z\u00C0-\u017F-_']{2,} {0,}[a-zA-Z\u00C0-\u017F-_']{2,} {0,}([\s][a-zA-Z\u00C0-\u017F-_']+)?$"
        );
        let testLastName = nameRegExp.test(data.value.trim());
        let lastNameErrorMsg =document.querySelector('#lastNameErrorMsg')
        console.log(testLastName);
        if(testLastName === true){
            lastName = data.value.trim();
            lastNameErrorMsg.textContent = (" ");
            return true;
        }else{
            lastNameErrorMsg.textContent = ('Veuillez entrer un nom valide.');
            lastName = "";
        };
    };
    //Écoutez la modification de l'adresse
    form.address.addEventListener('change', function(){
        validAddress(this);
    })
    let address;
    function validAddress(data){
        let addressRegExp = new RegExp(
            "^[0-9.-_]+[,-_;.: ]{1,}[a-zA-Z\u00C0-\u017F-_.;,']+ {0,}[a-zA-Z\u00C0-\u017F-_']{0,} {0,}[a-zA-Z\u00C0-\u017F-_']{0,} {0,}[a-zA-Z\u00C0-\u017F-_']{0,}$"
        );
        let testAddress = addressRegExp.test(data.value.trim());
        let addressErrorMsg =document.querySelector('#addressErrorMsg')
        console.log(testAddress);
        if(testAddress === true){
            address = data.value.trim();
            addressErrorMsg.textContent = (" ")
            return true
        }else{
            addressErrorMsg.textContent = ('Veuillez entrer un adresse valide.');
            address = "";
        };
    };

    //Écoutez la modification de la ville
    form.city.addEventListener('change', function(){
        validCity(this);
    })

    let city;

    function validCity(data){
        let cityRegExp = new RegExp(
            "^[a-zA-Z\u00C0-\u017F-_.;,']+ {0,}[a-zA-Z\u00C0-\u017F-_']+$"
        );
        let testCity = cityRegExp.test(data.value.trim());
        let cityErrorMsg =document.querySelector('#cityErrorMsg')
        console.log(testCity);
        if(testCity === true){
            city = data.value.trim();
            cityErrorMsg.textContent = (" ")
            return true
        }else{
            cityErrorMsg.textContent = ('Veuillez entrer un nom valide.');
            city = "";
        };
    };

    //Écoutez la modification du mail
    form.email.addEventListener('change', function(){
        validEmail(this);
    });

    let email;

    function validEmail(data){
        let emailRegExp = new RegExp(
            '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
        );
        let testEmail = emailRegExp.test(data.value.trim());
        let emailErrorMsg =document.querySelector('#emailErrorMsg')
        console.log(testEmail);
        if(testEmail === true){
            email = data.value.trim();
            emailErrorMsg.textContent = (" ")
            return true
        }else{
            emailErrorMsg.textContent = ('Veuillez entrer un nom valide.')
            email = "";
        };
    };

    //Écoutez la soumission du formulaire
    function createData(){
        form.addEventListener('submit', function(e){
            e.preventDefault();  
            let contact = {
                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                email: email,   
            };

            let products = [];
            for(let i = 0; i < cart.length; i++){
                products.push(cart[i].id);

            }
            console.log(Object.values(contact));
            let countValid = 0;
            for(let item = 0; item < Object.values(contact).length; item +=1){
                if(Object.values(contact)[item] === ""){
                    countValid += 1;
                }
            }
            if(countValid > 0){
                alert('Les informations fournies sont incorrectes.');
            }else{
                submitData(contact, products);
            }
        });

    };
    createData();
    //Envoyez la commande et les données du formulaire au backend et récupérez l'id de confirmation
    function submitData(contact, products){
        const data = {
            contact, products,
        };
        console.log(data);
        const promise = fetch('http://localhost:3000/api/products/order',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        }) 
        .then((response) => response.json())
        .then((dataResponse) => {
            //Renvoyer le client à la page de confirmation
            document.location.href = 'confirmation.html?id='+ dataResponse.orderId;
            localStorage.clear();
            console.log(dataResponse.orderId);
        });    
    };
};
