function getItemFromCart() {
    // return le localStorage du panier en json
    return localStorage.getItem('cart')
  }
  
  function deleteItem(productId, productColor) {
    // 💡
    const panier = getItemsFromCart();
    const newPanier = panier.filter(item => item.id !== produitId && item.color !== produitColor)
    // stocker dans localstorage
    localStorage.setItem('cart', JSON.stringify(newPanier))
    // appeler loadCart()
    loadCart()
  }
  
  function updateQty(productId, productColor, productQty) {
    // reprendre ton code, ne pas oublier de déclarer la variable panier !
    const panier = getItemsFromCart();
    const pos = panier.findIndex(item => item.id === produitId && item.color === produitColor)
    let newValue = e.target.value
    panier[pos].qty = newValue
    // stocker dans localstorage
    localStorage.setItem('cart', JSON.stringify(panier))
    // appeler loadCart()
    loadCart()
  }
  
  async function createProducts() {
    // récupère le panier via la fonction précédente
    getItemFromCart()
    // initialise les totaux à 0
    let prixTotal = 0
    let quantiteTotal = 0
    // initialise le contenuHtml  à vide
    document.getElementById('cart__items')
    // boucle for des produits du panier
    for (const item of panier) {
        
    }
    // // ajouter "await" devant le fetch
    // // ajouter le code HTML généré dans contenuHtml avec +=
    // // ajouter les quantité et prix aux totaux initialisés au début
    // // fin de boucle
    // vider le contenu de #cart__items
    // remplir #cart__items avec contenuHtml
    // écrire à leur place les totaux
  }
  
  function handleEvents() {
    // récupérer tous les deleteItem et les .itemQuantité, boucler dessus et leur ajouter un eventListener adapté
    // 💡
        const item = event.target.closest('article');
        const itemId = item.dataset.id;
    // appeler dans les eventListener les fonction deleteItem et updateQty en leur passant les bons paramètres
  }
  
  async function loadCart() {
    // c'est cette fonction qui appele la construction des éléments du panier et des eventlistener.
    // à appeler à chaque modification de produits
    const products = await createProducts(); // on lance la création des produits qui contient 
    // un fetch : donc on attend que la focntion soit terminée pour lancer les lignes suivantes
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
      alert('Le formulaire est mal rempli mon cochon.')
    }
  }