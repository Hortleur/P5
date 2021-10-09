console.log(localStorage)

let article = document.getElementById("cart__items").innerHTML = 
  `<article class="cart__item" data-id="${produitId}">
  <div class="cart__item__img">
    <img src="${produitImage}" alt="${produitAlt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__titlePrice">
      <h2>${produitNom}</h2>
      <p>${produitPrix} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : ${produitQuantity} </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitQuantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`
;

// récupérer les produit du local storage

let panier = JSON.parse(localStorage.getItem('cart'));
console.log(panier)




//recuperer les produits du panier 
panier.forEach(item => {
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
       
      
    })
    
})

