/* verification de paramètre dans l'url */
var str = window.location.href;
var url = new URL(str)
var recherche_param = new URLSearchParams(url.search);
if (recherche_param.has('id')) {
    var produitUrlId = recherche_param.get('id');
}

/* affichage du produit choisis */
myFetch = fetch(`http://localhost:3000/api/products/${produitUrlId}`);
myFetch.then(res => res.json())
    .then(produit => {
        document.querySelector(".item__img").innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
        document.getElementById("title").innerHTML = produit.name;
        document.getElementById("price").innerHTML = produit.price;
        document.getElementById("description").innerHTML = produit.description;
        produit.colors.forEach(couleur => {
            document.getElementById("colors").innerHTML += `<option value="${couleur}">${couleur}</option>`;
        });
    })

//récupération du bouton
let bouton = document.getElementById('addToCart');

//selection de la couleur
function couleur(_selectId = 'colors') {
    let couleur = document.getElementById('colors');
    return couleur.options[couleur.selectedIndex].value;
}

//selection de la quantité
function nombre() {
    var nombre = document.getElementById('quantity').value;
    return nombre;
}

//evenement d'envois du produit dans le localStorage
bouton.addEventListener("click", function () {
    const newItem = {
        id: produitUrlId,
        color: couleur(),
        qty: nombre(),
    }

    // S'il y a du monde dans le panier
    if (localStorage.getItem('cart') && localStorage.getItem('cart').length > 0) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        // Je recherche la position dans l'array du produit que je veux ajouter. S'il n'existe pas, sa valeur sera de "-1"
        const productPosition = cart.findIndex(item => item.id === newItem.id && item.color === newItem.color);
        // Donc, si mon produit n'est pas déjà dans le panier
        if (productPosition === -1) {
            cart.push(newItem);
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            // Si le produit est déjà dans le panier, je met à jour sa quantité via sa position dans l'array
            cart[productPosition].qty = parseInt(cart[productPosition].qty) + parseInt(newItem.qty);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        window.alert('Ce canapé à bien été ajouté à bien');
    } else {
        let newCart = new Array();
        newCart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(newCart));
        window.alert('Ce canapé à bien été ajouté à bien');
    }
})