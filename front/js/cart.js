console.log(localStorage)


// récupérer les produit du local storage

let panier = JSON.parse(localStorage.getItem('cart'));
console.log(panier)

let prixTotal = new Array()


let quantiteTotal = new Array()




//recuperer les produits du panier et les affichées
for (const produit in panier) {
  
  if (Object.hasOwnProperty.call(panier, produit)) {
    const item = panier[produit];
    let produitId = item.id;
    let produitColor = item.color;
    let produitQuantity = item.qty;



    
    fetch(`http://localhost:3000/api/products/${produitId}`)
    .then(res => res.json())
    .then( produitApi => {
        let produitImage = produitApi.imageUrl
        let produitAlt = produitApi.altTxt
        let produitNom = produitApi.name
        let produitPrix = produitApi.price
        let total = produitPrix * produitQuantity
            
            document.getElementById("cart__items").innerHTML += 
              `<article class="cart__item" data-id="${produitId}">
                <div class="cart__item__img">
                  <img src="${produitImage}" alt="${produitAlt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${produitNom}</h2>
                    <p>${produitColor}</p>
                    <p data-name="prix" id="prix">${total} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p id="quantite">Qté : ${produitQuantity} </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitQuantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`  

              


              //prix total  
              let ajoutTableauTotal = prixTotal.push(total)
              const reducer = (previousValue, currentValue) => previousValue + currentValue;
              let prixFinal = prixTotal.reduce(reducer)
              document.getElementById('totalPrice').innerHTML = prixFinal

              //quantité totale

              let ajoutQuantiteTotale = quantiteTotal.push(produitQuantity);
              const compte = (previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue);
              let quantiteFinale = quantiteTotal.reduce(compte)
              document.getElementById('totalQuantity').innerHTML = quantiteFinale
              

              // suppression article
              
            }
        ) 
     }  
}

let suppr = document.getElementsByClassName('deleteItem')  
console.log(suppr)

for (const produit in panier) {
  if (Object.hasOwnProperty.call(panier, produit)) {
    const produitId = panier[produit].id;
    console.log(produitId)
    
    let article = document.querySelector('#cart__items')
    console.log(article)

  }
}