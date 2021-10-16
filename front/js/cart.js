console.log(localStorage)

// récupérer les produit du local storage
let panier = JSON.parse(localStorage.getItem('cart'));
console.log(panier)
let prixTotal = 0
let quantiteTotal = 0


// fonction de suppression
function deleteItem(produitId, produitColor) {
  const article = document.querySelector(`.item_${produitId}`)
  const pos = panier.findIndex(item => item.id === produitId && item.color === produitColor)
  panier.splice(pos,1);   
  localStorage.clear;
  localStorage.setItem('cart',JSON.stringify(panier))
  window.alert('Le produit a bien été supprimer')
  article.remove()
}

// fonction de changement de quantité


//recuperer les produits du panier et les affichées
for (const produit of panier) {

    let produitId = produit.id;
    let produitColor = produit.color;
    let produitQuantity = produit.qty;   

    fetch(`http://localhost:3000/api/products/${produitId}`)
    .then(res => res.json())
    .then( produitApi => {

        let produitImage = produitApi.imageUrl
        let produitAlt = produitApi.altTxt
        let produitNom = produitApi.name
        let produitPrix = produitApi.price
        let total = produitPrix * produitQuantity

        let newItem = `<article class="cart__item item_${produitId}" data-id="${produitId}">
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

        document.getElementById('cart__items').insertAdjacentHTML('afterbegin', newItem);
          //prix total  
              prixTotal= parseInt(prixTotal) + parseInt(total)
              document.getElementById('totalPrice').innerHTML = prixTotal
          //quantité totale
              quantiteTotal = parseInt(quantiteTotal) + parseInt(produitQuantity)
              document.getElementById('totalQuantity').innerHTML = quantiteTotal
          // suppression article
              let supprItem = document.querySelector('.deleteItem')                
              supprItem.addEventListener('click', function(){      
                    deleteItem(produitId, produitColor)
                })
            
            // changement de quantité
                let qtyChange = document.querySelector('.itemQuantity')
                console.log(qtyChange)
                qtyChange.addEventListener('change', function(e){
                  const pos = panier.findIndex(item => item.id === produitId && item.color === produitColor)
                      let newValue = e.target.value
                      console.log(newValue)
                      console.log(e.target.value)
                      panier[pos].produitQuantity = newValue
                      console.log(panier[pos].produitQuantity)
                      console.log(panier)
                })
            }
        )  
}




