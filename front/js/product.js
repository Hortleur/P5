/* verification de paramètre dans l'url */

var str = window.location.href;
var url = new URL(str)
var recherche_param = new URLSearchParams(url.search);
if(recherche_param.has('id')) {
    var id = recherche_param.get('id');
    console.log(id);
}



/* récupération du produit */

fetch("http://localhost:3000/api/products")
    .then(function(produit){
        if (produit.ok) {
            return produit.json();
        }
    })
    .then(function(value) {
        value.forEach(id => {
            console.log(id)
            if (value.id === id) {
                document
                    .getElementsByClassName('item_img')
                    .innerHTML = '<img src="'+value[id].imageUrl+'" alt="'+value[id].altTxt+'"/>';
                document    
                    .getElementsById('description')
                    .innerHTML = value[id].description;

                    
            }
        });
    })