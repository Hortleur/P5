/* verification de paramètre dans l'url */
var str = window.location.href;
var url = new URL(str)
var recherche_param = new URLSearchParams(url.search);
if(recherche_param.has('id')) {
    var id = recherche_param.get('id');
    console.log(id);
}


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




    
