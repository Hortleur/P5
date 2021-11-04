// check  parameters in Url 
async function getProduct() {
    const str = window.location.href;
    const url = new URL(str)
    const recherche_param = new URLSearchParams(url.search);
    if (recherche_param.has('id')) {
        let produitUrlId = recherche_param.get('id');
        await fetch(`http://localhost:3000/api/products/${produitUrlId}`)
            .then(res => res.json())
            // show choosen products
            .then(produit => {
                //alt texte and image
                document.querySelector(".item__img").innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
                // product name
                document.getElementById("title").innerHTML = produit.name;
                // price
                document.getElementById("price").innerHTML = produit.price;
                //description
                document.getElementById("description").innerHTML = produit.description;
                //color
                produit.colors.forEach(couleur => {
                    document.getElementById("colors").innerHTML += `<option value="${couleur}">${couleur}</option>`;
                    //page name
                    document.title = produit.name
                });
            })
            //get button
            let bouton = document.getElementById('addToCart');

            //selection of color
            function couleur(_selectId = 'colors') {
                let couleur = document.getElementById('colors');
                return couleur.options[couleur.selectedIndex].value;
            }

            //selection of quantity
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
                    // if cart already in localStorage
                    if (localStorage.getItem('cart') && localStorage.getItem('cart').length > 0) {
                        const cart = JSON.parse(localStorage.getItem('cart'));
                        // search for product in cart, if missing, product position = -1
                        const productPosition = cart.findIndex(item => item.id === newItem.id && item.color === newItem.color);
                        // if missing create new product in cart
                        if (productPosition === -1) {
                            cart.push(newItem);
                            localStorage.setItem('cart', JSON.stringify(cart));
                            window.alert('Ce canapé à bien été ajouté');
                        } else {
                            // if product already there, update quantity
                            cart[productPosition].qty = parseInt(cart[productPosition].qty) + parseInt(newItem.qty);
                            localStorage.setItem('cart', JSON.stringify(cart));
                        }
                        //alert
                        window.alert('Ce canapé à bien été ajouté');
                    } else {
                        // if cart missing create new cart
                        let newCart = new Array();
                        newCart.push(newItem);
                        localStorage.setItem('cart', JSON.stringify(newCart));
                        window.alert('Ce canapé à bien été ajouté');
                    }
                })
            }
            addItem()
    }
}


// execution of the function
getProduct();
