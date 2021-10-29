/* verification de paramètre dans l'url */
var str = window.location.href;
var url = new URL(str)
var recherche_param = new URLSearchParams(url.search);
if (recherche_param.has('id')) {
    var produitUrlId = recherche_param.get('id');
}

/* affichage du produit choisis */
fetch(`http://localhost:3000/api/products/${produitUrlId}`)
    .then(res => res.json())
    .then(produit => {
        //image et texte alternatif
        document.querySelector(".item__img").innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
        // nom du produit
        document.getElementById("title").innerHTML = produit.name;
        // prix
        document.getElementById("price").innerHTML = produit.price;
        //description
        document.getElementById("description").innerHTML = produit.description;
        //couleur
        produit.colors.forEach(couleur => {
            document.getElementById("colors").innerHTML += `<option value="${couleur}">${couleur}</option>`;
            //nom de la page
            document.title = produit.name
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

// fonction d'ajout de produit
function addItem() {
    bouton.addEventListener("click", function () {
        const newItem = {
            id: produitUrlId,
            color: couleur(),
            qty: nombre(),
        }
        // Si cart est déjà présent dans le Localstorage
        if (localStorage.getItem('cart') && localStorage.getItem('cart').length > 0) {
            const cart = JSON.parse(localStorage.getItem('cart'));
            // recherche du produit dans cart, si absent position = -1
            const productPosition = cart.findIndex(item => item.id === newItem.id && item.color === newItem.color);
            // si propduit absent, création d'un nouveau canapé dans cart
            if (productPosition === -1) {
                cart.push(newItem);
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                // si produit déjà présent, mise à jour de la quantité en utilisant sa position
                cart[productPosition].qty = parseInt(cart[productPosition].qty) + parseInt(newItem.qty);
                localStorage.setItem('cart', JSON.stringify(cart));
            }
            //signale que le canapé à bien été ajouté
            window.alert('Ce canapé à bien été ajouté à bien');
        } else {
            // si cart absent, création d'un nouveau cart
            let newCart = new Array();
            newCart.push(newItem);
            localStorage.setItem('cart', JSON.stringify(newCart));
            window.alert('Ce canapé à bien été ajouté à bien');
        }
    })
}

addItem()
//evenement d'envois du produit dans le localStorage
