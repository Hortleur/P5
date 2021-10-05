/* Recuperation du contenu de l'api et insertion dans le dom */


fetch("http://localhost:3000/api/products")
    .then(function(produit){
        if(produit.ok){
            return produit.json();
            
        }
    })
        .then(function(value){
            console.log(value)
            for(let i in value){
                let item = document.getElementById('items')
                item.innerHTML += '<a href="./product.html?id='+value[i]._id+'"><article><img src="'+value[i].imageUrl+'" alt="'+value[i].altTxt+'"><h3 class="productName">'+value[i].name+'</h3><p class="productDescription">'+value[i].description+'</p></article></a>'
            }
        })
        .catch(function(err){
            console.log(err)
        })
    
        
    

