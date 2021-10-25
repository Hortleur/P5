function getItemsFromCart() {
    // return le localStorage du panier en json
    return localStorage.getItem('cart')
  }
  
  function deleteItem(produitId, produitColor) {
    // 💡
    const panier = JSON.parse(getItemsFromCart());
    const newPanier = panier.filter(item => item.id !== produitId && item.color !== produitColor)
    // stocker dans localstorage
    localStorage.setItem('cart', JSON.stringify(newPanier))
    // appeler loadCart()
    loadCart()
  }
  
  function updateQty(produitId, produitColor, produitQty) {
    // reprendre ton code, ne pas oublier de déclarer la variable panier !
    const panier = JSON.parse(getItemsFromCart());
    const pos = panier.findIndex(item => item.id === produitId && item.color === produitColor)
    panier[pos].qty = newValue
    // stocker dans localstorage
    localStorage.setItem('cart', JSON.stringify(panier))
    // appeler loadCart()
    loadCart()
  }
  
  async function createProducts() {
    // récupère le panier via la fonction précédente
    let panier = JSON.parse(getItemsFromCart())
    // initialise les totaux à 0
    let prixTotal = 0
    let quantiteTotal = 0
    // initialise le contenuHtml  à vide
    document.getElementById('cart__items').innerHTML = ""
    // boucle for des produits du panier
    for (const produit of panier) {
      let produitId = produit.id;
      let produitColor = produit.color;
      let produitQuantity = produit.qty; 

    // // ajouter "await" devant le fetch
      await fetch(`http://localhost:3000/api/products/${produitId}`)
      .then(res => res.json())
      .then( produitApi => {
  
          let produitImage = produitApi.imageUrl
          let produitAlt = produitApi.altTxt
          let produitNom = produitApi.name
          let produitPrix = produitApi.price
          let total = produitPrix * produitQuantity
    

    // // ajouter le code HTML généré dans contenuHtml avec +=
          document.getElementById('cart__items').innerHTML += `<article class="cart__item item_${produitId}" data-id="${produitId}" data-color="${produitColor}">
              <div class="cart__item__img">
                <img src="${produitImage}" alt="${produitAlt}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                  <h2>${produitNom}</h2>
                  <p id="color">${produitColor}</p>
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
    // // ajouter les quantité et prix aux totaux initialisés au début
          prixTotal= parseInt(prixTotal) + parseInt(total)
          document.getElementById('totalPrice').innerHTML = prixTotal

          quantiteTotal = parseInt(quantiteTotal) + parseInt(produitQuantity)
          document.getElementById('totalQuantity').innerHTML = quantiteTotal
    // // fin de boucle
      })
    }
    // vider le contenu de #cart__items
    // remplir #cart__items avec contenuHtml
    // écrire à leur place les totaux
  }
  
  function handleEvents() {
    // récupérer tous les deleteItem et les .itemQuantité, boucler dessus et leur ajouter un eventListener adapté
    let supprimer = document.querySelectorAll('.deleteItem')
    let quantites = document.querySelectorAll('.itemQuantity')
    // 💡
    // appeler dans les eventListener les fonction deleteItem et updateQty en leur passant les bons paramètres  
    supprimer.forEach(suppr => {
      suppr.addEventListener('click', function(event) {
        const item = event.target.closest('article');
        const itemId = item.dataset.id;
        const itemColor = item.dataset.color;
        deleteItem(itemId, itemColor)
      });
    });  

    quantites.forEach(element => {
      element.addEventListener('change', function(event){
        const item = event.target.closest('article');
        const itemId = item.dataset.id;
        const newValue = event.target.value
        

      })
    });
  }
  
  async function loadCart() {
    // c'est cette fonction qui appele la construction des éléments du panier et des eventlistener.
    // à appeler à chaque modification de produits
    const products = await createProducts(); // on lance la création des produits qui contient 
    // un fetch : donc on attend que la fonction soit terminée pour lancer les lignes suivantes
    handleEvents(); // on ajoute au panier généré dans le DOM tous les eventListeners
  }
  
  // 🚨
  // 🚨
  // La seule ligne de code qui sera appelée au chargement de la page :
  
  loadCart(); // lance la focntion ligne 41, qui appelle les deux fonctions principales
  
  function checkForm() {
    const firstName = document.getElementById('firstName').value;
    // check regex for each element
    // si tous les éléments sont bons : return true;
    // si l'un est faux : return false;
  }
  function send() {
    const isFormValid = checkForm(); // donc la variable prend la valeur true ou false
    if(isFormValid) {
      // on continue la suite
      let contact = {
        contact: {
          firstName: document.getElementById('firstName').value,
          lastName: document.getElementById('lastName').value,
          address: document.getElementById('address').value,
          city: document.getElementById('city').value,
          email: document.getElementById('email').value,
        },
        products: products
      }
      // ETC.
      // ETC.
      // ETC.
    } else {
      alert('Le formulaire est mal rempli.')
    }
  }