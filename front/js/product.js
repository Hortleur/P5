/* verification de paramètre dans l'url */
var str = window.location.href;
var url = new URL(str)
var recherche_param = new URLSearchParams(url.search);
if(recherche_param.has('id')) {
    var id = recherche_param.get('id');
    console.log(id);
}

/* affichage du produit choisis */ 
const myFetch = fetch("http://localhost:3000/api/products");

myFetch.then(res => res.json())
        .then(data => {
            for (let index = 0; index < data.length; index++) {
                const produit = data[index];
                if (produit._id == id) {
                    document.querySelector(".item__img").innerHTML =`<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
                    document.getElementById("title").innerHTML = `${produit.name}`;
                    document.getElementById("price").innerHTML = `${produit.price}`;
                    document.getElementById("description").innerHTML = `${produit.description}`;  
                    for (let color = 0; color < produit.colors.length; color++) {
                    const couleur = produit.colors[color];
                    document.getElementById("colors").innerHTML += `<option value="${couleur}">${couleur}</option>`;
                    }       
                }
            }        
        }   
    )
/*envois produit vers cart*/
/*let bouton = document.getElementById('addToCart')
bouton("click", function(){
    fetch("http://localhost:3000/api/products"),{
        "method":"POST",
        Headers:{
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({}) 
    }
})*/
let bouton = document.getElementById('addToCart');
function couleur(_selectId='colors'){
    let couleur = document.getElementById('colors');
    return couleur.options[couleur.selectedIndex].value;
}
function nombre() {
    var nombre = document.getElementById('quantity').value;

    return nombre;
}
/*let nombre = document.getElementsById('quantity').value;*/
bouton.addEventListener("click", function(){
    localStorage.setItem("id", id)
    localStorage.setItem("couleur", couleur())
    localStorage.setItem('nombre', nombre())
    console.log(localStorage)
    fetch("http://localhost:3000/api/products"),{
        method : "POST",
        Headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify
    }
})





    
