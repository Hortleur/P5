/* création de la classe produit */
class Produit{
    constructor(jsonProduit){
        jsonProduit && Object.assign(this, jsonProduit)
    }
}

/* Recuperation du contenu de l'api et insertion dans le dom */
const myFetch = fetch("http://localhost:3000/api/products");


    myFetch.then(data => data.json())
    .then( jsonlistproduit =>{
        for(let jsonProduit of jsonlistproduit){
            let produit = new Produit(jsonProduit);
            document.querySelector("section").innerHTML += 
            `<a href="./product.html?id=${produit._id}">
                <article>
                    <img src="${produit.imageUrl}" alt="${produit.altTxt}">
                    <h3 class="productName">
                    ${produit.name}
                    </h3>
                    <p class="productDescription">
                    ${produit.description}
                    </p>
                </article>
            </a>`
        }
    })
 
    



