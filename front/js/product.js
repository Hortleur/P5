// fonction d'ajout de produit
function addItem(id) {
    //get button
    let bouton = document.getElementById('addToCart');
    bouton.addEventListener("click", function () {
        //selection of color
        let color = document.getElementById('colors')
        color = color.options[color.selectedIndex].value;
        //selection of quantity
        const qty = document.getElementById('quantity').value;
        const newItem = {
            id: id,
            qty: qty,
            color: color,
        }
        console.log(newItem);
        // if cart already in localStorage
        if (localStorage.getItem('cart') && localStorage.getItem('cart').length > 0) {
            const cart = JSON.parse(localStorage.getItem('cart'));
            // search for product in cart, if missing, product position = -1
            const productPosition = cart.findIndex(item => item.id === newItem.id && item.color === newItem.color);
            // if missing create new product in cart
            if (productPosition === -1) {
                cart.push(newItem);
                localStorage.setItem('cart', JSON.stringify(cart));
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
            .catch(function(err) {
                console.log("erreur")
            })
        addItem(produitUrlId)
    }
}


// execution of the function
getProduct();