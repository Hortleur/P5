function getItemsFromCart() {
  // return le localStorage du panier en json
  return JSON.parse(localStorage.getItem('cart'))
}

function deleteItem(produitId, produitColor) {
  // 💡
  const panier = getItemsFromCart();
  const newPanier = panier.filter(item => {
    if (item.id === produitId && item.color === produitColor) {
      return false
    } else {
      return true
    }
  })
  // stocker dans localstorage
  localStorage.setItem('cart', JSON.stringify(newPanier))
  // appeler loadCart()
  loadCart()
}

function updateQty(produitId, produitColor, produitQty) {
  // reprendre ton code, ne pas oublier de déclarer la variable panier !
  const panier = getItemsFromCart();
  const pos = panier.findIndex(item => item.id === produitId && item.color === produitColor)
  panier[pos].qty = produitQty
  // stocker dans localstorage
  localStorage.setItem('cart', JSON.stringify(panier))
  // appeler loadCart()
  loadCart()
}

async function createProducts() {
  // récupèrer le panier via la fonction précédente
  let panier = getItemsFromCart()
  // initialiser les totaux à 0
  let prixTotal = 0
  let quantiteTotal = 0
  // initialiser le contenuHtml  à vide
  let contentHtml = ""
  // boucler sur les produits du panier
  for (const produit of panier) {
    let produitId = produit.id;
    let produitColor = produit.color;
    let produitQuantity = produit.qty;

    // // ajouter "await" devant le fetch
    await fetch(`http://localhost:3000/api/products/${produitId}`)
      .then(res => res.json())
      .then(produitApi => {

        let produitImage = produitApi.imageUrl
        let produitAlt = produitApi.altTxt
        let produitNom = produitApi.name
        let produitPrix = produitApi.price
        let total = produitPrix * produitQuantity

        // // ajouter le code HTML généré dans contenuHtml avec +=
        contentHtml += `<article class="cart__item item_${produitId}" data-id="${produitId}" data-color="${produitColor}">
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
        prixTotal = parseInt(prixTotal) + parseInt(total)
        document.getElementById('totalPrice').innerHTML = prixTotal

        quantiteTotal = parseInt(quantiteTotal) + parseInt(produitQuantity)
        document.getElementById('totalQuantity').innerHTML = quantiteTotal
        // // fin de boucle
      })
  }
  // vider le contenu de #cart__items
  document.getElementById('cart__items').innerHTML = ""
  // remplir #cart__items avec contenuHtml
  document.getElementById('cart__items').innerHTML = contentHtml
}

function handleEvents() {
  // récupérer tous les deleteItem et les .itemQuantité, boucler dessus et leur ajouter un eventListener adapté
  let supprimer = document.querySelectorAll('.deleteItem')
  let quantites = document.querySelectorAll('.itemQuantity')
  // 💡
  // appeler dans les eventListener les fonction deleteItem et updateQty en leur passant les bons paramètres  
  supprimer.forEach(suppr => {
    suppr.addEventListener('click', function (event) {
      const item = event.target.closest('article');
      const itemId = item.dataset.id;
      const itemColor = item.dataset.color;
      deleteItem(itemId, itemColor)
    });
  });

  quantites.forEach(element => {
    element.addEventListener('change', function (event) {
      const item = event.target.closest('article');
      const itemId = item.dataset.id;
      const produitQty = event.target.value
      const itemColor = item.dataset.color
      updateQty(itemId, itemColor, produitQty)

    })
  });
}

async function loadCart() {
  const products = await createProducts();
  handleEvents(); // on ajoute au panier généré dans le DOM tous les eventListeners
}

loadCart(); // lance la fonction qui appelle les deux fonctions principales



function checkForm() {
  
  // check regex for each element
  // si tous les éléments sont bons : return true;
  // si l'un est faux : return false;
  let emailReg = /^([a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*)@([a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,})$/g
  let regAdress = /^(([a-zA-Zà-ùÀ-Ù0-9\.-\.']+)(\ )?){0,7}$/g
  let reg = /^(([a-zA-Zà-ùÀ-Ù\.-\.']+)(\ )?){0,7}$/g
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value
  const address = document.getElementById('address').value
  const city = document.getElementById('city').value
  const email = document.getElementById('email').value

  function erreur(erreur, donnée) {
    erreur.innerHTML = `${donnée} est invalide`
  }
  
  if (!firstName.match(reg)) {
    const prenom = document.getElementById('firstNameErrorMsg')
    erreur(prenom, firstName)
  } else if (!lastName.match(reg)) {
    const nom = document.getElementById('lastNameErrorMsg')
    erreur(nom, lastName)
  } else if (!address.match(regAdress)) {
    const adresse = document.getElementById('addressErrorMsg')
    erreur(adresse, address)
  } else if (!city.match(reg)) {
    const ville = document.getElementById('cityErrorMsg')
    erreur(ville, city)
  } else if (!email.match(emailReg)) {
    const mail = document.getElementById('emailErrorMsg')
    erreur(mail, email)
  } else {
    return true
  }
}

function send() {
  //permet d'envoyer les données attenduent par l'API pour renvoyer la page confirmation.
  const isFormValid = checkForm(); // donc la variable prend la valeur true ou false
  if (isFormValid) {
    // on continue la suite
    let panier = getItemsFromCart()
    let products = new Array
    panier.forEach(element => {
      products.push(element.id)
    });
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
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      })
      .then(function (res) {
        if (res.ok) {
          return res.json()
        }
      })
      .then(function (res) {
        document.location.href = `confirmation.html?orderId=${res.orderId}`
        localStorage.clear()
      })
  } else {
    alert('Le formulaire est mal rempli.')
  }
}

//Evenement de soumission du formulaire et nettoyage du panier
document.getElementById('order').addEventListener('click', function (e) {
  e.preventDefault()
  send()
})