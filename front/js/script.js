fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {

    //Déclaration des variables pour chaque balise
    let titleH3;
    let imgProduct;
    let pDescription;

    //Visualisation de mon array sur la console  
    console.log(data);

    for (let i = 0; i < data.length; i += 1){
        console.log(data[i].name);

        //Création balise img 
        imgProduct = document.createElement('img'); 
        imgProduct.src = data[i].imageUrl;
        imgProduct.alt = data[i].altTxt;
        

        //Création balise H3 pour le titre 
        titleH3 = document.createElement('h3'); 
        titleH3.textContent = data[i].name;
        titleH3.classList.add("productName")

        //Création des paragraphe
        pDescription = document.createElement('p');
        pDescription.textContent = data[i].description;
        pDescription.classList.add ("productDescription")

        //Création des fiches des produits
        const articleProduct = document.createElement('article');
        articleProduct.appendChild(imgProduct);
        articleProduct.appendChild(titleH3);
        articleProduct.appendChild(pDescription);

        //Création du lien
        const lien = document.createElement("a");
        lien.appendChild (articleProduct)

        // Rattachement de la balise "a" à la section parent
        document.getElementById('items').appendChild(lien);
    }

});
